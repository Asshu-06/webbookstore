import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, Activity, Image,
  UserCheck, GraduationCap, MessageSquare, FileText,
  LogOut, BookMarked, Menu, X, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/books', icon: BookOpen, label: 'Books' },
  { to: '/admin/authors', icon: BookMarked, label: 'Authors' },
  { to: '/admin/activities', icon: Activity, label: 'Activities' },
  { to: '/admin/gallery', icon: Image, label: 'Gallery' },
  { to: '/admin/membership', icon: UserCheck, label: 'Membership' },
  { to: '/admin/internship', icon: GraduationCap, label: 'Internship' },
  { to: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries' },
  { to: '/admin/compliances', icon: FileText, label: 'Compliance' },
];

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const displayName = user?.user_metadata?.full_name || user?.email || 'Admin';
  const initials = displayName.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 250 }} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside style={{
        width: 230, flexShrink: 0,
        background: 'var(--primary-dark)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, bottom: 0, left: 0,
        zIndex: 300,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform .25s ease',
        overflowY: 'auto',
      }} className="admin-sidebar">
        {/* Logo */}
        <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <div style={{ width: 34, height: 34, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BookOpen size={17} color="#fff" />
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '.85rem', lineHeight: 1.2 }}>GASFE Admin</div>
              <div style={{ color: 'rgba(255,255,255,.4)', fontSize: '.6rem', letterSpacing: '.06em', textTransform: 'uppercase' }}>Control Panel</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.4)', cursor: 'pointer', padding: 2 }} className="admin-close-btn">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '.6rem .6rem' }}>
          {NAV.map(item => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} end={item.to === '/admin/dashboard'}
                className={({ isActive }) => 'admin-nav-link' + (isActive ? ' active' : '')}
                onClick={() => setSidebarOpen(false)}>
                <Icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: '.85rem', borderTop: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', marginBottom: '.75rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '.75rem', fontWeight: 700, color: '#fff' }}>{initials}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: '#fff', fontSize: '.78rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</div>
              <div style={{ color: 'rgba(255,255,255,.35)', fontSize: '.65rem' }}>Super Admin</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '.5rem', width: '100%',
            background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)',
            borderRadius: 6, color: 'rgba(255,255,255,.65)', padding: '.5rem .75rem',
            cursor: 'pointer', fontSize: '.8rem', fontWeight: 500, transition: 'background .15s',
          }}>
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 0, minWidth: 0 }} className="admin-main">
        {/* Top bar */}
        <header style={{
          background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          padding: '0 1.5rem', height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 100, flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.85rem' }}>
            <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex', alignItems: 'center', padding: '.3rem' }}>
              <Menu size={20} />
            </button>
            <span style={{ fontSize: '.85rem', color: 'var(--muted)', fontWeight: 500 }}>
              Gyan Akshar Sanskriti Foundation
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <span className="badge badge-accent" style={{ fontSize: '.7rem' }}>Demo Mode</span>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 700, color: '#fff' }}>{initials}</div>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)', padding: 'clamp(1.25rem,3vw,2rem)' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        .admin-nav-link {
          display: flex; align-items: center; gap: .55rem;
          padding: .55rem .8rem; border-radius: 7px;
          color: rgba(255,255,255,.6); font-size: .83rem; font-weight: 500;
          margin-bottom: .2rem; transition: all .15s;
          text-decoration: none;
        }
        .admin-nav-link:hover { background: rgba(255,255,255,.08); color: rgba(255,255,255,.9); }
        .admin-nav-link.active { background: rgba(255,255,255,.13); color: #fff; }
        .admin-nav-link.active svg { color: var(--accent-light); }
        .admin-close-btn { display: none; }
        @media (max-width: 900px) { .admin-close-btn { display: flex !important; } }
        @media (min-width: 901px) {
          .admin-sidebar {
            transform: translateX(0) !important;
            position: sticky !important;
            height: 100vh;
          }
          .admin-main { margin-left: 0; }
        }
      `}</style>
    </div>
  );
}
