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

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f23',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#a0a0b0'
    }}>
      Loading...
    </div>
  )
  if (!user) return null

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f23',
      color: '#e0e0e0',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Navbar */}
      <nav style={{
        background: 'rgba(15, 15, 35, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: '18px'
          }}>
            A
          </div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#fff' }}>
            Affiliate AI
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              background: '#4ade80',
              borderRadius: '50%'
            }} />
            <span style={{ fontSize: '14px', color: '#a0a0b0' }}>{user.email}</span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 24px',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Welcome Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', color: '#fff' }}>
            Welcome back, {user.user_metadata?.name || user.email.split('@')[0]}!
          </h2>
          <p style={{ margin: 0, color: '#a0a0b0', fontSize: '16px' }}>
            Here's what's happening with your affiliate marketing today.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {[
            { title: 'AI Chat Sessions', value: '24', change: '+12%', color: '#667eea' },
            { title: 'Blog Posts', value: '8', change: '+3 this week', color: '#10b981' },
            { title: 'Affiliate Products', value: '15', change: '+5 new', color: '#f59e0b' },
            { title: 'Total Earnings', value: '$0.00', change: 'Get started', color: '#ef4444' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '24px',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = stat.color + '40'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '16px'
              }}>
                <h3 style={{ margin: 0, fontSize: '14px', color: '#a0a0b0', fontWeight: '500' }}>
                  {stat.title}
                </h3>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: stat.color,
                  borderRadius: '50%',
                  boxShadow: `0 0 12px ${stat.color}60`
                }} />
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '13px', color: stat.color, fontWeight: '600' }}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '20px', fontWeight: '600' }}>
          Quick Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '20px'
        }}>
          {[
            { 
              title: 'AI Assistant', 
              desc: 'Chat with your AI to generate content and get recommendations',
              icon: '🤖',
              color: '#667eea',
              href: '/chat'
            },
            { 
              title: 'Blog Posts', 
              desc: 'Create and manage AI-generated blog content',
              icon: '📝',
              color: '#10b981',
              href: '/products'
            },
            { 
              title: 'Products', 
              desc: 'Track and manage your affiliate products',
              icon: '🛍️',
              color: '#f59e0b',
              href: '/products'
            }
          ].map((feature, i) => (
            <a key={i} href={feature.href} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '28px',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = feature.color + '40'
              e.currentTarget.style.background = feature.color + '08'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            }}
            >
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{feature.icon}</div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#fff', fontWeight: '600' }}>
                {feature.title}
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#a0a0b0', lineHeight: 1.5 }}>
                {feature.desc}
              </p>
              <div style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: feature.color,
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Get Started →
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}
