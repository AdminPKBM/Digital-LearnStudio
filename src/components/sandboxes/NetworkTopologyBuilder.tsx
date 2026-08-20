import React, { useState } from 'react';
import { Network, Play, CheckCircle2, Wifi, Server, Laptop, HardDrive } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NetNode {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'pc' | 'server';
  ip: string;
}

export const NetworkTopologyBuilder: React.FC = () => {
  const { addXP } = useApp();
  const [nodes] = useState<NetNode[]>([
    { id: 'r1', name: 'Router Utama SMKN', type: 'router', ip: '192.168.1.1' },
    { id: 'sw1', name: 'Switch Lab DKV 1', type: 'switch', ip: '192.168.1.2' },
    { id: 'srv1', name: 'Server CBT LearnStudio', type: 'server', ip: '192.168.1.10' },
    { id: 'pc1', name: 'PC Siswa 01', type: 'pc', ip: '192.168.1.101' },
    { id: 'pc2', name: 'PC Siswa 02', type: 'pc', ip: '192.168.1.102' },
  ]);

  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState<boolean>(false);

  const runPingTest = () => {
    setIsPinging(true);
    setPingStatus('Mengirimkan paket ICMP Ping dari PC Siswa 01 (192.168.1.101) ke Server CBT (192.168.1.10)...');

    setTimeout(() => {
      setPingStatus('✅ PING SUCCESSFUL! 4 packets transmitted, 4 received, 0% packet loss. Time: 2ms.');
      setIsPinging(false);
      addXP(15, 'Network Ping Simulator');
    }, 1500);
  };

  const getNodeIcon = (type: NetNode['type']) => {
    switch (type) {
      case 'router': return <Wifi className="w-6 h-6 text-emerald-400" />;
      case 'switch': return <Network className="w-6 h-6 text-cyan-400" />;
      case 'server': return <Server className="w-6 h-6 text-violet-400" />;
      case 'pc': return <Laptop className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="p-2 bg-teal-500/20 text-teal-400 rounded-lg border border-teal-500/30">6</span>
            Network Topology & Ping Simulator
          </h3>
          <p className="text-sm text-slate-400">Desain topologi Star jaringan lokal SMKN Bojonggambir dan uji transmisi paket.</p>
        </div>

        <button
          onClick={runPingTest}
          disabled={isPinging}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-teal-500/20 cursor-pointer disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-current" />
          Simulasi Ping Test
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-slate-950 p-6 rounded-xl border border-slate-800 min-h-[320px] flex flex-col items-center justify-center relative">
          {/* Top Router */}
          <div className="p-3 bg-slate-900 border border-emerald-500/50 rounded-xl flex items-center gap-2 mb-8 shadow-lg shadow-emerald-500/10 animate-pulse">
            {getNodeIcon('router')}
            <div>
              <div className="text-xs font-bold text-white">Router Utama SMKN</div>
              <div className="text-[10px] text-emerald-400 font-mono">192.168.1.1</div>
            </div>
          </div>

          {/* Switch Center */}
          <div className="p-3 bg-slate-900 border border-cyan-500/50 rounded-xl flex items-center gap-2 mb-8 shadow-lg shadow-cyan-500/10">
            {getNodeIcon('switch')}
            <div>
              <div className="text-xs font-bold text-white">Switch Lab DKV</div>
              <div className="text-[10px] text-cyan-400 font-mono">192.168.1.2</div>
            </div>
          </div>

          {/* Connected Devices */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
            <div className="p-3 bg-slate-900 border border-violet-500/40 rounded-xl flex items-center gap-2 text-center flex-col">
              {getNodeIcon('server')}
              <div className="text-[11px] font-bold text-white">Server CBT</div>
              <div className="text-[10px] text-violet-400 font-mono">192.168.1.10</div>
            </div>

            <div className="p-3 bg-slate-900 border border-amber-500/40 rounded-xl flex items-center gap-2 text-center flex-col">
              {getNodeIcon('pc')}
              <div className="text-[11px] font-bold text-white">PC Siswa 01</div>
              <div className="text-[10px] text-amber-400 font-mono">192.168.1.101</div>
            </div>

            <div className="p-3 bg-slate-900 border border-amber-500/40 rounded-xl flex items-center gap-2 text-center flex-col">
              {getNodeIcon('pc')}
              <div className="text-[11px] font-bold text-white">PC Siswa 02</div>
              <div className="text-[10px] text-amber-400 font-mono">192.168.1.102</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-3">PING STATUS LOG</label>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-teal-300 min-h-[120px]">
              {pingStatus || 'Klik tombol "Simulasi Ping Test" untuk menguji konektivitas paket ICMP.'}
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-lg text-[11px] text-slate-400 border border-slate-800 space-y-1 mt-4">
            <div className="font-semibold text-white">Catatan Topologi Star:</div>
            <div>• Seluruh PC terhubung ke Switch pusat.</div>
            <div>• Kegagalan 1 kabel PC tidak merusak komunikasi PC lainnya.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
