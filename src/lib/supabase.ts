/**
 * Supabase Web Client
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL || 'https://dvodghbjmtydijbrgsmj.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2b2RnaGJqbXR5ZGlqYnJnc21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMzU0MjAsImV4cCI6MjA4NjgxMTQyMH0.8S4E_HtT8mzQM4IhcPawQwQcTzWe0aG-LUH75sDjhg8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});
