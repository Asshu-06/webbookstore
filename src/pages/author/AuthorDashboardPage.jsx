import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, LogOut, TrendingUp, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BOOKS } from '../../data';

const DEMO_SALES = [
  { bookId: '1', amazon: 120, flipkart: 85, other: 34 },
  { bookId: '3', amazon: 210, flipkart: 140, other: 60 },
];
const DEMO_BOOKS = BOOKS.filter(b => ['1', '3'].includes(b.id));

export default function AuthorDashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.user_metadata?.full_name || 'Demo Author';
  const email = user?.email || 'author@gasfe.org';

  const handleLogout = async () => {
    await signOut();
    navigate('/author/login');
  };

  const totalSales = DEMO_SALES.reduce((acc, s) => acc + s.amazon + s.flipkart + s.other, 0);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{
        background: 'var(--primary-dark)', color: '#fff',
        padding: '0 clamp(1rem,3vw,2rem)', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <div style={{ width: 34, height: 34, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={17} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '.88rem' }}>Author Portal</div>
            <div style={{ fontSize: '.65rem', opacity: .55 }}>Gyan Akshar Sanskriti Foundation</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.85rem' }}>
          <span style={{ fontSize: '.82rem', opacity: .7, display: 'none' }} className="author-name-desktop">{displayName}</span>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '.4rem', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 6, color: 'rgba(255,255,255,.8)', padding: '.4rem .85rem', cursor: 'pointer', fontSize: '.8rem', fontWeight: 500 }}>
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </header>

      <div className="container" style={{ maxWidth: 1000, padding: 'clamp(1.25rem,3vw,2.5rem) clamp(1rem,4vw,3rem)' }}>
        {/* Profile */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)',
          padding: '1.75rem', marginBottom: '1.5rem',
          display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap',
        }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary-dark),var(--primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{displayName.charAt(0)}</span>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.25rem', marginBottom: '.2rem' }}>{displayName}</h2>
            <p style={{ color: 'var(--muted)', fontSize: '.85rem', marginBottom: '.3rem' }}>{email}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.75rem', color: 'var(--muted)' }}>
              <Calendar size={12} /> Author since January 2022
            </div>
          </div>
          <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
            <span className="badge badge-primary" style={{ fontSize: '.7rem' }}>Author</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.3rem', fontSize: '.72rem', color: 'var(--muted)', padding: '.3rem .65rem', background: 'var(--bg-off)', borderRadius: 'var(--radius)' }}>
              <Shield size={11} /> Read Only
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="dash-stats-row" style={{ marginBottom: "1.5rem" }}>
          {[
            { label: 'Published Books', value: String(DEMO_BOOKS.length), icon: BookOpen },
            { label: 'Total Copies Sold', value: String(totalSales), icon: TrendingUp },
            { label: 'Last Updated', value: 'Dec 2024', icon: Calendar },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', display: 'flex', gap: '.85rem', alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(184,134,75,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={19} color="var(--accent-dark)" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '.73rem', color: 'var(--muted)', marginTop: '.15rem' }}>{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Publications table */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '1.5rem' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>My Publications</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.72rem', color: 'var(--muted)', padding: '.3rem .65rem', background: 'var(--bg)', borderRadius: 'var(--radius)' }}>
              <Shield size={11} /> Read Only — Cannot be edited
            </div>
          </div>
          <div className="table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem', minWidth: 480 }}>
              <thead>
                <tr style={{ background: 'var(--bg)' }}>
                  {['Title', 'ISBN', 'Genre', 'Year', 'Status'].map(h => (
                    <th key={h} style={{ padding: '.65rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--muted)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO_BOOKS.map(book => (
                  <tr key={book.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '.8rem 1rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '.88rem' }}>{book.title}</div>
                      <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{book.author}</div>
                    </td>
                    <td style={{ padding: '.8rem 1rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '.75rem', whiteSpace: 'nowrap' }}>{book.isbn}</td>
                    <td style={{ padding: '.8rem 1rem' }}><span className="tag" style={{ fontSize: '.72rem' }}>{book.genre}</span></td>
                    <td style={{ padding: '.8rem 1rem', color: 'var(--muted)', fontSize: '.84rem' }}>{book.year}</td>
                    <td style={{ padding: '.8rem 1rem' }}><span className="badge badge-green" style={{ fontSize: '.68rem' }}>Published</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales table */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1rem', marginBottom: '.15rem' }}>Sales Breakdown</h3>
            <p style={{ fontSize: '.77rem', color: 'var(--muted)' }}>Platform-wise data — Last updated: December 2024</p>
          </div>
          <div className="table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem', minWidth: 420 }}>
              <thead>
                <tr style={{ background: 'var(--bg)' }}>
                  {['Book', 'Amazon', 'Flipkart', 'Other', 'Total Copies', 'Est. Royalty'].map(h => (
                    <th key={h} style={{ padding: '.65rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--muted)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO_SALES.map(sale => {
                  const book = BOOKS.find(b => b.id === sale.bookId);
                  const total = sale.amazon + sale.flipkart + sale.other;
                  const royalty = Math.round(total * (book?.price || 0) * 0.12);
                  return (
                    <tr key={sale.bookId} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '.8rem 1rem', fontWeight: 600, color: 'var(--text)', fontSize: '.87rem' }}>{book?.title}</td>
                      <td style={{ padding: '.8rem 1rem', color: 'var(--muted)' }}>{sale.amazon}</td>
                      <td style={{ padding: '.8rem 1rem', color: 'var(--muted)' }}>{sale.flipkart}</td>
                      <td style={{ padding: '.8rem 1rem', color: 'var(--muted)' }}>{sale.other}</td>
                      <td style={{ padding: '.8rem 1rem' }}><strong style={{ color: 'var(--primary)' }}>{total}</strong></td>
                      <td style={{ padding: '.8rem 1rem', color: 'var(--accent-dark)', fontWeight: 600, fontSize: '.85rem' }}>&#8377;{royalty.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '.78rem', color: 'var(--muted)' }}>
          <Link to="/" style={{ color: 'var(--muted)' }}>← Back to Foundation Website</Link>
        </p>
      </div>
    </div>
  );
}
