import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { StudentProfile } from '../../types';

export const WhatsAppButton: React.FC = () => {
  const { userSession } = useAuth();
  const { settings } = useApp();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const student = userSession?.role === 'student' ? (userSession.profile as StudentProfile) : null;

  const phoneWA = settings.teacherPhoneWA || '081223546686';
  const teacherName = settings.teacherName || 'Ruli Lesmana, S.T. Gr';

  const generateWAMessage = () => {
    const nama = student ? student.name : '[Nama Siswa]';
    const nis = student ? student.nis : '[NIS]';
    const kelas = student ? student.classGroup : '[Kelas]';

    const text = `Halo Pak/Bu ${teacherName}

Saya:

Nama: ${nama}
NIS: ${nis}
Kelas: ${kelas}

Saya ingin bertanya mengenai materi Informatika.`;

    return encodeURIComponent(text);
  };

  const formattedPhone = phoneWA.startsWith('0') ? `62${phoneWA.slice(1)}` : phoneWA;
  const waUrl = `https://wa.me/${formattedPhone}?text=${generateWAMessage()}`;

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Help Modal Banner */}
      {isOpen && (
        <div className="bg-slate-900 border border-emerald-500/40 p-4 rounded-2xl shadow-2xl w-80 backdrop-blur-xl animate-fadeIn">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">Bantuan WhatsApp Guru</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Punya pertanyaan mengenai materi atau tugas Informatika? Hubungi <strong className="text-emerald-400">{teacherName}</strong> via WhatsApp resmi.
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <span>Kirim Pesan WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Hubungi Guru via WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/30 transition-transform hover:scale-110 cursor-pointer border-2 border-emerald-300"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </div>
  );
};
