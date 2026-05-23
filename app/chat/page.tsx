'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  type?: 'blog' | 'product' | 'general'
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am your Affiliate AI assistant. I can help you:\\n\\n• Write blog posts\\n• Create product descriptions\\n• Generate marketing content\\n\\nCommands:\\n/blog [topic] - Generate a blog post\\n/product [name] - Generate product description\\n\\nOr just ask me anything!',
      type: 'general'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [savedMessage, setSavedMessage] = useState('')
  const messagesEndRef = useRef<<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)
    setSavedMessage('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })

      const data = await res.json()

      if (data.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          type: 'general'
        }])
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.reply,
          type: data.type || 'general'
        }])
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        type: 'general'
      }])
    } finally {
      setLoading(false)
    }
  }

  const saveAsBlog = async (content: string) => {
    try {
      const lines = content.split('\n')
      const title = lines[0].replace(/^#+ /, '').slice(0, 100) || 'AI Generated Post'
      const body = content

      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content: body })
      })

      if (res.ok) {
        setSavedMessage('✅ Saved to Blog Posts!')
        setTimeout(() => setSavedMessage(''), 3000)
      }
    } catch (err) {
      setSavedMessage('❌ Failed to save')
    }
  }

  const saveAsProduct = async (content: string) => {
    try {
      const lines = content.split('\n')
      const name = lines[0].replace(/^#+ /, '').slice(0, 100) || 'New Product'
      
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description: content,
          price: '$0.00',
          affiliate_link: '#'
        })
      })

      if (res.ok) {
        setSavedMessage('✅ Saved to Products!')
        setTimeout(() => setSavedMessage(''), 3000)
      }
    } catch (err) {
      setSavedMessage('❌ Failed to save')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f23',
      color: '#e0e0e0',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
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
          <h1 style={{ margin: 0, fontSize: '20px', color: '#fff' }}>AI Assistant</h1>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {savedMessage && (
            <span style={{
              padding: '8px 16px',
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600'
            }}>{savedMessage}</span>
          )}
          <a href="/dashboard" style={{
            color: '#a0a0b0',
            textDecoration: 'none',
            fontSize: '14px'
          }}>← Dashboard</a>
        </div>
      </nav>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '32px',
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <div style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              padding: '16px 20px',
              borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #667eea, #764ba2)'
                : 'rgba(255,255,255,0.05)',
              border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              fontSize: '15px',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              marginBottom: msg.role === 'assistant' ? '12px' : '0'
            }}>
              {msg.content}
            </div>
            
            {msg.role === 'assistant' && i > 0 && (
              <div style={{
                display: 'flex',
                gap: '10px',
                marginLeft: '10px'
              }}>
                {msg.type === 'blog' && (
                  <button
                    onClick={() => saveAsBlog(msg.content)}
                    style={{
                      padding: '6px 14px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    💾 Save as Blog
                  </button>
                )}
                {msg.type === 'product' && (
                  <button
                    onClick={() => saveAsProduct(msg.content)}
                    style={{
                      padding: '6px 14px',
                      background: 'rgba(245, 158, 11, 0.1)',
                      color: '#f59e0b',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    💾 Save as Product
                  </button>
                )}
                {msg.type === 'general' && (
                  <>
                    <button
                      onClick={() => saveAsBlog(msg.content)}
                      style={{
                        padding: '6px 14px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#10b981',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      💾 Save as Blog
                    </button>
                    <button
                      onClick={() => saveAsProduct(msg.content)}
                      style={{
                        padding: '6px 14px',
                        background: 'rgba(245, 158, 11, 0.1)',
                        color: '#f59e0b',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      💾 Save as Product
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{
            alignSelf: 'flex-start',
            padding: '16px 20px',
            borderRadius: '20px 20px 20px 4px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#a0a0b0'
          }}>
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '20px 32px',
        background: 'rgba(15, 15, 35, 0.9)'
      }}>
        <form onSubmit={handleSubmit} style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          gap: '12px'
        }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Try: /blog best fitness trackers 2026"
            disabled={loading}
            style={{
              flex: 1,
              padding: '14px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              fontSize: '15px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              padding: '14px 28px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              opacity: loading || !input.trim() ? 0.6 : 1
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
