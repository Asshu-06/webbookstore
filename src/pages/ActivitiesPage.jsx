import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, BookOpen, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

const CATEGORIES = ['All', 'Education & Learning', 'Research & Innovation', 'Books & Literature', 'Social & Community Outreach', 'Training & Professional Development'];

export default function ActivitiesPage() {
  const [active, setActive] = useState('All');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('status', 'Published')
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching activities:', error);
    } else {
      setActivities(data || []);
    }
    setLoading(false);
  };

  const filtered = active === 'All' ? activities : activities.filter(a => a.category === active);

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-content">
          <h1>Our Activities</h1>
          <p>Programmes, initiatives, and events advancing education, literature, and community development</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Category filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap', marginBottom: '2.5rem', padding: '1.25rem', background: 'var(--bg-off)', borderRadius: 'var(--radius-lg)' }}>
            <Filter size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '.25rem' }}>Filter:</span>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                style={{ padding: '.4rem 1rem', borderRadius: '999px', border: '1.5px solid', borderColor: active === cat ? 'var(--primary)' : 'var(--border)', background: active === cat ? 'var(--primary)' : '#fff', color: active === cat ? '#fff' : 'var(--text)', fontSize: '.82rem', fontWeight: 500, cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap' }}>
                {cat}
              </button>
            ))}
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '.875rem', marginBottom: '1.5rem' }}>
            {loading ? 'Loading activities...' : `${filtered.length} ${filtered.length === 1 ? 'activity' : 'activities'} found`}
          </p>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading activities...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No activities found.</div>
          ) : (
            <div className="activities-grid">
            {filtered.map(a => (
              <div key={a.id} className="card">
                <div style={{ height: 180, background: a.coverColor, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <BookOpen size={40} color="rgba(255,255,255,.3)" />
                  <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,.18)', color: '#fff', backdropFilter: 'blur(4px)', padding: '.25rem .7rem', borderRadius: '999px', fontSize: '.72rem', fontWeight: 600, letterSpacing: '.04em' }}>{a.category}</span>
                </div>
                <div className="card-body">
                  <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '.78rem', marginBottom: '.6rem' }}>
                    <Calendar size={12} />
                    {new Date(a.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary)', marginBottom: '.6rem', lineHeight: 1.3 }}>{a.title}</h3>
                  <p style={{ fontSize: '.875rem', color: 'var(--text-light)', lineHeight: 1.6, marginBottom: '1rem' }}>{a.description.substring(0, 110)}...</p>
                  <Link to={"/activities/" + a.slug} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', color: 'var(--primary)', fontWeight: 600, fontSize: '.85rem' }}>
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>
    </div>
  );
}