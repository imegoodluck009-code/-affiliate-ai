"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CampaignDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/campaigns/${id}`)
      .then(r => r.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-8">Loading...</div>;
  if (!data?.campaign) return <div className="min-h-screen bg-gray-900 text-white p-8">Campaign not found</div>;

  const c = data.campaign;
  const stats = data.stats;
  const trackingUrl = typeof window !== 'undefined' ? `${window.location.origin}/track/${c.tracking_slug}` : '';

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/campaigns" className="text-blue-400 hover:underline mb-4 block">← Back to campaigns</Link>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">{c.name}</h1>
            <p className="text-gray-400 mt-1">Product: {c.products?.name}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${
            c.status === 'active' ? 'bg-green-600' : 
            c.status === 'paused' ? 'bg-yellow-600' : 'bg-gray-600'
          }`}>
            {c.status.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-6 bg-gray-800 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-400">{stats.clicks}</p>
            <p className="text-sm text-gray-500 mt-1">Total Clicks</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg text-center">
            <p className="text-3xl font-bold text-green-400">{stats.conversions}</p>
            <p className="text-sm text-gray-500 mt-1">Conversions</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg text-center">
            <p className="text-3xl font-bold text-purple-400">{stats.ctr}%</p>
            <p className="text-sm text-gray-500 mt-1">Conversion Rate</p>
          </div>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 mb-6">
          <h3 className="text-lg font-bold mb-3">🔗 Tracking Link</h3>
          <p className="text-sm text-gray-400 mb-2">Use this link in your ads:</p>
          <div className="flex gap-2">
            <input 
              value={trackingUrl} 
              readOnly 
              className="flex-1 p-3 bg-gray-900 rounded font-mono text-sm text-green-400"
            />
            <button 
              onClick={() => {
                navigator.clipboard.writeText(trackingUrl);
                alert("Copied!");
              }}
              className="px-4 py-2 bg-blue-600 rounded font-medium"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">Platform</p>
            <p className="text-lg font-bold capitalize">{c.platform}</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">Region</p>
            <p className="text-lg font-bold">{c.region}</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">Budget</p>
            <p className="text-lg font-bold">${(c.budget / 100).toFixed(2)}</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">Commission</p>
            <p className="text-lg font-bold text-green-400">{c.products?.commission_rate}%</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={async () => {
              const newStatus = c.status === 'active' ? 'paused' : 'active';
              await fetch(`/api/campaigns/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
              });
              window.location.reload();
            }}
            className={`px-6 py-3 rounded-lg font-bold ${
              c.status === 'active' ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-green-600 hover:bg-green-500'
            }`}
          >
            {c.status === 'active' ? '⏸ Pause' : '▶ Activate'}
          </button>
        </div>
      </div>
    </div>
  );
}
