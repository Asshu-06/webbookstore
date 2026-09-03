import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { FAQS } from '../data';

const PROCESS_STEPS = [
  { num: '01', title: 'Manuscript Submission', desc: 'Submit your complete manuscript along with a brief author bio, a synopsis, and three sample chapters.' },
  { num: '02', title: 'Editorial Review', desc: 'Our editorial committee reviews the submission for literary merit, cultural relevance, and market suitability.' },
  { num: '03', title: 'Author Communication', desc: 'We contact all applicants within 90 days. If shortlisted, you receive an editorial feedback letter.' },
  { num: '04', title: 'Contract & Agreement', desc: 'On acceptance, we issue a publication agreement detailing royalties, timeline, and rights.' },
  { num: '05', title: 'Editorial Production', desc: 'The manuscript goes through professional editing, design, typesetting, and proofing.' },
  { num: '06', title: 'Publication & Distribution', desc: 'Your book is published in print and digital formats and distributed to major retailers and libraries.' },
];

const GUIDELINES = [
  'Manuscripts must be original, unpublished works not under consideration elsewhere',
  'Minimum length: 40,000 words for fiction/non-fiction; 50 poems for poetry collections',
  'Accepted languages, and other Indian languages',
  'Submit in .docx or .pdf format, double-spaced, standard font (Times New Roman 12pt or equivalent)',
  'Include a detailed table of contents and chapter summaries for non-fiction works',
  'Author biography (300-500 words) must be submitted with the manuscript',
  'We do not accept works containing hate speech, obscenity, or material that violates Indian law',
];

export default function PublicationPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', title: '', language: '', synopsis: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-content">
          <h1>Publication Programme</h1>
          <p>We publish voices that matter — literature, scholarship, and cultural heritage across Indian languages</p>
        </div>
      </div>

      {/* About */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="badge badge-primary">About</span>
              <h2 className="section-title" style={{ marginTop: '.75rem' }}>Publishing with Purpose</h2>
              <div className="accent-bar accent-bar-left" />
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginTop: '1.25rem' }}>
                The Foundation's publication programme has been instrumental in bringing 150+ books to readers since 2012. We specialise in works that celebrate Indian culture, promote regional languages, and contribute to the literary and scholarly conversation.
              </p>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginTop: '1rem' }}>
                We work closely with first-time and established authors, providing professional editorial support, design, and nationwide distribution through both physical and digital channels.
              </p>
              <Link to="/books" className="btn btn-outline" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                <BookOpen size={16} /> Browse Our Books
              </Link>
            </div>
            <div className="form-row-2">
              {[
                { n: '150+', l: 'Books Published' }, { n: '20+', l: 'Languages' },
                { n: '200+', l: 'Authors', }, { n: '12 yrs', l: 'of Publishing' },
              ].map(s => (
                <div key={s.l} className="stat-box" style={{ padding: '1.5rem 1rem' }}>
                  <div className="number" style={{ fontSize: '2rem' }}>{s.n}</div>
                  <div className="label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: 'var(--bg-off)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="badge badge-accent">How It Works</span>
            <h2 className="section-title" style={{ marginTop: '.75rem' }}>Publication Process</h2>
            <div className="accent-bar" />
          </div>
          <div className="process-grid">
            {PROCESS_STEPS.map(step => (
              <div key={step.num} style={{ padding: '1.75rem', background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 700, color: 'rgba(26,60,94,.12)', marginBottom: '.75rem', lineHeight: 1 }}>{step.num}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', marginBottom: '.6rem' }}>{step.title}</h3>
                <p style={{ fontSize: '.875rem', color: 'var(--text-light)', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author Guidelines */}
      <section className="section">
        <div className="container" style={{ maxWidth: 840 }}>
          <h2 className="section-title text-center">Author Guidelines</h2>
          <div className="accent-bar" style={{ margin: '1rem auto 2rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {GUIDELINES.map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: '.75rem', padding: '1rem 1.25rem', background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius)', alignItems: 'flex-start' }}>
                <CheckCircle size={17} color="var(--primary)" style={{ marginTop: 1, flexShrink: 0 }} />
                <span style={{ color: 'var(--text)', lineHeight: 1.6, fontSize: '.95rem' }}>{g}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section" style={{ background: 'var(--bg-off)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <div className="accent-bar" style={{ margin: '1rem auto 2.5rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '1.1rem 1.25rem', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: '.75rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '.95rem' }}>{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={18} color="var(--primary)" style={{ flexShrink: 0 }} /> : <ChevronDown size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 1.25rem 1.1rem', fontSize: '.9rem', color: 'var(--text-light)', lineHeight: 1.7, borderTop: '1px solid var(--border)' }}>
                    <div style={{ paddingTop: '.9rem' }}>{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission form */}
      <section className="section">
        <div className="container" style={{ maxWidth: 680 }}>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.75rem', fontSize: '1.5rem' }}>
              Submit Manuscript Enquiry
            </h2>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle size={56} color="#16a34a" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary)', marginBottom: '.5rem' }}>Enquiry Received</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>Our publications team will contact you within 7 working days with detailed submission instructions.</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline">Submit Another</button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                <div className="form-row-2">
                  <div className="form-group"><label className="form-label">Author Name *</label><input className="form-input" required placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                  <div className="form-group"><label className="form-label">Email *</label><input className="form-input" type="email" required placeholder="email@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                </div>
                <div className="form-row-2">
                  <div className="form-group"><label className="form-label">Manuscript Title *</label><input className="form-input" required placeholder="Working title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
                  <div className="form-group"><label className="form-label">Language *</label>
                    <select className="form-input form-select" required value={form.language} onChange={e => setForm({...form, language: e.target.value})}>
                      <option value="">Select language</option>
                      {['English','Hindi','Marathi','Kannada','Tamil','Telugu','Bengali','Other'].map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group"><label className="form-label">Brief Synopsis *</label>
                  <textarea className="form-input form-textarea" required placeholder="Describe your manuscript in 100-300 words..." value={form.synopsis} onChange={e => setForm({...form, synopsis: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '.8rem' }}>Submit Enquiry</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}