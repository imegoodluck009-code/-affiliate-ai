export default function BlogPage() {
  const posts = [
    {
      title: "Top 10 AI Gadgets of 2024",
      excerpt: "Discover the most innovative AI-powered devices that are transforming how we live and work.",
      date: "Dec 15, 2024",
      category: "Tech",
      readTime: "5 min read",
    },
    {
      title: "How to Choose the Perfect Wireless Earbuds",
      excerpt: "Our comprehensive guide to finding earbuds that match your lifestyle and budget.",
      date: "Dec 10, 2024",
      category: "Audio",
      readTime: "8 min read",
    },
    {
      title: "Smart Home Setup for Beginners",
      excerpt: "Start your smart home journey with these essential devices and setup tips.",
      date: "Dec 5, 2024",
      category: "Smart Home",
      readTime: "6 min read",
    },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#0a192f", paddingTop: "6rem", color: "#ffffff" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: "bold", marginBottom: "1rem" }}>
            Our <span style={{ background: "linear-gradient(to right, #edc97a, #e5b24a, #d49a2e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Blog</span>
          </h1>
          <p style={{ color: "#9fb3c8", maxWidth: "42rem", margin: "0 auto", fontSize: "1.125rem" }}>
            Insights, reviews, and guides from our AI-powered research team.
          </p>
        </div>

        <div style={{ display: "grid", gap: "1.5rem", maxWidth: "48rem", margin: "0 auto" }}>
          {posts.map((post, i) => (
            <article key={i} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "1rem",
              padding: "1.5rem",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212, 154, 46, 0.2)";
              e.currentTarget.style.transform = "translateX(8px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                <span style={{ color: "#d49a2e", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase" }}>
                  {post.category}
                </span>
                <span style={{ color: "#627d98", fontSize: "0.75rem" }}>{post.date}</span>
                <span style={{ color: "#627d98", fontSize: "0.75rem" }}>{post.readTime}</span>
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#ffffff" }}>
                {post.title}
              </h2>
              <p style={{ color: "#627d98", fontSize: "0.875rem", lineHeight: 1.6 }}>
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
