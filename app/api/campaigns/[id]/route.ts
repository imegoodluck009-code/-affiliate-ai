import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select('*, products(name, affiliate_link, commission_rate)')
    .eq('id', params.id)
    .single();
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  const { count: clickCount } = await supabase
    .from('campaign_clicks')
    .select('*', { count: 'exact', head: true })
    .eq('campaign_id', params.id);
    
  const { count: conversionCount } = await supabase
    .from('campaign_clicks')
    .select('*', { count: 'exact', head: true })
    .eq('campaign_id', params.id)
    .eq('converted', true);
    
  return NextResponse.json({ 
    campaign, 
    stats: { 
      clicks: clickCount || 0, 
      conversions: conversionCount || 0,
      ctr: clickCount ? ((conversionCount || 0) / clickCount * 100).toFixed(2) : '0.00'
    } 
  });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { data, error } = await supabase
    .from('campaigns')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', params.id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ campaign: data });
}
