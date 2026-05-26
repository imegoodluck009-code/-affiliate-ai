"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "../../components/Loading";

interface Stats {
  products: number;
  posts: number;
  clicks: number;
  revenue: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loading text="Loading dashboard..." />;

  return (
    <div className="pro-page-container">
      <div className="pro-content-wrapper">
        <div className="pro-section-header">
          <div>
            <h1 className="pro-section-title">Dashboard</h1>
            <p className="text-[#94a3b8] mt-1">Performance overview</p>
          </div>
          <div className="flex gap-3">
            <Link href="/products" className="pro-btn">+ Add Product</Link>
            <Link href="/blog/new" className="pro-btn-outline">+ New Post</Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Products", value: stats?.products ?? 0, color: "#d4a574", icon: "🛍️" },
            { label: "Blog Posts", value: stats?.posts ?? 0, color: "#5eead4", icon: "📝" },
            { label: "Total Clicks", value: stats?.clicks ?? 0, color: "#94a3b8", icon: "🖱️" },
            { label: "Revenue", value: `$${stats?.revenue ?? 0}`, color: "#d4a574", icon: "💰" },
          ].map((stat) => (
            <div key={stat.label} className="pro-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[#94a3b8] uppercase tracking-wider">{stat.label}</span>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { title: "AI Content", desc: "Generate blog posts and descriptions", href: "/chat", icon: "🤖" },
            { title: "Manage Products", desc: "View and edit affiliate products", href: "/products", icon: "🛍️" },
            { title: "Ad Campaigns", desc: "Track advertising campaigns", href: "/admin/ads", icon: "📢" },
          ].map((action) => (
            <Link key={action.title} href={action.href} className="pro-card p-5 flex items-start gap-4 group">
              <div className="text-2xl group-hover:scale-110 transition-transform">{action.icon}</div>
              <div>
                <h3 className="font-semibold text-[#f8fafc] mb-1">{action.title}</h3>
                <p className="text-sm text-[#94a3b8]">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="pro-card p-6">
          <h2 className="text-lg font-semibold text-[#f8fafc] mb-4">Recent Activity</h2>
          <div className="pro-empty-state">
            <div className="text-3xl mb-2">📊</div>
            <p>Activity tracking coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
