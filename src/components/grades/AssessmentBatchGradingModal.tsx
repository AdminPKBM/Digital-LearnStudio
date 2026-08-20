import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Check,
  Save,
  Sparkles,
  ClipboardPaste,
  Sliders,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Calendar,
  Layers,
  HelpCircle,
  TrendingUp,
  Award,
  Search,
  Filter,
  UserCheck,
  Zap,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Info,
} from 'lucide-react';
import { GradeItem, StudentProfile, StudentGradeRecord, GradeSpecialStatus } from '../../types';
import { useApp } from '../../context/AppContext';

interface AssessmentBatchGradingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGradeItemId?: string | null;
  initialClassGroup?: string;
}

export const AssessmentBatchGradingModal: React.FC<AssessmentBatchGradingModalProps> = ({
  isOpen,
  onClose,
  initialGradeItemId,
  initialClassGroup = 'ALL',
}) => {
  const {
    students,
    classes,
    gradeItems,
    studentGrades,
    gradeWeights,
    saveStudentGradeBatch,
  } = useApp();

  const kkm = gradeWeights?.kkm || 75;

  // Selected Assessment & Target Class
  const [selectedItemId, setSelectedItemId] = useState<string>(
    initialGradeItemId || (gradeItems.length > 0 ? gradeItems[0].id : '')
  );
  const [selectedClass, setSelectedClass] = useState<string>(initialClassGroup);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'GRADED' | 'UNGRADED' | 'PASSED' | 'REMEDIAL' | 'TMS' | 'TM'>('ALL');
  const [activeViewMode, setActiveViewMode] = useState<'table' | 'paste' | 'rubric'>('table');

  // Working state for the modal: studentId -> { score, flag, note }
  const [draftScores, setDraftScores] = useState<Record<string, number | null>>({});
  const [draftFlags, setDraftFlags] = useState<Record<string, GradeSpecialStatus>>({});
  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});
  const [pasteText, setPasteText] = useState<string>('');
  const [pasteMatchBy, setPasteMatchBy] = useState<'order' | 'nis'>('order');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Quick feedback template presets
  const feedbackTemplates = [
    'Pengerjaan sangat baik dan tuntas.',
    'Memenuhi seluruh kriteria tugas dengan rapi.',
    'Logika program dan analisis sudah tepat.',
    'Perlu perbaikan pada dokumentasi dan format.',
    'Tingkatkan pemahaman konsep dasar.',
    'Segera selesaikan tugas susulan/remedial.',
    'Hasil karya sangat kreatif dan inovatif.',
  ];

  // Synchronize when modal opens or selected item changes
  useEffect(() => {
    if (initialGradeItemId) {
      setSelectedItemId(initialGradeItemId);
    }
  }, [initialGradeItemId]);

  useEffect(() => {
    if (!selectedItemId) return;
    const scores: Record<string, number | null> = {};
    const flags: Record<string, GradeSpecialStatus> = {};
    const notes: Record<string, string> = {};

    studentGrades.forEach((rec) => {
      scores[rec.studentId] = rec.scores?.[selectedItemId] ?? null;
      flags[rec.studentId] = rec.statusFlags?.[selectedItemId] || 'BELUM_DINILAI';
      notes[rec.studentId] = rec.itemNotes?.[selectedItemId] || '';
    });

    setDraftScores(scores);
    setDraftFlags(flags);
    setDraftNotes(notes);
  }, [selectedItemId, studentGrades, isOpen]);

  const activeItem = useMemo(() => {
    return gradeItems.find((i) => i.id === selectedItemId) || gradeItems[0];
  }, [gradeItems, selectedItemId]);

  // Filtered student list
  const filteredStudents = useMemo(() => {
    return students.filter((st) => {
      const matchClass = selectedClass === 'ALL' || st.classGroup === selectedClass;
      const q = searchFilter.toLowerCase().trim();
      const matchQuery = !q || st.name.toLowerCase().includes(q) || (st.nis && st.nis.includes(q));

      if (!matchClass || !matchQuery) return false;

      const score = draftScores[st.id];
      const flag = draftFlags[st.id];

      if (statusFilter === 'GRADED') return score !== null && score !== undefined;
      if (statusFilter === 'UNGRADED') return (score === null || score === undefined) && flag !== 'TMS' && flag !== 'TM';
      if (statusFilter === 'PASSED') return score !== null && score !== undefined && score >= kkm;
      if (statusFilter === 'REMEDIAL') return score !== null && score !== undefined && score < kkm;
      if (statusFilter === 'TMS') return flag === 'TMS';
      if (statusFilter === 'TM') return flag === 'TM';

      return true;
    });
  }, [students, selectedClass, searchFilter, statusFilter, draftScores, draftFlags, kkm]);

  // Statistics calculation for the current assessment
  const stats = useMemo(() => {
    const classStudents = students.filter((s) => selectedClass === 'ALL' || s.classGroup === selectedClass);
    const total = classStudents.length;
    let graded = 0;
    let passed = 0;
    let remedial = 0;
    let tmsCount = 0;
    let tmCount = 0;
    let sumScore = 0;
    let maxVal = -1;
    let minVal = 101;

    classStudents.forEach((st) => {
      const score = draftScores[st.id];
      const flag = draftFlags[st.id];

      if (flag === 'TMS') tmsCount++;
      if (flag === 'TM') tmCount++;

      if (score !== null && score !== undefined) {
        graded++;
        sumScore += score;
        if (score >= kkm) passed++;
        else remedial++;

        if (score > maxVal) maxVal = score;
        if (score < minVal) minVal = score;
      }
    });

    const average = graded > 0 ? Math.round((sumScore / graded) * 10) / 10 : 0;

    return {
      total,
      graded,
      ungraded: total - graded - tmsCount - tmCount,
      passed,
      remedial,
      tmsCount,
      tmCount,
      average,
      maxVal: graded > 0 ? maxVal : 0,
      minVal: graded > 0 ? minVal : 0,
      percentageGraded: total > 0 ? Math.round((graded / total) * 100) : 0,
    };
  }, [students, selectedClass, draftScores, draftFlags, kkm]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cell score update
  const handleScoreChange = (studentId: string, valStr: string) => {
    if (valStr.trim() === '') {
      setDraftScores((prev) => ({ ...prev, [studentId]: null }));
      return;
    }
    const num = parseFloat(valStr);
    if (!isNaN(num)) {
      const clamped = Math.max(0, Math.min(activeItem?.maxScore || 100, Math.round(num * 10) / 10));
      setDraftScores((prev) => ({ ...prev, [studentId]: clamped }));
      // Auto clear TMS/TM if score entered
      setDraftFlags((prev) => ({ ...prev, [studentId]: 'DINILAI' }));
    }
  };

  // Quick preset button click
  const handleQuickSet = (studentId: string, value: number) => {
    setDraftScores((prev) => ({ ...prev, [studentId]: value }));
    setDraftFlags((prev) => ({ ...prev, [studentId]: 'DINILAI' }));
  };

  // Special flag click (TMS / TM / Reset)
  const handleSetFlag = (studentId: string, flag: GradeSpecialStatus) => {
    setDraftFlags((prev) => ({ ...prev, [studentId]: flag }));
    if (flag === 'TMS' || flag === 'TM' || flag === 'BELUM_DINILAI') {
      setDraftScores((prev) => ({ ...prev, [studentId]: null }));
    }
  };

  // Note update
  const handleNoteChange = (studentId: string, note: string) => {
    setDraftNotes((prev) => ({ ...prev, [studentId]: note }));
  };

  // Batch actions
  const handleFillEmptyWithKKM = () => {
    const updated = { ...draftScores };
    const updatedFlags = { ...draftFlags };
    let count = 0;

    filteredStudents.forEach((st) => {
      if (updated[st.id] === null || updated[st.id] === undefined) {
        if (updatedFlags[st.id] !== 'TMS' && updatedFlags[st.id] !== 'TM') {
          updated[st.id] = kkm;
          updatedFlags[st.id] = 'DINILAI';
          count++;
        }
      }
    });

    setDraftScores(updated);
    setDraftFlags(updatedFlags);
    showToast(`Berhasil mengisi ${count} siswa yang kosong dengan nilai KKM (${kkm}).`);
  };

  const handleFillAllCustom = (scoreVal: number) => {
    if (!confirm(`Yakin ingin mengisi nilai ${scoreVal} untuk SEMUA ${filteredStudents.length} siswa yang ditampilkan?`)) {
      return;
    }
    const updated = { ...draftScores };
    const updatedFlags = { ...draftFlags };

    filteredStudents.forEach((st) => {
      updated[st.id] = scoreVal;
      updatedFlags[st.id] = 'DINILAI';
    });

    setDraftScores(updated);
    setDraftFlags(updatedFlags);
    showToast(`Nilai ${scoreVal} berhasil diterapkan untuk ${filteredStudents.length} siswa.`);
  };

  const handleMarkAllEmptyAsTMS = () => {
    const updatedFlags = { ...draftFlags };
    const updated = { ...draftScores };
    let count = 0;

    filteredStudents.forEach((st) => {
      if ((updated[st.id] === null || updated[st.id] === undefined) && updatedFlags[st.id] !== 'TM') {
        updatedFlags[st.id] = 'TMS';
        updated[st.id] = null;
        count++;
      }
    });

    setDraftFlags(updatedFlags);
    setDraftScores(updated);
    showToast(`Tandai ${count} siswa yang belum mengumpulkan sebagai TMS.`);
  };

  const handleClearAll = () => {
    if (!confirm(`Yakin ingin mengosongkan seluruh nilai pada asesmen ini untuk siswa yang difilter?`)) {
      return;
    }
    const updated = { ...draftScores };
    const updatedFlags = { ...draftFlags };
    const updatedNotes = { ...draftNotes };

    filteredStudents.forEach((st) => {
      updated[st.id] = null;
      updatedFlags[st.id] = 'BELUM_DINILAI';
      delete updatedNotes[st.id];
    });

    setDraftScores(updated);
    setDraftFlags(updatedFlags);
    setDraftNotes(updatedNotes);
    showToast('Seluruh nilai berhasil dikosongkan.');
  };

  // Paste from Excel handler
  const handleApplyPaste = () => {
    if (!pasteText.trim()) {
      showToast('Teks tempelan kosong.');
      return;
    }

    const lines = pasteText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const updated = { ...draftScores };
    const updatedFlags = { ...draftFlags };
    let matchedCount = 0;

    if (pasteMatchBy === 'order') {
      lines.forEach((line, idx) => {
        if (idx < filteredStudents.length) {
          const st = filteredStudents[idx];
          // Extract first number in line or clean string
          const tokens = line.split(/[\t,;]/);
          const rawNum = tokens[tokens.length - 1]; // usually last column if multi-column
          const num = parseFloat(rawNum.replace(',', '.'));
          if (!isNaN(num)) {
            const clamped = Math.max(0, Math.min(100, Math.round(num * 10) / 10));
            updated[st.id] = clamped;
            updatedFlags[st.id] = 'DINILAI';
            matchedCount++;
          }
        }
      });
    } else {
      // Match by NIS (first token) and Score (second token)
      lines.forEach((line) => {
        const tokens = line.split(/[\t,;]/).map((t) => t.trim());
        if (tokens.length >= 2) {
          const nisKey = tokens[0];
          const scoreNum = parseFloat(tokens[1].replace(',', '.'));
          const st = students.find((s) => s.nis === nisKey || s.nis.toLowerCase() === nisKey.toLowerCase());
          if (st && !isNaN(scoreNum)) {
            const clamped = Math.max(0, Math.min(100, Math.round(scoreNum * 10) / 10));
            updated[st.id] = clamped;
            updatedFlags[st.id] = 'DINILAI';
            matchedCount++;
          }
        }
      });
    }

    setDraftScores(updated);
    setDraftFlags(updatedFlags);
    setActiveViewMode('table');
    setPasteText('');
    showToast(`Berhasil memetakan nilai untuk ${matchedCount} siswa dari data Excel/Spreadsheet.`);
  };

  // Save all changes to AppContext
  const handleSaveAll = () => {
    if (!selectedItemId) return;
    setIsSaving(true);

    const recordsToUpdate: StudentGradeRecord[] = [];

    students.forEach((st) => {
      const existing = studentGrades.find((r) => r.studentId === st.id);
      const scores = { ...(existing?.scores || {}) };
      const flags = { ...(existing?.statusFlags || {}) };
      const itemNotes = { ...(existing?.itemNotes || {}) };

      // Apply current draft state for selected item
      if (draftScores[st.id] !== undefined && draftScores[st.id] !== null) {
        scores[selectedItemId] = draftScores[st.id];
      } else {
        delete scores[selectedItemId];
      }

      if (draftFlags[st.id] && draftFlags[st.id] !== 'BELUM_DINILAI') {
        flags[selectedItemId] = draftFlags[st.id];
      } else {
        delete flags[selectedItemId];
      }

      if (draftNotes[st.id] && draftNotes[st.id].trim() !== '') {
        itemNotes[selectedItemId] = draftNotes[st.id].trim();
      } else {
        delete itemNotes[selectedItemId];
      }

      recordsToUpdate.push({
        id: st.id,
        studentId: st.id,
        studentNis: st.nis,
        studentName: st.name,
        classGroup: st.classGroup,
        scores,
        statusFlags: flags,
        itemNotes,
        teacherNotes: existing?.teacherNotes,
        updatedAt: new Date().toISOString(),
      });
    });

    saveStudentGradeBatch(recordsToUpdate);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Seluruh nilai asesmen berhasil disimpan.');
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Toast Notification inside Modal */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 right-6 z-50 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-cyan-300 font-bold text-[10px] uppercase tracking-wide">
                Form Input & Rekap Nilai Siswa
              </span>
              <span className="text-blue-200 text-xs">
                {activeItem?.category} • Bobot Bobot {activeItem?.weight || 1}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
              <span>{activeItem ? `${activeItem.code}: ${activeItem.name}` : 'Input Nilai Asesmen'}</span>
            </h2>
            <p className="text-xs text-blue-100 max-w-2xl line-clamp-1">
              Topik: {activeItem?.topic || 'Informatika Fase E'} • KKM: <span className="font-bold text-amber-300">{kkm}</span> • Nilai Maksimal: {activeItem?.maxScore || 100}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={onClose}
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition cursor-pointer"
              title="Tutup Form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation & Filter Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5 flex-1">
            {/* Choose Assessment */}
            <div className="min-w-[200px]">
              <label className="block text-[10px] font-bold text-slate-400 mb-0.5">PILIH ASESMEN / KOLOM</label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-3 py-2 rounded-xl text-slate-800 dark:text-white font-bold"
              >
                {gradeItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    [{item.category}] {item.code} - {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Choose Target Class */}
            <div className="min-w-[140px]">
              <label className="block text-[10px] font-bold text-slate-400 mb-0.5">FILTER KELAS</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-3 py-2 rounded-xl text-slate-800 dark:text-white font-semibold"
              >
                <option value="ALL">Semua Kelas ({students.length})</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Box */}
            <div className="relative flex-1 min-w-[160px]">
              <label className="block text-[10px] font-bold text-slate-400 mb-0.5">CARI SISWA</label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Cari Nama / NIS..."
                  className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="min-w-[130px]">
              <label className="block text-[10px] font-bold text-slate-400 mb-0.5">STATUS NILAI</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-2.5 py-2 rounded-xl text-slate-800 dark:text-white"
              >
                <option value="ALL">Semua ({students.length})</option>
                <option value="GRADED">Sudah Dinilai ({stats.graded})</option>
                <option value="UNGRADED">Belum Dinilai ({stats.ungraded})</option>
                <option value="PASSED">Tuntas (≥{kkm})</option>
                <option value="REMEDIAL">Remedial (&lt;{kkm})</option>
                <option value="TMS">TMS (Tidak Mengumpulkan)</option>
                <option value="TM">TM (Tidak Hadir)</option>
              </select>
            </div>
          </div>

          {/* Mode Switch Pills */}
          <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl self-end">
            <button
              onClick={() => setActiveViewMode('table')}
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeViewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Input Tabel</span>
            </button>

            <button
              onClick={() => setActiveViewMode('paste')}
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeViewMode === 'paste'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <ClipboardPaste className="w-3.5 h-3.5" />
              <span>Tempel Excel</span>
            </button>

            {activeItem?.rubric && (
              <button
                onClick={() => setActiveViewMode('rubric')}
                className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeViewMode === 'rubric'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Rubrik</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Summary Dashboard Bar */}
        <div className="px-5 py-3 bg-blue-50/70 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/40 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 text-xs">
          <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block">TOTAL SISWA</span>
            <span className="text-sm font-extrabold text-slate-800 dark:text-white">
              {stats.total} Siswa
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block">SUDAH DINILAI</span>
            <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
              {stats.graded} ({stats.percentageGraded}%)
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">TUNTAS (≥{kkm})</span>
            <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
              {stats.passed} Siswa
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold block">REMEDIAL (&lt;{kkm})</span>
            <span className="text-sm font-extrabold text-rose-700 dark:text-rose-300">
              {stats.remedial} Siswa
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block">RATA-RATA NILAI</span>
            <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
              {stats.average.toFixed(1)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">TERTINGGI / TERENDAH</span>
              <span className="text-xs font-extrabold font-mono text-slate-700 dark:text-slate-300">
                {stats.maxVal} / {stats.minVal}
              </span>
            </div>
            {stats.tmsCount > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                {stats.tmsCount} TMS
              </span>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* VIEW: EXCEL PASTE MODE */}
          {activeViewMode === 'paste' && (
            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <ClipboardPaste className="w-4 h-4 text-blue-600" />
                    Tempel Data Nilai dari Microsoft Excel / Google Sheets
                  </h3>
                  <p className="text-xs text-slate-500">
                    Salin (Copy) satu kolom nilai dari spreadsheet Anda, lalu tempel (Paste) di kotak di bawah ini.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-semibold">Metode Pemetaan:</span>
                  <select
                    value={pasteMatchBy}
                    onChange={(e) => setPasteMatchBy(e.target.value as any)}
                    className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-1.5 rounded-lg font-bold"
                  >
                    <option value="order">Sesuai Urutan Baris Siswa di Daftar</option>
                    <option value="nis">Pencocokan 2 Kolom (Kolom 1: NIS, Kolom 2: Nilai)</option>
                  </select>
                </div>
              </div>

              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder={
                  pasteMatchBy === 'order'
                    ? 'Tempel nilai angka di sini (Contoh):\n85\n90\n78\n92\n88'
                    : 'Tempel 2 kolom (NIS [Tab] Nilai):\n20261001\t85\n20261002\t90\n20261003\t78'
                }
                rows={8}
                className="w-full p-3 font-mono text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  {pasteText.trim() ? `${pasteText.trim().split('\n').length} baris terdeteksi` : 'Belum ada data'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPasteText('')}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                  >
                    Bersihkan
                  </button>
                  <button
                    onClick={handleApplyPaste}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Terapkan Nilai ke Daftar</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: RUBRIC PREVIEW MODE */}
          {activeViewMode === 'rubric' && activeItem?.rubric && (
            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Panduan Rubrik Penilaian: {activeItem.name}
              </h3>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-mono whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300">
                {activeItem.rubric}
              </div>
            </div>
          )}

          {/* VIEW: TABLE BATCH GRADING SHEET */}
          {activeViewMode === 'table' && (
            <div className="space-y-3">
              {/* Fast Action Buttons Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-100 dark:bg-slate-800/60 rounded-2xl text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1">
                    Aksi Cepat:
                  </span>
                  <button
                    onClick={handleFillEmptyWithKKM}
                    className="px-2.5 py-1.5 bg-blue-100 dark:bg-blue-950/60 hover:bg-blue-200 text-blue-800 dark:text-blue-300 rounded-xl font-bold transition flex items-center gap-1 cursor-pointer"
                    title={`Isi semua yang belum ada nilai dengan nilai KKM (${kkm})`}
                  >
                    <Zap className="w-3 h-3 text-blue-600" />
                    <span>Isi Kosong dg KKM ({kkm})</span>
                  </button>

                  <button
                    onClick={() => handleFillAllCustom(85)}
                    className="px-2.5 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 rounded-xl font-bold transition cursor-pointer"
                  >
                    Set Semua 85
                  </button>

                  <button
                    onClick={() => handleFillAllCustom(100)}
                    className="px-2.5 py-1.5 bg-emerald-100 dark:bg-emerald-950/60 hover:bg-emerald-200 text-emerald-800 dark:text-emerald-300 rounded-xl font-bold transition cursor-pointer"
                  >
                    Set Semua 100
                  </button>

                  <button
                    onClick={handleMarkAllEmptyAsTMS}
                    className="px-2.5 py-1.5 bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 text-amber-800 dark:text-amber-300 rounded-xl font-bold transition cursor-pointer"
                    title="Tandai semua siswa yang tidak mengumpulkan"
                  >
                    Tandai Kosong: TMS
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClearAll}
                    className="px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl font-bold transition cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Kosongkan Nilai</span>
                  </button>
                </div>
              </div>

              {/* Student Grading List */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="p-3 w-10 text-center">No</th>
                      <th className="p-3 w-24">NIS</th>
                      <th className="p-3 min-w-[180px]">Nama Siswa & Kelas</th>
                      <th className="p-3 w-32 text-center">Input Nilai (0-{activeItem?.maxScore || 100})</th>
                      <th className="p-3 min-w-[220px]">Tombol Preset Cepat</th>
                      <th className="p-3 w-28 text-center">Status</th>
                      <th className="p-3 min-w-[200px]">Feedback / Catatan Siswa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          Tidak ada siswa yang sesuai filter ini.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((st, idx) => {
                        const score = draftScores[st.id];
                        const flag = draftFlags[st.id];
                        const note = draftNotes[st.id] || '';
                        const isTMS = flag === 'TMS';
                        const isTM = flag === 'TM';
                        const hasScore = score !== null && score !== undefined;
                        const isPassed = hasScore && score >= kkm;

                        return (
                          <tr
                            key={st.id}
                            className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition ${
                              isTMS
                                ? 'bg-amber-50/40 dark:bg-amber-950/10'
                                : isTM
                                ? 'bg-rose-50/40 dark:bg-rose-950/10'
                                : hasScore
                                ? isPassed
                                  ? 'bg-emerald-50/20 dark:bg-emerald-950/5'
                                  : 'bg-rose-50/20 dark:bg-rose-950/5'
                                : ''
                            }`}
                          >
                            <td className="p-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                            <td className="p-3 font-mono text-slate-500 text-[11px]">{st.nis}</td>
                            <td className="p-3">
                              <div className="font-bold text-slate-800 dark:text-white">{st.name}</div>
                              <div className="text-[10px] text-slate-400">{st.classGroup}</div>
                            </td>

                            {/* Score Input */}
                            <td className="p-3 text-center">
                              {isTMS ? (
                                <div className="inline-flex items-center gap-1">
                                  <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-black text-xs">
                                    TMS
                                  </span>
                                  <button
                                    onClick={() => handleSetFlag(st.id, 'BELUM_DINILAI')}
                                    className="text-slate-400 hover:text-slate-600 text-[10px] underline"
                                  >
                                    Ubah
                                  </button>
                                </div>
                              ) : isTM ? (
                                <div className="inline-flex items-center gap-1">
                                  <span className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-black text-xs">
                                    TM
                                  </span>
                                  <button
                                    onClick={() => handleSetFlag(st.id, 'BELUM_DINILAI')}
                                    className="text-slate-400 hover:text-slate-600 text-[10px] underline"
                                  >
                                    Ubah
                                  </button>
                                </div>
                              ) : (
                                <input
                                  type="number"
                                  min={0}
                                  max={activeItem?.maxScore || 100}
                                  step="1"
                                  value={hasScore ? score : ''}
                                  onChange={(e) => handleScoreChange(st.id, e.target.value)}
                                  placeholder="0-100"
                                  className={`w-20 p-2 text-center font-mono font-bold text-sm rounded-xl border transition ${
                                    hasScore
                                      ? isPassed
                                        ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200'
                                        : 'bg-rose-50 border-rose-300 dark:bg-rose-950/30 dark:border-rose-700 text-rose-800 dark:text-rose-200'
                                      : 'bg-slate-50 border-slate-300 dark:bg-slate-950 dark:border-slate-700 text-slate-800 dark:text-white'
                                  } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                />
                              )}
                            </td>

                            {/* Quick Presets */}
                            <td className="p-3">
                              <div className="flex flex-wrap items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleQuickSet(st.id, kkm)}
                                  className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${
                                    score === kkm
                                      ? 'bg-blue-600 text-white border-blue-600'
                                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                  }`}
                                >
                                  KKM ({kkm})
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickSet(st.id, 80)}
                                  className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                >
                                  80
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickSet(st.id, 85)}
                                  className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                >
                                  85
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickSet(st.id, 90)}
                                  className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                >
                                  90
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickSet(st.id, 100)}
                                  className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                                >
                                  100
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSetFlag(st.id, 'TMS')}
                                  className="px-2 py-1 rounded-lg text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                                  title="Tidak Mengumpulkan"
                                >
                                  TMS
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSetFlag(st.id, 'TM')}
                                  className="px-2 py-1 rounded-lg text-[10px] font-bold bg-rose-50 hover:bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                                  title="Tidak Hadir"
                                >
                                  TM
                                </button>
                              </div>
                            </td>

                            {/* Status Badge */}
                            <td className="p-3 text-center">
                              {isTMS ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                                  TMS (Tdk Kumpul)
                                </span>
                              ) : isTM ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
                                  TM (Tdk Hadir)
                                </span>
                              ) : hasScore ? (
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                    isPassed
                                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                      : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                                  }`}
                                >
                                  {isPassed ? 'TUNTAS' : 'REMEDIAL'}
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
                                  Belum Dinilai
                                </span>
                              )}
                            </td>

                            {/* Feedback Note */}
                            <td className="p-3">
                              <div className="space-y-1">
                                <input
                                  type="text"
                                  value={note}
                                  onChange={(e) => handleNoteChange(st.id, e.target.value)}
                                  placeholder="Tulis feedback singkat..."
                                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                                />
                                {hasScore && !note && (
                                  <div className="flex items-center gap-1 overflow-x-auto text-[9px] text-slate-400">
                                    <span className="shrink-0">Pilih:</span>
                                    {feedbackTemplates.slice(0, 2).map((tmpl, tIdx) => (
                                      <button
                                        key={tIdx}
                                        type="button"
                                        onClick={() => handleNoteChange(st.id, tmpl)}
                                        className="hover:text-blue-600 truncate max-w-[130px]"
                                      >
                                        "{tmpl}"
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
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

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <Info className="w-4 h-4 text-blue-500" />
            <span>
              Perubahan nilai akan langsung tersinkronisasi ke Rapor, Rekap Nilai Akhir, dan Analisis Remedial.
            </span>
          </div>

          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Seluruh Nilai'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
