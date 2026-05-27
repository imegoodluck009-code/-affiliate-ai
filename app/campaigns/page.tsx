"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

function CampaignsList() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = "YOUR_USER_ID";
    fetch(`/api/campaigns?userId=${userId}`)
      .then(r => r.json())
      .then(data => {
        setCampaigns(data.campaigns || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
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
              <Link key={c.id} href={`/campaigns/${c.id}`} className="block p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-blue-500 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{c.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{c.products?.name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.status === 'active' ? 'bg-green-600' : c.status === 'paused' ? 'bg-yellow-600' : 'bg-gray-600'}`}>
                    {c.status?.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div><p className="text-2xl font-bold text-blue-400">{c.clicks}</p><p className="text-xs text-gray-500">Clicks</p></div>
                  <div><p className="text-2xl font-bold text-green-400">{c.signups}</p><p className="text-xs text-gray-500">Signups</p></div>
                  <div><p className="text-2xl font-bold text-purple-400">${(c.spend / 100).toFixed(2)}</p><p className="text-xs text-gray-500">Spend</p></div>
                  <div><p className="text-2xl font-bold text-yellow-400">{c.platform}</p><p className="text-xs text-gray-500">{c.region}</p></div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CampaignsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950 text-white flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>}>
      <CampaignsList />
    </Suspense>
  );
}
