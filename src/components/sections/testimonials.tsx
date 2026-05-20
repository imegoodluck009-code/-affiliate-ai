"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Tech Blogger",
    avatar: "SJ",
    rating: 5,
    text: "Affiliate AI completely changed how I find products to review. The AI recommendations are incredibly accurate and save me hours of research.",
  },
  {
    name: "Michael Chen",
    role: "E-commerce Owner",
    avatar: "MC",
    rating: 5,
    text: "I've tried many product research tools, but this is by far the best. The comparison feature alone has saved me thousands of dollars.",
  },
  {
    name: "Emily Rodriguez",
    role: "Content Creator",
    avatar: "ER",
    rating: 5,
    text: "The AI assistant is like having a personal shopping expert. It understands exactly what I need and finds the perfect products every time.",
  },
];

export function Testimonials() {
  return (
    <section style={{ padding: "5rem 1rem", background: "linear-gradient(to bottom, #102a43, #0a192f)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: "bold", marginBottom: "1rem" }}>
            What Our <span style={{ background: "linear-gradient(to right, #edc97a, #e5b24a, #d49a2e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Users Say</span>
          </h2>
          <p style={{ color: "#9fb3c8", maxWidth: "42rem", margin: "0 auto", fontSize: "1.125rem" }}>
            Join thousands of satisfied users who trust our AI-powered recommendations.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "1.5rem",
                padding: "2rem",
                position: "relative",
              }}
            >
              <Quote style={{ position: "absolute", top: "1.5rem", right: "1.5rem", width: "2rem", height: "2rem", color: "rgba(212, 154, 46, 0.2)" }} />
              
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} style={{ width: "1rem", height: "1rem", color: "#d49a2e", fill: "#d49a2e" }} />
                ))}
              </div>

              <p style={{ color: "#9fb3c8", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                "{testimonial.text}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #d49a2e, #b87d24)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "#0a192f",
                  fontSize: "1rem",
                }}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div style={{ color: "#ffffff", fontWeight: "600" }}>{testimonial.name}</div>
                  <div style={{ color: "#627d98", fontSize: "0.875rem" }}>{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
