import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Tag, BookOpen } from 'lucide-react';
import { ACTIVITIES } from '../data';

export default function ActivityDetailPage() {
  const { slug } = useParams();
  const activity = ACTIVITIES.find(a => a.slug === slug);

  if (activity) {
    return (
      <div className="section text-center container">
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary)' }}>Activity Not Found</h2>
        <Link to="/activities" className="btn btn-outline" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
          <ArrowLeft size={16} /> Back to Activities
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-hero" style={{ background: activity.coverColor }}>
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span>
            <Link to="/activities">Activities</Link> <span>/</span>
            <span style={{ color: '#fff' }}>{activity.title}</span>
          </div>
          <h1>{activity.title}</h1>
          <p>{activity.category}</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '.875rem' }}>
              <Calendar size={15} />
              {new Date(activity.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '.875rem' }}>
              <Tag size={15} />
              <span className="badge badge-primary">{activity.category}</span>
            </div>
          </div>

          <p style={{ fontSize: '1.1rem', color: 'var(--text)', lineHeight: 1.8, marginBottom: '1.5rem' }}>{activity.description}</p>
          <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            The Foundation organised this programme as part of its ongoing commitment to the {activity.category} sector. Participants engaged in interactive sessions designed to maximise impact and community involvement.
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: 1.8 }}>
            Feedback from participants was overwhelmingly positive, with many requesting follow-up programmes. The Foundation is currently evaluating proposals for continuation and expansion of this initiative.
          </p>

          {/* Photo gallery placeholder */}
          <div style={{ marginTop: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.25rem', fontSize: '1.3rem' }}>Photo Gallery</h3>
            <div className="activities-grid">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} style={{ aspectRatio: '4/3', background: activity.coverColor + (i % 2 === 0 ? 'cc' : '99'), borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={28} color="rgba(255,255,255,.4)" />
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            <Link to="/activities" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', color: 'var(--primary)', fontWeight: 600 }}>
              <ArrowLeft size={16} /> Back to All Activities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}