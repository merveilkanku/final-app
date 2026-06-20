import { createClient } from '@supabase/supabase-js';
import { fetchWithRetry } from '../utils/fetch';

const supabaseUrl = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment.");
}

export const supabase = createClient(supabaseUrl || "", supabaseKey || "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'implicit'
  },
  global: {
    fetch: (input, init) => fetchWithRetry(input, init)
  }
});
