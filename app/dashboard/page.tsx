"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../Navbar";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    posts: 0,
    clicks: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then(r => r.json())
      .then(data => {
        setStats({
          products: data.products || 0,
          posts: data.posts || 0,
          clicks: data.clicks || 0,
          revenue: data.revenue || 0,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12 text-center text-gray-400">Loading...</div>
    </div>
  );

  const statCards = [
    { label: "Products", value: stats.products, icon: "🛍️", color: "text-pink-400", href: "/products" },
    { label: "Blog Posts", value: stats.posts, icon: "📝", color: "text-yellow-400", href: "/blog" },
    { label: "Total Clicks", value: stats.clicks, icon: "🖱️", color: "text-blue-400", href: "/campaigns" },
    { label: "Revenue", value: `$${stats.revenue}`, icon: "💰", color: "text-green-400", href: "/campaigns" },
  ];

  const quickLinks = [
    { title: "AI Content", desc: "Generate blog posts and descriptions", icon: "🤖", href: "/blog/new" },
    { title: "Manage Products", desc: "View and edit affiliate products", icon: "🛍️", href: "/products" },
    { title: "Ad Campaigns", desc: "Track advertising campaigns", icon: "📢", href: "/campaigns" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400 mb-8">Performance overview</p>

        {/* Quick actions */}
        <div className="flex gap-3 mb-8">
          <Link href="/products/new" className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-500 transition">
            + Add Product
          </Link>
          <Link href="/blog/new" className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium hover:bg-purple-500 transition">
            + New Post
          </Link>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map(card => (
            <Link key={card.label} href={card.href} className="block">
              <div className="p-5 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition">
                <div className="text-2xl mb-2">{card.icon}</div>
                <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                <p className="text-sm text-gray-500 mt-1">{card.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {quickLinks.map(link => (
            <Link key={link.href} href={link.href} className="block">
              <div className="p-5 bg-gray-900 rounded-xl border border-gray-800 hover:border-blue-500 transition group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{link.icon}</div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition">{link.title}</h3>
                <p className="text-sm text-gray-400">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="p-5 bg-gray-900 rounded-xl border border-gray-800">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <div className="text-center py-8 text-gray-500">
            <div className="text-3xl mb-2">📊</div>
            <p>Activity tracking coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
