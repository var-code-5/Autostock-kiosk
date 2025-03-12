import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://pylogiruyrhrjbvowlaq.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error('Supabase anon key not found in environment variables');
  process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey);