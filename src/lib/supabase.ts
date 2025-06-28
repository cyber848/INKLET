import { createClient } from '@supabase/supabase-js';

// These will be automatically populated when you connect to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if environment variables are properly configured
const isConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url_here' && 
  supabaseAnonKey !== 'your_supabase_anon_key_here' &&
  supabaseUrl.startsWith('https://');

// Create a mock client for development when Supabase is not configured
const createMockClient = () => {
  console.warn('Supabase is not configured. Please click "Connect to Supabase" in the top right to set up your database connection.');
  
  return {
    auth: {
      signUp: () => Promise.reject(new Error('Supabase not configured')),
      signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
      signOut: () => Promise.reject(new Error('Supabase not configured')),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => Promise.reject(new Error('Supabase not configured')),
      insert: () => Promise.reject(new Error('Supabase not configured')),
      update: () => Promise.reject(new Error('Supabase not configured')),
      delete: () => Promise.reject(new Error('Supabase not configured'))
    })
  };
};

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient() as any;

// Admin email addresses
export const ADMIN_EMAILS = [
  'amr.abdulgawad123@gmail.com',
  'emailedbyproseidon@gmail.com'
];

export const isAdmin = (email: string) => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

// Export configuration status for components to check
export const isSupabaseConfigured = isConfigured;