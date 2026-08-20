import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle2,
  Users,
  Percent,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  StudentProfile,
  GradeItem,
  StudentGradeRecord,
  GradeWeights,
  StudentCalculatedGrade,
} from '../../types';

interface GradeStatisticsViewProps {
  selectedClass: string;
  students: StudentProfile[];
  gradeItems: GradeItem[];
  studentGrades: StudentGradeRecord[];
  gradeWeights: GradeWeights;
  calculateStudentFinalGrade: (studentId: string) => StudentCalculatedGrade;
  onOpenStudentDetail: (student: StudentProfile) => void;
}

export const GradeStatisticsView: React.FC<GradeStatisticsViewProps> = ({
  selectedClass,
  students,
  gradeItems,
  studentGrades,
  gradeWeights,
  calculateStudentFinalGrade,
  onOpenStudentDetail,
}) => {
  // Filter students by selectedClass
  const filteredStudents = useMemo(() => {
    if (selectedClass === 'ALL') return students;
    return students.filter((s) => s.classGroup === selectedClass);
  }, [students, selectedClass]);

  // Compute calculated grades for all students
  const studentResults = useMemo(() => {
    return filteredStudents.map((s) => ({
      student: s,
      calc: calculateStudentFinalGrade(s.id),
    }));
  }, [filteredStudents, calculateStudentFinalGrade]);

  const kkm = gradeWeights.kkm || 75;

  // Class Metrics
  const stats = useMemo(() => {
    const totalCount = studentResults.length;
    if (totalCount === 0) {
      return {
        avg: 0,
        highest: 0,
        lowest: 0,
        passedCount: 0,
        remedialCount: 0,
        passRate: 0,
        categoryAverages: {} as Record<string, number>,
        predicateCounts: { A: 0, B: 0, C: 0, D: 0 },
      };
    }

    const scores = studentResults.map((sr) => sr.calc.finalGrade);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = Math.round((sum / totalCount) * 10) / 10;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);

    const passedCount = studentResults.filter((sr) => sr.calc.isPassed).length;
    const remedialCount = totalCount - passedCount;
    const passRate = Math.round((passedCount / totalCount) * 100);

    const predicateCounts = {
      A: studentResults.filter((sr) => sr.calc.predicate === 'A').length,
      B: studentResults.filter((sr) => sr.calc.predicate === 'B').length,
      C: studentResults.filter((sr) => sr.calc.predicate === 'C').length,
      D: studentResults.filter((sr) => sr.calc.predicate === 'D').length,
    };

    // Calculate Category Class Averages
    const cats = ['HARIAN', 'TUGAS', 'KUIS', 'ULANGAN', 'PRAKTIK', 'PROYEK', 'UJIAN'] as const;
    const categoryAverages: Record<string, number> = {};

    cats.forEach((cat) => {
      const validCatScores: number[] = [];
      studentResults.forEach((sr) => {
        const val = sr.calc.categoryAverages[cat];
        if (val !== null && val !== undefined) {
          validCatScores.push(val);
        }
      });
      if (validCatScores.length > 0) {
        categoryAverages[cat] =
          Math.round((validCatScores.reduce((a, b) => a + b, 0) / validCatScores.length) * 10) / 10;
      } else {
        categoryAverages[cat] = 0;
      }
    });

    return {
      avg,
      highest,
      lowest,
      passedCount,
      remedialCount,
      passRate,
      categoryAverages,
      predicateCounts,
    };
  }, [studentResults]);

  // Distribution Data for Recharts
  const distributionData = useMemo(() => {
    let under60 = 0;
    let range60to74 = 0;
    let range75to84 = 0;
    let range85to94 = 0;
    let range95to100 = 0;

    studentResults.forEach((sr) => {
      const g = sr.calc.finalGrade;
      if (g < 60) under60++;
      else if (g < 75) range60to74++;
      else if (g < 85) range75to84++;
      else if (g < 95) range85to94++;
      else range95to100++;
    });

    return [
      { range: '< 60 (Perlu Remedial)', count: under60, color: '#f43f5e' },
      { range: '60 - 74 (Di Bawah KKM)', count: range60to74, color: '#fbbf24' },
      { range: '75 - 84 (Cukup / Baik)', count: range75to84, color: '#38bdf8' },
      { range: '85 - 94 (Sangat Baik)', count: range85to94, color: '#3b82f6' },
      { range: '95 - 100 (Istimewa)', count: range95to100, color: '#10b981' },
    ];
  }, [studentResults]);

  // Category comparison data
  const categoryChartData = useMemo(() => {
    return [
      { name: 'Harian', avg: stats.categoryAverages.HARIAN || 0, weight: gradeWeights.harian, fill: '#3b82f6' },
      { name: 'Tugas', avg: stats.categoryAverages.TUGAS || 0, weight: gradeWeights.tugas, fill: '#10b981' },
      { name: 'Kuis', avg: stats.categoryAverages.KUIS || 0, weight: gradeWeights.kuis, fill: '#f59e0b' },
      { name: 'Ulangan', avg: stats.categoryAverages.ULANGAN || 0, weight: gradeWeights.ulangan, fill: '#a855f7' },
      { name: 'Praktik', avg: stats.categoryAverages.PRAKTIK || 0, weight: gradeWeights.praktik, fill: '#f43f5e' },
      { name: 'Proyek', avg: stats.categoryAverages.PROYEK || 0, weight: gradeWeights.proyek, fill: '#6366f1' },
      { name: 'Ujian Praktik', avg: stats.categoryAverages.UJIAN || 0, weight: gradeWeights.ujian, fill: '#06b6d4' },
    ];
  }, [stats.categoryAverages, gradeWeights]);

  // Students requiring remedial
  const remedialStudents = useMemo(() => {
    return studentResults.filter((sr) => !sr.calc.isPassed || sr.calc.finalGrade < kkm);
  }, [studentResults, kkm]);

  return (
    <div className="space-y-6 animate-fadeIn text-xs">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Rata-Rata Kelas */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-[11px]">Rata-rata Kelas</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
            {stats.avg.toFixed(1)}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            KKM Acuan: <strong className="text-slate-600 dark:text-slate-300">{kkm}</strong>
          </div>
        </div>

        {/* Nilai Tertinggi */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-[11px]">Nilai Tertinggi</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {stats.highest > 0 ? stats.highest.toFixed(1) : '-'}
          </div>
          <div className="text-[10px] text-emerald-700 dark:text-emerald-500 mt-1">
            Predikat Tertinggi
          </div>
        </div>

        {/* Nilai Terendah */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-[11px]">Nilai Terendah</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400 mt-1">
            {stats.lowest > 0 ? stats.lowest.toFixed(1) : '-'}
          </div>
          <div className="text-[10px] text-rose-700 dark:text-rose-400 mt-1">
            Perlu Intervensi
          </div>
        </div>

        {/* Siswa Tuntas */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-[11px]">Siswa Tuntas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {stats.passedCount} <span className="text-xs font-normal text-slate-400">/ {studentResults.length}</span>
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
            {stats.passRate}% Ketuntasan
          </div>
        </div>

        {/* Perlu Remedial */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-[11px]">Perlu Remedial</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1">
            {stats.remedialCount} <span className="text-xs font-normal text-slate-400">Siswa</span>
          </div>
          <div className="text-[10px] text-amber-700 dark:text-amber-400 mt-1">
            {100 - stats.passRate}% dari total
          </div>
        </div>

        {/* Total Siswa */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-[11px]">Total Siswa</span>
            <Users className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
            {studentResults.length}
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold mt-1">
            {selectedClass === 'ALL' ? 'Semua Rombel' : selectedClass}
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Distribution Chart */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                Distribusi Sebaran Nilai Siswa
              </h4>
              <p className="text-[11px] text-slate-400">
                Jumlah siswa berdasarkan rentang skor pencapaian kompetensi
              </p>
            </div>
            <span className="px-2 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold rounded-lg text-[10px]">
              {selectedClass}
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="range" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(val: any) => [`${val} Siswa`, 'Jumlah']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px', fontSize: '11px' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Averages Chart */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                Rata-rata per Kategori Penilaian
              </h4>
              <p className="text-[11px] text-slate-400">
                Perbandingan pencapaian capaian pembelajaran pada 7 komponen asesmen
              </p>
            </div>
            <span className="px-2 py-1 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold rounded-lg text-[10px]">
              7 Komponen
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(val: any, name: any, item: any) => [
                    `${val} (Bobot: ${item.payload.weight}%)`,
                    'Rata-rata',
                  ]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px', fontSize: '11px' }}
                />
                <Bar dataKey="avg" radius={[6, 6, 0, 0]}>
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cat-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Remedial Focus & Action List */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-50 dark:bg-rose-950/50 rounded-xl text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                Daftar Siswa Perlu Bimbingan & Program Remedial
              </h4>
              <p className="text-[11px] text-slate-400">
                Siswa dengan Nilai Akhir di bawah KKM ({kkm}) yang memerlukan tindak lanjut
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
            {remedialStudents.length} Siswa
          </span>
        </div>

        {remedialStudents.length === 0 ? (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <div className="font-bold text-emerald-900 dark:text-emerald-200">
              Seluruh Siswa Telah Mencapai KKM!
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Tidak ada siswa yang memerlukan remedial pada kelas / rombel ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {remedialStudents.map(({ student, calc }) => (
              <div
                key={student.id}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-3 hover:border-blue-400 transition"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-white truncate">
                      {student.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                      Skor: {calc.finalGrade.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    NIS: {student.nis} • Kelas: {student.classGroup}
                  </div>

                  {/* Low categories */}
                  <div className="mt-2.5 space-y-1">
                    <span className="text-[10px] text-slate-500 block font-semibold">
                      Fokus Komponen yang Rendah:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(calc.categoryAverages).map(([cat, val]) => {
                        if (val !== null && val < kkm) {
                          return (
                            <span
                              key={cat}
                              className="px-1.5 py-0.5 rounded bg-rose-100/70 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 text-[9px] font-semibold"
                            >
                              {cat}: {val}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenStudentDetail(student)}
                  className="w-full py-1.5 bg-white dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-slate-200 dark:border-slate-600 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  <span>Buka Rapor & Analisis Detail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
