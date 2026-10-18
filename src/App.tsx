import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Components
import LoginPage from './components/auth/LoginPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/common/Layout'
import EnhancedDashboardPage from './components/dashboard/EnhancedDashboardPage'
import UserManagementPage from './components/users/UserManagementPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Login route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes with layout */}
          <Route element={<ProtectedRoute />}>
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
                  <div className="text-center py-12">
                    <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
                    <p className="text-gray-600 mt-2">Coming Soon in Sprint 4</p>
                  </div>
                </Layout>
              }
              path="/teachers"
            />
            <Route
              element={
                <Layout>
                  <div className="text-center py-12">
                    <h1 className="text-3xl font-bold text-gray-900">Enquiry Management</h1>
                    <p className="text-gray-600 mt-2">Coming Soon in Sprint 4</p>
                  </div>
                </Layout>
              }
              path="/enquiries"
            />
            <Route
              element={
                <Layout>
                  <div className="text-center py-12">
                    <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
                    <p className="text-gray-600 mt-2">Coming Soon in Sprint 5</p>
                  </div>
                </Layout>
              }
              path="/audit-logs"
            />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer position="bottom-right" autoClose={4000} />
      </AuthProvider>
    </Router>
  )
}

export default App
