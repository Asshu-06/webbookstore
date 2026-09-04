# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project Name**: gyan-akshar-foundation (or any name you prefer)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your location (e.g., Southeast Asia)
5. Wait for the project to be created (takes 1-2 minutes)

## Step 2: Get Your Credentials

1. In your Supabase project dashboard, click on the **Settings** icon (gear) in the sidebar
2. Click on **API** in the settings menu
3. You'll see:
   - **Project URL** (something like `https://xxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

## Step 3: Update Your .env File

Open your `.env` file and add:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from Step 2.

## Step 4: Run the Database Setup

1. In your Supabase project, click on **SQL Editor** in the sidebar
2. Click **New Query**
3. Open the `supabase-setup.sql` file from your project folder
4. **Copy ALL the SQL code** from that file
5. **Paste it into the SQL Editor** in Supabase
6. Click **Run** (or press Ctrl+Enter)
7. Wait for it to complete (should take 5-10 seconds)

## Step 5: Verify the Setup

1. Click on **Table Editor** in the Supabase sidebar
2. You should see these tables:
   - ✅ activities
   - ✅ authors
   - ✅ books
   - ✅ compliance_docs
   - ✅ enquiries
   - ✅ events
   - ✅ faqs
   - ✅ gallery_items
   - ✅ internship_applications
   - ✅ membership_applications
   - ✅ user_roles

3. Click on any table (e.g., `books`) and you should see sample data already populated!

## Step 6: Restart Your Development Server

Back in your terminal or VS Code:

1. Stop the current dev server (if running) - press Ctrl+C
2. Run: `npm run dev`
3. Open your browser to `http://localhost:5173`

## Step 7: Test the Admin Panel

1. Navigate to `http://localhost:5173/admin`
2. You should now be able to:
   - View all the books, activities, etc. from the database
   - Add new items
   - Edit existing items
   - Delete items
3. Changes you make in the admin panel will be saved to Supabase
4. The user website will automatically show the updated data!

## What's Included?

✅ **11 Database Tables** with proper relationships
✅ **Row Level Security (RLS)** policies for data protection
✅ **Sample Data** (6 books, 6 activities, 4 events, 9 gallery items, etc.)
✅ **Automatic Timestamps** (created_at, updated_at)
✅ **Public Read Access** for published content
✅ **Admin Full Access** for managing all data
✅ **Form Submission Tables** (enquiries, membership, internship applications)

## Troubleshooting

### Issue: "relation does not exist"
- Make sure you ran the ENTIRE SQL file in Supabase SQL Editor
- Check that all tables were created in the Table Editor

### Issue: "Invalid API key"
- Double-check your `.env` file has the correct credentials
- Make sure there are no extra spaces in the keys
- Restart your dev server after updating .env

### Issue: "Permission denied"
- RLS policies might be blocking access
- Check that you're using the correct `anon` key (not service role key)

### Issue: Data not showing on website
- Check that the status is set to 'Published' in the database
- Clear your browser cache and refresh
- Check browser console for any errors

## Security Notes

🔒 **Never commit your .env file to git** - it contains sensitive credentials
🔒 The `.env.example` file is safe to commit (no real credentials)
🔒 RLS policies ensure users can only see published content
🔒 Admin operations require proper authentication (when you enable it)

## Next Steps

After setup is complete, you can:
1. Replace sample images with real images (upload to Supabase Storage)
2. Customize the sample data to match your organization
3. Enable authentication for admin access (currently disabled for easy testing)
4. Set up file storage for document uploads

---

**Need Help?**
- Supabase Documentation: https://supabase.com/docs
- Check the browser console for error messages
- Verify your .env file has the correct values
