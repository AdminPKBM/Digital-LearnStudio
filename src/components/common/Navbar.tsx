import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Trophy,
  LogOut,
  ShieldCheck,
  UserCheck,
  Flame,
  BookOpen,
  Crown,
  Bell,
  Menu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { StudentProfile, TeacherProfile } from '../../types';
import { NotificationModal } from './NotificationModal';
import { MobileDrawer } from './MobileDrawer';

export const Navbar: React.FC = () => {
  const { userSession, logout } = useAuth();
  const { getLevelTitle, settings, announcements } = useApp();
  const navigate = useNavigate();

  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  const isStudent = userSession?.role === 'SISWA' || userSession?.role === 'student';
  const isTeacher = userSession?.role === 'GURU' || userSession?.role === 'teacher';
  const isAdmin = userSession?.role === 'admin';

  const student = isStudent ? (userSession.profile as StudentProfile) : null;
  const teacher = isTeacher ? (userSession.profile as TeacherProfile) : null;

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-3 sm:px-4 lg:px-8 py-2.5 sm:py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Drawer Trigger (Hamburger) */}
            {userSession && (
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition cursor-pointer touch-target-48"
                aria-label="Buka Menu Navigasi"
              >
                <Menu className="w-5 h-5 text-cyan-400" />
              </button>
            )}

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 border border-slate-700/80 p-1 shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden shrink-0">
                {settings.logoUrl ? (
                  <img
                    src={settings.logoUrl}
                    alt="Logo Sekolah"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                )}
              </div>
              <div className="min-w-0">
                <h1 className="font-extrabold text-white text-sm sm:text-base lg:text-lg tracking-tight flex items-center gap-1.5 truncate">
                  <span>LMS {settings.subjectName}</span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                    Fase E
                  </span>
                </h1>
                <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block truncate">
                  {settings.schoolName} • Mapel {settings.subjectName}
                </p>
              </div>
            </Link>
          </div>

          {/* Gamification Bar (Siswa - Desktop View) */}
          {isStudent && student && (
            <div className="hidden md:flex items-center gap-4 bg-slate-900/90 border border-slate-800 px-4 py-1.5 rounded-2xl">
              {/* Level Badge */}
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Level {student.level}</div>
                  <div className="text-xs font-bold text-amber-300">{getLevelTitle(student.level)}</div>
                </div>
              </div>

              <div className="h-6 w-px bg-slate-800" />

              {/* XP Stats */}
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Poin XP</div>
                  <div className="text-xs font-extrabold text-cyan-300 font-mono">{student.xp} XP</div>
                </div>
              </div>

              <div className="h-6 w-px bg-slate-800" />

              {/* Streak */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-orange-400">
                <Flame className="w-4 h-4 fill-current text-orange-500 animate-pulse" />
                <span>{student.streakDays} Hari Streak</span>
              </div>
            </div>
          )}

          {/* Gamification Mini Capsule (Mobile View) */}
          {isStudent && student && (
            <div className="flex md:hidden items-center gap-1.5 bg-slate-900 border border-slate-800 px-2 py-1 rounded-xl">
              <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-400" />
                Lv.{student.level}
              </span>
              <span className="text-slate-700 font-mono">|</span>
              <span className="text-[10px] font-extrabold text-cyan-300 font-mono">
                {student.xp} XP
              </span>
            </div>
          )}

          {/* Right Actions: Notification Bell + User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Bell Button */}
            {userSession && (
              <button
                onClick={() => setIsNotificationOpen(true)}
                className="relative p-2 sm:p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-white transition cursor-pointer touch-target-48"
                aria-label="Buka Notifikasi"
                title="Notifikasi Aktivitas"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                {/* Active Notification Badge */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950 animate-pulse" />
              </button>
            )}

            {userSession ? (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* User info on desktop */}
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-white flex items-center justify-end gap-1 truncate max-w-[140px]">
                    {isStudent && student?.name}
                    {isTeacher && teacher?.name}
                    {isAdmin && 'Administrator'}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                    {isStudent && `${student?.nis} • ${student?.classGroup}`}
                    {isTeacher && 'Guru Informatika'}
                    {isAdmin && 'Admin Akses Penuh'}
                  </div>
                </div>

                {/* Role Icon Avatar */}
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-300">
                  {isStudent && <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
                  {isTeacher && <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />}
                  {isAdmin && <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />}
                </div>

                {/* Logout Button (Desktop) */}
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  title="Keluar / Ganti Akun"
                  className="hidden sm:flex p-2.5 bg-slate-900 hover:bg-rose-500/20 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 rounded-xl transition cursor-pointer touch-target-48"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-3 sm:px-4 py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/20 touch-target-48"
              >
                Masuk / Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Interactive Notifications Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Mobile Drawer Navigation */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />
    </>
  );
};

