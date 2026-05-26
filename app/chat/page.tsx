"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: "Error: " + data.error }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I could not process that." }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: Failed to get response." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (content: string) => {
    navigator.clipboard.writeText(content);
    alert("Copied to clipboard!");
  };

  return (
    <div className="pro-page-container">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="pro-section-title">AI Assistant</h1>
          <p className="text-[#94a3b8] mt-1">Generate content and get recommendations</p>
        </div>

        <div className="pro-card p-0 overflow-hidden mb-4" style={{ height: "500px" }}>
          <div className="h-full overflow-y-auto p-6 flex flex-col gap-4">
            {messages.length === 0 && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">🤖</div>
                  <p className="text-lg text-[#94a3b8] mb-2">Start a conversation</p>
                  <p className="text-sm text-[#64748b]">Try: "/blog How to start affiliate marketing"</p>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === "user" ? "bg-[#d4a574] text-[#0f172a]" : "bg-[#1e293b] text-[#f8fafc] border border-[#334155]"}`}>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                  {msg.role === "assistant" && (
                    <button onClick={() => handleSave(msg.content)} className="mt-2 text-xs text-[#d4a574] hover:text-[#e8c9a0]">📋 Copy</button>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#1e293b] p-4 rounded-2xl border border-[#334155]">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-[#d4a574] rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." className="pro-input flex-1" disabled={loading} />
          <button type="submit" disabled={loading || !input.trim()} className="pro-btn px-6">{loading ? "..." : "Send"}</button>
        </form>
      </div>
    </div>
  );
}
