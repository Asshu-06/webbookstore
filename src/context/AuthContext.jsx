import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isDemoMode } from '../lib/supabase'

const AuthContext = createContext(null)

const DEMO_AUTHOR = {
  id: 'demo-author-id',
  email: 'author@gasfe.org',
  app_metadata: {},
  user_metadata: { role: 'AUTHOR', full_name: 'Demo Author' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
}

const DEMO_ADMIN = {
  id: 'demo-admin-id',
  email: 'admin@gasfe.org',
  app_metadata: {},
  user_metadata: { role: 'ADMIN', full_name: 'Admin User' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('AUTHOR')

  useEffect(() => {
    if (isDemoMode) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      setRole(s?.user?.user_metadata?.role || 'AUTHOR')
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      setRole(s?.user?.user_metadata?.role || 'AUTHOR')
    })
    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    if (isDemoMode) {
      return { error: 'Demo mode — use the Demo Login button.' }
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const signOut = async () => {
    if (isDemoMode) {
      setUser(null)
      setSession(null)
      return
    }
    await supabase.auth.signOut()
  }

  const demoLogin = (demoRole) => {
    const demoUser = demoRole === 'ADMIN' ? DEMO_ADMIN : DEMO_AUTHOR
    setUser(demoUser)
    setRole(demoRole)
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, role, signIn, signOut, demoLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
