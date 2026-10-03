"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  score: number;
  total: number;
  performance: any[];
}

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("iqra_user");
    setUser(loggedInUser);

    if (loggedInUser) {
      const historyStr = localStorage.getItem("iqra_history");
      if (historyStr) {
        try {
          setHistory(JSON.parse(historyStr));
        } catch (e) {
          console.error("Failed to parse history");
        }
      }
    }
  }, [router]);

  const handleReview = (item: HistoryItem) => {
    // Save to session storage so the revision page can pick it up
    sessionStorage.setItem("iqra_performance", JSON.stringify(item.performance));
    router.push("/revision");
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-heading uppercase text-[#1A1A1A] mb-2">Your History</h1>
          {user && (
            <p className="font-bold text-sm uppercase tracking-widest bg-white inline-block px-3 py-1 brutal-border shadow-[2px_2px_0px_0px_#1A1A1A]">
              LOGGED IN AS: <span className="text-[#EF476F]">{user}</span>
            </p>
          )}
        </div>
        <Link href="/" className="brutal-btn bg-white">
          ← BACK TO DASHBOARD
        </Link>
      </div>

      {!user ? (
        <div className="brutal-card bg-white text-center py-20">
          <h2 className="text-3xl font-heading uppercase mb-4 text-[#EF476F]">Guest Mode Active</h2>
          <p className="font-sans mb-6">You are currently using Iqra as a guest. Your quiz history is not saved.</p>
          <Link href="/auth" className="brutal-btn bg-[#06D6A0] inline-block">
            LOGIN TO TRACK HISTORY →
          </Link>
        </div>
      ) : history.length === 0 ? (
        <div className="brutal-card bg-white text-center py-20">
          <h2 className="text-3xl font-heading uppercase mb-4 text-gray-400">No History Yet</h2>
          <p className="font-sans mb-6">Complete a drill to see your past performance here.</p>
          <Link href="/#upload-form" className="brutal-btn bg-[#FFD166] inline-block">
            START LEARNING →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {history.slice().reverse().map((item) => (
            <div key={item.id} className="brutal-card-interactive flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#118AB2] text-white px-2 py-1 font-bold text-xs uppercase brutal-border shadow-[2px_2px_0px_0px_#1A1A1A]">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                  <span className="font-heading text-xl">
                    {item.score}/{item.total}
                  </span>
                </div>
                <h3 className="font-heading text-2xl uppercase mb-6 leading-tight">{item.title}</h3>
              </div>
              <button 
                onClick={() => handleReview(item)}
                className="brutal-btn bg-[#FFD166] w-full mt-auto"
              >
                REVIEW ANSWERS →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
