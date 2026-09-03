import { Link } from 'react-router-dom';
import { BookOpen, Users, UserCheck, GraduationCap, MessageSquare, Activity, ArrowRight, TrendingUp } from 'lucide-react';
import { BOOKS, ACTIVITIES } from '../../data';

const STATS = [
  { label: 'Total Books', value: String(BOOKS.length), icon: BookOpen, color: 'var(--primary)', to: '/admin/books' },
  { label: 'Total Authors', value: '6', icon: Users, color: 'var(--accent-dark)', to: '/admin/authors' },
  { label: 'Pending Memberships', value: '3', icon: UserCheck, color: '#16a34a', to: '/admin/membership' },
  { label: 'Internship Apps', value: '5', icon: GraduationCap, color: '#7c3aed', to: '/admin/internship' },
  { label: 'New Enquiries', value: '8', icon: MessageSquare, color: '#d97706', to: '/admin/enquiries' },
  { label: 'Activities', value: String(ACTIVITIES.length), icon: Activity, color: 'var(--primary)', to: '/admin/activities' },
];

const FEED = [
  { text: 'New membership application — Life Member', time: '2 hours ago', color: 'var(--primary)' },
  { text: 'Internship application — Publishing & Editorial', time: '5 hours ago', color: 'var(--accent-dark)' },
  { text: 'Contact enquiry — Publication from R. Sharma', time: '1 day ago', color: '#d97706' },
  { text: 'New membership application — Student Member', time: '1 day ago', color: 'var(--primary)' },
  { text: 'Contact enquiry — General Enquiry received', time: '2 days ago', color: '#16a34a' },
];

const QUICK = [
  { label: 'Manage Books', to: '/admin/books', desc: 'Add, edit, or update publications' },
  { label: 'Review Memberships', to: '/admin/membership', desc: '3 pending applications' },
  { label: 'View Enquiries', to: '/admin/enquiries', desc: '8 new messages awaiting' },
  { label: 'Internship Applications', to: '/admin/internship', desc: '5 applications pending review' },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.6rem', marginBottom: '.2rem' }}>Dashboard</h1>
        <p style={{ color: 'var(--muted)', fontSize: '.875rem' }}>Welcome back. Here's an overview of the foundation's activity.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        {STATS.map(s => {
          const Icon = s.icon;
          return (
            <Link key={s.label} to={s.to} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)', transition: 'box-shadow .15s, transform .15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = ''; }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.75rem' }}>
                  <Icon size={18} color={s.color} />
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1, marginBottom: '.2rem' }}>{s.value}</div>
                <div style={{ fontSize: '.75rem', color: 'var(--muted)', fontWeight: 500 }}>{s.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Feed */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>Recent Activity</h3>
            <TrendingUp size={16} color="var(--muted)" />
          </div>
          <div>
            {FEED.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '.85rem', padding: '.85rem 1.5rem', borderBottom: i < FEED.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: 6 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '.84rem', color: 'var(--text)', lineHeight: 1.4, marginBottom: '.2rem' }}>{item.text}</p>
                  <p style={{ fontSize: '.73rem', color: 'var(--muted)' }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>Quick Actions</h3>
          </div>
          <div style={{ padding: '.5rem .75rem' }}>
            {QUICK.map(item => (
              <Link key={item.to} to={item.to} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '.85rem .75rem', borderRadius: 'var(--radius)', textDecoration: 'none',
                marginBottom: '.2rem', transition: 'background .15s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                onMouseLeave={e => e.currentTarget.style.background = ''}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '.875rem' }}>{item.label}</div>
                  <div style={{ fontSize: '.77rem', color: 'var(--muted)' }}>{item.desc}</div>
                </div>
                <ArrowRight size={15} color="var(--muted)" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .admin-dash-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
