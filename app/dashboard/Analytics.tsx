"use client";
import { useEffect, useState } from "react";

export default function Analytics({ userId }: { userId: string }) {
  const [stats, setStats] = useState({ clicks: 0, signups: 0, conversionRate: "0%" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/analytics?userId=${userId}`)
      .then(r => r.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div className="p-4 text-gray-400">Loading...</div>;

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-3">📊 Referral Analytics</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-gray-900 rounded">
          <p className="text-2xl font-bold text-blue-400">{stats.clicks}</p>
          <p className="text-xs text-gray-500 mt-1">Clicks</p>
        </div>
        <div className="text-center p-3 bg-gray-900 rounded">
          <p className="text-2xl font-bold text-green-400">{stats.signups}</p>
          <p className="text-xs text-gray-500 mt-1">Signups</p>
        </div>
        <div className="text-center p-3 bg-gray-900 rounded">
          <p className="text-2xl font-bold text-purple-400">{stats.conversionRate}</p>
          <p className="text-xs text-gray-500 mt-1">Conversion</p>
        </div>
      </div>
    </div>
  );
}
