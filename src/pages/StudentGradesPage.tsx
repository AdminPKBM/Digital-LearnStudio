import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  TrendingUp,
  Sparkles,
  Printer,
  ChevronRight,
  HelpCircle,
  ShieldCheck,
  Download,
  Info,
  Clock,
  Layers,
  GraduationCap,
  Percent,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { GradeCategory } from '../types';

export const StudentGradesPage: React.FC = () => {
  const { userSession } = useAuth();
  const {
    gradeItems,
    studentGrades,
    gradeWeights,
    calculateStudentFinalGrade,
    settings,
  } = useApp();

  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const currentStudentId = userSession?.profile?.id || 'student-101';
  const currentStudentName = userSession?.profile?.name || 'Ahmad Rizky Pratama';
  const currentStudentNis = (userSession?.profile as any)?.nis || '24251001';
  const currentStudentClass = (userSession?.profile as any)?.classGroup || 'X DKV 1';

  // Calculate student result
  const studentResult = useMemo(() => {
    return calculateStudentFinalGrade(currentStudentId);
  }, [calculateStudentFinalGrade, currentStudentId]);

  // Student scores map & flags
  const studentRecord = useMemo(() => {
    return studentGrades.find((r) => r.studentId === currentStudentId);
  }, [studentGrades, currentStudentId]);

  const myScores = studentRecord?.scores || {};
  const myFlags = studentRecord?.statusFlags || {};
  const myItemNotes = studentRecord?.itemNotes || {};
  const teacherNotes = studentRecord?.teacherNotes;

  // Filter grade items for student's class
  const relevantGradeItems = useMemo(() => {
    return gradeItems.filter((item) => {
      const matchesClass = !item.targetClass || item.targetClass === 'ALL' || item.targetClass === currentStudentClass;
      const matchesCategory = activeCategoryTab === 'ALL' || item.category === activeCategoryTab;
      return matchesClass && matchesCategory;
    });
  }, [gradeItems, currentStudentClass, activeCategoryTab]);

  // Category counts and statistics
  const categoryStats = useMemo(() => {
    const categories: { key: GradeCategory; label: string; weight: number }[] = [
      { key: 'HARIAN', label: 'Nilai Harian (NH)', weight: gradeWeights.harian },
      { key: 'TUGAS', label: 'Nilai Tugas', weight: gradeWeights.tugas },
      { key: 'KUIS', label: 'Nilai Kuis', weight: gradeWeights.kuis },
      { key: 'ULANGAN', label: 'Ulangan Harian (UH)', weight: gradeWeights.ulangan },
      { key: 'PRAKTIK', label: 'Nilai Praktik', weight: gradeWeights.praktik },
      { key: 'PROYEK', label: 'Penilaian Proyek (PLB)', weight: gradeWeights.proyek },
      { key: 'UJIAN', label: 'Ujian Praktik / Akhir', weight: gradeWeights.ujian },
    ];

    return categories.map((cat) => {
      const itemsInCat = gradeItems.filter(
        (i) => i.category === cat.key && (!i.targetClass || i.targetClass === 'ALL' || i.targetClass === currentStudentClass)
      );
      const avg = studentResult.categoryAverages[cat.key];
      return {
        ...cat,
        totalItems: itemsInCat.length,
        avg: avg,
      };
    });
  }, [gradeItems, currentStudentClass, gradeWeights, studentResult]);

  return (
    <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6 pb-16 print:p-0">
      {/* Header & Hero Card (Mobile-First) */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-5 sm:p-6 md:p-8 text-white shadow-xl relative overflow-hidden print:bg-white print:text-black print:p-4 print:border-b">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold print:hidden">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
              <span>Buku Nilai & Portofolio Siswa • Kurikulum Merdeka</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Rapor Nilai & Capaian Pembelajaran
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              Transparansi capaian kompetensi mata pelajaran <strong>Informatika Kelas X SMK</strong> (Tahun Pelajaran 2026/2027).
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 text-xs text-blue-100 font-medium">
              <span className="bg-white/10 px-2.5 py-1 rounded-lg">Nama: <strong className="text-white">{currentStudentName}</strong></span>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg">NIS: <strong className="text-white">{currentStudentNis}</strong></span>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg">Kelas: <strong className="text-white">{currentStudentClass}</strong></span>
              <span className="bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 px-2.5 py-1 rounded-lg">
                Tuntas: {studentResult.gradedAssessments || 0}/{studentResult.totalAssessments || gradeItems.length} ({studentResult.completionRate || 0}%)
              </span>
            </div>
          </div>

          {/* Final Grade Badge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 md:p-6 text-center min-w-[180px] sm:min-w-[200px] print:bg-transparent print:border-slate-300 print:text-black">
            <p className="text-[11px] font-bold text-blue-200 uppercase tracking-wider print:text-slate-600">Nilai Akhir Anda</p>
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white my-1 font-mono print:text-slate-900">
              {studentResult.finalGrade.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-blue-800">
                Predikat {studentResult.predicate}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  studentResult.isPassed
                    ? 'bg-emerald-400 text-emerald-950'
                    : 'bg-rose-400 text-rose-950'
                }`}
              >
                {studentResult.isPassed ? 'TUNTAS' : 'REMEDIAL'}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-blue-200 mt-2 print:text-slate-500">
              KKM Mapel: <strong>{gradeWeights.kkm || 75}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Category Summary Cards (2 cols on small phones, 3-4 on tablet, 7 on wide screens) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2.5 sm:gap-3">
        {categoryStats.map((cat) => (
          <div
            key={cat.key}
            onClick={() => setActiveCategoryTab(activeCategoryTab === cat.key ? 'ALL' : cat.key)}
            className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer touch-target-48 ${
              activeCategoryTab === cat.key
                ? 'bg-blue-50/90 border-blue-500 shadow-md dark:bg-blue-950/40 dark:border-blue-500 ring-2 ring-blue-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-bold text-[11px] truncate">{cat.label.split('(')[0]}</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono font-bold">
                {cat.weight}%
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1 sm:mt-2">
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-800 dark:text-white">
                {cat.avg !== null ? cat.avg.toFixed(1) : '-'}
              </div>
              <span className="text-[10px] text-slate-400">
                {cat.totalItems} item
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full rounded-full ${
                  cat.avg !== null && cat.avg >= (gradeWeights.kkm || 75)
                    ? 'bg-blue-600'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, cat.avg || 0)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Teacher Feedback / Notes Card */}
      {teacherNotes && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
              Catatan & Masukan dari Guru Pembimbing
            </h3>
            <p className="text-xs text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
              "{teacherNotes}"
            </p>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-2 font-medium">
              &bull; {settings.teacherName || 'Guru Pengampu'} (Guru Mapel {settings.subjectName || 'Informatika'})
            </p>
          </div>
        </div>
      )}

      {/* Category Tabs & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
        {/* Horizontal scrollable category pill bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs touch-pan-x">
          <button
            onClick={() => setActiveCategoryTab('ALL')}
            className={`px-3.5 py-2.5 font-bold rounded-xl border transition-all whitespace-nowrap touch-target-48 cursor-pointer ${
              activeCategoryTab === 'ALL'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            Semua ({gradeItems.length})
          </button>
          {(['HARIAN', 'TUGAS', 'KUIS', 'ULANGAN', 'PRAKTIK', 'PROYEK', 'UJIAN'] as GradeCategory[]).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryTab(cat)}
                className={`px-3.5 py-2.5 font-bold rounded-xl border transition-all whitespace-nowrap touch-target-48 cursor-pointer ${
                  activeCategoryTab === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                {cat === 'HARIAN'
                  ? 'NH'
                  : cat === 'ULANGAN'
                  ? 'UH'
                  : cat === 'PRAKTIK'
                  ? 'Praktik'
                  : cat === 'PROYEK'
                  ? 'Proyek'
                  : cat === 'UJIAN'
                  ? 'Ujian'
                  : cat.charAt(0) + cat.slice(1).toLowerCase()}
              </button>
            )
          )}
        </div>

        {/* View Toggle (Cards vs Table) & Print */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tampilan Kartu (Mobile-Friendly)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kartu</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tampilan Tabel Lengkap"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tabel</span>
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer touch-target-48"
          >
            <Printer className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Cetak Rapor</span>
          </button>
        </div>
      </div>

      {/* Main Grade Content: Stacked Cards OR Horizontal Scrolling Table */}
      {viewMode === 'cards' ? (
        /* 1. Mobile-First Stacked Cards View */
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Daftar {relevantGradeItems.length} Rincian Penilaian</span>
            <span>KKM: {gradeWeights.kkm || 75}</span>
          </div>

          {relevantGradeItems.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400">
              Belum ada data penilaian pada kategori ini.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {relevantGradeItems.map((item, idx) => {
                const score = myScores[item.id];
                const flag = myFlags[item.id];
                const note = myItemNotes[item.id];
                const hasScore = score !== undefined && score !== null && typeof score === 'number';
                const isPassed = hasScore && score >= (gradeWeights.kkm || 75);

                let statusBadge = (
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-medium border border-slate-700">
                    Belum Dinilai
                  </span>
                );

                if (flag === 'TMS') {
                  statusBadge = (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-bold border border-amber-800">
                      TMS (Belum Kumpul)
                    </span>
                  );
                } else if (flag === 'TM') {
                  statusBadge = (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 text-[10px] font-bold border border-rose-800">
                      TM (Tidak Hadir)
                    </span>
                  );
                } else if (hasScore) {
                  statusBadge = (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        isPassed
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                          : 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      {isPassed ? 'TUNTAS' : 'REMEDIAL'}
                    </span>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-md backdrop-blur-md flex flex-col justify-between space-y-3"
                  >
                    <div>
                      {/* Top Bar: Code, Category, Date, Status */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-lg bg-blue-500/10 text-cyan-300 border border-blue-500/30 font-bold font-mono text-[10px]">
                            {item.code}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-semibold border border-slate-700">
                            {item.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            {item.date}
                          </span>
                        </div>
                      </div>

                      {/* Title & Topic */}
                      <h4 className="text-sm font-bold text-white leading-snug">{item.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.topic}</p>
                    </div>

                    {/* Bottom Details: Score & Note */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Nilai Anda</span>
                          <span
                            className={`text-2xl font-black font-mono leading-none mt-0.5 ${
                              hasScore
                                ? isPassed
                                  ? 'text-cyan-400'
                                  : 'text-rose-400'
                                : 'text-slate-500'
                            }`}
                          >
                            {hasScore ? score : '-'}
                          </span>
                        </div>
                        <div>
                          {statusBadge}
                        </div>
                      </div>

                      {/* Rubric/Note */}
                      <div className="text-right max-w-[160px]">
                        <span className="text-[9px] text-slate-500 uppercase block font-mono">Rubrik / Masukan</span>
                        <span className="text-[11px] text-slate-300 italic truncate block">
                          {note || item.rubric || 'Sesuai Kriteria'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* 2. Responsive Table View with Smooth Horizontal Scroll */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Daftar Rincian Nilai & Capaian Tiap Asesmen
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              {relevantGradeItems.length} komponen penilaian
            </span>
          </div>

          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-[10px] uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 sticky top-0">
                <tr>
                  <th className="p-3.5 w-12 text-center">No</th>
                  <th className="p-3.5 w-24">Kode</th>
                  <th className="p-3.5 min-w-[200px]">Nama Penilaian & Materi</th>
                  <th className="p-3.5 w-28">Kategori</th>
                  <th className="p-3.5 w-28">Tanggal</th>
                  <th className="p-3.5 w-24 text-center">Nilai Anda</th>
                  <th className="p-3.5 w-32 text-center">Status</th>
                  <th className="p-3.5 min-w-[160px]">Catatan / Rubrik</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                {relevantGradeItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      Belum ada data penilaian pada kategori ini.
                    </td>
                  </tr>
                ) : (
                  relevantGradeItems.map((item, idx) => {
                    const score = myScores[item.id];
                    const flag = myFlags[item.id];
                    const note = myItemNotes[item.id];
                    const hasScore = score !== undefined && score !== null && typeof score === 'number';
                    const isPassed = hasScore && score >= (gradeWeights.kkm || 75);

                    let statusBadge = (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 text-[10px] font-medium">
                        Belum Dinilai
                      </span>
                    );

                    if (flag === 'TMS') {
                      statusBadge = (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-bold">
                          TMS
                        </span>
                      );
                    } else if (flag === 'TM') {
                      statusBadge = (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-[10px] font-bold">
                          TM
                        </span>
                      );
                    } else if (hasScore) {
                      statusBadge = (
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isPassed
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          }`}
                        >
                          {isPassed ? 'TUNTAS' : 'REMEDIAL'}
                        </span>
                      );
                    }

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-3.5 text-center text-slate-400 font-medium">
                          {idx + 1}
                        </td>

                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 font-bold font-mono text-[11px]">
                            {item.code}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <div className="font-semibold text-slate-800 dark:text-slate-100">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {item.topic}
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold">
                            {item.category}
                          </span>
                        </td>

                        <td className="p-3.5 text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{item.date}</span>
                          </div>
                        </td>

                        <td className="p-3.5 text-center">
                          {hasScore ? (
                            <span
                              className={`text-sm font-extrabold font-mono ${
                                isPassed
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-rose-600 dark:text-rose-400'
                              }`}
                            >
                              {score}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic text-[11px] font-medium">
                              -
                            </span>
                          )}
                        </td>

                        <td className="p-3.5 text-center">{statusBadge}</td>

                        <td className="p-3.5 text-slate-500 dark:text-slate-400 text-[11px] italic">
                          {note || item.rubric || '-'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
