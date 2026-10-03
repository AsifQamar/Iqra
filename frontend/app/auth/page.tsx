"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("iqra_user")) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    localStorage.setItem("iqra_user", email);
    // Dispatch a storage event so AuthNav updates immediately
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-24 px-4 mb-24">
      <div className="brutal-card bg-white text-center">
        <div className="bg-[#FFD166] w-16 h-16 mx-auto flex items-center justify-center border-[3px] border-[#1A1A1A] mb-6 brutal-shadow-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-heading uppercase mb-2">Welcome to Iqra</h1>
        <p className="font-bold text-sm uppercase opacity-60 tracking-widest mb-8">Sign in to track your progress</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="ENTER YOUR EMAIL..." 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="brutal-input text-center text-lg"
            required
          />
          <input 
            type="password" 
            placeholder="ENTER PASSWORD..." 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="brutal-input text-center text-lg"
            required
          />
          <button type="submit" className="brutal-btn bg-[#06D6A0] text-black mt-4">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
