"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "../components/Loading";

interface AdminData {
  counts: { products: number; posts: number; clicks: number; revenue: number };
  products: Array<{ id: string; name: string; category: string; created_at: string }>;
  posts: Array<{ id: string; title: string; slug: string; status: string; created_at: string }>;
}

export default function AdminPage() {
  const [data, setData] = useState<<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  if (loading) return <Loading text="Loading admin data..." />;

  return (
    <div className="pro-page-container">
      <div className="pro-content-wrapper">
        <div className="pro-section-header">
          <div>
            <h1 className="pro-section-title">Admin Dashboard</h1>
            <p className="text-[#94a3b8] mt-1">Manage your platform</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/ads" className="pro-btn-outline">📢 Ads</Link>
            <Link href="/products" className="pro-btn">+ Product</Link>
            <Link href="/blog/new" className="pro-btn-outline">+ Post</Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Products", value: data?.counts?.products ?? 0, color: "#d4a574", icon: "🛍️" },
            { label: "Blog Posts", value: data?.counts?.posts ?? 0, color: "#5eead4", icon: "📝" },
            { label: "Total Clicks", value: data?.counts?.clicks ?? 0, color: "#94a3b8", icon: "🖱️" },
            { label: "Revenue", value: `$${data?.counts?.revenue ?? 0}`, color: "#d4a574", icon: "💰" },
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

        <div className="grid md:grid-cols-2 gap-6">
          <div className="pro-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#f8fafc]">Recent Products</h2>
              <Link href="/products" className="pro-link text-sm">View all →</Link>
            </div>
            {(data?.products?.length ?? 0) === 0 ? (
              <div className="pro-empty-state py-6"><p>No products</p></div>
            ) : (
              <div className="flex flex-col gap-3">
                {data?.products?.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-[#0f172a]/50 rounded-lg">
                    <div>
                      <div className="font-medium text-[#f8fafc]">{p.name}</div>
                      <div className="text-xs text-[#64748b]">{p.category}</div>
                    </div>
                    <div className="text-xs text-[#64748b]">{formatDate(p.created_at)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pro-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#f8fafc]">Recent Posts</h2>
              <Link href="/blog" className="pro-link text-sm">View all →</Link>
            </div>
            {(data?.posts?.length ?? 0) === 0 ? (
              <div className="pro-empty-state py-6"><p>No posts</p></div>
            ) : (
              <div className="flex flex-col gap-3">
                {data?.posts?.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-[#0f172a]/50 rounded-lg">
                    <div>
                      <div className="font-medium text-[#f8fafc]">{p.title}</div>
                      <span className={`pro-badge text-xs mt-1 inline-block ${p.status === "published" ? "pro-badge-success" : "pro-badge-warning"}`}>{p.status}</span>
                    </div>
                    <div className="text-xs text-[#64748b]">{formatDate(p.created_at)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
