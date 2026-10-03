"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthNav() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Basic check for user session
    const checkUser = () => {
      setUser(localStorage.getItem("iqra_user"));
    };
    checkUser();
    
    // Listen for storage changes in other tabs
    window.addEventListener("storage", checkUser);
    
    // For same-tab updates, we could use a custom event or just poll (simple hack)
    const interval = setInterval(checkUser, 1000);
    
    return () => {
      window.removeEventListener("storage", checkUser);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("iqra_user");
    setUser(null);
    router.push("/");
  };

  return (
    <div className="flex items-center gap-3">
      <Link href="/store" className="bg-white text-[#1A1A1A] border-[3px] border-[#1A1A1A] font-bold text-xs tracking-[0.1em] px-5 py-2 hover:bg-gray-50 uppercase shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-y-[2px] active:translate-x-[2px] transition-all">
        Rewards Store
      </Link>
      
      {user ? (
        <button onClick={handleLogout} className="bg-[#EF476F] text-white border-[3px] border-[#1A1A1A] font-bold text-xs tracking-[0.1em] px-5 py-2 hover:bg-[#d43d60] uppercase shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-y-[2px] active:translate-x-[2px] transition-all">
          Logout
        </button>
      ) : (
        <Link href="/auth" className="bg-[#06D6A0] text-black border-[3px] border-[#1A1A1A] font-bold text-xs tracking-[0.1em] px-5 py-2 hover:bg-[#05b889] uppercase shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-y-[2px] active:translate-x-[2px] transition-all">
          Login
        </Link>
      )}

      <Link href="/#upload-form" className="bg-[#FFD166] text-[#1A1A1A] border-[3px] border-[#1A1A1A] font-bold text-xs tracking-[0.1em] px-5 py-2 hover:bg-[#ffc640] uppercase shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-y-[2px] active:translate-x-[2px] transition-all flex items-center gap-2">
        Upload Material
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
