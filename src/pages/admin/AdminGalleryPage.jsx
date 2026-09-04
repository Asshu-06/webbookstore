import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminGalleryPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    type: 'Photo',
    title: '',
    year: new Date().getFullYear(),
    category: '',
    color: '#1a3c5e',
    status: 'Published'
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('year', { ascending: false })
    
    if (error) {
      console.error('Error fetching gallery items:', error)
      alert('Error loading gallery items: ' + error.message)
    } else {
      setItems(data || [])
    }
    setLoading(false)
  }

  const openAddModal = () => {
    setEditingItem(null)
    setFormData({
      type: 'Photo',
      title: '',
      year: new Date().getFullYear(),
      category: '',
      color: '#1a3c5e',
      status: 'Published'
    })
    setShowModal(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setFormData({
      type: item.type,
      title: item.title,
      year: item.year,
      category: item.category,
      color: item.color || '#1a3c5e',
      status: item.status
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const itemData = {
      ...formData,
      year: parseInt(formData.year)
    }

    if (editingItem) {
      const { error } = await supabase
        .from('gallery_items')
        .update(itemData)
        .eq('id', editingItem.id)
      
      if (error) {
        alert('Error updating gallery item: ' + error.message)
      } else {
        alert('Gallery item updated successfully!')
        setShowModal(false)
        fetchItems()
      }
    } else {
      const { error } = await supabase
        .from('gallery_items')
        .insert([itemData])
      
      if (error) {
        alert('Error adding gallery item: ' + error.message)
      } else {
        alert('Gallery item added successfully!')
        setShowModal(false)
        fetchItems()
      }
    }
  }

  const handleDelete = async (item) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return

    const { error } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', item.id)
    
    if (error) {
      alert('Error deleting gallery item: ' + error.message)
    } else {
      alert('Gallery item deleted successfully!')
      fetchItems()
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
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.75rem', margin: '0 0 .25rem' }}>Gallery</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>Manage photos and media items</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }} onClick={openAddModal}>
          <Plus size={16} /> Add Gallery Item
        </button>
      </div>

      {loading && <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading gallery items...</div>}

      {!loading && (
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div className="table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-off)' }}>
                  {['Title', 'Type', 'Category', 'Year', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No gallery items found. Click "Add Gallery Item" to create one.
                    </td>
                  </tr>
                ) : (
                  items.map(item => (
                    <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text)', maxWidth: 250 }}>{item.title}</div>
                      </td>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <span className="tag">{item.type}</span>
                      </td>
                      <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)' }}>{item.category}</td>
                      <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)' }}>{item.year}</td>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <span className={`badge ${item.status === 'Published' ? 'badge-primary' : 'badge-secondary'}`} style={{ fontSize: '.7rem' }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '.5rem' }}>
                          <button className="btn btn-sm btn-outline" style={{ padding: '.3rem .6rem' }} onClick={() => openEditModal(item)}>
                            <Edit2 size={13} />
                          </button>
                          <button className="btn btn-sm" style={{ padding: '.3rem .6rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }} onClick={() => handleDelete(item)}>
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
            background: '#fff', borderRadius: 'var(--radius-lg)', maxWidth: 500, width: '100%',
            maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--primary)' }}>
                {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem' }}
                    >
                      <option value="Photo">Photo</option>
                      <option value="Video">Video</option>
                    </select>
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

                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Events, Book Launches, Media Coverage"
                    style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Color</label>
                    <input
                      type="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      style={{ width: '100%', height: '42px', padding: '.2rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', cursor: 'pointer' }}
                    />
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
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Save size={16} /> {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
