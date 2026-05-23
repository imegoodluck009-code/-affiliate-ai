'use client'

import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: string
  affiliate_link: string
  image_url: string | null
  created_at: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<<Partial<Product>>({})
  const [saving, setSaving] = useState(false)
  
  const [showForm, setShowForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    affiliate_link: '',
    image_url: ''
  })
  const [creating, setCreating] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  // IMAGE UPLOAD
  async function handleImageUpload(e: React.ChangeEvent<<HTMLInputElement>, isEdit: boolean = false) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (data.url) {
        if (isEdit) {
          setEditForm(prev => ({ ...prev, image_url: data.url }))
        } else {
          setNewProduct(prev => ({ ...prev, image_url: data.url }))
        }
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'))
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('Upload failed. Check console for details.')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      })
      if (res.ok) {
        setNewProduct({ name: '', description: '', price: '', affiliate_link: '', image_url: '' })
        setShowForm(false)
        fetchProducts()
      }
    } catch (err) {
      console.error('Failed to create product:', err)
    } finally {
      setCreating(false)
    }
  }

  function startEdit(product: Product) {
    setEditingId(product.id)
    setEditForm({ ...product })
  }

  function cancelEdit() {
    setEditingId(null)
    setEditForm({})
  }

  async function saveEdit(id: string) {
    setSaving(true)
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editForm }),
      })
      if (res.ok) {
        await fetchProducts()
        setEditingId(null)
        setEditForm({})
      } else {
        console.error('Failed to update product')
      }
    } catch (error) {
      console.error('Error updating product:', error)
    } finally {
      setSaving(false)
    }
  }

  function handleEditChange(field: keyof Product, value: string) {
    setEditForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchProducts()
      }
    } catch (err) {
      console.error('Failed to delete product:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add New Product'}
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  className="input"
                  placeholder="Product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  required
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="input"
                  placeholder="Product description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                <input
                  type="text"
                  required
                  value={newProduct.price}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                  className="input"
                  placeholder="$99.99"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Affiliate Link</label>
                <input
                  type="url"
                  required
                  value={newProduct.affiliate_link}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, affiliate_link: e.target.value }))}
                  className="input"
                  placeholder="https://..."
                />
              </div>
              {/* IMAGE UPLOAD */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, false)}
                  className="input"
                />
                {uploading && <p className="text-sm text-blue-400 mt-1">Uploading...</p>}
                {newProduct.image_url && (
                  <img src={newProduct.image_url} alt="Preview" className="mt-2 h-32 w-32 object-cover rounded-md" />
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={creating || uploading}
                  className="btn-primary"
                >
                  {creating ? 'Creating...' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="card">
              {editingId === product.id ? (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => handleEditChange('description', e.target.value)}
                      rows={3}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                    <input
                      type="text"
                      value={editForm.price || ''}
                      onChange={(e) => handleEditChange('price', e.target.value)}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Affiliate Link</label>
                    <input
                      type="url"
                      value={editForm.affiliate_link || ''}
                      onChange={(e) => handleEditChange('affiliate_link', e.target.value)}
                      className="input"
                    />
                  </div>
                  {/* EDIT IMAGE UPLOAD */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="input"
                    />
                    {uploading && <p className="text-sm text-blue-400 mt-1">Uploading...</p>}
                    {editForm.image_url && (
                      <img src={editForm.image_url} alt="Preview" className="mt-2 h-32 w-32 object-cover rounded-md" />
                    )}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => saveEdit(product.id)}
                      disabled={saving || uploading}
                      className="btn-primary flex-1"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  {product.image_url && (
                    <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                  )}
                  <h2 className="text-xl font-semibold text-white mb-2">{product.name}</h2>
                  <p className="text-gray-300 mb-4 line-clamp-3">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-400">{product.price}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <a
                      href={product.affiliate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors min-w-[100px]"
                    >
                      Buy Now
                    </a>
                    <button
                      onClick={() => startEdit(product)}
                      className="bg-blue-100 text-blue-700 py-2 px-4 rounded-md hover:bg-blue-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-100 text-red-700 py-2 px-4 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    Added {new Date(product.created_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found. Add your first product!</p>
          </div>
        )}
      </div>
    </div>
  )
}
