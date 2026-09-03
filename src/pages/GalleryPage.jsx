import { useState } from 'react';
import { Image } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

const CATS = ['All', 'Events', 'Book Launches', 'Media Coverage'];
const YEARS = ['All', '2024', '2023'];

export default function GalleryPage() {
  const [cat, setCat] = useState('All');
  const [year, setYear] = useState('All');

  const filtered = GALLERY_ITEMS.filter(item =>
    (cat === 'All' || item.category === cat) &&
    (year === 'All' || item.year.toString() === year)
  );

  return (
    <div>
      <div className="page-hero page-hero-center">
        <div className="container page-hero-inner">
          <h1>Gallery</h1>
          <p>Visual chronicles of our programmes, events, and community activities</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filter bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.85rem', alignItems: 'center', marginBottom: '2rem', padding: '1.1rem 1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginRight: '.25rem' }}>Category:</span>
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)} style={{
                  padding: '.3rem .8rem', borderRadius: '999px',
                  border: '1.5px solid ' + (cat === c ? 'var(--primary)' : 'var(--border)'),
                  background: cat === c ? 'var(--primary)' : 'var(--surface)',
                  color: cat === c ? '#fff' : 'var(--muted)',
                  fontSize: '.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all .15s',
                }}>{c}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginRight: '.25rem' }}>Year:</span>
              {YEARS.map(y => (
                <button key={y} onClick={() => setYear(y)} style={{
                  padding: '.3rem .8rem', borderRadius: '999px',
                  border: '1.5px solid ' + (year === y ? 'var(--accent)' : 'var(--border)'),
                  background: year === y ? 'var(--accent)' : 'var(--surface)',
                  color: year === y ? '#fff' : 'var(--muted)',
                  fontSize: '.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all .15s',
                }}>{y}</button>
              ))}
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '.78rem', color: 'var(--muted)' }}>{filtered.length} items</span>
          </div>

          {/* Grid */}
          <div className="gallery-grid">
            {filtered.map(item => (
              <div key={item.id} style={{
                borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                cursor: 'pointer', position: 'relative', aspectRatio: '4/3',
                background: item.color, boxShadow: 'var(--shadow-sm)',
                transition: 'transform .2s, box-shadow .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.025)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image size={34} color="rgba(255,255,255,.25)" />
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent,rgba(0,0,0,.72))', padding: '2rem 1rem .9rem' }}>
                  <p style={{ color: '#fff', fontSize: '.84rem', fontWeight: 600, lineHeight: 1.3 }}>{item.title}</p>
                  <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.72rem', marginTop: '.2rem' }}>{item.category} &bull; {item.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
