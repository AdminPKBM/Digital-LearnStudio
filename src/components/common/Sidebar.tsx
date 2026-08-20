import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Terminal,
  Trophy,
  BarChart2,
  Award,
  Users,
  Settings,
  HelpCircle,
  FileCheck2,
  FileSpreadsheet,
  Menu,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { MobileDrawer } from './MobileDrawer';

export const Sidebar: React.FC = () => {
  const { userSession } = useAuth();
  const { settings } = useApp();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isTeacher = userSession?.role === 'GURU' || userSession?.role === 'teacher';
  const isAdmin = userSession?.role === 'admin';

  const navItems = [
    {
      to: '/',
      label: isTeacher ? 'Dashboard Guru' : isAdmin ? 'Dashboard Admin' : 'Dashboard Siswa',
      shortLabel: 'Beranda',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/modules',
      label: 'Modul 8 Elemen',
      shortLabel: 'Modul',
      icon: BookOpen,
      badge: '16 Modul',
    },
    {
      to: '/my-grades',
      label: 'Rapor & Nilai Siswa',
      shortLabel: 'Nilai',
      icon: FileSpreadsheet,
      badge: 'Rapor',
    },
    {
      to: '/sandboxes',
      label: 'Sandbox Interaktif',
      shortLabel: 'Sandbox',
      icon: Terminal,
      badge: '8 Tools',
    },
    {
      to: '/leaderboard',
      label: 'Leaderboard & XP',
      shortLabel: 'Peringkat',
      icon: Trophy,
      badge: null,
    },
    {
      to: '/analytics',
      label: 'Analitik Belajar',
      shortLabel: 'Analitik',
      icon: BarChart2,
      badge: null,
    },
    {
      to: '/certificate',
      label: 'Sertifikat Kelulusan',
      shortLabel: 'Sertifikat',
      icon: Award,
      badge: null,
    },
  ];

  if (isTeacher) {
    navItems.push({
      to: '/teacher-portal',
      label: 'Portal Guru & Nilai',
      shortLabel: 'Portal Guru',
      icon: FileCheck2,
      badge: 'Guru',
    });
  }

  if (isAdmin) {
    navItems.push({
      to: '/admin-panel',
      label: 'Kelola Sistem Admin',
      shortLabel: 'Admin',
      icon: Settings,
      badge: 'Admin',
    });
  }

  // 4 Primary bottom tabs for mobile thumb-zone
  const mobilePrimaryTabs = [
    {
      to: '/',
      label: 'Beranda',
      icon: LayoutDashboard,
    },
    {
      to: '/modules',
      label: 'Modul',
      icon: BookOpen,
      badge: '16',
    },
    {
      to: '/my-grades',
      label: 'Nilai',
      icon: FileSpreadsheet,
      badge: 'KKM',
    },
    {
      to: '/sandboxes',
      label: 'Sandbox',
      icon: Terminal,
      badge: '8',
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-950/60 border-r border-slate-800/80 min-h-[calc(100vh-65px)] p-4 space-y-2 shrink-0">
        <div className="text-[10px] uppercase font-bold text-slate-500 px-3 tracking-wider mb-2">
          Menu Utama LMS
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-md shadow-cyan-500/10 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}

        {/* School Info Block */}
        <div className="mt-auto pt-4 border-t border-slate-800/80">
          <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-center space-y-2">
            {settings.logoUrl && (
              <img
                src={settings.logoUrl}
                alt="Logo SMKN Bojonggambir"
                className="w-10 h-10 object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            )}
            <div>
              <div className="text-xs font-bold text-white">{settings.schoolName}</div>
              <div className="text-[10px] text-slate-400">Guru: {settings.teacherName}</div>
              <div className="text-[9px] text-cyan-400 font-mono mt-1">Mapel: {settings.subjectName}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Modern Sticky Bottom Navigation Bar (Thumb-Zone Optimized for Mobile) */}
      <nav
        aria-label="Navigasi Bawah Mobile"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-2xl px-2 pt-1.5 pb-[max(env(safe-area-inset-bottom),0.5rem)] shadow-2xl shadow-cyan-950/30"
      >
        <div className="max-w-md mx-auto grid grid-cols-5 items-center gap-1">
          {mobilePrimaryTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.to === '/'}
                className={({ isActive }) =>
                  `relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 touch-target-48 ${
                    isActive
                      ? 'text-cyan-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active glow indicator pill */}
                    {isActive && (
                      <span className="absolute -top-1.5 w-6 h-1 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400" />
                    )}

                    <div className="relative">
                      <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-cyan-400' : ''}`} />
                      {tab.badge && !isActive && (
                        <span className="absolute -top-1.5 -right-2 text-[8px] font-mono font-bold px-1 py-0.2 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                          {tab.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
                      {tab.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* 5th Tab: Menu Drawer Toggle */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-slate-400 hover:text-white transition-all duration-200 touch-target-48 cursor-pointer"
            aria-label="Buka Menu Lainnya"
          >
            <div className="relative">
              <Menu className="w-5 h-5 text-cyan-400/80" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
              Menu
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Sheet */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};

