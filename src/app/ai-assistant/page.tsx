"use client";

import { useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI Product Advisor powered by GPT-4. I can help you find the perfect products, compare options, and answer questions. What are you looking for today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (data.message) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't process that request. Please try again." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please check your internet and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0a192f", paddingTop: "6rem", color: "#ffffff" }}>
      <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "2rem 1rem", height: "calc(100vh - 6rem)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: "bold", marginBottom: "0.5rem" }}>
            <span style={{ background: "linear-gradient(to right, #edc97a, #e5b24a, #d49a2e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI Product Advisor</span>
          </h1>
          <p style={{ color: "#9fb3c8" }}>Powered by GPT-4 • Ask me anything about products</p>
        </div>

        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "1.5rem",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
              }}>
                <div style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                  background: msg.role === "assistant" ? "linear-gradient(to right, #d49a2e, #b87d24)" : "#334e68",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {msg.role === "assistant" ? <Bot size={16} color="#0a192f" /> : <User size={16} color="#ffffff" />}
                </div>
                <div style={{
                  maxWidth: "80%",
                  padding: "0.75rem 1rem",
                  borderRadius: "1rem",
                  background: msg.role === "assistant" ? "rgba(255,255,255,0.05)" : "rgba(212, 154, 46, 0.1)",
                  color: msg.role === "assistant" ? "#9fb3c8" : "#ffffff",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <div style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                  background: "linear-gradient(to right, #d49a2e, #b87d24)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Bot size={16} color="#0a192f" />
                </div>
                <div style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "1rem",
                  background: "rgba(255,255,255,0.05)",
                  color: "#9fb3c8",
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}>
                  <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} style={{
            padding: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            gap: "0.75rem",
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, comparisons, or recommendations..."
              disabled={isLoading}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.75rem",
                padding: "0.75rem 1rem",
                color: "#ffffff",
                fontSize: "0.875rem",
                outline: "none",
                opacity: isLoading ? 0.5 : 1,
              }}
            />
            <button 
              type="submit" 
              disabled={isLoading}
              style={{
                background: isLoading ? "#627d98" : "linear-gradient(to right, #d49a2e, #b87d24)",
                color: "#0a192f",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
