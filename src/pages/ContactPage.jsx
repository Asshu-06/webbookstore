import { useState } from 'react';
import { MapPin, Mail, Phone, Send, CheckCircle } from 'lucide-react';

const ENQUIRY_TYPES = ['General Enquiry', 'Publication Enquiry', 'Membership Enquiry', 'Internship Enquiry'];

const CONTACT_INFO = [
  {
    icon: <MapPin size={22} color="var(--accent)" />,
    title: 'Registered Office',
    lines: ['123 Gyan Marg, Cultural District,', 'Pune - 411001, Maharashtra, India'],
  },
  {
    icon: <Mail size={22} color="var(--accent)" />,
    title: 'Email',
    lines: ['info@gasfe.org', 'publication@gasfe.org'],
  },
  {
    icon: <Phone size={22} color="var(--accent)" />,
    title: 'Phone',
    lines: ['+91 20 2345 6789', '+91 98765 43210'],
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-content">
          <h1>Contact Us</h1>
          <p>Get in touch with the Foundation for any enquiry or information</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Our Office</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {CONTACT_INFO.map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, background: 'rgba(200,150,60,.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '.3rem', fontSize: '.9rem' }}>{item.title}</h4>
                      {item.lines.map((line, i) => (
                        <p key={i} style={{ fontSize: '.875rem', color: 'var(--text-light)' }}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--bg-off)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--primary)' }}>
                <h4 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '.5rem' }}>Office Hours</h4>
                <p style={{ fontSize: '.875rem', color: 'var(--text-light)' }}>Monday – Saturday: 9:30 AM – 6:00 PM</p>
                <p style={{ fontSize: '.875rem', color: 'var(--text-light)' }}>Closed on Sundays and Public Holidays</p>
              </div>
            </div>

            {/* Form */}
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow)' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.75rem', fontSize: '1.5rem' }}>Send an Enquiry</h2>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <CheckCircle size={56} color="#16a34a" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary)', marginBottom: '.5rem' }}>Message Sent</h3>
                  <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>Thank you for reaching out. We typically respond within 2-3 working days.</p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-outline">Send Another Message</button>
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
                  <div className="form-group">
                    <label className="form-label">Enquiry Type *</label>
                    <select className="form-input form-select" required value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                      <option value="">Select enquiry type</option>
                      {ENQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject *</label>
                    <input className="form-input" type="text" required placeholder="Brief subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message * (max 2000 characters)</label>
                    <textarea className="form-input form-textarea" required maxLength={2000} placeholder="Your message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ minHeight: 140 }} />
                    <div style={{ fontSize: '.75rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '.25rem' }}>{form.message.length}/2000</div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '.8rem', gap: '.6rem' }}>
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}