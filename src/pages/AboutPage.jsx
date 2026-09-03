import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Users, BookOpen, Target, Award, Building2 } from 'lucide-react';

const ABOUT_NAV = [
  { to: '/about', label: 'About Foundation', key: 'default' },
  { to: '/about/leadership', label: 'Leadership', key: 'leadership' },
  { to: '/about/vision-mission', label: 'Vision & Mission', key: 'vision-mission' },
  { to: '/about/objectives', label: 'Objectives', key: 'objectives' },
  { to: '/about/board', label: 'Board of Directors', key: 'board' },
  { to: '/about/organisation', label: 'Organisation', key: 'organisation' },
  { to: '/about/values', label: 'Our Values', key: 'values' },
];

function SectionContent({ sectionKey }) {
  switch (sectionKey) {
    case 'leadership': return <LeadershipContent />;
    case 'vision-mission': return <VisionMissionContent />;
    case 'objectives': return <ObjectivesContent />;
    case 'board': return <BoardContent />;
    case 'organisation': return <OrganisationContent />;
    case 'values': return <ValuesContent />;
    default: return <AboutDefaultContent />;
  }
}

function AboutDefaultContent() {
  return (
    <div>
      <p style={{ fontSize: '1.05rem', color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
        Gyan Akshar Sanskriti Foundation for Education and Literature (GASFE) is a registered non-profit organisation dedicated to the promotion of education, preservation of literary traditions, and advancement of cultural heritage across India.
      </p>
      <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
        Founded in 2012, the Foundation has grown into a respected institution supporting authors, educators, researchers, and cultural practitioners through publication, scholarship, community outreach, and professional training.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1rem' }}>
        {[
          { icon: <BookOpen size={24} color="var(--accent)" />, title: '150+ Books Published', sub: 'Across Indian languages' },
          { icon: <Users size={24} color="var(--accent)" />, title: '200+ Authors', sub: 'Supported and mentored' },
          { icon: <Award size={24} color="var(--accent)" />, title: '12+ Years', sub: 'Of dedicated service' },
          { icon: <Target size={24} color="var(--accent)" />, title: '25 States', sub: 'Programme reach' },
        ].map(s => (
          <div key={s.title} style={{ padding: '1.5rem 1.25rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <div style={{ marginBottom: '.65rem' }}>{s.icon}</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '.95rem' }}>{s.title}</div>
            <div style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: '.2rem' }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadershipContent() {
  const people = [
    { name: 'Dr. Ramesh Kulkarni', role: 'Founder & Chairperson', desc: 'Eminent scholar of Marathi literature with four decades of academic and administrative experience.' },
    { name: 'Prof. Sudha Bhat', role: 'Executive Director', desc: 'Former Professor of English Literature, University of Pune. Author of six acclaimed works.' },
    { name: 'Mr. Arun Deshpande', role: 'Secretary', desc: 'Social entrepreneur and education activist with 20 years of community development experience.' },
    { name: 'Dr. Meena Joshi', role: 'Director, Publications', desc: 'Publishing professional and literary critic. Former Editor at a leading national publisher.' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.5rem' }}>
      {people.map(p => (
        <div key={p.name} style={{ padding: '1.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary-dark),var(--primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Users size={24} color="rgba(255,255,255,.7)" />
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', marginBottom: '.2rem' }}>{p.name}</h3>
          <p style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--accent-dark)', marginBottom: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>{p.role}</p>
          <p style={{ fontSize: '.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

function VisionMissionContent() {
  return (
    <div>
      <div className="vision-grid" style={{ marginBottom: "2.5rem" }}>
        <div style={{ padding: '2rem', background: 'linear-gradient(135deg,var(--primary-dark),var(--primary))', borderRadius: 'var(--radius-lg)', color: '#fff' }}>
          <Target size={32} style={{ marginBottom: '.85rem', opacity: .8 }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '.85rem' }}>Our Vision</h3>
          <p style={{ opacity: .82, lineHeight: 1.75, fontSize: '.95rem' }}>A society where every individual has access to quality education, where literary traditions thrive, and where cultural heritage is preserved for future generations.</p>
        </div>
        <div style={{ padding: '2rem', background: 'linear-gradient(135deg,#6B3D1E,var(--accent))', borderRadius: 'var(--radius-lg)', color: '#fff' }}>
          <BookOpen size={32} style={{ marginBottom: '.85rem', opacity: .8 }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '.85rem' }}>Our Mission</h3>
          <p style={{ opacity: .82, lineHeight: 1.75, fontSize: '.95rem' }}>To promote education and literature through quality publication, research, community outreach, and professional development — with special attention to underserved communities and regional languages.</p>
        </div>
      </div>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>Core Commitments</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
        {[
          'Preserve and promote regional Indian languages and literary traditions',
          'Support first-time and emerging authors from all backgrounds',
          'Make quality educational resources accessible to rural and underserved communities',
          'Build bridges between traditional knowledge and contemporary scholarship',
          'Foster an inclusive, diverse, and representative literary culture',
        ].map(c => (
          <div key={c} style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start', padding: '.9rem 1.1rem', background: 'var(--bg)', border: '1px solid var(--border)', borderLeft: '3px solid var(--primary)', borderRadius: 'var(--radius)' }}>
            <CheckCircle size={16} color="var(--primary)" style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={{ color: 'var(--text)', lineHeight: 1.6, fontSize: '.9rem' }}>{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ObjectivesContent() {
  const objectives = [
    { num: '01', title: 'Quality Publication', desc: 'Publish and distribute literary works of merit in multiple Indian languages, emphasising works that might not find commercial space.' },
    { num: '02', title: 'Educational Access', desc: 'Develop and deploy educational programmes, reading materials, and skill-building workshops for communities with limited access to formal education.' },
    { num: '03', title: 'Research Support', desc: 'Facilitate and fund original research in literature, linguistics, folklore, and cultural studies — particularly underrepresented traditions.' },
    { num: '04', title: 'Heritage Preservation', desc: 'Document, archive, and promote oral traditions, folk literature, performing arts, and other intangible cultural heritage.' },
    { num: '05', title: 'Professional Development', desc: 'Train the next generation of writers, editors, educators, and cultural practitioners through structured internship and mentorship programmes.' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {objectives.map(obj => (
        <div key={obj.num} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', alignItems: 'flex-start' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, color: 'rgba(23,42,58,.12)', flexShrink: 0, lineHeight: 1, minWidth: 48 }}>{obj.num}</div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', marginBottom: '.45rem' }}>{obj.title}</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '.9rem' }}>{obj.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BoardContent() {
  const members = [
    { name: 'Dr. Ramesh Kulkarni', position: 'Chairperson', qualification: 'PhD Literature, University of Pune | Retired Professor' },
    { name: 'Prof. Sudha Bhat', position: 'Executive Director', qualification: 'MA English, JNU | Former Head of Department' },
    { name: 'Mr. Arun Deshpande', position: 'Secretary', qualification: 'MBA, IIM Ahmedabad | Social Entrepreneur' },
    { name: 'Adv. Priya Nair', position: 'Treasurer', qualification: 'LLM, National Law School | Charitable Law Specialist' },
    { name: 'Dr. Kavita Rao', position: 'Director — Research', qualification: 'PhD Folklore, Mysore University | Author & Folklorist' },
    { name: 'Prof. S.K. Menon', position: 'Director — Education', qualification: 'MEd, TISS Mumbai | Education Policy Expert' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
      {members.map(m => (
        <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', padding: '1.1rem 1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary-dark),var(--primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Users size={20} color="rgba(255,255,255,.7)" />
          </div>
          <div>
            <h4 style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '.15rem' }}>{m.name}</h4>
            <p style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--accent-dark)', marginBottom: '.1rem' }}>{m.position}</p>
            <p style={{ fontSize: '.77rem', color: 'var(--muted)' }}>{m.qualification}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function OrganisationContent() {
  const departments = ['Board of Directors','Executive Committee','Publications Division','Education & Research Division','Community Outreach Division','Finance & Compliance','Events & Communication','Internship Programme Office'];
  return (
    <div>
      <p style={{ color: 'var(--muted)', marginBottom: '1.75rem', lineHeight: 1.75 }}>The Foundation operates through a lean, mission-focused organisational structure designed for accountability and effectiveness.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem' }}>
        {departments.map((d, i) => (
          <div key={d} style={{ padding: '1.1rem 1.25rem', background: 'var(--bg)', border: '1px solid var(--border)', borderLeft: '3px solid ' + (i < 2 ? 'var(--primary)' : 'var(--accent)'), borderRadius: 'var(--radius)', fontSize: '.9rem', fontWeight: 500, color: 'var(--text)' }}>{d}</div>
        ))}
      </div>
    </div>
  );
}

function ValuesContent() {
  const values = [
    { title: 'Integrity', emoji: '⚖️', desc: 'We uphold the highest standards of honesty, transparency, and ethical conduct in all our work.' },
    { title: 'Inclusivity', emoji: '🤝', desc: 'We celebrate diversity and ensure our programmes are accessible to people of all backgrounds.' },
    { title: 'Excellence', emoji: '🌟', desc: 'We pursue the highest quality in our publications, programmes, and professional interactions.' },
    { title: 'Innovation', emoji: '💡', desc: 'We embrace new ideas, approaches, and technologies that advance our mission.' },
    { title: 'Respect', emoji: '🙏', desc: 'We treat all people, traditions, and cultures with deep respect and dignity.' },
    { title: 'Service', emoji: '🌱', desc: 'We are guided by a spirit of selfless service to the communities and causes we support.' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '1.25rem' }}>
      {values.map(v => (
        <div key={v.title} style={{ padding: '1.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '2.25rem', marginBottom: '.85rem' }}>{v.emoji}</div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', marginBottom: '.6rem' }}>{v.title}</h3>
          <p style={{ fontSize: '.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>{v.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  const { section } = useParams();
  const current = ABOUT_NAV.find(n => n.key === section) || ABOUT_NAV[0];

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span style={{ color: 'rgba(255,255,255,.9)' }}>{current.label}</span>
          </div>
          <h1>{current.label}</h1>
          <p style={{ maxWidth: 520 }}>Gyan Akshar Sanskriti Foundation for Education &amp; Literature</p>
        </div>
      </div>

      <section className="section">
        <div className="about-layout">
          {/* Sidebar nav */}
          <nav className="about-sidebar" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'sticky', top: 80 }}>
            {ABOUT_NAV.map(item => (
              <Link key={item.key} to={item.to}
                style={{
                  display: 'block', padding: '.75rem 1.1rem',
                  fontSize: '.85rem', fontWeight: 500,
                  color: current.key === item.key ? 'var(--primary)' : 'var(--muted)',
                  background: current.key === item.key ? 'var(--bg-off)' : 'transparent',
                  borderLeft: '3px solid ' + (current.key === item.key ? 'var(--accent)' : 'transparent'),
                  borderBottom: '1px solid var(--border)',
                  textDecoration: 'none', transition: 'all .15s',
                }}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Content */}
          <div>
            <SectionContent sectionKey={current.key} />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .about-layout { grid-template-columns: 1fr !important; }
          .about-sidebar { position: static !important; display: flex; flex-wrap: wrap; gap: .35rem; }
        }
      `}</style>
    </div>
  );
}
