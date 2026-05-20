"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0a192f", paddingTop: "6rem", color: "#ffffff" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: "bold", marginBottom: "1rem" }}>
            Get in <span style={{ background: "linear-gradient(to right, #edc97a, #e5b24a, #d49a2e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Touch</span>
          </h1>
          <p style={{ color: "#9fb3c8", maxWidth: "42rem", margin: "0 auto", fontSize: "1.125rem" }}>
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.5rem" }}>Contact Information</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { icon: Mail, label: "Email", value: "hello@affiliateai.com" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                { icon: MapPin, label: "Address", value: "123 AI Street, Tech City, TC 12345" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "0.75rem",
                    background: "rgba(212, 154, 46, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <item.icon size={18} color="#d49a2e" />
                  </div>
                  <div>
                    <div style={{ color: "#627d98", fontSize: "0.875rem", marginBottom: "0.25rem" }}>{item.label}</div>
                    <div style={{ color: "#ffffff", fontWeight: "500" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "1.5rem",
            padding: "2rem",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Name", type: "text", key: "name" },
                { label: "Email", type: "email", key: "email" },
                { label: "Subject", type: "text", key: "subject" },
              ].map((field) => (
                <div key={field.key}>
                  <label style={{ display: "block", color: "#9fb3c8", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{field.label}</label>
                  <input
                    type={field.type}
                    required
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "0.75rem",
                      padding: "0.75rem 1rem",
                      color: "#ffffff",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", color: "#9fb3c8", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.75rem",
                    padding: "0.75rem 1rem",
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>
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
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}>
                Send Message <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
