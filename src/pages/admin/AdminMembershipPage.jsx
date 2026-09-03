import { CheckCircle, XCircle } from 'lucide-react'

const MOCK_APPLICATIONS = [
  { id: '1', name: 'Rohit Sharma', email: 'rohit@example.com', category: 'Life Member', status: 'Pending', date: '2024-11-20' },
  { id: '2', name: 'Priya Nair', email: 'priya@example.com', category: 'Annual Member', status: 'Pending', date: '2024-11-18' },
  { id: '3', name: 'Ananya College of Arts', email: 'admin@ananya.edu', category: 'Institutional Member', status: 'Approved', date: '2024-11-10' },
  { id: '4', name: 'Karan Mehta', email: 'karan@example.com', category: 'Student Member', status: 'Pending', date: '2024-11-22' },
  { id: '5', name: 'Deepa Krishnan', email: 'deepa@example.com', category: 'Life Member', status: 'Rejected', date: '2024-10-30' },
]

const STATUS_COLORS= {
  Pending: '#c8963c',
  Approved: '#16a34a',
  Rejected: '#b91c1c',
}

export default function AdminMembershipPage() {
  const handleAction = (action, name) => {
    alert(`${action} application for "${name}"\n\nThis feature requires Supabase configuration.`)
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.75rem', margin: '0 0 .25rem' }}>Membership Applications</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>Review and manage membership applications</p>
      </div>

      {/* Summary */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['Pending', 'Approved', 'Rejected'].map(status => (
          <div key={status} style={{ background: '#fff', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '.75rem 1.25rem', display: 'flex', gap: '.75rem', alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: STATUS_COLORS[status] }} />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>
                {MOCK_APPLICATIONS.filter(a => a.status === status).length}
              </div>
              <div style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>{status}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-off)' }}>
                {['Name', 'Email', 'Category', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_APPLICATIONS.map(app => (
                <tr key={app.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '.85rem 1rem', fontWeight: 600, color: 'var(--text)' }}>{app.name}</td>
                  <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)' }}>{app.email}</td>
                  <td style={{ padding: '.85rem 1rem' }}><span className="tag">{app.category}</span></td>
                  <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{app.date}</td>
                  <td style={{ padding: '.85rem 1rem' }}>
                    <span style={{ padding: '.25rem .6rem', borderRadius: 999, fontSize: '.72rem', fontWeight: 600, background: STATUS_COLORS[app.status] + '18', color: STATUS_COLORS[app.status] }}>
                      {app.status}
                    </span>
                  </td>
                  <td style={{ padding: '.85rem 1rem' }}>
                    {app.status === 'Pending' && (
                      <div style={{ display: 'flex', gap: '.4rem' }}>
                        <button className="btn btn-sm" style={{ padding: '.3rem .6rem', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', display: 'flex', alignItems: 'center', gap: '.3rem' }}
                          onClick={() => handleAction('Approve', app.name)}>
                          <CheckCircle size={12} /> Approve
                        </button>
                        <button className="btn btn-sm" style={{ padding: '.3rem .6rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '.3rem' }}
                          onClick={() => handleAction('Reject', app.name)}>
                          <XCircle size={12} /> Reject
                        </button>
                      </div>
                    )}
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