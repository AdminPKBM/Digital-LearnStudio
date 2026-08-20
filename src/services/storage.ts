import {
  StudentProfile,
  TeacherProfile,
  QuizResult,
  SubmissionData,
  AppSettings,
  ClassData,
  QuestionItem,
  ExamData,
  AttendanceRecord,
  AnnouncementData,
  ActivityLog,
  ModuleData,
  MaterialProgress,
  UserAccount,
  PresensiOtomatis,
  LoginHistory,
  AktivitasSiswa,
  GradeItem,
  StudentGradeRecord,
  GradeWeights
} from '../types';
import {
  initialStudents,
  defaultTeacher,
  defaultSettings,
  initialClasses,
  initialQuestionBank,
  initialExams,
  initialAttendance,
  initialAnnouncements,
  initialActivityLogs,
  modulesData,
  initialGradeItems,
  initialGradeWeights,
  generateInitialStudentGrades
} from '../data/seedData';
import { GASService } from './gasService';

const KEYS = {
  USERS: 'learnstudio_users_v3',
  STUDENTS: 'learnstudio_students_v3',
  TEACHERS: 'learnstudio_teachers_v1',
  SETTINGS: 'learnstudio_settings_v1',
  CLASSES: 'learnstudio_classes_v2',
  SUBMISSIONS: 'learnstudio_submissions_v2',
  QUIZ_RESULTS: 'learnstudio_quiz_results_v1',
  QUESTION_BANK: 'learnstudio_question_bank_v1',
  EXAMS: 'learnstudio_exams_v1',
  ATTENDANCE: 'learnstudio_attendance_v1',
  ANNOUNCEMENTS: 'learnstudio_announcements_v1',
  ACTIVITY_LOGS: 'learnstudio_activity_logs_v1',
  LOCKED_QUIZZES: 'learnstudio_locked_quizzes_v1',
  MODULES: 'learnstudio_modules_v3',
  MATERIAL_PROGRESS: 'learnstudio_material_progress_v2',
  PRESENSI_OTOMATIS: 'learnstudio_presensi_otomatis_v2',
  LOGIN_HISTORY: 'learnstudio_login_history_v2',
  AKTIVITAS_SISWA: 'learnstudio_aktivitas_siswa_v2',
  GRADE_ITEMS: 'learnstudio_grade_items_v3',
  STUDENT_GRADES: 'learnstudio_student_grades_v4',
  GRADE_WEIGHTS: 'learnstudio_grade_weights_v3',
};

// Seed generators for automatic presence, login history, and student activities
function generateInitialPresensiOtomatis(): PresensiOtomatis[] {
  const students = initialStudents;
  const list: PresensiOtomatis[] = [];
  const today = new Date().toISOString().split('T')[0];
  const dates = [
    today,
    '2026-08-07', '2026-08-06', '2026-08-05',
    '2026-08-04', '2026-08-03', '2026-08-02', '2026-08-01'
  ];

  students.forEach((st, idx) => {
    let activeDaysCount = 8;
    if (idx >= 30 && idx < 70) activeDaysCount = 5;
    if (idx >= 70 && idx < 90) activeDaysCount = 2;
    if (idx >= 90) activeDaysCount = 0; // Inactive student

    const activeDates = dates.slice(0, activeDaysCount);

    activeDates.forEach((dt, dateIdx) => {
      const logins = ((idx + dateIdx) % 3) + 1;
      const firstHour = 7 + (idx % 2);
      const firstMin = 10 + (idx % 45);
      const lastHour = firstHour + logins;
      const lastMin = (firstMin + 20) % 60;

      const pad = (n: number) => n.toString().padStart(2, '0');
      const loginPertama = `${pad(firstHour)}:${pad(firstMin)}:00`;
      const loginTerakhir = `${pad(lastHour)}:${pad(lastMin)}:00`;

      list.push({
        id_presensi: `pres-${st.id}-${dt}`,
        id_siswa: st.id,
        nama_siswa: st.name,
        classGroup: st.classGroup,
        tanggal: dt,
        login_pertama: loginPertama,
        login_terakhir: loginTerakhir,
        jumlah_login: logins,
        status: 'Hadir',
        created_at: `${dt}T${loginPertama}Z`,
        updated_at: `${dt}T${loginTerakhir}Z`,
      });
    });
  });

  return list;
}

function generateInitialLoginHistory(): LoginHistory[] {
  const students = initialStudents;
  const list: LoginHistory[] = [];
  const today = new Date().toISOString().split('T')[0];
  const dates = [today, '2026-08-07', '2026-08-06', '2026-08-05'];

  students.slice(0, 40).forEach((st, idx) => {
    dates.slice(0, 3).forEach((dt) => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      const h1 = 7 + (idx % 3);
      const m1 = 15 + (idx % 30);
      const h2 = h1 + 1;
      const m2 = (m1 + 35) % 60;

      list.push({
        id_login: `log-${st.id}-${dt}-1`,
        id_siswa: st.id,
        username: st.nis,
        nama_siswa: st.name,
        classGroup: st.classGroup,
        tanggal: dt,
        waktu_login: `${pad(h1)}:${pad(m1)}:00`,
        waktu_logout: `${pad(h2)}:${pad(m2)}:00`,
        durasi_sesi: '1 jam 20 menit',
        session_id: `sess-${st.id}-${dt}`,
        status: 'Selesai',
        created_at: `${dt}T${pad(h1)}:${pad(m1)}:00Z`,
      });
    });
  });

  return list;
}

function generateInitialAktivitasSiswa(): AktivitasSiswa[] {
  const students = initialStudents;
  const list: AktivitasSiswa[] = [];
  const today = new Date().toISOString().split('T')[0];

  students.slice(0, 30).forEach((st, idx) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const h = 8;
    const m = Math.min(50, 10 + (idx % 40));

    list.push(
      {
        id_aktivitas: `act-${st.id}-1`,
        id_siswa: st.id,
        nama_siswa: st.name,
        classGroup: st.classGroup,
        tanggal: today,
        waktu: `${pad(h)}:${pad(m)}:00`,
        jenis_aktivitas: 'Login',
        deskripsi: 'Berhasil login ke LMS',
        created_at: `${today}T${pad(h)}:${pad(m)}:00Z`,
      },
      {
        id_aktivitas: `act-${st.id}-2`,
        id_siswa: st.id,
        nama_siswa: st.name,
        classGroup: st.classGroup,
        tanggal: today,
        waktu: `${pad(h)}:${pad(m + 2)}:00`,
        jenis_aktivitas: 'Membuka materi',
        id_referensi: 'BK-1',
        deskripsi: 'Membuka Modul BK-1 Berpikir Komputasional',
        created_at: `${today}T${pad(h)}:${pad(m + 2)}:00Z`,
      },
      {
        id_aktivitas: `act-${st.id}-3`,
        id_siswa: st.id,
        nama_siswa: st.name,
        classGroup: st.classGroup,
        tanggal: today,
        waktu: `${pad(h)}:${pad(m + 15)}:00`,
        jenis_aktivitas: 'Membaca bahan bacaan',
        id_referensi: 'BK-1',
        deskripsi: 'Membaca Konsep Dekomposisi',
        created_at: `${today}T${pad(h)}:${pad(m + 15)}:00Z`,
      },
      {
        id_aktivitas: `act-${st.id}-4`,
        id_siswa: st.id,
        nama_siswa: st.name,
        classGroup: st.classGroup,
        tanggal: today,
        waktu: `${pad(h)}:${pad(m + 30)}:00`,
        jenis_aktivitas: 'Mengerjakan kuis',
        id_referensi: 'BK-1',
        deskripsi: 'Mulai mengerjakan Kuis BK-1',
        created_at: `${today}T${pad(h)}:${pad(m + 30)}:00Z`,
      }
    );
  });

  return list;
}

// Helper to safely parse JSON
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
}

export const StorageService = {
  // Initialize storage with defaults if empty
  init(): void {
    if (!localStorage.getItem(KEYS.USERS)) {
      const defaultUsers: UserAccount[] = [
        {
          id_user: 'usr-teacher-1',
          username: 'guru01',
          password_hash: 'bismillah123',
          nama: defaultTeacher.name,
          role: 'GURU',
          status: 'AKTIF',
          email: defaultTeacher.email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        ...initialStudents.map((s) => ({
          id_user: `usr-${s.id}`,
          username: s.nis,
          password_hash: 'bismillah',
          nama: s.name,
          role: 'SISWA' as const,
          status: 'AKTIF' as const,
          email: s.email || `${s.nis}@smknbojonggambir.sch.id`,
          nis: s.nis,
          classGroup: s.classGroup,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }))
      ];
      setItem(KEYS.USERS, defaultUsers);
    }
    if (!localStorage.getItem(KEYS.STUDENTS)) {
      setItem(KEYS.STUDENTS, initialStudents);
    }
    if (!localStorage.getItem(KEYS.TEACHERS)) {
      setItem(KEYS.TEACHERS, [defaultTeacher]);
    }
    if (!localStorage.getItem(KEYS.SETTINGS)) {
      setItem(KEYS.SETTINGS, defaultSettings);
    }
    if (!localStorage.getItem(KEYS.CLASSES)) {
      setItem(KEYS.CLASSES, initialClasses);
    }
    if (!localStorage.getItem(KEYS.QUESTION_BANK)) {
      setItem(KEYS.QUESTION_BANK, initialQuestionBank);
    }
    if (!localStorage.getItem(KEYS.EXAMS)) {
      setItem(KEYS.EXAMS, initialExams);
    }
    if (!localStorage.getItem(KEYS.ATTENDANCE)) {
      setItem(KEYS.ATTENDANCE, initialAttendance);
    }
    if (!localStorage.getItem(KEYS.ANNOUNCEMENTS)) {
      setItem(KEYS.ANNOUNCEMENTS, initialAnnouncements);
    }
    if (!localStorage.getItem(KEYS.ACTIVITY_LOGS)) {
      setItem(KEYS.ACTIVITY_LOGS, initialActivityLogs);
    }
    if (!localStorage.getItem(KEYS.MODULES)) {
      setItem(KEYS.MODULES, modulesData);
    }
    if (!localStorage.getItem(KEYS.MATERIAL_PROGRESS)) {
      setItem(KEYS.MATERIAL_PROGRESS, []);
    }
    if (!localStorage.getItem(KEYS.SUBMISSIONS)) {
      setItem(KEYS.SUBMISSIONS, []);
    }
    if (!localStorage.getItem(KEYS.QUIZ_RESULTS)) {
      const sampleResults: QuizResult[] = [
        {
          id: 'res-1',
          studentId: 'student-101',
          moduleId: 'BK-1',
          score: 100,
          totalQuestions: 5,
          correctCount: 5,
          passed: true,
          attemptDate: '2026-08-05 10:00',
        },
        {
          id: 'res-2',
          studentId: 'student-101',
          moduleId: 'BK-2',
          score: 80,
          totalQuestions: 5,
          correctCount: 4,
          passed: true,
          attemptDate: '2026-08-05 11:20',
        },
      ];
      setItem(KEYS.QUIZ_RESULTS, sampleResults);
    }
    if (!localStorage.getItem(KEYS.PRESENSI_OTOMATIS)) {
      setItem(KEYS.PRESENSI_OTOMATIS, generateInitialPresensiOtomatis());
    }
    if (!localStorage.getItem(KEYS.LOGIN_HISTORY)) {
      setItem(KEYS.LOGIN_HISTORY, generateInitialLoginHistory());
    }
    if (!localStorage.getItem(KEYS.AKTIVITAS_SISWA)) {
      setItem(KEYS.AKTIVITAS_SISWA, generateInitialAktivitasSiswa());
    }
    if (!localStorage.getItem(KEYS.GRADE_ITEMS)) {
      setItem(KEYS.GRADE_ITEMS, initialGradeItems);
    }
    if (!localStorage.getItem(KEYS.STUDENT_GRADES)) {
      setItem(KEYS.STUDENT_GRADES, generateInitialStudentGrades());
    }
    if (!localStorage.getItem(KEYS.GRADE_WEIGHTS)) {
      setItem(KEYS.GRADE_WEIGHTS, initialGradeWeights);
    }
  },

  // Helper to sync to GAS if configured
  async syncGAS(sheetName: string, record: any) {
    const settings = this.getSettings();
    if (settings.gasApiUrl) {
      await GASService.saveRecord(settings.gasApiUrl, sheetName, record);
    }
  },

  // Settings
  getSettings(): AppSettings {
    this.init();
    return getItem<AppSettings>(KEYS.SETTINGS, defaultSettings);
  },

  saveSettings(settings: AppSettings): void {
    setItem(KEYS.SETTINGS, settings);
    this.syncGAS('Pengaturan', settings);
  },

  // Classes CRUD
  getClasses(): ClassData[] {
    this.init();
    return getItem<ClassData[]>(KEYS.CLASSES, initialClasses);
  },

  saveClass(cls: ClassData): void {
    const classes = this.getClasses();
    const idx = classes.findIndex((c) => c.id === cls.id);
    if (idx >= 0) classes[idx] = cls;
    else classes.push(cls);
    setItem(KEYS.CLASSES, classes);
    this.syncGAS('Kelas', cls);
  },

  deleteClass(classId: string): void {
    const classes = this.getClasses().filter((c) => c.id !== classId);
    setItem(KEYS.CLASSES, classes);
  },

  // Users CRUD (Database Users)
  getUsers(): UserAccount[] {
    this.init();
    return getItem<UserAccount[]>(KEYS.USERS, []);
  },

  getUserByUsername(username: string): UserAccount | undefined {
    const clean = username.trim().toLowerCase();
    return this.getUsers().find(
      (u) =>
        u.username.toLowerCase() === clean ||
        (u.nis && u.nis.toLowerCase() === clean) ||
        (u.email && u.email.toLowerCase() === clean)
    );
  },

  saveUser(user: UserAccount): void {
    const users = this.getUsers();
    const idx = users.findIndex((u) => u.id_user === user.id_user || u.username.toLowerCase() === user.username.toLowerCase());
    const now = new Date().toISOString();
    if (idx >= 0) {
      users[idx] = { ...user, updated_at: now };
    } else {
      users.push({ ...user, created_at: user.created_at || now, updated_at: now });
    }
    setItem(KEYS.USERS, users);
    this.syncGAS('Users', user);
  },

  deleteUser(id_user: string): void {
    const users = this.getUsers().filter((u) => u.id_user !== id_user);
    setItem(KEYS.USERS, users);
  },

  updateUserPassword(id_user: string, newPassword: string): void {
    const users = this.getUsers();
    const idx = users.findIndex((u) => u.id_user === id_user);
    if (idx >= 0) {
      users[idx].password_hash = newPassword;
      users[idx].updated_at = new Date().toISOString();
      setItem(KEYS.USERS, users);
      this.syncGAS('Users', users[idx]);
    }
  },

  toggleUserStatus(id_user: string): void {
    const users = this.getUsers();
    const idx = users.findIndex((u) => u.id_user === id_user);
    if (idx >= 0) {
      users[idx].status = users[idx].status === 'AKTIF' ? 'NONAKTIF' : 'AKTIF';
      users[idx].updated_at = new Date().toISOString();
      setItem(KEYS.USERS, users);
      this.syncGAS('Users', users[idx]);
    }
  },

  // Students CRUD
  getStudents(): StudentProfile[] {
    this.init();
    return getItem<StudentProfile[]>(KEYS.STUDENTS, initialStudents);
  },

  getTeachers(): TeacherProfile[] {
    this.init();
    return getItem<TeacherProfile[]>(KEYS.TEACHERS, [defaultTeacher]);
  },

  saveStudent(student: StudentProfile): void {
    const students = this.getStudents();
    const index = students.findIndex((s) => s.id === student.id || s.nis === student.nis);
    if (index >= 0) {
      students[index] = student;
    } else {
      students.push(student);
    }
    setItem(KEYS.STUDENTS, students);
    this.syncGAS('Siswa', student);
  },

  deleteStudent(studentId: string): void {
    const students = this.getStudents().filter((s) => s.id !== studentId);
    setItem(KEYS.STUDENTS, students);
  },

  getStudentByNis(nis: string): StudentProfile | undefined {
    return this.getStudents().find((s) => s.nis.trim() === nis.trim());
  },

  // Submissions & Grading
  getSubmissions(): SubmissionData[] {
    this.init();
    return getItem<SubmissionData[]>(KEYS.SUBMISSIONS, []);
  },

  saveSubmission(submission: SubmissionData): void {
    const subs = this.getSubmissions();
    const index = subs.findIndex((s) => s.id === submission.id);
    if (index >= 0) {
      subs[index] = submission;
    } else {
      subs.unshift(submission);
    }
    setItem(KEYS.SUBMISSIONS, subs);
    this.syncGAS('Pengumpulan_Tugas', submission);
  },

  deleteSubmission(submissionId: string): void {
    const subs = this.getSubmissions().filter((s) => s.id !== submissionId);
    setItem(KEYS.SUBMISSIONS, subs);
  },

  clearAllSubmissions(): void {
    setItem(KEYS.SUBMISSIONS, []);
  },

  // Question Bank
  getQuestionBank(): QuestionItem[] {
    this.init();
    return getItem<QuestionItem[]>(KEYS.QUESTION_BANK, initialQuestionBank);
  },

  saveQuestion(question: QuestionItem): void {
    const bank = this.getQuestionBank();
    const idx = bank.findIndex((q) => q.id === question.id);
    if (idx >= 0) bank[idx] = question;
    else bank.unshift(question);
    setItem(KEYS.QUESTION_BANK, bank);
    this.syncGAS('Bank_Soal', question);
  },

  deleteQuestion(questionId: string): void {
    const bank = this.getQuestionBank().filter((q) => q.id !== questionId);
    setItem(KEYS.QUESTION_BANK, bank);
  },

  // Exams
  getExams(): ExamData[] {
    this.init();
    return getItem<ExamData[]>(KEYS.EXAMS, initialExams);
  },

  saveExam(exam: ExamData): void {
    const exams = this.getExams();
    const idx = exams.findIndex((e) => e.id === exam.id);
    if (idx >= 0) exams[idx] = exam;
    else exams.unshift(exam);
    setItem(KEYS.EXAMS, exams);
    this.syncGAS('Ujian', exam);
  },

  deleteExam(examId: string): void {
    const exams = this.getExams().filter((e) => e.id !== examId);
    setItem(KEYS.EXAMS, exams);
  },

  // Attendance Records
  getAttendance(): AttendanceRecord[] {
    this.init();
    return getItem<AttendanceRecord[]>(KEYS.ATTENDANCE, initialAttendance);
  },

  saveAttendanceRecord(record: AttendanceRecord): void {
    const att = this.getAttendance();
    const idx = att.findIndex((a) => a.id === record.id || (a.studentId === record.studentId && a.date === record.date));
    if (idx >= 0) att[idx] = record;
    else att.unshift(record);
    setItem(KEYS.ATTENDANCE, att);
    this.syncGAS('Absensi', record);
  },

  saveAttendanceBatch(records: AttendanceRecord[]): void {
    const current = this.getAttendance();
    records.forEach((rec) => {
      const idx = current.findIndex((a) => a.studentId === rec.studentId && a.date === rec.date);
      if (idx >= 0) current[idx] = rec;
      else current.unshift(rec);
      this.syncGAS('Absensi', rec);
    });
    setItem(KEYS.ATTENDANCE, current);
  },

  // Announcements
  getAnnouncements(): AnnouncementData[] {
    this.init();
    return getItem<AnnouncementData[]>(KEYS.ANNOUNCEMENTS, initialAnnouncements);
  },

  saveAnnouncement(ann: AnnouncementData): void {
    const anns = this.getAnnouncements();
    const idx = anns.findIndex((a) => a.id === ann.id);
    if (idx >= 0) anns[idx] = ann;
    else anns.unshift(ann);
    setItem(KEYS.ANNOUNCEMENTS, anns);
    this.syncGAS('Pengumuman', ann);
  },

  deleteAnnouncement(id: string): void {
    const anns = this.getAnnouncements().filter((a) => a.id !== id);
    setItem(KEYS.ANNOUNCEMENTS, anns);
  },

  // Activity Logs
  getActivityLogs(): ActivityLog[] {
    this.init();
    return getItem<ActivityLog[]>(KEYS.ACTIVITY_LOGS, initialActivityLogs);
  },

  addActivityLog(log: Omit<ActivityLog, 'id' | 'timestamp'>): void {
    const logs = this.getActivityLogs();
    const newLog: ActivityLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
    };
    logs.unshift(newLog);
    setItem(KEYS.ACTIVITY_LOGS, logs.slice(0, 100)); // Keep last 100
    this.syncGAS('Log_Aktivitas', newLog);
  },

  // Quiz Results
  getQuizResults(): QuizResult[] {
    this.init();
    return getItem<QuizResult[]>(KEYS.QUIZ_RESULTS, []);
  },

  saveQuizResult(result: QuizResult): void {
    const results = this.getQuizResults();
    results.unshift(result);
    setItem(KEYS.QUIZ_RESULTS, results);
    this.syncGAS('Nilai', result);
  },

  // Reading Materials (Materi Pembelajaran)
  getModules(): ModuleData[] {
    this.init();
    const stored = getItem<ModuleData[]>(KEYS.MODULES, modulesData);
    // Sort by urutan if available, or module number
    return stored.sort((a, b) => (a.urutan || 0) - (b.urutan || 0));
  },

  saveModule(module: ModuleData): void {
    const modules = this.getModules();
    const index = modules.findIndex((m) => m.id === module.id);
    if (index >= 0) {
      modules[index] = { ...module, updatedAt: new Date().toISOString() };
    } else {
      modules.push({
        ...module,
        createdAt: module.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        urutan: module.urutan || modules.length + 1,
      });
    }
    setItem(KEYS.MODULES, modules);
    this.syncGAS('Materi', module);
  },

  deleteModule(id: string): void {
    let modules = this.getModules();
    modules = modules.filter((m) => m.id !== id);
    setItem(KEYS.MODULES, modules);
    this.syncGAS('Materi_Delete', { id });
  },

  reorderModules(orderedModules: ModuleData[]): void {
    const updated = orderedModules.map((m, idx) => ({ ...m, urutan: idx + 1 }));
    setItem(KEYS.MODULES, updated);
  },

  // Student Reading Material Progress (Progress_Materi)
  getMaterialProgress(studentId?: string): MaterialProgress[] {
    this.init();
    const allProgress = getItem<MaterialProgress[]>(KEYS.MATERIAL_PROGRESS, []);
    if (studentId) {
      return allProgress.filter((p) => p.studentId === studentId);
    }
    return allProgress;
  },

  saveMaterialProgress(progress: MaterialProgress): void {
    const allProgress = this.getMaterialProgress();
    const index = allProgress.findIndex(
      (p) => p.studentId === progress.studentId && p.moduleId === progress.moduleId
    );
    if (index >= 0) {
      allProgress[index] = { ...allProgress[index], ...progress, lastAccessed: new Date().toISOString() };
    } else {
      allProgress.unshift({ ...progress, lastAccessed: new Date().toISOString() });
    }
    setItem(KEYS.MATERIAL_PROGRESS, allProgress);
    this.syncGAS('Progress_Materi', progress);
  },

  updateReadingProgress(
    studentId: string,
    moduleId: string,
    percent: number,
    markCompleted: boolean = false
  ): MaterialProgress {
    const allProgress = this.getMaterialProgress();
    const existing = allProgress.find((p) => p.studentId === studentId && p.moduleId === moduleId);

    const newPercent = Math.max(existing?.progressPercent || 0, Math.min(100, Math.round(percent)));
    const isFinished = markCompleted || newPercent >= 95 || existing?.status === 'selesai';

    const updatedRecord: MaterialProgress = {
      id: existing?.id || `prog-${studentId}-${moduleId}`,
      studentId,
      moduleId,
      status: isFinished ? 'selesai' : newPercent > 0 ? 'sedang_dibaca' : 'belum_dibaca',
      progressPercent: isFinished ? 100 : newPercent,
      startTime: existing?.startTime || new Date().toISOString(),
      completedTime: isFinished ? (existing?.completedTime || new Date().toISOString()) : undefined,
      lastAccessed: new Date().toISOString(),
    };

    this.saveMaterialProgress(updatedRecord);
    return updatedRecord;
  },

  // Presensi Otomatis
  getPresensiOtomatis(): PresensiOtomatis[] {
    this.init();
    return getItem<PresensiOtomatis[]>(KEYS.PRESENSI_OTOMATIS, []);
  },

  savePresensiOtomatis(pres: PresensiOtomatis): void {
    const list = this.getPresensiOtomatis();
    const idx = list.findIndex(p => p.id_siswa === pres.id_siswa && p.tanggal === pres.tanggal);
    if (idx >= 0) list[idx] = pres;
    else list.unshift(pres);
    setItem(KEYS.PRESENSI_OTOMATIS, list);
    this.syncGAS('Presensi_Otomatis', pres);
  },

  // Login History
  getLoginHistory(): LoginHistory[] {
    this.init();
    return getItem<LoginHistory[]>(KEYS.LOGIN_HISTORY, []);
  },

  saveLoginHistory(log: LoginHistory): void {
    const list = this.getLoginHistory();
    const idx = list.findIndex(l => l.id_login === log.id_login);
    if (idx >= 0) list[idx] = log;
    else list.unshift(log);
    setItem(KEYS.LOGIN_HISTORY, list);
    this.syncGAS('Login_History', log);
  },

  // Aktivitas Siswa
  getAktivitasSiswa(): AktivitasSiswa[] {
    this.init();
    return getItem<AktivitasSiswa[]>(KEYS.AKTIVITAS_SISWA, []);
  },

  addAktivitasSiswa(
    id_siswa: string,
    nama_siswa: string,
    classGroup: string,
    jenis_aktivitas: string,
    deskripsi: string,
    id_referensi?: string
  ): AktivitasSiswa {
    const allActs = this.getAktivitasSiswa();
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toTimeString().split(' ')[0];
    const nowIso = new Date().toISOString();

    const newAct: AktivitasSiswa = {
      id_aktivitas: `act-${Date.now()}-${Math.random().toString(36).substring(2,6)}`,
      id_siswa,
      nama_siswa,
      classGroup,
      tanggal: today,
      waktu: nowTime,
      jenis_aktivitas,
      id_referensi,
      deskripsi,
      created_at: nowIso,
    };

    allActs.unshift(newAct);
    setItem(KEYS.AKTIVITAS_SISWA, allActs.slice(0, 1000));
    this.syncGAS('Aktivitas_Siswa', newAct);
    return newAct;
  },

  // Automatic Login Registration
  recordStudentLogin(student: { id: string; nis: string; name: string; classGroup: string }): { presensi: PresensiOtomatis; loginLog: LoginHistory } {
    this.init();
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toTimeString().split(' ')[0];
    const nowIso = new Date().toISOString();
    const sessionId = `sess-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // 1. Record Login History entry
    const loginLog: LoginHistory = {
      id_login: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      id_siswa: student.id,
      username: student.nis,
      nama_siswa: student.name,
      classGroup: student.classGroup,
      tanggal: today,
      waktu_login: nowTime,
      session_id: sessionId,
      status: 'Aktif',
      created_at: nowIso,
    };
    const historyList = this.getLoginHistory();
    historyList.unshift(loginLog);
    setItem(KEYS.LOGIN_HISTORY, historyList);
    this.syncGAS('Login_History', loginLog);

    // 2. Record/Update Presensi Otomatis
    const presensiList = this.getPresensiOtomatis();
    const existingIndex = presensiList.findIndex(
      (p) => p.id_siswa === student.id && p.tanggal === today
    );

    let presensi: PresensiOtomatis;
    if (existingIndex >= 0) {
      // Update count & last login time (1 presence per day, but increment login count)
      presensi = {
        ...presensiList[existingIndex],
        jumlah_login: presensiList[existingIndex].jumlah_login + 1,
        login_terakhir: nowTime,
        updated_at: nowIso,
      };
      presensiList[existingIndex] = presensi;
    } else {
      // New daily presence entry
      presensi = {
        id_presensi: `pres-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        id_siswa: student.id,
        nama_siswa: student.name,
        classGroup: student.classGroup,
        tanggal: today,
        login_pertama: nowTime,
        login_terakhir: nowTime,
        jumlah_login: 1,
        status: 'Hadir',
        created_at: nowIso,
        updated_at: nowIso,
      };
      presensiList.unshift(presensi);
    }
    setItem(KEYS.PRESENSI_OTOMATIS, presensiList);
    this.syncGAS('Presensi_Otomatis', presensi);

    // 3. Record Student Activity
    this.addAktivitasSiswa(
      student.id,
      student.name,
      student.classGroup,
      'Login',
      'Berhasil login ke LMS'
    );

    return { presensi, loginLog };
  },

  recordStudentLogout(studentId: string, studentName?: string, classGroup?: string, sessionId?: string): void {
    const historyList = this.getLoginHistory();
    const nowTime = new Date().toTimeString().split(' ')[0];

    if (sessionId) {
      const idx = historyList.findIndex((h) => h.session_id === sessionId);
      if (idx >= 0) {
        historyList[idx].waktu_logout = nowTime;
        historyList[idx].status = 'Selesai';
        try {
          const loginTimeObj = new Date(`${historyList[idx].tanggal}T${historyList[idx].waktu_login}`);
          const logoutTimeObj = new Date(`${historyList[idx].tanggal}T${nowTime}`);
          const diffMs = Math.max(0, logoutTimeObj.getTime() - loginTimeObj.getTime());
          const diffMins = Math.floor(diffMs / 60000);
          if (diffMins >= 60) {
            const hrs = Math.floor(diffMins / 60);
            const mins = diffMins % 60;
            historyList[idx].durasi_sesi = `${hrs} jam ${mins} menit`;
          } else {
            historyList[idx].durasi_sesi = `${Math.max(1, diffMins)} menit`;
          }
        } catch (e) {
          historyList[idx].durasi_sesi = 'Selesai';
        }
        setItem(KEYS.LOGIN_HISTORY, historyList);
      }
    }

    this.addAktivitasSiswa(
      studentId,
      studentName || 'Siswa',
      classGroup || 'X DKV 1',
      'Logout',
      'Logout dari LMS'
    );
  },

  // Locked/Unlocked Quizzes
  getLockedQuizzes(): Record<string, boolean> {
    return getItem<Record<string, boolean>>(KEYS.LOCKED_QUIZZES, {});
  },

  toggleLockQuiz(moduleId: string, isLocked: boolean): void {
    const lockedMap = this.getLockedQuizzes();
    lockedMap[moduleId] = isLocked;
    setItem(KEYS.LOCKED_QUIZZES, lockedMap);
  },

  // ==========================================
  // SISTEM PENILAIAN LENGKAP (GRADEBOOK ENGINE)
  // ==========================================
  getGradeItems(): GradeItem[] {
    this.init();
    const items = getItem<GradeItem[]>(KEYS.GRADE_ITEMS, initialGradeItems);
    // Sort by category priority or creation
    const categoryOrder: Record<string, number> = {
      HARIAN: 1,
      TUGAS: 2,
      KUIS: 3,
      ULANGAN: 4,
      PRAKTIK: 5,
      PROYEK: 6,
      UJIAN: 7,
    };
    return items.sort((a, b) => {
      const orderA = categoryOrder[a.category] || 99;
      const orderB = categoryOrder[b.category] || 99;
      if (orderA !== orderB) return orderA - orderB;
      return (a.number || 0) - (b.number || 0);
    });
  },

  saveGradeItem(item: GradeItem): void {
    const items = this.getGradeItems();
    const idx = items.findIndex((i) => i.id === item.id);
    if (idx >= 0) {
      items[idx] = { ...item, updatedAt: new Date().toISOString() };
    } else {
      items.push({
        ...item,
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    setItem(KEYS.GRADE_ITEMS, items);
    this.syncGAS('Kolom_Penilaian', item);
  },

  deleteGradeItem(itemId: string): void {
    const items = this.getGradeItems().filter((i) => i.id !== itemId);
    setItem(KEYS.GRADE_ITEMS, items);

    // Also clean up any scores referencing this item
    const studentGrades = this.getStudentGrades();
    const updated = studentGrades.map((rec) => {
      if (rec.scores && itemId in rec.scores) {
        const copy = { ...rec.scores };
        delete copy[itemId];
        return { ...rec, scores: copy };
      }
      return rec;
    });
    setItem(KEYS.STUDENT_GRADES, updated);
    this.syncGAS('Kolom_Penilaian_Delete', { id: itemId });
  },

  getStudentGrades(): StudentGradeRecord[] {
    this.init();
    const list = getItem<StudentGradeRecord[]>(KEYS.STUDENT_GRADES, []);
    if (list.length === 0) {
      const initial = generateInitialStudentGrades();
      setItem(KEYS.STUDENT_GRADES, initial);
      return initial;
    }
    return list;
  },

  saveStudentGrade(record: StudentGradeRecord): void {
    const list = this.getStudentGrades();
    const idx = list.findIndex((r) => r.studentId === record.studentId);
    if (idx >= 0) {
      list[idx] = { ...record, updatedAt: new Date().toISOString() };
    } else {
      list.push({ ...record, updatedAt: new Date().toISOString() });
    }
    setItem(KEYS.STUDENT_GRADES, list);
    this.syncGAS('Nilai_Siswa', record);
  },

  saveStudentGradeBatch(records: StudentGradeRecord[]): void {
    const current = this.getStudentGrades();
    records.forEach((rec) => {
      const idx = current.findIndex((r) => r.studentId === rec.studentId);
      if (idx >= 0) {
        current[idx] = { ...rec, updatedAt: new Date().toISOString() };
      } else {
        current.push({ ...rec, updatedAt: new Date().toISOString() });
      }
      this.syncGAS('Nilai_Siswa', rec);
    });
    setItem(KEYS.STUDENT_GRADES, current);
  },

  updateSingleScore(studentId: string, gradeItemId: string, score: number | null): void {
    const list = this.getStudentGrades();
    const idx = list.findIndex((r) => r.studentId === studentId);
    if (idx >= 0) {
      const scores = { ...list[idx].scores, [gradeItemId]: score };
      list[idx] = {
        ...list[idx],
        scores,
        updatedAt: new Date().toISOString(),
      };
    } else {
      const student = this.getStudents().find((s) => s.id === studentId);
      if (student) {
        list.push({
          id: student.id,
          studentId: student.id,
          studentNis: student.nis,
          studentName: student.name,
          classGroup: student.classGroup,
          scores: { [gradeItemId]: score },
          updatedAt: new Date().toISOString(),
        });
      }
    }
    setItem(KEYS.STUDENT_GRADES, list);
  },

  getGradeWeights(): GradeWeights {
    this.init();
    return getItem<GradeWeights>(KEYS.GRADE_WEIGHTS, initialGradeWeights);
  },

  saveGradeWeights(weights: GradeWeights): void {
    setItem(KEYS.GRADE_WEIGHTS, weights);
    this.syncGAS('Bobot_Penilaian', weights);
  },

  // Export Data JSON Backup
  exportDataJSON(): string {
    const data = {
      settings: this.getSettings(),
      classes: this.getClasses(),
      students: this.getStudents(),
      submissions: this.getSubmissions(),
      questionBank: this.getQuestionBank(),
      exams: this.getExams(),
      attendance: this.getAttendance(),
      announcements: this.getAnnouncements(),
      activityLogs: this.getActivityLogs(),
      quizResults: this.getQuizResults(),
      gradeItems: this.getGradeItems(),
      studentGrades: this.getStudentGrades(),
      gradeWeights: this.getGradeWeights(),
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },

  // Import Data JSON Backup
  importDataJSON(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.settings) setItem(KEYS.SETTINGS, parsed.settings);
      if (parsed.classes) setItem(KEYS.CLASSES, parsed.classes);
      if (parsed.students) setItem(KEYS.STUDENTS, parsed.students);
      if (parsed.submissions) setItem(KEYS.SUBMISSIONS, parsed.submissions);
      if (parsed.questionBank) setItem(KEYS.QUESTION_BANK, parsed.questionBank);
      if (parsed.exams) setItem(KEYS.EXAMS, parsed.exams);
      if (parsed.attendance) setItem(KEYS.ATTENDANCE, parsed.attendance);
      if (parsed.announcements) setItem(KEYS.ANNOUNCEMENTS, parsed.announcements);
      if (parsed.quizResults) setItem(KEYS.QUIZ_RESULTS, parsed.quizResults);
      if (parsed.gradeItems) setItem(KEYS.GRADE_ITEMS, parsed.gradeItems);
      if (parsed.studentGrades) setItem(KEYS.STUDENT_GRADES, parsed.studentGrades);
      if (parsed.gradeWeights) setItem(KEYS.GRADE_WEIGHTS, parsed.gradeWeights);
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  },

  resetToDefault(): void {
    localStorage.clear();
    this.init();
  },
};
