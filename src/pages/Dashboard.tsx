import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Lock,
  Trophy,
  Flame,
  ArrowRight,
  Terminal,
  FileCheck2,
  Award,
  Calendar,
  Activity,
  Share2,
  UserCheck,
  Edit3,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { StudentProfile } from '../types';
import { StudentSocialMediaModal, PLATFORMS_CONFIG } from '../components/StudentSocialMediaModal';
import { TeacherDashboardPage } from './TeacherDashboardPage';
import { AdminDashboardPage } from './AdminDashboardPage';

export const Dashboard: React.FC = () => {
  const { userSession } = useAuth();
  const {
    modules,
    getLevelTitle,
    quizResults,
    submissions,
    settings,
    presensiOtomatis,
    loginHistory,
    aktivitasSiswa,
    calculateStudentFinalGrade,
    gradeWeights,
  } = useApp();

  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

  // If teacher or admin is logged in, show their respective dashboard
  if (userSession?.role === 'GURU' || userSession?.role === 'teacher') {
    return <TeacherDashboardPage />;
  }

  if (userSession?.role === 'admin') {
    return <AdminDashboardPage />;
  }

  const isStudent = userSession?.role === 'student' || userSession?.role === 'SISWA';
  const student = isStudent ? (userSession.profile as StudentProfile) : null;

  if (!isStudent || !student) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p className="mb-4">Silakan login sebagai Siswa untuk melihat Dashboard Anda.</p>
        <Link to="/login" className="bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl">
          Ke Halaman Login
        </Link>
      </div>
    );
  }

  // Student specific activity metrics
  const myPresensi = presensiOtomatis.filter((p) => p.id_siswa === student.id);
  const totalHariAkses = new Set(myPresensi.map((p) => p.tanggal)).size;
  const totalLogins = myPresensi.reduce((acc, p) => acc + p.jumlah_login, 0) || (loginHistory.filter((l) => l.id_siswa === student.id).length || 1);
  const myLastPresence = myPresensi.sort((a, b) => b.tanggal.localeCompare(a.tanggal))[0];
  const lastLoginStr = myLastPresence
    ? `${myLastPresence.tanggal} pkl ${myLastPresence.login_terakhir || myLastPresence.login_pertama}`
    : 'Hari ini';

  const completedCount = student.completedModuleIds.length;
  const progressPercent = Math.round((completedCount / 16) * 100);

  // Student activity counts
  const mySubmissions = submissions.filter((s) => s.studentId === student.id);
  const myQuizResults = quizResults.filter((r) => r.studentId === student.id);
  const myActivities = aktivitasSiswa.filter((a) => a.id_siswa === student.id);

  // Average quiz score
  const avgScore = myQuizResults.length > 0
    ? Math.round(myQuizResults.reduce((acc, curr) => acc + curr.score, 0) / myQuizResults.length)
    : 0;

  // Final grade calculation
  const finalGradeData = calculateStudentFinalGrade(student.id);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-8">
      {/* 1. Welcome Hero Banner (Mobile-First) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 sm:w-64 h-48 sm:h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fase E • Kurikulum Merdeka</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Selamat Belajar, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{student.name}</span>! 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kelas <strong className="text-white">{student.classGroup}</strong> • {settings.schoolName}. Selesaikan 16 modul {settings.subjectName} interaktif dan kuis untuk meraih Sertifikat Kelulusan Digital.
            </p>
          </div>

          {/* Action Buttons: Stack on Mobile (<430px), Flex Row on Larger */}
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
            <Link
              to="/modules"
              className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-5 py-3.5 sm:py-3 rounded-2xl transition shadow-lg shadow-cyan-500/20 text-xs sm:text-sm cursor-pointer touch-target-48"
            >
              <BookOpen className="w-4 h-4" />
              <span>Lanjutkan Belajar</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-3">
              <button
                onClick={() => setIsSocialModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold px-3.5 py-3 rounded-2xl transition shadow-lg shadow-violet-500/20 text-xs cursor-pointer touch-target-48 text-center"
              >
                <Share2 className="w-4 h-4 text-cyan-300 shrink-0" />
                <span className="truncate">Akun Medsos</span>
              </button>

              <Link
                to="/certificate"
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-3.5 py-3 rounded-2xl transition text-xs cursor-pointer touch-target-48 text-center"
              >
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Sertifikat</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Gamification Metrics (Single Column on Mobile <430px, 2 Cols on Tablet, 4 Cols on Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Progress Belajar */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold">Progress Modul</span>
            <span className="font-mono font-bold text-cyan-400">{completedCount}/16 Modul</span>
          </div>
          <div className="text-2xl font-extrabold text-white mb-2">{progressPercent}%</div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Level & XP */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold">Level & XP</span>
            <span className="p-1 bg-amber-500/20 text-amber-400 rounded"><Trophy className="w-3.5 h-3.5" /></span>
          </div>
          <div className="text-xl font-extrabold text-amber-300 mb-1">
            Level {student.level}: {getLevelTitle(student.level)}
          </div>
          <div className="text-xs text-slate-400 font-mono font-semibold">{student.xp} Total XP</div>
        </div>

        {/* Rapor & Nilai Akhir Mapel */}
        <Link
          to="/my-grades"
          className="bg-gradient-to-br from-blue-900/40 via-indigo-950/40 to-slate-900/80 border border-blue-500/30 hover:border-blue-400 rounded-2xl p-4 backdrop-blur-md transition group cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-blue-300 mb-2">
            <span className="font-bold flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Rapor Nilai Siswa
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 font-bold">
              KKM {gradeWeights.kkm}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-black text-white group-hover:text-cyan-300 transition font-mono">
              {finalGradeData.finalGrade}
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                finalGradeData.isPassed
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}
            >
              Predikat {finalGradeData.predicate} ({finalGradeData.isPassed ? 'TUNTAS' : 'REMEDIAL'})
            </span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Buku Nilai Transparan</span>
            <span className="text-cyan-400 font-semibold group-hover:underline">Buka Rapor &rarr;</span>
          </div>
        </Link>

        {/* Streak Harian */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold">Streak Harian</span>
            <span className="p-1 bg-orange-500/20 text-orange-400 rounded"><Flame className="w-3.5 h-3.5" /></span>
          </div>
          <div className="text-2xl font-extrabold text-orange-400 mb-1">{student.streakDays} Hari</div>
          <div className="text-xs text-slate-400">Aktif Login Berkelanjutan</div>
        </div>
      </div>

      {/* 3. Ringkasan Presensi & Aktivitas Siswa */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">Aktivitas Saya</h3>
              <p className="text-xs text-slate-400">Presensi otomatis harian & riwayat pembelajaran di LMS</p>
            </div>
          </div>
          <div className="text-xs text-left sm:text-right font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            Login Terakhir: {lastLoginStr}
          </div>
        </div>

        {/* Responsive Grid: 1 col on small phones, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-1">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Hari Akses LMS</span>
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{totalHariAkses || 1} Hari</span>
            <span className="text-[10px] text-emerald-400 block mt-1">Presensi Otomatis Harian</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Total Frekuensi Login</span>
            <span className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">{totalLogins} Kali</span>
            <span className="text-[10px] text-slate-400 block mt-1">Tercatat di Riwayat Login</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Kuis & Tugas Selesai</span>
            <span className="text-xl sm:text-2xl font-black text-indigo-400 font-mono">{myQuizResults.length + mySubmissions.length} Item</span>
            <span className="text-[10px] text-slate-400 block mt-1">{myQuizResults.length} Kuis • {mySubmissions.length} Tugas</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Aktivitas LMS Terbaca</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{myActivities.length || 4} Aksi</span>
            <span className="text-[10px] text-emerald-400 block mt-1">Materi, Simulator, Nilai</span>
          </div>
        </div>
      </div>

      {/* 4. Rekomendasi Modul Informatika (Single Column on Mobile, 2 on Tablet, 3 on Desktop) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>Modul Informatika Kelas X (Fase E)</span>
          </h3>
          <Link to="/modules" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            <span>Semua 16 Modul</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.slice(0, 6).map((mod) => {
            const isCompleted = student.completedModuleIds.includes(mod.id);
            return (
              <div
                key={mod.id}
                className={`bg-slate-900/80 border rounded-2xl p-4 sm:p-5 backdrop-blur-md flex flex-col justify-between transition-all duration-200 ${
                  isCompleted ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
                      {mod.id}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> Selesai
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">{mod.estimatedTimeMinutes} Menit</span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">{mod.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">{mod.summary}</p>
                </div>

                <Link
                  to={`/module/${mod.id}`}
                  className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 font-bold text-xs py-3 rounded-xl transition cursor-pointer touch-target-48"
                >
                  <span>{isCompleted ? 'Ulangi Materi' : 'Pelajari Modul'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Quick Action Sandboxes (1 Column on small mobile, 2 on tablet, 4 on desktop) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>Sandbox Interaktif Browser</span>
          </h3>
          <Link to="/sandboxes" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            <span>Lihat 8 Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: 'Flowchart Builder', desc: 'Drag & Drop diagram algoritma', color: 'from-cyan-500/20 to-blue-500/20' },
            { title: 'JS Code Playground', desc: 'Tulis & eksekusi kode JS', color: 'from-rose-500/20 to-pink-500/20' },
            { title: 'Network Topology', desc: 'Simulasi topologi & ping test', color: 'from-emerald-500/20 to-teal-500/20' },
            { title: 'Data Viz Lab', desc: 'Analisis & visualisasi data', color: 'from-indigo-500/20 to-violet-500/20' },
          ].map((box, i) => (
            <Link
              key={i}
              to="/sandboxes"
              className={`p-3.5 bg-gradient-to-br ${box.color} border border-slate-800 rounded-xl hover:border-cyan-500/40 transition group cursor-pointer touch-target-48`}
            >
              <div className="text-xs font-bold text-white group-hover:text-cyan-300 mb-0.5">{box.title}</div>
              <div className="text-[10px] text-slate-400">{box.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* 6. Card Rekomendasi Update Media Sosial Siswa */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">Profil & Medsos Siswa</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {Object.values(student.socialMedia || {}).filter((v) => typeof v === 'string' && v.trim().length > 0).length} / 4 Terisi
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Lengkapi username media sosial untuk portofolio digital Anda.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSocialModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-3 rounded-xl transition cursor-pointer shrink-0 shadow-lg shadow-cyan-500/10 touch-target-48"
          >
            <Edit3 className="w-4 h-4" />
            <span>Kelola / Edit Akun Medsos</span>
          </button>
        </div>

        {/* Social Media Chips Grid (Single-col/2-col on small phones) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
          {PLATFORMS_CONFIG.map((platform) => {
            const handle = student.socialMedia?.[platform.key];
            const isFilled = handle && handle.trim().length > 0;

            return (
              <div
                key={platform.key}
                onClick={() => setIsSocialModalOpen(true)}
                className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-2 touch-target-48 ${
                  isFilled
                    ? `${platform.bgColor} ${platform.borderColor} hover:border-cyan-400`
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="min-w-0">
                  <div className="text-[11px] font-bold truncate">
                    <span className={isFilled ? platform.color : 'text-slate-400'}>{platform.name}</span>
                  </div>
                  <div className="text-[10px] font-mono truncate text-slate-300">
                    {isFilled ? handle : <span className="text-slate-600 italic">Belum diisi</span>}
                  </div>
                </div>

                {isFilled ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <span className="text-[10px] text-cyan-400 font-mono shrink-0">+ Isi</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <StudentSocialMediaModal
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
        student={student}
      />
    </div>
  );
};
