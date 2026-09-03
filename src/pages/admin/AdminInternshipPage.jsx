import { CheckCircle, XCircle } from 'lucide-react'

const MOCK_APPLICATIONS = [
  { id: '1', name: 'Aditya Kumar', email: 'aditya@example.com', institution: 'University of Pune', area: 'Publishing & Editorial', status: 'Pending', date: '2024-11-21' },
  { id: '2', name: 'Sneha Patil', email: 'sneha@example.com', institution: 'TISS Mumbai', area: 'Education & Research', status: 'Pending', date: '2024-11-19' },
  { id: '3', name: 'Vikram Singh', email: 'vikram@example.com', institution: 'JNU Delhi', area: 'Content Development', status: 'Approved', date: '2024-11-05' },
  { id: '4', name: 'Meghana Rao', email: 'meghana@example.com', institution: 'Mysore University', area: 'Community Outreach', status: 'Pending', date: '2024-11-22' },
  { id: '5', name: 'Rahul Desai', email: 'rahul@example.com', institution: 'Symbiosis Pune', area: 'Digital Media', status: 'Pending', date: '2024-11-23' },
]

const STATUS_COLORS= { Pending: '#c8963c', Approved: '#16a34a', Rejected: '#b91c1c' }

export default function AdminInternshipPage() {
  const handleAction = (action, name) => {
    alert(`${action} internship application for "${name}"\n\nThis feature requires Supabase configuration.`)
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.75rem', margin: '0 0 .25rem' }}>Internship Applications</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>Review and manage internship applications</p>
      </div>

      <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div className="table-wrap">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-off)' }}>
                {['Applicant', 'Institution', 'Area', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_APPLICATIONS.map(app => (
                <tr key={app.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '.85rem 1rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text)' }}>{app.name}</div>
                    <div style={{ fontSize: '.78rem', color: 'var(--text-muted)' }}>{app.email}</div>
                  </td>
                  <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)' }}>{app.institution}</td>
                  <td style={{ padding: '.85rem 1rem' }}><span className="tag">{app.area}</span></td>
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