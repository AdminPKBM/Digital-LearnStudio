import React, { useState } from 'react';
import {
  Users,
  FileCheck2,
  Lock,
  Unlock,
  Key,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Award,
  Search,
  BookOpen,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Printer,
  Calendar,
  Cloud,
  Copy,
  ExternalLink,
  Code,
  PieChart as PieIcon,
  BarChart2,
  FileText,
  Save,
  Check,
  Megaphone,
  Clock,
  HelpCircle,
  FileSpreadsheet,
  X
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';
import { GASService } from '../services/gasService';
import { PrintReportModal } from '../components/teacher/PrintReportModal';
import { TeacherGradebook } from '../components/grades/TeacherGradebook';
import {
  StudentProfile,
  SubmissionData,
  ClassData,
  QuestionItem,
  ExamData,
  AttendanceRecord,
  AnnouncementData,
  ModuleData
} from '../types';

export const TeacherDashboardPage: React.FC = () => {
  const {
    modules,
    settings,
    updateSettings,
    classes,
    saveClass,
    deleteClass,
    students,
    saveStudent,
    deleteStudent,
    submissions,
    deleteSubmission,
    clearAllSubmissions,
    gradeSubmission,
    quizResults,
    lockedQuizzes,
    toggleLockQuiz,
    questionBank,
    saveQuestion,
    deleteQuestion,
    exams,
    saveExam,
    deleteExam,
    attendance,
    saveAttendanceBatch,
    announcements,
    saveAnnouncement,
    deleteAnnouncement,
    activityLogs,
    presensiOtomatis,
    loginHistory,
    aktivitasSiswa,
    refreshState,
    saveModule,
    deleteModule
  } = useApp();

  // Module Editing State
  const [editingModule, setEditingModule] = useState<ModuleData | null>(null);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState<boolean>(false);
  const [modForm, setModForm] = useState<Partial<ModuleData>>({});

  // Navigation Sub-tabs
  const [activeTab, setActiveTab] = useState<
    'overview' | 'classes' | 'materials' | 'assignments' | 'grades' | 'exams' | 'attendance' | 'announcements' | 'reports' | 'settings'
  >('overview');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('ALL');

  // Grading Modal
  const [gradingSub, setGradingSub] = useState<SubmissionData | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(85);
  const [feedbackInput, setFeedbackInput] = useState<string>('Sangat baik, tugas dikerjakan secara cermat.');

  // Print Laporan Modal
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [printReportType, setPrintReportType] = useState<any>('students');

  // GAS Setup Modal & Copy Code state
  const [isGasModalOpen, setIsGasModalOpen] = useState<boolean>(false);
  const [copiedGas, setCopiedGas] = useState<boolean>(false);
  const [testGasStatus, setTestGasStatus] = useState<string>('');

  // Class Form Modal
  const [newClassName, setNewClassName] = useState<string>('');
  const [newClassCode, setNewClassCode] = useState<string>('');

  // Student Form Modal
  const [editingStudent, setEditingStudent] = useState<StudentProfile | null>(null);
  const [studentNis, setStudentNis] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [studentClassGroup, setStudentClassGroup] = useState<string>('X DKV 1');

  // Question Bank Form
  const [qCategory, setQCategory] = useState<string>('Berpikir Komputasional');
  const [qTopic, setQTopic] = useState<string>('Dekomposisi');
  const [qText, setQText] = useState<string>('');
  const [qType, setQType] = useState<'multiple_choice' | 'true_false' | 'short_answer'>('multiple_choice');
  const [qOptionA, setQOptionA] = useState<string>('');
  const [qOptionB, setQOptionB] = useState<string>('');
  const [qOptionC, setQOptionC] = useState<string>('');
  const [qOptionD, setQOptionD] = useState<string>('');
  const [qCorrect, setQCorrect] = useState<string>('0');
  const [qExplanation, setQExplanation] = useState<string>('');

  // Exam Form
  const [examTitle, setExamTitle] = useState<string>('');
  const [examDesc, setExamDesc] = useState<string>('');
  const [examDuration, setExamDuration] = useState<number>(45);
  const [examClass, setExamClass] = useState<string>('ALL');

  // Attendance Form Date & Class
  const [attDate, setAttDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [attClass, setAttClass] = useState<string>('X DKV 1');
  const [attStatusMap, setAttStatusMap] = useState<Record<string, { status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpa'; notes: string }>>({});

  // Announcement Form
  const [annTitle, setAnnTitle] = useState<string>('');
  const [annContent, setAnnContent] = useState<string>('');
  const [annClass, setAnnClass] = useState<string>('ALL');

  // Settings Local Form
  const [localSubject, setLocalSubject] = useState<string>(settings.subjectName);
  const [localSchool, setLocalSchool] = useState<string>(settings.schoolName);
  const [localTeacher, setLocalTeacher] = useState<string>(settings.teacherName);
  const [localNip, setLocalNip] = useState<string>(settings.teacherNip || '');
  const [localPhone, setLocalPhone] = useState<string>(settings.teacherPhoneWA);
  const [localGasUrl, setLocalGasUrl] = useState<string>(settings.gasApiUrl || '');

  // Handlers
  const handleCopyGasCode = () => {
    navigator.clipboard.writeText(GASService.getBackendGSCode());
    setCopiedGas(true);
    setTimeout(() => setCopiedGas(false), 3000);
  };

  const handleTestGasConnection = async () => {
    if (!localGasUrl.trim()) {
      setTestGasStatus('Silakan masukkan Web App URL terlebih dahulu.');
      return;
    }
    setTestGasStatus('Menghubungkan ke Google Apps Script Web App...');
    const res = await GASService.fetchSheetData(localGasUrl, 'Siswa');
    if (res.success) {
      setTestGasStatus(`Koneksi Sukses! Terhubung ke Google Sheets & Drive (${res.data?.length || 0} baris siswa terbaca).`);
    } else {
      setTestGasStatus(`Gagal Terhubung: ${res.error}`);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...settings,
      subjectName: localSubject,
      schoolName: localSchool,
      teacherName: localTeacher,
      teacherNip: localNip,
      teacherPhoneWA: localPhone,
      gasApiUrl: localGasUrl,
    });
    alert('Pengaturan Aplikasi LMS berhasil diperbarui!');
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    saveClass({
      id: `cls-${Date.now()}`,
      name: newClassName.trim(),
      code: newClassCode.trim() || `CLS-${Date.now().toString().slice(-4)}`,
      academicYear: '2026/2027',
      studentCount: 0,
    });
    setNewClassName('');
    setNewClassCode('');
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentNis.trim() || !studentName.trim()) return;

    const studentId = editingStudent ? editingStudent.id : `student-${Date.now()}`;
    const newStudent: StudentProfile = {
      id: studentId,
      nis: studentNis.trim(),
      name: studentName.trim(),
      classGroup: studentClassGroup,
      xp: editingStudent ? editingStudent.xp : 0,
      level: editingStudent ? editingStudent.level : 1,
      streakDays: editingStudent ? editingStudent.streakDays : 1,
      lastLoginDate: new Date().toISOString().split('T')[0],
      completedModuleIds: editingStudent ? editingStudent.completedModuleIds : [],
      bookmarkedModuleIds: editingStudent ? editingStudent.bookmarkedModuleIds : [],
      badges: editingStudent ? editingStudent.badges : ['first_login'],
      notes: editingStudent ? editingStudent.notes : {},
    };

    saveStudent(newStudent);

    // Sync or create database account
    const existingUser = StorageService.getUserByUsername(studentNis.trim());
    StorageService.saveUser({
      id_user: existingUser ? existingUser.id_user : `usr-${studentId}`,
      username: studentNis.trim(),
      password_hash: existingUser ? existingUser.password_hash : 'bismillah',
      nama: studentName.trim(),
      role: 'SISWA',
      status: existingUser ? existingUser.status : 'AKTIF',
      nis: studentNis.trim(),
      classGroup: studentClassGroup,
      email: `${studentNis.trim()}@smknbojonggambir.sch.id`,
    });

    setEditingStudent(null);
    setStudentNis('');
    setStudentName('');
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim()) return;
    const options = qType === 'multiple_choice' ? [qOptionA, qOptionB, qOptionC, qOptionD] : qType === 'true_false' ? ['Benar', 'Salah'] : [];
    const correctVal = qType === 'multiple_choice' ? Number(qCorrect) : qCorrect;

    saveQuestion({
      id: `qb-${Date.now()}`,
      category: qCategory,
      topic: qTopic,
      question: qText,
      type: qType,
      options,
      correctAnswer: correctVal,
      explanation: qExplanation,
      difficulty: 'Menengah',
      weight: 10,
    });

    setQText('');
    setQOptionA('');
    setQOptionB('');
    setQOptionC('');
    setQOptionD('');
    setQExplanation('');
    alert('Soal berhasil ditambahkan ke Bank Soal!');
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle.trim()) return;
    const sampleQuestionIds = questionBank.slice(0, 5).map((q) => q.id);

    saveExam({
      id: `exam-${Date.now()}`,
      title: examTitle,
      description: examDesc,
      durationMinutes: examDuration,
      startSchedule: new Date().toISOString().replace('T', ' ').slice(0, 16),
      endSchedule: new Date(Date.now() + 86400000 * 3).toISOString().replace('T', ' ').slice(0, 16),
      maxScore: 100,
      targetClass: examClass,
      questionIds: sampleQuestionIds,
      isPublished: true,
    });

    setExamTitle('');
    setExamDesc('');
    alert('Ujian/Kuis baru berhasil diterbitkan!');
  };

  const handleSaveAttendance = () => {
    const classStudents = students.filter((s) => s.classGroup === attClass);
    const records: AttendanceRecord[] = classStudents.map((st) => {
      const state = attStatusMap[st.id] || { status: 'Hadir', notes: '' };
      return {
        id: `att-${attDate}-${st.id}`,
        studentId: st.id,
        studentName: st.name,
        classGroup: st.classGroup,
        date: attDate,
        meetingNumber: 1,
        status: state.status,
        notes: state.notes,
      };
    });

    saveAttendanceBatch(records);
    alert(`Absensi kelas ${attClass} tanggal ${attDate} berhasil disimpan & disinkronkan!`);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    saveAnnouncement({
      id: `ann-${Date.now()}`,
      title: annTitle,
      content: annContent,
      targetClass: annClass,
      authorName: settings.teacherName,
      date: new Date().toISOString().split('T')[0],
      isPinned: false,
    });

    setAnnTitle('');
    setAnnContent('');
    alert('Pengumuman berhasil diterbitkan!');
  };

  // Recharts Data Sets
  const gradeDistributionData = [
    { name: 'Sangat Baik (A)', value: students.filter((s) => (s.completedModuleIds.length / 16) >= 0.75).length },
    { name: 'Baik (B)', value: students.filter((s) => (s.completedModuleIds.length / 16) >= 0.5 && (s.completedModuleIds.length / 16) < 0.75).length },
    { name: 'Cukup (C)', value: students.filter((s) => (s.completedModuleIds.length / 16) < 0.5).length },
  ];

  const attendanceChartData = [
    { name: 'Hadir', value: attendance.filter((a) => a.status === 'Hadir').length || 12, color: '#10b981' },
    { name: 'Izin', value: attendance.filter((a) => a.status === 'Izin').length || 2, color: '#3b82f6' },
    { name: 'Sakit', value: attendance.filter((a) => a.status === 'Sakit').length || 1, color: '#f59e0b' },
    { name: 'Alpa', value: attendance.filter((a) => a.status === 'Alpa').length || 0, color: '#ef4444' },
  ];

  const pendingSubmissions = submissions.filter((s) => s.status === 'pending');

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Dynamic Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/50 to-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                PENGELOLA LMS SAKTI
              </span>
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Cloud className="w-3.5 h-3.5" /> Google Sheets & Drive Backend
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              LMS {settings.subjectName} — {settings.schoolName}
            </h2>
            <p className="text-xs text-slate-400">
              Pengampu: <strong className="text-slate-200">{settings.teacherName}</strong> • Kurikulum Merdeka Fase E
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsGasModalOpen(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold text-xs px-4 py-2.5 rounded-2xl transition cursor-pointer"
            >
              <Code className="w-4 h-4 text-cyan-400" /> Kode Script Backend GS
            </button>
            <button
              onClick={() => {
                setPrintReportType('students');
                setIsPrintModalOpen(true);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-2xl transition cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <Printer className="w-4 h-4" /> Cetak Laporan
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
        {[
          { id: 'overview', label: 'Ikhtisar & Analitik', icon: BarChart2 },
          { id: 'classes', label: 'Kelas & Siswa', icon: Users },
          { id: 'materials', label: 'Materi Pembelajaran', icon: BookOpen },
          { id: 'assignments', label: 'Tugas & Submission', icon: FileCheck2 },
          { id: 'grades', label: 'Buku Nilai & Rekap', icon: FileSpreadsheet },
          { id: 'exams', label: 'Bank Soal & Ujian', icon: Award },
          { id: 'attendance', label: 'Presensi Otomatis', icon: Calendar },
          { id: 'announcements', label: 'Pengumuman', icon: Megaphone },
          { id: 'reports', label: 'Cetak Laporan', icon: Printer },
          { id: 'settings', label: 'Pengaturan Mapel', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Metrics Summary Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-3xl space-y-2">
              <div className="text-xs text-slate-400 font-semibold uppercase">Total Kelas</div>
              <div className="text-2xl font-extrabold text-white font-mono">{classes.length} Kelas</div>
              <p className="text-[10px] text-slate-500">DKV 1, DKV 2, APHP</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-3xl space-y-2">
              <div className="text-xs text-slate-400 font-semibold uppercase">Siswa Terdaftar</div>
              <div className="text-2xl font-extrabold text-cyan-400 font-mono">{students.length} Siswa</div>
              <p className="text-[10px] text-slate-500">Aktif mengikuti LMS</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-3xl space-y-2">
              <div className="text-xs text-slate-400 font-semibold uppercase">Tugas Antrian Grading</div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">{pendingSubmissions.length} Tugas</div>
              <p className="text-[10px] text-slate-500">Perlu pemeriksaan guru</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-3xl space-y-2">
              <div className="text-xs text-slate-400 font-semibold uppercase">Ujian & Kuis Aktif</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{exams.length} Paket</div>
              <p className="text-[10px] text-slate-500">Bank Soal: {questionBank.length} Soal</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Progress Progress Class */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                Distribusi Tingkat Ketuntasan Belajar Siswa
              </h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeDistributionData}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Attendance Pie */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-emerald-400" />
                Persentase Kehadiran / Absensi Siswa
              </h3>
              <div className="h-60 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={attendanceChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {attendanceChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              Log Aktivitas Terakhir Dalam Sistem
            </h3>
            <div className="space-y-3">
              {activityLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white">{log.userName}</span>
                    <span className="text-slate-400 ml-2">({log.action}): {log.details}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLASSES & STUDENTS */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          {/* Class List & Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <form onSubmit={handleCreateClass} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" /> Tambah Kelas Baru
              </h3>
              <div>
                <label className="block text-xs text-slate-400 mb-1">NAMA KELAS (e.g. X DKV 3)</label>
                <input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="X DKV 3"
                  className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">KODE KELAS</label>
                <input
                  type="text"
                  value={newClassCode}
                  onChange={(e) => setNewClassCode(e.target.value)}
                  placeholder="DKV3-2026"
                  className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-white font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs p-3 rounded-xl cursor-pointer"
              >
                Simpan Kelas
              </button>
            </form>

            <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-white">Daftar Kelas Aktif ({classes.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {classes.map((c) => {
                  const count = students.filter((s) => s.classGroup === c.name).length;
                  return (
                    <div key={c.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-base text-white">{c.name}</strong>
                        <button
                          onClick={() => deleteClass(c.id)}
                          className="p-1 text-slate-500 hover:text-rose-400"
                          title="Hapus Kelas"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs font-mono text-cyan-400">Kode: {c.code}</div>
                      <div className="text-xs text-slate-400">{count} Siswa Terdaftar</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Student Form & Table */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-sm font-bold text-white">Kelola Data Siswa ({students.length})</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Cari NIS/Nama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-white px-3 py-1.5 rounded-xl"
                />
                <select
                  value={selectedClassFilter}
                  onChange={(e) => setSelectedClassFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-300 px-3 py-1.5 rounded-xl"
                >
                  <option value="ALL">Semua Kelas</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Student Add/Edit Inline Form */}
            <form onSubmit={handleSaveStudent} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">NIS SISWA</label>
                <input
                  type="text"
                  value={studentNis}
                  onChange={(e) => setStudentNis(e.target.value)}
                  placeholder="23241010"
                  className="w-full bg-slate-900 border border-slate-800 text-xs p-2.5 rounded-xl text-white font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">NAMA LENGKAP SISWA</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Siti Aminah"
                  className="w-full bg-slate-900 border border-slate-800 text-xs p-2.5 rounded-xl text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">KELAS SISWA</label>
                <select
                  value={studentClassGroup}
                  onChange={(e) => setStudentClassGroup(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-xs p-2.5 rounded-xl text-white"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs p-2.5 rounded-xl cursor-pointer"
              >
                {editingStudent ? 'Update Siswa' : '+ Tambah Siswa'}
              </button>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-3">NIS</th>
                    <th className="p-3">Nama Siswa</th>
                    <th className="p-3 text-center">JK</th>
                    <th className="p-3">Kelas & Jurusan</th>
                    <th className="p-3 text-center">Status Akun</th>
                    <th className="p-3 text-center">XP</th>
                    <th className="p-3 text-center">Aksi & Keamanan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {students
                    .filter((s) => {
                      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.nis.includes(searchQuery);
                      const matchClass = selectedClassFilter === 'ALL' || s.classGroup === selectedClassFilter;
                      return matchSearch && matchClass;
                    })
                    .map((st) => {
                      const userAcc = StorageService.getUserByUsername(st.nis);
                      const isAktif = !userAcc || userAcc.status === 'AKTIF';
                      return (
                        <tr key={st.id}>
                          <td className="p-3 font-mono">{st.nis}</td>
                          <td className="p-3 font-bold">{st.name}</td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              st.gender === 'P' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}>
                              {st.gender || '-'}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400">
                            <div className="font-semibold text-slate-300">{st.classGroup}</div>
                            {st.jurusan && <div className="text-[10px] text-slate-500 leading-tight">{st.jurusan}</div>}
                          </td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isAktif ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}>
                              {isAktif ? 'AKTIF' : 'NON-AKTIF'}
                            </span>
                          </td>
                          <td className="p-3 text-center font-mono font-bold text-cyan-400">{st.xp} XP</td>
                          <td className="p-3 text-center space-x-1.5">
                            <button
                              onClick={() => {
                                setEditingStudent(st);
                                setStudentNis(st.nis);
                                setStudentName(st.name);
                                setStudentClassGroup(st.classGroup);
                              }}
                              className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition"
                              title="Edit Data Siswa"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                const user = StorageService.getUserByUsername(st.nis);
                                const targetId = user ? user.id_user : `usr-${st.id}`;
                                const newPass = prompt(`Reset Password untuk ${st.name} (NIS: ${st.nis}):`, 'bismillah');
                                if (newPass && newPass.trim()) {
                                  StorageService.updateUserPassword(targetId, newPass.trim());
                                  alert(`Password ${st.name} berhasil di-reset!`);
                                }
                              }}
                              className="p-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition"
                              title="Reset Password Siswa"
                            >
                              <Key className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                const user = StorageService.getUserByUsername(st.nis);
                                const targetId = user ? user.id_user : `usr-${st.id}`;
                                StorageService.toggleUserStatus(targetId);
                                setSearchQuery((q) => q); // trigger rerender
                              }}
                              className={`p-1.5 rounded-lg transition ${
                                isAktif ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-400' : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400'
                              }`}
                              title={isAktif ? 'Nonaktifkan Akun Siswa' : 'Aktifkan Akun Siswa'}
                            >
                              {isAktif ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => deleteStudent(st.id)}
                              className="p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition"
                              title="Hapus Siswa"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MATERIALS MANAGEMENT */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  Kelola Bahan Bacaan & Modul Pembelajaran ({modules.length} Modul)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Atur materi terstruktur, unggah media PDF/Video, atur status publikasi, dan pertanyaan pemantik untuk siswa.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingModule(null);
                  setModForm({
                    id: `M-${String(modules.length + 1).padStart(2, '0')}`,
                    title: '',
                    elementId: 'BK',
                    elementName: 'Berpikir Komputasional',
                    moduleNumber: modules.length + 1,
                    estimatedMinutes: 45,
                    estimatedTimeMinutes: 45,
                    difficulty: 'Pemula',
                    competencies: ['Analisis Data', 'Problem Solving'],
                    objectives: ['Siswa mampu memahami konsep dasar informatika.'],
                    summary: '',
                    contentMarkdown: '',
                    materiUtama: '',
                    infographicHighlights: [
                      { label: 'Konsep 1', text: 'Penjelasan ringkas konsep 1', icon: 'Brain' }
                    ],
                    status: 'published',
                    targetClass: 'ALL'
                  });
                  setIsModuleModalOpen(true);
                }}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-2xl transition shadow-lg shadow-cyan-500/20 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Modul Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((mod) => (
                <div key={mod.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between hover:border-slate-700 transition">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {mod.id} • {mod.elementId}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          mod.status === 'published' || !mod.status
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}>
                          {mod.status === 'published' || !mod.status ? 'Publik' : 'Draft'}
                        </span>
                        <span className="text-[10px] text-slate-400">{mod.estimatedTimeMinutes || mod.estimatedMinutes} Mnt</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white line-clamp-1">{mod.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{mod.summary}</p>

                    {mod.bab && (
                      <div className="text-[10px] font-semibold text-cyan-400/90">{mod.bab}</div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <a
                      href={`/modules/${mod.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" /> Preview
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingModule(mod);
                          setModForm({ ...mod });
                          setIsModuleModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-bold rounded-xl border border-blue-500/30 transition cursor-pointer flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Apakah Anda yakin ingin menghapus modul "${mod.title}"?`)) {
                            deleteModule(mod.id);
                          }
                        }}
                        className="p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-xl border border-rose-500/30 transition cursor-pointer"
                        title="Hapus Modul"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module Editor Modal */}
          {isModuleModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl animate-fadeIn">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    {editingModule ? `Edit Modul Bahan Bacaan (${editingModule.id})` : 'Tambah Modul Bahan Bacaan Baru'}
                  </h3>
                  <button
                    onClick={() => setIsModuleModalOpen(false)}
                    className="text-slate-400 hover:text-white font-bold text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!modForm.title || !modForm.id) return;
                    saveModule(modForm as ModuleData);
                    setIsModuleModalOpen(false);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">ID MODUL</label>
                      <input
                        type="text"
                        value={modForm.id || ''}
                        onChange={(e) => setModForm({ ...modForm, id: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">ELEMEN INFORMATIKA</label>
                      <select
                        value={modForm.elementId || 'BK'}
                        onChange={(e) => {
                          const elId = e.target.value as any;
                          const elNames: Record<string, string> = {
                            BK: 'Berpikir Komputasional',
                            TIK: 'Teknologi Informasi & Komunikasi',
                            SK: 'Sistem Komputer',
                            JKI: 'Jaringan Komputer & Internet',
                            AD: 'Analisis Data',
                            AP: 'Algoritma & Pemrograman',
                            DSI: 'Dampak Sosial Informatika',
                            PLB: 'Praktik Lintas Bidang'
                          };
                          setModForm({ ...modForm, elementId: elId, elementName: elNames[elId] || elId });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                      >
                        <option value="BK">BK - Berpikir Komputasional</option>
                        <option value="TIK">TIK - Teknologi Informasi</option>
                        <option value="SK">SK - Sistem Komputer</option>
                        <option value="JKI">JKI - Jaringan Komputer</option>
                        <option value="AD">AD - Analisis Data</option>
                        <option value="AP">AP - Algoritma Pemrograman</option>
                        <option value="DSI">DSI - Dampak Sosial</option>
                        <option value="PLB">PLB - Praktik Lintas Bidang</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">ESTIMASI WAKTU (MENIT)</label>
                      <input
                        type="number"
                        value={modForm.estimatedTimeMinutes || 45}
                        onChange={(e) => setModForm({ ...modForm, estimatedTimeMinutes: Number(e.target.value), estimatedMinutes: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">JUDUL MODUL BAHAN BACAAN</label>
                    <input
                      type="text"
                      value={modForm.title || ''}
                      onChange={(e) => setModForm({ ...modForm, title: e.target.value })}
                      placeholder="e.g. Berpikir Komputasional & Dekomposisi Masalah"
                      className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-bold"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">BAB (e.g. Bab 1: Berpikir Komputasional)</label>
                      <input
                        type="text"
                        value={modForm.bab || ''}
                        onChange={(e) => setModForm({ ...modForm, bab: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">PERTEMUAN KE-</label>
                      <input
                        type="number"
                        value={modForm.pertemuan || 1}
                        onChange={(e) => setModForm({ ...modForm, pertemuan: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">RINGKASAN SINGKAT DESKRIPSI</label>
                    <textarea
                      value={modForm.summary || ''}
                      onChange={(e) => setModForm({ ...modForm, summary: e.target.value })}
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">MATERI UTAMA (MARKDOWN)</label>
                    <textarea
                      value={modForm.materiUtama || modForm.contentMarkdown || ''}
                      onChange={(e) => setModForm({ ...modForm, materiUtama: e.target.value, contentMarkdown: e.target.value })}
                      rows={8}
                      placeholder="# Judul Pembahasan&#10;&#10;Tuliskan isi materi lengkap menggunakan format Markdown..."
                      className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-white font-mono leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">URL GAMBAR COVER / ILUSTRASI</label>
                      <input
                        type="text"
                        value={modForm.imageUrl || ''}
                        onChange={(e) => setModForm({ ...modForm, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">URL VIDEO PEMBELAJARAN (YOUTUBE)</label>
                      <input
                        type="text"
                        value={modForm.videoUrl || ''}
                        onChange={(e) => setModForm({ ...modForm, videoUrl: e.target.value })}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">URL FILE PDF MATERI (GOOGLE DRIVE)</label>
                      <input
                        type="text"
                        value={modForm.pdfUrl || ''}
                        onChange={(e) => setModForm({ ...modForm, pdfUrl: e.target.value })}
                        placeholder="https://drive.google.com/..."
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">URL FILE PENDUKUNG PRAKTIK</label>
                      <input
                        type="text"
                        value={modForm.supportingFileUrl || ''}
                        onChange={(e) => setModForm({ ...modForm, supportingFileUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">STATUS PUBLIKASI</label>
                      <select
                        value={modForm.status || 'published'}
                        onChange={(e) => setModForm({ ...modForm, status: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                      >
                        <option value="published">Publik (Terbit)</option>
                        <option value="draft">Draft (Draf Guru)</option>
                        <option value="hidden">Hidden (Tersembunyi)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">TARGET KELAS</label>
                      <select
                        value={modForm.targetClass || 'ALL'}
                        onChange={(e) => setModForm({ ...modForm, targetClass: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                      >
                        <option value="ALL">Semua Kelas</option>
                        {classes.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModuleModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20"
                    >
                      Simpan Modul
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: ASSIGNMENTS & GRADING */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                Antrian Pengumpulan Tugas Praktik Siswa ({submissions.length})
              </h3>
              {submissions.length > 0 && (
                <button
                  onClick={() => {
                    clearAllSubmissions();
                  }}
                  className="px-3 py-1.5 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Kosongkan Semua Antrian
                </button>
              )}
            </div>

            {submissions.length === 0 ? (
              <div className="p-12 text-center bg-slate-950/60 border border-dashed border-slate-800 rounded-2xl space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-white">Antrian Pengumpulan Tugas Kosong</div>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Semua antrian tugas praktik telah dikosongkan. Tugas yang dikirimkan oleh siswa nantinya akan muncul di sini untuk dinilai.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {submissions.map((sub) => (
                  <div key={sub.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white">{sub.studentName}</div>
                        <div className="text-xs text-slate-400">{sub.studentClass} • Modul {sub.moduleId}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded border ${
                          sub.status === 'graded' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}>
                          {sub.status === 'graded' ? `Nilai: ${sub.score}` : 'Menunggu Grading'}
                        </span>
                        <button
                          onClick={() => {
                            deleteSubmission(sub.id);
                          }}
                          className="p-1 text-slate-500 hover:text-rose-400 rounded-lg transition"
                          title="Hapus Pengumpulan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-cyan-300 font-mono truncate">
                      File / Link: {sub.fileName || sub.externalLink}
                    </div>

                    {sub.notes && (
                      <p className="text-xs text-slate-400 italic">"{sub.notes}"</p>
                    )}

                    <button
                      onClick={() => {
                        setGradingSub(sub);
                        setGradeInput(sub.score || 85);
                        setFeedbackInput(sub.feedback || 'Sangat baik!');
                      }}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2 rounded-xl cursor-pointer"
                    >
                      {sub.status === 'graded' ? 'Edit Nilai & Feedback' : 'Beri Nilai & Feedback'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: BUKU NILAI & REKAPITULASI (GRADEBOOK) */}
      {activeTab === 'grades' && (
        <TeacherGradebook />
      )}

      {/* TAB 5: BANK SOAL & EXAMS */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create Question */}
            <form onSubmit={handleCreateQuestion} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" /> Buat Soal Baru (Bank Soal)
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">KATEGORI / ELEMEN</label>
                  <input
                    type="text"
                    value={qCategory}
                    onChange={(e) => setQCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs p-2.5 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">TIPE SOAL</label>
                  <select
                    value={qType}
                    onChange={(e) => setQType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs p-2.5 rounded-xl text-white"
                  >
                    <option value="multiple_choice">Pilihan Ganda</option>
                    <option value="true_false">Benar / Salah</option>
                    <option value="short_answer">Isian Singkat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">PERTANYAAN / SOAL</label>
                <textarea
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  placeholder="Tuliskan teks soal di sini..."
                  className="w-full h-20 bg-slate-950 border border-slate-800 text-xs text-white p-2.5 rounded-xl"
                  required
                />
              </div>

              {qType === 'multiple_choice' && (
                <div className="space-y-2">
                  <input type="text" value={qOptionA} onChange={(e) => setQOptionA(e.target.value)} placeholder="Opsi A" className="w-full bg-slate-950 border border-slate-800 text-xs p-2 rounded-xl text-white" />
                  <input type="text" value={qOptionB} onChange={(e) => setQOptionB(e.target.value)} placeholder="Opsi B" className="w-full bg-slate-950 border border-slate-800 text-xs p-2 rounded-xl text-white" />
                  <input type="text" value={qOptionC} onChange={(e) => setQOptionC(e.target.value)} placeholder="Opsi C" className="w-full bg-slate-950 border border-slate-800 text-xs p-2 rounded-xl text-white" />
                  <input type="text" value={qOptionD} onChange={(e) => setQOptionD(e.target.value)} placeholder="Opsi D" className="w-full bg-slate-950 border border-slate-800 text-xs p-2 rounded-xl text-white" />
                </div>
              )}

              <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs p-3 rounded-xl cursor-pointer">
                Simpan Ke Bank Soal
              </button>
            </form>

            {/* Bank Soal List */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-white">Bank Soal ({questionBank.length})</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {questionBank.map((q) => (
                  <div key={q.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-cyan-400 text-[10px]">{q.id} • {q.category}</span>
                      <button onClick={() => deleteQuestion(q.id)} className="text-rose-400 hover:text-rose-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="font-bold text-white">{q.question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PRESENSI OTOMATIS & MONITORING AKSES LMS */}
      {activeTab === 'attendance' && (
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                Presensi Otomatis & Monitoring Aktivitas LMS
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Sistem otomatis mencatat kehadiran saat siswa login. Tanpa pengisian absensi manual.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedClassFilter}
                onChange={(e) => setSelectedClassFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-slate-200 p-2.5 rounded-xl font-medium"
              >
                <option value="ALL">Semua Kelas</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>

              <button
                onClick={() => {
                  setPrintReportType('auto_attendance');
                  setIsPrintModalOpen(true);
                }}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-500/10"
              >
                <Printer className="w-4 h-4" /> Cetak Presensi
              </button>
            </div>
          </div>

          {/* Info Card Aturan Presensi */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">Aturan Presensi Otomatis:</span>
              <span>1 siswa + 1 tanggal = maksimal 1 presensi harian. Login berulang pada hari yang sama hanya memperbarui jam login terakhir dan menghitung total frekuensi login.</span>
            </div>
          </div>

          {/* Metrics Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Total Siswa Terdaftar</span>
              <span className="text-2xl font-black text-white font-mono">{students.length} Siswa</span>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Total Hari Akses Kehadiran</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {(presensiOtomatis || []).length} Presensi
              </span>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Total Frekuensi Login</span>
              <span className="text-2xl font-black text-cyan-400 font-mono">
                {(presensiOtomatis || []).reduce((a, b) => a + b.jumlah_login, 0)} Kali
              </span>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Total Log Aktivitas Belajar</span>
              <span className="text-2xl font-black text-indigo-400 font-mono">
                {(aktivitasSiswa || []).length} Log
              </span>
            </div>
          </div>

          {/* Table Presensi Otomatis */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950">
                  <th className="p-3 w-10 text-center">No</th>
                  <th className="p-3">NIS</th>
                  <th className="p-3">Nama Siswa</th>
                  <th className="p-3 text-center">Kelas</th>
                  <th className="p-3 text-center">Hari Akses Total</th>
                  <th className="p-3 text-center">Total Login</th>
                  <th className="p-3 text-center">Login Terakhir</th>
                  <th className="p-3 text-center">Status Hari Ini</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200 bg-slate-900/40">
                {(selectedClassFilter === 'ALL'
                  ? students
                  : students.filter((s) => s.classGroup === selectedClassFilter)
                ).map((st, i) => {
                  const stPres = (presensiOtomatis || []).filter((p) => p.id_siswa === st.id);
                  const hariAkses = new Set(stPres.map((p) => p.tanggal)).size;
                  const totalLogin = stPres.reduce((acc, p) => acc + p.jumlah_login, 0);
                  const lastP = stPres.sort((a, b) => b.tanggal.localeCompare(a.tanggal))[0];
                  const todayStr = new Date().toISOString().split('T')[0];
                  const hasLoggedInToday = stPres.some((p) => p.tanggal === todayStr);

                  return (
                    <tr key={st.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-mono text-slate-500 text-center">{i + 1}</td>
                      <td className="p-3 font-mono text-cyan-300">{st.nis}</td>
                      <td className="p-3 font-bold text-white">{st.name}</td>
                      <td className="p-3 text-center text-slate-300">{st.classGroup}</td>
                      <td className="p-3 text-center font-mono font-bold text-emerald-400">{hariAkses} Hari</td>
                      <td className="p-3 text-center font-mono font-bold text-cyan-400">{totalLogin} Kali</td>
                      <td className="p-3 text-center font-mono text-slate-300">
                        {lastP ? `${lastP.tanggal} (${lastP.login_terakhir})` : 'Belum Pernah'}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          hasLoggedInToday
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {hasLoggedInToday ? 'Hadir (Otomatis)' : 'Belum Akses Hari Ini'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form onSubmit={handleCreateAnnouncement} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-cyan-400" /> Buat Pengumuman Baru
            </h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">JUDUL PENGUMUMAN</label>
              <input
                type="text"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="Persiapan UTS Informatika"
                className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">TARGET KELAS</label>
              <select
                value={annClass}
                onChange={(e) => setAnnClass(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-white"
              >
                <option value="ALL">Semua Kelas</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">ISI PENGUMUMAN</label>
              <textarea
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                placeholder="Tuliskan pesan pengumuman..."
                className="w-full h-24 bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-xl"
                required
              />
            </div>
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs p-3 rounded-xl cursor-pointer">
              Terbitkan Pengumuman
            </button>
          </form>

          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white">Pengumuman Terbit ({announcements.length})</h3>
            <div className="space-y-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400">{ann.date} • Target: {ann.targetClass}</span>
                    <button onClick={() => deleteAnnouncement(ann.id)} className="text-rose-400 hover:text-rose-300">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="font-bold text-white text-sm">{ann.title}</h4>
                  <p className="text-xs text-slate-300">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: REPORTS PRINT ENGINE */}
      {activeTab === 'reports' && (
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Printer className="w-4 h-4 text-cyan-400" /> Pusat Cetak Laporan Akademik LMS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'students', label: '1. Daftar Siswa Per Kelas', desc: 'Cetak daftar seluruh siswa beserta NIS dan Level.' },
              { id: 'materials', label: '2. Rekapitulasi Materi Mapel', desc: 'Cetak daftar 16 modul pembelajaran.' },
              { id: 'submissions', label: '3. Rekap Pengumpulan Tugas', desc: 'Cetak riwayat tugas praktik dan status nilai.' },
              { id: 'grades', label: '4. Rekap Nilai Akhir Siswa', desc: 'Cetak rekapitulasi nilai dan ketuntasan.' },
              { id: 'auto_attendance', label: '5. Rekap Presensi Otomatis', desc: 'Cetak rekap presensi login harian & total frekuensi akses.' },
              { id: 'activity_summary', label: '6. Rekap Aktivitas Belajar', desc: 'Cetak statistik modul, kuis, dan pengumpulan tugas.' },
              { id: 'inactive_students', label: '7. Rekap Siswa Perlu Perhatian', desc: 'Cetak daftar siswa yang jarang/belum login LMS.' },
              { id: 'student_detail', label: '8. Laporan Individu Siswa', desc: 'Cetak perkembangan individu siswa.' },
            ].map((rep) => (
              <div key={rep.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">{rep.label}</h4>
                  <p className="text-[11px] text-slate-400 mt-1">{rep.desc}</p>
                </div>
                <button
                  onClick={() => {
                    setPrintReportType(rep.id);
                    setIsPrintModalOpen(true);
                  }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs p-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-cyan-500/10"
                >
                  <Printer className="w-3.5 h-3.5" /> Cetak Sekarang
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: MAPEL & BACKEND GAS SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-cyan-400" /> Pengaturan Informasi Mata Pelajaran & Google Apps Script
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">NAMA MATA PELAJARAN (DINAMIS)</label>
              <input
                type="text"
                value={localSubject}
                onChange={(e) => setLocalSubject(e.target.value)}
                placeholder="Informatika / Pemrograman Web / Dasar DKV"
                className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-white font-bold"
                required
              />
              <p className="text-[10px] text-slate-500 mt-1">Dapat diganti kapan saja tanpa mengubah kode utama LMS.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">NAMA SEKOLAH</label>
              <input
                type="text"
                value={localSchool}
                onChange={(e) => setLocalSchool(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">NAMA GURU PENGAMPU</label>
              <input
                type="text"
                value={localTeacher}
                onChange={(e) => setLocalTeacher(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">NIP GURU</label>
              <input
                type="text"
                value={localNip}
                onChange={(e) => setLocalNip(e.target.value)}
                placeholder="19880512 202221 1 004"
                className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">NOMOR WHATSAPP GURU</label>
              <input
                type="text"
                value={localPhone}
                onChange={(e) => setLocalPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs p-3 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-cyan-400 mb-1">GOOGLE APPS SCRIPT WEB APP URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={localGasUrl}
                  onChange={(e) => setLocalGasUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full bg-slate-950 border border-cyan-500/40 text-xs p-3 rounded-xl text-cyan-300 font-mono"
                />
                <button
                  type="button"
                  onClick={handleTestGasConnection}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-3 rounded-xl border border-slate-700 cursor-pointer whitespace-nowrap"
                >
                  Tes Koneksi
                </button>
              </div>
              {testGasStatus && (
                <p className="text-[10px] font-mono text-cyan-300 mt-1">{testGasStatus}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsGasModalOpen(true)}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Code className="w-4 h-4" /> Buka Salinan Script Apps Script
            </button>

            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              Simpan Pengaturan
            </button>
          </div>
        </form>
      )}

      {/* Grading Modal */}
      {gradingSub && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              gradeSubmission(gradingSub.id, gradeInput, feedbackInput);
              setGradingSub(null);
            }}
            className="bg-slate-900 border border-slate-800 p-6 rounded-3xl w-full max-w-lg space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Penilaian Tugas Siswa</h3>
                <p className="text-xs text-slate-400">
                  {gradingSub.studentName} ({gradingSub.studentClass}) • Modul {gradingSub.moduleId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setGradingSub(null)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">NILAI AKHIR (0 - 100)</label>
                <span className="text-[10px] text-slate-400">KKM: 75</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={gradeInput}
                  onChange={(e) => setGradeInput(Math.min(100, Math.max(0, Number(e.target.value))))}
                  className="w-32 bg-slate-950 border border-slate-700 text-emerald-400 font-mono text-2xl font-bold p-3 rounded-2xl text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {[75, 80, 85, 90, 95, 100].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setGradeInput(preset)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                        gradeInput === preset
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">FEEDBACK / CATATAN GURU</label>
              <textarea
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="Tuliskan catatan apresiasi atau evaluasi untuk siswa..."
                className="w-full h-24 bg-slate-950 border border-slate-700 text-xs text-slate-200 p-3 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <div className="flex flex-wrap gap-1 mt-1.5 text-[10px]">
                <span className="text-slate-500 self-center">Template:</span>
                {[
                  'Tugas dikerjakan sangat baik dan tuntas.',
                  'Logika dan struktur kode sudah tepat.',
                  'Perlu perbaikan bagian dokumentasi.',
                ].map((tmpl, tIdx) => (
                  <button
                    key={tIdx}
                    type="button"
                    onClick={() => setFeedbackInput(tmpl)}
                    className="px-2 py-0.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 truncate max-w-[200px]"
                  >
                    {tmpl}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setGradingSub(null)}
                className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                Simpan Penilaian
              </button>
            </div>
          </form>
        </div>
      )}

      {/* GAS Code Script Copy Modal */}
      {isGasModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-cyan-400" />
                  Kode Google Apps Script Backend (Code.gs)
                </h3>
                <p className="text-xs text-slate-400">Salin kode di bawah ke Apps Script Google Sheets Anda lalu Terbitkan Web App.</p>
              </div>
              <button
                onClick={handleCopyGasCode}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
              >
                {copiedGas ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedGas ? 'Tersalin!' : 'Salin Semua Kode GS'}
              </button>
            </div>

            <textarea
              readOnly
              value={GASService.getBackendGSCode()}
              className="w-full flex-1 bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300 p-4 rounded-2xl focus:outline-none overflow-y-auto min-h-[300px]"
            />

            <div className="flex justify-end">
              <button
                onClick={() => setIsGasModalOpen(false)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Report Modal Trigger */}
      <PrintReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        reportType={printReportType}
        selectedClass={selectedClassFilter}
        settings={settings}
        students={students}
        classes={classes}
        modules={modules}
        submissions={submissions}
        quizResults={quizResults}
        exams={exams}
        presensiOtomatis={presensiOtomatis}
        loginHistory={loginHistory}
        aktivitasSiswa={aktivitasSiswa}
      />
    </div>
  );
};
