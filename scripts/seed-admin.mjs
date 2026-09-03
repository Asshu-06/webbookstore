/**
 * Admin Seed Script
 * Run: node scripts/seed-admin.mjs
 *
 * Requires .env with:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   ADMIN_EMAIL
 *   ADMIN_PASSWORD
 *   ADMIN_NAME
 *
 * Safe to run multiple times — checks for existing user.
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Load .env manually (no dotenv dependency needed)
function loadEnv() {
  try {
    const lines = readFileSync('.env', 'utf8').split('
');
    const env = {};
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      env[key.trim()] = rest.join('=').trim().replace(/^["']|["']$/g, '');
    }
    return env;
  } catch {
    return {};
  }
}

const env = { ...process.env, ...loadEnv() };

const supabaseUrl = env.SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = env.ADMIN_EMAIL || 'admin@gasfe.local';
const adminPassword = env.ADMIN_PASSWORD || 'GASFE_Admin_2026!';
const adminName = env.ADMIN_NAME || 'Super Administrator';

if (!supabaseUrl || !serviceRoleKey || serviceRoleKey.includes('your-')) {
  console.error('ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env');
  console.error('This script requires real Supabase credentials — not demo mode.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  console.log('Checking for existing admin user:', adminEmail);

  // Check if user exists
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) { console.error('Failed to list users:', listError.message); process.exit(1); }

  const existing = users.users.find(u => u.email === adminEmail);

  if (existing) {
    console.log('Admin user already exists:', existing.id);
    // Ensure role metadata is set
    await supabase.auth.admin.updateUserById(existing.id, {
      user_metadata: { role: 'ADMIN', full_name: adminName, is_admin: true },
    });
    console.log('Role metadata confirmed: SUPER_ADMIN');
    return;
  }

  // Create new admin user
  const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
    user_metadata: { role: 'ADMIN', full_name: adminName, is_admin: true },
  });

  if (createError) { console.error('Failed to create admin:', createError.message); process.exit(1); }

  console.log('Admin user created successfully');
  console.log('  ID:    ', newUser.user.id);
  console.log('  Email: ', adminEmail);
  console.log('  Role:  SUPER_ADMIN');
  console.log('');
  console.log('IMPORTANT: Change the password in production.');
}

main().catch(e => { console.error(e); process.exit(1); });
