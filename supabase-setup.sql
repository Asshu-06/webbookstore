-- ============================================================================
-- GYAN AKSHAR SANSKRITI FOUNDATION - SUPABASE DATABASE SETUP
-- ============================================================================
-- This file contains all necessary tables, RLS policies, and initial data
-- Run this in your Supabase SQL Editor to set up the complete database
-- ============================================================================

-- Clean up existing tables (if any)
DROP TABLE IF EXISTS enquiries CASCADE;
DROP TABLE IF EXISTS internship_applications CASCADE;
DROP TABLE IF EXISTS membership_applications CASCADE;
DROP TABLE IF EXISTS gallery_items CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS compliance_docs CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;

-- ============================================================================
-- 1. USER ROLES TABLE
-- ============================================================================
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ADMIN', 'AUTHOR')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. AUTHORS TABLE
-- ============================================================================
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  bio TEXT,
  phone TEXT,
  address TEXT,
  published_books INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 3. BOOKS TABLE
-- ============================================================================
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  isbn TEXT UNIQUE NOT NULL,
  year INTEGER NOT NULL,
  genre TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'Published' CHECK (status IN ('Published', 'Draft', 'Out of Print')),
  cover_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. ACTIVITIES TABLE
-- ============================================================================
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  cover_color TEXT DEFAULT '#1a3c5e',
  image_url TEXT,
  status TEXT DEFAULT 'Published' CHECK (status IN ('Published', 'Draft', 'Archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. EVENTS TABLE
-- ============================================================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('event', 'news')),
  description TEXT NOT NULL,
  status TEXT DEFAULT 'Published' CHECK (status IN ('Published', 'Draft', 'Archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 6. GALLERY ITEMS TABLE
-- ============================================================================
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('Photo', 'Video')),
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  category TEXT NOT NULL,
  color TEXT DEFAULT '#1a3c5e',
  image_url TEXT,
  video_url TEXT,
  status TEXT DEFAULT 'Published' CHECK (status IN ('Published', 'Draft', 'Archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 7. COMPLIANCE DOCUMENTS TABLE
-- ============================================================================
CREATE TABLE compliance_docs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Registration', 'Annual Report', 'Financial Statement', 'Policy')),
  year INTEGER NOT NULL,
  size TEXT NOT NULL,
  file_url TEXT,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 8. FAQs TABLE
-- ============================================================================
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  order_index INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Published' CHECK (status IN ('Published', 'Draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 9. MEMBERSHIP APPLICATIONS TABLE
-- ============================================================================
CREATE TABLE membership_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  membership_type TEXT NOT NULL,
  organization TEXT,
  student_id TEXT,
  message TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  notes TEXT
);

-- ============================================================================
-- 10. INTERNSHIP APPLICATIONS TABLE
-- ============================================================================
CREATE TABLE internship_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  course TEXT NOT NULL,
  year TEXT NOT NULL,
  area TEXT NOT NULL,
  duration TEXT NOT NULL,
  cover_letter TEXT NOT NULL,
  resume_url TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Under Review', 'Accepted', 'Rejected')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  notes TEXT
);

-- ============================================================================
-- 11. ENQUIRIES TABLE (Contact Form Submissions)
-- ============================================================================
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'In Progress', 'Resolved', 'Closed')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  notes TEXT
);

-- ============================================================================
-- INDEXES FOR BETTER PERFORMANCE
-- ============================================================================
CREATE INDEX idx_books_slug ON books(slug);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_status ON books(status);
CREATE INDEX idx_activities_slug ON activities(slug);
CREATE INDEX idx_activities_category ON activities(category);
CREATE INDEX idx_activities_date ON activities(date DESC);
CREATE INDEX idx_events_date ON events(date DESC);
CREATE INDEX idx_events_type ON events(type);
CREATE INDEX idx_gallery_category ON gallery_items(category);
CREATE INDEX idx_gallery_year ON gallery_items(year DESC);
CREATE INDEX idx_membership_status ON membership_applications(status);
CREATE INDEX idx_internship_status ON internship_applications(status);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view published books" ON books FOR SELECT USING (status = 'Published');
CREATE POLICY "Public can view published activities" ON activities FOR SELECT USING (status = 'Published');
CREATE POLICY "Public can view published events" ON events FOR SELECT USING (status = 'Published');
CREATE POLICY "Public can view published gallery items" ON gallery_items FOR SELECT USING (status = 'Published');
CREATE POLICY "Public can view active compliance docs" ON compliance_docs FOR SELECT USING (status = 'Active');
CREATE POLICY "Public can view published FAQs" ON faqs FOR SELECT USING (status = 'Published');

-- Public can submit applications and enquiries
CREATE POLICY "Anyone can submit membership applications" ON membership_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit internship applications" ON internship_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit enquiries" ON enquiries FOR INSERT WITH CHECK (true);

-- Admin full access to all tables
CREATE POLICY "Admins have full access to user_roles" ON user_roles FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'ADMIN')
);

CREATE POLICY "Admins have full access to authors" ON authors FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'ADMIN')
);

CREATE POLICY "Admins have full access to books" ON books FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'ADMIN')
);

CREATE POLICY "Admins have full access to activities" ON activities FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'ADMIN')
);

CREATE POLICY "Admins have full access to events" ON events FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'ADMIN')
);

CREATE POLICY "Admins have full access to gallery" ON gallery_items FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'ADMIN')
);

CREATE POLICY "Admins have full access to compliance" ON compliance_docs FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'ADMIN')
);

CREATE POLICY "Admins have full access to FAQs" ON faqs FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'ADMIN')
);

CREATE POLICY "Admins have full access to membership apps" ON membership_applications FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'ADMIN')
);

CREATE POLICY "Admins have full access to internship apps" ON internship_applications FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'ADMIN')
);

CREATE POLICY "Admins have full access to enquiries" ON enquiries FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'ADMIN')
);

-- ============================================================================
-- INITIAL DEMO DATA
-- ============================================================================

-- Insert sample activities
INSERT INTO activities (slug, title, category, category_slug, date, description, cover_color) VALUES
('annual-literacy-drive-2024', 'Annual Literacy Drive 2024', 'Education & Learning', 'education-learning', '2024-03-15', 'A month-long literacy drive across 12 villages in rural Maharashtra, reaching over 2,000 individuals through interactive workshops.', '#1a3c5e'),
('research-symposium-2024', 'Research Symposium on Indian Literature', 'Research & Innovation', 'research-innovation', '2024-05-20', 'A two-day national symposium with 85 scholars presenting papers on classical and contemporary Indian literature.', '#2a5080'),
('book-fair-2024', 'Regional Book Fair 2024', 'Books & Literature', 'books-literature', '2024-07-10', 'Regional book fair with 150+ authors, 40 publishers, and over 15,000 visitors over three days.', '#c8963c'),
('community-heritage-project', 'Community Heritage Documentation', 'Social & Community Outreach', 'social-community-outreach', '2024-08-05', 'Documenting oral histories, folk songs, and traditional art forms from 5 districts with 300+ hours archived.', '#4a7c5c'),
('editorial-skills-workshop', 'Professional Editorial Skills Workshop', 'Training & Professional Development', 'training-professional-development', '2024-09-12', 'Five-day intensive training for aspiring editors covering manuscript evaluation and digital publishing workflows.', '#5a4080'),
('school-reading-programme', 'School Reading Programme Initiative', 'Education & Learning', 'education-learning', '2024-10-01', 'Reading corners in 25 government schools with 10,000+ books donated and 60 teachers trained.', '#1a5c6e');

-- Insert sample books
INSERT INTO books (slug, title, author, isbn, year, genre, description, price) VALUES
('rivers-of-memory', 'Rivers of Memory', 'Dr. Priya Sharma', '978-93-5491-201-3', 2024, 'Literary Fiction', 'A lyrical exploration of generational memory through three women across different eras of Indian history.', 495.00),
('the-quiet-scholars', 'The Quiet Scholars', 'Rajesh Nambiar', '978-93-5491-202-0', 2024, 'Biography', 'Compelling biographies of ten unsung Indian scholars who transformed regional literature.', 550.00),
('monsoon-verses', 'Monsoon Verses', 'Ananya Krishnan', '978-93-5491-203-7', 2023, 'Poetry', 'A collection of 78 poems celebrating rainfall, rivers, and the rhythms of agrarian life in southern India.', 350.00),
('education-reimagined', 'Education Reimagined', 'Prof. Suresh Iyer', '978-93-5491-204-4', 2023, 'Non-Fiction', 'Analysis of alternative education models drawing from traditional gurukul systems and modern pedagogy.', 620.00),
('salt-and-silk', 'Salt and Silk', 'Meera Pillai', '978-93-5491-205-1', 2024, 'Historical Fiction', 'A merchant family across three centuries of commerce along the ancient spice trade routes.', 580.00),
('folk-tales-deccan', 'Folk Tales of the Deccan', 'Dr. Kavita Rao', '978-93-5491-206-8', 2023, 'Folklore', '45 folk tales from the Deccan plateau with original illustrations and cultural annotations.', 445.00);

-- Insert sample events
INSERT INTO events (title, date, type, description) VALUES
('Annual Foundation Day Celebration', '2024-11-15', 'event', 'The 12th Annual Foundation Day with award ceremonies, cultural programmes, and launch of three new publications.'),
('International Symposium on Regional Literature', '2024-12-08', 'event', 'Two-day international symposium with speakers from 8 countries on preservation of regional literary traditions.'),
('Author Meetup: Writing About Tradition', '2024-10-22', 'news', 'Monthly meetup with three acclaimed authors discussing the craft of writing about cultural traditions.'),
('Call for Manuscripts 2025', '2024-11-01', 'news', 'Annual call for manuscripts for the 2025 publication cycle. Submissions open in all Indian languages.');

-- Insert sample gallery items
INSERT INTO gallery_items (type, title, year, category, color) VALUES
('Photo', 'Annual Literacy Drive — Village Workshop', 2024, 'Events', '#1a3c5e'),
('Photo', 'Book Fair 2024 — Opening Ceremony', 2024, 'Book Launches', '#c8963c'),
('Photo', 'Research Symposium — Panel Discussion', 2024, 'Events', '#2a5080'),
('Photo', 'Heritage Documentation — Field Recording', 2024, 'Events', '#4a7c5c'),
('Photo', 'Editorial Workshop — Participants', 2023, 'Events', '#5a4080'),
('Photo', 'Foundation Day — Award Ceremony', 2023, 'Events', '#1a5c6e'),
('Photo', 'Rivers of Memory — Book Launch', 2024, 'Book Launches', '#7c3040'),
('Photo', 'Monsoon Verses — Poetry Reading', 2023, 'Book Launches', '#3c6040'),
('Photo', 'National Newspaper Coverage', 2024, 'Media Coverage', '#4c4c4c');

-- Insert sample compliance documents
INSERT INTO compliance_docs (title, type, year, size) VALUES
('Certificate of Registration', 'Registration', 2012, '1.2 MB'),
('80G Tax Exemption Certificate', 'Registration', 2013, '0.8 MB'),
('12A Registration Certificate', 'Registration', 2013, '0.9 MB'),
('Annual Report 2023-24', 'Annual Report', 2024, '4.5 MB'),
('Annual Report 2022-23', 'Annual Report', 2023, '4.1 MB'),
('Annual Report 2021-22', 'Annual Report', 2022, '3.8 MB'),
('Audited Financial Statement 2023-24', 'Financial Statement', 2024, '2.1 MB'),
('Audited Financial Statement 2022-23', 'Financial Statement', 2023, '1.9 MB'),
('Privacy Policy', 'Policy', 2024, '0.4 MB'),
('Publication Policy', 'Policy', 2024, '0.6 MB');

-- Insert sample FAQs
INSERT INTO faqs (question, answer, category, order_index) VALUES
('How long does the publication process take?', 'Typically 4-8 months from manuscript submission to publication, including editorial review, design, and printing.', 'Publication', 1),
('Do you publish in regional Indian languages?', 'Yes. We actively encourage manuscripts in Hindi, Marathi, Kannada, Tamil, Telugu, Bengali, and other Indian languages.', 'Publication', 2),
('What genres do you publish?', 'Literary fiction, non-fiction, poetry, biography, folklore, academic works, and books on cultural heritage.', 'Publication', 3),
('Is there a submission fee?', 'No. We do not charge any submission fees. All manuscript reviews are conducted free of charge.', 'Publication', 4),
('How are royalties structured?', 'Authors receive 10-15% royalties on net sales. Details are specified in the individual publication agreement.', 'Publication', 5),
('Can I submit a previously published work?', 'No. We only accept original, unpublished manuscripts not currently under consideration elsewhere.', 'Publication', 6);

-- ============================================================================
-- AUTOMATIC UPDATED_AT TRIGGER
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_compliance_updated_at BEFORE UPDATE ON compliance_docs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_roles_updated_at BEFORE UPDATE ON user_roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VERIFICATION QUERIES (Run these to verify setup)
-- ============================================================================
-- SELECT COUNT(*) FROM activities;  -- Should return 6
-- SELECT COUNT(*) FROM books;       -- Should return 6
-- SELECT COUNT(*) FROM events;      -- Should return 4
-- SELECT COUNT(*) FROM gallery_items; -- Should return 9
-- SELECT COUNT(*) FROM compliance_docs; -- Should return 10
-- SELECT COUNT(*) FROM faqs;        -- Should return 6

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================
-- Next steps:
-- 1. Run this entire SQL file in your Supabase SQL Editor
-- 2. Verify the tables were created by checking the Table Editor
-- 3. Add your Supabase credentials to the .env file
-- 4. Restart your development server
-- 5. Navigate to /admin to manage content
-- ============================================================================
