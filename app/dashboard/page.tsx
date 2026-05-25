'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  blog_posts: number
  products: number
  users: number
  earnings: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ blog_posts: 0, products: 0, users: 0, earnings: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await fetch('/api/stats')
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error('Stats load error:', err)
      }
      setLoading(false)
    }
    getStats()
  }, [])

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f23',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#a0a0b0',
      paddingTop: '5rem'
    }}>
      Loading...
    </div>
  )

  const statCards = [
    { 
      title: 'Blog Posts', 
      value: stats.blog_posts.toString(), 
      change: 'Total posts',
      color: '#10b981',
      href: '/blog'
    },
    { 
      title: 'Affiliate Products', 
      value: stats.products.toString(), 
      change: 'Total products',
      color: '#f59e0b',
      href: '/products'
    },
    { 
      title: 'Users', 
      value: stats.users.toString(), 
      change: 'Registered users',
      color: '#667eea',
      href: '#'
    },
    { 
      title: 'Total Earnings', 
      value: '$' + stats.earnings.toFixed(2), 
      change: 'Get started',
      color: '#ef4444',
      href: '#'
    }
  ]

  const features = [
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
      href: '/blog'
    },
    {
      title: 'Products',
      desc: 'Track and manage your affiliate products',
      icon: '🛍️',
      color: '#f59e0b',
      href: '/products'
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f23',
      color: '#e0e0e0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      paddingTop: '5rem'
    }}>
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
            Welcome to Affiliate AI
          </h2>
          <p style={{ margin: 0, color: '#a0a0b0', fontSize: '16px' }}>
            Here's what's happening with your affiliate marketing today.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {statCards.map((stat, i) => (
            <Link key={i} href={stat.href} style={{ textDecoration: 'none' }}>
              <div style={{
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
            </Link>
          ))}
        </div>

        {/* Feature Cards */}
        <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '20px', fontWeight: '600' }}>
          Quick Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {features.map((feature, i) => (
            <Link key={i} href={feature.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px',
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
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
