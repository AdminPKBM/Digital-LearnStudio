import React, { useState } from 'react';
import { BarChart3, PieChart as PieIcon, TrendingUp, Sparkles } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';

interface DataPoint {
  category: string;
  nilai: number;
}

const COLORS = ['#06b6d4', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899'];

export const DataVisualizationLab: React.FC = () => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { category: 'X DKV 1', nilai: 88 },
    { category: 'X DKV 2', nilai: 92 },
    { category: 'X APHP', nilai: 85 },
  ]);

  const updateNilai = (index: number, val: number) => {
    const next = [...dataPoints];
    next[index].nilai = Math.max(0, Math.min(100, val));
    setDataPoints(next);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg border border-indigo-500/30">8</span>
            Data Visualization Lab (Recharts)
          </h3>
          <p className="text-sm text-slate-400">Generasi grafik statistik interaktif dari data hasil nilai siswa.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              chartType === 'bar' ? 'bg-indigo-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Bar Chart
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              chartType === 'line' ? 'bg-indigo-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Line Chart
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              chartType === 'pie' ? 'bg-indigo-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            Pie Chart
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
          <label className="block text-xs font-semibold text-slate-400">EDIT NILAI KELAS</label>
          {dataPoints.map((dp, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-xs font-medium text-white">{dp.category}</span>
              <input
                type="number"
                value={dp.nilai}
                onChange={(e) => updateNilai(idx, Number(e.target.value))}
                className="w-20 bg-slate-950 border border-slate-700 text-indigo-400 font-mono text-sm px-2 py-1 rounded text-center focus:outline-none focus:border-indigo-500"
              />
            </div>
          ))}
        </div>

        {/* Visual Chart */}
        <div className="lg:col-span-8 bg-slate-950 p-4 rounded-xl border border-slate-800 h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={dataPoints}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey="nilai" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : chartType === 'line' ? (
              <LineChart data={dataPoints}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Line type="monotone" dataKey="nilai" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            ) : (
              <PieChart>
                <Pie data={dataPoints} dataKey="nilai" nameKey="category" cx="50%" cy="50%" outerRadius={80} label>
                  {dataPoints.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
