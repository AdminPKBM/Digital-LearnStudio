import React, { useState } from 'react';
import { Trophy, Crown, Flame, Award, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { StudentProfile } from '../types';

export const LeaderboardPage: React.FC = () => {
  const { getLeaderboard, getLevelTitle } = useApp();
  const { userSession } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string>('ALL');

  const leaderboard = getLeaderboard(selectedClass);
  const isStudent = userSession?.role === 'student' || userSession?.role === 'SISWA';
  const student = isStudent ? (userSession.profile as StudentProfile) : null;

  const top3 = leaderboard.slice(0, 3);
  const remainingList = leaderboard.slice(3);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Gamifikasi Poin XP & Level</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Papan Peringkat (Leaderboard) Siswa
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Peringkat keterlibatan belajar siswa berdasarkan total perolehan XP dan modul terlesaikan.
          </p>
        </div>

        {/* Class Filters */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start">
          {['ALL', 'X DKV 1', 'X DKV 2', 'X APHP'].map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedClass === cls
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cls === 'ALL' ? 'Semua Kelas' : cls}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {/* Rank 2 (Silver) */}
          <div className="order-2 md:order-1 bg-slate-900/80 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-md flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-slate-300 text-slate-950 font-extrabold flex items-center justify-center mb-3 shadow-lg font-mono">
              #2
            </div>
            <h3 className="font-extrabold text-white text-base mb-1">{top3[1].name}</h3>
            <div className="text-xs text-slate-400 mb-3">{top3[1].classGroup} • {top3[1].nis}</div>
            <div className="px-3 py-1 rounded-full bg-slate-800 text-cyan-300 font-mono font-bold text-xs border border-slate-700">
              {top3[1].xp} XP
            </div>
          </div>

          {/* Rank 1 (Gold Crown) */}
          <div className="order-1 md:order-2 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/60 rounded-3xl p-6 backdrop-blur-md flex flex-col items-center text-center relative overflow-hidden shadow-2xl shadow-amber-500/10 scale-105">
            <div className="absolute top-2 right-2 p-1 bg-amber-500/20 text-amber-400 rounded-full">
              <Crown className="w-5 h-5 fill-current" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-extrabold text-lg flex items-center justify-center mb-3 shadow-xl font-mono">
              #1
            </div>
            <h3 className="font-extrabold text-amber-300 text-lg mb-1">{top3[0].name}</h3>
            <div className="text-xs text-slate-300 mb-3">{top3[0].classGroup} • {top3[0].nis}</div>
            <div className="px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 font-mono font-extrabold text-xs shadow-lg shadow-amber-500/20">
              {top3[0].xp} XP
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="order-3 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-amber-700 text-slate-950 font-extrabold flex items-center justify-center mb-3 shadow-lg font-mono">
              #3
            </div>
            <h3 className="font-extrabold text-white text-base mb-1">{top3[2].name}</h3>
            <div className="text-xs text-slate-400 mb-3">{top3[2].classGroup} • {top3[2].nis}</div>
            <div className="px-3 py-1 rounded-full bg-slate-800 text-cyan-300 font-mono font-bold text-xs border border-slate-700">
              {top3[2].xp} XP
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <th className="p-3">Rank</th>
              <th className="p-3">Nama Siswa</th>
              <th className="p-3">Kelas</th>
              <th className="p-3 text-center">Level</th>
              <th className="p-3 text-center">Total XP</th>
              <th className="p-3 text-center">Modul Selesai</th>
              <th className="p-3 text-center">Streak</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {leaderboard.map((item) => {
              const isMe = student?.nis === item.nis;
              return (
                <tr
                  key={item.studentId}
                  className={`hover:bg-slate-800/40 transition ${
                    isMe ? 'bg-cyan-500/10 font-bold text-cyan-300' : 'text-slate-200'
                  }`}
                >
                  <td className="p-3 font-mono font-extrabold">#{item.rank}</td>
                  <td className="p-3 font-semibold flex items-center gap-2">
                    {item.name}
                    {isMe && <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">Anda</span>}
                  </td>
                  <td className="p-3 text-slate-400">{item.classGroup}</td>
                  <td className="p-3 text-center font-mono font-bold text-amber-300">Lvl {item.level}</td>
                  <td className="p-3 text-center font-mono font-extrabold text-cyan-300">{item.xp} XP</td>
                  <td className="p-3 text-center font-mono">{item.completedModulesCount} / 16</td>
                  <td className="p-3 text-center font-mono text-orange-400">{item.streakDays}🔥</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
