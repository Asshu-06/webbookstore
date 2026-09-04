import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, Save, FileText } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminCompliancePage() {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingDoc, setEditingDoc] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    type: 'Registration',
    year: new Date().getFullYear(),
    size: '',
    status: 'Active'
  })

  useEffect(() => {
    fetchDocs()
  }, [])

  const fetchDocs = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('compliance_docs')
      .select('*')
      .order('year', { ascending: false })
    
    if (error) {
      console.error('Error fetching compliance docs:', error)
      alert('Error loading compliance documents: ' + error.message)
    } else {
      setDocs(data || [])
    }
    setLoading(false)
  }

  const openAddModal = () => {
    setEditingDoc(null)
    setFormData({
      title: '',
      type: 'Registration',
      year: new Date().getFullYear(),
      size: '',
      status: 'Active'
    })
    setShowModal(true)
  }

  const openEditModal = (doc) => {
    setEditingDoc(doc)
    setFormData({
      title: doc.title,
      type: doc.type,
      year: doc.year,
      size: doc.size,
      status: doc.status
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const docData = {
      ...formData,
      year: parseInt(formData.year)
    }

    if (editingDoc) {
      const { error } = await supabase
        .from('compliance_docs')
        .update(docData)
        .eq('id', editingDoc.id)
      
      if (error) {
        alert('Error updating document: ' + error.message)
      } else {
        alert('Document updated successfully!')
        setShowModal(false)
        fetchDocs()
      }
    } else {
      const { error } = await supabase
        .from('compliance_docs')
        .insert([docData])
      
      if (error) {
        alert('Error adding document: ' + error.message)
      } else {
        alert('Document added successfully!')
        setShowModal(false)
        fetchDocs()
      }
    }
  }

  const handleDelete = async (doc) => {
    if (!confirm(`Are you sure you want to delete "${doc.title}"?`)) return

    const { error } = await supabase
      .from('compliance_docs')
      .delete()
      .eq('id', doc.id)
    
    if (error) {
      alert('Error deleting document: ' + error.message)
    } else {
      alert('Document deleted successfully!')
      fetchDocs()
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
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.75rem', margin: '0 0 .25rem' }}>Compliance Documents</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>Manage registration, reports, and policy documents</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }} onClick={openAddModal}>
          <Plus size={16} /> Add Document
        </button>
      </div>

      {loading && <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading documents...</div>}

      {!loading && (
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div className="table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-off)' }}>
                  {['Title', 'Type', 'Year', 'Size', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {docs.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No documents found. Click "Add Document" to create one.
                    </td>
                  </tr>
                ) : (
                  docs.map(doc => (
                    <tr key={doc.id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text)', maxWidth: 280 }}>{doc.title}</div>
                      </td>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <span className="tag">{doc.type}</span>
                      </td>
                      <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)' }}>{doc.year}</td>
                      <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '.78rem' }}>{doc.size}</td>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <span className={`badge ${doc.status === 'Active' ? 'badge-primary' : 'badge-secondary'}`} style={{ fontSize: '.7rem' }}>
                          {doc.status}
                        </span>
                      </td>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '.5rem' }}>
                          <button className="btn btn-sm btn-outline" style={{ padding: '.3rem .6rem' }} onClick={() => openEditModal(doc)}>
                            <Edit2 size={13} />
                          </button>
                          <button className="btn btn-sm" style={{ padding: '.3rem .6rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }} onClick={() => handleDelete(doc)}>
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
                {editingDoc ? 'Edit Document' : 'Add New Document'}
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
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem' }}
                  >
                    <option value="Registration">Registration</option>
                    <option value="Annual Report">Annual Report</option>
                    <option value="Financial Statement">Financial Statement</option>
                    <option value="Policy">Policy</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

                  <div>
                    <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>File Size *</label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 2.5 MB"
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
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Save size={16} /> {editingDoc ? 'Update Document' : 'Add Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
