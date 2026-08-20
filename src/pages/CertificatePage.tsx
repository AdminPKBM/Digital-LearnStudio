import React from 'react';
import { Award, Download, Printer, CheckCircle2, ShieldCheck, Sparkles, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { StudentProfile } from '../types';

export const CertificatePage: React.FC = () => {
  const { userSession } = useAuth();
  const { settings } = useApp();

  const isStudent = userSession?.role === 'student' || userSession?.role === 'SISWA';
  const student = isStudent ? (userSession.profile as StudentProfile) : null;

  const completedCount = student?.completedModuleIds.length || 0;
  const isEligible = completedCount >= 8; // Eligible if at least 8 modules finished

  const handlePrint = () => {
    window.print();
  };

  if (!student) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Silakan login sebagai siswa untuk melihat Sertifikat Kelulusan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Sertifikat Digital Otomatis</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Sertifikat Kelulusan Informatika (Fase E)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Sertifikat digital terverifikasi Kurikulum Merdeka SMKN Bojonggambir.
          </p>
        </div>

        {isEligible && (
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-2xl transition shadow-lg shadow-amber-500/20 self-start cursor-pointer print:hidden"
          >
            <Printer className="w-4 h-4" />
            Cetak / Download Sertifikat PDF
          </button>
        )}
      </div>

      {!isEligible ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 text-center space-y-4 max-w-xl mx-auto backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Sertifikat Belum Terbuka</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Anda baru menyelesaikan <strong>{completedCount} dari 16 Modul</strong>. Selesaikan minimal <strong>8 Modul</strong> untuk membuka Sertifikat Kelulusan Digital ini.
          </p>
        </div>
      ) : (
        /* Printable Official Certificate View */
        <div className="p-2 print:p-0">
          <div
            id="certificate-print-area"
            className="bg-slate-950 border-4 border-amber-500/40 rounded-3xl p-8 lg:p-12 relative overflow-hidden text-center space-y-6 shadow-2xl print:border-2 print:border-black print:bg-white print:text-black print:rounded-none"
          >
            {/* Background Seal Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Award className="w-96 h-96 text-amber-500" />
            </div>

            {/* School Header */}
            <div className="border-b-2 border-amber-500/40 pb-6 space-y-2 flex flex-col items-center">
              {settings.logoUrl && (
                <img
                  src={settings.logoUrl}
                  alt="Logo SMKN Bojonggambir"
                  className="w-16 h-16 object-contain mb-1 drop-shadow"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold print:text-black">
                SMK NEGERI BOJONGGAMBIR
              </div>
              <h1 className="text-xl lg:text-3xl font-serif font-extrabold text-white tracking-wider print:text-black">
                SERTIFIKAT KELULUSAN DIGITAL
              </h1>
              <p className="text-xs text-slate-400 print:text-gray-600 font-mono">
                Nomor Sertifikat: CERT/INF-FASE-E/2026/{student.nis}
              </p>
            </div>

            {/* Recipient Content */}
            <div className="space-y-3 py-4">
              <p className="text-xs text-slate-300 print:text-gray-700 italic">Diberikan secara sah kepada:</p>

              <h2 className="text-2xl lg:text-4xl font-extrabold text-amber-300 print:text-black tracking-wide underline decoration-amber-500/50">
                {student.name}
              </h2>

              <div className="text-xs font-mono text-slate-300 print:text-gray-700">
                NIS: <strong>{student.nis}</strong> • Kelas: <strong>{student.classGroup}</strong>
              </div>

              <p className="text-xs text-slate-300 print:text-gray-800 max-w-2xl mx-auto leading-relaxed pt-2">
                Atas keikutsertaan dan ketuntasan dalam menyelesaikan seluruh kompetensi <strong>8 Elemen Mata Pelajaran Informatika Kelas X (Fase E) Kurikulum Merdeka</strong> di SMKN Bojonggambir.
              </p>
            </div>

            {/* Signatures & QR Code */}
            <div className="pt-8 grid grid-cols-2 gap-8 text-xs border-t border-slate-800 print:border-gray-300">
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="w-20 h-20 bg-white p-1 rounded-xl border border-slate-700 flex items-center justify-center">
                  {/* QR Code SVG Placeholder */}
                  <svg className="w-full h-full text-slate-950" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm11-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm2-2h2v2h-2v-2zm0 4h2v2h-2v-2z" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono text-slate-400 print:text-gray-600 mt-1">Verifikasi QR Keaslian</span>
              </div>

              <div className="flex flex-col items-center justify-center space-y-1 text-center">
                <p className="text-slate-400 print:text-gray-600">Tasikmalaya, {new Date().toLocaleDateString('id-ID')}</p>
                <p className="text-slate-300 print:text-gray-800 font-bold">Guru Mata Pelajaran Informatika</p>
                <div className="h-12 flex items-center justify-center font-serif text-amber-400 print:text-black italic font-bold">
                  Ruli Lesmana, S.T. Gr
                </div>
                <p className="text-[10px] font-mono text-slate-400 print:text-gray-600">NIP. 19850412 201101 1 008</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
