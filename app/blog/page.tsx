'use client'

import { useEffect, useState } from 'react'

interface BlogPost {
  id: string
title: string
  content: string
  image_url: string | null
  created_at: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState({ title: '', content: '', image_url: '' })
  const [editPost, setEditPost] = useState<BlogPost | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)

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

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) {
    const file = e.target.files?.[0]

    setUploading(true)
    try {
      const formData = new FormData()
   if (file) formData.append('file', file)


      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (data.url) {
        if (isEdit && editPost) {
          setEditPost({ ...editPost, image_url: data.url })
        } else {
          setNewPost(prev => ({ ...prev, image_url: data.url }))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      })
      if (res.ok) {
        setNewPost({ title: '', content: '', image_url: '' })
        setShowForm(false)
        fetchPosts()
      } else {
        const error = await res.json()
        alert('Failed to create post: ' + (error.error || 'Unknown error'))
      }
    } catch (err) {
      console.error('Failed to create post:', err)
      alert('Failed to create post. Check console.')
    }
  }

 const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/blog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editPost!.id,
          title: editPost!.title,
          content: editPost!.content,
          image_url: editPost!.image_url
        })
      })
      if (res.ok) {
        setEditPost(null)
        fetchPosts()
      } else {
        const error = await res.json()
        alert('Failed to update post: ' + (error.error || 'Unknown error'))
      }
    } catch (err) {
      console.error('Failed to update post:', err)
      alert('Failed to update post. Check console.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/blog?id=' + id, { method: 'DELETE' })
      if (res.ok) {
        fetchPosts()
      } else {
        alert('Failed to delete post')
      }
    } catch (err) {
      console.error('Failed to delete post:', err)
      alert('Failed to delete post. Check console.')
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
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
          <button
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ New Post'}
          </button>
        </div>

        {showForm && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Create New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  className="input"
                  placeholder="Post title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
                <textarea
                  required
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="input"
                  placeholder="Write your post content..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Post Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, false)}
                  className="input"
                />
                {uploading && <p className="text-sm text-blue-400 mt-1">Uploading...</p>}
                {newPost.image_url && (
                  <img src={newPost.image_url} alt="Preview" className="mt-2 h-32 w-32 object-cover rounded-md" />
                )}
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Create Post'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {editPost && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Edit Post</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editPost.title}
                  onChange={(e) => setEditPost(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
                <textarea
                  required
                  value={editPost.content}
                  onChange={(e) => setEditPost(prev => prev ? { ...prev, content: e.target.value } : null)}
                  rows={6}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Post Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  className="input"
                />
                {uploading && <p className="text-sm text-blue-400 mt-1">Uploading...</p>}
                {editPost.image_url && (
                  <img src={editPost.image_url} alt="Preview" className="mt-2 h-32 w-32 object-cover rounded-md" />
                )}
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Update Post'}
                </button>
                <button type="button" onClick={() => setEditPost(null)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="card p-6">
              {post.image_url && (
                <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
              )}
              <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
              <p className="text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditPost(post); setShowForm(false) }}
                    className="bg-blue-100 text-blue-700 py-1 px-3 rounded-md hover:bg-blue-200 transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-100 text-red-700 py-1 px-3 rounded-md hover:bg-red-200 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No posts yet. Create your first blog post!</p>
          </div>
        )}
      </div>
    </div>
  )
}
