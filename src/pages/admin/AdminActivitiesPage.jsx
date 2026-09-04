import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingActivity, setEditingActivity] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    category_slug: '',
    date: '',
    description: '',
    cover_color: '#1a3c5e',
    slug: '',
    status: 'Published'
  })

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('date', { ascending: false })
    
    if (error) {
      console.error('Error fetching activities:', error)
      alert('Error loading activities: ' + error.message)
    } else {
      setActivities(data || [])
    }
    setLoading(false)
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const generateCategorySlug = (category) => {
    return category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const openAddModal = () => {
    setEditingActivity(null)
    setFormData({
      title: '',
      category: '',
      category_slug: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      cover_color: '#1a3c5e',
      slug: '',
      status: 'Published'
    })
    setShowModal(true)
  }

  const openEditModal = (activity) => {
    setEditingActivity(activity)
    setFormData({
      title: activity.title,
      category: activity.category,
      category_slug: activity.category_slug,
      date: activity.date,
      description: activity.description || '',
      cover_color: activity.cover_color || '#1a3c5e',
      slug: activity.slug,
      status: activity.status
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const slug = formData.slug || generateSlug(formData.title)
    const category_slug = formData.category_slug || generateCategorySlug(formData.category)
    
    const activityData = {
      ...formData,
      slug,
      category_slug
    }

    if (editingActivity) {
      const { error } = await supabase
        .from('activities')
        .update(activityData)
        .eq('id', editingActivity.id)
      
      if (error) {
        alert('Error updating activity: ' + error.message)
      } else {
        alert('Activity updated successfully!')
        setShowModal(false)
        fetchActivities()
      }
    } else {
      const { error } = await supabase
        .from('activities')
        .insert([activityData])
      
      if (error) {
        alert('Error adding activity: ' + error.message)
      } else {
        alert('Activity added successfully!')
        setShowModal(false)
        fetchActivities()
      }
    }
  }

  const handleDelete = async (activity) => {
    if (!confirm(`Are you sure you want to delete "${activity.title}"?`)) return

    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', activity.id)
    
    if (error) {
      alert('Error deleting activity: ' + error.message)
    } else {
      alert('Activity deleted successfully!')
      fetchActivities()
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
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.75rem', margin: '0 0 .25rem' }}>Activities</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>Manage foundation activities and programmes</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }} onClick={openAddModal}>
          <Plus size={16} /> Add Activity
        </button>
      </div>

      {loading && <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading activities...</div>}

      {!loading && (
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div className="table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-off)' }}>
                  {['Title', 'Category', 'Date', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No activities found. Click "Add Activity" to create one.
                    </td>
                  </tr>
                ) : (
                  activities.map(act => (
                    <tr key={act.id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{act.title}</div>
                      </td>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <span className="tag" style={{ whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 160, display: 'inline-block', textOverflow: 'ellipsis' }}>
                          {act.category}
                        </span>
                      </td>
                      <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                        {new Date(act.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <span className={`badge ${act.status === 'Published' ? 'badge-primary' : 'badge-secondary'}`} style={{ fontSize: '.7rem' }}>
                          {act.status}
                        </span>
                      </td>
                      <td style={{ padding: '.85rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '.5rem' }}>
                          <button className="btn btn-sm btn-outline" style={{ padding: '.3rem .6rem' }} onClick={() => openEditModal(act)}>
                            <Edit2 size={13} />
                          </button>
                          <button className="btn btn-sm" style={{ padding: '.3rem .6rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }} onClick={() => handleDelete(act)}>
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
                {editingActivity ? 'Edit Activity' : 'Add New Activity'}
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
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Education & Learning"
                    style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    style={{ width: '100%', padding: '.65rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '.875rem', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 600, fontSize: '.875rem' }}>Cover Color</label>
                    <input
                      type="color"
                      name="cover_color"
                      value={formData.cover_color}
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
                  <Save size={16} /> {editingActivity ? 'Update Activity' : 'Add Activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
