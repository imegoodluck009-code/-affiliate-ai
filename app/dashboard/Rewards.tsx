"use client";
import { useEffect, useState } from "react";

const TIERS = [
  { name: "Bronze", min: 1, color: "text-orange-400", bg: "bg-orange-900/30", border: "border-orange-700" },
  { name: "Silver", min: 5, color: "text-gray-300", bg: "bg-gray-700/30", border: "border-gray-500" },
  { name: "Gold", min: 10, color: "text-yellow-400", bg: "bg-yellow-900/30", border: "border-yellow-600" },
  { name: "Platinum", min: 25, color: "text-purple-400", bg: "bg-purple-900/30", border: "border-purple-500" },
];

export default function Rewards({ userId }: { userId: string }) {
  const [signups, setSignups] = useState(0);

  useEffect(() => {
    fetch(`/api/referrals?userId=${userId}`)
      .then(r => r.json())
      .then(data => setSignups(data.referrals || 0));
  }, [userId]);

  const currentTier = [...TIERS].reverse().find(t => signups >= t.min);
  const nextTier = TIERS.find(t => t.min > signups);
  const progress = nextTier ? (signups / nextTier.min * 100) : 100;

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-3">🎁 Rewards</h3>
      <div className="mb-4">
        <p className="text-sm text-gray-400">Current: <span className={currentTier?.color || "text-gray-500"}>{currentTier?.name || "None"}</span></p>
        <p className="text-xs text-gray-500 mt-1">{signups} total referrals</p>
      </div>
      {nextTier && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progress to {nextTier.name}</span>
            <span>{signups} / {nextTier.min}</span>
          </div>
          <div className="w-full bg-gray-900 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {TIERS.map(tier => (
          <div key={tier.name} className={`p-2 rounded border ${tier.min <= signups ? tier.border + ' ' + tier.bg : 'border-gray-800 bg-gray-900/50 opacity-50'}`}>
            <p className={`text-sm font-bold ${tier.min <= signups ? tier.color : 'text-gray-600'}`}>{tier.name}</p>
            <p className="text-xs text-gray-500">{tier.min}+ referrals</p>
          </div>
        ))}
      </div>
    </div>
  );
}
