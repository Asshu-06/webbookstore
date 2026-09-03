import { BookOpen } from 'lucide-react'
import { BOOKS } from '../../data'

// Derive unique authors from books data
const AUTHORS = Array.from(
  new Map(BOOKS.map(b => [b.author, { name: b.author, books: BOOKS.filter(bk => bk.author === b.author).length }])).values()
)

export default function AdminAuthorsPage() {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.75rem', margin: '0 0 .25rem' }}>Authors</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>Authors published through the Foundation</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {AUTHORS.map(author => (
          <div key={author.name} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{author.name.charAt(author.name.lastIndexOf(' ') + 1)}</span>
            </div>
            <div>
              <h3 style={{ fontWeight: 700, color: 'var(--text)', margin: '0 0 .2rem', fontSize: '.95rem' }}>{author.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.35rem', fontSize: '.78rem', color: 'var(--text-muted)' }}>
                <BookOpen size={12} /> {author.books} {author.books === 1 ? 'book' : 'books'} published
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}