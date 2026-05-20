"use client";

import { Sparkles, Github, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "API", "Integrations"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Documentation", "Help Center", "Community", "Status"],
  Legal: ["Privacy", "Terms", "Cookie Policy", "Affiliate Disclosure"],
};

export function Footer() {
  return (
    <footer style={{ background: "#0a192f", borderTop: "1px solid rgba(255, 255, 255, 0.05)", padding: "4rem 1rem 2rem" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div style={{
                width: "2rem",
                height: "2rem",
                background: "linear-gradient(to bottom right, #e5b24a, #d49a2e)",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(45deg)",
              }}>
                <Sparkles style={{ width: "1.25rem", height: "1.25rem", color: "#0a192f", transform: "rotate(-45deg)" }} />
              </div>
              <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                <span style={{ background: "linear-gradient(to right, #edc97a, #e5b24a, #d49a2e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Affiliate AI</span>
              </span>
            </div>
            <p style={{ color: "#627d98", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>
              AI-powered product discovery platform. Find the best products with intelligent recommendations.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              {[Twitter, Instagram, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" style={{ color: "#627d98", transition: "color 0.3s" }}>
                  <Icon style={{ width: "1.25rem", height: "1.25rem" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 style={{ color: "#ffffff", fontWeight: "600", marginBottom: "1rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {category}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {links.map((link) => (
                  <li key={link} style={{ marginBottom: "0.5rem" }}>
                    <a href="#" style={{ color: "#627d98", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.3s" }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          <p style={{ color: "#627d98", fontSize: "0.875rem" }}>
            © 2024 Affiliate AI. All rights reserved.
          </p>
          <p style={{ color: "#627d98", fontSize: "0.75rem", textAlign: "center" }}>
            This site contains affiliate links. We may earn a commission when you purchase through our links.
          </p>
        </div>
      </div>
    </footer>
  );
}
