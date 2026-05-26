import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data: users, error } = await supabase
    .from('users')
    .select('id, email, referral_code, referral_clicks, referred_by');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  const counts: Record<string, number> = {};
  users.forEach(u => {
    if (u.referred_by) counts[u.referred_by] = (counts[u.referred_by] || 0) + 1;
  });
  
  const leaderboard = users
    .map(u => ({
      id: u.id,
      email: u.email,
      code: u.referral_code,
      clicks: u.referral_clicks || 0,
      signups: counts[u.id] || 0,
    }))
    .sort((a, b) => b.signups - a.signups)
    .slice(0, 10);
    
  return NextResponse.json({ leaderboard });
}
