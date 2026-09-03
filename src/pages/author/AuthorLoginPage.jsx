import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Mail, Lock, AlertCircle, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isDemoMode } from '../../lib/supabase';

export default function AuthorLoginPage() {
  const { signIn, demoLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) { setError(err); return; }
    navigate('/author/dashboard');
  };

  const handleDemo = () => {
    demoLogin('AUTHOR');
    navigate('/author/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--primary-dark)', padding: '.75rem 0', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={17} color="#fff" />
            </div>
            <div>
              <div style={{ color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '.88rem' }}>Gyan Akshar Sanskriti Foundation</div>
            </div>
          </Link>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          {/* Card */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'clamp(1.75rem,5vw,2.5rem)', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg,var(--primary-dark),var(--primary-light))', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.1rem' }}>
                <BookOpen size={26} color="#fff" />
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '.35rem' }}>Author Login</h1>
              <p style={{ color: 'var(--muted)', fontSize: '.875rem' }}>Access your publication dashboard</p>
            </div>

            {isDemoMode && (
              <div style={{ background: 'rgba(184,134,75,.1)', border: '1px solid rgba(184,134,75,.3)', borderRadius: 'var(--radius)', padding: '.85rem 1rem', marginBottom: '1.5rem', fontSize: '.82rem', color: 'var(--accent-dark)', display: 'flex', gap: '.5rem', alignItems: 'flex-start' }}>
                <Zap size={14} style={{ marginTop: 1, flexShrink: 0 }} />
                <span><strong>Demo Mode</strong> — Supabase not configured. Use the Demo Login button below.</span>
              </div>
            )}

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius)', padding: '.85rem 1rem', marginBottom: '1.25rem', fontSize: '.85rem', color: '#dc2626', display: 'flex', gap: '.5rem', alignItems: 'flex-start' }}>
                <AlertCircle size={15} style={{ marginTop: 1, flexShrink: 0 }} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} style={{ position: 'absolute', left: '.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                  <input id="email" className="form-input" type="email" required placeholder="author@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    style={{ paddingLeft: '2.4rem' }} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} style={{ position: 'absolute', left: '.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                  <input id="password" className="form-input" type="password" required placeholder="Your password"
                    value={password} onChange={e => setPassword(e.target.value)}
                    style={{ paddingLeft: '2.4rem' }} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '.75rem', marginTop: '.5rem' }} disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In to Dashboard'}
              </button>
            </form>

            {isDemoMode && (
              <>
                <div className="divider" style={{ margin: '1.25rem 0' }}>or</div>
                <button onClick={handleDemo} className="btn btn-accent" style={{ width: '100%', justifyContent: 'center', padding: '.75rem' }}>
                  <Zap size={16} /> Demo Login (Author)
                </button>
              </>
            )}

            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '.8rem', color: 'var(--muted)' }}>
              Are you an admin? <Link to="/admin/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Admin Login</Link>
            </p>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '.8rem', color: 'var(--muted)' }}>
            <Link to="/" style={{ color: 'var(--primary)' }}>← Back to Foundation Website</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
