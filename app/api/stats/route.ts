import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    // Get counts from all tables
    const [
      { count: blogCount, error: blogError },
      { count: productsCount, error: productsError },
      { count: usersCount, error: usersError }
    ] = await Promise.all([
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      supabase.from('affiliate_products').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true })
    ])

    if (blogError || productsError || usersError) {
      console.error('Stats error:', blogError || productsError || usersError)
    }

    return NextResponse.json({
      blog_posts: blogCount || 0,
      products: productsCount || 0,
      users: usersCount || 0,
      earnings: 0 // You can update this later when you track earnings
    })
  } catch (err) {
    console.error('Stats API error:', err)
    return NextResponse.json({
      blog_posts: 0,
      products: 0,
      users: 0,
      earnings: 0
    })
  }
}
