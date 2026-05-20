"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, ExternalLink } from "lucide-react";

const products = [
  {
    name: "Smart Home Hub Pro",
    category: "Smart Home",
    rating: 4.8,
    reviews: 2341,
    price: "$199",
    originalPrice: "$249",
    image: "🏠",
    badge: "Editor's Choice",
    description: "Control your entire home with voice commands and AI automation.",
  },
  {
    name: "Wireless Earbuds X3",
    category: "Audio",
    rating: 4.9,
    reviews: 5672,
    price: "$149",
    originalPrice: "$199",
    image: "🎧",
    badge: "Best Seller",
    description: "Premium sound quality with 48-hour battery life and noise cancellation.",
  },
  {
    name: "Fitness Tracker Ultra",
    category: "Health",
    rating: 4.7,
    reviews: 3891,
    price: "$179",
    originalPrice: "$229",
    image: "⌚",
    badge: "Trending",
    description: "Advanced health monitoring with AI-powered workout recommendations.",
  },
  {
    name: "4K Webcam Studio",
    category: "Tech",
    rating: 4.6,
    reviews: 1823,
    price: "$129",
    originalPrice: "$179",
    image: "📹",
    badge: "New",
    description: "Professional streaming quality with AI background removal.",
  },
  {
    name: "Portable SSD 2TB",
    category: "Storage",
    rating: 4.9,
    reviews: 4521,
    price: "$159",
    originalPrice: "$199",
    image: "💾",
    badge: "Top Rated",
    description: "Blazing fast transfers with military-grade encryption.",
  },
  {
    name: "Smart Coffee Maker",
    category: "Home",
    rating: 4.5,
    reviews: 1234,
    price: "$89",
    originalPrice: "$129",
    image: "☕",
    badge: "Deal",
    description: "Brew perfect coffee every time with AI taste profiling.",
  },
];

export function ProductsShowcase() {
  return (
    <section style={{ padding: "5rem 1rem", background: "#0a192f" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: "bold", marginBottom: "1rem" }}>
            Featured <span style={{ background: "linear-gradient(to right, #edc97a, #e5b24a, #d49a2e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Products</span>
          </h2>
          <p style={{ color: "#9fb3c8", maxWidth: "42rem", margin: "0 auto", fontSize: "1.125rem" }}>
            Hand-picked by our AI based on quality, reviews, and value for money.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "1.5rem",
                overflow: "hidden",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212, 154, 46, 0.3)";
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Image Placeholder */}
              <div style={{
                height: "12rem",
                background: "linear-gradient(135deg, rgba(212,154,46,0.1), rgba(16,42,67,0.3))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "4rem",
                position: "relative",
              }}>
                {product.image}
                <span style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  background: "linear-gradient(to right, #d49a2e, #b87d24)",
                  color: "#0a192f",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                }}>
                  {product.badge}
                </span>
              </div>

              <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ color: "#d49a2e", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {product.category}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Star style={{ width: "1rem", height: "1rem", color: "#d49a2e", fill: "#d49a2e" }} />
                    <span style={{ color: "#ffffff", fontSize: "0.875rem", fontWeight: "600" }}>{product.rating}</span>
                    <span style={{ color: "#627d98", fontSize: "0.75rem" }}>({product.reviews})</span>
                  </div>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#ffffff" }}>
                  {product.name}
                </h3>
                <p style={{ color: "#627d98", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: 1.5 }}>
                  {product.description}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#d49a2e" }}>{product.price}</span>
                    <span style={{ fontSize: "1rem", color: "#627d98", textDecoration: "line-through" }}>{product.originalPrice}</span>
                  </div>
                  <button style={{
                    background: "linear-gradient(to right, #d49a2e, #b87d24)",
                    color: "#0a192f",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.75rem",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}>
                    View <ExternalLink style={{ width: "0.875rem", height: "0.875rem" }} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a href="/products" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#d49a2e",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1.125rem",
          }}>
            View All Products <ArrowRight style={{ width: "1.25rem", height: "1.25rem" }} />
          </a>
        </div>
      </div>
    </section>
  );
}
