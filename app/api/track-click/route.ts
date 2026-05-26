import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { referralCode } = await req.json();
  const { data: user } = await supabase
    .from('users')
    .select('id, referral_clicks')
    .eq('referral_code', referralCode)
    .single();
  if (user) {
    await supabase
      .from('users')
      .update({ referral_clicks: (user.referral_clicks || 0) + 1 })
      .eq('id', user.id);
  }
  return NextResponse.json({ success: true });
}
