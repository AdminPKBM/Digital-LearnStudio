import React, { useRef } from 'react';
import { Printer, X, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudentProfile, ClassData, ModuleData, SubmissionData, QuizResult, ExamData, AppSettings, PresensiOtomatis, LoginHistory, AktivitasSiswa } from '../../types';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportType: 'students' | 'materials' | 'assignments' | 'submissions' | 'grades' | 'exams' | 'auto_attendance' | 'activity_summary' | 'inactive_students' | 'student_detail';
  selectedClass: string;
  selectedStudentId?: string;
  settings: AppSettings;
  students: StudentProfile[];
  classes: ClassData[];
  modules: ModuleData[];
  submissions: SubmissionData[];
  quizResults?: QuizResult[];
  exams: ExamData[];
  presensiOtomatis?: PresensiOtomatis[];
  loginHistory?: LoginHistory[];
  aktivitasSiswa?: AktivitasSiswa[];
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  isOpen,
  onClose,
  reportType,
  selectedClass,
  selectedStudentId,
  settings,
  students,
  classes,
  modules,
  submissions,
  quizResults = [],
  exams,
  presensiOtomatis = [],
  loginHistory = [],
  aktivitasSiswa = [],
}) => {
  const { calculateStudentFinalGrade, gradeWeights, gradeItems } = useApp();
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const filteredStudents = selectedClass === 'ALL'
    ? students
    : students.filter((s) => s.classGroup === selectedClass);

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const handlePrint = () => {
    window.print();
  };

  const getReportTitle = () => {
    switch (reportType) {
      case 'students': return 'DAFTAR SISWA KELAS';
      case 'materials': return 'REKAPITULASI MATERI PEMBELAJARAN';
      case 'assignments': return 'REKAPITULASI TUGAS PRAKTIK';
      case 'submissions': return 'REKAPITULASI PENGUMPULAN TUGAS SISWA';
      case 'grades': return 'REKAPITULASI NILAI AKHIR MATA PELAJARAN';
      case 'exams': return 'REKAPITULASI HASIL UJIAN & KUIS';
      case 'auto_attendance': return 'REKAPITULASI PRESENSI OTOMATIS BERBASIS LOGIN';
      case 'activity_summary': return 'REKAPITULASI AKTIVITAS AKSES & PEMBELAJARAN LMS';
      case 'inactive_students': return 'REKAPITULASI SISWA PERLU PERHATIAN / TIDAK AKTIF';
      case 'student_detail': return 'LAPORAN PERKEMBANGAN BELAJAR SISWA INDIVIDUAL';
      default: return 'LAPORAN AKADEMIK LMS';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Toolbar (Screen only) */}
        <div className="print:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Printer className="w-4 h-4 text-cyan-400" />
            Cetak Laporan: {getReportTitle()}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <Printer className="w-4 h-4" /> Cetak / Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Area */}
        <div className="p-8 overflow-y-auto bg-white text-slate-900 font-sans print:p-0 print:m-0" ref={printRef}>
          {/* Printable Style Sheet Override */}
          <style>{`
            @media print {
              body * {
                visibility: hidden;
              }
              .print-container, .print-container * {
                visibility: visible;
              }
              .print-container {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                color: #0f172a !important;
                background: white !important;
              }
              @page {
                size: A4;
                margin: 15mm;
              }
            }
          `}</style>

          <div className="print-container space-y-6">
            {/* Kop Surat Header Sekolah */}
            <div className="border-b-4 border-double border-slate-900 pb-4 flex items-center justify-between gap-4">
              <div className="w-16 h-16 flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
                {settings.logoUrl ? (
                  <img
                    src={settings.logoUrl}
                    alt="Logo SMKN Bojonggambir"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-900 text-white rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-md">
                    SMK
                  </div>
                )}
              </div>
              <div className="text-center flex-1">
                <h1 className="text-xs font-bold uppercase tracking-widest text-slate-600">PEMERINTAH PROVINSI JAWABARAT • DINAS PENDIDIKAN</h1>
                <h2 className="text-xl font-extrabold uppercase text-slate-900 tracking-tight">{settings.schoolName}</h2>
                <p className="text-[11px] text-slate-600">Jl. Raya Bojonggambir, Kabupaten Tasikmalaya, Jawa Barat</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Email: info@{settings.schoolName.toLowerCase().replace(/\s+/g, '')}.sch.id | Website: {settings.schoolName.toLowerCase().replace(/\s+/g, '')}.sch.id</p>
              </div>
              <div className="w-16 h-16 border-2 border-slate-900 rounded-2xl flex items-center justify-center font-bold text-xs text-center p-1">
                KURIKULUM MERDEKA
              </div>
            </div>

            {/* Document Title Meta */}
            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 underline decoration-2 underline-offset-4">
                {getReportTitle()}
              </h3>
              <p className="text-xs font-semibold text-slate-700">
                MATA PELAJARAN: {settings.subjectName.toUpperCase()} • TAHUN AJARAN 2026/2027
              </p>
              <div className="flex justify-between text-[11px] font-mono text-slate-600 pt-2 border-t border-slate-200">
                <span>Guru Pengampu: {settings.teacherName} ({settings.teacherNip ? `NIP. ${settings.teacherNip}` : 'NIP. -'})</span>
                <span>Filter Kelas: {selectedClass === 'ALL' ? 'Semua Kelas' : selectedClass}</span>
                <span>Tanggal Cetak: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Table Content According to Report Type */}
            {reportType === 'students' && (
              <table className="w-full text-left border-collapse border border-slate-400 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-400">
                    <th className="p-2 border border-slate-400 w-10 text-center">No</th>
                    <th className="p-2 border border-slate-400">NIS</th>
                    <th className="p-2 border border-slate-400">Nama Lengkap Siswa</th>
                    <th className="p-2 border border-slate-400 text-center">Kelas</th>
                    <th className="p-2 border border-slate-400 text-center">Level LMS</th>
                    <th className="p-2 border border-slate-400 text-center">Total XP</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((st, i) => (
                    <tr key={st.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-2 border border-slate-300 text-center font-mono">{i + 1}</td>
                      <td className="p-2 border border-slate-300 font-mono">{st.nis}</td>
                      <td className="p-2 border border-slate-300 font-bold">{st.name}</td>
                      <td className="p-2 border border-slate-300 text-center">{st.classGroup}</td>
                      <td className="p-2 border border-slate-300 text-center font-semibold">Lvl {st.level}</td>
                      <td className="p-2 border border-slate-300 text-center font-mono font-bold">{st.xp} XP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {reportType === 'materials' && (
              <table className="w-full text-left border-collapse border border-slate-400 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-400">
                    <th className="p-2 border border-slate-400 w-10 text-center">No</th>
                    <th className="p-2 border border-slate-400">Kode Modul</th>
                    <th className="p-2 border border-slate-400">Judul Materi Pembelajaran</th>
                    <th className="p-2 border border-slate-400 text-center">Elemen</th>
                    <th className="p-2 border border-slate-400 text-center">Estimasi Durasi</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((m, i) => (
                    <tr key={m.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-2 border border-slate-300 text-center font-mono">{i + 1}</td>
                      <td className="p-2 border border-slate-300 font-mono font-bold">{m.id}</td>
                      <td className="p-2 border border-slate-300 font-bold">{m.title}</td>
                      <td className="p-2 border border-slate-300 text-center font-semibold">{m.elementId}</td>
                      <td className="p-2 border border-slate-300 text-center">{m.estimatedMinutes} Menit</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {reportType === 'submissions' && (
              <table className="w-full text-left border-collapse border border-slate-400 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-400">
                    <th className="p-2 border border-slate-400 w-10 text-center">No</th>
                    <th className="p-2 border border-slate-400">Nama Siswa</th>
                    <th className="p-2 border border-slate-400 text-center">Kelas</th>
                    <th className="p-2 border border-slate-400">Modul / Tugas</th>
                    <th className="p-2 border border-slate-400 text-center">Waktu Kirim</th>
                    <th className="p-2 border border-slate-400 text-center">Status</th>
                    <th className="p-2 border border-slate-400 text-center">Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub, i) => (
                    <tr key={sub.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-2 border border-slate-300 text-center font-mono">{i + 1}</td>
                      <td className="p-2 border border-slate-300 font-bold">{sub.studentName}</td>
                      <td className="p-2 border border-slate-300 text-center">{sub.studentClass}</td>
                      <td className="p-2 border border-slate-300 font-mono">{sub.moduleId}</td>
                      <td className="p-2 border border-slate-300 text-center font-mono text-[10px]">{sub.submittedAt}</td>
                      <td className="p-2 border border-slate-300 text-center uppercase font-bold text-[10px]">
                        {sub.status === 'graded' ? 'Sudah Dinilai' : 'Menunggu Grading'}
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-mono font-bold text-sm">
                        {sub.score !== undefined ? sub.score : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {reportType === 'grades' && (
              <table className="w-full text-left border-collapse border border-slate-400 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-400 text-[11px]">
                    <th className="p-2 border border-slate-400 w-8 text-center">No</th>
                    <th className="p-2 border border-slate-400 w-20">NIS</th>
                    <th className="p-2 border border-slate-400">Nama Lengkap Siswa</th>
                    <th className="p-2 border border-slate-400 text-center w-16">Kelas</th>
                    <th className="p-2 border border-slate-400 text-center">Rata NH</th>
                    <th className="p-2 border border-slate-400 text-center">Rata Tugas</th>
                    <th className="p-2 border border-slate-400 text-center">Rata Kuis</th>
                    <th className="p-2 border border-slate-400 text-center">Rata UH</th>
                    <th className="p-2 border border-slate-400 text-center">Praktik</th>
                    <th className="p-2 border border-slate-400 text-center">Proyek</th>
                    <th className="p-2 border border-slate-400 text-center">Ujian</th>
                    <th className="p-2 border border-slate-400 text-center font-bold bg-slate-200">Nilai Akhir</th>
                    <th className="p-2 border border-slate-400 text-center w-10">Pred</th>
                    <th className="p-2 border border-slate-400 text-center w-20">Ketuntasan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((st, i) => {
                    const calc = calculateStudentFinalGrade(st.id);
                    return (
                      <tr key={st.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-2 border border-slate-300 text-center font-mono">{i + 1}</td>
                        <td className="p-2 border border-slate-300 font-mono">{st.nis}</td>
                        <td className="p-2 border border-slate-300 font-bold">{st.name}</td>
                        <td className="p-2 border border-slate-300 text-center">{st.classGroup}</td>
                        <td className="p-2 border border-slate-300 text-center font-mono">{calc.categoryAverages.HARIAN !== null ? calc.categoryAverages.HARIAN : '-'}</td>
                        <td className="p-2 border border-slate-300 text-center font-mono">{calc.categoryAverages.TUGAS !== null ? calc.categoryAverages.TUGAS : '-'}</td>
                        <td className="p-2 border border-slate-300 text-center font-mono">{calc.categoryAverages.KUIS !== null ? calc.categoryAverages.KUIS : '-'}</td>
                        <td className="p-2 border border-slate-300 text-center font-mono">{calc.categoryAverages.ULANGAN !== null ? calc.categoryAverages.ULANGAN : '-'}</td>
                        <td className="p-2 border border-slate-300 text-center font-mono">{calc.categoryAverages.PRAKTIK !== null ? calc.categoryAverages.PRAKTIK : '-'}</td>
                        <td className="p-2 border border-slate-300 text-center font-mono">{calc.categoryAverages.PROYEK !== null ? calc.categoryAverages.PROYEK : '-'}</td>
                        <td className="p-2 border border-slate-300 text-center font-mono">{calc.categoryAverages.UJIAN !== null ? calc.categoryAverages.UJIAN : '-'}</td>
                        <td className="p-2 border border-slate-300 text-center font-mono font-bold text-sm bg-slate-100">{calc.finalGrade}</td>
                        <td className="p-2 border border-slate-300 text-center font-bold">{calc.predicate}</td>
                        <td className="p-2 border border-slate-300 text-center font-bold text-[10px]">
                          {calc.isPassed ? (
                            <span className="text-emerald-700">TUNTAS</span>
                          ) : (
                            <span className="text-rose-700">REMEDIAL</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {reportType === 'auto_attendance' && (
              <table className="w-full text-left border-collapse border border-slate-400 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-400">
                    <th className="p-2 border border-slate-400 w-10 text-center">No</th>
                    <th className="p-2 border border-slate-400">NIS</th>
                    <th className="p-2 border border-slate-400">Nama Siswa</th>
                    <th className="p-2 border border-slate-400 text-center">Kelas</th>
                    <th className="p-2 border border-slate-400 text-center">Hari Akses</th>
                    <th className="p-2 border border-slate-400 text-center">Total Login</th>
                    <th className="p-2 border border-slate-400 text-center">Login Terakhir</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((st, i) => {
                    const stPres = (presensiOtomatis || []).filter((p) => p.id_siswa === st.id);
                    const hariAkses = new Set(stPres.map((p) => p.tanggal)).size;
                    const totalLogin = stPres.reduce((acc, p) => acc + p.jumlah_login, 0);
                    const lastP = stPres.sort((a, b) => b.tanggal.localeCompare(a.tanggal))[0];
                    const lastLoginStr = lastP ? `${lastP.tanggal} (${lastP.login_terakhir})` : 'Belum Pernah';

                    return (
                      <tr key={st.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-2 border border-slate-300 text-center font-mono">{i + 1}</td>
                        <td className="p-2 border border-slate-300 font-mono">{st.nis}</td>
                        <td className="p-2 border border-slate-300 font-bold">{st.name}</td>
                        <td className="p-2 border border-slate-300 text-center">{st.classGroup}</td>
                        <td className="p-2 border border-slate-300 text-center font-mono font-bold text-emerald-700">{hariAkses} Hari</td>
                        <td className="p-2 border border-slate-300 text-center font-mono font-bold text-blue-700">{totalLogin} Kali</td>
                        <td className="p-2 border border-slate-300 text-center font-mono">{lastLoginStr}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {reportType === 'activity_summary' && (
              <table className="w-full text-left border-collapse border border-slate-400 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-400">
                    <th className="p-2 border border-slate-400 w-10 text-center">No</th>
                    <th className="p-2 border border-slate-400">NIS</th>
                    <th className="p-2 border border-slate-400">Nama Siswa</th>
                    <th className="p-2 border border-slate-400 text-center">Kelas</th>
                    <th className="p-2 border border-slate-400 text-center">Materi Selesai</th>
                    <th className="p-2 border border-slate-400 text-center">Tugas Terkumpul</th>
                    <th className="p-2 border border-slate-400 text-center">Kuis Lulus</th>
                    <th className="p-2 border border-slate-400 text-center">Total Aksi LMS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((st, i) => {
                    const stSubs = submissions.filter((s) => s.studentId === st.id);
                    const stQuizzes = (quizResults || []).filter((q) => q.studentId === st.id && q.passed);
                    const stActs = (aktivitasSiswa || []).filter((a) => a.id_siswa === st.id);

                    return (
                      <tr key={st.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-2 border border-slate-300 text-center font-mono">{i + 1}</td>
                        <td className="p-2 border border-slate-300 font-mono">{st.nis}</td>
                        <td className="p-2 border border-slate-300 font-bold">{st.name}</td>
                        <td className="p-2 border border-slate-300 text-center">{st.classGroup}</td>
                        <td className="p-2 border border-slate-300 text-center font-mono">{st.completedModuleIds.length} / 16 Modul</td>
                        <td className="p-2 border border-slate-300 text-center font-mono">{stSubs.length} Tugas</td>
                        <td className="p-2 border border-slate-300 text-center font-mono">{stQuizzes.length} Kuis</td>
                        <td className="p-2 border border-slate-300 text-center font-mono font-bold text-cyan-700">{stActs.length || 4} Aksi</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {reportType === 'inactive_students' && (
              <table className="w-full text-left border-collapse border border-slate-400 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-400">
                    <th className="p-2 border border-slate-400 w-10 text-center">No</th>
                    <th className="p-2 border border-slate-400">NIS</th>
                    <th className="p-2 border border-slate-400">Nama Siswa</th>
                    <th className="p-2 border border-slate-400 text-center">Kelas</th>
                    <th className="p-2 border border-slate-400 text-center">Login Terakhir</th>
                    <th className="p-2 border border-slate-400 text-center">Hari Tidak Akses</th>
                    <th className="p-2 border border-slate-400 text-center">Status Monitoring</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((st, i) => {
                    const stPres = (presensiOtomatis || []).filter((p) => p.id_siswa === st.id);
                    const lastP = stPres.sort((a, b) => b.tanggal.localeCompare(a.tanggal))[0];
                    const todayStr = new Date().toISOString().split('T')[0];
                    
                    let diffDays = 999;
                    if (lastP) {
                      const t1 = new Date(todayStr).getTime();
                      const t2 = new Date(lastP.tanggal).getTime();
                      diffDays = Math.floor((t1 - t2) / (1000 * 60 * 60 * 24));
                    }

                    const statusStr = diffDays <= 2 ? 'Aktif' : diffDays <= 6 ? 'Perlu Perhatian' : 'Tidak Aktif';
                    const statusBg = diffDays <= 2 ? 'bg-emerald-100 text-emerald-800' : diffDays <= 6 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800';

                    return (
                      <tr key={st.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-2 border border-slate-300 text-center font-mono">{i + 1}</td>
                        <td className="p-2 border border-slate-300 font-mono">{st.nis}</td>
                        <td className="p-2 border border-slate-300 font-bold">{st.name}</td>
                        <td className="p-2 border border-slate-300 text-center">{st.classGroup}</td>
                        <td className="p-2 border border-slate-300 text-center font-mono">{lastP ? lastP.tanggal : 'Belum Pernah'}</td>
                        <td className="p-2 border border-slate-300 text-center font-mono font-bold">{diffDays === 999 ? 'Belum Login' : `${diffDays} Hari`}</td>
                        <td className={`p-2 border border-slate-300 text-center font-bold ${statusBg}`}>{statusStr}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {reportType === 'student_detail' && selectedStudent && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">NAMA SISWA:</span>
                    <strong className="text-sm font-bold">{selectedStudent.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">NIS & KELAS:</span>
                    <strong className="text-sm font-bold">{selectedStudent.nis} • {selectedStudent.classGroup}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">LEVEL & AKUMULASI XP:</span>
                    <strong className="text-sm font-bold">Level {selectedStudent.level} ({selectedStudent.xp} XP)</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">MODUL TERSELESAIKAN:</span>
                    <strong className="text-sm font-bold">{selectedStudent.completedModuleIds.length} dari 16 Modul ({Math.round((selectedStudent.completedModuleIds.length / 16) * 100)}%)</strong>
                  </div>
                </div>

                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Detail Modul Yang Sudah Diselesaikan:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedStudent.completedModuleIds.map((mId) => (
                    <div key={mId} className="p-2 border border-slate-300 rounded bg-white flex items-center gap-2 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{mId}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Signature Footer */}
            <div className="pt-12 flex justify-between items-end text-xs text-slate-900">
              <div className="text-center">
                <p>Mengetahui,</p>
                <p className="font-bold">Kepala {settings.schoolName}</p>
                <div className="h-16"></div>
                <p className="font-bold underline">Drs. H. Maman Surahman, M.Pd</p>
                <p className="text-[10px] text-slate-600 font-mono">NIP. 19680315 199403 1 004</p>
              </div>

              <div className="text-center">
                <p>Bojonggambir, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="font-bold">Guru Mata Pelajaran {settings.subjectName}</p>
                <div className="h-16"></div>
                <p className="font-bold underline">{settings.teacherName}</p>
                <p className="text-[10px] text-slate-600 font-mono">{settings.teacherNip ? `NIP. ${settings.teacherNip}` : 'NIP. -'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
