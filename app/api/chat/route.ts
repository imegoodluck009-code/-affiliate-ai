import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SYSTEM_PROMPT = `You are AffiliateBot, an AI assistant for an affiliate marketing platform. You can help users with:

1. GENERAL QUESTIONS: Explain how affiliate marketing works, platform features, pricing
2. REFERRALS: Generate referral links, explain the referral program, show earnings
3. LEAD CAPTURE: Collect visitor emails for marketing campaigns
4. SUPPORT: Create support tickets for technical issues, bugs, account problems
5. CAMPAIGNS: Give advice on ad campaigns, suggest optimizations, explain tracking

When a user wants to:
- Create a referral link → ask for their user ID, then generate a link
- Report a bug → collect: email, subject, description, then create a ticket
- Leave email → collect name and email, store as lead
- Campaign help → ask for campaign ID or general advice

Be friendly, professional, and concise. Use emojis occasionally.`;

export async function POST(req: Request) {
  try {
    const { message, sessionToken, userId } = await req.json();
    
    let sessionId: string | undefined = undefined;
    
    if (sessionToken) {
      const { data: existing } = await supabase
        .from('chat_sessions')
        .select('id')
        .eq('session_token', sessionToken)
        .single();
      sessionId = existing?.id;
    }
    
    if (!sessionId) {
      const { data: newSession } = await supabase
        .from('chat_sessions')
        .insert({ user_id: userId || null, session_token: crypto.randomUUID() })
        .select()
        .single();
      sessionId = newSession!.id;
    }

    const { data: history } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(20);

    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...(history || []).map(h => ({ role: h.role as 'user' | 'assistant', content: h.content })),
      { role: 'user' as const, content: message }
    ];

    const lowerMsg = message.toLowerCase();
    let specialAction = null;

    if (lowerMsg.includes('referral') && lowerMsg.includes('link')) {
      specialAction = { type: 'referral', data: null };
    } else if (lowerMsg.includes('bug') || lowerMsg.includes('issue') || lowerMsg.includes('problem')) {
      specialAction = { type: 'support', data: null };
    } else if (lowerMsg.includes('email') && (lowerMsg.includes('subscribe') || lowerMsg.includes('newsletter'))) {
      specialAction = { type: 'lead', data: null };
    }

    // Call Groq instead of OpenAI
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant', // Fast, cheap Groq model
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content || 'I apologize, I could not generate a response.';

    await supabase.from('chat_messages').insert([
      { session_id: sessionId, role: 'user', content: message },
      { session_id: sessionId, role: 'assistant', content: reply, metadata: specialAction || {} }
    ]);

    const { data: sessionData } = await supabase
      .from('chat_sessions')
      .select('session_token')
      .eq('id', sessionId)
      .single();

    return NextResponse.json({
      reply,
      sessionToken: sessionToken || sessionData?.session_token,
      action: specialAction
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
