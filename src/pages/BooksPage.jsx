import { BookOpen, ExternalLink, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const GENRES = ['All', 'Literary Fiction', 'Biography', 'Poetry', 'Non-Fiction', 'Historical Fiction', 'Folklore'];

export default function BooksPage() {
  const [genre, setGenre] = useState('All');
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('status', 'Published')
      .order('year', { ascending: false });
    
    if (error) {
      console.error('Error fetching books:', error);
    } else {
      setBooks(data || []);
    }
    setLoading(false);
  };

  const filtered = books.filter(b =>
    (genre === 'All' || b.genre === genre) &&
    (search === '' || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-content">
          <h1>Our Publications</h1>
          <p>Explore our growing catalogue of books across genres and Indian languages</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div style={{ background: 'var(--bg-off)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1 1 220px' }}>
              <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input className="form-input" placeholder="Search books or authors..." style={{ paddingLeft: '2rem', marginBottom: 0 }} value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {GENRES.map(g => (
                <button key={g} onClick={() => setGenre(g)}
                  style={{ padding: '.35rem .85rem', borderRadius: '999px', border: '1.5px solid', borderColor: genre === g ? 'var(--primary)' : 'var(--border)', background: genre === g ? 'var(--primary)' : '#fff', color: genre === g ? '#fff' : 'var(--text)', fontSize: '.82rem', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '.875rem', marginBottom: '1.5rem' }}>
            {loading ? 'Loading books...' : `${filtered.length} books found`}
          </p>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading books...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No books found matching your search.</div>
          ) : (
            <div className="books-grid">
            {filtered.map(book => (
              <div key={book.id} className="card">
                {/* Book cover */}
                <div style={{ height: 200, background: 'linear-gradient(160deg, var(--primary-dark), var(--primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <BookOpen size={36} color="rgba(255,255,255,.4)" style={{ margin: '0 auto .75rem' }} />
                    <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#fff', fontSize: '1rem', lineHeight: 1.3 }}>{book.title}</div>
                    <div style={{ color: 'rgba(255,255,255,.6)', fontSize: '.78rem', marginTop: '.3rem' }}>{book.author}</div>
                  </div>
                  <span style={{ position: 'absolute', top: 12, right: 12 }} className="badge badge-accent">{book.genre}</span>
                </div>
                <div className="card-body">
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary)', marginBottom: '.2rem' }}>{book.title}</h3>
                  <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: '.6rem' }}>{book.author} &bull; {book.year}</p>
                  <p style={{ fontSize: '.82rem', color: 'var(--text-light)', lineHeight: 1.6, marginBottom: '.75rem' }}>{book.description.substring(0, 100)}...</p>
                  <p style={{ fontSize: '.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>ISBN: {book.isbn}</p>
                  <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--accent)', fontSize: '1.15rem' }}>&#8377;{book.price}</span>
                    <div style={{ display: 'flex', gap: '.5rem' }}>
                      <a href="#" className="btn btn-primary btn-sm" onClick={e => { e.preventDefault(); alert('Redirecting to Amazon...'); }}><ExternalLink size={12} /> Amazon</a>
                      <a href="#" className="btn btn-outline btn-sm" onClick={e => { e.preventDefault(); alert('Redirecting to Flipkart...'); }}>Flipkart</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>
    </div>
  );
}