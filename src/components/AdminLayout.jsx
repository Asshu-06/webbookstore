import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, Activity, Image,
  UserCheck, GraduationCap, MessageSquare, FileText,
  LogOut, BookMarked, Menu, X, Globe, ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/books',     icon: BookOpen,        label: 'Books' },
  { to: '/admin/authors',   icon: BookMarked,      label: 'Authors' },
  { to: '/admin/activities',icon: Activity,        label: 'Activities' },
  { to: '/admin/gallery',   icon: Image,           label: 'Gallery' },
  { to: '/admin/membership',icon: UserCheck,       label: 'Membership' },
  { to: '/admin/internship',icon: GraduationCap,   label: 'Internship' },
  { to: '/admin/enquiries', icon: MessageSquare,   label: 'Enquiries' },
  { to: '/admin/compliances',icon: FileText,       label: 'Compliance' },
];

// Read public site URL from env — never hardcode the production domain
const PUBLIC_SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const displayName = user?.user_metadata?.full_name || user?.email || 'Admin';
  const initials = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-shell">
      {/* ── Mobile overlay ─────────────────────────────── */}
      {sidebarOpen && (
        <div className="admin-overlay" onClick={closeSidebar} />
      )}

      {/* ── Sidebar ────────────────────────────────────── */}
      <aside className={'admin-sidebar' + (sidebarOpen ? ' is-open' : '')}>
        {/* Logo */}
        <div className="admin-sidebar-logo">
          <div className="admin-sidebar-logo-icon">
            <BookOpen size={17} color="#fff" />
          </div>
          <div>
            <div className="admin-sidebar-title">GASFE Admin</div>
            <div className="admin-sidebar-sub">Control Panel</div>
          </div>
          <button className="admin-sidebar-close" onClick={closeSidebar} aria-label="Close sidebar">
            <X size={17} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="admin-nav">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin/dashboard'}
                className={({ isActive }) => 'admin-nav-link' + (isActive ? ' is-active' : '')}
                onClick={closeSidebar}
              >
                <Icon size={15} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* ── View Website — prominent, distinct from CRUD items ── */}
        <div className="admin-sidebar-divider" />
        <div style={{ padding: '0 .6rem .5rem' }}>
          <a
            href={PUBLIC_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-view-website"
            onClick={closeSidebar}
          >
            <Globe size={15} />
            <span>View Website</span>
            <ExternalLink size={12} style={{ marginLeft: 'auto', opacity: .6 }} />
          </a>
        </div>

        {/* User + Sign out */}
        <div className="admin-sidebar-footer">
          <div className="admin-user-row">
            <div className="admin-user-avatar">{initials}</div>
            <div className="admin-user-info">
              <div className="admin-user-name">{displayName}</div>
              <div className="admin-user-role">Super Admin</div>
            </div>
          </div>
          <button onClick={handleLogout} className="admin-signout-btn">
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content ────────────────────────────────── */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="admin-topbar-menu-btn"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <span className="admin-topbar-title">
              Gyan Akshar Sanskriti Foundation
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            {/* View Website shortcut in topbar */}
            <a
              href={PUBLIC_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-topbar-website-btn"
              title="Open public website"
            >
              <Globe size={15} />
              <span className="admin-topbar-website-label">View Website</span>
            </a>
            <span className="badge badge-accent" style={{ fontSize: '.7rem' }}>Demo Mode</span>
            <div className="admin-user-avatar" style={{ width: 32, height: 32, fontSize: '.75rem' }}>{initials}</div>
          </div>
        </header>

        {/* Page content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      <style>{`
        /* ── Shell ───────────────────────────────────────── */
        .admin-shell {
          display: flex;
          min-height: 100vh;
          background: var(--bg);
          font-family: var(--font-sans);
          position: relative;
        }

        /* ── Mobile overlay ──────────────────────────────── */
        .admin-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.5);
          z-index: 250;
          backdrop-filter: blur(2px);
        }

        /* ── Sidebar ─────────────────────────────────────── */
        .admin-sidebar {
          width: 232px;
          flex-shrink: 0;
          background: var(--primary-dark);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; bottom: 0; left: 0;
          z-index: 300;
          transform: translateX(-100%);
          transition: transform .25s ease;
          overflow-y: auto;
        }
        .admin-sidebar.is-open { transform: translateX(0); }

        /* Desktop: always visible */
        @media (min-width: 901px) {
          .admin-sidebar {
            transform: translateX(0) !important;
            position: sticky;
            height: 100vh;
            top: 0;
            align-self: flex-start;
          }
          .admin-overlay { display: none !important; }
        }

        /* ── Sidebar header ──────────────────────────────── */
        .admin-sidebar-logo {
          display: flex; align-items: center; gap: .6rem;
          padding: 1.1rem .85rem;
          border-bottom: 1px solid rgba(255,255,255,.07);
          flex-shrink: 0;
        }
        .admin-sidebar-logo-icon {
          width: 32px; height: 32px;
          background: var(--accent); border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .admin-sidebar-title {
          color: #fff; font-weight: 700; font-size: .84rem; line-height: 1.2;
        }
        .admin-sidebar-sub {
          color: rgba(255,255,255,.38); font-size: .58rem;
          letter-spacing: .07em; text-transform: uppercase;
        }
        .admin-sidebar-close {
          display: none; margin-left: auto;
          background: none; border: none;
          color: rgba(255,255,255,.4); cursor: pointer;
          padding: 4px; border-radius: 4px;
          transition: background .15s;
        }
        .admin-sidebar-close:hover { background: rgba(255,255,255,.08); color: #fff; }
        @media (max-width: 900px) {
          .admin-sidebar-close { display: flex; }
        }

        /* ── Nav links ───────────────────────────────────── */
        .admin-nav { flex: 1; padding: .6rem .5rem; }
        .admin-nav-link {
          display: flex; align-items: center; gap: .55rem;
          padding: .55rem .75rem; border-radius: 6px;
          color: rgba(255,255,255,.58); font-size: .82rem; font-weight: 500;
          margin-bottom: .15rem; transition: background .15s, color .15s;
          text-decoration: none;
        }
        .admin-nav-link:hover {
          background: rgba(255,255,255,.08); color: rgba(255,255,255,.9);
        }
        .admin-nav-link.is-active {
          background: rgba(255,255,255,.13); color: #fff;
        }
        .admin-nav-link.is-active svg { color: var(--accent-light); }

        /* ── Divider ─────────────────────────────────────── */
        .admin-sidebar-divider {
          height: 1px; background: rgba(255,255,255,.08);
          margin: .5rem .75rem;
        }

        /* ── View Website button ─────────────────────────── */
        .admin-view-website {
          display: flex; align-items: center; gap: .55rem;
          padding: .6rem .75rem; border-radius: 6px;
          background: rgba(184,134,75,.15);
          border: 1px solid rgba(184,134,75,.3);
          color: var(--accent-light); font-size: .82rem; font-weight: 600;
          text-decoration: none; cursor: pointer;
          transition: background .18s, border-color .18s, color .18s;
          width: 100%;
        }
        .admin-view-website:hover {
          background: rgba(184,134,75,.28);
          border-color: rgba(184,134,75,.5);
          color: #fff;
        }
        .admin-view-website:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        /* ── Sidebar footer ──────────────────────────────── */
        .admin-sidebar-footer {
          padding: .75rem .75rem .9rem;
          border-top: 1px solid rgba(255,255,255,.07);
          flex-shrink: 0;
        }
        .admin-user-row {
          display: flex; align-items: center; gap: .6rem; margin-bottom: .65rem;
        }
        .admin-user-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: var(--accent);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: .72rem; font-weight: 700;
          flex-shrink: 0;
        }
        .admin-user-info { min-width: 0; }
        .admin-user-name {
          color: #fff; font-size: .77rem; font-weight: 600;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .admin-user-role { color: rgba(255,255,255,.35); font-size: .63rem; }
        .admin-signout-btn {
          display: flex; align-items: center; gap: .45rem; width: 100%;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 6px; color: rgba(255,255,255,.58);
          padding: .45rem .7rem; cursor: pointer;
          font-size: .79rem; font-weight: 500; font-family: inherit;
          transition: background .15s, color .15s;
        }
        .admin-signout-btn:hover {
          background: rgba(220,38,38,.2);
          border-color: rgba(220,38,38,.35);
          color: #fca5a5;
        }

        /* ── Main area ───────────────────────────────────── */
        .admin-main {
          flex: 1; display: flex; flex-direction: column;
          min-width: 0; overflow: hidden;
        }

        /* ── Top bar ─────────────────────────────────────── */
        .admin-topbar {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: 0 1.25rem;
          height: 54px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 100; flex-shrink: 0;
        }
        .admin-topbar-menu-btn {
          background: none; border: none; cursor: pointer;
          color: var(--muted); display: flex; align-items: center;
          padding: .3rem; border-radius: 5px;
          transition: background .15s, color .15s;
        }
        .admin-topbar-menu-btn:hover { background: var(--bg-off); color: var(--text); }
        .admin-topbar-title {
          font-size: .84rem; color: var(--muted); font-weight: 500;
        }
        @media (max-width: 600px) { .admin-topbar-title { display: none; } }

        /* View Website link in topbar */
        .admin-topbar-website-btn {
          display: inline-flex; align-items: center; gap: .35rem;
          padding: .35rem .75rem;
          font-size: .78rem; font-weight: 600;
          color: var(--accent-dark);
          background: rgba(184,134,75,.1);
          border: 1px solid rgba(184,134,75,.25);
          border-radius: 5px; text-decoration: none;
          transition: background .15s, color .15s;
          white-space: nowrap;
        }
        .admin-topbar-website-btn:hover {
          background: rgba(184,134,75,.2); color: var(--accent-dark);
        }
        .admin-topbar-website-label {
          /* hide label on very narrow screens */
        }
        @media (max-width: 480px) {
          .admin-topbar-website-label { display: none; }
        }

        /* ── Content area ────────────────────────────────── */
        .admin-content {
          flex: 1; overflow-y: auto;
          background: var(--bg);
          padding: clamp(1rem, 3vw, 2rem);
        }
      `}</style>
    </div>
  );
}
