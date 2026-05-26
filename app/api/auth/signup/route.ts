import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req: Request) {
  try {
    const { email, password, referralCode } = await req.json();

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError || !authData.user) {
      return NextResponse.json({ error: authError?.message || 'Signup failed' }, { status: 400 });
    }

    const userId = authData.user.id;

    // 2. Generate their own referral code
    const theirCode = generateReferralCode();

    // 3. Find who referred them (if any)
    let referredBy: string | null = null;
    if (referralCode) {
      const { data: referrer } = await supabase
        .from('users')
        .select('id')
        .eq('referral_code', referralCode)
        .single();
      referredBy = referrer?.id || null;
    }

    // 4. Insert into users table
    const { error: insertError } = await supabase.from('users').insert({
      id: userId,
      email,
      referral_code: theirCode,
      referred_by: referredBy,
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      userId,
      referralCode: theirCode 
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
