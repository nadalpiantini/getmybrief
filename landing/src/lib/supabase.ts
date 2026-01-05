import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function addToWaitlist(email: string, source: string = 'landing') {
  const { data, error } = await supabase
    .from('getmybrief_waitlist')
    .insert([{ email, source }])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error('This email is already on the waitlist');
    }
    throw error;
  }

  return data;
}
