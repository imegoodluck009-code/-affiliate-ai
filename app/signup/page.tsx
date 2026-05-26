"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      localStorage.setItem("referral_code", ref);
      fetch("/api/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referralCode: ref }),
      });
    }
  }, [searchParams]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const referralCode = localStorage.getItem("referral_code");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, referralCode }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Account created! Your referral code: " + data.referralCode);
      localStorage.removeItem("referral_code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSignup} className="p-6 bg-gray-800 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-bold text-white mb-4">Sign Up</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full mb-3 p-2 bg-gray-900 rounded text-white" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full mb-4 p-2 bg-gray-900 rounded text-white" required />
        <button type="submit" className="w-full p-2 bg-blue-600 rounded text-white font-medium">Create Account</button>
      </form>
    </div>
  );
}
