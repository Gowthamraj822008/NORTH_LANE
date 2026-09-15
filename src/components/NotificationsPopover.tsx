import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, Clock, ExternalLink, Sparkles, Briefcase, Award, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppNotification } from '../types';

export const NotificationsPopover: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setActivePage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleItemClick = (notif: AppNotification) => {
    markNotificationRead(notif.id);
    if (notif.actionUrl) {
      setActivePage(notif.actionUrl);
      setIsOpen(false);
    }
  };

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'application_update':
        return <Briefcase className="w-3.5 h-3.5 text-[#3B82F6]" />;
      case 'match_alert':
        return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
      case 'roadmap_progress':
        return <Award className="w-3.5 h-3.5 text-green-400" />;
      default:
        return <Info className="w-3.5 h-3.5 text-[#8A919B]" />;
    }
  };

  return (
    <div className="relative font-mono" ref={popoverRef}>
      {/* Trigger Button */}
      <button
        id="notifications-bell-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1.5 rounded bg-[#111418] hover:bg-[#1E2228] text-[#8A919B] hover:text-white border border-[#2D3139] transition-colors"
        title="Notifications"
        aria-label="View notifications"
      >
        <Bell className="w-3.5 h-3.5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] px-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded bg-[#16191E] border border-[#2D3139] shadow-2xl z-50 overflow-hidden text-xs">
          {/* Header */}
          <div className="p-3 border-b border-[#2D3139] flex items-center justify-between bg-[#111418]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white uppercase text-[11px]">NOTIFICATIONS</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-[#3B82F6] text-[9px] font-bold border border-[#3B82F6]/30">
                  {unreadCount} NEW
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="text-[10px] text-[#8A919B] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <CheckCheck className="w-3 h-3 text-[#3B82F6]" />
                  <span>MARK_READ</span>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8A919B] hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-[#2D3139]/60">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-[#8A919B] text-[11px]">
                NO NOTIFICATIONS IN QUEUE
              </div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleItemClick(notif)}
                  className={`p-3 cursor-pointer transition-colors flex gap-2.5 ${
                    notif.isRead
                      ? 'bg-[#16191E] hover:bg-[#1E2228]/80 text-[#8A919B]'
                      : 'bg-[#111418] hover:bg-[#1E2228] text-white border-l-2 border-[#3B82F6]'
                  }`}
                >
                  <div className="mt-0.5 shrink-0 p-1.5 rounded bg-[#16191E] border border-[#2D3139]">
                    {getIcon(notif.type)}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <p className={`text-[11px] font-bold truncate ${notif.isRead ? 'text-[#C5CAD3]' : 'text-white'}`}>
                        {notif.title}
                      </p>
                      <span className="text-[9px] text-[#8A919B] shrink-0 font-normal">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8A919B] line-clamp-2 leading-relaxed font-sans">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-[#2D3139] bg-[#111418] text-center">
            <span className="text-[9px] text-[#8A919B]">
              NORTHLANE DISPATCH SYSTEM v2.4
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
