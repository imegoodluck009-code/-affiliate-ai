"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Loading from "../../../components/Loading";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  affiliate_link: string;
  created_at: string;
}

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          setError(d.error);
        } else {
          setProduct(d.product);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading text="Loading product..." />;
  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a192f", paddingTop: "6rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ color: "#ef4444", fontSize: "1.5rem", marginBottom: "1rem" }}>{error}</h1>
          <Link href="/products" style={{ color: "#d49a2e", textDecoration: "none" }}>← Back to Products</Link>
        </div>
      </div>
    );
  }
  if (!product) return null;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div style={{ minHeight: "100vh", background: "#0a192f", paddingTop: "6rem", paddingBottom: "4rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <Link href="/products" style={{ fontSize: "0.875rem", color: "#9fb3c8", textDecoration: "none", display: "inline-block", marginBottom: "2rem" }}>
          ← Back to Products
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "start" }}>
          <div style={{
            background: "rgba(17, 34, 64, 0.6)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "0.75rem",
            overflow: "hidden",
            aspectRatio: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ color: "#9fb3c8", fontSize: "3rem" }}>📦</div>
            )}
          </div>

          <div>
            <div style={{ fontSize: "0.875rem", color: "#d49a2e", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              {product.category}
            </div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#ffffff", marginBottom: "1rem", lineHeight: 1.2 }}>
              {product.name}
            </h1>
            <div style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#64ffda", marginBottom: "1.5rem" }}>
              ${product.price?.toFixed(2) || "0.00"}
            </div>

            <p style={{ color: "#9fb3c8", fontSize: "1rem", lineHeight: 1.6, marginBottom: "2rem", whiteSpace: "pre-wrap" }}>
              {product.description || "No description available."}
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {product.affiliate_link && (
                <a
                  href={product.affiliate_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "0.875rem 2rem",
                    background: "linear-gradient(to right, #edc97a, #d49a2e)",
                    color: "#0a192f",
                    borderRadius: "0.5rem",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: "600",
                    display: "inline-block",
                  }}
                >
                  Buy Now →
                </a>
              )}
              <span style={{ fontSize: "0.875rem", color: "#9fb3c8", alignSelf: "center" }}>
                Added {formatDate(product.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
