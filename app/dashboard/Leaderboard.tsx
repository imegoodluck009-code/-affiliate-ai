"use client";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then(r => r.json())
      .then(data => {
        setLeaders(data.leaderboard || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 text-gray-400">Loading...</div>;

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-3">🏆 Top Referrers</h3>
      {leaders.length === 0 ? (
        <p className="text-gray-400 text-sm">No referrals yet.</p>
      ) : (
        <div className="space-y-2">
          {leaders.map((leader, i) => (
            <div key={leader.id} className="flex items-center justify-between p-2 bg-gray-900 rounded">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === 0 ? 'bg-yellow-500 text-black' : 
                  i === 1 ? 'bg-gray-400 text-black' : 
                  i === 2 ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}>{i + 1}</span>
                <span className="text-sm text-gray-300 truncate">{leader.email}</span>
              </div>
              <span className="text-sm font-mono text-green-400">{leader.signups} signups</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
