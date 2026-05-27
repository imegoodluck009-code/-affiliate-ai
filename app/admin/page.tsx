"use client";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";

export default function AdminPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'tickets' | 'chats'>('leads');

  useEffect(() => {
    fetch('/api/leads').then(r => r.json()).then(d => setLeads(d.leads || []));
    fetch('/api/tickets').then(r => r.json()).then(d => setTickets(d.tickets || []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">🛠️ Admin Panel</h1>
        
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'leads' ? 'bg-blue-600' : 'bg-gray-800'}`}
          >
            📧 Leads ({leads.length})
          </button>
          <button 
            onClick={() => setActiveTab('tickets')}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'tickets' ? 'bg-blue-600' : 'bg-gray-800'}`}
          >
            🎫 Tickets ({tickets.length})
          </button>
        </div>

        {activeTab === 'leads' && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-3 text-left text-sm">Email</th>
                  <th className="p-3 text-left text-sm">Name</th>
                  <th className="p-3 text-left text-sm">Interest</th>
                  <th className="p-3 text-left text-sm">Date</th>
                  <th className="p-3 text-left text-sm">Converted</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id} className="border-t border-gray-800">
                    <td className="p-3 text-sm">{lead.email}</td>
                    <td className="p-3 text-sm">{lead.name || '-'}</td>
                    <td className="p-3 text-sm">{lead.interest || '-'}</td>
                    <td className="p-3 text-sm">{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td className="p-3 text-sm">{lead.converted ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="space-y-4">
            {tickets.map(ticket => (
              <div key={ticket.id} className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">{ticket.subject}</h3>
                    <p className="text-sm text-gray-400">{ticket.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    ticket.status === 'open' ? 'bg-red-600' :
                    ticket.status === 'in_progress' ? 'bg-yellow-600' :
                    ticket.status === 'resolved' ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{ticket.message}</p>
                <div className="flex gap-2">
                  <button onClick={async () => {
                    await fetch('/api/tickets', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: ticket.id, status: 'in_progress' }) });
                    window.location.reload();
                  }} className="px-3 py-1 bg-yellow-600 rounded text-xs">Mark In Progress</button>
                  <button onClick={async () => {
                    await fetch('/api/tickets', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: ticket.id, status: 'resolved' }) });
                    window.location.reload();
                  }} className="px-3 py-1 bg-green-600 rounded text-xs">Resolve</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
