import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ActivitiesPage from './pages/ActivitiesPage'
import ActivityDetailPage from './pages/ActivityDetailPage'
import GalleryPage from './pages/GalleryPage'
import MembershipPage from './pages/MembershipPage'
import InternshipPage from './pages/InternshipPage'
import CompliancesPage from './pages/CompliancesPage'
import ContactPage from './pages/ContactPage'
import PublicationPage from './pages/PublicationPage'
import BooksPage from './pages/BooksPage'
import NotFoundPage from './pages/NotFoundPage'

import AuthorLoginPage from './pages/author/AuthorLoginPage'
import AuthorDashboardPage from './pages/author/AuthorDashboardPage'

import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminBooksPage from './pages/admin/AdminBooksPage'
import AdminAuthorsPage from './pages/admin/AdminAuthorsPage'
import AdminActivitiesPage from './pages/admin/AdminActivitiesPage'
import AdminMembershipPage from './pages/admin/AdminMembershipPage'
import AdminInternshipPage from './pages/admin/AdminInternshipPage'
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/:section" element={<AboutPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:slug" element={<ActivityDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/internship" element={<InternshipPage />} />
            <Route path="/compliances" element={<CompliancesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/publication" element={<PublicationPage />} />
            <Route path="/publication/books" element={<BooksPage />} />
            <Route path="/publication/process" element={<PublicationPage />} />
            <Route path="/publication/author-guidelines" element={<PublicationPage />} />
            <Route path="/publication/faqs" element={<PublicationPage />} />
            <Route path="/publication/login" element={<AuthorLoginPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/author/login" element={<AuthorLoginPage />} />
          <Route
            path="/author/dashboard"
            element={
              <ProtectedRoute allowedRoles={['AUTHOR', 'ADMIN']} redirectTo="/author/login">
                <AuthorDashboardPage />
              </ProtectedRoute>
            }
          />

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']} redirectTo="/admin/login">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="books" element={<AdminBooksPage />} />
            <Route path="authors" element={<AdminAuthorsPage />} />
            <Route path="activities" element={<AdminActivitiesPage />} />
            <Route path="membership" element={<AdminMembershipPage />} />
            <Route path="internship" element={<AdminInternshipPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
