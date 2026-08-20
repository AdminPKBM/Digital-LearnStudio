import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ModuleData,
  QuizData,
  SubmissionData,
  QuizResult,
  BadgeData,
  LeaderboardEntry,
  AppSettings,
  StudentProfile,
  CertificateData,
  ClassData,
  QuestionItem,
  ExamData,
  AttendanceRecord,
  AnnouncementData,
  ActivityLog,
  MaterialProgress,
  PresensiOtomatis,
  LoginHistory,
  AktivitasSiswa,
  GradeItem,
  StudentGradeRecord,
  GradeWeights,
  GradeCategory,
  StudentCalculatedGrade
} from '../types';
import {
  modulesData,
  quizzesData,
  badgesList,
  assignmentsData,
  initialGradeWeights
} from '../data/seedData';
import { StorageService } from '../services/storage';
import { useAuth } from './AuthContext';

export interface AppContextType {
  modules: ModuleData[];
  getModuleById: (id: string) => ModuleData | undefined;
  saveModule: (mod: ModuleData) => void;
  deleteModule: (id: string) => void;
  reorderModules: (orderedModules: ModuleData[]) => void;
  
  materialProgress: MaterialProgress[];
  updateReadingProgress: (moduleId: string, percent: number, markCompleted?: boolean) => void;
  getStudentProgressForModule: (studentId: string, moduleId: string) => MaterialProgress | undefined;
  getStudentOverallProgress: (studentId: string) => {
    total: number;
    completed: number;
    inProgress: number;
    unread: number;
    percent: number;
    lastReadModule?: ModuleData;
    nextSuggestedModule?: ModuleData;
  };

  getQuizByModuleId: (moduleId: string) => QuizData | undefined;
  getAssignmentByModuleId: (moduleId: string) => any;
  badges: BadgeData[];
  settings: AppSettings;
  updateSettings: (newSettings: AppSettings) => void;
  
  classes: ClassData[];
  saveClass: (cls: ClassData) => void;
  deleteClass: (id: string) => void;

  students: StudentProfile[];
  saveStudent: (student: StudentProfile) => void;
  deleteStudent: (id: string) => void;

  submissions: SubmissionData[];
  deleteSubmission: (id: string) => void;
  clearAllSubmissions: () => void;
  quizResults: QuizResult[];
  lockedQuizzes: Record<string, boolean>;

  questionBank: QuestionItem[];
  saveQuestion: (q: QuestionItem) => void;
  deleteQuestion: (id: string) => void;

  exams: ExamData[];
  saveExam: (exam: ExamData) => void;
  deleteExam: (id: string) => void;

  attendance: AttendanceRecord[];
  saveAttendance: (rec: AttendanceRecord) => void;
  saveAttendanceBatch: (recs: AttendanceRecord[]) => void;

  announcements: AnnouncementData[];
  saveAnnouncement: (ann: AnnouncementData) => void;
  deleteAnnouncement: (id: string) => void;

  activityLogs: ActivityLog[];
  logActivity: (action: string, details: string) => void;

  presensiOtomatis: PresensiOtomatis[];
  loginHistory: LoginHistory[];
  aktivitasSiswa: AktivitasSiswa[];
  recordStudentActivity: (jenis: string, deskripsi: string, idRef?: string) => void;

  // Gradebook Engine (Sistem Penilaian Lengkap)
  gradeItems: GradeItem[];
  saveGradeItem: (item: GradeItem) => void;
  deleteGradeItem: (id: string) => void;
  studentGrades: StudentGradeRecord[];
  updateSingleScore: (studentId: string, gradeItemId: string, score: number | null) => void;
  saveStudentGrade: (record: StudentGradeRecord) => void;
  saveStudentGradeBatch: (records: StudentGradeRecord[]) => void;
  gradeWeights: GradeWeights;
  saveGradeWeights: (weights: GradeWeights) => void;
  calculateStudentFinalGrade: (studentId: string) => StudentCalculatedGrade;

  // Student Actions
  completeModule: (moduleId: string) => void;
  toggleBookmark: (moduleId: string) => void;
  saveModuleNote: (moduleId: string, noteText: string) => void;
  submitQuizResult: (moduleId: string, score: number, totalQuestions: number, correctCount: number) => boolean;
  submitAssignment: (data: Omit<SubmissionData, 'id' | 'submittedAt' | 'status'>) => void;
  gradeSubmission: (submissionId: string, score: number, feedback: string) => void;
  toggleLockQuiz: (moduleId: string, isLocked: boolean) => void;

  // Helpers
  getLeaderboard: (classFilter?: string) => LeaderboardEntry[];
  addXP: (amount: number, reason?: string) => void;
  checkBadgeUnlocks: (profile: StudentProfile) => string[];
  generateCertificate: () => CertificateData | null;
  getLevelTitle: (level: number) => string;
  triggerConfetti: () => void;
  refreshState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userSession, updateStudentState } = useAuth();

  const [settings, setSettings] = useState<AppSettings>(StorageService.getSettings());
  const [classes, setClasses] = useState<ClassData[]>(StorageService.getClasses());
  const [students, setStudents] = useState<StudentProfile[]>(StorageService.getStudents());
  const [submissions, setSubmissions] = useState<SubmissionData[]>(StorageService.getSubmissions());
  const [quizResults, setQuizResults] = useState<QuizResult[]>(StorageService.getQuizResults());
  const [lockedQuizzes, setLockedQuizzes] = useState<Record<string, boolean>>(StorageService.getLockedQuizzes());
  const [questionBank, setQuestionBank] = useState<QuestionItem[]>(StorageService.getQuestionBank());
  const [exams, setExams] = useState<ExamData[]>(StorageService.getExams());
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(StorageService.getAttendance());
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>(StorageService.getAnnouncements());
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(StorageService.getActivityLogs());
  const [modules, setModules] = useState<ModuleData[]>(StorageService.getModules());
  const [materialProgress, setMaterialProgress] = useState<MaterialProgress[]>(StorageService.getMaterialProgress());
  const [presensiOtomatis, setPresensiOtomatis] = useState<PresensiOtomatis[]>(StorageService.getPresensiOtomatis());
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>(StorageService.getLoginHistory());
  const [aktivitasSiswa, setAktivitasSiswa] = useState<AktivitasSiswa[]>(StorageService.getAktivitasSiswa());
  const [gradeItems, setGradeItems] = useState<GradeItem[]>(StorageService.getGradeItems());
  const [studentGrades, setStudentGrades] = useState<StudentGradeRecord[]>(StorageService.getStudentGrades());
  const [gradeWeights, setGradeWeights] = useState<GradeWeights>(StorageService.getGradeWeights());

  const refreshState = () => {
    StorageService.init();
    setSettings(StorageService.getSettings());
    setClasses(StorageService.getClasses());
    setStudents(StorageService.getStudents());
    setSubmissions(StorageService.getSubmissions());
    setQuizResults(StorageService.getQuizResults());
    setLockedQuizzes(StorageService.getLockedQuizzes());
    setQuestionBank(StorageService.getQuestionBank());
    setExams(StorageService.getExams());
    setAttendance(StorageService.getAttendance());
    setAnnouncements(StorageService.getAnnouncements());
    setActivityLogs(StorageService.getActivityLogs());
    setModules(StorageService.getModules());
    setMaterialProgress(StorageService.getMaterialProgress());
    setPresensiOtomatis(StorageService.getPresensiOtomatis());
    setLoginHistory(StorageService.getLoginHistory());
    setAktivitasSiswa(StorageService.getAktivitasSiswa());
    setGradeItems(StorageService.getGradeItems());
    setStudentGrades(StorageService.getStudentGrades());
    setGradeWeights(StorageService.getGradeWeights());
  };

  // Gradebook Operations
  const saveGradeItem = (item: GradeItem) => {
    StorageService.saveGradeItem(item);
    setGradeItems(StorageService.getGradeItems());
    logActivity('SAVE_GRADE_ITEM', `Memperbarui kolom penilaian: ${item.name} (${item.code})`);
  };

  const deleteGradeItem = (id: string) => {
    StorageService.deleteGradeItem(id);
    setGradeItems(StorageService.getGradeItems());
    setStudentGrades(StorageService.getStudentGrades());
    logActivity('DELETE_GRADE_ITEM', `Menghapus kolom penilaian ID: ${id}`);
  };

  const updateSingleScore = (studentId: string, gradeItemId: string, score: number | null) => {
    StorageService.updateSingleScore(studentId, gradeItemId, score);
    setStudentGrades(StorageService.getStudentGrades());
  };

  const saveStudentGrade = (record: StudentGradeRecord) => {
    StorageService.saveStudentGrade(record);
    setStudentGrades(StorageService.getStudentGrades());
  };

  const saveStudentGradeBatch = (records: StudentGradeRecord[]) => {
    StorageService.saveStudentGradeBatch(records);
    setStudentGrades(StorageService.getStudentGrades());
    logActivity('SAVE_GRADE_BATCH', `Menyimpan rekap nilai untuk ${records.length} siswa`);
  };

  const saveGradeWeights = (weights: GradeWeights) => {
    StorageService.saveGradeWeights(weights);
    setGradeWeights(StorageService.getGradeWeights());
    logActivity('UPDATE_GRADE_WEIGHTS', `Memperbarui konfigurasi bobot penilaian & KKM (${weights.kkm})`);
  };

  // Calculation Engine
  const calculateStudentFinalGrade = (studentId: string): StudentCalculatedGrade => {
    const student = students.find((s) => s.id === studentId);
    const gradeRecord = studentGrades.find((r) => r.studentId === studentId);
    const scores = gradeRecord?.scores || {};
    const weights = gradeWeights || initialGradeWeights;

    const categories: GradeCategory[] = ['HARIAN', 'TUGAS', 'KUIS', 'ULANGAN', 'PRAKTIK', 'PROYEK', 'UJIAN'];
    const categoryAverages: Record<GradeCategory, number | null> = {
      HARIAN: null,
      TUGAS: null,
      KUIS: null,
      ULANGAN: null,
      PRAKTIK: null,
      PROYEK: null,
      UJIAN: null,
    };

    const categoryWeightMap: Record<GradeCategory, number> = {
      HARIAN: weights.harian || 0,
      TUGAS: weights.tugas || 0,
      KUIS: weights.kuis || 0,
      ULANGAN: weights.ulangan || 0,
      PRAKTIK: weights.praktik || 0,
      PROYEK: weights.proyek || 0,
      UJIAN: weights.ujian || 0,
    };

    categories.forEach((cat) => {
      // Find all grade items in this category relevant to student
      const itemsInCat = gradeItems.filter(
        (gi) => gi.category === cat && (!student || gi.targetClass === 'ALL' || gi.targetClass === student.classGroup)
      );

      if (itemsInCat.length === 0) {
        categoryAverages[cat] = null;
        return;
      }

      const validScores: number[] = [];
      itemsInCat.forEach((item) => {
        const val = scores[item.id];
        if (val !== undefined && val !== null && typeof val === 'number') {
          validScores.push(val);
        }
      });

      if (validScores.length > 0) {
        const avg = validScores.reduce((acc, curr) => acc + curr, 0) / validScores.length;
        categoryAverages[cat] = Math.round(avg * 10) / 10;
      } else {
        categoryAverages[cat] = null;
      }
    });

    // Calculate weighted final grade
    let totalWeightedScore = 0;
    let totalActiveWeight = 0;

    categories.forEach((cat) => {
      const avg = categoryAverages[cat];
      const weight = categoryWeightMap[cat];
      if (avg !== null && weight > 0) {
        totalWeightedScore += avg * weight;
        totalActiveWeight += weight;
      }
    });

    let finalGrade = 0;
    if (totalActiveWeight > 0) {
      finalGrade = Math.round((totalWeightedScore / totalActiveWeight) * 10) / 10;
    } else {
      // If no weights configured or all scores empty, fallback to overall arithmetic average of existing scores
      const allValidScores = Object.values(scores).filter((v): v is number => typeof v === 'number');
      if (allValidScores.length > 0) {
        finalGrade = Math.round((allValidScores.reduce((a, b) => a + b, 0) / allValidScores.length) * 10) / 10;
      } else {
        finalGrade = 0;
      }
    }

    const kkm = weights.kkm || 75;
    let predicate: 'A' | 'B' | 'C' | 'D' = 'D';
    if (finalGrade >= 90) predicate = 'A';
    else if (finalGrade >= 80) predicate = 'B';
    else if (finalGrade >= kkm) predicate = 'C';
    else predicate = 'D';

    // Calculate assessment completion counts
    const relevantItems = gradeItems.filter(
      (gi) => !student || gi.targetClass === 'ALL' || gi.targetClass === student.classGroup
    );
    const totalAssessments = relevantItems.length;
    const gradedAssessments = relevantItems.filter(
      (gi) => scores[gi.id] !== undefined && scores[gi.id] !== null && typeof scores[gi.id] === 'number'
    ).length;
    const completionRate = totalAssessments > 0 ? Math.round((gradedAssessments / totalAssessments) * 100) : 0;

    return {
      studentId,
      categoryAverages,
      finalGrade,
      predicate,
      isPassed: finalGrade >= kkm,
      notes: gradeRecord?.teacherNotes,
      completionRate,
      totalAssessments,
      gradedAssessments,
    };
  };

  const recordStudentActivity = (jenis: string, deskripsi: string, idRef?: string) => {
    if (userSession && (userSession.role === 'SISWA' || userSession.role === 'student') && userSession.profile) {
      const st = userSession.profile as StudentProfile;
      StorageService.addAktivitasSiswa(st.id, st.name, st.classGroup || 'X DKV 1', jenis, deskripsi, idRef);
      setAktivitasSiswa(StorageService.getAktivitasSiswa());
    }
  };

  useEffect(() => {
    refreshState();
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.log('Confetti effect');
    }
  };

  const updateSettings = (newSettings: AppSettings) => {
    StorageService.saveSettings(newSettings);
    setSettings(newSettings);
    logActivity('UPDATE_SETTINGS', `Memperbarui pengaturan nama mata pelajaran "${newSettings.subjectName}"`);
  };

  const saveClass = (cls: ClassData) => {
    StorageService.saveClass(cls);
    setClasses(StorageService.getClasses());
  };

  const deleteClass = (id: string) => {
    StorageService.deleteClass(id);
    setClasses(StorageService.getClasses());
  };

  const saveStudent = (student: StudentProfile) => {
    StorageService.saveStudent(student);
    setStudents(StorageService.getStudents());
  };

  const deleteStudent = (id: string) => {
    StorageService.deleteStudent(id);
    setStudents(StorageService.getStudents());
  };

  const saveQuestion = (q: QuestionItem) => {
    StorageService.saveQuestion(q);
    setQuestionBank(StorageService.getQuestionBank());
  };

  const deleteQuestion = (id: string) => {
    StorageService.deleteQuestion(id);
    setQuestionBank(StorageService.getQuestionBank());
  };

  const saveExam = (exam: ExamData) => {
    StorageService.saveExam(exam);
    setExams(StorageService.getExams());
  };

  const deleteExam = (id: string) => {
    StorageService.deleteExam(id);
    setExams(StorageService.getExams());
  };

  const saveAttendance = (rec: AttendanceRecord) => {
    StorageService.saveAttendanceRecord(rec);
    setAttendance(StorageService.getAttendance());
  };

  const saveAttendanceBatch = (recs: AttendanceRecord[]) => {
    StorageService.saveAttendanceBatch(recs);
    setAttendance(StorageService.getAttendance());
  };

  const saveAnnouncement = (ann: AnnouncementData) => {
    StorageService.saveAnnouncement(ann);
    setAnnouncements(StorageService.getAnnouncements());
  };

  const deleteAnnouncement = (id: string) => {
    StorageService.deleteAnnouncement(id);
    setAnnouncements(StorageService.getAnnouncements());
  };

  const logActivity = (action: string, details: string) => {
    const userRole = userSession?.role || 'student';
    const userName = userSession?.profile.name || 'Sistem';
    StorageService.addActivityLog({ userRole, userName, action, details });
    setActivityLogs(StorageService.getActivityLogs());
  };

  const getModuleById = (id: string) => {
    return modules.find((m) => m.id === id);
  };

  const saveModule = (mod: ModuleData) => {
    StorageService.saveModule(mod);
    setModules(StorageService.getModules());
    logActivity('SAVE_MODULE', `Menyimpan modul materi "${mod.title}"`);
  };

  const deleteModule = (id: string) => {
    StorageService.deleteModule(id);
    setModules(StorageService.getModules());
    logActivity('DELETE_MODULE', `Menghapus modul materi "${id}"`);
  };

  const reorderModules = (ordered: ModuleData[]) => {
    StorageService.reorderModules(ordered);
    setModules(StorageService.getModules());
  };

  const updateReadingProgress = (moduleId: string, percent: number, markCompleted: boolean = false) => {
    if (!userSession || (userSession.role !== 'student' && userSession.role !== 'SISWA')) return;
    const student = userSession.profile as StudentProfile;
    const updated = StorageService.updateReadingProgress(student.id, moduleId, percent, markCompleted);
    setMaterialProgress(StorageService.getMaterialProgress());

    if (markCompleted || updated.status === 'selesai') {
      completeModule(moduleId);
    }
  };

  const getStudentProgressForModule = (studentId: string, moduleId: string): MaterialProgress | undefined => {
    return materialProgress.find((p) => p.studentId === studentId && p.moduleId === moduleId);
  };

  const getStudentOverallProgress = (studentId: string) => {
    const studentProgs = materialProgress.filter((p) => p.studentId === studentId);
    const total = modules.length;
    const completed = studentProgs.filter((p) => p.status === 'selesai').length;
    const inProgress = studentProgs.filter((p) => p.status === 'sedang_dibaca').length;
    const unread = Math.max(0, total - completed - inProgress);
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    const sortedProgs = [...studentProgs].sort(
      (a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
    );
    const lastProg = sortedProgs[0];
    const lastReadModule = lastProg ? modules.find((m) => m.id === lastProg.moduleId) : undefined;

    const completedIds = studentProgs.filter((p) => p.status === 'selesai').map((p) => p.moduleId);
    const nextSuggestedModule = modules.find((m) => !completedIds.includes(m.id));

    return {
      total,
      completed,
      inProgress,
      unread,
      percent,
      lastReadModule,
      nextSuggestedModule,
    };
  };

  const getQuizByModuleId = (moduleId: string) => {
    return quizzesData[moduleId];
  };

  const getAssignmentByModuleId = (moduleId: string) => {
    return assignmentsData[moduleId];
  };

  const getLevelTitle = (level: number) => {
    switch (level) {
      case 1: return 'Novice';
      case 2: return 'Explorer';
      case 3: return 'Learner';
      case 4: return 'Developer';
      case 5: return 'Specialist';
      case 6: return 'Professional';
      case 7: return 'Expert';
      case 8: return 'Master';
      default: return 'Grand Master';
    }
  };

  const calculateLevel = (xp: number): number => {
    if (xp < 150) return 1;
    if (xp < 350) return 2;
    if (xp < 600) return 3;
    if (xp < 900) return 4;
    if (xp < 1300) return 5;
    if (xp < 1800) return 6;
    if (xp < 2500) return 7;
    if (xp < 3500) return 8;
    return 9;
  };

  const addXP = (amount: number, reason?: string) => {
    if (!userSession || (userSession.role !== 'student' && userSession.role !== 'SISWA')) return;
    const student = { ...(userSession.profile as StudentProfile) };
    student.xp += amount;
    student.level = calculateLevel(student.xp);

    const newBadges = checkBadgeUnlocks(student);
    student.badges = Array.from(new Set([...student.badges, ...newBadges]));

    updateStudentState(student);
    logActivity('EARN_XP', `${student.name} meraih +${amount} XP (${reason || 'Aktivitas'})`);
  };

  const checkBadgeUnlocks = (student: StudentProfile): string[] => {
    const unlocked: string[] = [...student.badges];

    if (!unlocked.includes('first_login')) unlocked.push('first_login');
    if (student.completedModuleIds.length >= 1 && !unlocked.includes('first_quiz')) unlocked.push('first_quiz');
    if (student.completedModuleIds.length >= 5 && !unlocked.includes('fast_learner')) unlocked.push('fast_learner');
    if (student.completedModuleIds.length >= 16 && !unlocked.includes('informatics_master')) unlocked.push('informatics_master');
    if (student.streakDays >= 5 && !unlocked.includes('consistent_learner')) unlocked.push('consistent_learner');

    const myResults = quizResults.filter((r) => r.studentId === student.id);
    if (myResults.some((r) => r.score === 100) && !unlocked.includes('perfect_score')) {
      unlocked.push('perfect_score');
    }

    return unlocked;
  };

  const completeModule = (moduleId: string) => {
    if (!userSession || (userSession.role !== 'student' && userSession.role !== 'SISWA')) return;
    const student = { ...(userSession.profile as StudentProfile) };
    if (!student.completedModuleIds.includes(moduleId)) {
      student.completedModuleIds.push(moduleId);
      student.xp += settings.xpReading;
      student.level = calculateLevel(student.xp);
      updateStudentState(student);
      triggerConfetti();
      logActivity('COMPLETE_MODULE', `${student.name} menyelesaikan modul ${moduleId}`);
      recordStudentActivity('MEMBACA_MATERI', `Menyelesaikan membaca modul ${moduleId}`, moduleId);
    }
  };

  const toggleBookmark = (moduleId: string) => {
    if (!userSession || (userSession.role !== 'student' && userSession.role !== 'SISWA')) return;
    const student = { ...(userSession.profile as StudentProfile) };
    if (student.bookmarkedModuleIds.includes(moduleId)) {
      student.bookmarkedModuleIds = student.bookmarkedModuleIds.filter((id) => id !== moduleId);
    } else {
      student.bookmarkedModuleIds.push(moduleId);
    }
    updateStudentState(student);
  };

  const saveModuleNote = (moduleId: string, noteText: string) => {
    if (!userSession || (userSession.role !== 'student' && userSession.role !== 'SISWA')) return;
    const student = { ...(userSession.profile as StudentProfile) };
    student.notes = { ...student.notes, [moduleId]: noteText };
    updateStudentState(student);
  };

  const submitQuizResult = (
    moduleId: string,
    score: number,
    totalQuestions: number,
    correctCount: number
  ): boolean => {
    if (!userSession || (userSession.role !== 'student' && userSession.role !== 'SISWA')) return false;
    const student = { ...(userSession.profile as StudentProfile) };
    const passed = score >= settings.passingScoreThreshold;

    const result: QuizResult = {
      id: `res-${Date.now()}`,
      studentId: student.id,
      moduleId,
      score,
      totalQuestions,
      correctCount,
      passed,
      attemptDate: new Date().toLocaleString('id-ID'),
    };

    StorageService.saveQuizResult(result);
    setQuizResults(StorageService.getQuizResults());

    if (passed) {
      if (!student.completedModuleIds.includes(moduleId)) {
        student.completedModuleIds.push(moduleId);
      }
      let earnedXP = settings.xpQuizPass;
      if (score === 100) earnedXP += settings.xpQuizPerfect;
      student.xp += earnedXP;
      student.level = calculateLevel(student.xp);
      updateStudentState(student);
      triggerConfetti();
    }

    logActivity('SUBMIT_QUIZ', `${student.name} menyelesaikan kuis ${moduleId} dengan nilai ${score}`);
    recordStudentActivity('MENGERJAKAN_KUIS', `Mengerjakan kuis ${moduleId} dengan skor ${score}/${totalQuestions * 10} (${passed ? 'Lulus' : 'Belum Lulus'})`, moduleId);

    // Auto-link and sync to Gradebook KUIS item
    try {
      const modNum = parseInt(moduleId.replace(/\D/g, '')) || 1;
      const matchingKuis = gradeItems.find(
        (gi) => gi.category === 'KUIS' && (gi.moduleId === moduleId || gi.number === modNum)
      );
      if (matchingKuis) {
        StorageService.updateSingleScore(student.id, matchingKuis.id, score);
        setStudentGrades(StorageService.getStudentGrades());
      }
    } catch (e) {
      console.warn('Auto-sync quiz to gradebook:', e);
    }

    return passed;
  };

  const submitAssignment = (data: Omit<SubmissionData, 'id' | 'submittedAt' | 'status'>) => {
    const newSub: SubmissionData = {
      ...data,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toLocaleString('id-ID'),
      status: 'pending',
    };
    StorageService.saveSubmission(newSub);
    setSubmissions(StorageService.getSubmissions());

    if (userSession && (userSession.role === 'student' || userSession.role === 'SISWA')) {
      addXP(settings.xpAssignment, 'Kirim Tugas Praktik');
      triggerConfetti();
      recordStudentActivity('MENGIRIM_TUGAS', `Mengirimkan tugas praktik modul ${data.moduleId}`, data.moduleId);
    }
  };

  const gradeSubmission = (submissionId: string, score: number, feedback: string) => {
    const subs = StorageService.getSubmissions();
    const sub = subs.find((s) => s.id === submissionId);
    if (sub) {
      sub.score = score;
      sub.feedback = feedback;
      sub.status = 'graded';
      sub.gradedAt = new Date().toLocaleString('id-ID');
      StorageService.saveSubmission(sub);
      setSubmissions(StorageService.getSubmissions());
      logActivity('GRADE_SUBMISSION', `Menilai tugas ${sub.studentName} dengan nilai ${score}`);

      // Auto-link and sync to Gradebook TUGAS item
      try {
        const modNum = parseInt(sub.moduleId.replace(/\D/g, '')) || 1;
        const matchingTugas = gradeItems.find(
          (gi) => gi.category === 'TUGAS' && (gi.moduleId === sub.moduleId || gi.number === modNum)
        );
        if (matchingTugas) {
          StorageService.updateSingleScore(sub.studentId, matchingTugas.id, score);
          setStudentGrades(StorageService.getStudentGrades());
        }
      } catch (e) {
        console.warn('Auto-sync assignment to gradebook:', e);
      }
    }
  };

  const deleteSubmission = (id: string) => {
    StorageService.deleteSubmission(id);
    setSubmissions(StorageService.getSubmissions());
    logActivity('DELETE_SUBMISSION', `Menghapus data pengumpulan tugas ID: ${id}`);
  };

  const clearAllSubmissions = () => {
    StorageService.clearAllSubmissions();
    setSubmissions([]);
    logActivity('CLEAR_SUBMISSIONS', 'Mengosongkan semua antrian pengumpulan tugas praktik siswa');
  };

  const toggleLockQuiz = (moduleId: string, isLocked: boolean) => {
    StorageService.toggleLockQuiz(moduleId, isLocked);
    setLockedQuizzes(StorageService.getLockedQuizzes());
  };

  const getLeaderboard = (classFilter?: string): LeaderboardEntry[] => {
    const allStudents = StorageService.getStudents();
    const filtered = classFilter && classFilter !== 'ALL'
      ? allStudents.filter((s) => s.classGroup === classFilter)
      : allStudents;

    const sorted = [...filtered].sort((a, b) => b.xp - a.xp);

    return sorted.map((st, index) => ({
      studentId: st.id,
      nis: st.nis,
      name: st.name,
      classGroup: st.classGroup,
      xp: st.xp,
      level: st.level,
      completedModulesCount: st.completedModuleIds.length,
      badgeCount: st.badges.length,
      streakDays: st.streakDays,
      rank: index + 1,
    }));
  };

  const generateCertificate = (): CertificateData | null => {
    if (!userSession || (userSession.role !== 'student' && userSession.role !== 'SISWA')) return null;
    const student = userSession.profile as StudentProfile;

    if (student.completedModuleIds.length < 16) {
      return null;
    }

    const myQuizResults = quizResults.filter((r) => r.studentId === student.id && r.passed);
    const avgScore = myQuizResults.length > 0
      ? Math.round(myQuizResults.reduce((acc, curr) => acc + curr.score, 0) / myQuizResults.length)
      : 88;

    return {
      certificateNumber: `CERT/INF-X/${student.classGroup.replace(/\s+/g, '')}/${student.nis}`,
      studentName: student.name,
      nis: student.nis,
      classGroup: student.classGroup,
      completionDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      finalGrade: avgScore,
      teacherName: settings.teacherName,
      teacherNipWA: `${settings.teacherNip ? `NIP. ${settings.teacherNip} | ` : ''}WA: ${settings.teacherPhoneWA}`,
      schoolName: settings.schoolName,
      verificationCode: `VERIFY-${student.nis}-${Date.now().toString(36).toUpperCase()}`,
    };
  };

  return (
    <AppContext.Provider
      value={{
        modules,
        getModuleById,
        saveModule,
        deleteModule,
        reorderModules,
        materialProgress,
        updateReadingProgress,
        getStudentProgressForModule,
        getStudentOverallProgress,
        getQuizByModuleId,
        getAssignmentByModuleId,
        badges: badgesList,
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
        quizResults,
        lockedQuizzes,
        questionBank,
        saveQuestion,
        deleteQuestion,
        exams,
        saveExam,
        deleteExam,
        attendance,
        saveAttendance,
        saveAttendanceBatch,
        announcements,
        saveAnnouncement,
        deleteAnnouncement,
        activityLogs,
        logActivity,
        presensiOtomatis,
        loginHistory,
        aktivitasSiswa,
        recordStudentActivity,
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
        completeModule,
        toggleBookmark,
        saveModuleNote,
        submitQuizResult,
        submitAssignment,
        gradeSubmission,
        toggleLockQuiz,
        getLeaderboard,
        addXP,
        checkBadgeUnlocks,
        generateCertificate,
        getLevelTitle,
        triggerConfetti,
        refreshState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
