import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { userId, email, subject, message, priority } = await req.json();
  
  if (!email?.includes('@') || !subject || !message) {
    return NextResponse.json({ error: 'Email, subject, and message required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('support_tickets')
    .insert({
      user_id: userId || null,
      email,
      subject,
      message,
      priority: priority || 'medium',
      status: 'open'
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, ticket: data });
}

export async function GET(req: Request) {
  const { data: tickets, error } = await supabase
    .from('support_tickets')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tickets });
}

export async function PATCH(req: Request) {
  const { id, status } = await req.json();
  const { data, error } = await supabase
    .from('support_tickets')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ticket: data });
}
