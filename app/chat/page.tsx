'use client'

import { useState, useRef, useEffect } from 'react'

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [savedMessage, setSavedMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })

      const data = await res.json()

      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I could not process that.' }])
      }
    } catch (err) {
      console.error('Chat error:', err)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Failed to get response.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleSave = (content: string) => {
    setSavedMessage(content)
    alert('Message saved!')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">AI Assistant</h1>

        <div className="card p-6 mb-6 h-[500px] overflow-y-auto flex flex-col gap-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">Start a conversation with your AI assistant.</p>
              <p className="text-sm mt-2">Ask for product recommendations, blog ideas, or marketing strategies.</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.role === 'assistant' && (
                  <button
                    onClick={() => handleSave(msg.content)}
                    className="mt-2 text-xs text-blue-300 hover:text-blue-200 underline"
                  >
                    Save to Blog
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="input flex-1"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="btn-primary"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>

        {savedMessage && (
          <div className="mt-4 p-4 bg-green-900/30 border border-green-700 rounded-lg">
            <p className="text-sm text-green-400 font-medium">Last saved message:</p>
            <p className="text-sm text-gray-300 mt-1 line-clamp-2">{savedMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}
