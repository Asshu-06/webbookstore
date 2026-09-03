import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Heart } from 'lucide-react';

const quickLinks = [
  { to: '/about', label: 'About Foundation' },
  { to: '/activities', label: 'Our Activities' },
  { to: '/membership', label: 'Membership' },
  { to: '/internship', label: 'Internship' },
  { to: '/compliances', label: 'Compliances' },
  { to: '/contact', label: 'Contact Us' },
];

const pubLinks = [
  { to: '/publication', label: 'About Publication' },
  { to: '/books', label: 'Our Books' },
  { to: '/publication', label: 'Author Guidelines' },
  { to: '/publication', label: 'Submit Manuscript' },
  { to: '/author/login', label: 'Author Login' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--primary-dark)',
      borderTop: '1px solid rgba(255,255,255,.06)',
      color: 'rgba(255,255,255,.7)',
      marginTop: 'auto',
    }}>
      {/* Top band */}
      <div style={{
        background: 'rgba(184,134,75,.12)',
        borderBottom: '1px solid rgba(184,134,75,.2)',
        padding: '.85rem 0',
      }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
            <Heart size={13} style={{ color: 'var(--accent-light)', flexShrink: 0 }} />
            Promoting education, literature &amp; cultural heritage since 2012
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="mailto:info@gasfe.org" style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', gap: '.35rem', textDecoration: 'none' }}>
              <Mail size={13} /> info@gasfe.org
            </a>
            <span style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', gap: '.35rem' }}>
              <Phone size={13} /> +91 20 2345 6789
            </span>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="container" style={{ padding: '3.5rem clamp(16px,4vw,64px) 2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(200px,1.4fr) repeat(3,minmax(140px,1fr))',
          gap: 'clamp(1.5rem,4vw,3rem)',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '.65rem', marginBottom: '1.25rem', textDecoration: 'none' }}>
              <div style={{ width: 38, height: 38, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BookOpen size={18} color="#fff" />
              </div>
              <div>
                <div style={{ color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '.95rem', lineHeight: 1.2 }}>Gyan Akshar Sanskriti</div>
                <div style={{ color: 'rgba(255,255,255,.4)', fontSize: '.63rem', letterSpacing: '.06em', textTransform: 'uppercase' }}>Foundation for Education & Literature</div>
              </div>
            </Link>
            <p style={{ fontSize: '.83rem', lineHeight: 1.75, color: 'rgba(255,255,255,.5)', maxWidth: 270 }}>
              A registered foundation committed to the advancement of education, promotion of Indian literature, and preservation of cultural heritage.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '.5rem', alignItems: 'flex-start', fontSize: '.8rem', color: 'rgba(255,255,255,.45)' }}>
              <MapPin size={13} style={{ marginTop: 2, flexShrink: 0, color: 'var(--accent)' }} />
              <span>123 Gyan Marg, Cultural District, Pune – 411001, Maharashtra</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <nav>
              {quickLinks.map(l => (
                <Link key={l.to} to={l.to} className="footer-link">{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Publication */}
          <div>
            <h4 className="footer-heading">Publication</h4>
            <nav>
              {pubLinks.map((l, i) => (
                <Link key={i} to={l.to} className="footer-link">{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="footer-heading">Get Involved</h4>
            <nav>
              {[
                { to: '/membership', label: 'Become a Member' },
                { to: '/internship', label: 'Apply for Internship' },
                { to: '/contact', label: 'Contact Foundation' },
                { to: '/publication', label: 'Publish with Us' },
              ].map(l => (
                <Link key={l.to} to={l.to} className="footer-link">{l.label}</Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,.08)',
          paddingTop: '1.5rem',
          display: 'flex', flexWrap: 'wrap',
          gap: '.75rem', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.35)' }}>
            &copy; {new Date().getFullYear()} Gyan Akshar Sanskriti Foundation for Education &amp; Literature. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            {[
              { to: '/compliances', label: 'Privacy Policy' },
              { to: '/compliances', label: 'Terms of Use' },
              { to: '/compliances', label: 'Compliance' },
            ].map(l => (
              <Link key={l.label} to={l.to} style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.35)', textDecoration: 'none', transition: 'color .15s' }}
                onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,.7)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.35)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-heading {
          color: rgba(255,255,255,.9);
          font-size: .75rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: .85rem;
        }
        .footer-link {
          display: block;
          padding: .28rem 0;
          font-size: .83rem;
          color: rgba(255,255,255,.5);
          text-decoration: none;
          transition: color .15s, padding-left .15s;
        }
        .footer-link:hover { color: var(--accent-light); padding-left: 4px; }
        @media (max-width: 900px) {
          footer .container > div:first-of-type > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 599px) {
          footer [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
