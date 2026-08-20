import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const NumberSystemConverter: React.FC = () => {
  const [decVal, setDecVal] = useState<number>(255);

  const binVal = decVal.toString(2);
  const octVal = decVal.toString(8);
  const hexVal = decVal.toString(16).toUpperCase();

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="p-2 bg-violet-500/20 text-violet-400 rounded-lg border border-violet-500/30">5</span>
            Number System Converter (Sistem Bilangan)
          </h3>
          <p className="text-sm text-slate-400">Konversi otomatis antara Desimal (10), Biner (2), Oktal (8), dan Heksadesimal (16).</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2">MASUKKAN ANGKA DESIMAL (BASIS 10)</label>
          <input
            type="number"
            value={decVal}
            onChange={(e) => setDecVal(Math.max(0, Number(e.target.value)))}
            className="w-full bg-slate-950 border border-slate-700 text-3xl font-mono text-violet-400 p-4 rounded-xl focus:outline-none focus:border-violet-500 font-extrabold"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1 font-semibold">BINER (BASIS 2)</span>
            <div className="font-mono text-xl text-cyan-400 font-bold break-all">{binVal}</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1 font-semibold">OKTAL (BASIS 8)</span>
            <div className="font-mono text-xl text-emerald-400 font-bold break-all">{octVal}</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1 font-semibold">HEKSADESIMAL (BASIS 16)</span>
            <div className="font-mono text-xl text-violet-400 font-bold break-all">0x{hexVal}</div>
          </div>
        </div>

        <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1">
          <div className="font-semibold text-slate-300">Langkah Matematika Pembagian Berulang:</div>
          <div>• Konversi {decVal} ke Biner dilakukan dengan membagi 2 berturut-turut hingga sisa 0 atau 1.</div>
          <div>• Konversi ke Heksadesimal mengelompokkan 4 bit biner (nibble) dari kanan.</div>
        </div>
      </div>
    </div>
  );
};
