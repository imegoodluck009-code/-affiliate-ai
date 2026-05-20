"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section style={{ padding: "5rem 1rem", background: "#0a192f" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          maxWidth: "64rem",
          margin: "0 auto",
          background: "linear-gradient(135deg, rgba(212,154,46,0.1) 0%, rgba(16,42,67,0.3) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "2rem",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{
          width: "4rem",
          height: "4rem",
          borderRadius: "1rem",
          background: "linear-gradient(135deg, #d49a2e, #b87d24)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
        }}>
          <Mail style={{ width: "2rem", height: "2rem", color: "#0a192f" }} />
        </div>

        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: "bold", marginBottom: "1rem" }}>
          Stay Ahead of the <span style={{ background: "linear-gradient(to right, #edc97a, #e5b24a, #d49a2e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Curve</span>
        </h2>
        <p style={{ color: "#9fb3c8", maxWidth: "32rem", margin: "0 auto 2rem", fontSize: "1.125rem" }}>
          Get weekly AI-curated product recommendations, exclusive deals, and insider tips delivered to your inbox.
        </p>

        <form style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "28rem", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "0.75rem",
                padding: "0.875rem 1rem",
                color: "#ffffff",
                fontSize: "1rem",
                outline: "none",
              }}
            />
            <button type="submit" style={{
              background: "linear-gradient(to right, #d49a2e, #b87d24)",
              color: "#0a192f",
              padding: "0.875rem 1.5rem",
              borderRadius: "0.75rem",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              whiteSpace: "nowrap",
            }}>
              Subscribe <ArrowRight style={{ width: "1rem", height: "1rem" }} />
            </button>
          </div>
          <p style={{ color: "#627d98", fontSize: "0.75rem" }}>
            No spam, unsubscribe anytime. Join 50,000+ subscribers.
          </p>
        </form>
      </motion.div>
    </section>
  );
}
