import AdminApp from './AdminApp'

// Static export needs every admin path listed so each gets an HTML shell.
// React Router renders the matching screen from the URL on the client.
export function generateStaticParams() {
  return ['login', 'register', 'verify-email', 'teacher-login', 'users', 'teachers', 'enquiries', 'audit-logs', 'teacher', 'student'].map((segment) => ({
    slug: [segment],
  }))
}

export default function AdminCatchAll() {
  return <AdminApp />
}
