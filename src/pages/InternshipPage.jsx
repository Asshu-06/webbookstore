import { useState } from 'react';
import { CheckCircle, GraduationCap, Clock } from 'lucide-react';
import { INTERNSHIP_AREAS } from '../data';

export default function InternshipPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', institution: '', area: '', statement: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-content">
          <h1>Internship Programme</h1>
          <p>Gain real-world experience in education, publishing, and cultural work</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="badge badge-accent">Opportunities</span>
            <h2 className="section-title" style={{ marginTop: '.75rem' }}>Internship Areas</h2>
            <div className="accent-bar" />
            <p className="section-subtitle">Choose from six focused internship tracks designed to develop professional expertise</p>
          </div>

          <div className="internship-grid" style={{ marginBottom: "2.5rem" }}>
            {INTERNSHIP_AREAS.map((area, i) => (
              <div key={area.id} className="card">
                <div style={{ height: 8, background: ['var(--primary)', 'var(--accent)', '#4a7c5c', '#5a4080', '#7c3060', '#1a5c6e'][i] }} />
                <div className="card-body">
                  <GraduationCap size={28} color={['var(--primary)', 'var(--accent)', '#4a7c5c', '#5a4080', '#7c3060', '#1a5c6e'][i]} style={{ marginBottom: '.75rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', marginBottom: '.75rem' }}>{area.area}</h3>
                  <p style={{ fontSize: '.875rem', color: 'var(--text-light)', lineHeight: 1.65, marginBottom: '1rem' }}>{area.description}</p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '.8rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}><Clock size={12} /> {area.duration}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}>&#8377; {area.stipend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Process */}
          <div style={{ background: 'var(--bg-off)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', marginBottom: '2rem', textAlign: 'center' }}>Selection Process</h2>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Submit Application', 'Application Screening', 'Telephonic Interview', 'Offer Letter', 'Joining & Induction'].map((step, i) => (
                <div key={step} style={{ textAlign: 'center', minWidth: 140 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto .75rem', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem' }}>{i + 1}</div>
                  <p style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--text)' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Application form */}
          <div style={{ maxWidth: 680, margin: '0 auto', background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.75rem', fontSize: '1.5rem' }}>Apply for Internship</h2>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle size={56} color="#16a34a" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary)', marginBottom: '.5rem' }}>Application Received</h3>
                <p style={{ color: 'var(--text-light)' }}>We will review your application and reach out within 7-10 days.</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ marginTop: '1.5rem' }}>Apply Again</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" type="text" required placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" required placeholder="email@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Academic Institution *</label>
                    <input className="form-input" type="text" required placeholder="Your college/university" value={form.institution} onChange={e => setForm({...form, institution: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Area of Interest *</label>
                  <select className="form-input form-select" required value={form.area} onChange={e => setForm({...form, area: e.target.value})}>
                    <option value="">Select internship area</option>
                    {INTERNSHIP_AREAS.map(a => <option key={a.id} value={a.area}>{a.area}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Personal Statement * (max 1000 characters)</label>
                  <textarea className="form-input form-textarea" required maxLength={1000} placeholder="Briefly explain your interest and relevant experience..." value={form.statement} onChange={e => setForm({...form, statement: e.target.value})} />
                  <div style={{ fontSize: '.75rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '.25rem' }}>{form.statement.length}/1000</div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '.8rem' }}>
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}