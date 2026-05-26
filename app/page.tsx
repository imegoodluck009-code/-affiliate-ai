"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [stats, setStats] = useState({ products: 0, posts: 0, clicks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#d4a574]/5 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="pro-badge pro-badge-warning inline-flex mb-6">Affiliate Marketing Platform</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-[#f8fafc]">Monetize Your </span>
            <span className="pro-gradient-text">Content</span>
          </h1>
          <p className="text-xl text-[#94a3b8] max-w-2xl mx-auto mb-10">
            AI-powered affiliate marketing platform. Generate content, track products, and maximize revenue.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard" className="pro-btn text-lg px-8 py-3">Get Started →</Link>
            <Link href="/products" className="pro-btn-outline text-lg px-8 py-3">Explore Products</Link>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { label: "Products", value: stats.products },
              { label: "Blog Posts", value: stats.posts },
              { label: "Clicks", value: stats.clicks },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#d4a574] mb-1">
                  {loading ? "—" : stat.value}
                </div>
                <div className="text-sm text-[#64748b] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#f8fafc] mb-4">Everything You Need</h2>
            <p className="text-[#94a3b8] max-w-xl mx-auto">Professional tools designed for serious affiliate marketers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🤖", title: "AI Content Generator", desc: "Generate blog posts and product descriptions with advanced AI.", href: "/chat" },
              { icon: "📊", title: "Analytics Dashboard", desc: "Track clicks, conversions, and revenue in real-time.", href: "/dashboard" },
              { icon: "🛍️", title: "Product Management", desc: "Organize affiliate products with categories and tracking.", href: "/products" },
              { icon: "📝", title: "Blog Management", desc: "Create SEO-optimized blog posts with ease.", href: "/blog" },
              { icon: "🎯", title: "Ad Campaigns", desc: "Manage and track advertising campaigns.", href: "/admin/ads" },
              { icon: "⚡", title: "Fast & Secure", desc: "Modern infrastructure with enterprise security.", href: "/admin" },
            ].map((f) => (
              <Link key={f.title} href={f.href} className="pro-card p-6 group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-lg font-semibold text-[#f8fafc] mb-2">{f.title}</h3>
                <p className="text-[#94a3b8] text-sm">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="pro-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4a574]/10 to-transparent" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-[#f8fafc] mb-4">Ready to Scale?</h2>
              <p className="text-[#94a3b8] mb-8 max-w-lg mx-auto">Join professionals who use our platform to grow their affiliate business.</p>
              <Link href="/dashboard" className="pro-btn text-lg px-8 py-3 inline-block">Start Free →</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="pro-footer">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-8 mb-4">
            <Link href="/products" className="pro-link">Products</Link>
            <Link href="/blog" className="pro-link">Blog</Link>
            <Link href="/dashboard" className="pro-link">Dashboard</Link>
            <Link href="/admin" className="pro-link">Admin</Link>
          </div>
          <p>© 2026 Affiliate AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
