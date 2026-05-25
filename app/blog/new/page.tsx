"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const generateSlug = (t: string) =>
    t.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content, status }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create post");
        setSaving(false);
        return;
      }

      router.push("/blog");
    } catch {
      setError("Network error. Please try again.");
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "rgba(10, 25, 47, 0.6)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "0.375rem",
    color: "#ffffff",
    fontSize: "0.875rem",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#9fb3c8",
    marginBottom: "0.5rem",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a192f", paddingTop: "6rem", paddingBottom: "4rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
      <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#ffffff", margin: 0 }}>New Blog Post</h1>
          <Link href="/blog" style={{ fontSize: "0.875rem", color: "#9fb3c8", textDecoration: "none" }}>← Back to Blog</Link>
        </div>

        {error && (
          <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", padding: "0.75rem 1rem", borderRadius: "0.375rem", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={labelStyle}>Title</label>
            <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter post title..." required style={inputStyle} />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={labelStyle}>Slug</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="post-url-slug" required style={inputStyle} />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={labelStyle}>Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post content here..." rows={12} style={{ ...inputStyle, resize: "vertical", minHeight: "200px", fontFamily: "inherit" }} />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label style={labelStyle}>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="draft" style={{ background: "#0a192f" }}>Draft</option>
              <option value="published" style={{ background: "#0a192f" }}>Published</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" disabled={saving} style={{ padding: "0.75rem 1.5rem", background: saving ? "rgba(212, 154, 46, 0.5)" : "linear-gradient(to right, #edc97a, #d49a2e)", color: "#0a192f", border: "none", borderRadius: "0.375rem", fontSize: "0.875rem", fontWeight: "600", cursor: saving ? "not-allowed" : "pointer" }}>
              {saving ? "Saving..." : "Create Post"}
            </button>
            <Link href="/blog" style={{ padding: "0.75rem 1.5rem", background: "rgba(255,255,255,0.05)", color: "#9fb3c8", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.375rem", fontSize: "0.875rem", textDecoration: "none" }}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
