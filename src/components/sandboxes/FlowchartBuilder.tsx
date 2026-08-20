import React, { useState } from 'react';
import { Play, RotateCcw, Plus, Trash2, CheckCircle, ArrowRight } from 'lucide-react';

interface NodeItem {
  id: string;
  type: 'terminal' | 'input' | 'process' | 'decision' | 'output';
  label: string;
  nextId?: string;
  yesId?: string;
  noId?: string;
}

export const FlowchartBuilder: React.FC = () => {
  const [nodes, setNodes] = useState<NodeItem[]>([
    { id: '1', type: 'terminal', label: 'START' },
    { id: '2', type: 'input', label: 'Input Nilai Ujian' },
    { id: '3', type: 'decision', label: 'Nilai >= 75?' },
    { id: '4', type: 'process', label: 'Status = "LULUS"' },
    { id: '5', type: 'process', label: 'Status = "REMEDIAL"' },
    { id: '6', type: 'output', label: 'Cetak Status' },
    { id: '7', type: 'terminal', label: 'END' },
  ]);

  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<number>(80);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const runFlowchart = () => {
    setIsRunning(true);
    setExecutionLogs([]);
    let currentId: string | undefined = '1';
    let val = inputValue;
    let logs: string[] = [];

    const stepInterval = setInterval(() => {
      if (!currentId) {
        clearInterval(stepInterval);
        setIsRunning(false);
        setActiveNodeId(null);
        return;
      }

      setActiveNodeId(currentId);
      const currNode = nodes.find((n) => n.id === currentId);

      if (!currNode) {
        clearInterval(stepInterval);
        setIsRunning(false);
        setActiveNodeId(null);
        return;
      }

      if (currNode.type === 'terminal' && currNode.label === 'START') {
        logs.push('▶ Memulai eksekusi Flowchart...');
        currentId = '2';
      } else if (currNode.type === 'input') {
        logs.push(`📥 Menerima Input Nilai = ${val}`);
        currentId = '3';
      } else if (currNode.type === 'decision') {
        const pass = val >= 75;
        logs.push(`❓ Mengevaluasi Kondisi (${val} >= 75): ${pass ? 'YA (LULUS)' : 'TIDAK (REMEDIAL)'}`);
        currentId = pass ? '4' : '5';
      } else if (currNode.id === '4') {
        logs.push('⚙ Menetapkan Status = "LULUS"');
        currentId = '6';
      } else if (currNode.id === '5') {
        logs.push('⚙ Menetapkan Status = "REMEDIAL"');
        currentId = '6';
      } else if (currNode.type === 'output') {
        logs.push(`📤 Menampilkan Output: ${val >= 75 ? 'LULUS 🎉' : 'REMEDIAL ⚠️'}`);
        currentId = '7';
      } else if (currNode.type === 'terminal' && currNode.label === 'END') {
        logs.push('🏁 Flowchart selesai dieksekusi dengan sukses.');
        currentId = undefined;
      }

      setExecutionLogs([...logs]);
    }, 800);
  };

  const getNodeBadgeColor = (type: NodeItem['type']) => {
    switch (type) {
      case 'terminal': return 'bg-cyan-500/20 border-cyan-500 text-cyan-300 rounded-full';
      case 'input': return 'bg-emerald-500/20 border-emerald-500 text-emerald-300 -skew-x-12';
      case 'process': return 'bg-blue-500/20 border-blue-500 text-blue-300 rounded-lg';
      case 'decision': return 'bg-amber-500/20 border-amber-500 text-amber-300 rotate-45 scale-90 rounded-md';
      case 'output': return 'bg-purple-500/20 border-purple-500 text-purple-300 -skew-x-12';
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30">1</span>
            Flowchart Builder & Executor
          </h3>
          <p className="text-sm text-slate-400">Rancang dan jalankan simulasi logika diagram alur secara interaktif.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-sm">
            <span className="text-slate-400">Nilai Test:</span>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              className="w-16 bg-slate-900 border border-slate-700 text-white font-mono px-2 py-1 rounded text-center"
              min={0}
              max={100}
            />
          </div>

          <button
            onClick={runFlowchart}
            disabled={isRunning}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            {isRunning ? 'Menjalankan...' : 'Jalankan Flowchart'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Canvas Nodes */}
        <div className="lg:col-span-7 bg-slate-950/60 rounded-xl p-6 border border-slate-800/80 min-h-[380px] flex flex-col items-center justify-center gap-4 relative overflow-x-auto">
          {nodes.map((node, idx) => {
            const isActive = activeNodeId === node.id;
            return (
              <React.Fragment key={node.id}>
                <div
                  className={`relative px-6 py-3 border text-center transition-all duration-300 font-medium ${getNodeBadgeColor(
                    node.type
                  )} ${isActive ? 'ring-4 ring-cyan-400 scale-110 shadow-lg shadow-cyan-500/40 bg-cyan-500/30' : ''}`}
                >
                  <span className={node.type === 'decision' ? '-rotate-45 block' : ''}>{node.label}</span>
                </div>

                {idx < nodes.length - 1 && node.type !== 'decision' && (
                  <ArrowRight className="w-5 h-5 text-slate-600 rotate-90 my-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Execution Log Output */}
        <div className="lg:col-span-5 bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span>KONSOLE EKSEKUSI LOG</span>
            <button
              onClick={() => setExecutionLogs([])}
              className="text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 font-mono text-xs space-y-2 overflow-y-auto max-h-[300px] text-slate-300">
            {executionLogs.length === 0 ? (
              <div className="text-slate-600 text-center py-12 italic">
                Klik "Jalankan Flowchart" untuk melihat simulasi eksekusi log.
              </div>
            ) : (
              executionLogs.map((log, index) => (
                <div
                  key={index}
                  className="p-2 bg-slate-900/90 rounded border border-slate-800 animate-fadeIn"
                >
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
