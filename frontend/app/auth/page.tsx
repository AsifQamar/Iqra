"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (localStorage.getItem("iqra_user")) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    localStorage.setItem("iqra_user", email);
    router.push("/");
  };

  const handleGuest = () => {
    localStorage.setItem("iqra_user", "Guest");
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-24 px-4">
      <div className="brutal-card bg-white text-center">
        <div className="bg-[#FFD166] w-16 h-16 mx-auto flex items-center justify-center border-[3px] border-[#1A1A1A] mb-6 brutal-shadow-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-heading uppercase mb-2">Welcome to Iqra</h1>
        <p className="font-bold text-sm uppercase opacity-60 tracking-widest mb-8">Sign in to track your progress</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 mb-8">
          <input 
            type="email" 
            placeholder="ENTER YOUR EMAIL..." 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="brutal-input text-center text-lg"
            required
          />
          <button type="submit" className="brutal-btn bg-[#06D6A0] text-black">
            LOGIN
          </button>
        </form>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-[3px] border-[#1A1A1A]"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 font-bold text-xs uppercase tracking-widest">OR</span>
          </div>
        </div>

        <button onClick={handleGuest} className="brutal-btn bg-white w-full">
          CONTINUE AS GUEST
        </button>
      </div>
    </div>
  );
}
