import { Plus, Edit2 } from 'lucide-react'
import { ACTIVITIES } from '../../data'

export default function AdminActivitiesPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.75rem', margin: '0 0 .25rem' }}>Activities</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>Manage foundation activities and programmes</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }} onClick={() => alert('Add Activity requires Supabase configuration.')}>
          <Plus size={16} /> Add Activity
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-off)' }}>
                {['Title', 'Category', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ACTIVITIES.map(act => (
                <tr key={act.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '.85rem 1rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{act.title}</div>
                  </td>
                  <td style={{ padding: '.85rem 1rem' }}><span className="tag" style={{ whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 160, display: 'inline-block', textOverflow: 'ellipsis' }}>{act.category}</span></td>
                  <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {new Date(act.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td style={{ padding: '.85rem 1rem' }}><span className="badge badge-primary" style={{ fontSize: '.7rem' }}>Published</span></td>
                  <td style={{ padding: '.85rem 1rem' }}>
                    <button className="btn btn-sm btn-outline" style={{ padding: '.3rem .6rem', display: 'flex', alignItems: 'center', gap: '.3rem' }} onClick={() => alert('Edit Activity requires Supabase configuration.')}>
                      <Edit2 size={13} /> Edit
                    </button>
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