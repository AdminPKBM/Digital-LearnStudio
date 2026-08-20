import React, { useState } from 'react';
import {
  Settings,
  Users,
  Download,
  Upload,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  HelpCircle,
  Check,
  Search,
  Filter,
  Eye,
  Layers,
  Sparkles,
  Edit2,
  FileText,
  Copy
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';
import { StudentProfile, AppSettings, QuizQuestion, ModuleData } from '../types';
import { allQuizzesData } from '../data/quizzes';
import { allModulesData } from '../data/modules';

export const AdminDashboardPage: React.FC = () => {
  const { students, settings, saveStudent, deleteStudent, updateSettings, refreshState } = useApp();
  const [activeTab, setActiveTab] = useState<'students' | 'modules_quizzes' | 'settings' | 'backup'>('modules_quizzes');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modul & Quiz State
  const [selectedModuleId, setSelectedModuleId] = useState<string>('BK-1');
  const [quizSearchTerm, setQuizSearchTerm] = useState<string>('');
  const [filterElement, setFilterElement] = useState<string>('ALL');
  const [showAnswerKeysOnly, setShowAnswerKeysOnly] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);

  // Form New Question
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [newOptions, setNewOptions] = useState<[string, string, string, string]>(['', '', '', '']);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState<number>(0);
  const [newExplanation, setNewExplanation] = useState<string>('');

  // Form New Student
  const [newNis, setNewNis] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [newClass, setNewClass] = useState<'X DKV 1' | 'X DKV 2' | 'X APHP'>('X DKV 1');

  // Form settings local buffer
  const [formSettings, setFormSettings] = useState<AppSettings>(settings);

  // JSON Backup/Restore
  const [jsonText, setJsonText] = useState<string>('');

  const showNotify = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Get active module data & questions (ensuring 15 standard questions)
  const currentModule = allModulesData.find((m) => m.id === selectedModuleId) || allModulesData[0];
  const currentQuizData = allQuizzesData[selectedModuleId] || {
    moduleId: selectedModuleId,
    moduleTitle: currentModule?.title || 'Modul',
    passingScore: 75,
    questions: [],
  };

  // 15 Standard Questions slice or full list
  const activeQuestions: QuizQuestion[] = currentQuizData.questions.slice(0, 15);

  const filteredQuestions = activeQuestions.filter((q, idx) => {
    const matchSearch =
      q.question.toLowerCase().includes(quizSearchTerm.toLowerCase()) ||
      q.options.some((opt) => opt.toLowerCase().includes(quizSearchTerm.toLowerCase())) ||
      q.explanation.toLowerCase().includes(quizSearchTerm.toLowerCase()) ||
      `soal ${idx + 1}`.includes(quizSearchTerm.toLowerCase());
    return matchSearch;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNis.trim() || !newName.trim()) return;

    const newStudent: StudentProfile = {
      id: `student-${Date.now()}`,
      nis: newNis.trim(),
      name: newName.trim(),
      classGroup: newClass,
      xp: 0,
      level: 1,
      streakDays: 1,
      lastLoginDate: new Date().toISOString().split('T')[0],
      completedModuleIds: [],
      bookmarkedModuleIds: [],
      badges: ['first_login'],
      notes: {},
    };

    saveStudent(newStudent);
    setNewNis('');
    setNewName('');
    showNotify('success', `Siswa ${newStudent.name} (${newStudent.nis}) berhasil ditambahkan!`);
  };

  const handleDeleteStudent = (id: string, name: string) => {
    deleteStudent(id);
    showNotify('success', `Data siswa ${name} berhasil dihapus.`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
    showNotify('success', 'Pengaturan LMS berhasil diperbarui!');
  };

  const handleExportJSON = () => {
    const dataStr = StorageService.exportDataJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_learnstudio_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showNotify('success', 'Backup JSON berhasil diunduh.');
  };

  const handleImportJSON = () => {
    if (!jsonText.trim()) return;
    const ok = StorageService.importDataJSON(jsonText);
    if (ok) {
      refreshState();
      showNotify('success', 'Database berhasil di-restore dan data telah dimuat ulang!');
    } else {
      showNotify('error', 'Format JSON tidak valid atau struktur tidak sesuai!');
    }
  };

  const handleExportCSV = () => {
    const headers = ['NIS', 'Nama Siswa', 'Kelas', 'Total XP', 'Level', 'Jumlah Modul Selesai'];
    const rows = students.map((s) => [s.nis, s.name, s.classGroup, s.xp, s.level, s.completedModuleIds.length]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap_siswa_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    showNotify('success', 'Data siswa berhasil diexport ke CSV.');
  };

  const handleExportQuizKeys = () => {
    const lines = [
      `KUNCI JAWABAN & DAFTAR 15 SOAL EVALUASI MODUL ${currentModule.id}: ${currentModule.title.toUpperCase()}`,
      `Mata Pelajaran: Informatika Kelas X (Fase E) - ${settings.schoolName}`,
      `KKM / Passing Grade: ${currentQuizData.passingScore} | Total Soal: ${activeQuestions.length}`,
      '========================================================================\n',
    ];

    activeQuestions.forEach((q, idx) => {
      const optLabels = ['A', 'B', 'C', 'D'];
      lines.push(`SOAL NO. ${idx + 1}:`);
      lines.push(`${q.question}`);
      q.options.forEach((opt, oIdx) => {
        lines.push(`  ${optLabels[oIdx]}. ${opt} ${oIdx === q.correctAnswer ? ' <== [KUNCI JAWABAN BENAR]' : ''}`);
      });
      lines.push(`Kunci: ${optLabels[q.correctAnswer]} (${q.options[q.correctAnswer]})`);
      lines.push(`Pembahasan: ${q.explanation}`);
      lines.push('------------------------------------------------------------------------\n');
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kunci_Jawaban_15_Soal_${currentModule.id}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    showNotify('success', `Kunci Jawaban Modul ${currentModule.id} berhasil diexport.`);
  };

  const handleSaveCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || newOptions.some((opt) => !opt.trim())) {
      showNotify('error', 'Harap lengkapi teks soal dan seluruh 4 pilihan jawaban.');
      return;
    }

    const newQ: QuizQuestion = {
      id: editingQuestion ? editingQuestion.id : `q-${Date.now()}`,
      question: newQuestionText.trim(),
      options: [newOptions[0].trim(), newOptions[1].trim(), newOptions[2].trim(), newOptions[3].trim()],
      correctAnswer: newCorrectAnswer,
      explanation: newExplanation.trim() || 'Kunci jawaban yang tepat berdasarkan materi ajar kurikulum.',
    };

    if (allQuizzesData[selectedModuleId]) {
      if (editingQuestion) {
        const idx = allQuizzesData[selectedModuleId].questions.findIndex((q) => q.id === editingQuestion.id);
        if (idx !== -1) {
          allQuizzesData[selectedModuleId].questions[idx] = newQ;
        }
      } else {
        allQuizzesData[selectedModuleId].questions.unshift(newQ);
      }
    }

    setIsAddingQuestion(false);
    setEditingQuestion(null);
    setNewQuestionText('');
    setNewOptions(['', '', '', '']);
    setNewCorrectAnswer(0);
    setNewExplanation('');
    showNotify('success', 'Soal kuis evaluasi berhasil disimpan!');
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-6 lg:space-y-8 animate-fadeIn pb-16 lg:pb-12 max-w-full">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
              : 'bg-rose-950/90 border-rose-500/50 text-rose-200'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-sm font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Header Banner - Responsive 1 Kolom */}
      <div className="bg-gradient-to-r from-slate-900 via-violet-950/40 to-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 lg:p-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-violet-500/20 text-violet-300 border border-violet-500/30">
            ADMINISTRATOR CONTROL PANEL
          </span>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            16 MODUL • 15 SOAL / MODUL
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Kelola Modul, 15 Soal & Kunci Jawaban
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Pusat kendali bank soal kurikulum Informatika Fase E. Tinjau seluruh 16 modul, daftar 15 butir soal evaluasi,
          kunci jawaban (A, B, C, D), serta pembahasan komprehensif.
        </p>
      </div>

      {/* Responsive Tabs - Touch Target Min 48px */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('modules_quizzes')}
          className={`flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer min-h-[48px] touch-target-48 ${
            activeTab === 'modules_quizzes'
              ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20'
              : 'text-slate-400 bg-slate-900/60 border border-slate-800 hover:text-white hover:bg-slate-850'
          }`}
        >
          <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="truncate">Modul & 15 Soal</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer min-h-[48px] touch-target-48 ${
            activeTab === 'students'
              ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20'
              : 'text-slate-400 bg-slate-900/60 border border-slate-800 hover:text-white hover:bg-slate-850'
          }`}
        >
          <Users className="w-4 h-4 shrink-0" />
          <span className="truncate">Data Siswa</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer min-h-[48px] touch-target-48 ${
            activeTab === 'settings'
              ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20'
              : 'text-slate-400 bg-slate-900/60 border border-slate-800 hover:text-white hover:bg-slate-850'
          }`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span className="truncate">Pengaturan LMS</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer min-h-[48px] touch-target-48 ${
            activeTab === 'backup'
              ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20'
              : 'text-slate-400 bg-slate-900/60 border border-slate-800 hover:text-white hover:bg-slate-850'
          }`}
        >
          <Download className="w-4 h-4 shrink-0" />
          <span className="truncate">Backup & JSON</span>
        </button>
      </div>

      {/* TAB 1: MODUL & 15 SOAL EVALUASI + KUNCI JAWABAN */}
      {activeTab === 'modules_quizzes' && (
        <div className="space-y-6">
          {/* Top Quick Stats Grid (Responsive 1-Column on Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3.5">
              <div className="p-3 bg-violet-500/20 text-violet-400 rounded-xl border border-violet-500/30 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">Total Modul Ajar</div>
                <div className="text-lg sm:text-xl font-extrabold text-white">16 Modul Fase E</div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3.5">
              <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30 shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">Standar Soal / Modul</div>
                <div className="text-lg sm:text-xl font-extrabold text-cyan-300 font-mono">15 Butir Soal</div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3.5">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">Kunci Jawaban Aktif</div>
                <div className="text-lg sm:text-xl font-extrabold text-emerald-300">100% Terverifikasi</div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3.5">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">Passing Score KKM</div>
                <div className="text-lg sm:text-xl font-extrabold text-amber-300 font-mono">75 / 100 Poin</div>
              </div>
            </div>
          </div>

          {/* Module Selector & Filter Bar */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-6 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-violet-400" />
                  Pilih Modul Pembelajaran
                </h3>
                <p className="text-xs text-slate-400">Pilih salah satu dari 16 modul untuk melihat 15 butir soal dan kuncinya</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowAnswerKeysOnly(!showAnswerKeysOnly)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer min-h-[48px] touch-target-48 ${
                    showAnswerKeysOnly
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-800 text-amber-300 border border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  {showAnswerKeysOnly ? 'Tampilkan Mode Lengkap' : 'Mode Ringkas Kunci'}
                </button>

                <button
                  onClick={handleExportQuizKeys}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 cursor-pointer min-h-[48px] touch-target-48"
                  title="Unduh Lembar Kunci Jawaban"
                >
                  <Download className="w-4 h-4" />
                  Export Kunci (.txt)
                </button>

                <button
                  onClick={() => {
                    setEditingQuestion(null);
                    setNewQuestionText('');
                    setNewOptions(['', '', '', '']);
                    setNewCorrectAnswer(0);
                    setNewExplanation('');
                    setIsAddingQuestion(true);
                  }}
                  className="flex items-center gap-2 bg-violet-500 hover:bg-violet-400 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl cursor-pointer min-h-[48px] touch-target-48 shadow-lg shadow-violet-500/20"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Soal Baru
                </button>
              </div>
            </div>

            {/* Element Filter Pills - Horizontal Scroll on Mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              <button
                onClick={() => setFilterElement('ALL')}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer min-h-[40px] touch-target-48 ${
                  filterElement === 'ALL'
                    ? 'bg-cyan-500 text-slate-950 font-extrabold'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Semua Elemen (16)
              </button>
              {(['BK', 'TIK', 'SK', 'JKI', 'AD', 'AP', 'DSI', 'PLB'] as const).map((elem) => (
                <button
                  key={elem}
                  onClick={() => setFilterElement(elem)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer min-h-[40px] touch-target-48 ${
                    filterElement === elem
                      ? 'bg-cyan-500 text-slate-950 font-extrabold'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {elem}
                </button>
              ))}
            </div>

            {/* 16 Module Grid Buttons - Responsive 1 to 4 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {allModulesData
                .filter((m) => filterElement === 'ALL' || m.elementId === filterElement)
                .map((mod) => {
                  const isSelected = mod.id === selectedModuleId;
                  const quiz = allQuizzesData[mod.id];
                  const qCount = quiz ? Math.min(15, quiz.questions.length) : 15;

                  return (
                    <button
                      key={mod.id}
                      onClick={() => setSelectedModuleId(mod.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer min-h-[64px] ${
                        isSelected
                          ? 'bg-gradient-to-br from-violet-950/70 to-slate-900 border-violet-500 ring-2 ring-violet-500/30 text-white shadow-lg'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-violet-500/20 text-violet-300 border border-violet-500/30">
                          {mod.id}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 font-mono">
                          {qCount} Soal
                        </span>
                      </div>
                      <h4 className="text-xs font-bold line-clamp-1 text-white">{mod.title}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{mod.elementName}</p>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Active Module Detail Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  MODUL AKTIF: {currentModule.id}
                </span>
                <span className="text-xs text-slate-400">• Elemen {currentModule.elementName}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">{currentModule.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{currentModule.summary}</p>
            </div>

            {/* Search Question Input - Minimum 16px font size on mobile to prevent zoom */}
            <div className="w-full md:w-72">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari kata kunci soal / opsi..."
                  value={quizSearchTerm}
                  onChange={(e) => setQuizSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-base sm:text-xs pl-10 pr-3 py-3 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 min-h-[48px]"
                />
              </div>
            </div>
          </div>

          {/* Add / Edit Question Modal */}
          {isAddingQuestion && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Edit2 className="w-4 h-4 text-cyan-400" />
                    {editingQuestion ? 'Edit Butir Soal' : `Tambah Soal Baru untuk Modul ${currentModule.id}`}
                  </h3>
                  <button
                    onClick={() => setIsAddingQuestion(false)}
                    className="p-2 text-slate-400 hover:text-white rounded-xl min-h-[48px] touch-target-48 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveCustomQuestion} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">PERTANYAAN SOAL</label>
                    <textarea
                      rows={3}
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder="Tuliskan teks pertanyaan soal di sini..."
                      className="w-full bg-slate-950 border border-slate-800 text-base sm:text-xs p-3 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="block text-xs font-bold text-slate-300">
                      4 PILIHAN JAWABAN (TANDAI KUNCI JAWABAN BENAR)
                    </label>
                    {[0, 1, 2, 3].map((optIdx) => (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border transition ${
                          newCorrectAnswer === optIdx
                            ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/40'
                            : 'bg-slate-950 border-slate-800'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setNewCorrectAnswer(optIdx)}
                          className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer transition shrink-0 min-h-[36px] ${
                            newCorrectAnswer === optIdx
                              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                          title="Klik untuk jadikan kunci jawaban"
                        >
                          {optionLetters[optIdx]}
                        </button>
                        <input
                          type="text"
                          value={newOptions[optIdx]}
                          onChange={(e) => {
                            const updated = [...newOptions] as [string, string, string, string];
                            updated[optIdx] = e.target.value;
                            setNewOptions(updated);
                          }}
                          placeholder={`Teks opsi jawaban ${optionLetters[optIdx]}...`}
                          className="flex-1 bg-transparent text-base sm:text-xs text-white focus:outline-none"
                          required
                        />
                        {newCorrectAnswer === optIdx && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                            KUNCI
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      PEMBAHASAN / ALASAN KUNCI JAWABAN
                    </label>
                    <textarea
                      rows={2}
                      value={newExplanation}
                      onChange={(e) => setNewExplanation(e.target.value)}
                      placeholder="Penjelasan mengapa opsi tersebut adalah jawaban yang tepat..."
                      className="w-full bg-slate-950 border border-slate-800 text-base sm:text-xs p-3 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsAddingQuestion(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-800 min-h-[48px] touch-target-48 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-violet-500 hover:bg-violet-400 min-h-[48px] touch-target-48 cursor-pointer shadow-lg shadow-violet-500/20"
                    >
                      Simpan Butir Soal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* QUESTIONS LIST / STACKED CARDS VIEW (15 SOAL & KUNCI JAWABAN) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Menampilkan {filteredQuestions.length} dari 15 Butir Soal Evaluasi</span>
              <span className="font-mono text-cyan-400 font-bold">Passing Grade: 75%</span>
            </div>

            {/* Stacked Cards for 15 Questions */}
            <div className="space-y-4">
              {filteredQuestions.map((q, qIndex) => {
                const actualNumber = activeQuestions.findIndex((item) => item.id === q.id) + 1;
                const correctOptLetter = optionLetters[q.correctAnswer] || 'A';
                const correctOptText = q.options[q.correctAnswer] || '';

                if (showAnswerKeysOnly) {
                  // Mode Ringkas Kunci Jawaban
                  return (
                    <div
                      key={q.id || qIndex}
                      className="bg-slate-900/90 border border-slate-800/90 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-violet-500/40 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-300 font-extrabold font-mono text-sm flex items-center justify-center shrink-0 border border-violet-500/30">
                          {actualNumber}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-200 line-clamp-2">{q.question}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Kunci: Opsi {correctOptLetter}
                            </span>
                            <span className="text-xs text-slate-400 line-clamp-1">"{correctOptText}"</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => {
                            setEditingQuestion(q);
                            setNewQuestionText(q.question);
                            setNewOptions([q.options[0] || '', q.options[1] || '', q.options[2] || '', q.options[3] || '']);
                            setNewCorrectAnswer(q.correctAnswer);
                            setNewExplanation(q.explanation || '');
                            setIsAddingQuestion(true);
                          }}
                          className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl min-h-[44px] touch-target-48 cursor-pointer"
                          title="Edit Soal"
                        >
                          <Edit2 className="w-4 h-4 text-cyan-400" />
                        </button>
                      </div>
                    </div>
                  );
                }

                // Mode Detail Lengkap (Soal + 4 Opsi + Kunci Jawaban + Pembahasan)
                return (
                  <div
                    key={q.id || qIndex}
                    className="bg-slate-900/90 border border-slate-800/90 p-5 sm:p-6 rounded-3xl space-y-4 hover:border-slate-700 transition-all shadow-lg shadow-black/20"
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-extrabold font-mono text-sm flex items-center justify-center shrink-0 shadow-md shadow-violet-600/30">
                          {actualNumber}
                        </span>
                        <div>
                          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                            BUTIR SOAL NO. {actualNumber} • {currentModule.id}
                          </span>
                          <h4 className="text-sm sm:text-base font-bold text-white leading-snug">{q.question}</h4>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setEditingQuestion(q);
                          setNewQuestionText(q.question);
                          setNewOptions([q.options[0] || '', q.options[1] || '', q.options[2] || '', q.options[3] || '']);
                          setNewCorrectAnswer(q.correctAnswer);
                          setNewExplanation(q.explanation || '');
                          setIsAddingQuestion(true);
                        }}
                        className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-cyan-400 rounded-xl min-h-[48px] touch-target-48 cursor-pointer shrink-0"
                        title="Edit Butir Soal"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 4 Options Grid (Responsive 1 Kolom on Mobile) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIndex) => {
                        const isCorrect = optIndex === q.correctAnswer;
                        return (
                          <div
                            key={optIndex}
                            className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${
                              isCorrect
                                ? 'bg-emerald-950/50 border-emerald-500/70 text-emerald-100 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                                : 'bg-slate-950/70 border-slate-800 text-slate-300'
                            }`}
                          >
                            <span
                              className={`w-7 h-7 rounded-lg font-bold font-mono text-xs flex items-center justify-center shrink-0 ${
                                isCorrect
                                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow'
                                  : 'bg-slate-850 text-slate-400'
                              }`}
                            >
                              {optionLetters[optIndex]}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm leading-relaxed">{opt}</p>
                              {isCorrect && (
                                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  Kunci Jawaban Benar
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation / Pembahasan Box */}
                    {q.explanation && (
                      <div className="p-3.5 rounded-2xl bg-violet-950/30 border border-violet-500/30 text-xs text-violet-200 flex items-start gap-2.5">
                        <HelpCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-violet-300 font-bold">Pembahasan Kunci Jawaban: </strong>
                          <span className="text-slate-300">{q.explanation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredQuestions.length === 0 && (
                <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="text-sm font-bold text-white">Tidak ada butir soal yang sesuai pencarian.</p>
                  <p className="text-xs text-slate-400">Silakan ubah kata kunci pencarian Anda.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KELOLA DATA SISWA (TRANSFORMED TO STACKED CARDS FOR MOBILE) */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          {/* Add Student Form - Responsive 1 Kolom on Mobile */}
          <form onSubmit={handleAddStudent} className="bg-slate-900/80 border border-slate-800 p-5 sm:p-6 rounded-3xl space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-violet-400" />
              Tambah Siswa Baru
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">NIS SISWA</label>
                <input
                  type="text"
                  placeholder="e.g. 23241010"
                  value={newNis}
                  onChange={(e) => setNewNis(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-base sm:text-xs p-3 rounded-xl text-white focus:outline-none min-h-[48px]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">NAMA LENGKAP</label>
                <input
                  type="text"
                  placeholder="Nama Lengkap Siswa"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-base sm:text-xs p-3 rounded-xl text-white focus:outline-none min-h-[48px]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">KELAS / JURUSAN</label>
                <select
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-base sm:text-xs p-3 rounded-xl text-white focus:outline-none min-h-[48px]"
                >
                  <option value="X DKV 1">X DKV 1</option>
                  <option value="X DKV 2">X DKV 2</option>
                  <option value="X APHP">X APHP</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-violet-500 hover:bg-violet-400 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl cursor-pointer min-h-[48px] touch-target-48 shadow-lg shadow-violet-500/20"
            >
              Simpan Siswa Baru
            </button>
          </form>

          {/* Student Table (Desktop) & Stacked Cards (Mobile) */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 sm:p-6 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">Daftar Siswa Terdaftar ({students.length})</h3>
                <p className="text-xs text-slate-400">Total data akun murid yang tersimpan di sistem</p>
              </div>
              <button
                onClick={handleExportCSV}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-700 cursor-pointer min-h-[48px] touch-target-48"
              >
                <Download className="w-4 h-4" /> Export Excel/CSV
              </button>
            </div>

            {/* Mobile View: Responsive Stacked Cards */}
            <div className="block md:hidden space-y-3">
              {students.map((st) => (
                <div
                  key={st.id}
                  className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-3 shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">{st.name}</h4>
                      <p className="text-xs text-slate-400 font-mono">NIS: {st.nis}</p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      {st.classGroup}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Total XP:</span>
                      <span className="font-mono font-bold text-cyan-300">{st.xp} XP</span>
                    </div>

                    <button
                      onClick={() => handleDeleteStudent(st.id, st.name)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 rounded-xl min-h-[44px] touch-target-48 cursor-pointer font-bold"
                      title="Hapus Siswa"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Clean Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-3">NIS</th>
                    <th className="p-3">Nama Lengkap</th>
                    <th className="p-3">Kelas</th>
                    <th className="p-3 text-center">Total XP</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-850/40">
                      <td className="p-3 font-mono">{st.nis}</td>
                      <td className="p-3 font-bold">{st.name}</td>
                      <td className="p-3 text-slate-400">{st.classGroup}</td>
                      <td className="p-3 text-center font-mono font-bold text-cyan-300">{st.xp} XP</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDeleteStudent(st.id, st.name)}
                          className="p-2 bg-rose-500/20 text-rose-400 hover:bg-rose-500/40 rounded-xl min-h-[44px] touch-target-48 cursor-pointer"
                          title="Hapus Siswa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PENGATURAN LMS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-slate-900/80 border border-slate-800 p-5 sm:p-6 rounded-3xl space-y-4">
          <h3 className="text-base font-bold text-white">Pengaturan Informasi Sekolah & Gamifikasi</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">NAMA SEKOLAH</label>
              <input
                type="text"
                value={formSettings.schoolName}
                onChange={(e) => setFormSettings({ ...formSettings, schoolName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-base sm:text-xs p-3 rounded-xl text-white focus:outline-none min-h-[48px]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">NAMA GURU INFORMATIKA</label>
              <input
                type="text"
                value={formSettings.teacherName}
                onChange={(e) => setFormSettings({ ...formSettings, teacherName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-base sm:text-xs p-3 rounded-xl text-white focus:outline-none min-h-[48px]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">NOMOR WHATSAPP GURU</label>
              <input
                type="text"
                value={formSettings.teacherPhoneWA}
                onChange={(e) => setFormSettings({ ...formSettings, teacherPhoneWA: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-base sm:text-xs p-3 rounded-xl text-white focus:outline-none font-mono min-h-[48px]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">PASSING GRADE KUIS (75)</label>
              <input
                type="number"
                value={formSettings.passingScoreThreshold}
                onChange={(e) => setFormSettings({ ...formSettings, passingScoreThreshold: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 text-base sm:text-xs p-3 rounded-xl text-white focus:outline-none font-mono min-h-[48px]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-400 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl cursor-pointer min-h-[48px] touch-target-48 shadow-lg shadow-violet-500/20"
          >
            <Save className="w-4 h-4" /> Simpan Pengaturan
          </button>
        </form>
      )}

      {/* TAB 4: BACKUP & RESTORE */}
      {activeTab === 'backup' && (
        <div className="bg-slate-900/80 border border-slate-800 p-5 sm:p-6 rounded-3xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-2">Export Data Backup JSON</h3>
            <p className="text-xs text-slate-400 mb-3">Unduh cadangan seluruh basis data siswa, kuis, dan nilai.</p>
            <button
              onClick={handleExportJSON}
              className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl cursor-pointer min-h-[48px] touch-target-48"
            >
              <Download className="w-4 h-4" /> Download Backup Data JSON
            </button>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <h3 className="text-base font-bold text-white mb-2">Restore Data dari JSON</h3>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="Tempelkan isi file JSON backup di sini..."
              className="w-full h-32 bg-slate-950 border border-slate-800 font-mono text-base sm:text-xs text-slate-300 p-3 rounded-xl focus:outline-none"
            />
            <button
              onClick={handleImportJSON}
              className="mt-3 flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-400 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl cursor-pointer min-h-[48px] touch-target-48"
            >
              <Upload className="w-4 h-4" /> Restore Database Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
