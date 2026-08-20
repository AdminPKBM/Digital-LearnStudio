import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, X, Check, RotateCcw, AlertTriangle, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { GradeWeights } from '../../types';

interface GradeWeightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeights: GradeWeights;
  onSave: (newWeights: GradeWeights) => void;
}

export const GradeWeightsModal: React.FC<GradeWeightsModalProps> = ({
  isOpen,
  onClose,
  currentWeights,
  onSave,
}) => {
  const [form, setForm] = useState<GradeWeights>(currentWeights);

  useEffect(() => {
    setForm(currentWeights);
  }, [currentWeights, isOpen]);

  if (!isOpen) return null;

  const totalWeight =
    (Number(form.harian) || 0) +
    (Number(form.tugas) || 0) +
    (Number(form.kuis) || 0) +
    (Number(form.ulangan) || 0) +
    (Number(form.praktik) || 0) +
    (Number(form.proyek) || 0) +
    (Number(form.ujian) || 0);

  const isExact100 = totalWeight === 100;

  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case 'kurikulum_merdeka':
        setForm({
          harian: 20,
          tugas: 20,
          kuis: 15,
          ulangan: 15,
          praktik: 15,
          proyek: 10,
          ujian: 5,
          kkm: form.kkm || 75,
        });
        break;
      case 'fokus_praktik':
        setForm({
          harian: 15,
          tugas: 15,
          kuis: 10,
          ulangan: 10,
          praktik: 25,
          proyek: 15,
          ujian: 10,
          kkm: form.kkm || 75,
        });
        break;
      case 'teori_seimbang':
        setForm({
          harian: 25,
          tugas: 20,
          kuis: 15,
          ulangan: 20,
          praktik: 10,
          proyek: 10,
          ujian: 0,
          kkm: form.kkm || 75,
        });
        break;
      case 'standar_sekolah':
        setForm({
          harian: 20,
          tugas: 25,
          kuis: 15,
          ulangan: 20,
          praktik: 10,
          proyek: 10,
          ujian: 0,
          kkm: form.kkm || 75,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      harian: Number(form.harian) || 0,
      tugas: Number(form.tugas) || 0,
      kuis: Number(form.kuis) || 0,
      ulangan: Number(form.ulangan) || 0,
      praktik: Number(form.praktik) || 0,
      proyek: Number(form.proyek) || 0,
      ujian: Number(form.ujian) || 0,
      kkm: Number(form.kkm) || 75,
    });
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
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Pengaturan Bobot Penilaian & KKM
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sesuaikan proporsi persentase komponen penilaian untuk kalkulasi Nilai Akhir semester.
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

        {/* Quick Presets */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Preset Rekomendasi Kurikulum SMK</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => applyPreset('kurikulum_merdeka')}
              className="p-2 rounded-xl text-left border border-blue-200 dark:border-blue-800/60 bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-100/70 transition text-xs font-medium text-blue-900 dark:text-blue-200"
            >
              <div className="font-bold">Merdeka SMK</div>
              <div className="text-[10px] text-blue-700 dark:text-blue-400">Praktik 15%, Harian 20%</div>
            </button>
            <button
              type="button"
              onClick={() => applyPreset('fokus_praktik')}
              className="p-2 rounded-xl text-left border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/30 hover:bg-emerald-100/70 transition text-xs font-medium text-emerald-900 dark:text-emerald-200"
            >
              <div className="font-bold">Fokus Praktik</div>
              <div className="text-[10px] text-emerald-700 dark:text-emerald-400">Praktik 25%, Proyek 15%</div>
            </button>
            <button
              type="button"
              onClick={() => applyPreset('teori_seimbang')}
              className="p-2 rounded-xl text-left border border-purple-200 dark:border-purple-800/60 bg-purple-50/50 dark:bg-purple-950/30 hover:bg-purple-100/70 transition text-xs font-medium text-purple-900 dark:text-purple-200"
            >
              <div className="font-bold">Teori & Kuis</div>
              <div className="text-[10px] text-purple-700 dark:text-purple-400">Harian 25%, UH 20%</div>
            </button>
            <button
              type="button"
              onClick={() => applyPreset('standar_sekolah')}
              className="p-2 rounded-xl text-left border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 transition text-xs font-medium text-slate-800 dark:text-slate-200"
            >
              <div className="font-bold">Standar Umum</div>
              <div className="text-[10px] text-slate-500">Tugas 25%, Harian 20%</div>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Sliders and Inputs */}
          <div className="space-y-3.5 max-h-[46vh] overflow-y-auto pr-1">
            {/* 1. Nilai Harian */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                    Bobot Nilai Harian (NH)
                  </span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{form.harian}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={form.harian}
                  onChange={(e) => setForm({ ...form, harian: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={form.harian}
                onChange={(e) => setForm({ ...form, harian: Number(e.target.value) })}
                className="w-16 p-2 text-center text-xs font-bold font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white"
              />
            </div>

            {/* 2. Tugas */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    Bobot Nilai Tugas
                  </span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">{form.tugas}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={form.tugas}
                  onChange={(e) => setForm({ ...form, tugas: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={form.tugas}
                onChange={(e) => setForm({ ...form, tugas: Number(e.target.value) })}
                className="w-16 p-2 text-center text-xs font-bold font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white"
              />
            </div>

            {/* 3. Kuis */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                    Bobot Nilai Kuis
                  </span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">{form.kuis}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={form.kuis}
                  onChange={(e) => setForm({ ...form, kuis: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={form.kuis}
                onChange={(e) => setForm({ ...form, kuis: Number(e.target.value) })}
                className="w-16 p-2 text-center text-xs font-bold font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white"
              />
            </div>

            {/* 4. Ulangan Sumatif */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>
                    Bobot Ulangan Harian (UH / Asesmen Sumatif)
                  </span>
                  <span className="font-mono text-purple-600 dark:text-purple-400">{form.ulangan}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={form.ulangan}
                  onChange={(e) => setForm({ ...form, ulangan: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={form.ulangan}
                onChange={(e) => setForm({ ...form, ulangan: Number(e.target.value) })}
                className="w-16 p-2 text-center text-xs font-bold font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white"
              />
            </div>

            {/* 5. Praktik */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                    Bobot Penilaian Praktik
                  </span>
                  <span className="font-mono text-rose-600 dark:text-rose-400">{form.praktik}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={form.praktik}
                  onChange={(e) => setForm({ ...form, praktik: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={form.praktik}
                onChange={(e) => setForm({ ...form, praktik: Number(e.target.value) })}
                className="w-16 p-2 text-center text-xs font-bold font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white"
              />
            </div>

            {/* 6. Proyek */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
                    Bobot Penilaian Proyek
                  </span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">{form.proyek}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={form.proyek}
                  onChange={(e) => setForm({ ...form, proyek: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={form.proyek}
                onChange={(e) => setForm({ ...form, proyek: Number(e.target.value) })}
                className="w-16 p-2 text-center text-xs font-bold font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white"
              />
            </div>

            {/* 7. Ujian Praktik */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span>
                    Bobot Ujian Praktik / Ujian Akhir
                  </span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400">{form.ujian}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={form.ujian}
                  onChange={(e) => setForm({ ...form, ujian: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={form.ujian}
                onChange={(e) => setForm({ ...form, ujian: Number(e.target.value) })}
                className="w-16 p-2 text-center text-xs font-bold font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white"
              />
            </div>

            {/* KKM Input */}
            <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800/50 flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-blue-950 dark:text-blue-200 block">
                  Kriteria Ketuntasan Minimal (KKM)
                </label>
                <p className="text-[11px] text-blue-700 dark:text-blue-300">
                  Batas minimum nilai untuk status tuntas (Rekomendasi SMK: 75)
                </p>
              </div>
              <input
                type="number"
                min="50"
                max="95"
                value={form.kkm}
                onChange={(e) => setForm({ ...form, kkm: Number(e.target.value) })}
                className="w-16 p-2 text-center text-sm font-extrabold font-mono bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-700 rounded-xl text-blue-700 dark:text-blue-300"
                required
              />
            </div>
          </div>

          {/* Total Weight Status Bar */}
          <div
            className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
              isExact100
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {isExact100 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              )}
              <span>
                {isExact100
                  ? 'Total bobot tepat 100% (Sempurna)'
                  : `Total bobot saat ini ${totalWeight}% (Harus sama dengan 100%)`}
              </span>
            </div>
            <span className="font-mono text-sm font-bold">{totalWeight}%</span>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!isExact100}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition ${
                isExact100
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 cursor-pointer'
                  : 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Simpan Konfigurasi Bobot</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
