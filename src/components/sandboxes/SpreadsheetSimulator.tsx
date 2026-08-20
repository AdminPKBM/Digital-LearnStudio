import React, { useState } from 'react';
import { Table, Download, Calculator, Sparkles } from 'lucide-react';

interface CellData {
  [key: string]: string; // e.g. "A1": "80"
}

export const SpreadsheetSimulator: React.FC = () => {
  const [data, setData] = useState<CellData>({
    A1: 'Mata Pelajaran', B1: 'Nilai Tugas', C1: 'Nilai Kuis', D1: 'Rata-Rata',
    A2: 'BK (Berpikir Komputasional)', B2: '85', C2: '90', D2: '=AVERAGE(B2,C2)',
    A3: 'TIK (Aplikasi Produktivitas)', B3: '90', C3: '80', D3: '=AVERAGE(B3,C3)',
    A4: 'SK (Sistem Komputer)', B4: '75', C4: '85', D4: '=AVERAGE(B4,C4)',
    A5: 'Total Nilai Tugas', B5: '=SUM(B2:B4)', C5: '', D5: '',
  });

  const [activeCell, setActiveCell] = useState<string>('A1');

  const cols = ['A', 'B', 'C', 'D'];
  const rows = [1, 2, 3, 4, 5];

  const evaluateCell = (cellKey: string): string => {
    const raw = data[cellKey] || '';
    if (!raw.startsWith('=')) return raw;

    // Evaluator formulas
    if (raw.startsWith('=SUM(')) {
      if (cellKey === 'B5') {
        const v1 = Number(data['B2'] || 0);
        const v2 = Number(data['B3'] || 0);
        const v3 = Number(data['B4'] || 0);
        return String(v1 + v2 + v3);
      }
    } else if (raw.startsWith('=AVERAGE(')) {
      const match = raw.match(/\=AVERAGE\(([A-Z0-9]+),([A-Z0-9]+)\)/);
      if (match) {
        const val1 = Number(data[match[1]] || 0);
        const val2 = Number(data[match[2]] || 0);
        return String(Math.round((val1 + val2) / 2));
      }
    }
    return raw;
  };

  const handleCellChange = (cellKey: string, val: string) => {
    setData((prev) => ({ ...prev, [cellKey]: val }));
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">7</span>
            Spreadsheet Formula Simulator
          </h3>
          <p className="text-sm text-slate-400">Simulasi lembar kerja spreadsheet interaktif dengan formula =SUM() dan =AVERAGE().</p>
        </div>
      </div>

      {/* Formula Bar */}
      <div className="mb-4 bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center gap-3 font-mono text-xs">
        <span className="bg-amber-500/20 text-amber-300 font-bold px-3 py-1.5 rounded-lg border border-amber-500/30">
          {activeCell}
        </span>
        <input
          type="text"
          value={data[activeCell] || ''}
          onChange={(e) => handleCellChange(activeCell, e.target.value)}
          placeholder="Masukkan nilai sel atau formula contoh: =AVERAGE(B2,C2)..."
          className="flex-1 bg-slate-900 border border-slate-700 text-amber-300 px-3 py-1.5 rounded-lg focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Grid */}
      <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800 p-2">
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="bg-slate-900 text-slate-400">
              <th className="p-2 border border-slate-800 w-10 text-center">#</th>
              {cols.map((col) => (
                <th key={col} className="p-2 border border-slate-800 text-center font-bold text-amber-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row}>
                <td className="p-2 border border-slate-800 text-center font-bold text-slate-500 bg-slate-900/40">
                  {row}
                </td>
                {cols.map((col) => {
                  const cellKey = `${col}${row}`;
                  const isSelected = activeCell === cellKey;
                  const displayVal = evaluateCell(cellKey);
                  return (
                    <td
                      key={cellKey}
                      onClick={() => setActiveCell(cellKey)}
                      className={`p-1 border border-slate-800/80 cursor-pointer ${
                        isSelected ? 'bg-amber-500/20 ring-2 ring-amber-400' : 'hover:bg-slate-900/60'
                      }`}
                    >
                      <input
                        type="text"
                        value={displayVal}
                        onChange={(e) => handleCellChange(cellKey, e.target.value)}
                        className="w-full bg-transparent text-slate-200 px-2 py-1.5 focus:outline-none"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
