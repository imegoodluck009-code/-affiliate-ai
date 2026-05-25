"use client";
export default function Loading({ text = "Loading..." }: { text?: string }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0a192f", display: "flex", alignItems: "center", justifyContent: "center", color: "#9fb3c8", fontSize: "0.875rem" }}>
      {text}
    </div>
  );
}
