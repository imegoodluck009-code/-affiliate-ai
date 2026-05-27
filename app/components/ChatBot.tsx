"use client";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: 'user' | 'assistant';
  content: string;
  action?: any;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '👋 Hi! I\'m AffiliateBot. I can help you with referrals, campaigns, support, or collect your email for updates. What do you need?' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const messagesEndRef = useRef<<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string = input) => {
    if (!text.trim()) return;
    setLoading(true);
    setInput("");
    
    const newMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMessages);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, sessionToken })
    });
    
    const data = await res.json();
    setLoading(false);
    
    if (data.sessionToken) setSessionToken(data.sessionToken);
    
    setMessages([...newMessages, { role: 'assistant', content: data.reply, action: data.action }]);
    
    // Show special forms based on intent
    if (data.action?.type === 'lead') setShowEmailForm(true);
    if (data.action?.type === 'support') setShowTicketForm(true);
  };

  const submitLead = async () => {
    if (!formData.email.includes('@')) return alert('Valid email required');
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email, name: formData.name, interest: 'chatbot signup' })
    });
    setShowEmailForm(false);
    setMessages([...messages, { role: 'assistant', content: '✅ Thanks! Your email has been saved. We\'ll send you updates.' }]);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const submitTicket = async () => {
    if (!formData.email.includes('@') || !formData.subject || !formData.message) return;
    await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email, subject: formData.subject, message: formData.message })
    });
    setShowTicketForm(false);
    setMessages([...messages, { role: 'assistant', content: '✅ Support ticket created! Our team will respond within 24 hours.' }]);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const quickActions = [
    { label: '🎁 Referral Link', action: () => sendMessage('I want my referral link') },
    { label: '📧 Get Updates', action: () => { setShowEmailForm(true); setIsOpen(true); } },
    { label: '🆘 Support', action: () => { setShowTicketForm(true); setIsOpen(true); } },
    { label: '📊 Campaign Help', action: () => sendMessage('Help with my ad campaign') }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-blue-600 p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white">🤖 AffiliateBot</h3>
              <p className="text-xs text-blue-200">AI Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 text-xl">×</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-gray-800 text-gray-200 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 p-3 rounded-xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Email Form */}
            {showEmailForm && (
              <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
                <p className="text-sm text-gray-300 mb-2">📧 Get marketing updates</p>
                <input 
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full mb-2 p-2 bg-gray-900 rounded text-sm text-white border border-gray-700"
                />
                <input 
                  placeholder="Email address" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full mb-2 p-2 bg-gray-900 rounded text-sm text-white border border-gray-700"
                />
                <button onClick={submitLead} className="w-full p-2 bg-green-600 rounded text-sm font-bold text-white">Subscribe</button>
              </div>
            )}

            {/* Ticket Form */}
            {showTicketForm && (
              <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
                <p className="text-sm text-gray-300 mb-2">🎫 Create support ticket</p>
                <input 
                  placeholder="Your email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full mb-2 p-2 bg-gray-900 rounded text-sm text-white border border-gray-700"
                />
                <input 
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full mb-2 p-2 bg-gray-900 rounded text-sm text-white border border-gray-700"
                />
                <textarea 
                  placeholder="Describe your issue..." 
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full mb-2 p-2 bg-gray-900 rounded text-sm text-white border border-gray-700 h-20"
                />
                <button onClick={submitTicket} className="w-full p-2 bg-red-600 rounded text-sm font-bold text-white">Submit Ticket</button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-2 border-t border-gray-800 flex gap-2 overflow-x-auto">
            {quickActions.map((action, i) => (
              <button 
                key={i} 
                onClick={action.action}
                className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300 hover:bg-gray-700 whitespace-nowrap"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-800 flex gap-2">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 p-2 bg-gray-800 rounded-lg text-sm text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button 
              onClick={() => sendMessage()}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 rounded-lg text-white font-bold hover:bg-blue-500 disabled:bg-gray-700"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-500 transition hover:scale-110"
      >
        {isOpen ? '✕' : '🤖'}
      </button>
    </div>
  );
}
