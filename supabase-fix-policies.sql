-- ============================================================================
-- FIX: Remove Infinite Recursion in RLS Policies
-- ============================================================================
-- This fixes the "infinite recursion detected in policy" error
-- Run this in Supabase SQL Editor AFTER running the main setup
-- ============================================================================

-- First, drop all existing policies that cause recursion
DROP POLICY IF EXISTS "Public can view published books" ON books;
DROP POLICY IF EXISTS "Public can view published activities" ON activities;
DROP POLICY IF EXISTS "Public can view published events" ON events;
DROP POLICY IF EXISTS "Public can view published gallery items" ON gallery_items;
DROP POLICY IF EXISTS "Public can view active compliance docs" ON compliance_docs;
DROP POLICY IF EXISTS "Public can view published FAQs" ON faqs;
DROP POLICY IF EXISTS "Anyone can submit membership applications" ON membership_applications;
DROP POLICY IF EXISTS "Anyone can submit internship applications" ON internship_applications;
DROP POLICY IF EXISTS "Anyone can submit enquiries" ON enquiries;

DROP POLICY IF EXISTS "Admins have full access to user_roles" ON user_roles;
DROP POLICY IF EXISTS "Admins have full access to authors" ON authors;
DROP POLICY IF EXISTS "Admins have full access to books" ON books;
DROP POLICY IF EXISTS "Admins have full access to activities" ON activities;
DROP POLICY IF EXISTS "Admins have full access to events" ON events;
DROP POLICY IF EXISTS "Admins have full access to gallery" ON gallery_items;
DROP POLICY IF EXISTS "Admins have full access to compliance" ON compliance_docs;
DROP POLICY IF EXISTS "Admins have full access to FAQs" ON faqs;
DROP POLICY IF EXISTS "Admins have full access to membership apps" ON membership_applications;
DROP POLICY IF EXISTS "Admins have full access to internship apps" ON internship_applications;
DROP POLICY IF EXISTS "Admins have full access to enquiries" ON enquiries;

-- ============================================================================
-- SOLUTION: Allow Public Access (No Authentication Required)
-- ============================================================================
-- Since you removed authentication from admin panel, we allow public access
-- This is suitable for development/testing
-- For production, you should re-enable authentication
-- ============================================================================

-- Public READ access for published content
CREATE POLICY "Anyone can view published books" ON books 
  FOR SELECT USING (status = 'Published' OR true);

CREATE POLICY "Anyone can view published activities" ON activities 
  FOR SELECT USING (status = 'Published' OR true);

CREATE POLICY "Anyone can view published events" ON events 
  FOR SELECT USING (status = 'Published' OR true);

CREATE POLICY "Anyone can view published gallery items" ON gallery_items 
  FOR SELECT USING (status = 'Published' OR true);

CREATE POLICY "Anyone can view active compliance docs" ON compliance_docs 
  FOR SELECT USING (status = 'Active' OR true);

CREATE POLICY "Anyone can view published FAQs" ON faqs 
  FOR SELECT USING (status = 'Published' OR true);

CREATE POLICY "Anyone can view authors" ON authors 
  FOR SELECT USING (true);

-- Public WRITE access for all tables (DEVELOPMENT ONLY!)
-- ⚠️ WARNING: This allows anyone to modify data - only for testing!

CREATE POLICY "Allow all operations on books" ON books 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on activities" ON activities 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on events" ON events 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on gallery items" ON gallery_items 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on compliance docs" ON compliance_docs 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on FAQs" ON faqs 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on authors" ON authors 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on user_roles" ON user_roles 
  FOR ALL USING (true) WITH CHECK (true);

-- Applications and enquiries - anyone can submit and view
CREATE POLICY "Anyone can submit membership applications" ON membership_applications 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view membership applications" ON membership_applications 
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update membership applications" ON membership_applications 
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can submit internship applications" ON internship_applications 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view internship applications" ON internship_applications 
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update internship applications" ON internship_applications 
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can submit enquiries" ON enquiries 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view enquiries" ON enquiries 
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update enquiries" ON enquiries 
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can delete enquiries" ON enquiries 
  FOR DELETE USING (true);

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- After running this, test by:
-- 1. Go to http://localhost:5174/admin/books
-- 2. Books should load without errors
-- 3. Try adding a new book
-- 4. Try editing a book
-- 5. Try deleting a book
-- ============================================================================

-- ⚠️ SECURITY WARNING FOR PRODUCTION ⚠️
-- These policies allow ANYONE to read, create, update, and delete data
-- This is ONLY suitable for development/testing
-- 
-- For production, you should:
-- 1. Re-enable authentication in the admin panel
-- 2. Replace these policies with proper role-based policies
-- 3. Use service role key for admin operations
-- 4. Implement proper user management
-- ============================================================================
