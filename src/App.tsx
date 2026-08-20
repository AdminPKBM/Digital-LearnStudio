import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { PWABanner } from './components/common/PWABanner';
import { ConnectionToast } from './components/common/ConnectionToast';

import { Dashboard } from './pages/Dashboard';
import { ModulesPage } from './pages/ModulesPage';
import { ModuleDetailPage } from './pages/ModuleDetailPage';
import { QuizPage } from './pages/QuizPage';
import { AssignmentPage } from './pages/AssignmentPage';
import { SandboxesPage } from './pages/SandboxesPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { CertificatePage } from './pages/CertificatePage';
import { StudentGradesPage } from './pages/StudentGradesPage';
import { TeacherDashboardPage } from './pages/TeacherDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';

// Protected Route Guard for authenticated users
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const { userSession } = useAuth();
  const location = useLocation();

  if (!userSession) {
    // Redirect unauthenticated users strictly to Login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check if specific role required (e.g. GURU)
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = userSession.role;
    const isAllowed = allowedRoles.some(
      (r) => r.toUpperCase() === userRole.toUpperCase() || (r === 'GURU' && userRole === 'teacher') || (r === 'SISWA' && userRole === 'student')
    );
    if (!isAllowed) {
      // Access Denied: redirect to student dashboard
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

// Public Only Route Guard (for Login Page)
const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userSession } = useAuth();

  if (userSession) {
    const isTeacher = userSession.role === 'GURU' || userSession.role === 'teacher';
    if (isTeacher) {
      return <Navigate to="/teacher-portal" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function MainLayout() {
  const { userSession } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col">
      <PWABanner />
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {userSession && <Sidebar />}

        <main className={`flex-1 p-4 lg:p-8 overflow-y-auto mb-16 lg:mb-0 ${!userSession ? 'w-full' : ''}`}>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <LoginPage />
                </PublicOnlyRoute>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/modules"
              element={
                <ProtectedRoute>
                  <ModulesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/module/:id"
              element={
                <ProtectedRoute>
                  <ModuleDetailPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/quiz/:moduleId"
              element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/assignment/:moduleId"
              element={
                <ProtectedRoute>
                  <AssignmentPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/sandboxes"
              element={
                <ProtectedRoute>
                  <SandboxesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <LeaderboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-grades"
              element={
                <ProtectedRoute>
                  <StudentGradesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/grades"
              element={
                <ProtectedRoute>
                  <StudentGradesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/certificate"
              element={
                <ProtectedRoute>
                  <CertificatePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/teacher-portal"
              element={
                <ProtectedRoute allowedRoles={['GURU', 'teacher']}>
                  <TeacherDashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin-panel"
              element={
                <ProtectedRoute allowedRoles={['GURU', 'teacher', 'admin']}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <WhatsAppButton />
      <ConnectionToast />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <MainLayout />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
