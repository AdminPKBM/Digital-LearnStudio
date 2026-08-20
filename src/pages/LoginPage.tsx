import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, Lock, User, AlertCircle, ArrowRight, GraduationCap, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';
import { StudentProfile } from '../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { classes, settings } = useApp();

  const [loginMode, setLoginMode] = useState<'STUDENT_DROPDOWN' | 'MANUAL'>('STUDENT_DROPDOWN');
  const [studentsList, setStudentsList] = useState<StudentProfile[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedNis, setSelectedNis] = useState<string>('');

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const stds = StorageService.getStudents();
    setStudentsList(stds);

    const availableClasses = Array.from(
      new Set([...classes.map((c) => c.name), ...stds.map((s) => s.classGroup).filter(Boolean)])
    ).sort();

    if (availableClasses.length > 0) {
      const defaultCls = availableClasses.find((c) => c === 'X DKV 1') || availableClasses[0];
      setSelectedClass(defaultCls);
      const matched = stds.filter((s) => s.classGroup === defaultCls);
      if (matched.length > 0) {
        setSelectedNis(matched[0].nis);
      }
    }
  }, [classes]);

  const handleClassChange = (newClass: string) => {
    setSelectedClass(newClass);
    const matched = studentsList.filter((s) => s.classGroup === newClass);
    if (matched.length > 0) {
      setSelectedNis(matched[0].nis);
    } else {
      setSelectedNis('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      let targetUser = username;
      if (loginMode === 'STUDENT_DROPDOWN') {
        if (!selectedNis) {
          setErrorMessage('Silakan pilih nama siswa dari daftar terlebih dahulu.');
          setIsLoading(false);
          return;
        }
        targetUser = selectedNis;
      }

      const result = await login(targetUser, password);
      if (result.success) {
        if (result.role === 'GURU') {
          navigate('/teacher-portal', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        setErrorMessage(result.message);
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan sistem saat autentikasi. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const allClassNames = Array.from(
    new Set([...classes.map((c) => c.name), ...studentsList.map((s) => s.classGroup).filter(Boolean)])
  ).sort();

  const filteredStudents = studentsList
    .filter((s) => s.classGroup === selectedClass)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 p-1.5 mx-auto shadow-xl shadow-cyan-500/20 flex items-center justify-center overflow-hidden">
            {settings.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt="Logo SMKN Bojonggambir"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Sparkles className="w-7 h-7 text-cyan-400" />
            )}
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              LMS {settings.subjectName || 'Informatika'}
            </h2>
            <p className="text-xs font-semibold text-cyan-400 mt-0.5">
              {settings.schoolName || 'SMK Negeri Bojonggambir'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Portal Autentikasi Pengguna Terintegrasi
            </p>
          </div>
        </div>

        {/* Tab Selection Mode */}
        <div className="grid grid-cols-2 p-1 bg-slate-950 border border-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              setLoginMode('STUDENT_DROPDOWN');
              setErrorMessage('');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
              loginMode === 'STUDENT_DROPDOWN'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Pilih Siswa</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setLoginMode('MANUAL');
              setErrorMessage('');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
              loginMode === 'MANUAL'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Guru / Manual</span>
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start gap-2.5 text-rose-300 text-xs animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <div className="font-semibold leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMode === 'STUDENT_DROPDOWN' ? (
            <>
              {/* Field 1: Pilih Kelas */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>PILIH KELAS</span>
                  <span className="text-cyan-400 text-[10px]">Tersedia {allClassNames.length} Kelas</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <select
                    value={selectedClass}
                    onChange={(e) => handleClassChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white pl-10 pr-8 py-3 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition font-medium appearance-none cursor-pointer"
                    required
                  >
                    {allClassNames.map((cls) => (
                      <option key={cls} value={cls} className="bg-slate-900 text-white">
                        Kelas {cls}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 2: Pilih Nama Siswa */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>PILIH NAMA SISWA</span>
                  <span className="text-emerald-400 text-[10px]">{filteredStudents.length} Siswa</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <select
                    value={selectedNis}
                    onChange={(e) => setSelectedNis(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white pl-10 pr-8 py-3 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition font-medium appearance-none cursor-pointer"
                    required
                  >
                    {filteredStudents.length === 0 ? (
                      <option value="">-- Tidak ada siswa di kelas ini --</option>
                    ) : (
                      filteredStudents.map((st) => (
                        <option key={st.id} value={st.nis} className="bg-slate-900 text-white">
                          {st.name} (NIS: {st.nis})
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            </>
          ) : (
            /* Mode Manual / Guru */
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                USERNAME / NIS / EMAIL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan NIS atau Username (Contoh: guru01)..."
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white pl-10 pr-4 py-3 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition placeholder:text-slate-600 font-medium"
                  required
                />
              </div>
            </div>
          )}

          {/* Password Input (Shared for both modes) */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>PASSWORD</span>
              {loginMode === 'STUDENT_DROPDOWN' && (
                <span className="text-slate-400 text-[10px]">Default: bismillah</span>
              )}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={loginMode === 'STUDENT_DROPDOWN' ? 'Masukkan Password (default: bismillah)...' : 'Masukkan Password...'}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white pl-10 pr-10 py-3 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition placeholder:text-slate-600 font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs py-3.5 rounded-2xl transition shadow-lg shadow-cyan-500/25 cursor-pointer disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <span>Memvalidasi Akun...</span>
            ) : (
              <>
                <span>MASUK SEKARANG</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Credentials Info Box */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            Informasi Akun Login:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div
              onClick={() => {
                setLoginMode('MANUAL');
                setUsername('guru01');
                setPassword('bismillah123');
              }}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer group"
            >
              <div className="text-cyan-400 font-bold flex items-center justify-between">
                <span>Akun Guru / Admin</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 group-hover:bg-cyan-500 group-hover:text-slate-950 transition">Klik Isi</span>
              </div>
              <div className="text-slate-400 mt-1">Username: <span className="text-white font-mono font-semibold">guru01</span></div>
              <div className="text-slate-400">Password: <span className="text-white font-mono font-semibold">bismillah123</span></div>
            </div>

            <div
              onClick={() => {
                setLoginMode('STUDENT_DROPDOWN');
                setSelectedClass('X DKV 1');
                setPassword('bismillah');
              }}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 transition cursor-pointer group"
            >
              <div className="text-emerald-400 font-bold flex items-center justify-between">
                <span>Akun 102 Siswa</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-slate-950 transition">Pilih Siswa</span>
              </div>
              <div className="text-slate-400 mt-1">Metode: <span className="text-white font-semibold">Pilih Nama & Kelas</span></div>
              <div className="text-slate-400">Password: <span className="text-white font-mono font-semibold">bismillah</span></div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

