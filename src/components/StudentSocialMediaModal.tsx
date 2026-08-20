import React, { useState } from 'react';
import { X, Save, Share2, CheckCircle2, User, Mail, Phone, Sparkles } from 'lucide-react';
import { StudentProfile, SocialMediaHandles } from '../types';
import { useAuth } from '../context/AuthContext';

interface StudentSocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
}

interface SocialPlatform {
  key: keyof SocialMediaHandles;
  name: string;
  placeholder: string;
  prefix: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconSvg?: React.ReactNode;
}

export const PLATFORMS_CONFIG: SocialPlatform[] = [
  {
    key: 'tiktok',
    name: 'TikTok',
    placeholder: '@username_tiktok',
    prefix: '@',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
  },
  {
    key: 'instagram',
    name: 'Instagram',
    placeholder: '@username_ig',
    prefix: '@',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
  },
  {
    key: 'youtube',
    name: 'YouTube',
    placeholder: '@channel_youtube',
    prefix: '@',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
  },
  {
    key: 'facebook',
    name: 'Facebook',
    placeholder: 'nama.pengguna',
    prefix: 'fb.com/',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
];

export const StudentSocialMediaModal: React.FC<StudentSocialMediaModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  const { updateStudentState } = useAuth();

  const [email, setEmail] = useState<string>(student.email || '');
  const [phoneWA, setPhoneWA] = useState<string>(student.phoneWA || '');
  const [socials, setSocials] = useState<SocialMediaHandles>(student.socialMedia || {});
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSocialChange = (key: keyof SocialMediaHandles, val: string) => {
    setSocials((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedStudent: StudentProfile = {
      ...student,
      email: email.trim(),
      phoneWA: phoneWA.trim(),
      socialMedia: socials,
    };

    updateStudentState(updatedStudent);
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const filledCount = Object.values(socials).filter((v) => typeof v === 'string' && v.trim().length > 0).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl border border-cyan-500/30">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Update Kontak & Media Sosial Siswa
                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                  {filledCount} / 4 Akun Terisi
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Lengkapi identitas digital dan akun media sosial Anda untuk interaksi pembelajaran & portofolio.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Toast Alert */}
          {isSaved && (
            <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center gap-3 text-emerald-300 text-xs font-bold animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Profil dan akun media sosial berhasil diperbarui!</span>
            </div>
          )}

          {/* Section 1: Email & WhatsApp Utama */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              Informasi Kontak Utama
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email Siswa</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama.siswa@sekolah.sch.id"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Nomor WhatsApp Aktif</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={phoneWA}
                    onChange={(e) => setPhoneWA(e.target.value)}
                    placeholder="081234567890"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-800" />

          {/* Section 2: 15 Social Media Accounts Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Daftar Akun Media Sosial Disarankan
              </h4>
              <span className="text-[10px] text-slate-400">
                Lengkapi username/handle akun media sosial Anda
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PLATFORMS_CONFIG.map((platform) => {
                const val = socials[platform.key] || '';
                return (
                  <div
                    key={platform.key}
                    className={`p-3 rounded-2xl border ${platform.borderColor} ${platform.bgColor} space-y-1.5 transition-all`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${platform.color}`}>{platform.name}</span>
                      {val.trim() && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleSocialChange(platform.key, e.target.value)}
                        placeholder={platform.placeholder}
                        className="w-full bg-slate-950 border border-slate-800/80 text-xs text-white px-3 py-2 rounded-xl focus:outline-none focus:border-cyan-500 font-mono placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Submit Button */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg shadow-cyan-500/20 cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Profil & Media Sosial</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
