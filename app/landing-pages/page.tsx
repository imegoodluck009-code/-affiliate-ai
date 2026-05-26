"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LandingPagesList() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = "YOUR_USER_ID";
    fetch(`/api/landing-pages?userId=${userId}`)
      .then(r => r.json())
      .then(data => {
        setPages(data.pages || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🛬 Landing Pages</h1>
          <Link href="/landing-pages/new" className="px-6 py-3 bg-blue-600 rounded-lg font-medium">
            + New Page
          </Link>
        </div>

        {pages.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No landing pages yet.</p>
            <Link href="/landing-pages/new" className="text-blue-400 hover:underline">Create your first page →</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {pages.map(p => (
              <div key={p.id} className="p-6 bg-gray-800 rounded-lg border border-gray-700 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {p.published ? '🟢 Live' : '⚫ Draft'} · Campaign: {p.campaigns?.name || 'None'}
                  </p>
                  <p className="text-xs text-gray-500 font-mono mt-1">
                    /lp/{p.slug}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a 
                    href={`/lp/${p.slug}`} 
                    target="_blank"
                    className="px-4 py-2 bg-gray-700 rounded text-sm hover:bg-gray-600"
                  >
                    Preview
                  </a>
                  <Link 
                    href={`/landing-pages/${p.id}/edit`}
                    className="px-4 py-2 bg-blue-600 rounded text-sm hover:bg-blue-500"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
