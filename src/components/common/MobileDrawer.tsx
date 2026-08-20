import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  X,
  LayoutDashboard,
  BookOpen,
  FileSpreadsheet,
  Terminal,
  Trophy,
  BarChart2,
  Award,
  FileCheck2,
  Settings,
  LogOut,
  Sparkles,
  Crown,
  Share2,
  MessageCircle,
  Flame,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { StudentProfile, TeacherProfile } from '../../types';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSocialModal?: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onOpenSocialModal,
}) => {
  const { userSession, logout } = useAuth();
  const { getLevelTitle, settings } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const isStudent = userSession?.role === 'SISWA' || userSession?.role === 'student';
  const isTeacher = userSession?.role === 'GURU' || userSession?.role === 'teacher';
  const isAdmin = userSession?.role === 'admin';

  const student = isStudent ? (userSession?.profile as StudentProfile) : null;
  const teacher = isTeacher ? (userSession?.profile as TeacherProfile) : null;

  const navItems = [
    {
      to: '/',
      label: isTeacher ? 'Dashboard Guru' : isAdmin ? 'Dashboard Admin' : 'Dashboard Siswa',
      icon: LayoutDashboard,
      badge: 'Utama',
    },
    {
      to: '/modules',
      label: 'Modul Pembelajaran',
      icon: BookOpen,
      badge: '16 Modul',
    },
    {
      to: '/my-grades',
      label: 'Rapor & Nilai Siswa',
      icon: FileSpreadsheet,
      badge: 'Buku Nilai',
    },
    {
      to: '/sandboxes',
      label: 'Sandbox & Simulator',
      icon: Terminal,
      badge: '8 Simulator',
    },
    {
      to: '/leaderboard',
      label: 'Leaderboard & XP',
      icon: Trophy,
      badge: 'Peringkat',
    },
    {
      to: '/analytics',
      label: 'Analitik Belajar',
      icon: BarChart2,
      badge: null,
    },
    {
      to: '/certificate',
      label: 'Sertifikat Kelulusan',
      icon: Award,
      badge: 'Digital',
    },
  ];

  if (isTeacher) {
    navItems.push({
      to: '/teacher-portal',
      label: 'Portal Penilaian Guru',
      icon: FileCheck2,
      badge: 'Akses Guru',
    });
  }

  if (isAdmin) {
    navItems.push({
      to: '/admin-panel',
      label: 'Kelola Sistem Admin',
      icon: Settings,
      badge: 'Admin',
    });
  }

  const handleLogout = () => {
    onClose();
    logout();
    navigate('/login');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-start bg-slate-950/80 backdrop-blur-md animate-fadeIn lg:hidden">
        {/* Backdrop */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Drawer Content */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative z-10 w-full max-w-xs sm:max-w-sm bg-slate-900 border-r border-slate-800 h-full flex flex-col shadow-2xl overflow-y-auto"
        >
          {/* Header User Card */}
          <div className="p-5 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 p-1 flex items-center justify-center overflow-hidden">
                  {settings.logoUrl ? (
                    <img
                      src={settings.logoUrl}
                      alt="Logo"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm">LMS {settings.subjectName}</h3>
                  <span className="text-[10px] text-cyan-400 font-mono">Fase E • Kurikulum Merdeka</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white touch-target-48 transition cursor-pointer"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Detail */}
            {userSession && (
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-cyan-400">
                    {isStudent && <UserCheck className="w-5 h-5" />}
                    {isTeacher && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                    {isAdmin && <Crown className="w-5 h-5 text-violet-400" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white truncate">
                      {isStudent && student?.name}
                      {isTeacher && teacher?.name}
                      {isAdmin && 'Administrator'}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {isStudent && `${student?.nis} • Kelas ${student?.classGroup}`}
                      {isTeacher && 'Guru Pengampu Informatika'}
                      {isAdmin && 'Super Administrator'}
                    </p>
                  </div>
                </div>

                {isStudent && student && (
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                      <Crown className="w-4 h-4 text-amber-400" />
                      <span>Level {student.level}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-cyan-300 font-mono font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{student.xp} XP</span>
                    </div>
                    <div className="flex items-center gap-1 text-orange-400 font-bold">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      <span>{student.streakDays}d</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Nav List */}
          <div className="p-4 space-y-1.5 flex-1">
            <div className="text-[10px] uppercase font-bold text-slate-500 px-3 tracking-wider mb-2">
              Daftar Navigasi Menu
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all touch-target-48 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/40 shadow-md font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-cyan-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            {/* Quick Actions */}
            {isStudent && onOpenSocialModal && (
              <div className="pt-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenSocialModal();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold text-violet-300 bg-violet-500/10 border border-violet-500/30 hover:bg-violet-500/20 transition touch-target-48"
                >
                  <div className="flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-violet-400" />
                    <span>Update 4 Akun Medsos</span>
                  </div>
                  <span className="text-[10px] font-bold text-violet-400 bg-violet-950/60 px-2 py-0.5 rounded-md">
                    Profil
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* School Footer & Sign Out */}
          <div className="p-4 bg-slate-950/90 border-t border-slate-800 space-y-3">
            <div className="text-center">
              <p className="text-[11px] font-bold text-white">{settings.schoolName}</p>
              <p className="text-[10px] text-slate-400">Guru Pengampu: {settings.teacherName}</p>
            </div>

            {userSession && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-xs rounded-xl transition cursor-pointer touch-target-48"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar dari Akun</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
