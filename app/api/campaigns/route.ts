import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  
  const { data: campaigns, error } = await supabase
    .from('campaigns')
    .select('*, products(name, affiliate_link, commission_rate)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ campaigns });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, productId, name, platform, region, budget } = body;
  
  const slug = nanoid(8);
  
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .insert({
      user_id: userId,
      product_id: productId,
      name,
      platform,
      region: region || 'Global',
      budget: budget || 0,
      tracking_slug: slug,
      status: 'draft',
    })
    .select()
    .single();
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ campaign });
}
