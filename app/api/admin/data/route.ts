import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data: products, error: pErr } = await supabase
      .from("products")
      .select("id, name, category, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    if (pErr) console.error("Products error:", pErr);

    const { data: posts, error: bErr } = await supabase
      .from("posts")
      .select("id, title, slug, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    if (bErr) console.error("Posts error:", bErr);

    const { count: productCount } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    const { count: postCount } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      products: products || [],
      posts: posts || [],
      counts: {
        products: productCount || 0,
        posts: postCount || 0,
        clicks: 0,
        revenue: 0,
      },
    });
  } catch (err) {
    console.error("Admin API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch admin data" },
      { status: 500 }
    );
  }
}
