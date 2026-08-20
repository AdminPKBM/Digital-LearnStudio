import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  X,
  CheckCircle2,
  AlertCircle,
  Megaphone,
  Award,
  Sparkles,
  Calendar,
  Clock,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { StudentProfile } from '../../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const { userSession } = useAuth();
  const { announcements, presensiOtomatis, quizResults, submissions, gradeItems } = useApp();

  if (!isOpen) return null;

  const isStudent = userSession?.role === 'SISWA' || userSession?.role === 'student';
  const student = isStudent ? (userSession.profile as StudentProfile) : null;

  // Build notifications list
  const notifications = [];

  // 1. Announcements
  announcements.slice(0, 3).forEach((a) => {
    notifications.push({
      id: `ann-${a.id}`,
      type: 'ANNOUNCEMENT',
      title: a.title,
      description: a.content,
      time: a.date,
      icon: Megaphone,
      iconColor: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
      actionUrl: '/modules',
      actionLabel: 'Buka Materi',
    });
  });

  // 2. Attendance confirmation
  if (student) {
    const myPresensi = presensiOtomatis.filter((p) => p.id_siswa === student.id);
    if (myPresensi.length > 0) {
      const last = myPresensi[myPresensi.length - 1];
      notifications.push({
        id: `att-${last.id}`,
        type: 'ATTENDANCE',
        title: 'Presensi Otomatis Harian Tercatat',
        description: `Kehadiran Anda pada ${last.tanggal} pkl ${last.login_terakhir || last.login_pertama} telah otomatis terekam di sistem.`,
        time: last.tanggal,
        icon: CheckCircle2,
        iconColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
        actionUrl: '/',
        actionLabel: 'Lihat Aktivitas',
      });
    }
  }

  // 3. Quiz & Tasks reminder
  notifications.push({
    id: 'quiz-reminder',
    type: 'QUIZ',
    title: 'Asesmen & Kuis Interaktif Tersedia',
    description: 'Selesaikan kuis di 8 elemen Informatika Fase E untuk meningkatkan perolehan XP dan Level Anda.',
    time: 'Hari ini',
    icon: Sparkles,
    iconColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
    actionUrl: '/my-grades',
    actionLabel: 'Buku Nilai',
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-end sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
        {/* Backdrop overlay */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Drawer Card */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full sm:max-w-md bg-slate-900 border-b sm:border border-slate-800 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:mt-12 sm:mr-4"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">Notifikasi & Informasi</h3>
                <p className="text-[11px] text-slate-400">Pemberitahuan aktivitas pembelajaran LAMS</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition cursor-pointer touch-target-48"
              aria-label="Tutup notifikasi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="p-4 space-y-3 overflow-y-auto divide-y divide-slate-800/40">
            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <div key={notif.id} className="pt-3 first:pt-0">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition">
                    <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${notif.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-xs font-bold text-white truncate">{notif.title}</h4>
                        <span className="text-[10px] text-slate-500 shrink-0 font-mono">{notif.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-2">
                        {notif.description}
                      </p>
                      <Link
                        to={notif.actionUrl}
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
                      >
                        <span>{notif.actionLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-950/80 border-t border-slate-800 text-center">
            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition cursor-pointer touch-target-48"
            >
              Tutup Panel Notifikasi
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
