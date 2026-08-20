import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileUp,
  Link2,
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  UploadCloud
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { StudentProfile } from '../types';

export const AssignmentPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { userSession } = useAuth();
  const { getAssignmentByModuleId, getModuleById, submitAssignment, submissions } = useApp();

  const moduleData = moduleId ? getModuleById(moduleId) : undefined;
  const assignmentData = moduleId ? getAssignmentByModuleId(moduleId) : undefined;

  const isStudent = userSession?.role === 'student' || userSession?.role === 'SISWA';
  const student = isStudent ? (userSession.profile as StudentProfile) : null;

  const [fileName, setFileName] = useState<string>('');
  const [externalLink, setExternalLink] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Existing submission
  const mySubmission = student && moduleId
    ? submissions.find((s) => s.studentId === student.id && s.moduleId === moduleId)
    : undefined;

  if (!moduleData) {
    return (
      <div className="p-12 text-center text-slate-400">
        <p className="mb-4">Modul tugas tidak ditemukan.</p>
        <Link to="/modules" className="text-cyan-400 font-bold underline">
          Kembali ke Modul
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student || !moduleId) return;

    if (!fileName.trim() && !externalLink.trim()) {
      setErrorMessage('Silakan pilih berkas atau sertakan tautan Google Drive / GitHub!');
      return;
    }
    setErrorMessage('');

    submitAssignment({
      assignmentId: assignmentData?.id || `assign-${moduleId}`,
      moduleId,
      studentId: student.id,
      studentName: student.name,
      studentClass: student.classGroup,
      fileName: fileName || 'File_Tugas_Siswa.pdf',
      fileUrl: externalLink || 'https://example.com/file_tugas_siswa.pdf',
      externalLink,
      notes,
    });

    setIsSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-2">
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          TUGAS PRAKTIK MODUL {moduleId}
        </span>
        <h2 className="text-2xl font-extrabold text-white">{moduleData.title}</h2>
        <p className="text-xs text-slate-400">
          Kirimkan laporan praktik digital Anda untuk dinilai oleh Guru Informatika (Pak Ruli Lesmana, S.T. Gr).
        </p>
      </div>

      {/* Instruction Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-3">
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <FileCheck2 className="w-4 h-4" />
          Petunjuk Pengerjaan Tugas
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          {assignmentData?.instruction ||
            'Buatlah laporan atau produk digital sesuai materi modul ini. Unggah berkas dalam format PDF, DOCX, ZIP, Gambar, atau cantumkan tautan Google Drive / GitHub.'}
        </p>

        <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
          <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">PDF</span>
          <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">DOCX</span>
          <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">PNG / JPG</span>
          <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">ZIP</span>
          <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">Google Drive Link</span>
          <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">GitHub Link</span>
        </div>
      </div>

      {/* Submission Status or Upload Form */}
      {mySubmission ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Status Tugas Anda</h3>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                mySubmission.status === 'graded'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              }`}
            >
              {mySubmission.status === 'graded' ? '✔ Sudah Dinilai' : '⏳ Menunggu Penilaian Guru'}
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div>
              <span className="text-slate-500 block">Waktu Pengiriman:</span>
              <span className="font-mono text-white">{mySubmission.submittedAt}</span>
            </div>

            <div>
              <span className="text-slate-500 block">Berkas / Tautan:</span>
              <span className="font-mono text-cyan-300 underline">{mySubmission.fileName || mySubmission.externalLink}</span>
            </div>

            {mySubmission.notes && (
              <div>
                <span className="text-slate-500 block">Catatan Anda:</span>
                <p className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 italic">
                  "{mySubmission.notes}"
                </p>
              </div>
            )}

            {mySubmission.status === 'graded' && (
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/40 rounded-2xl space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">NILAI DARI GURU:</span>
                  <span className="text-2xl font-extrabold font-mono text-emerald-300">{mySubmission.score} / 100</span>
                </div>
                {mySubmission.feedback && (
                  <div className="text-xs text-slate-200">
                    <strong>Catatan Feedback Guru:</strong> "{mySubmission.feedback}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-5 backdrop-blur-md">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-cyan-400" />
            Formulir Pengiriman Tugas Praktik
          </h3>

          {errorMessage && (
            <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">PILIH FILE SIMULASI</label>
            <input
              type="file"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
              className="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-cyan-300 hover:file:bg-slate-700 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">ATAU TAUTAN LINK ONLINE (DRIVE / GITHUB)</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl">
              <Link2 className="w-4 h-4 text-slate-500" />
              <input
                type="url"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                placeholder="https://drive.google.com/file/d/... atau https://github.com/..."
                className="w-full bg-transparent text-xs text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">CATATAN TAMBAHAN KEPADA GURU</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tuliskan catatan penjelasan pengerjaan tugas Anda..."
              className="w-full h-24 bg-slate-950 border border-slate-800 text-xs text-slate-200 p-3 rounded-xl focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-3 rounded-2xl transition shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            Kirimkan Tugas Praktik (+80 XP)
          </button>
        </form>
      )}
    </div>
  );
};
