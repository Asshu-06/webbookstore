import { useState } from 'react'
import { Search, Plus, Edit2, Trash2 } from 'lucide-react'
import { BOOKS } from '../../data'

export default function AdminBooksPage() {
  const [search, setSearch] = useState('')

  const filtered = BOOKS.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  )

  const handleAction = (action, title) => {
    alert(`${action}: "${title}"\n\nThis feature requires Supabase configuration.`)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.75rem', margin: '0 0 .25rem' }}>Books</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>Manage the foundation's publication catalogue</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }} onClick={() => alert('Add Book requires Supabase configuration.')}>
          <Plus size={16} /> Add Book
        </button>
      </div>

      {/* Search */}
      <div style={{ background: '#fff', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '.75rem', alignItems: 'center' }}>
        <Search size={16} color="var(--text-muted)" />
        <input
          style={{ border: 'none', outline: 'none', flex: 1, fontSize: '.875rem', color: 'var(--text)', background: 'transparent' }}
          placeholder="Search books or authors..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span style={{ fontSize: '.78rem', color: 'var(--text-muted)' }}>{filtered.length} results</span>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div className="table-wrap">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-off)' }}>
                {['Title', 'Author', 'ISBN', 'Genre', 'Year', 'Price', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(book => (
                <tr key={book.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '.85rem 1rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
                  </td>
                  <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{book.author}</td>
                  <td style={{ padding: '.85rem 1rem', fontFamily: 'monospace', fontSize: '.78rem', color: 'var(--text-muted)' }}>{book.isbn}</td>
                  <td style={{ padding: '.85rem 1rem' }}><span className="tag">{book.genre}</span></td>
                  <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)' }}>{book.year}</td>
                  <td style={{ padding: '.85rem 1rem', color: 'var(--text)' }}>&#8377;{book.price}</td>
                  <td style={{ padding: '.85rem 1rem' }}><span className="badge badge-primary" style={{ fontSize: '.7rem' }}>Published</span></td>
                  <td style={{ padding: '.85rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '.5rem' }}>
                      <button className="btn btn-sm btn-outline" style={{ padding: '.3rem .6rem' }} onClick={() => handleAction('Edit', book.title)}>
                        <Edit2 size={13} />
                      </button>
                      <button className="btn btn-sm" style={{ padding: '.3rem .6rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }} onClick={() => handleAction('Delete', book.title)}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}