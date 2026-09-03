import { Link } from 'react-router-dom';
import { BookOpen, Users, GraduationCap, ArrowRight, Calendar, Award, Globe, Feather, BookMarked, HeartHandshake } from 'lucide-react';
import { ACTIVITIES, EVENTS, BOOKS } from '../data';

const STATS = [
  { number: '12+',     label: 'Years of Service',   icon: <Award size={22} color="var(--accent)" /> },
  { number: '150+',    label: 'Books Published',     icon: <BookOpen size={22} color="var(--accent)" /> },
  { number: '200+',    label: 'Authors Supported',   icon: <Feather size={22} color="var(--accent)" /> },
  { number: '50,000+', label: 'Lives Impacted',      icon: <Globe size={22} color="var(--accent)" /> },
];

const PILLARS = [
  { icon: <BookMarked size={28} color="var(--accent)" />, title: 'Literary Excellence', desc: 'Publishing works that shape India&#8217;s literary future across languages and genres.' },
  { icon: <GraduationCap size={28} color="var(--accent)" />, title: 'Quality Education', desc: 'Delivering learning programmes that reach underserved communities across India.' },
  { icon: <HeartHandshake size={28} color="var(--accent)" />, title: 'Cultural Heritage', desc: 'Documenting and preserving oral traditions, folk arts, and living cultural practices.' },
];

export default function HomePage() {
  const recentActivities = ACTIVITIES.slice(0, 3);
  const recentEvents = EVENTS.slice(0, 3);
  const featuredBooks = BOOKS.slice(0, 4);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-bg-pattern" />
        <div className="container hero-content">
          <div className="hero-pill">
            <span className="hero-pill-dot" />
            Established 2012 &bull; 12 Years of Excellence
          </div>
          <h1 className="hero-title">
            Gyan Akshar Sanskriti<br />
            <span className="hero-title-accent">Foundation for Education</span>
            <br />&amp; Literature
          </h1>
          <p className="hero-sub">
            Fostering literary traditions, promoting quality education, and preserving cultural heritage through research, publication, and community engagement.
          </p>
          <div className="hero-actions">
            <Link to="/publication" className="btn btn-accent btn-lg">
              <BookOpen size={17} /> Book Publication
            </Link>
            <Link to="/activities" className="btn btn-lg hero-btn-ghost">
              Explore Activities <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '2.25rem 0' }}>
        <div className="container">
          <div className="stats-row">
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '1.25rem .75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '.6rem' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1 }}>{s.number}</div>
                <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '.3rem', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <span className="section-label">Our Mission</span>
            <h2 className="section-title">Three Pillars of Our Work</h2>
            <div className="accent-bar" />
          </div>
          <div className="pillars-row">
            {PILLARS.map((p, i) => (
              <div key={i} style={{
                padding: '2rem 1.75rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderTop: '3px solid var(--accent)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{ marginBottom: '1rem' }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '.6rem' }}>{p.title}</h3>
                <p style={{ fontSize: '.875rem', color: 'var(--muted)', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT ACTIVITIES ────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-off)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <span className="section-label">Our Work</span>
            <h2 className="section-title">Recent Activities</h2>
            <div className="accent-bar" />
            <p className="section-subtitle">Our latest programmes, events, and community initiatives</p>
          </div>
          <div className="activities-grid">
            {recentActivities.map(activity => (
              <div key={activity.id} className="card">
                <div style={{ height: 188, background: activity.coverColor, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={38} color="rgba(255,255,255,.25)" />
                  <span style={{
                    position: 'absolute', top: 12, left: 12,
                    padding: '.2rem .65rem', borderRadius: '999px',
                    background: 'rgba(0,0,0,.3)', backdropFilter: 'blur(8px)',
                    color: '#fff', fontSize: '.68rem', fontWeight: 600,
                    letterSpacing: '.04em', textTransform: 'uppercase',
                  }}>{activity.category}</span>
                </div>
                <div className="card-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.35rem', color: 'var(--muted)', fontSize: '.75rem', marginBottom: '.6rem' }}>
                    <Calendar size={12} />
                    {new Date(activity.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--primary)', marginBottom: '.55rem', lineHeight: 1.3 }}>{activity.title}</h3>
                  <p style={{ fontSize: '.84rem', color: 'var(--text-light)', lineHeight: 1.65, marginBottom: '1rem', flex: 1 }}>{activity.description.substring(0, 100)}...</p>
                  <Link to={"/activities/" + activity.slug} style={{ color: 'var(--accent-dark)', fontWeight: 600, fontSize: '.82rem', display: 'inline-flex', alignItems: 'center', gap: '.3rem', marginTop: 'auto' }}>
                    Read More <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link to="/activities" className="btn btn-outline">View All Activities <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ── EVENTS + BOOKS ───────────────────────────────── */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="two-col">
            {/* Events */}
            <div>
              <span className="section-label">Latest News</span>
              <h2 className="section-title">Events &amp; Updates</h2>
              <div className="accent-bar accent-bar-left" />
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recentEvents.map(ev => (
                  <div key={ev.id} style={{
                    display: 'flex', gap: '1rem',
                    padding: '1.1rem 1.25rem',
                    background: 'var(--bg)',
                    borderRadius: 'var(--radius)',
                    borderLeft: '3px solid ' + (ev.type === 'event' ? 'var(--primary)' : 'var(--accent)'),
                    border: '1px solid var(--border)',
                    borderLeftWidth: 3,
                  }}>
                    <div style={{ flexShrink: 0, textAlign: 'center', minWidth: 44 }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--primary)', lineHeight: 1 }}>
                        {new Date(ev.date).getDate()}
                      </div>
                      <div style={{ fontSize: '.68rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                        {new Date(ev.date).toLocaleDateString('en', { month: 'short' })}
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span className={'badge ' + (ev.type === 'event' ? 'badge-primary' : 'badge-accent')} style={{ marginBottom: '.35rem' }}>{ev.type === 'event' ? 'Event' : 'News'}</span>
                      <h4 style={{ fontWeight: 600, fontSize: '.88rem', color: 'var(--text)', marginBottom: '.25rem', lineHeight: 1.35 }}>{ev.title}</h4>
                      <p style={{ fontSize: '.79rem', color: 'var(--muted)', lineHeight: 1.55 }}>{ev.description.substring(0, 85)}...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Books */}
            <div>
              <span className="section-label">Publications</span>
              <h2 className="section-title">Recent Books</h2>
              <div className="accent-bar accent-bar-left" />
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
                {featuredBooks.map(book => (
                  <div key={book.id} style={{
                    display: 'flex', gap: '.9rem', alignItems: 'center',
                    padding: '.9rem 1rem',
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)', transition: 'border-color .15s, box-shadow .15s',
                  }}>
                    <div style={{
                      width: 44, height: 62, flexShrink: 0,
                      background: 'linear-gradient(160deg, var(--primary-dark), var(--primary-light))',
                      borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <BookOpen size={18} color="rgba(255,255,255,.6)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span className="tag" style={{ marginBottom: '.25rem', fontSize: '.68rem' }}>{book.genre}</span>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '.9rem', color: 'var(--primary)', marginBottom: '.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</h4>
                      <p style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{book.author} &bull; {book.year}</p>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--accent-dark)', fontSize: '.875rem', flexShrink: 0 }}>&#8377;{book.price}</div>
                  </div>
                ))}
                <Link to="/books" className="btn btn-outline" style={{ marginTop: '.25rem' }}>
                  Browse All Books <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOIN US CTA ──────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%)',
        padding: 'clamp(3rem,6vw,5rem) 0', color: '#fff',
      }}>
        <div className="container text-center">
          <span style={{ display: 'inline-block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(212,167,106,.9)', marginBottom: '.75rem' }}>Be Part of the Movement</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.2 }}>
            Join Our Mission for Education &amp; Literature
          </h2>
          <p style={{ fontSize: 'clamp(.9rem,1.5vw,1.05rem)', opacity: .75, maxWidth: 520, margin: '0 auto 2.25rem', lineHeight: 1.7 }}>
            Contribute your talent, voice, or support to India's growing literary and educational movement.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.85rem', justifyContent: 'center' }}>
            <Link to="/membership" className="btn btn-white btn-lg"><Users size={17} /> Become a Member</Link>
            <Link to="/publication" className="btn btn-accent btn-lg"><BookOpen size={17} /> Publish with Us</Link>
            <Link to="/internship" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,.25)' }}>
              <GraduationCap size={17} /> Internship
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        /* Hero */
        .hero-section {
          background: linear-gradient(150deg, #0F1D29 0%, #172A3A 45%, #1E3A50 100%);
          color: #fff;
          padding: clamp(3.5rem,7vw,6rem) 0 clamp(3rem,6vw,5rem);
          position: relative;
          overflow: hidden;
        }
        .hero-bg-pattern {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M50 50c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zM10 10c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10S10 15.5 10 10z'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }
        .hero-content {
          position: relative; z-index: 1;
          text-align: center;
        }
        .hero-pill {
          display: inline-flex; align-items: center; gap: .5rem;
          background: rgba(184,134,75,.15);
          border: 1px solid rgba(184,134,75,.35);
          border-radius: 999px;
          padding: .3rem 1rem;
          font-size: .72rem; font-weight: 700;
          color: var(--accent-light);
          letter-spacing: .06em; text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .hero-pill-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); display: inline-block;
        }
        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem,4.5vw,3.4rem);
          font-weight: 700;
          line-height: 1.15;
          color: #fff;
          max-width: 760px;
          margin: 0 auto 1.25rem;
        }
        .hero-title-accent { color: var(--accent-light); }
        .hero-sub {
          font-size: clamp(.9rem,1.6vw,1.1rem);
          color: rgba(255,255,255,.7);
          max-width: 580px;
          margin: 0 auto 2.25rem;
          line-height: 1.75;
        }
        .hero-actions { display: flex; gap: .85rem; justify-content: center; flex-wrap: wrap; }
        .hero-btn-ghost {
          background: rgba(255,255,255,.1);
          color: #fff;
          border-color: rgba(255,255,255,.22);
        }
        .hero-btn-ghost:hover {
          background: rgba(255,255,255,.18);
        }
        /* Responsive stats */
        @media (max-width: 767px) {
          .hero-section { padding: 3rem 0 2.5rem; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 479px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        /* 3-col activities responsive */
        @media (max-width: 900px) {
          section .grid-act { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 599px) {
          section .grid-act { grid-template-columns: 1fr !important; }
          .hero-pill { font-size: .65rem; }
        }
      `}</style>
    </div>
  );
}
