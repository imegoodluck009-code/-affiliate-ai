"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewLandingPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    campaignId: "",
    headline: "",
    subheadline: "",
    ctaText: "Get Started Free",
    bgColor: "#0f172a",
    textColor: "#ffffff",
    accentColor: "#3b82f6",
  });

  useEffect(() => {
    const userId = "YOUR_USER_ID";
    fetch(`/api/campaigns?userId=${userId}`)
      .then(r => r.json())
      .then(data => setCampaigns(data.campaigns || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userId = "YOUR_USER_ID";
    const campaign = campaigns.find(c => c.id === form.campaignId);
    
    const res = await fetch("/api/landing-pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        campaignId: form.campaignId,
        title: form.title,
        trackingSlug: campaign?.tracking_slug,
      }),
    });
    
    const data = await res.json();
    setLoading(false);
    if (data.page) {
      router.push(`/landing-pages/${data.page.id}/edit`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🛬 New Landing Page</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Page Title</label>
            <input 
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})}
              className="w-full p-3 bg-gray-800 rounded border border-gray-700"
              placeholder="Summer Sale 2026"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Linked Campaign</label>
            <select 
              value={form.campaignId} 
              onChange={e => setForm({...form, campaignId: e.target.value})}
              className="w-full p-3 bg-gray-800 rounded border border-gray-700"
              required
            >
              <option value="">Select campaign...</option>
              {campaigns.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.platform})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Headline</label>
            <input 
              value={form.headline} 
              onChange={e => setForm({...form, headline: e.target.value})}
              className="w-full p-3 bg-gray-800 rounded border border-gray-700"
              placeholder="The Best Affiliate Platform"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Subheadline</label>
            <input 
              value={form.subheadline} 
              onChange={e => setForm({...form, subheadline: e.target.value})}
              className="w-full p-3 bg-gray-800 rounded border border-gray-700"
              placeholder="Join 10,000+ marketers earning passive income"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Background</label>
              <input type="color" value={form.bgColor} onChange={e => setForm({...form, bgColor: e.target.value})} className="w-full h-10 rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Text Color</label>
              <input type="color" value={form.textColor} onChange={e => setForm({...form, textColor: e.target.value})} className="w-full h-10 rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Accent</label>
              <input type="color" value={form.accentColor} onChange={e => setForm({...form, accentColor: e.target.value})} className="w-full h-10 rounded" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || !form.campaignId}
            className="w-full p-4 bg-blue-600 rounded-lg font-bold hover:bg-blue-500 disabled:bg-gray-700"
          >
            {loading ? "Creating..." : "Create Landing Page"}
          </button>
        </form>
      </div>
    </div>
  );
}
