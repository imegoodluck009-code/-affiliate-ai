"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditLandingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [page, setPage] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [features, setFeatures] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/landing-pages/${id}`)
      .then(r => r.json())
      .then(data => {
        setPage(data.page);
        setFeatures(data.page?.features || []);
        setTestimonials(data.page?.testimonials || []);
      });
  }, [id]);

  const save = async () => {
    setSaving(true);
    await fetch(`/api/landing-pages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...page,
        features,
        testimonials,
      }),
    });
    setSaving(false);
    alert("Saved!");
  };

  const publish = async () => {
    await fetch(`/api/landing-pages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: true }),
    });
    alert("Published!");
    window.open(`/lp/${page.slug}`, '_blank');
  };

  if (!page) return <div className="min-h-screen bg-gray-900 text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/landing-pages" className="text-blue-400 hover:underline text-sm">← Back</Link>
            <h1 className="text-3xl font-bold mt-2">Edit: {page.title}</h1>
          </div>
          <div className="flex gap-2">
            <a href={`/lp/${page.slug}`} target="_blank" className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              Preview
            </a>
            <button onClick={save} disabled={saving} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">
              {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={publish} className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">
              Publish
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="p-6 bg-gray-800 rounded-lg space-y-4">
            <h3 className="text-lg font-bold">Basic Info</h3>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Headline</label>
              <input value={page.headline || ''} onChange={e => setPage({...page, headline: e.target.value})} className="w-full p-2 bg-gray-900 rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Subheadline</label>
              <input value={page.subheadline || ''} onChange={e => setPage({...page, subheadline: e.target.value})} className="w-full p-2 bg-gray-900 rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">CTA Text</label>
              <input value={page.cta_text || ''} onChange={e => setPage({...page, cta_text: e.target.value})} className="w-full p-2 bg-gray-900 rounded" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Hero Image URL</label>
              <input value={page.hero_image || ''} onChange={e => setPage({...page, hero_image: e.target.value})} className="w-full p-2 bg-gray-900 rounded" placeholder="https://..." />
            </div>
          </div>

          {/* Colors */}
          <div className="p-6 bg-gray-800 rounded-lg space-y-4">
            <h3 className="text-lg font-bold">Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Background</label>
                <input type="color" value={page.bg_color} onChange={e => setPage({...page, bg_color: e.target.value})} className="w-full h-10 rounded" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Text</label>
                <input type="color" value={page.text_color} onChange={e => setPage({...page, text_color: e.target.value})} className="w-full h-10 rounded" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Accent</label>
                <input type="color" value={page.accent_color} onChange={e => setPage({...page, accent_color: e.target.value})} className="w-full h-10 rounded" />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Features</h3>
            {features.map((f, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={f.icon} onChange={e => {
                  const newF = [...features]; newF[i].icon = e.target.value; setFeatures(newF);
                }} className="w-16 p-2 bg-gray-900 rounded text-center" placeholder="✨" />
                <input value={f.title} onChange={e => {
                  const newF = [...features]; newF[i].title = e.target.value; setFeatures(newF);
                }} className="flex-1 p-2 bg-gray-900 rounded" placeholder="Feature title" />
                <input value={f.description} onChange={e => {
                  const newF = [...features]; newF[i].description = e.target.value; setFeatures(newF);
                }} className="flex-1 p-2 bg-gray-900 rounded" placeholder="Description" />
                <button onClick={() => setFeatures(features.filter((_, idx) => idx !== i))} className="px-3 py-2 bg-red-600 rounded text-sm">×</button>
              </div>
            ))}
            <button onClick={() => setFeatures([...features, { icon: "✨", title: "", description: "" }])} className="mt-2 px-4 py-2 bg-gray-700 rounded text-sm">
              + Add Feature
            </button>
          </div>

          {/* Testimonials */}
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Testimonials</h3>
            {testimonials.map((t, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={t.quote} onChange={e => {
                  const newT = [...testimonials]; newT[i].quote = e.target.value; setTestimonials(newT);
                }} className="flex-1 p-2 bg-gray-900 rounded" placeholder="Quote" />
                <input value={t.author} onChange={e => {
                  const newT = [...testimonials]; newT[i].author = e.target.value; setTestimonials(newT);
                }} className="w-32 p-2 bg-gray-900 rounded" placeholder="Author" />
                <button onClick={() => setTestimonials(testimonials.filter((_, idx) => idx !== i))} className="px-3 py-2 bg-red-600 rounded text-sm">×</button>
              </div>
            ))}
            <button onClick={() => setTestimonials([...testimonials, { quote: "", author: "" }])} className="mt-2 px-4 py-2 bg-gray-700 rounded text-sm">
              + Add Testimonial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
