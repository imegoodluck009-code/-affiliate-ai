"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Loading from "../../../components/Loading";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: string;
  created_at: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blog/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          setError(d.error);
        } else {
          setPost(d.post);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load post");
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <Loading text="Loading post..." />;
  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a192f", paddingTop: "6rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ color: "#ef4444", fontSize: "1.5rem", marginBottom: "1rem" }}>{error}</h1>
          <Link href="/blog" style={{ color: "#d49a2e", textDecoration: "none" }}>← Back to Blog</Link>
        </div>
      </div>
    );
  }
  if (!post) return null;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div style={{ minHeight: "100vh", background: "#0a192f", paddingTop: "6rem", paddingBottom: "4rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
      <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
        <Link href="/blog" style={{ fontSize: "0.875rem", color: "#9fb3c8", textDecoration: "none", display: "inline-block", marginBottom: "2rem" }}>
          ← Back to Blog
        </Link>

        <article>
          <header style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <span style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: post.status === "published" ? "#64ffda" : "#9fb3c8",
                border: `1px solid ${post.status === "published" ? "rgba(100, 255, 218, 0.3)" : "rgba(159, 179, 200, 0.3)"}`,
                padding: "0.25rem 0.75rem",
                borderRadius: "9999px",
              }}>
                {post.status}
              </span>
              <time style={{ fontSize: "0.875rem", color: "#9fb3c8" }}>{formatDate(post.created_at)}</time>
            </div>
            <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#ffffff", lineHeight: 1.2, margin: 0 }}>
              {post.title}
            </h1>
          </header>

          <div style={{ color: "#ccd6f6", fontSize: "1.125rem", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>
            {post.content || "No content yet."}
          </div>
        </article>
      </div>
    </div>
  );
}
