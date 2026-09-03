import { useState } from 'react'
import { Eye } from 'lucide-react'

const MOCK_ENQUIRIES = [
  { id: '1', name: 'Ramesh Kulkarni', email: 'ramesh@example.com', type: 'Publication Enquiry', status: 'New', date: '2024-11-23', message: 'I would like to submit my manuscript for consideration. It is a collection of Marathi short stories.' },
  { id: '2', name: 'Sunita Joshi', email: 'sunita@example.com', type: 'Membership Enquiry', status: 'New', date: '2024-11-22', message: 'Could you please send me more details about the Life Membership benefits?' },
  { id: '3', name: 'Dr. Ashok Nair', email: 'ashok@example.com', type: 'General Enquiry', status: 'New', date: '2024-11-22', message: 'We would like to invite your Foundation to our Annual Literary Festival as a knowledge partner.' },
  { id: '4', name: 'Priya Sharma', email: 'priya@example.com', type: 'Internship Enquiry', status: 'Replied', date: '2024-11-20', message: 'I am a final year student and very interested in the publishing internship track.' },
  { id: '5', name: 'M. Venkatesh', email: 'mvk@example.com', type: 'Publication Enquiry', status: 'New', date: '2024-11-21', message: 'I have written a historical fiction novel set in Vijayanagara Empire. Who should I contact?' },
  { id: '6', name: 'Lata Desai', email: 'lata@example.com', type: 'General Enquiry', status: 'Replied', date: '2024-11-18', message: 'Is the Foundation open to co-publishing projects with independent researchers?' },
  { id: '7', name: 'Arjun Mehta', email: 'arjun@example.com', type: 'Membership Enquiry', status: 'New', date: '2024-11-23', message: 'I represent a library network and am interested in Institutional Membership.' },
  { id: '8', name: 'Kavitha Reddy', email: 'kavitha@example.com', type: 'Publication Enquiry', status: 'New', date: '2024-11-24', message: 'I am an author from Hyderabad with a Telugu poetry collection ready for review.' },
]

const TYPES = ['All', 'General Enquiry', 'Publication Enquiry', 'Membership Enquiry', 'Internship Enquiry']
const STATUSES = ['All', 'New', 'Replied']
const STATUS_COLORS= { New: '#c8963c', Replied: '#16a34a' }

export default function AdminEnquiriesPage() {
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = MOCK_ENQUIRIES.filter(e =>
    (typeFilter === 'All' || e.type === typeFilter) &&
    (statusFilter === 'All' || e.status === statusFilter)
  )

  const selectedEnquiry = MOCK_ENQUIRIES.find(e => e.id === selected)

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1.75rem', margin: '0 0 .25rem' }}>Enquiries</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>Contact form submissions and messages</p>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Type:</span>
          {TYPES.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              style={{ padding: '.25rem .6rem', borderRadius: 999, border: '1.5px solid', borderColor: typeFilter === t ? 'var(--primary)' : 'var(--border)', background: typeFilter === t ? 'var(--primary)' : '#fff', color: typeFilter === t ? '#fff' : 'var(--text)', fontSize: '.75rem', cursor: 'pointer' }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Status:</span>
          {STATUSES.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              style={{ padding: '.25rem .6rem', borderRadius: 999, border: '1.5px solid', borderColor: statusFilter === s ? 'var(--accent)' : 'var(--border)', background: statusFilter === s ? 'var(--accent)' : '#fff', color: statusFilter === s ? '#fff' : 'var(--text)', fontSize: '.75rem', cursor: 'pointer' }}>
              {s}
            </button>
          ))}
        </div>
        <span style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>{filtered.length} enquiries</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedEnquiry ? '1fr 380px' : '1fr', gap: '1.5rem' }}>
        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-off)' }}>
                  {['Name', 'Type', 'Message Preview', 'Date', 'Status', ''].map((h, i) => (
                    <th key={i} style={{ padding: '.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(enq => (
                  <tr key={enq.id} style={{ borderTop: '1px solid var(--border)', background: selected === enq.id ? 'rgba(26,60,94,.04)' : '' }}>
                    <td style={{ padding: '.85rem 1rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text)' }}>{enq.name}</div>
                      <div style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>{enq.email}</div>
                    </td>
                    <td style={{ padding: '.85rem 1rem' }}><span className="tag" style={{ whiteSpace: 'nowrap' }}>{enq.type}</span></td>
                    <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)', maxWidth: 200 }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{enq.message.substring(0, 60)}...</span>
                    </td>
                    <td style={{ padding: '.85rem 1rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{enq.date}</td>
                    <td style={{ padding: '.85rem 1rem' }}>
                      <span style={{ padding: '.25rem .6rem', borderRadius: 999, fontSize: '.72rem', fontWeight: 600, background: STATUS_COLORS[enq.status] + '18', color: STATUS_COLORS[enq.status] }}>
                        {enq.status}
                      </span>
                    </td>
                    <td style={{ padding: '.85rem 1rem' }}>
                      <button className="btn btn-sm btn-outline" style={{ padding: '.3rem .6rem', display: 'flex', alignItems: 'center', gap: '.3rem' }}
                        onClick={() => setSelected(selected === enq.id ? null : enq.id)}>
                        <Eye size={13} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selectedEnquiry && (
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '1.5rem', alignSelf: 'start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>Enquiry Detail</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
              <div><div style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '.2rem' }}>From</div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>{selectedEnquiry.name}</div>
                <div style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>{selectedEnquiry.email}</div>
              </div>
              <div><div style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '.2rem' }}>Type</div>
                <span className="tag">{selectedEnquiry.type}</span>
              </div>
              <div><div style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '.2rem' }}>Date</div>
                <div style={{ fontSize: '.875rem', color: 'var(--text)' }}>{selectedEnquiry.date}</div>
              </div>
              <div><div style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '.5rem' }}>Message</div>
                <div style={{ fontSize: '.875rem', color: 'var(--text)', lineHeight: 1.7, background: 'var(--bg-off)', borderRadius: 'var(--radius)', padding: '.85rem' }}>{selectedEnquiry.message}</div>
              </div>
              <button className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }} onClick={() => alert('Reply feature requires Supabase configuration.')}>
                Reply to Enquiry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}