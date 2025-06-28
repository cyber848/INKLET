import { createClient } from '@supabase/supabase-js';

// These will be automatically populated when you connect to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin email addresses
export const ADMIN_EMAILS = [
  'amr.abdulgawad123@gmail.com',
  'emailedbyproseidon@gmail.com'
];

export const isAdmin = (email: string) => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};