import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  StudentSkill,
  RoadmapStep,
  ActivePage,
  SkillGapAnalysisResult,
  ReadinessBreakdown,
  SkillLevel,
  RoadmapStatus,
  UserPersona,
  Organization,
  Internship,
  InternshipApplication,
  AppNotification,
  InternshipCompatibility,
  ApplicationStatus,
  StudentExperience,
  StudentProject
} from '../types';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_ASSESSED_SKILLS
} from '../data/sampleData';
import {
  DEFAULT_ROADMAP_STEPS
} from '../data/rolesData';
import {
  INITIAL_ORGANIZATIONS,
  INITIAL_INTERNSHIPS,
  INITIAL_APPLICATIONS,
  INITIAL_NOTIFICATIONS
} from '../data/internshipsData';
import {
  performSkillGapAnalysis,
  calculateReadinessScore,
  calculateRoadmapProgress,
  getRoadmapForRole,
  getRoleById,
  calculateInternshipCompatibility,
  extractSkillsFromResumeText
} from '../utils/analysisEngine';
import confetti from 'canvas-confetti';

interface AppContextType {
  // Persona & Views
  currentPersona: UserPersona;
  setPersona: (persona: UserPersona) => void;
  setCurrentPersona: (persona: UserPersona) => void;
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;

  // Student Core
  profile: StudentProfile;
  assessedSkills: Record<string, StudentSkill>;
  roadmap: RoadmapStep[];
  gapAnalysis: SkillGapAnalysisResult;
  readiness: { overallScore: number; breakdown: ReadinessBreakdown };
  roadmapProgress: number;

  updateProfile: (updated: Partial<StudentProfile>) => void;
  addSkillToProfile: (skillName: string) => void;
  removeSkillFromProfile: (skillName: string) => void;
  setTargetRole: (roleTitle: string) => void;
  rateSkill: (skillName: string, level: SkillLevel) => void;
  updateRoadmapStepStatus: (stepId: string, status: RoadmapStatus) => void;

  // Resume & Experience
  uploadAndParseResume: (text: string, fileName?: string, fileSize?: string) => { skills: string[]; atsScore: number };
  addExperienceToProfile: (exp: Omit<StudentExperience, 'id'>) => void;
  removeExperienceFromProfile: (expId: string) => void;
  addProjectToProfile: (proj: Omit<StudentProject, 'id'>) => void;
  removeProjectFromProfile: (projId: string) => void;

  // Internships & Opportunities
  internships: Internship[];
  savedInternshipIds: string[];
  bookmarkedInternshipIds: string[];
  toggleSaveInternship: (internshipId: string) => void;
  toggleBookmarkInternship: (internshipId: string) => void;
  getInternshipCompatibility: (internship: Internship) => InternshipCompatibility;
  selectedInternshipForGap: Internship | null;
  setSelectedInternshipForGap: (internship: Internship | null) => void;

  // Applications
  applications: InternshipApplication[];
  applyToInternship: (internshipId: string, coverNote?: string, resumeFileName?: string) => boolean;
  withdrawApplication: (applicationId: string) => void;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus, notes?: string) => void;

  // Organizations
  organizations: Organization[];
  activeOrganizationId: string;
  setActiveOrganizationId: (orgId: string) => void;
  currentOrganization: Organization;
  addInternship: (internship: Omit<Internship, 'id' | 'postedDate' | 'applicantsCount'>) => void;
  updateInternship: (id: string, updated: Partial<Internship>) => void;
  deleteInternship: (id: string) => void;
  updateOrganizationProfile: (orgId: string, updated: Partial<Organization>) => void;
  registerOrganization: (org: Omit<Organization, 'id' | 'activePostingsCount'>) => string;
  toggleOrganizationVerification: (orgId: string, isVerified: boolean) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => void;

  // Reset
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEYS = {
  PROFILE: 'northlane_student_profile_v2',
  SKILLS: 'northlane_assessed_skills_v2',
  ROADMAP: 'northlane_roadmap_steps_v2',
  ACTIVE_PAGE: 'northlane_active_page_v2',
  PERSONA: 'northlane_persona_v2',
  INTERNSHIPS: 'northlane_internships_v2',
  SAVED_INTERNSHIPS: 'northlane_saved_internships_v2',
  APPLICATIONS: 'northlane_applications_v2',
  ORGANIZATIONS: 'northlane_organizations_v2',
  ACTIVE_ORG: 'northlane_active_org_v2',
  NOTIFICATIONS: 'northlane_notifications_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Persona State
  const [currentPersona, setPersonaState] = useState<UserPersona>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEYS.PERSONA) as UserPersona) || 'student';
    } catch {
      return 'student';
    }
  });

  const setPersona = (persona: UserPersona) => {
    setPersonaState(persona);
    try {
      localStorage.setItem(STORAGE_KEYS.PERSONA, persona);
    } catch {}

    // Auto navigate to natural landing for that persona
    if (persona === 'organization') {
      setActivePage('org-dashboard');
    } else if (persona === 'admin') {
      setActivePage('admin-dashboard');
    } else {
      setActivePage('dashboard');
    }
  };

  // 2. Active Page
  const [activePage, setActivePageState] = useState<ActivePage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_PAGE);
      return (saved as ActivePage) || 'landing';
    } catch {
      return 'landing';
    }
  });

  const setActivePage = (page: ActivePage) => {
    setActivePageState(page);
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PAGE, page);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Student Profile & Assessed Skills
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  });

  const [assessedSkills, setAssessedSkills] = useState<Record<string, StudentSkill>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      return saved ? JSON.parse(saved) : INITIAL_ASSESSED_SKILLS;
    } catch {
      return INITIAL_ASSESSED_SKILLS;
    }
  });

  const [roadmap, setRoadmap] = useState<RoadmapStep[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROADMAP);
      return saved ? JSON.parse(saved) : DEFAULT_ROADMAP_STEPS['data-engineer'];
    } catch {
      return DEFAULT_ROADMAP_STEPS['data-engineer'];
    }
  });

  // 4. Organizations
  const [organizations, setOrganizations] = useState<Organization[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORGANIZATIONS);
      return saved ? JSON.parse(saved) : INITIAL_ORGANIZATIONS;
    } catch {
      return INITIAL_ORGANIZATIONS;
    }
  });

  const [activeOrganizationId, setActiveOrgState] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACTIVE_ORG) || 'org-amazon';
    } catch {
      return 'org-amazon';
    }
  });

  const setActiveOrganizationId = (orgId: string) => {
    setActiveOrgState(orgId);
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ORG, orgId);
    } catch {}
  };

  const currentOrganization =
    organizations.find(o => o.id === activeOrganizationId) || organizations[0];

  // 5. Internships & Bookmarks
  const [internships, setInternships] = useState<Internship[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INTERNSHIPS);
      if (!saved) return INITIAL_INTERNSHIPS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_INTERNSHIPS;
    } catch {
      return INITIAL_INTERNSHIPS;
    }
  });

  const [savedInternshipIds, setSavedInternshipIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_INTERNSHIPS);
      if (!saved) return ['intern-amazon-de'];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : ['intern-amazon-de'];
    } catch {
      return ['intern-amazon-de'];
    }
  });

  const [selectedInternshipForGap, setSelectedInternshipForGap] = useState<Internship | null>(null);

  // 6. Applications
  const [applications, setApplications] = useState<InternshipApplication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (!saved) return INITIAL_APPLICATIONS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  // 7. Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (!saved) return INITIAL_NOTIFICATIONS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Synchronization with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(assessedSkills));
    } catch {}
  }, [assessedSkills]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(roadmap));
    } catch {}
  }, [roadmap]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INTERNSHIPS, JSON.stringify(internships));
    } catch {}
  }, [internships]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_INTERNSHIPS, JSON.stringify(savedInternshipIds));
    } catch {}
  }, [savedInternshipIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch {}
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORGANIZATIONS, JSON.stringify(organizations));
    } catch {}
  }, [organizations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  // Derived analyses
  const gapAnalysis = performSkillGapAnalysis(profile, assessedSkills);
  const readiness = calculateReadinessScore(profile, assessedSkills, roadmap);
  const roadmapProgress = calculateRoadmapProgress(roadmap);

  // Helper: Internship compatibility
  const getInternshipCompatibility = (internship: Internship): InternshipCompatibility => {
    return calculateInternshipCompatibility(internship, assessedSkills, profile);
  };

  // Student Profile Actions
  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const addSkillToProfile = (skillName: string) => {
    const trimmed = skillName.trim();
    if (!trimmed) return;

    if (!profile.currentSkills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setProfile(prev => ({
        ...prev,
        currentSkills: [...prev.currentSkills, trimmed]
      }));
    }

    if (!assessedSkills[trimmed]) {
      setAssessedSkills(prev => ({
        ...prev,
        [trimmed]: {
          name: trimmed,
          level: 'intermediate',
          category: 'added',
          source: 'added'
        }
      }));
    }
  };

  const removeSkillFromProfile = (skillName: string) => {
    setProfile(prev => ({
      ...prev,
      currentSkills: prev.currentSkills.filter(s => s.toLowerCase() !== skillName.toLowerCase())
    }));
  };

  const setTargetRole = (roleTitle: string) => {
    const roleData = getRoleById(roleTitle);
    setProfile(prev => ({
      ...prev,
      targetRole: roleData.title
    }));

    const newRoadmap = getRoadmapForRole(roleData.id);
    setRoadmap(newRoadmap);

    setAssessedSkills(prev => {
      const updated = { ...prev };
      roleData.requiredSkills.forEach(req => {
        if (!updated[req.name]) {
          updated[req.name] = {
            name: req.name,
            level: 'not_started',
            category: req.category,
            source: 'role_required'
          };
        }
      });
      return updated;
    });
  };

  const rateSkill = (skillName: string, level: SkillLevel) => {
    setAssessedSkills(prev => ({
      ...prev,
      [skillName]: {
        name: skillName,
        level,
        category: prev[skillName]?.category || 'core',
        source: prev[skillName]?.source || 'added'
      }
    }));
  };

  const updateRoadmapStepStatus = (stepId: string, status: RoadmapStatus) => {
    setRoadmap(prev =>
      prev.map(step => (step.id === stepId ? { ...step, status } : step))
    );

    if (status === 'completed') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}

      addNotification({
        type: 'roadmap_progress',
        title: 'Roadmap Milestone Cleared!',
        message: 'You marked a step as completed. Your Placement Readiness index has been updated.',
        actionUrl: 'readiness'
      });
    }
  };

  // Resume Upload & Extraction
  const uploadAndParseResume = (text: string, fileName?: string, fileSize?: string) => {
    const extracted = extractSkillsFromResumeText(text);

    // Merge extracted skills into profile currentSkills and assessedSkills
    const updatedSkillsList = Array.from(
      new Set([...profile.currentSkills, ...extracted.skills])
    );

    setProfile(prev => ({
      ...prev,
      currentSkills: updatedSkillsList,
      resume: {
        fileName: fileName || 'Uploaded_Resume.pdf',
        fileSize: fileSize || `${Math.round(text.length / 1024)} KB`,
        uploadedAt: new Date().toISOString(),
        rawText: text,
        extractedSkills: extracted.skills,
        extractedExperience: extracted.experience,
        extractedProjects: extracted.projects,
        atsScore: extracted.atsScore
      }
    }));

    // Register skills in assessedSkills if not present
    setAssessedSkills(prev => {
      const next = { ...prev };
      extracted.skills.forEach(sk => {
        if (!next[sk]) {
          next[sk] = {
            name: sk,
            level: 'intermediate',
            category: 'core',
            source: 'resume_extracted'
          };
        }
      });
      return next;
    });

    addNotification({
      type: 'system',
      title: 'Resume Skills Extracted',
      message: `Parsed ${extracted.skills.length} skills. ATS Match Score: ${extracted.atsScore}/100.`,
      actionUrl: 'profile'
    });

    return { skills: extracted.skills, atsScore: extracted.atsScore };
  };

  const addExperienceToProfile = (exp: Omit<StudentExperience, 'id'>) => {
    const newExp: StudentExperience = {
      ...exp,
      id: `exp-${Date.now()}`
    };
    setProfile(prev => ({
      ...prev,
      experiences: [...(prev.experiences || []), newExp]
    }));
  };

  const removeExperienceFromProfile = (expId: string) => {
    setProfile(prev => ({
      ...prev,
      experiences: (prev.experiences || []).filter(e => e.id !== expId)
    }));
  };

  const addProjectToProfile = (proj: Omit<StudentProject, 'id'>) => {
    const newProj: StudentProject = {
      ...proj,
      id: `proj-${Date.now()}`
    };
    setProfile(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newProj]
    }));
  };

  const removeProjectFromProfile = (projId: string) => {
    setProfile(prev => ({
      ...prev,
      projects: (prev.projects || []).filter(p => p.id !== projId)
    }));
  };

  // Bookmark / Save Internship
  const toggleSaveInternship = (internshipId: string) => {
    setSavedInternshipIds(prev => {
      const safePrev = Array.isArray(prev) ? prev : [];
      if (safePrev.includes(internshipId)) {
        return safePrev.filter(id => id !== internshipId);
      } else {
        return [...safePrev, internshipId];
      }
    });
  };

  // Application Actions
  const applyToInternship = (
    internshipId: string,
    coverNote?: string,
    resumeFileName?: string
  ): boolean => {
    const target = internships.find(i => i.id === internshipId);
    if (!target) return false;

    // Check if already applied
    const alreadyApplied = applications.some(a => a.internshipId === internshipId);
    if (alreadyApplied) return false;

    const compat = getInternshipCompatibility(target);

    const newApp: InternshipApplication = {
      id: `app-${Date.now()}`,
      internshipId: target.id,
      internshipTitle: target.title,
      organizationName: target.organizationName,
      organizationLogo: target.organizationLogo,
      studentName: profile.name,
      studentEmail: profile.email || 'student@sairam.edu.in',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'applied',
      compatibilityScore: compat.score,
      coverNote: coverNote || `Candidate profile applied with ${compat.score}% skill compatibility fit.`,
      resumeFileName: resumeFileName || profile.resume?.fileName || 'Gowtham_R_Resume.pdf',
      timeline: [
        {
          status: 'applied',
          date: new Date().toISOString().split('T')[0],
          message: 'Application dossier submitted via NorthLane One-Click Match.'
        }
      ]
    };

    setApplications(prev => [newApp, ...prev]);

    // Increment applicantsCount on internship
    setInternships(prev =>
      prev.map(i => (i.id === internshipId ? { ...i, applicantsCount: i.applicantsCount + 1 } : i))
    );

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    addNotification({
      type: 'application_update',
      title: `Applied to ${target.organizationName}!`,
      message: `Your application for ${target.title} is now under review (Score: ${compat.score}%).`,
      actionUrl: 'applications',
      relatedId: newApp.id
    });

    return true;
  };

  const withdrawApplication = (applicationId: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId
          ? {
              ...app,
              status: 'withdrawn',
              timeline: [
                ...app.timeline,
                {
                  status: 'withdrawn',
                  date: new Date().toISOString().split('T')[0],
                  message: 'Application withdrawn by applicant.'
                }
              ]
            }
          : app
      )
    );
  };

  const updateApplicationStatus = (
    applicationId: string,
    newStatus: ApplicationStatus,
    notes?: string
  ) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id !== applicationId) return app;
        const msgMap: Record<ApplicationStatus, string> = {
          applied: 'Application received.',
          under_review: 'Dossier moved to active recruiter evaluation.',
          shortlisted: 'Candidate selected for interview stages!',
          interview_scheduled: notes || 'Technical video interview scheduled.',
          offer_extended: 'Congratulations! Official internship offer extended.',
          rejected: 'Position filled for this recruiting cycle.',
          withdrawn: 'Application marked withdrawn.'
        };

        const updatedTimeline = [
          ...app.timeline,
          {
            status: newStatus,
            date: new Date().toISOString().split('T')[0],
            message: notes || msgMap[newStatus]
          }
        ];

        return {
          ...app,
          status: newStatus,
          feedback: notes || app.feedback,
          timeline: updatedTimeline
        };
      })
    );

    const app = applications.find(a => a.id === applicationId);
    if (app) {
      addNotification({
        type: 'application_update',
        title: `Status Update: ${app.organizationName}`,
        message: `Your application for ${app.internshipTitle} was updated to: ${newStatus.toUpperCase().replace('_', ' ')}.`,
        actionUrl: 'applications',
        relatedId: applicationId
      });
    }
  };

  // Organization Actions
  const addInternship = (internshipData: Omit<Internship, 'id' | 'postedDate' | 'applicantsCount'>) => {
    const newInternship: Internship = {
      ...internshipData,
      id: `intern-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0
    };

    setInternships(prev => [newInternship, ...prev]);

    // Update organization posting count
    setOrganizations(prev =>
      prev.map(o =>
        o.id === internshipData.organizationId
          ? { ...o, activePostingsCount: o.activePostingsCount + 1 }
          : o
      )
    );

    addNotification({
      type: 'organization_alert',
      title: 'New Internship Live!',
      message: `${newInternship.title} is now visible to engineering candidates.`,
      actionUrl: 'internships',
      relatedId: newInternship.id
    });
  };

  const updateInternship = (id: string, updated: Partial<Internship>) => {
    setInternships(prev => prev.map(i => (i.id === id ? { ...i, ...updated } : i)));
  };

  const deleteInternship = (id: string) => {
    const target = internships.find(i => i.id === id);
    setInternships(prev => prev.filter(i => i.id !== id));
    if (target) {
      setOrganizations(prev =>
        prev.map(o =>
          o.id === target.organizationId
            ? { ...o, activePostingsCount: Math.max(0, o.activePostingsCount - 1) }
            : o
        )
      );
    }
  };

  const updateOrganizationProfile = (orgId: string, updated: Partial<Organization>) => {
    setOrganizations(prev => prev.map(o => (o.id === orgId ? { ...o, ...updated } : o)));
  };

  const registerOrganization = (orgData: Omit<Organization, 'id' | 'activePostingsCount'>): string => {
    const newId = `org-${Date.now()}`;
    const newOrg: Organization = {
      ...orgData,
      id: newId,
      activePostingsCount: 0
    };
    setOrganizations(prev => [...prev, newOrg]);
    setActiveOrganizationId(newId);

    addNotification({
      type: 'organization_alert',
      title: `Welcome, ${newOrg.name}!`,
      message: 'Your organization account is created. Submit job listings and review applicants.',
      actionUrl: 'org-dashboard'
    });

    return newId;
  };

  const toggleOrganizationVerification = (orgId: string, isVerified: boolean) => {
    setOrganizations(prev =>
      prev.map(o => (o.id === orgId ? { ...o, isVerified } : o))
    );
  };

  // Notification Actions
  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const resetAllData = () => {
    setProfile(INITIAL_STUDENT_PROFILE);
    setAssessedSkills(INITIAL_ASSESSED_SKILLS);
    setRoadmap(DEFAULT_ROADMAP_STEPS['data-engineer']);
    setInternships(INITIAL_INTERNSHIPS);
    setApplications(INITIAL_APPLICATIONS);
    setOrganizations(INITIAL_ORGANIZATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSavedInternshipIds(['intern-amazon-de']);
    setPersonaState('student');
    setActivePageState('dashboard');
    try {
      localStorage.clear();
    } catch {}
  };

  return (
    <AppContext.Provider
      value={{
        currentPersona,
        setPersona,
        setCurrentPersona: setPersona,
        activePage,
        setActivePage,
        profile,
        assessedSkills,
        roadmap,
        gapAnalysis,
        readiness,
        roadmapProgress,
        updateProfile,
        addSkillToProfile,
        removeSkillFromProfile,
        setTargetRole,
        rateSkill,
        updateRoadmapStepStatus,
        uploadAndParseResume,
        addExperienceToProfile,
        removeExperienceFromProfile,
        addProjectToProfile,
        removeProjectFromProfile,
        internships,
        savedInternshipIds: savedInternshipIds || [],
        bookmarkedInternshipIds: savedInternshipIds || [],
        toggleSaveInternship,
        toggleBookmarkInternship: toggleSaveInternship,
        getInternshipCompatibility,
        selectedInternshipForGap,
        setSelectedInternshipForGap,
        applications,
        applyToInternship,
        withdrawApplication,
        updateApplicationStatus,
        organizations,
        activeOrganizationId,
        setActiveOrganizationId,
        currentOrganization,
        addInternship,
        updateInternship,
        deleteInternship,
        updateOrganizationProfile,
        registerOrganization,
        toggleOrganizationVerification,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
