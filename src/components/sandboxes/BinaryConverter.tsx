import React, { useState } from 'react';
import { Binary, RefreshCw } from 'lucide-react';

export const BinaryConverter: React.FC = () => {
  const [bits, setBits] = useState<number[]>([1, 0, 1, 0, 1, 1, 0, 0]); // 8 bits
  const [textInput, setTextInput] = useState<string>('INF');

  const toggleBit = (index: number) => {
    const nextBits = [...bits];
    nextBits[index] = nextBits[index] === 1 ? 0 : 1;
    setBits(nextBits);
  };

  const getDecimalValue = () => {
    return bits.reduce((acc, bit, idx) => acc + bit * Math.pow(2, bits.length - 1 - idx), 0);
  };

  const textToBinary = (text: string) => {
    return text
      .split('')
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">4</span>
            Binary Bit Converter
          </h3>
          <p className="text-sm text-slate-400">Tekan saklar bit untuk memahami logika nilai biner 8-bit dan teks ASCII.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Interactive 8-Bit Toggler */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
          <label className="block text-xs font-semibold text-slate-400 mb-4">TOGGLE SAKLAR BINER 8-BIT</label>
          <div className="grid grid-cols-8 gap-2 mb-6">
            {bits.map((bit, idx) => {
              const weight = Math.pow(2, bits.length - 1 - idx);
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-slate-500 font-mono">{weight}</span>
                  <button
                    onClick={() => toggleBit(idx)}
                    className={`w-full py-3 rounded-xl font-mono text-lg font-bold border transition cursor-pointer ${
                      bit === 1
                        ? 'bg-blue-500 text-slate-950 border-blue-400 shadow-lg shadow-blue-500/30 scale-105'
                        : 'bg-slate-900 text-slate-600 border-slate-800'
                    }`}
                  >
                    {bit}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400 text-sm">Nilai Desimal:</span>
            <span className="text-3xl font-mono font-extrabold text-blue-400">{getDecimalValue()}</span>
          </div>
        </div>

        {/* Text ASCII to Binary Converter */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">KONVERSI TEKS KE BINER ASCII</label>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Ketik teks di sini..."
              className="w-full bg-slate-900 border border-slate-700 text-white font-mono p-3 rounded-xl mb-4 focus:outline-none focus:border-blue-500"
              maxLength={20}
            />
          </div>

          <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
            <span className="block text-xs text-slate-400 mb-1">Kode Biner ASCII:</span>
            <div className="font-mono text-xs text-cyan-300 break-all leading-relaxed max-h-24 overflow-y-auto">
              {textToBinary(textInput) || '...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
