"use client";
import Link from "next/link";
export default function SectionCard({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(17, 34, 64, 0.6)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "0.5rem", padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#ffffff", margin: 0 }}>{title}</h2>
        <Link href={href} style={{ fontSize: "0.875rem", color: "#d49a2e", textDecoration: "none" }}>View all →</Link>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>{children}</div>
    </div>
  );
}
