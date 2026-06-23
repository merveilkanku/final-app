import { createClient } from '@supabase/supabase-js';
import { fetchWithRetry } from '../utils/fetch';

const supabaseUrl = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment.");
}

const options = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'implicit' as const,
  },
  global: {
    fetch: (input: RequestInfo | URL, init?: RequestInit) => {
      // Defensive check to ensure fetch is available
      if (typeof fetch === 'undefined') {
        console.error("❌ [Supabase] Global fetch is undefined!");
        return Promise.reject(new Error("Global fetch is undefined"));
      }
      return fetchWithRetry(input, init);
    }
  }
};

// Singleton instance with defensive creation
let supabaseInstance;
try {
  supabaseInstance = createClient(supabaseUrl || "", supabaseKey || "", options);
} catch (err) {
  console.error("❌ [Supabase] Critical error during createClient:", err);
  // Create a dummy client to avoid crashing the whole app import chain
  supabaseInstance = createClient("https://placeholder.supabase.co", "placeholder", options);
}

export const supabase = supabaseInstance;
