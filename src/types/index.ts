export type UserRole = 'GURU' | 'SISWA' | 'student' | 'teacher' | 'admin';
export type AccountStatus = 'AKTIF' | 'NONAKTIF';

export interface UserAccount {
  id_user: string;
  username: string;
  password_hash: string;
  nama: string;
  role: 'GURU' | 'SISWA';
  status: AccountStatus;
  email?: string;
  nis?: string;
  classGroup?: string;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
}

export interface UserSession {
  user_id: string;
  nama: string;
  role: 'GURU' | 'SISWA' | 'student' | 'teacher' | 'admin';
  status: AccountStatus;
  waktu_login: string;
  session_id?: string;
  profile?: StudentProfile | TeacherProfile | AdminProfile;
}

export interface ClassData {
  id: string;
  name: string; // e.g. 'X DKV 1'
  code: string;
  academicYear: string;
  studentCount?: number;
}

export interface SocialMediaHandles {
  tiktok?: string;
  instagram?: string;
  youtube?: string;
  facebook?: string;
}

export interface StudentProfile {
  id: string;
  nis: string;
  name: string;
  classGroup: string; // Dynamic class name, e.g. 'X DKV 1'
  gender?: 'L' | 'P';
  jurusan?: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  streakDays: number;
  lastLoginDate: string;
  completedModuleIds: string[];
  bookmarkedModuleIds: string[];
  badges: string[]; // Badge IDs
  notes: Record<string, string>; // moduleId -> note
  email?: string;
  phoneWA?: string;
  socialMedia?: SocialMediaHandles;
}

export interface TeacherProfile {
  id: string;
  email: string;
  name: string;
  nip?: string;
  subject: string;
  school: string;
  phoneWA: string;
}

export interface AdminProfile {
  id: string;
  email: string;
  name: string;
}

export type ElementId = 'BK' | 'TIK' | 'SK' | 'JKI' | 'AD' | 'AP' | 'DSI' | 'PLB';

export interface ElementCategory {
  id: ElementId;
  number: number;
  title: string;
  description: string;
  iconName: string;
  color: string;
}

export interface ModuleAssessmentQuestion {
  id?: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface ModuleData {
  id: string;
  elementId: ElementId;
  elementName: string;
  moduleNumber: number; // 1 or 2
  title: string;
  estimatedTimeMinutes: number;
  difficulty: 'Pemula' | 'Menengah' | 'Mahir';
  competencies: string[];
  objectives: string[]; // 3. Tujuan Pembelajaran
  summary: string;
  contentMarkdown: string; // Legacy / Fallback or Compiled Main Content
  infographicHighlights: { label: string; text: string; icon: string }[];
  isLockedByDefault?: boolean;
  
  // Structured Reading Material Fields (17-Point Complete Pedagogy Format)
  bab?: string; // 1. Judul Bab & Materi
  pertemuan?: number; // Pertemuan ke-
  fase?: string; // e.g. 'Fase E Kelas X SMK'
  pendahuluan?: string; // 2. Pengantar
  pertanyaanPemantik?: string[]; // 4. Pertanyaan Pemantik
  materiUtama?: string; // 5. Materi Inti (Markdown komprehensif)
  konsepInti?: string; // Konsep Inti Ringkas
  contohPenerapan?: string; // 6. Contoh Nyata
  studiKasus?: string; // 7. Studi Kasus Kontekstual SMK & Industri
  aktivitasSiswa?: string; // 8. Aktivitas Praktik Langsung
  tipsPraktis?: string[]; // 9. Tips Praktis
  kesalahanUmum?: string[]; // 10. Kesalahan Umum Siswa
  rangkuman?: string; // 11. Rangkuman Poin Kunci
  refleksi?: string[]; // 12. Pertanyaan Refleksi
  latihanPemahaman?: string[]; // 13. Latihan Pemahaman
  tugasPraktik?: string; // 14. Tugas Praktik / Produk Nyata
  asesmen?: ModuleAssessmentQuestion[]; // 15. Asesmen Pemahaman (Pilihan Ganda dsb)
  asesmenUraian?: string[]; // Asesmen Uraian & Studi Kasus
  rubrikPenilaian?: string | { kriteria: string; skor4: string; skor3: string; skor2: string; skor1: string }[]; // 16. Rubrik Penilaian
  glosarium?: GlossaryTerm[]; // Glosarium Istilah
  sumberReferensi?: string[]; // 17. Referensi Resmi & Kredibel

  // Media & Attachments
  imageUrl?: string;
  videoUrl?: string;
  linkUrl?: string;
  pdfUrl?: string;
  supportingFileUrl?: string;

  // Management & Access Metadata
  targetClass?: string; // 'ALL' or specific class name
  meetingNumber?: number; // Same as pertemuan
  isMandatory?: boolean; // Wajib or Tambahan
  status?: 'published' | 'draft' | 'hidden';
  publishDate?: string; // YYYY-MM-DD
  urutan?: number; // Order number
  createdAt?: string;
  updatedAt?: string;
}

export interface MaterialProgress {
  id: string; // id_progress
  studentId: string; // id_siswa
  moduleId: string; // id_materi
  status: 'belum_dibaca' | 'sedang_dibaca' | 'selesai';
  progressPercent: number; // 0 to 100
  startTime?: string;
  completedTime?: string;
  lastAccessed: string; // ISO date string
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  explanation: string;
}

export interface QuizData {
  moduleId: string;
  moduleTitle: string;
  passingScore: number; // default 75
  questions: QuizQuestion[];
}

export interface QuizResult {
  id: string;
  studentId: string;
  moduleId: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  passed: boolean;
  attemptDate: string;
}

export interface AssignmentData {
  id: string;
  moduleId: string;
  title: string;
  instruction: string;
  allowedTypes: string[]; // e.g. ['pdf', 'docx', 'png', 'zip', 'link']
  maxScore: number;
  targetClass?: string; // 'ALL' or specific class
  deadline?: string; // YYYY-MM-DD HH:mm
  attachmentUrl?: string;
  submissionType?: 'file' | 'link' | 'text';
}

export type SubmissionStatus = 'pending' | 'graded' | 'revision' | 'late' | 'not_submitted';

export interface SubmissionData {
  id: string;
  assignmentId: string;
  moduleId: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  externalLink?: string;
  notes?: string;
  submittedAt: string;
  status: 'pending' | 'graded' | 'revision' | 'late';
  score?: number;
  feedback?: string;
  gradedAt?: string;
}

// Question Bank (Bank Soal)
export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer';

export interface QuestionItem {
  id: string;
  category: string; // e.g., 'Berpikir Komputasional', 'Algoritma'
  topic: string;
  question: string;
  type: QuestionType;
  options?: string[]; // For multiple_choice and true_false
  correctAnswer: string | number; // Option index (0-3) for MC, 'true'/'false', or text
  explanation: string;
  difficulty: 'Pemula' | 'Menengah' | 'Mahir';
  weight: number; // Points weight
}

// Exams / Quizzes (Ujian)
export interface ExamData {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  startSchedule: string; // ISO string or format 'YYYY-MM-DD HH:mm'
  endSchedule: string;
  maxScore: number;
  targetClass: string; // 'ALL' or class ID
  questionIds: string[];
  questions?: QuestionItem[];
  isPublished: boolean;
}

export interface ExamSubmission {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  answers: Record<string, string | number>; // questionId -> answer
  score: number;
  submittedAt: string;
  status: 'submitted' | 'graded';
}

// Presensi Otomatis & Monitoring Aktivitas
export interface PresensiOtomatis {
  id_presensi: string;
  id_siswa: string;
  nama_siswa: string;
  classGroup: string;
  tanggal: string; // YYYY-MM-DD
  login_pertama: string; // HH:mm:ss
  login_terakhir: string; // HH:mm:ss
  jumlah_login: number;
  status: 'Hadir';
  created_at: string;
  updated_at: string;
}

export interface LoginHistory {
  id_login: string;
  id_siswa: string;
  username: string;
  nama_siswa: string;
  classGroup?: string;
  tanggal: string; // YYYY-MM-DD
  waktu_login: string; // HH:mm:ss
  waktu_logout?: string; // HH:mm:ss
  durasi_sesi?: string; // e.g. "1 jam 20 menit"
  session_id: string;
  status: 'Aktif' | 'Selesai' | 'Terputus';
  created_at: string;
}

export type JenisAktivitas =
  | 'Login'
  | 'Logout'
  | 'Membuka materi'
  | 'Membaca bahan bacaan'
  | 'Melihat ilustrasi'
  | 'Membuka video'
  | 'Mengerjakan tugas'
  | 'Mengumpulkan tugas'
  | 'Mengerjakan kuis'
  | 'Menyelesaikan kuis'
  | 'Menggunakan simulator'
  | 'Menyelesaikan simulator'
  | 'Melihat nilai';

export interface AktivitasSiswa {
  id_aktivitas: string;
  id_siswa: string;
  nama_siswa: string;
  classGroup: string;
  tanggal: string; // YYYY-MM-DD
  waktu: string; // HH:mm:ss
  jenis_aktivitas: JenisAktivitas | string;
  id_referensi?: string;
  deskripsi: string;
  created_at: string;
}

// Legacy Attendance (Archived / Backward Compatibility)
export type AttendanceStatus = 'Hadir' | 'Izin' | 'Sakit' | 'Alpa';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classGroup: string;
  date: string; // YYYY-MM-DD
  meetingNumber: number;
  status: AttendanceStatus;
  notes?: string;
}

// Pengumuman (Announcements)
export interface AnnouncementData {
  id: string;
  title: string;
  content: string;
  targetClass: string; // 'ALL' or class name
  authorName: string;
  date: string;
  isPinned?: boolean;
}

// Activity Log
export interface ActivityLog {
  id: string;
  timestamp: string;
  userRole: UserRole;
  userName: string;
  action: string;
  details: string;
}

export interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'quiz' | 'streak' | 'skills';
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  studentId: string;
  nis: string;
  name: string;
  classGroup: string;
  xp: number;
  level: number;
  completedModulesCount: number;
  badgeCount: number;
  streakDays: number;
  rank?: number;
}

export interface CertificateData {
  certificateNumber: string;
  studentName: string;
  nis: string;
  classGroup: string;
  completionDate: string;
  finalGrade: number;
  teacherName: string;
  teacherNipWA: string;
  schoolName: string;
  verificationCode: string;
}

export interface AppSettings {
  schoolName: string;
  subjectName: string; // Dynamic Subject Name!
  curriculum: string;
  teacherName: string;
  teacherNip?: string;
  teacherPhoneWA: string;
  logoUrl?: string;
  passingScoreThreshold: number;
  xpReading: number;
  xpQuizPass: number;
  xpQuizPerfect: number;
  xpAssignment: number;
  xpDailyLogin: number;
  gasApiUrl?: string; // Google Apps Script Web App Endpoint URL
  driveFolderUrl?: string; // Google Drive Root Folder URL
}

// ==========================================
// SISTEM PENILAIAN LENGKAP GURU & SISWA
// ==========================================
export type GradeCategory =
  | 'HARIAN'
  | 'TUGAS'
  | 'KUIS'
  | 'ULANGAN'
  | 'PRAKTIK'
  | 'PROYEK'
  | 'UJIAN';

export interface GradeItem {
  id: string; // e.g. 'gi-nh-1', 'gi-tugas-1'
  category: GradeCategory;
  code: string; // e.g. 'NH 1', 'NH 2', 'Tugas 1', 'Kuis 1', 'UH 1', 'Praktik 1', 'Proyek 1', 'Ujian Praktik 1'
  name: string; // e.g. 'Nilai Harian 1'
  number: number; // 1, 2, 3, 4... (unlimited)
  topic: string; // Materi / Kompetensi Pembelajaran
  date: string; // YYYY-MM-DD
  description?: string;
  rubric?: string; // Khusus Nilai Praktik / Proyek
  maxScore?: number; // default 100
  weight?: number; // bobot per item (optional)
  targetClass?: string; // 'ALL' or specific classGroup (e.g. 'X DKV 1')
  semester?: 'GANJIL' | 'GENAP';
  academicYear?: string; // e.g. '2026/2027'
  isActive?: boolean;
  moduleId?: string; // Reference to module if linked
  createdAt?: string;
  updatedAt?: string;
}

export type GradeSpecialStatus = 'BELUM_DINILAI' | 'TMS' | 'TM' | 'DINILAI';

export interface StudentGradeRecord {
  id: string; // studentId
  studentId: string;
  studentNis: string;
  studentName: string;
  classGroup: string;
  semester?: 'GANJIL' | 'GENAP';
  academicYear?: string;
  scores: Record<string, number | null>; // gradeItemId -> score (0-100) or null
  statusFlags?: Record<string, GradeSpecialStatus>; // gradeItemId -> status
  itemNotes?: Record<string, string>; // gradeItemId -> individual note
  teacherNotes?: string; // general semester note
  updatedAt?: string;
}

export interface GradeWeights {
  harian: number; // default 20%
  tugas: number; // default 20%
  kuis: number; // default 15%
  ulangan: number; // default 15%
  praktik: number; // default 15%
  proyek: number; // default 10%
  ujian: number; // default 5% (Ujian Praktik)
  kkm: number; // Kriteria Ketuntasan Minimal, default 75
}

export interface StudentCalculatedGrade {
  studentId: string;
  categoryAverages: Record<GradeCategory, number | null>;
  finalGrade: number;
  predicate: 'A' | 'B' | 'C' | 'D';
  isPassed: boolean;
  notes?: string;
  rank?: number;
  completionRate?: number; // % of required assessments completed
  totalAssessments?: number;
  gradedAssessments?: number;
}



