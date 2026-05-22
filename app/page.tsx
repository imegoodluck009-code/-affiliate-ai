export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '60px 40px',
        maxWidth: '600px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          Affiliate AI
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '40px',
          opacity: 0.9,
          lineHeight: 1.6
        }}>
          AI-powered affiliate marketing platform. 
          Generate content, track products, and boost your earnings.
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/auth" style={{
            background: 'white',
            color: '#667eea',
            padding: '15px 40px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            Get Started
          </a>
          
          <a href="/dashboard" style={{
            background: 'transparent',
            color: 'white',
            padding: '15px 40px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: '2px solid white',
            transition: 'transform 0.2s'
          }}>
            Dashboard
          </a>
        </div>

        <div style={{
          marginTop: '50px',
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>AI Chat</h3>
            <p style={{ opacity: 0.8 }}>Smart assistant</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Products</h3>
            <p style={{ opacity: 0.8 }}>Track affiliates</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Blog</h3>
            <p style={{ opacity: 0.8 }}>AI-generated posts</p>
          </div>
        </div>
      </div>

      <p style={{ marginTop: '40px', opacity: 0.6, fontSize: '0.9rem' }}>
        Powered by Groq AI & Supabase
      </p>
    </div>
  )
}
