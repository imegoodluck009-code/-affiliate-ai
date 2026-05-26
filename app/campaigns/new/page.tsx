"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PLATFORMS = [
  { value: "meta", label: "Meta (Facebook/Instagram)" },
  { value: "google", label: "Google Ads" },
  { value: "tiktok", label: "TikTok Ads" },
  { value: "twitter", label: "X/Twitter Ads" },
  { value: "native", label: "Native Ads (Taboola/Outbrain)" },
];

const REGIONS = ["Global", "US", "EU", "Africa", "Asia", "LATAM", "Middle East"];

export default function NewCampaignPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    productId: "",
    platform: "meta",
    region: "Global",
    budget: "",
  });

  useEffect(() => {
    const userId = "YOUR_USER_ID";
    fetch(`/api/products?userId=${userId}`)
      .then(r => r.json())
      .then(data => setProducts(data.products || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userId = "YOUR_USER_ID";
    
    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        productId: form.productId,
        name: form.name,
        platform: form.platform,
        region: form.region,
        budget: parseInt(form.budget) * 100, // convert to cents
      }),
    });
    
    const data = await res.json();
    setLoading(false);
    if (data.campaign) {
      router.push(`/campaigns/${data.campaign.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🎯 New Campaign</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Campaign Name</label>
            <input 
              value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})}
              className="w-full p-3 bg-gray-800 rounded border border-gray-700"
              placeholder="Summer Product Launch"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Product</label>
            <select 
              value={form.productId} 
              onChange={e => setForm({...form, productId: e.target.value})}
              className="w-full p-3 bg-gray-800 rounded border border-gray-700"
              required
            >
              <option value="">Select a product...</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.commission_rate}% commission)</option>
              ))}
            </select>
            {products.length === 0 && (
              <p className="text-xs text-yellow-500 mt-2">No products yet. Add one in your admin panel first.</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Platform</label>
              <select 
                value={form.platform} 
                onChange={e => setForm({...form, platform: e.target.value})}
                className="w-full p-3 bg-gray-800 rounded border border-gray-700"
              >
                {PLATFORMS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Region</label>
              <select 
                value={form.region} 
                onChange={e => setForm({...form, region: e.target.value})}
                className="w-full p-3 bg-gray-800 rounded border border-gray-700"
              >
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Budget (USD)</label>
            <input 
              type="number"
              value={form.budget} 
              onChange={e => setForm({...form, budget: e.target.value})}
              className="w-full p-3 bg-gray-800 rounded border border-gray-700"
              placeholder="500"
              min="0"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !form.productId}
            className="w-full p-4 bg-blue-600 rounded-lg font-bold hover:bg-blue-500 disabled:bg-gray-700"
          >
            {loading ? "Creating..." : "Launch Campaign"}
          </button>
        </form>
      </div>
    </div>
  );
}
