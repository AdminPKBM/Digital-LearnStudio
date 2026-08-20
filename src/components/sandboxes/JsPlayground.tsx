import React, { useState } from 'react';
import { Play, Code2, RotateCcw, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const JS_SNIPPETS = [
  {
    title: 'Kalkulator XP & Level',
    code: `// Menghitung XP dan Level Siswa Informatika
function hitungLevelSiswa(xp) {
  if (xp < 150) return "Novice";
  if (xp < 350) return "Explorer";
  if (xp < 600) return "Learner";
  return "Informatics Master";
}

let xpSiswa = 450;
let level = hitungLevelSiswa(xpSiswa);

console.log("Total XP:", xpSiswa);
console.log("Gelar Siswa:", level);`,
  },
  {
    title: 'Array & Loop Nilai Ujian',
    code: `// Mengolah Nilai Kelas Informatika
const nilaiSiswa = [85, 90, 78, 92, 88];
let total = 0;

for (let i = 0; i < nilaiSiswa.length; i++) {
  console.log(\`Siswa \${i + 1} = \${nilaiSiswa[i]}\`);
  total += nilaiSiswa[i];
}

let rataRata = total / nilaiSiswa.length;
console.log("Rata-rata Kelas:", rataRata);`,
  },
];

export const JsPlayground: React.FC = () => {
  const { addXP } = useApp();
  const [code, setCode] = useState<string>(JS_SNIPPETS[0].code);
  const [logs, setLogs] = useState<string[]>([]);

  const runJavaScript = () => {
    setLogs([]);
    const capturedLogs: string[] = [];

    // Safe Console override
    const customConsole = {
      log: (...args: any[]) => {
        capturedLogs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
      },
      error: (...args: any[]) => {
        capturedLogs.push(`❌ ERROR: ${args.join(' ')}`);
      },
    };

    try {
      const runFn = new Function('console', code);
      runFn(customConsole);
      capturedLogs.push('⚡ Program berhasil dieksekusi tanpa error.');
      // Unlock badge Coding Beginner
      addXP(15, 'Run JS Code Playground');
    } catch (err: any) {
      capturedLogs.push(`❌ SINTAKS ERROR: ${err.message}`);
    }

    setLogs(capturedLogs);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="p-2 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30">3</span>
            JavaScript Code Playground
          </h3>
          <p className="text-sm text-slate-400">Tulis dan jalankan kode JavaScript secara langsung di browser.</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            onChange={(e) => setCode(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs px-3 py-2 rounded-xl"
          >
            {JS_SNIPPETS.map((s, idx) => (
              <option key={idx} value={s.code}>
                Snippet: {s.title}
              </option>
            ))}
          </select>

          <button
            onClick={runJavaScript}
            className="flex items-center gap-2 bg-rose-500 hover:bg-rose-400 text-white font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-rose-500/20 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            Jalankan Kode JS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2">EDITOR JAVASCRIPT</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-80 bg-slate-950 border border-slate-800 text-rose-300 font-mono text-sm p-4 rounded-xl focus:outline-none focus:border-rose-500/50 leading-relaxed"
            spellCheck={false}
          />
        </div>

        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col h-80">
          <label className="block text-xs font-semibold text-slate-400 mb-2">OUTPUT KONSOL BROWSER</label>
          <div className="flex-1 font-mono text-xs space-y-2 overflow-y-auto p-3 bg-slate-900/80 rounded-lg border border-slate-800">
            {logs.length === 0 ? (
              <div className="text-slate-600 text-center py-12">Klik "Jalankan Kode JS" untuk melihat hasil.</div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="text-rose-300 border-b border-slate-800/40 pb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
