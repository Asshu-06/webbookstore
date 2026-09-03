import { FileText, Download, Calendar } from 'lucide-react';
import { COMPLIANCE_DOCS } from '../data';

const TYPE_ORDER = ['Registration', 'Annual Report', 'Financial Statement', 'Policy'];
const TYPE_COLORS= {
  'Registration': 'var(--primary)',
  'Annual Report': 'var(--accent)',
  'Financial Statement': '#4a7c5c',
  'Policy': '#5a4080',
};

export default function CompliancesPage() {
  const grouped = TYPE_ORDER.reduce((acc, type) => {
    acc[type] = COMPLIANCE_DOCS.filter(d => d.type === type);
    return acc;
  }, {});

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-content">
          <h1>Compliances</h1>
          <p>Official registration documents, annual reports, financial statements, and policies</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ background: 'rgba(26,60,94,.06)', border: '1px solid rgba(26,60,94,.12)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '2.5rem', fontSize: '.875rem', color: 'var(--text-light)', display: 'flex', gap: '.75rem', alignItems: 'flex-start' }}>
            <FileText size={16} color="var(--primary)" style={{ marginTop: 2, flexShrink: 0 }} />
            <span>All documents listed below are official records of Gyan Akshar Sanskriti Foundation. Documents marked for download are in PDF format and available to all stakeholders.</span>
          </div>

          {TYPE_ORDER.map(type => (
            <div key={type} style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid', borderBottomColor: TYPE_COLORS[type] }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: TYPE_COLORS[type], flexShrink: 0 }} />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--text)', fontSize: '1.3rem' }}>{type}s</h2>
                <span className="badge badge-primary">{grouped[type].length} documents</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                {grouped[type].map(doc => (
                  <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius)', borderLeft: '4px solid ' + TYPE_COLORS[type] }}>
                    <FileText size={20} color={TYPE_COLORS[type]} style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '.2rem', fontSize: '.95rem' }}>{doc.title}</h4>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '.78rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}><Calendar size={11} /> {doc.year}</span>
                        <span>{doc.size}</span>
                        <span>PDF</span>
                      </div>
                    </div>
                    <button className="btn btn-outline btn-sm" style={{ flexShrink: 0, display: 'flex', gap: '.4rem', alignItems: 'center' }}
                      onClick={() => alert('In the production site, this will download ' + doc.title)}>
                      <Download size={14} /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}