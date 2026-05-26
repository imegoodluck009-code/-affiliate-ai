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
  
  const { data: pages, error } = await supabase
    .from('landing_pages')
    .select('*, campaigns(name)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pages });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, campaignId, title } = body;
  
  const slug = nanoid(10);
  
  const { data: page, error } = await supabase
    .from('landing_pages')
    .insert({
      user_id: userId,
      campaign_id: campaignId,
      slug,
      title,
      cta_link: `/track/${body.trackingSlug || ''}`,
    })
    .select()
    .single();
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ page });
}
