import React from 'react';
import { BarChart2, TrendingUp, PieChart as PieIcon, CheckCircle2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { StudentProfile } from '../types';

export const AnalyticsPage: React.FC = () => {
  const { userSession } = useAuth();
  const { quizResults, modules } = useApp();

  const isStudent = userSession?.role === 'student' || userSession?.role === 'SISWA';
  const student = isStudent ? (userSession.profile as StudentProfile) : null;

  // Chart 1: Completed modules per Elemen
  const elemenCounts: Record<string, { total: number; completed: number }> = {
    BK: { total: 2, completed: 0 },
    TIK: { total: 2, completed: 0 },
    SK: { total: 2, completed: 0 },
    JKI: { total: 2, completed: 0 },
    AD: { total: 2, completed: 0 },
    AP: { total: 2, completed: 0 },
    DSI: { total: 2, completed: 0 },
    PLB: { total: 2, completed: 0 },
  };

  if (student) {
    student.completedModuleIds.forEach((modId) => {
      const mod = modules.find((m) => m.id === modId);
      if (mod && elemenCounts[mod.elementId]) {
        elemenCounts[mod.elementId].completed += 1;
      }
    });
  }

  const elemenChartData = Object.keys(elemenCounts).map((elKey) => ({
    elemen: elKey,
    Selesai: elemenCounts[elKey].completed,
    Total: elemenCounts[elKey].total,
  }));

  // Chart 2: Recent Quiz Scores
  const myResults = student ? quizResults.filter((r) => r.studentId === student.id) : [];
  const scoreData = myResults.map((r, i) => ({
    modul: r.moduleId,
    Nilai: r.score,
  }));

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
          <BarChart2 className="w-3.5 h-3.5" />
          <span>Learning Experience Analytics</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Analitik Progress & Performa Belajar
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Visualisasi pemahaman per elemen kurikulum dan perkembangan statistik kuis Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Elemen Progress Chart */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            Progress Penyelesaian Modul per 8 Elemen
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={elemenChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="elemen" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 2]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey="Selesai" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quiz Scores Line Chart */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Grafik Perkembangan Nilai Kuis Modul
          </h3>
          <div className="h-[280px]">
            {scoreData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="modul" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                  <Line type="monotone" dataKey="Nilai" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-500 italic">
                Belum ada riwayat kuis yang dikerjakan.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
