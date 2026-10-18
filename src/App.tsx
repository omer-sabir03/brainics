import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Components
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import VerifyEmailPage from './components/auth/VerifyEmailPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/common/Layout'
import EnhancedDashboardPage from './components/dashboard/EnhancedDashboardPage'
import UserManagementPage from './components/users/UserManagementPage'
import TeacherManagementPage from './components/teachers/TeacherManagementPage'
import EnquiryManagementPage from './components/enquiries/EnquiryManagementPage'
import AuditLogsPage from './components/audit/AuditLogsPage'
import TeacherPortalPage from './components/portal/TeacherPortalPage'
import StudentPortalPage from './components/portal/StudentPortalPage'

function App() {
  return (
    <ThemeProvider>
      {/* The app is mounted under /admin by the Next.js catch-all route */}
      <Router basename="/admin">
        <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />

          {/* Admin dashboard */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route
              element={
                <Layout>
                  <EnhancedDashboardPage />
                </Layout>
              }
              path="/"
            />
            <Route
              element={
                <Layout>
                  <UserManagementPage />
                </Layout>
              }
              path="/users"
            />
            <Route
              element={
                <Layout>
                  <TeacherManagementPage />
                </Layout>
              }
              path="/teachers"
            />
            <Route
              element={
                <Layout>
                  <EnquiryManagementPage />
                </Layout>
              }
              path="/enquiries"
            />
            <Route
              element={
                <Layout>
                  <AuditLogsPage />
                </Layout>
              }
              path="/audit-logs"
            />
          </Route>

          {/* Teacher portal */}
          <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
            <Route element={<TeacherPortalPage />} path="/teacher" />
          </Route>

          {/* Student portal */}
          <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
            <Route element={<StudentPortalPage />} path="/student" />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

          <ToastContainer position="bottom-right" autoClose={4000} />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
