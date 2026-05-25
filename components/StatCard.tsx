"use client";
export default function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div style={{ background: "rgba(17, 34, 64, 0.6)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "0.5rem", padding: "1.5rem" }}>
      <div style={{ fontSize: "0.875rem", color: "#9fb3c8", marginBottom: "0.5rem" }}>{label}</div>
      <div style={{ fontSize: "1.875rem", fontWeight: "bold", color: color }}>{value}</div>
    </div>
  );
}
