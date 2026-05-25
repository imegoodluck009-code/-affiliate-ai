"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface AdminData {
  counts: {
    products: number;
    posts: number;
    clicks: number;
    revenue: number;
  };
  products: Array<<{
    id: string;
    name: string;
    category: string;
    created_at: string;
  }>;
  posts: Array<<{
    id: string;
    title: string;
    slug: string;
    status: string;
    created_at: string;
  }>;
}

export default function AdminPage() {
  const [data, setData] = useState<<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a192f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9fb3c8",
          fontSize: "0.875rem",
        }}
      >
        Loading admin data...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a192f",
        paddingTop: "6rem",
        paddingBottom: "4rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#ffffff",
              margin: 0,
            }}
          >
            Admin Dashboard
          </h1>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link
              href="/products"
              style={{
                padding: "0.5rem 1rem",
                background: "linear-gradient(to right, #edc97a, #d49a2e)",
                color: "#0a192f",
                borderRadius: "0.375rem",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              + Add Product
            </Link>
            <Link
              href="/blog"
              style={{
                padding: "0.5rem 1rem",
                background: "rgba(255,255,255,0.05)",
                color: "#d49a2e",
                border: "1px solid rgba(212, 154, 46, 0.3)",
                borderRadius: "0.375rem",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              + Add Post
            </Link>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {[
            { label: "Products", value: data?.counts?.products ?? 0, color: "#d49a2e" },
            { label: "Blog Posts", value: data?.counts?.posts ?? 0, color: "#64ffda" },
            { label: "Total Clicks", value: data?.counts?.clicks ?? 0, color: "#9fb3c8" },
            { label: "Revenue", value: `$${data?.counts?.revenue ?? 0}`, color: "#edc97a" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(17, 34, 64, 0.6)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#9fb3c8",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: "1.875rem",
                  fontWeight: "bold",
                  color: stat.color,
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              background: "rgba(17, 34, 64, 0.6)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Recent Products
              </h2>
              <Link
                href="/products"
                style={{
                  fontSize: "0.875rem",
                  color: "#d49a2e",
                  textDecoration: "none",
                }}
              >
                View all →
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {(data?.products?.length ?? 0) === 0 ? (
                <div style={{ color: "#9fb3c8", fontSize: "0.875rem" }}>
                  No products yet.
                </div>
              ) : (
                data?.products?.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.75rem",
                      background: "rgba(10, 25, 47, 0.5)",
                      borderRadius: "0.375rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#ffffff",
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#9fb3c8",
                          marginTop: "0.25rem",
                        }}
                      >
                        {p.category}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#9fb3c8",
                      }}
                    >
                      {formatDate(p.created_at)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div
            style={{
              background: "rgba(17, 34, 64, 0.6)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "0.5rem",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Recent Blog Posts
              </h2>
              <Link
                href="/blog"
                style={{
                  fontSize: "0.875rem",
                  color: "#d49a2e",
                  textDecoration: "none",
                }}
              >
                View all →
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {(data?.posts?.length ?? 0) === 0 ? (
                <div style={{ color: "#9fb3c8", fontSize: "0.875rem" }}>
                  No posts yet.
                </div>
              ) : (
                data?.posts?.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.75rem",
                      background: "rgba(10, 25, 47, 0.5)",
                      borderRadius: "0.375rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#ffffff",
                        }}
                      >
                        {p.title}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#9fb3c8",
                          marginTop: "0.25rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {p.status}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#9fb3c8",
                      }}
                    >
                      {formatDate(p.created_at)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
