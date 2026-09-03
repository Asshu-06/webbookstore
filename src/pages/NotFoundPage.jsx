import { Link } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '7rem', fontWeight: 700, color: 'rgba(26,60,94,.1)', lineHeight: 1, marginBottom: '1rem' }}>404</div>
        <BookOpen size={56} color="var(--primary)" style={{ opacity: .4, margin: '0 auto 1.5rem' }} />
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '.75rem' }}>Page Not Found</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1rem', maxWidth: 400, margin: '0 auto 2rem' }}>
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-lg"><Home size={18} /> Return Home</Link>
      </div>
    </div>
  );
}