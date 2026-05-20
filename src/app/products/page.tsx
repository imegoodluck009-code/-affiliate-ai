export default function ProductsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a192f", paddingTop: "6rem", color: "#ffffff" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem 1rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: "bold", marginBottom: "1rem" }}>
          All <span style={{ background: "linear-gradient(to right, #edc97a, #e5b24a, #d49a2e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Products</span>
        </h1>
        <p style={{ color: "#9fb3c8", maxWidth: "42rem", margin: "0 auto 3rem", fontSize: "1.125rem" }}>
          Browse our complete collection of AI-curated products across all categories.
        </p>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "3rem" }}>
          {["All", "Tech", "Audio", "Smart Home", "Health", "Software"].map((cat, i) => (
            <button key={cat} style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: i === 0 ? "linear-gradient(to right, #d49a2e, #b87d24)" : "rgba(255,255,255,0.05)",
              color: i === 0 ? "#0a192f" : "#9fb3c8",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "0.875rem",
            }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ 
          padding: "4rem", 
          background: "rgba(255,255,255,0.03)", 
          borderRadius: "1.5rem",
          border: "1px dashed rgba(255,255,255,0.1)",
        }}>
          <p style={{ color: "#627d98", fontSize: "1.125rem" }}>Product grid coming soon...</p>
          <p style={{ color: "#627d98", fontSize: "0.875rem", marginTop: "0.5rem" }}>
            We're curating the best products for you.
          </p>
        </div>
      </div>
    </main>
  );
}
