import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  const { count } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('referred_by', userId);
    
  return NextResponse.json({ referrals: count || 0 });
}
