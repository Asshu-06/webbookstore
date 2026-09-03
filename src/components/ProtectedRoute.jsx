import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, allowedRoles, redirectTo }) {
  const { user, loading, role } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    const fallback = redirectTo || (allowedRoles && allowedRoles.includes('ADMIN') ? '/admin/login' : '/author/login')
    return <Navigate to={fallback} replace />
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    const fallback = redirectTo || '/admin/login'
    return <Navigate to={fallback} replace />
  }

  return <>{children}</>
}
