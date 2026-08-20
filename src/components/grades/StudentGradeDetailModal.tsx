import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Printer,
  Award,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Edit2,
  Check,
  TrendingUp,
  User,
  GraduationCap,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { StudentProfile, GradeItem, StudentGradeRecord, GradeWeights, StudentCalculatedGrade } from '../../types';

interface StudentGradeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile | null;
  gradeRecord: StudentGradeRecord | null;
  gradeItems: GradeItem[];
  gradeWeights: GradeWeights;
  calculatedGrade: StudentCalculatedGrade;
  onSaveTeacherNotes: (studentId: string, notes: string) => void;
}

export const StudentGradeDetailModal: React.FC<StudentGradeDetailModalProps> = ({
  isOpen,
  onClose,
  student,
  gradeRecord,
  gradeItems,
  gradeWeights,
  calculatedGrade,
  onSaveTeacherNotes,
}) => {
  if (!isOpen || !student) return null;

  const [teacherNotes, setTeacherNotes] = useState(gradeRecord?.teacherNotes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [activeTab, setActiveTab] = useState<'ALL' | 'HARIAN' | 'TUGAS' | 'KUIS' | 'ULANGAN' | 'PRAKTIK' | 'PROYEK' | 'UJIAN'>('ALL');

  const scores = gradeRecord?.scores || {};
  const statusFlags = gradeRecord?.statusFlags || {};
  const itemNotes = gradeRecord?.itemNotes || {};

  const handleSaveNotes = () => {
    onSaveTeacherNotes(student.id, teacherNotes);
    setIsEditingNotes(false);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter items
  const relevantItems = gradeItems.filter(
    (gi) =>
      (!gi.targetClass || gi.targetClass === 'ALL' || gi.targetClass === student.classGroup) &&
      (activeTab === 'ALL' || gi.category === activeTab)
  );

  const getPredicateBadge = (predicate: string) => {
    switch (predicate) {
      case 'A':
        return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'B':
        return 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'C':
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      default:
        return 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800';
    }
  };

  const categoryMeta: Record<string, { label: string; bg: string; text: string; weight: number }> = {
    HARIAN: { label: 'Nilai Harian (NH)', bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-600 dark:text-blue-400', weight: gradeWeights.harian || 0 },
    TUGAS: { label: 'Tugas', bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-600 dark:text-emerald-400', weight: gradeWeights.tugas || 0 },
    KUIS: { label: 'Kuis', bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-600 dark:text-amber-400', weight: gradeWeights.kuis || 0 },
    ULANGAN: { label: 'Ulangan (UH)', bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-600 dark:text-purple-400', weight: gradeWeights.ulangan || 0 },
    PRAKTIK: { label: 'Praktik', bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-600 dark:text-rose-400', weight: gradeWeights.praktik || 0 },
    PROYEK: { label: 'Proyek', bg: 'bg-indigo-50 dark:bg-indigo-950/40', text: 'text-indigo-600 dark:text-indigo-400', weight: gradeWeights.proyek || 0 },
    UJIAN: { label: 'Ujian Praktik', bg: 'bg-cyan-50 dark:bg-cyan-950/40', text: 'text-cyan-600 dark:text-cyan-400', weight: gradeWeights.ujian || 0 },
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 max-w-4xl w-full shadow-2xl space-y-6 animate-fadeIn max-h-[90vh] overflow-y-auto print:max-h-none print:border-none print:shadow-none"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 rounded-2xl text-blue-600 dark:text-blue-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Rapor & Rekap Penilaian Individu Siswa
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Informatika Fase E SMK Kelas X • Tahun Pelajaran 2026/2027 • Semester 1
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Rapor</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Student Profile Card (Printable) */}
        <div className="p-5 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-800/60 dark:to-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {student.name}
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {student.classGroup}
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 space-x-3">
                <span>NIS: <strong className="font-mono">{student.nis}</strong></span>
                <span>•</span>
                <span>Mata Pelajaran: <strong>Informatika</strong></span>
                <span>•</span>
                <span>KKM: <strong>{gradeWeights.kkm || 75}</strong></span>
              </div>
            </div>
          </div>

          {/* Final Score & Status Badges */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Nilai Akhir</div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {calculatedGrade.finalGrade.toFixed(1)}
              </div>
            </div>
            <div className={`px-3 py-1.5 rounded-xl border text-center font-bold ${getPredicateBadge(calculatedGrade.predicate)}`}>
              <div className="text-[10px] leading-tight">Predikat</div>
              <div className="text-lg leading-tight font-black">{calculatedGrade.predicate}</div>
            </div>
            <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold ${
              calculatedGrade.isPassed
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
            }`}>
              {calculatedGrade.isPassed ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{calculatedGrade.isPassed ? 'TUNTAS' : 'REMEDIAL'}</span>
            </div>
          </div>
        </div>

        {/* Category Averages Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {Object.entries(categoryMeta).map(([catKey, meta]) => {
            const avg = calculatedGrade.categoryAverages[catKey as any];
            return (
              <div
                key={catKey}
                className={`p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-center ${meta.bg}`}
              >
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate">
                  {meta.label.split('(')[0]}
                </div>
                <div className={`text-base font-extrabold font-mono mt-0.5 ${meta.text}`}>
                  {avg !== null && avg !== undefined ? avg.toFixed(1) : '-'}
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5">
                  Bobot {meta.weight}%
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter Tabs for Items */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100 dark:border-slate-800 print:hidden text-xs">
          {[
            { id: 'ALL', label: 'Semua Penilaian' },
            { id: 'HARIAN', label: 'Nilai Harian' },
            { id: 'TUGAS', label: 'Tugas' },
            { id: 'KUIS', label: 'Kuis' },
            { id: 'ULANGAN', label: 'Ulangan (UH)' },
            { id: 'PRAKTIK', label: 'Praktik' },
            { id: 'PROYEK', label: 'Proyek' },
            { id: 'UJIAN', label: 'Ujian Praktik' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Detailed Assessment Table */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="max-h-[35vh] overflow-y-auto print:max-h-none">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider z-10">
                <tr>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700 w-12 text-center">No</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700 w-24">Kode</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Nama Penilaian & Materi</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700 w-24 text-center">Tanggal</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700 w-24 text-center">Skor / Nilai</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700 w-28 text-center">Status</th>
                  <th className="p-3 border-b border-slate-200 dark:border-slate-700">Catatan / Umpan Balik</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
                {relevantItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-slate-400 text-xs">
                      Tidak ada kolom penilaian pada kategori ini.
                    </td>
                  </tr>
                ) : (
                  relevantItems.map((item, idx) => {
                    const score = scores[item.id];
                    const flag = statusFlags[item.id];
                    const note = itemNotes[item.id];
                    const hasScore = score !== undefined && score !== null && typeof score === 'number';

                    let statusBadge = (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
                        Belum Dinilai
                      </span>
                    );

                    if (flag === 'TMS') {
                      statusBadge = (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                          TMS (Belum Kumpul)
                        </span>
                      );
                    } else if (flag === 'TM') {
                      statusBadge = (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                          TM (Tidak Hadir)
                        </span>
                      );
                    } else if (hasScore) {
                      const isPassing = score >= (gradeWeights.kkm || 75);
                      statusBadge = (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isPassing
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                              : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                          }`}
                        >
                          {isPassing ? 'Tuntas' : 'Di Bawah KKM'}
                        </span>
                      );
                    }

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                        <td className="p-3 font-bold font-mono text-blue-600 dark:text-blue-400">
                          {item.code}
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-slate-800 dark:text-slate-200">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {item.topic}
                          </div>
                        </td>
                        <td className="p-3 text-center text-slate-500 font-mono text-[11px]">
                          {item.date || '-'}
                        </td>
                        <td className="p-3 text-center">
                          {hasScore ? (
                            <span className="font-extrabold font-mono text-sm text-slate-900 dark:text-white">
                              {score}
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono text-xs">-</span>
                          )}
                        </td>
                        <td className="p-3 text-center">{statusBadge}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-400 italic text-[11px]">
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

        {/* Teacher Notes & Recommendations */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Catatan Guru & Rekomendasi Perkembangan Siswa
              </span>
            </div>
            {!isEditingNotes ? (
              <button
                onClick={() => setIsEditingNotes(true)}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline print:hidden"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Catatan</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditingNotes(false)}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Simpan</span>
                </button>
              </div>
            )}
          </div>

          {isEditingNotes ? (
            <textarea
              value={teacherNotes}
              onChange={(e) => setTeacherNotes(e.target.value)}
              placeholder="Tuliskan catatan kemajuan belajar, aspek yang sudah baik, serta saran bimbingan tindak lanjut..."
              className="w-full h-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-800 dark:text-white"
            />
          ) : (
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              {teacherNotes ||
                'Siswa menunjukkan ketertarikan yang baik dalam pembelajaran Informatika. Pertahankan konsistensi dalam penyelesaian tugas praktik pemrograman dan perluas eksplorasi pada topik komputasional berpikir.'}
            </p>
          )}
        </div>

        {/* Footer info (Print signature block) */}
        <div className="hidden print:grid grid-cols-2 pt-10 text-xs text-slate-800">
          <div>
            <p>Mengetahui,</p>
            <p className="font-bold mt-1">Orang Tua / Wali Siswa</p>
            <div className="h-16"></div>
            <p className="border-b border-slate-400 w-48"></p>
          </div>
          <div className="text-right">
            <p>Guru Mata Pelajaran Informatika,</p>
            <p className="font-bold mt-1">SMK Informatika Fase E</p>
            <div className="h-16"></div>
            <p className="font-bold underline">Guru Pengampu, S.Kom., M.Pd.</p>
            <p>NIP. 19880512 201402 1 002</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
