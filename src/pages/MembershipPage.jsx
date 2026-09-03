import { useState } from 'react';
import { CheckCircle, Users, Star } from 'lucide-react';
import { MEMBERSHIP_CATEGORIES } from '../data';

export default function MembershipPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', category: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-content">
          <h1>Membership</h1>
          <p>Join our growing community of education and literature enthusiasts</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Benefits */}
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="badge badge-primary">Why Join?</span>
            <h2 className="section-title" style={{ marginTop: '.75rem' }}>Membership Benefits</h2>
            <div className="accent-bar" />
          </div>

          {/* Category cards */}
          <div className="membership-cats" style={{ marginBottom: '2.5rem' }}>
            {MEMBERSHIP_CATEGORIES.map((cat, i) => (
              <div key={cat.id} className="card" style={{ borderTop: '4px solid ' + ['var(--accent)', 'var(--primary)', '#4a7c5c', '#7c3060'][i] }}>
                <div className="card-body">
                  <div style={{ marginBottom: '1rem' }}>
                    <Star size={24} color={['var(--accent)', 'var(--primary)', '#4a7c5c', '#7c3060'][i]} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', marginBottom: '.25rem' }}>{cat.name}</h3>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: ['var(--accent)', 'var(--primary)', '#4a7c5c', '#7c3060'][i], marginBottom: '.15rem' }}>
                    &#8377;{cat.fee.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{cat.duration}</div>
                  <div style={{ fontSize: '.8rem', background: 'rgba(26,60,94,.06)', borderRadius: 'var(--radius)', padding: '.6rem .75rem', color: 'var(--text-light)', marginBottom: '1.25rem' }}>
                    <strong>Eligibility:</strong> {cat.eligibility}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.45rem' }}>
                    {cat.benefits.map((b) => (
                      <li key={b} style={{ display: 'flex', gap: '.5rem', alignItems: 'flex-start', fontSize: '.82rem', color: 'var(--text-light)' }}>
                        <CheckCircle size={13} color="var(--primary)" style={{ marginTop: 3, flexShrink: 0 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Application form */}
          <div style={{ maxWidth: 680, margin: '0 auto', background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={22} color="#fff" />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.4rem' }}>Membership Application</h2>
                <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Fill in the form below to apply for membership</p>
              </div>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle size={56} color="#16a34a" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary)', marginBottom: '.5rem' }}>Application Submitted</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>Thank you for applying. We will review your application and contact you within 5-7 business days.</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline">Submit Another Application</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" type="text" required placeholder="Your full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input className="form-input" type="email" required placeholder="email@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Membership Category *</label>
                  <select className="form-input form-select" required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                    <option value="">Select a membership category</option>
                    {MEMBERSHIP_CATEGORIES.map(c => (
                      <option key={c.id} value={c.name}>{c.name} — &#8377;{c.fee.toLocaleString()} ({c.duration})</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <textarea className="form-input form-textarea" placeholder="Your complete address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} style={{ minHeight: 80 }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '.8rem' }}>
                  Submit Application
                </button>
                <p style={{ fontSize: '.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem' }}>
                  Your application will be reviewed by our team. You will receive an email confirmation once processed.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}