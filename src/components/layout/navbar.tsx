"use client";

import { useState } from "react";
import { Menu, X, Sparkles, Bot, BookOpen, Package, Users, Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products", icon: Package },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { href: "/about", label: "About", icon: Users },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: "rgba(10, 25, 47, 0.8)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>
          
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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

          {/* Desktop Nav */}
          <div style={{ display: "none", alignItems: "center", gap: "0.25rem" }} className="md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.75rem",
                  color: "#9fb3c8",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#9fb3c8";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
            <a href="/ai-assistant" style={{
              background: "linear-gradient(to right, #d49a2e, #b87d24)",
              color: "#0a192f",
              padding: "0.5rem 1rem",
              borderRadius: "0.75rem",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 600,
              marginLeft: "0.5rem",
            }}>
              Try AI
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: "none", border: "none", color: "#9fb3c8", cursor: "pointer", padding: "0.5rem" }}
          >
            {isOpen ? <X style={{ width: "1.5rem", height: "1.5rem" }} /> : <Menu style={{ width: "1.5rem", height: "1.5rem" }} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div style={{ padding: "1rem 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  color: "#9fb3c8",
                  textDecoration: "none",
                  fontSize: "1rem",
                }}
              >
                {link.icon && <link.icon style={{ width: "1.25rem", height: "1.25rem" }} />}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
