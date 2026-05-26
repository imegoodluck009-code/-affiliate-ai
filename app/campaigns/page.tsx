"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const PLATFORMS: Record<string, string> = {
  meta: "📘 Meta",
  google: "🔍 Google",
  tiktok: "🎵 TikTok",
  twitter: "🐦 X/Twitter",
  native: "📰 Native",
};

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-gray-600",
  active: "bg-green-600",
  paused: "bg-yellow-600",
  completed: "bg-blue-600",
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with actual user ID from your auth
    const userId = "YOUR_USER_ID";
    fetch(`/api/campaigns?userId=${userId}`)
      .then(r => r.json())
      .then(data => {
        setCampaigns(data.campaigns || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🚀 Campaigns</h1>
          <Link href="/campaigns/new" className="px-6 py-3 bg-blue-600 rounded-lg font-medium hover:bg-blue-500">
            + New Campaign
          </Link>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No campaigns yet.</p>
            <Link href="/campaigns/new" className="text-blue-400 hover:underline">Create your first campaign →</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {campaigns.map(c => (
              <Link key={c.id} href={`/campaigns/${c.id}`} className="block p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{c.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{c.products?.name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[c.status]}`}>
                    {c.status.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-2xl font-bold text-blue-400">{c.clicks}</p>
                    <p className="text-xs text-gray-500">Clicks</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-400">{c.signups}</p>
                    <p className="text-xs text-gray-500">Signups</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-400">${(c.spend / 100).toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Spend</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-400">{PLATFORMS[c.platform] || c.platform}</p>
                    <p className="text-xs text-gray-500">{c.region}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-500 font-mono break-all">
                    Tracking: {typeof window !== 'undefined' ? `${window.location.origin}/track/${c.tracking_slug}` : ''}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
