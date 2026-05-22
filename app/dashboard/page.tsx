'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        
        if (!data.user) {
          window.location.href = '/auth'
        } else {
          setUser(data.user)
        }
      } catch (err) {
        window.location.href = '/auth'
      }
      setLoading(false)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/auth'
  }

  if (loading) return <div style={{ padding: '40px' }}>Loading...</div>
  if (!user) return null

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#f5f5f5',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Navbar */}
      <nav style={{
        background: 'white',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: 0, color: '#667eea' }}>Affiliate AI</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ color: '#666' }}>{user.email}</span>
          <button 
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '30px' }}>Dashboard</h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {/* Stats Cards */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>AI Chat</h3>
            <p style={{ color: '#666' }}>Talk to your AI assistant</p>
            <a href="/" style={{
              display: 'inline-block',
              marginTop: '15px',
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Open Chat →
            </a>
          </div>

          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Blog Posts</h3>
            <p style={{ color: '#666' }}>Manage your content</p>
            <span style={{
              display: 'inline-block',
              marginTop: '15px',
              color: '#999',
              fontWeight: 'bold'
            }}>
              Coming Soon
            </span>
          </div>

          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Products</h3>
            <p style={{ color: '#666' }}>Track affiliate products</p>
            <span style={{
              display: 'inline-block',
              marginTop: '15px',
              color: '#999',
              fontWeight: 'bold'
            }}>
              Coming Soon
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
