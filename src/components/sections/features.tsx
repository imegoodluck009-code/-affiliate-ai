"use client";

import { motion } from "framer-motion";
import { Bot, Search, BarChart3, Shield, Zap, TrendingUp, Users, Award } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Recommendations",
    description: "Get personalized product suggestions powered by advanced AI algorithms that learn your preferences.",
    color: "#d49a2e",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Find exactly what you need with our intelligent semantic search that understands context.",
    color: "#486581",
  },
  {
    icon: BarChart3,
    title: "Compare Products",
    description: "Side-by-side comparisons with detailed specs, ratings, and price history.",
    color: "#627d98",
  },
  {
    icon: Shield,
    title: "Verified Reviews",
    description: "All products are vetted and reviewed by our expert team. No fake reviews.",
    color: "#e5b24a",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Get instant notifications when prices drop or new products match your criteria.",
    color: "#b87d24",
  },
  {
    icon: TrendingUp,
    title: "Trending Products",
    description: "Discover what's hot right now with our AI-powered trend analysis.",
    color: "#96601f",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join thousands of users sharing honest feedback and recommendations.",
    color: "#334e68",
  },
  {
    icon: Award,
    title: "Best Deals",
    description: "We find the best prices across all platforms so you never overpay.",
    color: "#d49a2e",
  },
];

export function Features() {
  return (
    <section style={{ padding: "5rem 1rem", background: "linear-gradient(to bottom, #0a192f, #102a43)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: "bold", marginBottom: "1rem" }}>
            Why Choose <span style={{ background: "linear-gradient(to right, #edc97a, #e5b24a, #d49a2e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Affiliate AI</span>
          </h2>
          <p style={{ color: "#9fb3c8", maxWidth: "42rem", margin: "0 auto", fontSize: "1.125rem" }}>
            We combine cutting-edge AI technology with expert curation to deliver the best product recommendations.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "1rem",
                padding: "1.5rem",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 40px -15px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "0.75rem",
                background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}>
                <feature.icon style={{ width: "1.5rem", height: "1.5rem", color: feature.color }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#ffffff" }}>{feature.title}</h3>
              <p style={{ color: "#627d98", fontSize: "0.875rem", lineHeight: 1.6 }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
