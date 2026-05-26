"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "../components/Loading";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: string;
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => { setPosts(d.posts || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? posts : posts.filter((p) => p.status === filter);
  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  if (loading) return <Loading text="Loading blog posts..." />;

  return (
    <div className="pro-page-container">
      <div className="pro-content-wrapper">
        <div className="pro-section-header">
          <div>
            <h1 className="pro-section-title">Blog</h1>
            <p className="text-[#94a3b8] mt-1">{posts.length} posts published</p>
          </div>
          <Link href="/blog/new" className="pro-btn">+ New Post</Link>
        </div>

        <div className="flex gap-2 mb-6">
          {["all", "published", "draft"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === status ? "bg-[#d4a574] text-[#0f172a]" : "bg-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc]"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="pro-card p-12">
            <div className="pro-empty-state">
              <div className="text-3xl mb-2">📝</div>
              <p className="text-lg mb-2">No posts yet</p>
              <p className="text-sm">Create your first blog post</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="pro-card p-6 group">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`pro-badge text-xs ${post.status === "published" ? "pro-badge-success" : "pro-badge-warning"}`}>{post.status}</span>
                  <span className="text-sm text-[#64748b]">{formatDate(post.created_at)}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#f8fafc] mb-3 group-hover:text-[#d4a574] transition-colors">{post.title}</h3>
                <p className="text-[#94a3b8] text-sm line-clamp-3 mb-4">{post.content || "No content"}</p>
                <span className="text-sm text-[#d4a574] group-hover:underline">Read More →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
