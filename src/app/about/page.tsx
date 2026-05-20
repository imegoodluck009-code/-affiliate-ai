export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a192f", paddingTop: "6rem", color: "#ffffff" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: "bold", marginBottom: "1rem" }}>
            About <span style={{ background: "linear-gradient(to right, #edc97a, #e5b24a, #d49a2e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Affiliate AI</span>
          </h1>
          <p style={{ color: "#9fb3c8", maxWidth: "42rem", margin: "0 auto", fontSize: "1.125rem" }}>
            We're on a mission to help people discover the best products through the power of artificial intelligence.
          </p>
        </div>

        <div style={{ display: "grid", gap: "3rem" }}>
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "1.5rem",
            padding: "2rem",
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#d49a2e" }}>Our Mission</h2>
            <p style={{ color: "#9fb3c8", lineHeight: 1.7 }}>
              In a world flooded with products, making the right choice is harder than ever. We built Affiliate AI to cut through the noise, using advanced AI to analyze thousands of products and deliver personalized recommendations.
            </p>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "1.5rem",
            padding: "2rem",
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#d49a2e" }}>Our Values</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
              {[
                { title: "Transparency", desc: "We clearly disclose affiliate relationships and how we make money." },
                { title: "Accuracy", desc: "Our AI models are trained on verified data and real user reviews." },
                { title: "Independence", desc: "We never let advertisers influence our recommendations." },
                { title: "Privacy", desc: "Your data is never sold or shared with third parties." },
              ].map((value, i) => (
                <div key={i}>
                  <h3 style={{ fontWeight: "600", marginBottom: "0.5rem", color: "#ffffff" }}>{value.title}</h3>
                  <p style={{ color: "#627d98", fontSize: "0.875rem", lineHeight: 1.6 }}>{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1.5rem",
            textAlign: "center",
          }}>
            {[
              { number: "50K+", label: "Active Users" },
              { number: "10K+", label: "Products Curated" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "150+", label: "Categories" },
            ].map((stat, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "1rem",
                padding: "1.5rem",
              }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#d49a2e", marginBottom: "0.5rem" }}>{stat.number}</div>
                <div style={{ color: "#9fb3c8", fontSize: "0.875rem" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
