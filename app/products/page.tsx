"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "../../components/Loading";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  created_at: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => { setProducts(d.products || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category).filter(Boolean))];
  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  if (loading) return <Loading text="Loading products..." />;

  return (
    <div className="pro-page-container">
      <div className="pro-content-wrapper">
        <div className="pro-section-header">
          <div>
            <h1 className="pro-section-title">Products</h1>
            <p className="text-[#94a3b8] mt-1">{products.length} affiliate products</p>
          </div>
          <Link href="/admin" className="pro-btn">+ Add Product</Link>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat ? "bg-[#d4a574] text-[#0f172a]" : "bg-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc]"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="pro-card p-12">
            <div className="pro-empty-state">
              <div className="text-3xl mb-2">🛍️</div>
              <p className="text-lg mb-2">No products yet</p>
              <p className="text-sm">Add your first affiliate product</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="pro-card overflow-hidden group">
                <div className="aspect-[4/3] bg-[#1e293b] overflow-hidden">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                  )}
                </div>
                <div className="p-5">
                  <span className="pro-badge pro-badge-warning text-xs mb-2 inline-block">{product.category || "General"}</span>
                  <h3 className="text-lg font-semibold text-[#f8fafc] mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-[#94a3b8] mb-4 line-clamp-2">{product.description || "No description"}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#5eead4]">${product.price?.toFixed(2) || "0.00"}</span>
                    <span className="text-sm text-[#d4a574] group-hover:underline">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
