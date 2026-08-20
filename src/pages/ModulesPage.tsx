import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Bookmark,
  ArrowRight,
  BrainCircuit,
  Laptop,
  Cpu,
  Network,
  BarChart3,
  Code2,
  ShieldAlert,
  Layers,
  Search,
  CheckSquare,
  Sparkles,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { elementsData } from '../data/seedData';
import { StudentProfile } from '../types';

export const ModulesPage: React.FC = () => {
  const { userSession } = useAuth();
  const { modules, toggleBookmark, materialProgress, getStudentOverallProgress } = useApp();

  const [selectedElement, setSelectedElement] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'belum_dibaca' | 'sedang_dibaca' | 'selesai'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isTeacher = userSession?.role === 'teacher';
  const student = userSession?.role === 'student' ? (userSession.profile as StudentProfile) : null;
  const studentOverall = student ? getStudentOverallProgress(student.id) : null;

  const getElementIcon = (id: string) => {
    switch (id) {
      case 'BK': return <BrainCircuit className="w-4 h-4 text-cyan-400" />;
      case 'TIK': return <Laptop className="w-4 h-4 text-blue-400" />;
      case 'SK': return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'JKI': return <Network className="w-4 h-4 text-emerald-400" />;
      case 'AD': return <BarChart3 className="w-4 h-4 text-amber-400" />;
      case 'AP': return <Code2 className="w-4 h-4 text-rose-400" />;
      case 'DSI': return <ShieldAlert className="w-4 h-4 text-red-400" />;
      case 'PLB': return <Layers className="w-4 h-4 text-indigo-400" />;
      default: return <BookOpen className="w-4 h-4 text-slate-400" />;
    }
  };

  const getModuleStatus = (moduleId: string) => {
    if (!student) return 'belum_dibaca';
    const isCompleted = student.completedModuleIds.includes(moduleId);
    if (isCompleted) return 'selesai';

    const prog = materialProgress.find((p) => p.studentId === student.id && p.moduleId === moduleId);
    if (prog?.status === 'selesai') return 'selesai';
    if (prog?.status === 'sedang_dibaca' || (prog?.progressPercent && prog.progressPercent > 0)) return 'sedang_dibaca';
    return 'belum_dibaca';
  };

  const getModuleProgressPercent = (moduleId: string) => {
    if (!student) return 0;
    if (student.completedModuleIds.includes(moduleId)) return 100;

    const prog = materialProgress.find((p) => p.studentId === student.id && p.moduleId === moduleId);
    return prog?.progressPercent || 0;
  };

  const filteredModules = modules.filter((m) => {
    // Filter element
    if (selectedElement !== 'ALL' && m.elementId !== selectedElement) return false;

    // Filter status
    if (selectedStatus !== 'ALL') {
      const status = getModuleStatus(m.id);
      if (status !== selectedStatus) return false;
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchId = m.id.toLowerCase().includes(q);
      const matchSummary = m.summary.toLowerCase().includes(q);
      const matchElement = m.elementName.toLowerCase().includes(q);
      const matchBab = (m.bab || '').toLowerCase().includes(q);
      if (!matchTitle && !matchId && !matchSummary && !matchElement && !matchBab) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 p-6 lg:p-8 rounded-3xl shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Modul Bahan Bacaan Informatika SMK TA 2026/2027</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Katalog Bahan Bacaan & Modul Pembelajaran
          </h2>
          <p className="text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Materi pembelajaran terstruktur dan interaktif sesuai Capaian Pembelajaran Kurikulum Merdeka (Fase E Kelas X).
          </p>
        </div>

        {isTeacher && (
          <Link
            to="/admin"
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-2xl transition shadow-lg shadow-cyan-500/20 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Kelola Materi (Guru)</span>
          </Link>
        )}
      </div>

      {/* Student Progress Overview Card */}
      {student && studentOverall && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl border border-cyan-500/30">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">Kemajuan Belajar Membaca Anda</h3>
                <p className="text-xs text-slate-400">
                  {studentOverall.completed} dari {studentOverall.total} Modul Bahan Bacaan Selesai Dipelajari ({studentOverall.percent}%)
                </p>
              </div>
            </div>

            {studentOverall.lastReadModule && (
              <Link
                to={`/modules/${studentOverall.lastReadModule.id}`}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition self-start sm:self-auto"
              >
                <span>Lanjutkan Membaca ({studentOverall.lastReadModule.id})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${studentOverall.percent}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
              <div className="text-xs text-slate-400 font-medium">Total Modul</div>
              <div className="text-base font-extrabold text-white mt-0.5">{studentOverall.total}</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
              <div className="text-xs text-emerald-400 font-medium">Sudah Dibaca</div>
              <div className="text-base font-extrabold text-emerald-300 mt-0.5">{studentOverall.completed}</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
              <div className="text-xs text-amber-400 font-medium">Sedang Dibaca</div>
              <div className="text-base font-extrabold text-amber-300 mt-0.5">{studentOverall.inProgress}</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
              <div className="text-xs text-slate-400 font-medium">Belum Dibaca</div>
              <div className="text-base font-extrabold text-slate-300 mt-0.5">{studentOverall.unread}</div>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari materi, judul, bab, kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 pl-10 pr-4 py-2.5 rounded-2xl focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setSelectedStatus('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedStatus === 'ALL' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua Status
            </button>
            <button
              onClick={() => setSelectedStatus('belum_dibaca')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedStatus === 'belum_dibaca' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Belum Dibaca
            </button>
            <button
              onClick={() => setSelectedStatus('sedang_dibaca')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedStatus === 'sedang_dibaca' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sedang Dibaca
            </button>
            <button
              onClick={() => setSelectedStatus('selesai')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedStatus === 'selesai' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Selesai
            </button>
          </div>
        </div>

        {/* Filter Tabs by Elemen */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedElement('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedElement === 'ALL'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Semua Elemen ({modules.length})
          </button>

          {elementsData.map((el) => (
            <button
              key={el.id}
              onClick={() => setSelectedElement(el.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedElement === el.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {getElementIcon(el.id)}
              <span>Elemen {el.number}: {el.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Modules List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredModules.length === 0 ? (
          <div className="col-span-full text-center p-12 bg-slate-900/50 border border-slate-800 rounded-3xl text-slate-400">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-bold text-white">Tidak ada bahan bacaan yang sesuai filter.</p>
            <p className="text-xs text-slate-500 mt-1">Coba ubah kata kunci pencarian atau filter elemen.</p>
          </div>
        ) : (
          filteredModules.map((mod) => {
            const status = getModuleStatus(mod.id);
            const progressPct = getModuleProgressPercent(mod.id);
            const isBookmarked = student?.bookmarkedModuleIds.includes(mod.id);

            return (
              <div
                key={mod.id}
                className={`bg-slate-900/80 border rounded-3xl p-5 backdrop-blur-md flex flex-col justify-between transition-all duration-300 relative group shadow-xl ${
                  status === 'selesai'
                    ? 'border-emerald-500/40 bg-emerald-950/10'
                    : status === 'sedang_dibaca'
                    ? 'border-amber-500/40 bg-amber-950/10'
                    : 'border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 border border-slate-700">
                        {mod.id}
                      </span>
                      {mod.bab && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                          {mod.bab.split(':')[0]}
                        </span>
                      )}
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {mod.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {student && (
                        <button
                          onClick={() => toggleBookmark(mod.id)}
                          className={`p-1.5 rounded-lg border transition cursor-pointer ${
                            isBookmarked
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                              : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                          }`}
                          title="Tandai Bookmark"
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                      )}

                      {status === 'selesai' && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Selesai
                        </span>
                      )}

                      {status === 'sedang_dibaca' && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                          <Sparkles className="w-3 h-3" /> Dibaca {progressPct}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Element */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                    {getElementIcon(mod.elementId)}
                    <span>{mod.elementName}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {mod.summary}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  {/* Progress bar */}
                  {student && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>Progress Membaca</span>
                        <span>{progressPct}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 rounded-full ${
                            progressPct >= 100
                              ? 'bg-emerald-400'
                              : progressPct > 0
                              ? 'bg-amber-400'
                              : 'bg-slate-800'
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      ~{mod.estimatedTimeMinutes} Menit
                    </span>

                    <Link
                      to={`/modules/${mod.id}`}
                      className="flex items-center gap-1.5 font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-transform cursor-pointer"
                    >
                      <span>{status === 'selesai' ? 'Baca Ulang' : status === 'sedang_dibaca' ? 'Lanjutkan' : 'Mulai Baca'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
