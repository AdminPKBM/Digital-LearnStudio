import React, { useState } from 'react';
import { Terminal, Code2, Binary, Calculator, Network, Table, BarChart3, BrainCircuit } from 'lucide-react';
import { FlowchartBuilder } from '../components/sandboxes/FlowchartBuilder';
import { PseudocodePlayground } from '../components/sandboxes/PseudocodePlayground';
import { JsPlayground } from '../components/sandboxes/JsPlayground';
import { BinaryConverter } from '../components/sandboxes/BinaryConverter';
import { NumberSystemConverter } from '../components/sandboxes/NumberSystemConverter';
import { NetworkTopologyBuilder } from '../components/sandboxes/NetworkTopologyBuilder';
import { SpreadsheetSimulator } from '../components/sandboxes/SpreadsheetSimulator';
import { DataVisualizationLab } from '../components/sandboxes/DataVisualizationLab';

export const SandboxesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const sandboxes = [
    { id: 1, title: 'Flowchart Builder', icon: BrainCircuit, color: 'text-cyan-400' },
    { id: 2, title: 'Pseudocode Playground', icon: Terminal, color: 'text-emerald-400' },
    { id: 3, title: 'JavaScript Playground', icon: Code2, color: 'text-rose-400' },
    { id: 4, title: 'Binary Bit Converter', icon: Binary, color: 'text-blue-400' },
    { id: 5, title: 'Number System Converter', icon: Calculator, color: 'text-violet-400' },
    { id: 6, title: 'Network Topology Builder', icon: Network, color: 'text-teal-400' },
    { id: 7, title: 'Spreadsheet Simulator', icon: Table, color: 'text-amber-400' },
    { id: 8, title: 'Data Visualization Lab', icon: BarChart3, color: 'text-indigo-400' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>Interactive Browser Simulators</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          8 Sandbox Simulator Interaktif
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Lakukan eksplorasi praktik langsung tanpa perlu menginstal perangkat lunak tambahan.
        </p>
      </div>

      {/* Tabs Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {sandboxes.map((box) => {
          const Icon = box.icon;
          const isActive = activeTab === box.id;
          return (
            <button
              key={box.id}
              onClick={() => setActiveTab(box.id)}
              className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border text-center transition cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-b from-slate-900 to-cyan-950/60 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${box.color}`} />
              <span className={`text-[11px] font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-400'}`}>
                {box.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Sandbox View */}
      <div className="animate-fadeIn">
        {activeTab === 1 && <FlowchartBuilder />}
        {activeTab === 2 && <PseudocodePlayground />}
        {activeTab === 3 && <JsPlayground />}
        {activeTab === 4 && <BinaryConverter />}
        {activeTab === 5 && <NumberSystemConverter />}
        {activeTab === 6 && <NetworkTopologyBuilder />}
        {activeTab === 7 && <SpreadsheetSimulator />}
        {activeTab === 8 && <DataVisualizationLab />}
      </div>
    </div>
  );
};
