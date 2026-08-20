import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Table,
  Plus,
  Trash2,
  Edit2,
  Sliders,
  Download,
  Upload,
  Printer,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Award,
  Sparkles,
  Layers,
  FileSpreadsheet,
  Check,
  X,
  HelpCircle,
  BookOpen,
  Calendar,
  Info,
  ChevronRight,
  TrendingUp,
  UserCheck,
  Zap,
  MoreHorizontal,
  FileText,
  AlertTriangle,
  ArrowUpDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GradeCategory, GradeItem, StudentProfile, StudentGradeRecord } from '../../types';
import { GradeWeightsModal } from './GradeWeightsModal';
import { GradeColumnModal } from './GradeColumnModal';
import { StudentGradeDetailModal } from './StudentGradeDetailModal';
import { GradeStatisticsView } from './GradeStatisticsView';
import { AssessmentBatchGradingModal } from './AssessmentBatchGradingModal';

export const TeacherGradebook: React.FC = () => {
  const {
    classes,
    students,
    gradeItems,
    saveGradeItem,
    deleteGradeItem,
    studentGrades,
    updateSingleScore,
    saveStudentGrade,
    saveStudentGradeBatch,
    gradeWeights,
    saveGradeWeights,
    calculateStudentFinalGrade,
    settings,
  } = useApp();

  // Filters & State
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSemester, setSelectedSemester] = useState<string>('GANJIL');
  const [selectedYear, setSelectedYear] = useState<string>('2026/2027');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'nis' | 'finalGrade' | 'completion'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Modals state
  const [isWeightsModalOpen, setIsWeightsModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isBatchGradingModalOpen, setIsBatchGradingModalOpen] = useState(false);
  const [batchGradingItemId, setBatchGradingItemId] = useState<string | null>(null);
  const [editingColumnItem, setEditingColumnItem] = useState<GradeItem | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<StudentProfile | null>(null);
  const [quickActionColumnId, setQuickActionColumnId] = useState<string | null>(null);

  // Quick Score edit tracker
  const [localScores, setLocalScores] = useState<Record<string, Record<string, number | null>>>({});

  // Initialize local score buffers from AppContext
  useEffect(() => {
    const map: Record<string, Record<string, number | null>> = {};
    studentGrades.forEach((rec) => {
      map[rec.studentId] = { ...rec.scores };
    });
    setLocalScores(map);
  }, [studentGrades]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter students based on class and search query
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        const matchesClass = selectedClass === 'ALL' || s.classGroup === selectedClass;
        const q = searchQuery.toLowerCase();
        const matchesSearch = !q || s.name.toLowerCase().includes(q) || (s.nis && s.nis.includes(q));
        return matchesClass && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        if (sortBy === 'nis') {
          return sortOrder === 'asc' ? (a.nis || '').localeCompare(b.nis || '') : (b.nis || '').localeCompare(a.nis || '');
        }
        if (sortBy === 'finalGrade') {
          const gA = calculateStudentFinalGrade(a.id).finalGrade;
          const gB = calculateStudentFinalGrade(b.id).finalGrade;
          return sortOrder === 'asc' ? gA - gB : gB - gA;
        }
        if (sortBy === 'completion') {
          const cA = calculateStudentFinalGrade(a.id).completionRate || 0;
          const cB = calculateStudentFinalGrade(b.id).completionRate || 0;
          return sortOrder === 'asc' ? cA - cB : cB - cA;
        }
        return 0;
      });
  }, [students, selectedClass, searchQuery, sortBy, sortOrder, calculateStudentFinalGrade]);

  // Filter grade columns
  const filteredGradeItems = useMemo(() => {
    return gradeItems.filter((item) => {
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchesClass = !item.targetClass || item.targetClass === 'ALL' || selectedClass === 'ALL' || item.targetClass === selectedClass;
      return matchesCategory && matchesClass;
    });
  }, [gradeItems, selectedCategory, selectedClass]);

  // Category navigation tabs
  const categoryTabs: { id: string; label: string; count: number; weight: number }[] = [
    { id: 'ALL', label: 'Semua Rekap Master', count: gradeItems.length, weight: 100 },
    { id: 'HARIAN', label: 'Nilai Harian (NH)', count: gradeItems.filter((i) => i.category === 'HARIAN').length, weight: gradeWeights.harian },
    { id: 'TUGAS', label: 'Tugas', count: gradeItems.filter((i) => i.category === 'TUGAS').length, weight: gradeWeights.tugas },
    { id: 'KUIS', label: 'Kuis', count: gradeItems.filter((i) => i.category === 'KUIS').length, weight: gradeWeights.kuis },
    { id: 'ULANGAN', label: 'Ulangan (UH)', count: gradeItems.filter((i) => i.category === 'ULANGAN').length, weight: gradeWeights.ulangan },
    { id: 'PRAKTIK', label: 'Praktik', count: gradeItems.filter((i) => i.category === 'PRAKTIK').length, weight: gradeWeights.praktik },
    { id: 'PROYEK', label: 'Proyek (PLB)', count: gradeItems.filter((i) => i.category === 'PROYEK').length, weight: gradeWeights.proyek },
    { id: 'UJIAN', label: 'Ujian Praktik', count: gradeItems.filter((i) => i.category === 'UJIAN').length, weight: gradeWeights.ujian },
    { id: 'STATISTIK', label: 'Statistik & Remedial', count: 0, weight: 0 },
  ];

  // Cell score change handler
  const handleScoreChange = (studentId: string, itemId: string, valueStr: string) => {
    let parsed: number | null = null;
    if (valueStr.trim() !== '') {
      const num = parseFloat(valueStr);
      if (!isNaN(num)) {
        parsed = Math.max(0, Math.min(100, Math.round(num * 10) / 10));
      }
    }

    setLocalScores((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [itemId]: parsed,
      },
    }));

    // Update in Storage / State
    updateSingleScore(studentId, itemId, parsed);
  };

  // Status flag toggle (TMS / TM / Normal)
  const handleSetStatusFlag = (studentId: string, itemId: string, flag: 'DINILAI' | 'TMS' | 'TM' | 'BELUM_DINILAI') => {
    const existingRec = studentGrades.find((r) => r.studentId === studentId);
    const flags = { ...(existingRec?.statusFlags || {}) };
    const scores = { ...(existingRec?.scores || {}) };

    if (flag === 'BELUM_DINILAI' || flag === 'DINILAI') {
      delete flags[itemId];
    } else {
      flags[itemId] = flag;
      // If TMS or TM, score can be null or 0 depending on teacher preference
      scores[itemId] = null;
    }

    const updatedRec: StudentGradeRecord = {
      id: studentId,
      studentId,
      studentNis: existingRec?.studentNis || '',
      studentName: existingRec?.studentName || '',
      classGroup: existingRec?.classGroup || '',
      scores,
      statusFlags: flags,
      itemNotes: existingRec?.itemNotes || {},
      teacherNotes: existingRec?.teacherNotes,
      updatedAt: new Date().toISOString(),
    };

    saveStudentGrade(updatedRec);
    showToast(`Status ${flag === 'TMS' ? 'Tidak Mengumpulkan' : flag === 'TM' ? 'Tidak Hadir' : 'Direset'} disimpan.`);
  };

  // Keyboard navigation across cells
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, studentIndex: number, itemIndex: number) => {
    if (e.key === 'Enter' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextInput = document.getElementById(`cell-${studentIndex + 1}-${itemIndex}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevInput = document.getElementById(`cell-${studentIndex - 1}-${itemIndex}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  // Quick Action for a column: Fill default KKM, clear, etc.
  const handleQuickFillColumn = (itemId: string, action: 'fill_kkm' | 'clear' | 'fill_100') => {
    const kkm = gradeWeights.kkm || 75;
    const targetStudents = filteredStudents;
    const recordsToUpdate: StudentGradeRecord[] = [];

    targetStudents.forEach((st) => {
      const existing = studentGrades.find((r) => r.studentId === st.id);
      const scores = { ...(existing?.scores || {}) };

      if (action === 'fill_kkm') {
        if (scores[itemId] === undefined || scores[itemId] === null) {
          scores[itemId] = kkm;
        }
      } else if (action === 'fill_100') {
        scores[itemId] = 100;
      } else if (action === 'clear') {
        delete scores[itemId];
      }

      recordsToUpdate.push({
        id: st.id,
        studentId: st.id,
        studentNis: st.nis,
        studentName: st.name,
        classGroup: st.classGroup,
        scores,
        statusFlags: existing?.statusFlags || {},
        itemNotes: existing?.itemNotes || {},
        teacherNotes: existing?.teacherNotes,
        updatedAt: new Date().toISOString(),
      });
    });

    saveStudentGradeBatch(recordsToUpdate);
    setQuickActionColumnId(null);
    showToast(`Aksi kolom berhasil diterapkan untuk ${targetStudents.length} siswa.`);
  };

  // CSV / Excel Export
  const handleExportCSV = () => {
    const kkm = gradeWeights.kkm || 75;
    const headers = [
      'No',
      'NIS',
      'Nama Siswa',
      'Kelas',
      ...gradeItems.map((gi) => `${gi.code} (${gi.category})`),
      'Rata NH',
      'Rata Tugas',
      'Rata Kuis',
      'Rata UH',
      'Rata Praktik',
      'Rata Proyek',
      'Ujian Praktik',
      'Nilai Akhir',
      'Predikat',
      'Status Ketuntasan',
      'Catatan Guru',
    ];

    const rows = filteredStudents.map((student, idx) => {
      const calc = calculateStudentFinalGrade(student.id);
      const rec = studentGrades.find((r) => r.studentId === student.id);
      const sc = rec?.scores || {};

      const itemScores = gradeItems.map((gi) => {
        const val = sc[gi.id];
        return val !== undefined && val !== null ? val : '';
      });

      return [
        idx + 1,
        `"${student.nis}"`,
        `"${student.name}"`,
        `"${student.classGroup}"`,
        ...itemScores,
        calc.categoryAverages.HARIAN !== null ? calc.categoryAverages.HARIAN : '',
        calc.categoryAverages.TUGAS !== null ? calc.categoryAverages.TUGAS : '',
        calc.categoryAverages.KUIS !== null ? calc.categoryAverages.KUIS : '',
        calc.categoryAverages.ULANGAN !== null ? calc.categoryAverages.ULANGAN : '',
        calc.categoryAverages.PRAKTIK !== null ? calc.categoryAverages.PRAKTIK : '',
        calc.categoryAverages.PROYEK !== null ? calc.categoryAverages.PROYEK : '',
        calc.categoryAverages.UJIAN !== null ? calc.categoryAverages.UJIAN : '',
        calc.finalGrade,
        calc.predicate,
        calc.isPassed ? 'TUNTAS' : 'REMEDIAL',
        `"${(rec?.teacherNotes || '').replace(/"/g, '""')}"`,
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Nilai_Informatika_${selectedClass}_${selectedYear.replace('/', '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('File CSV Rapor Penilaian berhasil diekspor.');
  };

  const handlePrint = () => {
    window.print();
  };

  const kkm = gradeWeights.kkm || 75;

  return (
    <div className="space-y-5 animate-fadeIn pb-12 print:p-0">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 right-5 z-50 px-4 py-2.5 rounded-2xl shadow-xl border text-xs font-bold flex items-center gap-2 ${
              toastMessage.type === 'error'
                ? 'bg-rose-600 text-white border-rose-700'
                : toastMessage.type === 'info'
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-emerald-600 text-white border-emerald-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 print:hidden">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Sistem Penilaian Buku Nilai Digital • Kurikulum Merdeka Fase E</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Buku Nilai & Rekapitulasi Pembelajaran
          </h2>
          <p className="text-xs md:text-sm text-blue-100 max-w-2xl">
            Kelola seluruh komponen penilaian (Harian, Tugas, Kuis, Ulangan, Praktik, Proyek, Ujian) dengan kalkulasi otomatis, fleksibel tanpa batas statis, dan akurat.
          </p>
        </div>

        {/* Global Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setBatchGradingItemId(null);
              setIsBatchGradingModalOpen(true);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-extrabold rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-slate-950" />
            <span>📝 Form Input Nilai Siswa</span>
          </button>

          <button
            onClick={() => {
              setEditingColumnItem(null);
              setIsColumnModalOpen(true);
            }}
            className="px-4 py-2.5 bg-white text-blue-800 hover:bg-blue-50 font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-black/10 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Tambah Penilaian</span>
          </button>

          <button
            onClick={() => setIsWeightsModalOpen(true)}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-2xl text-xs flex items-center gap-2 backdrop-blur-md transition cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-cyan-300" />
            <span>Bobot Penilaian ({gradeWeights.kkm ? `KKM ${gradeWeights.kkm}` : 'Atur'})</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 transition cursor-pointer"
            title="Export ke Excel / CSV"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 transition cursor-pointer"
            title="Cetak Rekap Nilai"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Cetak</span>
          </button>
        </div>
      </div>

      {/* Filter & Control Toolbar */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3 print:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          {/* Tahun Pelajaran */}
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">
              TAHUN PELAJARAN
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white font-medium"
            >
              <option value="2026/2027">2026/2027</option>
              <option value="2025/2026">2025/2026</option>
            </select>
          </div>

          {/* Semester */}
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">
              SEMESTER
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white font-medium"
            >
              <option value="GANJIL">Semester 1 (Ganjil)</option>
              <option value="GENAP">Semester 2 (Genap)</option>
            </select>
          </div>

          {/* Rombel / Kelas */}
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">
              ROMBEL / KELAS
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white font-semibold"
            >
              <option value="ALL">Semua Kelas ({students.length} Siswa)</option>
              {classes.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Mata Pelajaran */}
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">
              MATA PELAJARAN
            </label>
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-300">
              Informatika (Fase E)
            </div>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">
              CARI SISWA
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Nama atau NIS..."
                className="w-full pl-8 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-white font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {categoryTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                }`}
              >
                <span>{tab.label}</span>
                {tab.id !== 'ALL' && tab.id !== 'STATISTIK' && (
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* VIEW 1: STATISTIK & REMEDIAL TAB */}
      {/* ======================================================== */}
      {selectedCategory === 'STATISTIK' ? (
        <GradeStatisticsView
          selectedClass={selectedClass}
          students={students}
          gradeItems={gradeItems}
          studentGrades={studentGrades}
          gradeWeights={gradeWeights}
          calculateStudentFinalGrade={calculateStudentFinalGrade}
          onOpenStudentDetail={(student) => setSelectedStudentForDetail(student)}
        />
      ) : selectedCategory === 'ALL' ? (
        /* ======================================================== */
        /* VIEW 2: MASTER REKAP SEMUA KATEGORI & NILAI AKHIR */
        /* ======================================================== */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden space-y-4">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">
                  Master Rekapitulasi Nilai Akhir Siswa
                </h3>
                <p className="text-[11px] text-slate-400">
                  Rata-rata 7 komponen terbobot otomatis berdasarkan persentase yang dikonfigurasi
                </p>
              </div>
            </div>

            {/* Sorting controls */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 font-medium"
              >
                <option value="name">Nama Siswa</option>
                <option value="nis">NIS</option>
                <option value="finalGrade">Nilai Akhir</option>
                <option value="completion">Kelengkapan Asesmen</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 text-slate-600 dark:text-slate-300"
                title="Balik Urutan"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3 w-10 text-center">No</th>
                  <th className="p-3 w-20">NIS</th>
                  <th className="p-3 min-w-[180px]">Nama Siswa</th>
                  <th className="p-3 w-20">Kelas</th>
                  <th className="p-3 text-center w-20 text-blue-600 dark:text-blue-400">
                    NH ({gradeWeights.harian}%)
                  </th>
                  <th className="p-3 text-center w-20 text-emerald-600 dark:text-emerald-400">
                    Tugas ({gradeWeights.tugas}%)
                  </th>
                  <th className="p-3 text-center w-20 text-amber-600 dark:text-amber-400">
                    Kuis ({gradeWeights.kuis}%)
                  </th>
                  <th className="p-3 text-center w-20 text-purple-600 dark:text-purple-400">
                    UH ({gradeWeights.ulangan}%)
                  </th>
                  <th className="p-3 text-center w-20 text-rose-600 dark:text-rose-400">
                    Praktik ({gradeWeights.praktik}%)
                  </th>
                  <th className="p-3 text-center w-20 text-indigo-600 dark:text-indigo-400">
                    Proyek ({gradeWeights.proyek}%)
                  </th>
                  <th className="p-3 text-center w-20 text-cyan-600 dark:text-cyan-400">
                    Ujian ({gradeWeights.ujian}%)
                  </th>
                  <th className="p-3 text-center w-24 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200">
                    Nilai Akhir
                  </th>
                  <th className="p-3 text-center w-16">Predikat</th>
                  <th className="p-3 text-center w-24">Status</th>
                  <th className="p-3 text-center w-28 print:hidden">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={15} className="p-8 text-center text-slate-400">
                      Tidak ada siswa ditemukan pada kelas atau kata kunci pencarian ini.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, idx) => {
                    const calc = calculateStudentFinalGrade(student.id);
                    const avgs = calc.categoryAverages;

                    return (
                      <tr
                        key={student.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
                      >
                        <td className="p-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                        <td className="p-3 font-mono text-slate-500 text-[11px]">{student.nis}</td>
                        <td className="p-3 font-bold text-slate-800 dark:text-white">
                          <button
                            onClick={() => setSelectedStudentForDetail(student)}
                            className="hover:text-blue-600 dark:hover:text-blue-400 text-left hover:underline cursor-pointer"
                          >
                            {student.name}
                          </button>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {student.classGroup}
                          </span>
                        </td>

                        {/* Category Averages */}
                        <td className="p-3 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                          {avgs.HARIAN !== null ? avgs.HARIAN.toFixed(1) : '-'}
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                          {avgs.TUGAS !== null ? avgs.TUGAS.toFixed(1) : '-'}
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                          {avgs.KUIS !== null ? avgs.KUIS.toFixed(1) : '-'}
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                          {avgs.ULANGAN !== null ? avgs.ULANGAN.toFixed(1) : '-'}
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                          {avgs.PRAKTIK !== null ? avgs.PRAKTIK.toFixed(1) : '-'}
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                          {avgs.PROYEK !== null ? avgs.PROYEK.toFixed(1) : '-'}
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                          {avgs.UJIAN !== null ? avgs.UJIAN.toFixed(1) : '-'}
                        </td>

                        {/* Nilai Akhir */}
                        <td className="p-3 text-center font-mono font-extrabold text-sm bg-blue-50/40 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300">
                          {calc.finalGrade.toFixed(1)}
                        </td>

                        {/* Predikat */}
                        <td className="p-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              calc.predicate === 'A'
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                : calc.predicate === 'B'
                                ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                                : calc.predicate === 'C'
                                ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                                : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                            }`}
                          >
                            {calc.predicate}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="p-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              calc.isPassed
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                            }`}
                          >
                            {calc.isPassed ? 'TUNTAS' : 'REMEDIAL'}
                          </span>
                        </td>

                        {/* Action buttons */}
                        <td className="p-3 text-center print:hidden">
                          <button
                            onClick={() => setSelectedStudentForDetail(student)}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg text-[11px] font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
                          >
                            Rapor Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* VIEW 3: GRID INPUT PENILAIAN PER KATEGORI DENGAN SHORTCUT & CELL EDIT */
        /* ======================================================== */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden space-y-4">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/50 rounded-xl text-blue-600 dark:text-blue-400">
                <Table className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">
                  Input Nilai: {categoryTabs.find((t) => t.id === selectedCategory)?.label}
                </h3>
                <p className="text-[11px] text-slate-400">
                  Gunakan tombol panah (Up/Down/Enter) untuk navigasi cepat antar sel siswa.
                </p>
              </div>
            </div>

            {/* Category Quick Info */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setBatchGradingItemId(filteredGradeItems[0]?.id || null);
                  setIsBatchGradingModalOpen(true);
                }}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition cursor-pointer"
                title="Buka form input nilai lengkap untuk kategori ini"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>📝 Form Input Nilai {selectedCategory}</span>
              </button>

              <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Bobot: {categoryTabs.find((t) => t.id === selectedCategory)?.weight}%
              </span>
              <button
                onClick={() => {
                  setEditingColumnItem(null);
                  setIsColumnModalOpen(true);
                }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Kolom {selectedCategory}</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3 w-10 text-center sticky left-0 bg-slate-50 dark:bg-slate-850 z-10">No</th>
                  <th className="p-3 w-20 sticky left-10 bg-slate-50 dark:bg-slate-850 z-10">NIS</th>
                  <th className="p-3 min-w-[170px] sticky left-28 bg-slate-50 dark:bg-slate-850 z-10 shadow-r">
                    Nama Siswa
                  </th>

                  {/* Assessment Columns */}
                  {filteredGradeItems.map((item, itemIdx) => (
                    <th key={item.id} className="p-3 min-w-[130px] text-center border-l border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-mono font-extrabold text-blue-600 dark:text-blue-400 text-xs">
                          {item.code}
                        </span>
                        <div className="flex items-center gap-0.5 print:hidden">
                          <button
                            onClick={() => {
                              setEditingColumnItem(item);
                              setIsColumnModalOpen(true);
                            }}
                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            title="Edit Info Kolom"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Yakin ingin menghapus kolom ${item.code} (${item.name})?`)) {
                                deleteGradeItem(item.id);
                                showToast(`Kolom ${item.code} berhasil dihapus.`);
                              }
                            }}
                            className="p-1 hover:bg-rose-100 rounded text-slate-400 hover:text-rose-600"
                            title="Hapus Kolom"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[10px] font-normal normal-case text-slate-500 dark:text-slate-400 truncate max-w-[120px]" title={item.topic}>
                        {item.topic || item.name}
                      </div>

                      {/* Quick Fill Dropdown */}
                      <div className="mt-1 pt-1 border-t border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-center gap-1 print:hidden">
                        <button
                          onClick={() => {
                            setBatchGradingItemId(item.id);
                            setIsBatchGradingModalOpen(true);
                          }}
                          className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 hover:bg-emerald-200 text-emerald-800 dark:text-emerald-300 text-[9px] font-bold flex items-center gap-0.5"
                          title="Buka form input & rekap nilai untuk kolom ini"
                        >
                          <UserCheck className="w-2.5 h-2.5" />
                          <span>Input</span>
                        </button>
                        <button
                          onClick={() => handleQuickFillColumn(item.id, 'fill_kkm')}
                          className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 hover:bg-blue-200 text-blue-700 dark:text-blue-300 text-[9px] font-semibold"
                          title="Isi nilai KKM untuk siswa yang kosong"
                        >
                          Isi KKM
                        </button>
                        <button
                          onClick={() => handleQuickFillColumn(item.id, 'clear')}
                          className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-400 text-[9px]"
                          title="Kosongkan nilai kolom ini"
                        >
                          Reset
                        </button>
                      </div>
                    </th>
                  ))}

                  {/* Rata-rata Kategori Kolom */}
                  <th className="p-3 w-24 text-center border-l border-slate-200 dark:border-slate-800 bg-blue-50/50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-200">
                    Rata-rata
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={filteredGradeItems.length + 4} className="p-8 text-center text-slate-400">
                      Tidak ada siswa ditemukan.
                    </td>
                  </tr>
                ) : filteredGradeItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      Belum ada kolom penilaian pada kategori {selectedCategory}. Klik "+ Kolom {selectedCategory}" untuk membuat.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, studentIdx) => {
                    const studentRecord = studentGrades.find((r) => r.studentId === student.id);
                    const calc = calculateStudentFinalGrade(student.id);
                    const catAvg = calc.categoryAverages[selectedCategory as GradeCategory];

                    return (
                      <tr
                        key={student.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
                      >
                        <td className="p-3 text-center text-slate-400 font-mono sticky left-0 bg-white dark:bg-slate-900">
                          {studentIdx + 1}
                        </td>
                        <td className="p-3 font-mono text-slate-500 text-[11px] sticky left-10 bg-white dark:bg-slate-900">
                          {student.nis}
                        </td>
                        <td className="p-3 font-bold text-slate-800 dark:text-white sticky left-28 bg-white dark:bg-slate-900 shadow-r">
                          <button
                            onClick={() => setSelectedStudentForDetail(student)}
                            className="hover:text-blue-600 dark:hover:text-blue-400 text-left hover:underline cursor-pointer"
                          >
                            {student.name}
                          </button>
                        </td>

                        {/* Interactive Cells */}
                        {filteredGradeItems.map((item, itemIdx) => {
                          const currentScore = localScores[student.id]?.[item.id];
                          const flag = studentRecord?.statusFlags?.[item.id];
                          const isTMS = flag === 'TMS';
                          const isTM = flag === 'TM';

                          return (
                            <td
                              key={item.id}
                              className="p-2 text-center border-l border-slate-100 dark:border-slate-800/80"
                            >
                              <div className="flex items-center justify-center gap-1">
                                {isTMS ? (
                                  <span
                                    onClick={() => handleSetStatusFlag(student.id, item.id, 'BELUM_DINILAI')}
                                    className="px-2 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-[10px] cursor-pointer hover:bg-amber-200"
                                    title="Klik untuk reset status TMS"
                                  >
                                    TMS
                                  </span>
                                ) : isTM ? (
                                  <span
                                    onClick={() => handleSetStatusFlag(student.id, item.id, 'BELUM_DINILAI')}
                                    className="px-2 py-1 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold text-[10px] cursor-pointer hover:bg-rose-200"
                                    title="Klik untuk reset status TM"
                                  >
                                    TM
                                  </span>
                                ) : (
                                  <input
                                    id={`cell-${studentIdx}-${itemIdx}`}
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={currentScore !== undefined && currentScore !== null ? currentScore : ''}
                                    onChange={(e) => handleScoreChange(student.id, item.id, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, studentIdx, itemIdx)}
                                    placeholder="-"
                                    className={`w-14 p-1.5 text-center font-mono font-bold text-xs rounded-lg border transition ${
                                      currentScore !== undefined && currentScore !== null
                                        ? currentScore >= kkm
                                          ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                                          : 'bg-rose-50/70 border-rose-300 dark:bg-rose-950/30 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                                        : 'bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-white'
                                    } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                  />
                                )}

                                {/* Quick Flag Menu Toggle */}
                                <div className="relative group">
                                  <button
                                    className="p-1 text-slate-300 hover:text-slate-600 dark:hover:text-slate-200 rounded"
                                    title="Opsi Khusus (TMS / TM)"
                                  >
                                    <MoreHorizontal className="w-3 h-3" />
                                  </button>
                                  <div className="absolute right-0 top-6 hidden group-hover:flex flex-col bg-slate-900 text-white rounded-xl shadow-2xl p-1 z-30 min-w-[120px] text-[10px]">
                                    <button
                                      onClick={() => handleSetStatusFlag(student.id, item.id, 'TMS')}
                                      className="px-2 py-1 hover:bg-slate-800 text-left rounded font-semibold text-amber-300"
                                    >
                                      Tandai TMS
                                    </button>
                                    <button
                                      onClick={() => handleSetStatusFlag(student.id, item.id, 'TM')}
                                      className="px-2 py-1 hover:bg-slate-800 text-left rounded font-semibold text-rose-300"
                                    >
                                      Tandai TM
                                    </button>
                                    <button
                                      onClick={() => handleScoreChange(student.id, item.id, '0')}
                                      className="px-2 py-1 hover:bg-slate-800 text-left rounded font-semibold text-red-400"
                                    >
                                      Set Nilai 0
                                    </button>
                                    <button
                                      onClick={() => handleSetStatusFlag(student.id, item.id, 'BELUM_DINILAI')}
                                      className="px-2 py-1 hover:bg-slate-800 text-left rounded font-semibold text-slate-400"
                                    >
                                      Kosongkan
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                          );
                        })}

                        {/* Rata-rata Kategori */}
                        <td className="p-3 text-center font-mono font-extrabold text-xs border-l border-slate-200 dark:border-slate-800 bg-blue-50/30 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300">
                          {catAvg !== null && catAvg !== undefined ? catAvg.toFixed(1) : '-'}
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

      {/* Modals Integration */}
      <GradeWeightsModal
        isOpen={isWeightsModalOpen}
        onClose={() => setIsWeightsModalOpen(false)}
        currentWeights={gradeWeights}
        onSave={(weights) => {
          saveGradeWeights(weights);
          showToast('Konfigurasi bobot penilaian berhasil diperbarui.');
        }}
      />

      <GradeColumnModal
        isOpen={isColumnModalOpen}
        onClose={() => {
          setIsColumnModalOpen(false);
          setEditingColumnItem(null);
        }}
        editingItem={editingColumnItem}
        defaultCategory={selectedCategory !== 'ALL' && selectedCategory !== 'STATISTIK' ? (selectedCategory as GradeCategory) : 'HARIAN'}
        defaultClass={selectedClass !== 'ALL' ? selectedClass : 'ALL'}
        allGradeItems={gradeItems}
        classes={classes}
        onSave={(item) => {
          saveGradeItem(item);
          showToast(`Penilaian ${item.code} (${item.name}) berhasil disimpan.`);
        }}
      />

      {selectedStudentForDetail && (
        <StudentGradeDetailModal
          isOpen={!!selectedStudentForDetail}
          onClose={() => setSelectedStudentForDetail(null)}
          student={selectedStudentForDetail}
          gradeRecord={studentGrades.find((r) => r.studentId === selectedStudentForDetail.id) || null}
          gradeItems={gradeItems}
          gradeWeights={gradeWeights}
          calculatedGrade={calculateStudentFinalGrade(selectedStudentForDetail.id)}
          onSaveTeacherNotes={(studentId, notes) => {
            const existing = studentGrades.find((r) => r.studentId === studentId);
            if (existing) {
              saveStudentGrade({ ...existing, teacherNotes: notes });
            }
            showToast('Catatan guru untuk rapor siswa berhasil disimpan.');
          }}
        />
      )}

      {/* Assessment Batch Grading Modal */}
      <AssessmentBatchGradingModal
        isOpen={isBatchGradingModalOpen}
        onClose={() => {
          setIsBatchGradingModalOpen(false);
          setBatchGradingItemId(null);
        }}
        initialGradeItemId={batchGradingItemId}
        initialClassGroup={selectedClass}
      />
    </div>
  );
};
