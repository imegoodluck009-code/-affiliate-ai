import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  cookies().delete('supabase-session')
  return NextResponse.json({ message: 'Logged out' })
}
