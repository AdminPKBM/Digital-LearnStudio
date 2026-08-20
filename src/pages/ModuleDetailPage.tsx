import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Clock,
  Sparkles,
  FileText,
  Save,
  HelpCircle,
  FileUp,
  Brain,
  List,
  Maximize2,
  Minimize2,
  Printer,
  BookOpen,
  ChevronRight,
  ChevronDown,
  HelpCircle as QuestionIcon,
  Video,
  FileDown,
  ExternalLink,
  Briefcase,
  Lightbulb,
  CheckSquare,
  BookMarked,
  Award,
  Search,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { StudentProfile } from '../types';
import { MarkdownRenderer } from '../components/common/MarkdownRenderer';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export const ModuleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userSession } = useAuth();
  const {
    getModuleById,
    modules,
    completeModule,
    toggleBookmark,
    saveModuleNote,
    updateReadingProgress,
    getStudentProgressForModule
  } = useApp();

  const moduleData = id ? getModuleById(id) : undefined;
  const isStudent = userSession?.role === 'student' || userSession?.role === 'SISWA';
  const student = isStudent ? (userSession.profile as StudentProfile) : null;

  const [noteText, setNoteText] = useState<string>(
    student && id && student.notes[id] ? student.notes[id] : ''
  );
  const [isNoteSaved, setIsNoteSaved] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [showToc, setShowToc] = useState<boolean>(false);
  const [readingProgress, setReadingProgress] = useState<number>(0);

  // Interactive Pemantik states
  const [expandedPemantik, setExpandedPemantik] = useState<Record<number, boolean>>({});

  // Interactive Assessment / Mini-Quiz states
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedAssessment, setSubmittedAssessment] = useState<boolean>(false);

  // Interactive Reflection state
  const [reflectionText, setReflectionText] = useState<string>('');
  const [isReflectionSubmitted, setIsReflectionSubmitted] = useState<boolean>(false);

  // Glossary Search state
  const [glossarySearch, setGlossarySearch] = useState<string>('');

  // Table of Contents
  const [toc, setToc] = useState<TocItem[]>([]);

  // Find previous & next module
  const currentIdx = modules.findIndex((m) => m.id === id);
  const prevModule = currentIdx > 0 ? modules[currentIdx - 1] : undefined;
  const nextModule = currentIdx >= 0 && currentIdx < modules.length - 1 ? modules[currentIdx + 1] : undefined;

  // Student progress
  const studentProg = student && id ? getStudentProgressForModule(student.id, id) : undefined;

  useEffect(() => {
    if (moduleData) {
      const fullText = (moduleData.materiUtama || moduleData.contentMarkdown || '') + '\n' + (moduleData.pendahuluan || '');
      const lines = fullText.split('\n');
      const items: TocItem[] = [];
      lines.forEach((line) => {
        if (line.startsWith('# ')) {
          const title = line.replace('# ', '').trim();
          items.push({ id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title, level: 1 });
        } else if (line.startsWith('## ')) {
          const title = line.replace('## ', '').trim();
          items.push({ id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title, level: 2 });
        } else if (line.startsWith('### ')) {
          const title = line.replace('### ', '').trim();
          items.push({ id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title, level: 3 });
        }
      });
      setToc(items);
    }
  }, [moduleData]);

  // Handle scroll progress and update context reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(currentProgress);

        if (student && id && currentProgress > (studentProg?.progressPercent || 0)) {
          updateReadingProgress(id, currentProgress);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [student, id, studentProg]);

  if (!moduleData) {
    return (
      <div className="p-12 text-center text-slate-400">
        <p className="mb-4">Materi pembelajaran tidak ditemukan.</p>
        <Link to="/modules" className="text-cyan-400 underline font-bold">
          Kembali ke Daftar Bahan Bacaan
        </Link>
      </div>
    );
  }

  const isCompleted = student?.completedModuleIds.includes(moduleData.id) || studentProg?.status === 'selesai';
  const isBookmarked = student?.bookmarkedModuleIds.includes(moduleData.id);

  // Word count calculation
  const mainContentText = (moduleData.materiUtama || moduleData.contentMarkdown || '') + ' ' + (moduleData.pendahuluan || '');
  const wordCount = mainContentText.split(/\s+/).filter(Boolean).length;
  const actualReadingMinutes = Math.max(5, Math.ceil(wordCount / 180));

  const handleSaveNote = () => {
    if (id) {
      saveModuleNote(id, noteText);
      setIsNoteSaved(true);
      setTimeout(() => setIsNoteSaved(false), 2000);
    }
  };

  const handleComplete = () => {
    if (id) {
      completeModule(id);
      updateReadingProgress(id, 100, true);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setShowToc(false);
    }
  };

  // Helper for YouTube embed
  const getEmbedVideoUrl = (url?: string) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch') || url.includes('youtu.be')) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
      }
    }
    return url;
  };

  const embedVideo = getEmbedVideoUrl(moduleData.videoUrl);

  return (
    <div className={`mx-auto space-y-8 animate-fadeIn pb-16 transition-all duration-300 ${isFocusMode ? 'max-w-5xl px-4' : 'max-w-4xl'}`}>
      {/* Scroll Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Sticky Top Navigation & Reading Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl backdrop-blur-xl sticky top-4 z-40 shadow-xl">
        <button
          onClick={() => navigate('/modules')}
          className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Kembali</span>
        </button>

        {/* Reading Preference Tools */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Table of Contents Button */}
          {toc.length > 0 && (
            <button
              onClick={() => setShowToc(!showToc)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                showToc
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
              }`}
              title="Daftar Isi Modul"
            >
              <List className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Daftar Isi</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                {toc.length}
              </span>
            </button>
          )}

          {/* Font Size Selector */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                fontSize === 'sm' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
              title="Teks Kecil"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
                fontSize === 'base' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
              title="Teks Sedang"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-1 rounded-lg text-sm font-bold transition ${
                fontSize === 'lg' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
              title="Teks Besar"
            >
              A+
            </button>
          </div>

          {/* Focus Mode Toggle */}
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition ${
              isFocusMode
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Mode Fokus Bebas Gangguan"
          >
            {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isFocusMode ? 'Keluar Fokus' : 'Mode Fokus'}</span>
          </button>

          {/* Print / Cetak Modul */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer transition"
            title="Cetak atau Simpan PDF Modul"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Cetak / PDF</span>
          </button>

          {/* Bookmark Button */}
          {student && (
            <button
              onClick={() => id && toggleBookmark(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">{isBookmarked ? 'Tersimpan' : 'Bookmark'}</span>
            </button>
          )}

          {/* Mark Complete Button */}
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-lg cursor-pointer ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Sudah Dipelajari' : 'Tandai Selesai (+20 XP)'}</span>
          </button>
        </div>
      </div>

      {/* Table of Contents Drawer */}
      {showToc && toc.length > 0 && (
        <div className="bg-slate-900/95 border border-cyan-500/30 rounded-3xl p-5 shadow-2xl backdrop-blur-xl animate-fadeIn space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Daftar Isi Pembahasan Modul Ini
            </span>
            <button
              onClick={() => setShowToc(false)}
              className="text-xs text-slate-400 hover:text-white font-bold cursor-pointer"
            >
              Tutup ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
            {toc.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.id)}
                className={`text-left text-xs p-2.5 rounded-xl transition flex items-center justify-between group cursor-pointer ${
                  item.level === 1
                    ? 'bg-slate-950/80 hover:bg-cyan-950/40 text-cyan-200 font-bold border border-slate-800/80'
                    : 'bg-slate-950/40 hover:bg-slate-800/60 text-slate-300 border border-slate-800/40 pl-4'
                }`}
              >
                <span className="truncate pr-2">{item.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyan-500 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Header & Metadata Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {moduleData.id}
          </span>
          {moduleData.bab && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              {moduleData.bab}
            </span>
          )}
          {moduleData.pertemuan && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Pertemuan {moduleData.pertemuan}
            </span>
          )}
          <span className="text-xs font-medium text-slate-400">Elemen: {moduleData.elementName}</span>

          <div className="ml-auto flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              ~{actualReadingMinutes} Menit Baca
            </span>
            <span className="hidden sm:inline-block text-slate-700">•</span>
            <span className="hidden sm:inline-block text-slate-400">{wordCount} Kata</span>
          </div>
        </div>

        <h1 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight relative z-10">
          {moduleData.title}
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-cyan-500 pl-4 py-1 italic relative z-10">
          {moduleData.summary}
        </p>

        {/* Media Banner Image if present */}
        {moduleData.imageUrl && (
          <div className="rounded-2xl overflow-hidden border border-slate-800 my-4 shadow-lg">
            <img
              src={moduleData.imageUrl}
              alt={moduleData.title}
              className="w-full max-h-72 object-cover hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* 1. Tujuan Pembelajaran (Learning Objectives) */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2.5 relative z-10">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4 text-cyan-400" />
            Tujuan Pembelajaran (Learning Objectives)
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {moduleData.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. Pertanyaan Pemantik (Triggering Questions) */}
      {moduleData.pertanyaanPemantik && moduleData.pertanyaanPemantik.length > 0 && (
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 backdrop-blur-md space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Pertanyaan Pemantik (Apersepsi & Refleksi Awal)
              </h3>
              <p className="text-xs text-slate-400">
                Pikirkan sejenak pertanyaan berikut sebelum masuk ke pembahasan materi utama:
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {moduleData.pertanyaanPemantik.map((q, idx) => {
              const isExpanded = expandedPemantik[idx];
              return (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div
                    onClick={() => setExpandedPemantik((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                    className="flex items-start justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-sm font-mono">Q{idx + 1}.</span>
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition leading-relaxed">
                        {q}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-amber-400' : ''}`}
                    />
                  </div>

                  {isExpanded && (
                    <div className="pt-2 border-t border-slate-800 text-xs text-amber-200/90 leading-relaxed bg-amber-950/20 p-3 rounded-xl animate-fadeIn">
                      <span className="font-bold text-amber-400">💡 Panduan Berpikir: </span>
                      Pertanyaan ini melatih daya analisis kritismu. Cobalah untuk menghubungkan konsep ini dengan pengalaman harianmu atau praktik jurusan SMK!
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Infographic Highlights / Konsep Inti Cards */}
      {moduleData.infographicHighlights && moduleData.infographicHighlights.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Konsep Inti & Poin Kunci Ringkasan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {moduleData.infographicHighlights.map((info, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md space-y-2 hover:border-cyan-500/40 transition"
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-white">{info.label}</div>
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">{info.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Pendahuluan Section (If separated) */}
      {moduleData.pendahuluan && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 lg:p-8 backdrop-blur-md space-y-3">
          <h3 className="text-sm font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            1. Pendahuluan
          </h3>
          <div className="text-xs text-slate-300 leading-relaxed space-y-3 whitespace-pre-line">
            {moduleData.pendahuluan}
          </div>
        </div>
      )}

      {/* 5. Video Pembelajaran Embed (If present) */}
      {embedVideo && (
        <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 backdrop-blur-md space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Video className="w-4 h-4 text-purple-400" />
              Video Pembelajaran Interaktif
            </h3>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-full border border-purple-500/30 font-bold">
              Media Visual
            </span>
          </div>
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <iframe
              src={embedVideo}
              title={moduleData.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* 6. Materi Utama / Content Markdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 lg:p-10 backdrop-blur-md shadow-2xl space-y-4">
        <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Materi Utama Pembelajaran
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Modul #{moduleData.moduleNumber}</span>
        </div>

        <MarkdownRenderer
          content={moduleData.materiUtama || moduleData.contentMarkdown}
          fontSize={fontSize}
        />
      </div>

      {/* 7. Contoh Penerapan & Studi Kasus Konteks SMK / Dunia Kerja */}
      {(moduleData.contohPenerapan || moduleData.studiKasus) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contoh Penerapan */}
          {moduleData.contohPenerapan && (
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 backdrop-blur-md space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                <CheckSquare className="w-4 h-4" />
                Contoh Penerapan Nyata
              </div>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                {moduleData.contohPenerapan}
              </p>
            </div>
          )}

          {/* Studi Kasus SMK / Dunia Kerja */}
          {moduleData.studiKasus && (
            <div className="bg-slate-900/90 border border-blue-500/30 rounded-3xl p-6 backdrop-blur-md space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-blue-400 font-extrabold text-xs uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                Studi Kasus Konteks SMK & Dunia Kerja
              </div>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                {moduleData.studiKasus}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 8. Aktivitas Siswa / Latihan Berbasis Masalah */}
      {moduleData.aktivitasSiswa && (
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 lg:p-8 backdrop-blur-md space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
            <CheckSquare className="w-4 h-4" />
            Aktivitas Siswa & Tugas Berbasis Masalah (Problem-Based Task)
          </div>
          <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            {moduleData.aktivitasSiswa}
          </p>
        </div>
      )}

      {/* 9. Asesmen / Checkpoint Pemahaman Interaktif */}
      {moduleData.asesmen && moduleData.asesmen.length > 0 && (
        <div className="bg-slate-900/90 border border-cyan-500/40 rounded-3xl p-6 lg:p-8 backdrop-blur-md space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <QuestionIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  Asesmen Pemahaman (Mini Checkpoint)
                </h3>
                <p className="text-xs text-slate-400">
                  Uji langsung pemahamanmu dari materi yang baru saja dibaca:
                </p>
              </div>
            </div>
            {submittedAssessment && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                ✔ Asesmen Selesai
              </span>
            )}
          </div>

          <div className="space-y-6">
            {moduleData.asesmen.map((q, qIdx) => (
              <div key={qIdx} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-bold text-white flex items-start gap-2">
                  <span className="text-cyan-400">{qIdx + 1}.</span>
                  <span>{q.question}</span>
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[qIdx] === optIdx;
                    const isCorrect = optIdx === q.answerIndex;

                    let btnClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (submittedAssessment) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold';
                      }
                    } else if (isSelected) {
                      btnClass = 'bg-cyan-500/20 border-cyan-500 text-cyan-200 font-bold';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submittedAssessment}
                        onClick={() => setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center gap-3 cursor-pointer ${btnClass}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {submittedAssessment && (
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed animate-fadeIn">
                    <span className="font-bold text-cyan-400">Pembahasan: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!submittedAssessment && (
            <button
              onClick={() => {
                setSubmittedAssessment(true);
                if (student) {
                  updateReadingProgress(id, 90);
                }
              }}
              disabled={Object.keys(selectedAnswers).length < moduleData.asesmen.length}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs py-3 rounded-2xl transition shadow-lg cursor-pointer"
            >
              Periksa Jawaban Asesmen Pemahaman
            </button>
          )}
        </div>
      )}

      {/* 10. Refleksi Siswa (Interactive Input) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Refleksi Pembelajaran Mandiri
            </h3>
            <p className="text-xs text-slate-400">
              Apa wawasan baru paling berharga yang kamu dapatkan setelah membaca materi ini?
            </p>
          </div>
        </div>

        {moduleData.refleksi && moduleData.refleksi.length > 0 && (
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <span className="text-[11px] font-bold text-cyan-400 uppercase">Pertanyaan Panduan Refleksi:</span>
            <ul className="space-y-1 text-xs text-slate-300 italic">
              {moduleData.refleksi.map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          </div>
        )}

        <textarea
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          placeholder="Tuliskan refleksi singkat kamu di sini..."
          className="w-full h-24 bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3.5 rounded-2xl focus:outline-none focus:border-cyan-500 leading-relaxed"
        />

        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setIsReflectionSubmitted(true);
              setTimeout(() => setIsReflectionSubmitted(false), 3000);
            }}
            className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs px-4 py-2 rounded-xl border border-cyan-500/40 transition cursor-pointer"
          >
            Kirim Refleksi Siswa
          </button>
          {isReflectionSubmitted && (
            <span className="text-xs font-bold text-emerald-400 animate-fadeIn">
              ✔ Refleksi Berhasil Dicatat!
            </span>
          )}
        </div>
      </div>

      {/* 11. Rangkuman & Glosarium (Accordion / Searchable) */}
      {(moduleData.rangkuman || (moduleData.glosarium && moduleData.glosarium.length > 0)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rangkuman */}
          {moduleData.rangkuman && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-3">
              <div className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-cyan-400" />
                Rangkuman Inti Materi
              </div>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950 p-4 rounded-2xl border border-slate-800">
                {moduleData.rangkuman}
              </p>
            </div>
          )}

          {/* Glosarium Istilah */}
          {moduleData.glosarium && moduleData.glosarium.length > 0 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  Glosarium Istilah
                </div>
                <input
                  type="text"
                  placeholder="Cari istilah..."
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-[11px] px-2.5 py-1 rounded-lg text-slate-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {moduleData.glosarium
                  .filter(
                    (g) =>
                      g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                      g.definition.toLowerCase().includes(glossarySearch.toLowerCase())
                  )
                  .map((g, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-xs font-bold text-cyan-300">{g.term}</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed">{g.definition}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 12. File Lampiran & Media Pendukung (PDF / Files / References) */}
      {(moduleData.pdfUrl || moduleData.supportingFileUrl || moduleData.linkUrl || (moduleData.sumberReferensi && moduleData.sumberReferensi.length > 0)) && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
          <div className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <FileDown className="w-4 h-4 text-cyan-400" />
            Media Lampiran & Sumber Referensi
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {moduleData.pdfUrl && (
              <a
                href={moduleData.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs px-4 py-2.5 rounded-xl border border-rose-500/40 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Buka PDF Materi (Google Drive)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {moduleData.supportingFileUrl && (
              <a
                href={moduleData.supportingFileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-bold text-xs px-4 py-2.5 rounded-xl border border-blue-500/40 transition"
              >
                <FileDown className="w-4 h-4" />
                <span>Unduh File Pendukung Praktik</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {moduleData.linkUrl && (
              <a
                href={moduleData.linkUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs px-4 py-2.5 rounded-xl border border-emerald-500/40 transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Link Referensi Eksternal</span>
              </a>
            )}
          </div>

          {moduleData.sumberReferensi && moduleData.sumberReferensi.length > 0 && (
            <div className="pt-2 border-t border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Daftar Pustaka:</span>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                {moduleData.sumberReferensi.map((ref, i) => (
                  <li key={i}>{ref}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 13. Personal Notepad Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            Catatan Pribadi Siswa Modul Ini
          </label>
          {isNoteSaved && <span className="text-xs font-bold text-emerald-400 animate-fadeIn">✔ Catatan Tersimpan</span>}
        </div>

        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Tulis ringkasan, pertanyaan penting, atau poin utama yang baru Anda pelajari dari bacaan ini..."
          className="w-full h-28 bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3.5 rounded-2xl focus:outline-none focus:border-cyan-500 leading-relaxed"
        />

        <button
          onClick={handleSaveNote}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          Simpan Catatan Modul
        </button>
      </div>

      {/* 14. Previous & Next Module Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        {prevModule ? (
          <Link
            to={`/modules/${prevModule.id}`}
            className="w-full sm:w-auto flex items-center gap-3 p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl transition group"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">Materi Sebelumnya</span>
              <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition truncate max-w-xs block">
                {prevModule.id}: {prevModule.title}
              </span>
            </div>
          </Link>
        ) : <div />}

        {nextModule ? (
          <Link
            to={`/modules/${nextModule.id}`}
            className="w-full sm:w-auto flex items-center gap-3 p-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl transition group text-right ml-auto"
          >
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">Materi Selanjutnya</span>
              <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition truncate max-w-xs block">
                {nextModule.id}: {nextModule.title}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : <div />}
      </div>

      {/* 15. Footer Navigation to Quiz & Assignment */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl">
        <div>
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Selesai Membaca & Memahami Bacaan?
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Uji pemahaman Anda dengan mengerjakan Kuis 5 Soal Komprehensif atau Kumpulkan Tugas Praktik.
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            to={`/assignment/${moduleData.id}`}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs px-5 py-3 rounded-2xl transition cursor-pointer"
          >
            <FileUp className="w-4 h-4 text-cyan-400" />
            Tugas Praktik
          </Link>

          <Link
            to={`/quiz/${moduleData.id}`}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-2xl transition shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 fill-current" />
            Mulai Kuis Modul
          </Link>
        </div>
      </div>
    </div>
  );
};
