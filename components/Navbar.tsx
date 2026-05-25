"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/chat", label: "AI Chat" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(10, 25, 47, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4rem",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            background: "linear-gradient(to right, #edc97a, #e5b24a, #d49a2e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
          }}
        >
          Affiliate AI
        </Link>

        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: isActive ? "#d49a2e" : "#9fb3c8",
                  fontSize: "0.875rem",
                  fontWeight: isActive ? "600" : "400",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  position: "relative",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "#d49a2e" : "#9fb3c8")}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "linear-gradient(to right, #d49a2e, #b87d24)",
                      borderRadius: "1px",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#9fb3c8",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          className="mobile-toggle"
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div
          style={{
            display: "none",
            padding: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(10, 25, 47, 0.98)",
          }}
          className="mobile-menu"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "0.75rem 0",
                  color: isActive ? "#d49a2e" : "#9fb3c8",
                  fontWeight: isActive ? "600" : "400",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
