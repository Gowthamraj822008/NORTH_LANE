import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  isGeminiConfigured,
  parseResumeWithGemini,
  analyzeSkillGapWithGemini,
  generateRoadmapWithGemini,
  tailorApplicationWithGemini,
  chatCareerAdvisorWithGemini
} from './server/geminiService';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser for JSON
  app.use(express.json({ limit: '10mb' }));

  // ==========================================
  // SERVER API ROUTES
  // ==========================================

  // System & AI Health Status
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      platform: 'NorthLane Career Intelligence',
      aiModel: 'gemini-3.8-flash',
      hasGeminiKey: isGeminiConfigured(),
      timestamp: new Date().toISOString()
    });
  });

  // AI Resume Parsing & Competency Extraction
  app.post('/api/ai/parse-resume', async (req, res) => {
    try {
      const { resumeText, targetRole } = req.body;
      if (!resumeText || typeof resumeText !== 'string') {
        return res.status(400).json({ error: 'resumeText is required' });
      }
      const result = await parseResumeWithGemini(resumeText, targetRole);
      res.json(result);
    } catch (err: any) {
      console.error('API /api/ai/parse-resume error:', err);
      res.status(500).json({ error: err?.message || 'Failed to analyze resume' });
    }
  });

  // AI Skill Gap & Placement Diagnostic
  app.post('/api/ai/gap-analysis', async (req, res) => {
    try {
      const { profile, targetRoleOrJob } = req.body;
      const result = await analyzeSkillGapWithGemini(profile, targetRoleOrJob);
      res.json(result);
    } catch (err: any) {
      console.error('API /api/ai/gap-analysis error:', err);
      res.status(500).json({ error: err?.message || 'Failed to run gap analysis' });
    }
  });

  // AI Placement Roadmap Generation
  app.post('/api/ai/generate-roadmap', async (req, res) => {
    try {
      const { profile, targetRole, targetCompany } = req.body;
      const result = await generateRoadmapWithGemini(profile, targetRole || 'Data Engineer', targetCompany);
      res.json(result);
    } catch (err: any) {
      console.error('API /api/ai/generate-roadmap error:', err);
      res.status(500).json({ error: err?.message || 'Failed to generate roadmap' });
    }
  });

  // AI Tailored Application Elevator Pitch & Cover Note
  app.post('/api/ai/tailor-application', async (req, res) => {
    try {
      const { profile, internship } = req.body;
      const result = await tailorApplicationWithGemini(profile, internship);
      res.json(result);
    } catch (err: any) {
      console.error('API /api/ai/tailor-application error:', err);
      res.status(500).json({ error: err?.message || 'Failed to tailor application' });
    }
  });

  // AI Interactive Career Mentor Chat
  app.post('/api/ai/advisor-chat', async (req, res) => {
    try {
      const { message, profile, history } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'message is required' });
      }
      const result = await chatCareerAdvisorWithGemini(message, profile, history);
      res.json(result);
    } catch (err: any) {
      console.error('API /api/ai/advisor-chat error:', err);
      res.status(500).json({ error: err?.message || 'Career advisor chat failed' });
    }
  });

  // ==========================================
  // VITE & STATIC SERVING MIDDLEWARE
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NorthLane Career Intelligence server running on http://0.0.0.0:${PORT}`);
    console.log(`Gemini API Key configured: ${isGeminiConfigured() ? 'YES (Live Inference Active)' : 'NO (Using High-Fidelity Heuristic Fallbacks)'}`);
  });
}

startServer();
