import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  
  const { data: user } = await supabase
    .from('users')
    .select('referral_clicks')
    .eq('id', userId)
    .single();
    
  const { count: signups } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('referred_by', userId);
    
  const clicks = user?.referral_clicks || 0;
  const rate = clicks > 0 ? ((signups || 0) / clicks * 100).toFixed(1) : '0';
  
  return NextResponse.json({ clicks, signups: signups || 0, conversionRate: `${rate}%` });
}
