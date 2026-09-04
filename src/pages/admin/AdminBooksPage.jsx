import { useState, useEffect } from 'react'
import { Search, Plus, Edit2, Trash2, X, Save } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminBooksPage() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    year: new Date().getFullYear(),
    genre: '',
    description: '',
    price: '',
    status: 'Published',
    slug: ''
  })

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching books:', error)
      alert('Error loading books: ' + error.message)
    } else {
      setBooks(data || [])
    }
    setLoading(false)
  }

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  )

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const openAddModal = () => {
    setEditingBook(null)
    setFormData({
      title: '',
      author: '',
      isbn: '',
      year: new Date().getFullYear(),
      genre: '',
      description: '',
      price: '',
      status: 'Published',
      slug: ''
    })
    setShowModal(true)
  }

  const openEditModal = (book) => {
    setEditingBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      year: book.year,
      genre: book.genre,
      description: book.description || '',
      price: book.price,
      status: book.status,
      slug: book.slug
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const slug = formData.slug || generateSlug(formData.title)
    const bookData = {
      ...formData,
      slug,
      price: parseFloat(formData.price),
      year: parseInt(formData.year)
    }

    if (editingBook) {
      // Update existing book
      const { error } = await supabase
        .from('books')
        .update(bookData)
        .eq('id', editingBook.id)
      
      if (error) {
        alert('Error updating book: ' + error.message)
      } else {
        alert('Book updated successfully!')
        setShowModal(false)
        fetchBooks()
      }
    } else {
      // Add new book
      const { error } = await supabase
        .from('books')
        .insert([bookData])
      
      if (error) {
        alert('Error adding book: ' + error.message)
      } else {
        alert('Book added successfully!')
        setShowModal(false)
        fetchBooks()
      }
    }
  }

  const handleDelete = async (book) => {
    if (!confirm(`Are you sure you want to delete "${book.title}"?`)) return

    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', book.id)
    
    if (error) {
      alert('Error deleting book: ' + error.message)
    } else {
      alert('Book deleted successfully!')
      fetchBooks()
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.75rem', margin: '0 0 .25rem' }}>Books</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>Manage the foundation's publication catalogue</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }} onClick={openAddModal}>
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

      {/* Loading */}
      {loading && <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading books...</div>}

      {/* Table */}
      {!loading && (
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
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No books found. Click "Add Book" to create one.
                    </td>
                  </tr>
                ) : (
                  filtered.map(book => (
                    <tr key={book.id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
                      </td>
                      <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{book.author}</td>
                      <td style={{ padding: '.85rem 1rem', fontFamily: 'monospace', fontSize: '.78rem', color: 'var(--text-muted)' }}>{book.isbn}</td>
                      <td style={{ padding: '.85rem 1rem' }}><span className="tag">{book.genre}</span></td>
                      <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)' }}>{book.year}</td>
                      <td style={{ padding: '.85rem 1rem', color: 'var(--text)' }}>₹{book.price}</td>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <span className={`badge ${book.status === 'Published' ? 'badge-primary' : 'badge-secondary'}`} style={{ fontSize: '.7rem' }}>
                          {book.status}
                        </span>
                      </td>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '.5rem' }}>
                          <button className="btn btn-sm btn-outline" style={{ padding: '.3rem .6rem' }} onClick={() => openEditModal(book)}>
                            <Edit2 size={13} />
                          </button>
                          <button className="btn btn-sm" style={{ padding: '.3rem .6rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }} onClick={() => handleDelete(book)}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: '#fff', borderRadius: 'var(--radius-lg)', maxWidth: 600, width: '100%',
            maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--primary)' }}>
                {editingBook ? 'Edit Book' : 'Add New Book'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '.5rem' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Author *</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>ISBN *</label>
                    <input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Year *</label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Genre *</label>
                    <input
                      type="text"
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem' }}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Out of Print">Out of Print</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem', resize: 'vertical' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Slug (URL-friendly)</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="Leave empty to auto-generate"
                    style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Save size={16} /> {editingBook ? 'Update Book' : 'Add Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
