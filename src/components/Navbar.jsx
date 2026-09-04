import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, BookOpen, Shield, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const aboutLinks = [
  { to: '/about',                  label: 'About Foundation' },
  { to: '/about/leadership',       label: 'Leadership' },
  { to: '/about/vision-mission',   label: 'Vision & Mission' },
  { to: '/about/objectives',       label: 'Objectives' },
  { to: '/about/board',            label: 'Board of Directors' },
  { to: '/about/organisation',     label: 'Organisation' },
  { to: '/about/values',           label: 'Our Values' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [aboutOpen,  setAboutOpen]      = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobAboutOpen, setMobAboutOpen] = useState(false);

  const dropRef     = useRef(null);
  const userRef     = useRef(null);
  const hamburgerRef = useRef(null);
  const closeRef    = useRef(null);
  const scrollRef   = useRef(0);

  const location = useLocation();
  const isAbout  = location.pathname.startsWith('/about');

  const { user, role, signOut } = useAuth();

  // ── Scroll lock helpers ─────────────────────────────────────────────────
  const openDrawer = () => {
    scrollRef.current = window.scrollY;
    document.body.style.overflow   = 'hidden';
    document.body.style.position   = 'fixed';
    document.body.style.top        = `-${scrollRef.current}px`;
    document.body.style.width      = '100%';
    setMobileOpen(true);
  };

  const closeDrawer = () => {
    document.body.style.overflow   = '';
    document.body.style.position   = '';
    document.body.style.top        = '';
    document.body.style.width      = '';
    window.scrollTo(0, scrollRef.current);
    setMobileOpen(false);
  };

  // ── Focus management ────────────────────────────────────────────────────
  useEffect(() => {
    if (mobileOpen) {
      // slight delay so the drawer has rendered
      const t = setTimeout(() => closeRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else {
      hamburgerRef.current?.focus();
    }
  }, [mobileOpen]);

  // ── Escape key ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && mobileOpen) closeDrawer();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [mobileOpen]);

  // ── Close desktop dropdowns on outside click ────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setAboutOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Close mobile drawer on route change ────────────────────────────────
  useEffect(() => {
    if (mobileOpen) closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
  };

  const handleMobSignOut = async () => {
    closeDrawer();
    await signOut();
  };

  const initials = user
    ? (user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()
    : null;

  return (
    <>
      {/* ════════════════════════════════════════════════════
          DESKTOP NAV  (unchanged)
      ════════════════════════════════════════════════════ */}
      <nav className="gasfe-nav">
        <div className="nav-container">
          <div className="nav-inner">

            {/* ── Logo ── */}
            <Link to="/" className="nav-logo">
              <div className="nav-logo-icon">
                <BookOpen size={19} color="#fff" />
              </div>
              <div className="nav-logo-text">
                <span className="nav-logo-name">Gyan Akshar</span>
                <span className="nav-logo-sub">Sanskriti Foundation</span>
              </div>
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="nav-links">
              <NavLink to="/" end className={({ isActive }) => 'nav-item' + (isActive ? ' is-active' : '')}>
                Home
              </NavLink>

              {/* About dropdown */}
              <div className="nav-dd-wrap" ref={dropRef}>
                <Link
                  to="/about"
                  className={'nav-item nav-item-dd' + (isAbout ? ' is-active' : '')}
                  onClick={(e) => { e.preventDefault(); setAboutOpen(!aboutOpen); }}
                  onMouseEnter={() => setAboutOpen(true)}
                >
                  About Us <ChevronDown size={12} className={'dd-chevron' + (aboutOpen ? ' rotated' : '')} />
                </Link>
                <div className={'nav-dd-panel' + (aboutOpen ? ' is-open' : '')} onMouseLeave={() => setAboutOpen(false)}>
                  {aboutLinks.map(l => (
                    <Link key={l.to} to={l.to} className="nav-dd-item" onClick={() => setAboutOpen(false)}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              <NavLink to="/activities"  className={({ isActive }) => 'nav-item' + (isActive ? ' is-active' : '')}>Activities</NavLink>
              <NavLink to="/gallery"     className={({ isActive }) => 'nav-item' + (isActive ? ' is-active' : '')}>Gallery</NavLink>
              <NavLink to="/membership"  className={({ isActive }) => 'nav-item' + (isActive ? ' is-active' : '')}>Membership</NavLink>
              <NavLink to="/internship"  className={({ isActive }) => 'nav-item' + (isActive ? ' is-active' : '')}>Internship</NavLink>
              <NavLink to="/compliances" className={({ isActive }) => 'nav-item' + (isActive ? ' is-active' : '')}>Compliances</NavLink>
              <NavLink to="/contact"     className={({ isActive }) => 'nav-item' + (isActive ? ' is-active' : '')}>Contact</NavLink>
            </div>

            {/* ── Right-side CTAs ── */}
            <div className="nav-right">
              <Link to="/books" className="nav-btn-ghost"><BookOpen size={13} /><span className="nav-books-label">Our Books</span></Link>
              <Link to="/publication" className="nav-btn-accent">Publication</Link>

              {/* Auth area */}
              {user ? (
                <div className="nav-user-wrap" ref={userRef}>
                  <button
                    className="nav-user-btn"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-label="Account menu"
                  >
                    <span className="nav-user-avatar">{initials}</span>
                  </button>
                  <div className={'nav-user-panel' + (userMenuOpen ? ' is-open' : '')}>
                    <div className="nav-user-info">
                      <span className="nav-user-email">{user.email}</span>
                      <span className="nav-user-role">{role === 'ADMIN' ? 'Administrator' : 'Author'}</span>
                    </div>
                    <div className="nav-user-sep" />
                    {role === 'ADMIN' ? (
                      <Link to="/admin/dashboard" className="nav-user-item" onClick={() => setUserMenuOpen(false)}>
                        <Shield size={14} /> Admin Dashboard
                      </Link>
                    ) : (
                      <Link to="/author/dashboard" className="nav-user-item" onClick={() => setUserMenuOpen(false)}>
                        <User size={14} /> Author Dashboard
                      </Link>
                    )}
                    <div className="nav-user-sep" />
                    <button onClick={handleSignOut} className="nav-user-item nav-user-signout">
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="nav-auth-btns">
                  <Link to="/author/login" className="nav-btn-ghost nav-btn-sign-in">
                    <LogIn size={14} /> Sign In
                  </Link>
                  <Link to="/admin/login" className="nav-btn-admin">
                    <Shield size={13} /> Admin
                  </Link>
                </div>
              )}
            </div>

            {/* ── Hamburger ── */}
            <button
              type="button"
              ref={hamburgerRef}
              className="nav-hamburger"
              onClick={openDrawer}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════
          MOBILE DRAWER  (outside <nav> to avoid stacking clip)
      ════════════════════════════════════════════════════ */}

      {/* Overlay */}
      <div
        className={'mob-overlay' + (mobileOpen ? ' is-open' : '')}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={'mob-drawer' + (mobileOpen ? ' is-open' : '')}
      >
        {/* Drawer header */}
        <div className="mob-drawer-header">
          <Link to="/" className="mob-drawer-logo" onClick={closeDrawer}>
            <div className="mob-drawer-logo-icon">
              <BookOpen size={17} color="#fff" />
            </div>
            <span className="mob-drawer-logo-name">Gyan Akshar</span>
          </Link>
          <button
            type="button"
            ref={closeRef}
            className="mob-drawer-close"
            onClick={closeDrawer}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable nav list */}
        <nav className="mob-drawer-nav">

          <Link to="/" className="mob-nav-item" onClick={closeDrawer}>Home</Link>

          {/* About accordion */}
          <button
            type="button"
            className={'mob-nav-item mob-nav-accordion' + (mobAboutOpen ? ' is-expanded' : '')}
            onClick={() => setMobAboutOpen(!mobAboutOpen)}
            aria-expanded={mobAboutOpen}
          >
            About Us
            <ChevronDown size={16} className={'mob-acc-chevron' + (mobAboutOpen ? ' rotated' : '')} />
          </button>
          <div className={'mob-acc-panel' + (mobAboutOpen ? ' is-open' : '')}>
            {aboutLinks.map(l => (
              <Link key={l.to} to={l.to} className="mob-nav-item mob-nav-sub" onClick={closeDrawer}>
                {l.label}
              </Link>
            ))}
          </div>

          <Link to="/activities"  className="mob-nav-item" onClick={closeDrawer}>Activities</Link>
          <Link to="/gallery"     className="mob-nav-item" onClick={closeDrawer}>Gallery</Link>
          <Link to="/membership"  className="mob-nav-item" onClick={closeDrawer}>Membership</Link>
          <Link to="/internship"  className="mob-nav-item" onClick={closeDrawer}>Internship</Link>
          <Link to="/compliances" className="mob-nav-item" onClick={closeDrawer}>Compliances</Link>
          <Link to="/contact"     className="mob-nav-item" onClick={closeDrawer}>Contact</Link>
          <Link to="/books"       className="mob-nav-item" onClick={closeDrawer}>Our Books</Link>
          <Link to="/publication" className="mob-nav-item" onClick={closeDrawer}>Publication</Link>

          <div className="mob-nav-divider" />

          {user ? (
            <>
              <Link
                to={role === 'ADMIN' ? '/admin/dashboard' : '/author/dashboard'}
                className="mob-nav-item"
                onClick={closeDrawer}
              >
                {role === 'ADMIN' ? 'Admin Dashboard' : 'Author Dashboard'}
              </Link>
              <button onClick={handleMobSignOut} type="button" className="mob-nav-item mob-nav-signout">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/author/login" className="mob-nav-item" onClick={closeDrawer}>
                Sign In (Author)
              </Link>
              <Link to="/admin/login" className="mob-nav-item" onClick={closeDrawer}>
                Admin Login
              </Link>
            </>
          )}
        </nav>
      </div>

      <style>{`
        /* ─── Container ──────────────────────────────── */
        .nav-container {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* ─── Shell ──────────────────────────────────── */
        .gasfe-nav {
          position: sticky; top: 0; z-index: 1000;
          background: #0F1D29;
          border-bottom: 1px solid rgba(255,255,255,.08);
          box-shadow: 0 2px 16px rgba(0,0,0,.35);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          height: 60px;
          gap: 0;
          width: 100%;
        }

        /* ─── Logo ────────────────────────────────────── */
        .nav-logo {
          display: flex; align-items: center; gap: 8px;
          flex-shrink: 0;
          text-decoration: none;
          margin-right: 16px;
        }
        .nav-logo-icon {
          width: 34px; height: 34px; flex-shrink: 0;
          background: #B8864B; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
        }
        .nav-logo-text { display: flex; flex-direction: column; }
        .nav-logo-name {
          color: #fff;
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700; font-size: 14px; line-height: 1.1;
          white-space: nowrap;
        }
        .nav-logo-sub {
          color: rgba(255,255,255,.4);
          font-size: 8.5px; letter-spacing: .07em;
          text-transform: uppercase; white-space: nowrap;
          margin-top: 1px;
        }

        /* ─── Nav links ───────────────────────────────── */
        .nav-links {
          display: flex;
          align-items: center;
          flex: 1 1 auto;
          min-width: 0;
          gap: 0;
        }
        .nav-item {
          display: inline-flex; align-items: center; gap: 2px;
          padding: 5px 7px;
          color: rgba(255,255,255,.75);
          font-size: 12.5px; font-weight: 500;
          border-radius: 5px;
          white-space: nowrap;
          text-decoration: none;
          cursor: pointer;
          flex-shrink: 0;
          line-height: 1;
          transition: color .15s, background .15s;
        }
        .nav-item:hover, .nav-item.is-active {
          color: #fff; background: rgba(255,255,255,.1);
        }
        .nav-item-dd { user-select: none; }
        .dd-chevron { transition: transform .2s; flex-shrink: 0; }
        .dd-chevron.rotated { transform: rotate(180deg); }

        /* ─── Dropdown panel ──────────────────────────── */
        .nav-dd-wrap { position: relative; }
        .nav-dd-panel {
          position: absolute; top: calc(100% + 6px); left: 0;
          background: #fff;
          border: 1px solid #DED8CF;
          border-radius: 10px;
          box-shadow: 0 12px 32px rgba(0,0,0,.16), 0 4px 8px rgba(0,0,0,.08);
          min-width: 200px;
          padding: 5px 0;
          z-index: 600;
          opacity: 0; visibility: hidden;
          transform: translateY(-8px);
          transition: opacity .18s, transform .18s, visibility .18s;
          pointer-events: none;
        }
        .nav-dd-panel.is-open {
          opacity: 1; visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }
        .nav-dd-item {
          display: block; padding: 9px 16px;
          font-size: 13px; font-weight: 500; color: #182027;
          text-decoration: none;
          border-left: 3px solid transparent;
          transition: background .12s, padding-left .12s, border-color .12s;
        }
        .nav-dd-item:hover {
          background: #F6F3ED; padding-left: 20px;
          border-left-color: #B8864B; color: #172A3A;
        }

        /* ─── Right side ──────────────────────────────── */
        .nav-right {
          display: flex; align-items: center; gap: 5px;
          flex-shrink: 0;
          margin-left: 10px;
        }
        .nav-btn-ghost {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 10px;
          font-size: 11.5px; font-weight: 600;
          color: rgba(255,255,255,.82);
          border: 1.5px solid rgba(255,255,255,.22);
          border-radius: 6px; white-space: nowrap;
          text-decoration: none;
          transition: background .15s, color .15s;
          line-height: 1;
        }
        .nav-btn-ghost:hover { background: rgba(255,255,255,.1); color: #fff; }
        .nav-btn-accent {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 5px 10px;
          font-size: 11.5px; font-weight: 600;
          background: #B8864B; color: #fff;
          border: 1.5px solid #B8864B;
          border-radius: 6px; white-space: nowrap;
          text-decoration: none;
          transition: background .15s;
          line-height: 1;
        }
        .nav-btn-accent:hover { background: #D4A76A; }
        .nav-btn-admin {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 5px 9px;
          font-size: 11px; font-weight: 600;
          background: rgba(255,255,255,.07);
          color: rgba(255,255,255,.7);
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 6px; white-space: nowrap;
          text-decoration: none;
          transition: background .15s, color .15s;
          line-height: 1;
        }
        .nav-btn-admin:hover { background: rgba(255,255,255,.14); color: #fff; }
        .nav-auth-btns { display: flex; align-items: center; gap: 4px; }
        .nav-btn-sign-in { display: inline-flex; align-items: center; gap: 4px; }

        /* ─── User avatar ─────────────────────────────── */
        .nav-user-wrap { position: relative; }
        .nav-user-btn  { background: none; border: none; cursor: pointer; padding: 0; display: flex; }
        .nav-user-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: #B8864B;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 12px; font-weight: 700; cursor: pointer;
        }
        .nav-user-panel {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #fff; border: 1px solid #DED8CF;
          border-radius: 10px;
          box-shadow: 0 12px 32px rgba(0,0,0,.14);
          min-width: 200px; padding: 5px 0; z-index: 600;
          opacity: 0; visibility: hidden; transform: translateY(-6px);
          transition: opacity .18s, transform .18s, visibility .18s;
          pointer-events: none;
        }
        .nav-user-panel.is-open {
          opacity: 1; visibility: visible; transform: translateY(0); pointer-events: auto;
        }
        .nav-user-info { padding: 10px 14px 8px; }
        .nav-user-email { display: block; font-size: 12px; font-weight: 600; color: #182027; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .nav-user-role  { display: block; font-size: 11px; color: #697078; margin-top: 2px; }
        .nav-user-sep   { height: 1px; background: #DED8CF; margin: 4px 0; }
        .nav-user-item  {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 14px; font-size: 13px; font-weight: 500; color: #182027;
          text-decoration: none; cursor: pointer; transition: background .12s;
          background: none; border: none; width: 100%; text-align: left; font-family: inherit;
        }
        .nav-user-item:hover { background: #F6F3ED; }
        .nav-user-signout { color: #dc2626; }
        .nav-user-signout:hover { background: #fef2f2; }

        /* ─── Hamburger ───────────────────────────────── */
        .nav-hamburger {
          display: none;
          margin-left: auto;
          background: none; border: none;
          color: #fff; padding: 5px;
          border-radius: 6px; cursor: pointer; flex-shrink: 0;
          transition: background .15s;
        }
        .nav-hamburger:hover { background: rgba(255,255,255,.1); }

        /* ═══════════════════════════════════════════════
           MOBILE DRAWER
        ═══════════════════════════════════════════════ */

        /* Overlay */
        .mob-overlay {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 1100;
          opacity: 0;
          pointer-events: none;
          transition: opacity 300ms ease;
        }
        .mob-overlay.is-open {
          opacity: 1;
          pointer-events: auto;
        }

        /* Drawer panel */
        .mob-drawer {
          display: none;
          position: fixed;
          left: 0; top: 0;
          height: 100dvh;
          width: min(85vw, 360px);
          max-width: 100vw;
          background: #0F1D29;
          z-index: 1200;
          transform: translateX(-100%);
          transition: transform 300ms cubic-bezier(0.32, 0.72, 0, 1);
          flex-direction: column;
          overflow: hidden;
        }
        .mob-drawer.is-open {
          transform: translateX(0);
        }

        /* Drawer header */
        .mob-drawer-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 16px;
          height: 60px; flex-shrink: 0;
          border-bottom: 1px solid rgba(255,255,255,.1);
        }
        .mob-drawer-logo {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none;
        }
        .mob-drawer-logo-icon {
          width: 32px; height: 32px; flex-shrink: 0;
          background: #B8864B; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
        }
        .mob-drawer-logo-name {
          color: #fff;
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700; font-size: 14px;
        }
        .mob-drawer-close {
          display: flex; align-items: center; justify-content: center;
          min-width: 44px; min-height: 44px;
          background: none; border: none;
          color: rgba(255,255,255,.7);
          border-radius: 8px; cursor: pointer; flex-shrink: 0;
          transition: background .15s, color .15s;
        }
        .mob-drawer-close:hover {
          background: rgba(255,255,255,.1); color: #fff;
        }

        /* Drawer nav (scrollable) */
        .mob-drawer-nav {
          flex: 1 1 auto;
          overflow-y: auto;
          padding: 8px 0 24px;
          -webkit-overflow-scrolling: touch;
        }

        /* Nav items */
        .mob-nav-item {
          display: flex; align-items: center;
          min-height: 44px;
          padding: 0 20px;
          color: rgba(255,255,255,.78);
          font-size: 14px; font-weight: 500;
          text-decoration: none;
          border: none; background: none;
          width: 100%; text-align: left;
          cursor: pointer; font-family: inherit;
          transition: background .12s, color .12s;
          box-sizing: border-box;
        }
        .mob-nav-item:hover {
          background: rgba(255,255,255,.06); color: #fff;
        }
        .mob-nav-sub {
          padding-left: 36px;
          color: rgba(255,255,255,.5);
          font-size: 13px;
        }
        .mob-nav-sub:hover {
          color: rgba(255,255,255,.85);
        }

        /* About accordion toggle */
        .mob-nav-accordion {
          justify-content: space-between;
        }
        .mob-acc-chevron {
          transition: transform 250ms ease;
          flex-shrink: 0;
          color: rgba(255,255,255,.45);
        }
        .mob-acc-chevron.rotated {
          transform: rotate(180deg);
        }

        /* Accordion panel */
        .mob-acc-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 280ms ease;
        }
        .mob-acc-panel.is-open {
          /* 7 items × ~44px each + some buffer */
          max-height: 400px;
        }

        /* Divider */
        .mob-nav-divider {
          height: 1px;
          background: rgba(255,255,255,.1);
          margin: 8px 0;
        }

        /* Sign out */
        .mob-nav-signout {
          color: #fca5a5;
        }
        .mob-nav-signout:hover {
          background: rgba(239,68,68,.08); color: #f87171;
        }

        /* ─── Breakpoints ─────────────────────────────── */

        @media (max-width: 1280px) {
          .nav-item { padding: 5px 6px; font-size: 12px; }
          .nav-logo  { margin-right: 10px; }
          .nav-right { gap: 4px; margin-left: 8px; }
        }

        @media (max-width: 1100px) {
          .nav-item   { padding: 5px 5px; font-size: 11.5px; }
          .nav-books-label { display: none; }
          .nav-btn-admin   { display: none; }
          .nav-logo-sub    { display: none; }
          .nav-logo        { margin-right: 8px; }
          .nav-right { gap: 3px; margin-left: 6px; }
        }

        /* 900px: hide desktop links, show hamburger + drawer */
        @media (max-width: 900px) {
          .nav-links  { display: none !important; }
          .nav-right  { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-logo  { margin-right: 0; }

          .mob-overlay { display: block; }
          .mob-drawer  { display: flex; }
        }

        @media (max-width: 480px) {
          .nav-inner    { height: 54px; }
          .nav-logo-sub { display: none; }
          .nav-logo-name { font-size: 13px; }
        }
      `}</style>
    </>
  );
}
