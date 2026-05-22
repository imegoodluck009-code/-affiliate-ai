'use client'

import { useEffect, useState } from 'react'

interface BlogPost {
  id: string
  title: string
  content: string
  created_at: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState({ title: '', content: '' })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog')
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (err) {
      console.error('Failed to fetch posts:', err)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      })
      if (res.ok) {
        setNewPost({ title: '', content: '' })
        setShowForm(false)
        fetchPosts()
      }
    } catch (err) {
      console.error('Failed to create post:', err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/blog?id=${id}`, { method: 'DELETE' })
      fetchPosts()
    } catch (err) {
      console.error('Failed to delete post:', err)
    }
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f23',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#a0a0b0'
    }}>Loading...</div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f23',
      color: '#e0e0e0',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Header */}
      <nav style={{
        background: 'rgba(15, 15, 35, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', color: 'white'
          }}>A</div>
          <h1 style={{ margin: 0, fontSize: '20px', color: '#fff' }}>Blog Posts</h1>
        </div>
        <a href="/dashboard" style={{
          color: '#a0a0b0',
          textDecoration: 'none',
          fontSize: '14px'
        }}>← Back to Dashboard</a>
      </nav>

      <main style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <h2 style={{ margin: 0, fontSize: '24px' }}>Your Blog Posts</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {showForm ? 'Cancel' : '+ New Post'}
          </button>
        </div>

        {/* New Post Form */}
        {showForm && (
          <form onSubmit={handleSubmit} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <input
              type="text"
              placeholder="Post Title"
              value={newPost.title}
              onChange={e => setNewPost({...newPost, title: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px'
              }}
            />
            <textarea
              placeholder="Write your blog post content..."
              value={newPost.content}
              onChange={e => setNewPost({...newPost, content: e.target.value})}
              required
              rows={6}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                resize: 'vertical'
              }}
            />
            <button type="submit" style={{
              padding: '12px 24px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Save Post
            </button>
          </form>
        )}

        {/* Posts List */}
        {posts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#a0a0b0'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <h3 style={{ color: '#fff', marginBottom: '8px' }}>No blog posts yet</h3>
            <p>Click "New Post" to create your first blog post, or use the AI Assistant to generate one!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {posts.map(post => (
              <div key={post.id} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '24px'
              }}>
                <h3 style={{ margin: '0 0 12px 0', color: '#fff', fontSize: '18px' }}>
                  {post.title}
                </h3>
                <p style={{
                  color: '#a0a0b0',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {post.content}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#667eea', fontSize: '12px' }}>
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
