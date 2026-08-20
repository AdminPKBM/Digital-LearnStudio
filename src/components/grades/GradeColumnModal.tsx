import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, X, Check, BookOpen, Calendar, HelpCircle, Layers, FileText } from 'lucide-react';
import { GradeCategory, GradeItem } from '../../types';

interface GradeColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: GradeItem | null;
  defaultCategory?: GradeCategory;
  defaultClass?: string;
  allGradeItems: GradeItem[];
  classes: { id: string; name: string }[];
  onSave: (item: GradeItem) => void;
}

export const GradeColumnModal: React.FC<GradeColumnModalProps> = ({
  isOpen,
  onClose,
  editingItem,
  defaultCategory = 'HARIAN',
  defaultClass = 'ALL',
  allGradeItems,
  classes,
  onSave,
}) => {
  const [category, setCategory] = useState<GradeCategory>(defaultCategory);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [number, setNumber] = useState<number>(1);
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [rubric, setRubric] = useState('');
  const [maxScore, setMaxScore] = useState<number>(100);
  const [weight, setWeight] = useState<number>(1);
  const [targetClass, setTargetClass] = useState('ALL');
  const [semester, setSemester] = useState<'GANJIL' | 'GENAP'>('GANJIL');
  const [academicYear, setAcademicYear] = useState('2026/2027');

  const topicsList = [
    'Pengenalan & 4 Pilar Berpikir Komputasional (BK)',
    'Teknologi Informasi & Integrasi Konten Digital (TIK)',
    'Sistem Komputer & Mekanisme Kerja OS (SK)',
    'Jaringan Komputer & Internet (JKI)',
    'Analisis Data & Pemodelan Spreadsheet (AD)',
    'Algoritma & Pemrograman Dasar Python (AP)',
    'Dampak Sosial Informatika & Etika Digital (DSI)',
    'Praktik Lintas Bidang (PLB) Rekayasa Produk',
  ];

  // Helper to auto generate name & code when category changes
  const applyAutoNaming = (catInput: GradeCategory | string) => {
    const cat: GradeCategory = (['HARIAN', 'TUGAS', 'KUIS', 'ULANGAN', 'PRAKTIK', 'PROYEK', 'UJIAN'].includes(catInput)
      ? catInput
      : 'HARIAN') as GradeCategory;
    const existingInCat = allGradeItems.filter((i) => i.category === cat);
    const nextNum = existingInCat.length + 1;
    setNumber(nextNum);

    const catInfo: Record<GradeCategory, { prefix: string; label: string }> = {
      HARIAN: { prefix: 'NH ', label: `Nilai Harian ${nextNum}` },
      TUGAS: { prefix: 'Tugas ', label: `Tugas ${nextNum}` },
      KUIS: { prefix: 'Kuis ', label: `Kuis ${nextNum}` },
      ULANGAN: { prefix: 'UH ', label: `Ulangan Harian ${nextNum}` },
      PRAKTIK: { prefix: 'Praktik ', label: `Praktik ${nextNum}` },
      PROYEK: { prefix: 'Proyek ', label: `Proyek ${nextNum}` },
      UJIAN: { prefix: 'Ujian Praktik ', label: `Ujian Praktik ${nextNum}` },
    };

    setCode(`${catInfo[cat].prefix}${nextNum}`);
    setName(catInfo[cat].label);
  };

  useEffect(() => {
    if (editingItem) {
      setCategory(editingItem.category);
      setName(editingItem.name);
      setCode(editingItem.code);
      setNumber(editingItem.number || 1);
      setTopic(editingItem.topic || '');
      setDate(editingItem.date || new Date().toISOString().split('T')[0]);
      setDescription(editingItem.description || '');
      setRubric(editingItem.rubric || '');
      setMaxScore(editingItem.maxScore || 100);
      setWeight(editingItem.weight || 1);
      setTargetClass(editingItem.targetClass || 'ALL');
      setSemester(editingItem.semester || 'GANJIL');
      setAcademicYear(editingItem.academicYear || '2026/2027');
    } else {
      setCategory(defaultCategory);
      applyAutoNaming(defaultCategory);
      setTopic('');
      setDate(new Date().toISOString().split('T')[0]);
      setDescription('');
      setRubric('');
      setMaxScore(100);
      setWeight(1);
      setTargetClass(defaultClass);
      setSemester('GANJIL');
      setAcademicYear('2026/2027');
    }
  }, [editingItem, defaultCategory, defaultClass, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (newCat: GradeCategory) => {
    setCategory(newCat);
    if (!editingItem) {
      applyAutoNaming(newCat);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    const item: GradeItem = {
      id: editingItem ? editingItem.id : `gi-${category.toLowerCase()}-${Date.now()}`,
      category,
      code: code.trim(),
      name: name.trim(),
      number: Number(number) || 1,
      topic: topic.trim() || 'Materi Informatika',
      date,
      description: description.trim(),
      rubric: rubric.trim(),
      maxScore: Number(maxScore) || 100,
      weight: Number(weight) || 1,
      targetClass,
      semester,
      academicYear,
      isActive: true,
      createdAt: editingItem?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 max-w-2xl w-full shadow-2xl space-y-6 animate-fadeIn"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 rounded-2xl text-blue-600 dark:text-blue-400">
              {editingItem ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {editingItem ? `Edit Penilaian (${editingItem.code})` : 'Tambah Penilaian Baru'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Atur kolom penilaian: Harian, Tugas, Kuis, Ulangan, Praktik, Proyek, atau Ujian Praktik.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Category & Number */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                JENIS PENILAIAN
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as GradeCategory)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white font-medium"
              >
                <option value="HARIAN">Nilai Harian (NH)</option>
                <option value="TUGAS">Tugas Mandiri / Kelompok</option>
                <option value="KUIS">Kuis Interaktif</option>
                <option value="ULANGAN">Ulangan Harian (UH)</option>
                <option value="PRAKTIK">Penilaian Kinerja / Praktik</option>
                <option value="PROYEK">Penilaian Proyek (PLB)</option>
                <option value="UJIAN">Ujian Praktik / Sumatif</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                KODE SINGKAT (KOLOM)
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="misal: NH 7, Tugas 9"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white font-mono font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                NOMOR KE-
              </label>
              <input
                type="number"
                min="1"
                max="99"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white font-mono"
                required
              />
            </div>
          </div>

          {/* Name / Title */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
              NAMA PENILAIAN
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="misal: Nilai Harian 7 - Pemrograman GUI Python"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white font-semibold"
              required
            />
          </div>

          {/* Topic & Suggestions */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-700 dark:text-slate-300 font-bold">
                MATERI / TUJUAN PEMBELAJARAN
              </label>
              <span className="text-[10px] text-slate-400">Pilih cepat atau tulis manual</span>
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Tuliskan topik materi pembelajaran..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white mb-2"
              required
            />
            {/* Quick Topic Pills */}
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
              {topicsList.map((tp) => (
                <button
                  type="button"
                  key={tp}
                  onClick={() => setTopic(tp)}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-[11px] rounded-lg text-slate-700 dark:text-slate-300 transition"
                >
                  + {tp.split('(')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Date, Class, Semester, Year */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                TANGGAL PELAKSANAAN
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                TARGET KELAS
              </label>
              <select
                value={targetClass}
                onChange={(e) => setTargetClass(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white"
              >
                <option value="ALL">Semua Kelas</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                SEMESTER
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white"
              >
                <option value="GANJIL">Semester Ganjil (1)</option>
                <option value="GENAP">Semester Genap (2)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                TAHUN PELAJARAN
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Description & Rubric */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                DESKRIPSI / INSTRUKSI TUGAS
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Instruksi pengerjaan penilaian bagi siswa..."
                className="w-full h-20 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                RUBRIK PENILAIAN (KHUSUS PRAKTIK/PROYEK)
              </label>
              <textarea
                value={rubric}
                onChange={(e) => setRubric(e.target.value)}
                placeholder="misal: 1. Kerapian (30%), 2. Logika Kode (40%), 3. Presentasi (30%)"
                className="w-full h-20 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{editingItem ? 'Simpan Perubahan' : 'Tambahkan Penilaian'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
