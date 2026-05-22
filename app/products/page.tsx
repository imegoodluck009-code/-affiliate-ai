'use client'

import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: string
  affiliate_link: string
  created_at: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', affiliate_link: '' })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data.products || [])
    } catch (err) {
      console.error('Failed to fetch products:', err)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      })
      if (res.ok) {
        setNewProduct({ name: '', description: '', price: '', affiliate_link: '' })
        setShowForm(false)
        fetchProducts()
      }
    } catch (err) {
      console.error('Failed to create product:', err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
      fetchProducts()
    } catch (err) {
      console.error('Failed to delete product:', err)
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
          <h1 style={{ margin: 0, fontSize: '20px', color: '#fff' }}>Products</h1>
        </div>
        <a href="/dashboard" style={{
          color: '#a0a0b0',
          textDecoration: 'none',
          fontSize: '14px'
        }}>← Back to Dashboard</a>
      </nav>

      <main style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <h2 style={{ margin: 0, fontSize: '24px' }}>Your Affiliate Products</h2>
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
            {showForm ? 'Cancel' : '+ Add Product'}
          </button>
        </div>

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
              placeholder="Product Name"
              value={newProduct.name}
              onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px'
              }}
            />
            <textarea
              placeholder="Product Description"
              value={newProduct.description}
              onChange={e => setNewProduct({...newProduct, description: e.target.value})}
              required
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px'
              }}
            />
            <input
              type="text"
              placeholder="Price (e.g. $29.99)"
              value={newProduct.price}
              onChange={e => setNewProduct({...newProduct, price: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px'
              }}
            />
            <input
              type="url"
              placeholder="Affiliate Link (URL)"
              value={newProduct.affiliate_link}
              onChange={e => setNewProduct({...newProduct, affiliate_link: e.target.value})}
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
            <button type="submit" style={{
              padding: '12px 24px',
              background: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Save Product
            </button>
          </form>
        )}

        {products.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#a0a0b0'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
            <h3 style={{ color: '#fff', marginBottom: '8px' }}>No products yet</h3>
            <p>Add your first affiliate product or use the AI Assistant to generate descriptions!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {products.map(product => (
              <div key={product.id} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '24px'
              }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#fff', fontSize: '18px' }}>
                  {product.name}
                </h3>
                <p style={{ color: '#a0a0b0', fontSize: '14px', marginBottom: '12px' }}>
                  {product.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <span style={{ color: '#f59e0b', fontSize: '20px', fontWeight: 'bold' }}>
                    {product.price}
                  </span>
                </div>
                <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer" style={{
                  display: 'block',
                  padding: '10px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: '600',
                  marginBottom: '12px'
                }}>
                  View Product →
                </a>
                <button
                  onClick={() => handleDelete(product.id)}
                  style={{
                    width: '100%',
                    padding: '8px',
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
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
