import React, { useState } from 'react';
import { Play, Code, CheckCircle, RefreshCw } from 'lucide-react';

const SAMPLE_TEMPLATES = [
  {
    name: 'Hitung Rata-Rata Nilai',
    code: `START
  INPUT nilai1 = 80
  INPUT nilai2 = 90
  INPUT nilai3 = 85
  
  SET total = nilai1 + nilai2 + nilai3
  SET rata_rata = total / 3
  
  PRINT "Total Nilai: " + total
  PRINT "Rata-Rata: " + rata_rata
  
  IF rata_rata >= 75 THEN
    PRINT "Hasil: KELAS PASSED"
  ELSE
    PRINT "Hasil: REMEDIAL"
  ENDIF
END`,
  },
  {
    name: 'Perulangan WHILE',
    code: `START
  SET counter = 1
  
  WHILE counter <= 5 DO
    PRINT "Siswa Aktif Ke-" + counter
    SET counter = counter + 1
  ENDWHILE
  
  PRINT "Selesai Absensi!"
END`,
  },
];

export const PseudocodePlayground: React.FC = () => {
  const [code, setCode] = useState<string>(SAMPLE_TEMPLATES[0].code);
  const [outputLogs, setOutputLogs] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const runPseudocode = () => {
    setIsExecuting(true);
    setOutputLogs(['▶ Memulai intepretasi Pseudocode...']);

    setTimeout(() => {
      const lines = code.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
      const logs: string[] = ['▶ Memulai intepretasi Pseudocode...'];
      const vars: Record<string, any> = {};

      for (let line of lines) {
        if (line.startsWith('PRINT')) {
          let str = line.replace('PRINT', '').trim();
          if (str.startsWith('"') && str.endsWith('"')) {
            logs.push(str.slice(1, -1));
          } else if (str.includes('+')) {
            const parts = str.split('+').map((p) => p.trim());
            let res = '';
            for (let p of parts) {
              if (p.startsWith('"') && p.endsWith('"')) {
                res += p.slice(1, -1);
              } else if (vars[p] !== undefined) {
                res += vars[p];
              } else {
                res += p;
              }
            }
            logs.push(res);
          } else if (vars[str] !== undefined) {
            logs.push(String(vars[str]));
          }
        } else if (line.startsWith('INPUT') || line.startsWith('SET')) {
          const clean = line.replace('INPUT', '').replace('SET', '').trim();
          if (clean.includes('=')) {
            const [varName, expr] = clean.split('=').map((s) => s.trim());
            if (expr.includes('+')) {
              const [a, b] = expr.split('+').map((s) => s.trim());
              const valA = Number(vars[a] ?? a);
              const valB = Number(vars[b] ?? b);
              vars[varName] = valA + valB;
            } else if (expr.includes('/')) {
              const [a, b] = expr.split('/').map((s) => s.trim());
              const valA = Number(vars[a] ?? a);
              const valB = Number(vars[b] ?? b);
              vars[varName] = Math.round((valA / valB) * 10) / 10;
            } else {
              vars[varName] = isNaN(Number(expr)) ? expr : Number(expr);
            }
          }
        }
      }

      logs.push('✔ Eksekusi selesai tanpa error.');
      setOutputLogs(logs);
      setIsExecuting(false);
    }, 600);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">2</span>
            Pseudocode Playground
          </h3>
          <p className="text-sm text-slate-400">Tulis instruksi Pseudocode dan simulasikan jalannya algoritma.</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            onChange={(e) => setCode(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs px-3 py-2 rounded-xl"
          >
            {SAMPLE_TEMPLATES.map((t, idx) => (
              <option key={idx} value={t.code}>
                Template: {t.name}
              </option>
            ))}
          </select>

          <button
            onClick={runPseudocode}
            disabled={isExecuting}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            Jalankan Pseudocode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2">EDITOR PSEUDOCODE</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-80 bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-sm p-4 rounded-xl focus:outline-none focus:border-emerald-500/50 leading-relaxed"
            spellCheck={false}
          />
        </div>

        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col h-80">
          <label className="block text-xs font-semibold text-slate-400 mb-2">OUTPUT KONSOL</label>
          <div className="flex-1 font-mono text-xs text-slate-200 space-y-2 overflow-y-auto p-3 bg-slate-900/60 rounded-lg border border-slate-800/80">
            {outputLogs.map((log, idx) => (
              <div key={idx} className="text-emerald-400 border-b border-slate-800/40 pb-1">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
