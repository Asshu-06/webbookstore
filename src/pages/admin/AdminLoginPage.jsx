import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, AlertCircle, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isDemoMode } from '../../lib/supabase';

export default function AdminLoginPage() {
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
    navigate('/admin/dashboard');
  };

  const handleDemo = () => {
    demoLogin('ADMIN');
    navigate('/admin/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 56, height: 56, background: 'var(--accent)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto .85rem' }}>
            <Shield size={26} color="#fff" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#fff', fontSize: '1.6rem', marginBottom: '.3rem' }}>Admin Panel</h1>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '.85rem' }}>Gyan Akshar Sanskriti Foundation</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
          {isDemoMode && (
            <div style={{ background: 'rgba(184,134,75,.15)', border: '1px solid rgba(184,134,75,.3)', borderRadius: 'var(--radius)', padding: '.8rem 1rem', marginBottom: '1.5rem', fontSize: '.8rem', color: 'var(--accent-light)', display: 'flex', gap: '.5rem' }}>
              <Zap size={13} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>Demo Mode active — use the Demo Login button.</span>
            </div>
          )}

          {error && (
            <div style={{ background: 'rgba(220,38,38,.15)', border: '1px solid rgba(220,38,38,.3)', borderRadius: 'var(--radius)', padding: '.8rem 1rem', marginBottom: '1.25rem', fontSize: '.84rem', color: '#fca5a5', display: 'flex', gap: '.5rem' }}>
              <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ color: 'rgba(255,255,255,.7)' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} style={{ position: 'absolute', left: '.85rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,.35)' }} />
                <input className="form-input" type="email" required placeholder="admin@example.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={{ paddingLeft: '2.4rem', background: 'rgba(255,255,255,.06)', borderColor: 'rgba(255,255,255,.12)', color: '#fff' }} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" style={{ color: 'rgba(255,255,255,.7)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} style={{ position: 'absolute', left: '.85rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,.35)' }} />
                <input className="form-input" type="password" required placeholder="Password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  style={{ paddingLeft: '2.4rem', background: 'rgba(255,255,255,.06)', borderColor: 'rgba(255,255,255,.12)', color: '#fff' }} />
              </div>
            </div>
            <button type="submit" className="btn btn-accent" style={{ width: '100%', justifyContent: 'center', padding: '.75rem' }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In to Admin Panel'}
            </button>
          </form>

          {isDemoMode && (
            <>
              <div className="divider" style={{ margin: '1.1rem 0', color: 'rgba(255,255,255,.25)' }}><span>or</span></div>
              <button onClick={handleDemo} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '.75rem', borderColor: 'rgba(255,255,255,.2)', color: 'rgba(255,255,255,.75)' }}>
                <Zap size={15} /> Demo Admin Login
              </button>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '.78rem', color: 'rgba(255,255,255,.35)' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,.5)' }}>← Back to Website</Link>
        </p>
      </div>
    </div>
  );
}
