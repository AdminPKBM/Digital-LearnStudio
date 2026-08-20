import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, UserSession, StudentProfile, TeacherProfile, UserAccount } from '../types';
import { StorageService } from '../services/storage';
import { defaultTeacher } from '../data/seedData';
import { GASService } from '../services/gasService';

interface AuthContextType {
  userSession: UserSession | null;
  login: (username: string, passwordInput: string) => Promise<{ success: boolean; message: string; role?: 'GURU' | 'SISWA' }>;
  loginAsStudent: (nis: string, name: string) => { success: boolean; message: string; role?: 'SISWA' };
  loginAsTeacher: (email: string) => { success: boolean; message: string; role?: 'GURU' };
  loginAsAdmin: (email: string) => { success: boolean; message: string; role?: 'GURU' };
  logout: () => void;
  updateStudentState: (updated: StudentProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  useEffect(() => {
    StorageService.init();
    const savedSession = localStorage.getItem('learnstudio_active_session_v1');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession) as UserSession;
        // Verify user account status
        const user = StorageService.getUserByUsername(session.user_id) || 
                     StorageService.getUsers().find(u => u.id_user === session.user_id || u.nama === session.nama);
        
        if (user && user.status === 'NONAKTIF') {
          // Inactive account session invalidated
          localStorage.removeItem('learnstudio_active_session_v1');
          setUserSession(null);
          return;
        }

        // If student, refresh profile from storage
        if ((session.role === 'SISWA' || session.role === 'student') && session.profile) {
          const freshStudent = StorageService.getStudentByNis((session.profile as StudentProfile).nis);
          if (freshStudent) {
            session.profile = freshStudent;
          }
        }
        setUserSession(session);
      } catch (e) {
        console.error('Failed to parse active session', e);
        localStorage.removeItem('learnstudio_active_session_v1');
        setUserSession(null);
      }
    } else {
      // TIDAK ADA AUTO LOGIN — WAJIB LOGIN SIKAP UTAMA
      setUserSession(null);
    }
  }, []);

  const saveSession = (session: UserSession | null) => {
    setUserSession(session);
    if (session) {
      localStorage.setItem('learnstudio_active_session_v1', JSON.stringify(session));
    } else {
      localStorage.removeItem('learnstudio_active_session_v1');
    }
  };

  const login = async (usernameInput: string, passwordInput: string): Promise<{ success: boolean; message: string; role?: 'GURU' | 'SISWA' }> => {
    const cleanUser = usernameInput.trim();
    const cleanPass = passwordInput.trim();

    if (!cleanUser || !cleanPass) {
      return { success: false, message: 'Username dan Password wajib diisi!' };
    }

    // 1. Optional GAS Remote Verification if configured
    const settings = StorageService.getSettings();
    if (settings.gasApiUrl) {
      try {
        const gasResult = await GASService.fetchSheetData(settings.gasApiUrl, 'Users');
        if (gasResult && gasResult.success && gasResult.data) {
          // Sync remote users to local storage if available
          gasResult.data.forEach((u: any) => {
            if (u.ID || u.Username || u.NIS) {
              StorageService.saveUser({
                id_user: u.ID || `usr-${u.NIS || u.Username}`,
                username: u.Username || u.NIS || u.NIP_NIS || '',
                password_hash: u.Password || 'bismillah',
                nama: u.Name || u.Nama || '',
                role: (u.Role === 'GURU' || u.Role === 'Guru') ? 'GURU' : 'SISWA',
                status: u.Status === 'NONAKTIF' ? 'NONAKTIF' : 'AKTIF',
                email: u.Email,
                nis: u.NIS || u.NIP_NIS,
                classGroup: u.Class || u.Kelas,
              });
            }
          });
        }
      } catch (err) {
        console.warn('GAS Auth sync fallback to local storage:', err);
      }
    }

    // 2. Local Database Account Check
    let user = StorageService.getUserByUsername(cleanUser);

    if (!user) {
      const student = StorageService.getStudentByNis(cleanUser);
      if (student) {
        user = {
          id_user: `usr-${student.id}`,
          username: student.nis,
          password_hash: 'bismillah',
          nama: student.name,
          role: 'SISWA',
          status: 'AKTIF',
          nis: student.nis,
          classGroup: student.classGroup || 'X DKV 1',
        };
        StorageService.saveUser(user);
      }
    }

    if (!user || user.password_hash !== cleanPass) {
      return { success: false, message: 'Username / NIS atau Password salah.' };
    }

    if (user.status === 'NONAKTIF') {
      return { success: false, message: 'Akun Anda sedang tidak aktif. Silakan hubungi guru.' };
    }

    // Update last_login
    user.last_login = new Date().toISOString();
    StorageService.saveUser(user);

    if (user.role === 'GURU') {
      const teachers = StorageService.getTeachers();
      const teacher = teachers.find((t) => t.email.toLowerCase() === user.email?.toLowerCase()) || defaultTeacher;
      const session: UserSession = {
        user_id: user.id_user,
        nama: user.nama,
        role: 'GURU',
        status: user.status,
        waktu_login: new Date().toISOString(),
        profile: teacher,
      };
      saveSession(session);
      return { success: true, message: `Selamat datang kembali Pak/Bu ${user.nama}!`, role: 'GURU' };
    } else {
      // Role SISWA
      let student = StorageService.getStudentByNis(user.nis || user.username);
      if (!student) {
        student = {
          id: `student-${Date.now()}`,
          nis: user.nis || user.username,
          name: user.nama,
          classGroup: user.classGroup || 'X DKV 1',
          xp: 10,
          level: 1,
          streakDays: 1,
          lastLoginDate: new Date().toISOString().split('T')[0],
          completedModuleIds: [],
          bookmarkedModuleIds: [],
          badges: ['first_login'],
          notes: {},
          email: user.email,
        };
        StorageService.saveStudent(student);
      } else {
        const today = new Date().toISOString().split('T')[0];
        if (student.lastLoginDate !== today) {
          student.streakDays += 1;
          student.lastLoginDate = today;
          student.xp += 10;
          StorageService.saveStudent(student);
        }
      }

      // Record automatic presensi & login history
      const { loginLog } = StorageService.recordStudentLogin({
        id: student.id,
        nis: student.nis,
        name: student.name,
        classGroup: student.classGroup || 'X DKV 1',
      });

      const session: UserSession = {
        user_id: user.id_user,
        nama: user.nama,
        role: 'SISWA',
        status: user.status,
        waktu_login: new Date().toISOString(),
        profile: student,
        session_id: loginLog.session_id,
      };
      saveSession(session);
      return { success: true, message: `Selamat datang kembali, ${user.nama}!`, role: 'SISWA' };
    }
  };

  const loginAsStudent = (nis: string, name: string) => {
    const student = StorageService.getStudentByNis(nis) || {
      id: `student-${Date.now()}`,
      nis,
      name,
      classGroup: 'X DKV 1',
      xp: 10,
      level: 1,
      streakDays: 1,
      lastLoginDate: new Date().toISOString().split('T')[0],
      completedModuleIds: [],
      bookmarkedModuleIds: [],
      badges: ['first_login'],
      notes: {},
    };
    StorageService.saveStudent(student);

    const { loginLog } = StorageService.recordStudentLogin({
      id: student.id,
      nis: student.nis,
      name: student.name,
      classGroup: student.classGroup || 'X DKV 1',
    });

    const session: UserSession = {
      user_id: `usr-${student.id}`,
      nama: student.name,
      role: 'SISWA',
      status: 'AKTIF',
      waktu_login: new Date().toISOString(),
      profile: student,
      session_id: loginLog.session_id,
    };
    saveSession(session);
    return { success: true, message: `Selamat datang, ${student.name}!`, role: 'SISWA' as const };
  };

  const loginAsTeacher = (email: string) => {
    const teachers = StorageService.getTeachers();
    const teacher = teachers.find((t) => t.email.toLowerCase() === email.trim().toLowerCase()) || defaultTeacher;
    const session: UserSession = {
      user_id: 'usr-teacher-1',
      nama: teacher.name,
      role: 'GURU',
      status: 'AKTIF',
      waktu_login: new Date().toISOString(),
      profile: teacher,
    };
    saveSession(session);
    return { success: true, message: `Selamat datang Pak/Bu ${teacher.name}`, role: 'GURU' as const };
  };

  const loginAsAdmin = (email: string) => {
    return loginAsTeacher(email);
  };

  const logout = () => {
    if (userSession && (userSession.role === 'SISWA' || userSession.role === 'student') && userSession.profile) {
      const st = userSession.profile as StudentProfile;
      StorageService.recordStudentLogout(st.id, st.name, st.classGroup, userSession.session_id);
    }
    saveSession(null);
  };

  const updateStudentState = (updated: StudentProfile) => {
    StorageService.saveStudent(updated);
    if (userSession && (userSession.role === 'SISWA' || userSession.role === 'student')) {
      saveSession({ ...userSession, profile: updated });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userSession,
        login,
        loginAsStudent,
        loginAsTeacher,
        loginAsAdmin,
        logout,
        updateStudentState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
