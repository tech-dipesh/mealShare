import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  throw new Error('Missing Supabase credentials in .env file');
}
else
    console.log("Supabase connected succesfully")
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);