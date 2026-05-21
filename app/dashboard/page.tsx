'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const session = localStorage.getItem('supabaseSession')
    if (!session) {
      window.location.href = '/auth'
    } else {
      setUser(JSON.parse(session).user)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('supabaseSession')
    window.location.href = '/auth'
  }

  if (!user) return <div>Loading...</div>

  return (
    <div style={{ padding: '40px' }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}!</p>
      <button onClick={handleLogout} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  )
}
