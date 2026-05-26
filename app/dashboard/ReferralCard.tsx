"use client";
import { useState, useEffect } from "react";

export default function ReferralCard({ userId }: { userId: string }) {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fetch user's referral code from your API or build it if you store it client-side
    // For now, we'll assume you have an endpoint or you can hardcode the pattern:
    setLink(`${window.location.origin}/signup?ref=${userId.slice(0, 6).toUpperCase()}`);
  }, [userId]);

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <p className="text-sm text-gray-400 mb-2">Share & earn</p>
      <div className="flex gap-2">
        <input 
          value={link} 
          readOnly 
          className="flex-1 bg-gray-900 px-3 py-2 rounded text-sm font-mono text-green-400"
        />
        <button 
          onClick={() => {
            navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="px-4 py-2 bg-blue-600 rounded text-sm font-medium"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Anyone who signs up with your link gets tracked.</p>
    </div>
  );
}
