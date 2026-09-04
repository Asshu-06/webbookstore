# 🔧 Add Environment Variables to Vercel

## ⚡ Quick Steps:

### 1. Go to Vercel Dashboard
Open: https://vercel.com/dashboard

### 2. Select Your Project
Click on: **webbookstore**

### 3. Go to Settings
Click on the **Settings** tab at the top

### 4. Find Environment Variables
Click on **Environment Variables** in the left sidebar

### 5. Add Variables

Click **Add New** button and add each variable:

#### Variable 1:
```
Name: VITE_SUPABASE_URL
Value: [Paste your Supabase URL from .env file]
Environment: Production, Preview, Development (check all)
```

#### Variable 2:
```
Name: VITE_SUPABASE_ANON_KEY
Value: [Paste your Supabase Anon Key from .env file]
Environment: Production, Preview, Development (check all)
```

### 6. Save
Click **Save** after adding each variable

### 7. Redeploy
Go to **Deployments** tab → Click latest deployment → Click **Redeploy**

---

## 📝 Where to Get Values?

Open your local `.env` file:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Copy the values after `=` for each variable.

---

## ✅ Verify It Works

After redeployment (takes ~2 minutes):

1. Visit: https://webbookstore.vercel.app/books
2. ✅ Should load books from Supabase
3. Visit: https://webbookstore.vercel.app/admin/books
4. ✅ Admin panel should work

---

## 🎯 That's It!

Your Vercel deployment will now:
- ✅ Load all pages without 404
- ✅ Connect to Supabase
- ✅ Show real data
- ✅ Admin panel fully functional

**The changes have been pushed to GitHub. Vercel will auto-deploy in ~2 minutes!**
