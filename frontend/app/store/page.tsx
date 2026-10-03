"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Reward {
  id: string;
  name: string;
  cost: number;
  color: string;
  icon: string;
  purchased: boolean;
}

export default function Store() {
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState<Reward[]>([
    { id: "1", name: "Ninja Avatar", cost: 50, color: "bg-[#EF476F]", icon: "🥷", purchased: false },
    { id: "2", name: "Genius Sticker", cost: 100, color: "bg-[#FFD166]", icon: "🧠", purchased: false },
    { id: "3", name: "Hacker Theme", cost: 200, color: "bg-[#06D6A0]", icon: "💻", purchased: false },
    { id: "4", name: "Golden Crown", cost: 500, color: "bg-[#118AB2]", icon: "👑", purchased: false },
  ]);

  useEffect(() => {
    const savedPoints = parseInt(localStorage.getItem("iqra_points") || "0");
    setPoints(savedPoints);
    
    const savedPurchases = JSON.parse(localStorage.getItem("iqra_purchases") || "{}");
    if (Object.keys(savedPurchases).length > 0) {
      setRewards(r => r.map(reward => ({
        ...reward,
        purchased: !!savedPurchases[reward.id]
      })));
    }
  }, []);

  const handlePurchase = (reward: Reward) => {
    if (reward.purchased || points < reward.cost) return;
    
    const newPoints = points - reward.cost;
    setPoints(newPoints);
    localStorage.setItem("iqra_points", newPoints.toString());
    
    const savedPurchases = JSON.parse(localStorage.getItem("iqra_purchases") || "{}");
    savedPurchases[reward.id] = true;
    localStorage.setItem("iqra_purchases", JSON.stringify(savedPurchases));
    
    setRewards(r => r.map(rw => rw.id === reward.id ? { ...rw, purchased: true } : rw));
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-12 brutal-card bg-white">
        <div>
          <h1 className="text-4xl font-black uppercase text-[#1A1A1A]">Rewards Store</h1>
          <p className="font-mono mt-2 opacity-80">Spend your active recall points here.</p>
        </div>
        <div className="bg-[#FFD166] brutal-border px-8 py-4 flex flex-col items-center transform rotate-2">
          <span className="font-black text-sm uppercase mb-1">Your Balance</span>
          <span className="font-black text-5xl">{points} <span className="text-[#EF476F]">★</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rewards.map(reward => (
          <div key={reward.id} className={`brutal-card ${reward.purchased ? 'bg-gray-100 opacity-70' : reward.color} flex flex-col items-center text-center`}>
            <div className="text-6xl mb-4 bg-white p-4 brutal-border rounded-full w-24 h-24 flex items-center justify-center">
              {reward.icon}
            </div>
            <h3 className="font-black text-2xl uppercase mb-2 text-black">{reward.name}</h3>
            
            <div className="mt-auto pt-4 w-full">
              {reward.purchased ? (
                <button className="brutal-btn w-full bg-[#1A1A1A] text-white opacity-50 cursor-not-allowed">
                  OWNED
                </button>
              ) : (
                <button 
                  onClick={() => handlePurchase(reward)}
                  disabled={points < reward.cost}
                  className={`brutal-btn w-full ${points >= reward.cost ? 'bg-white text-black' : 'bg-gray-300 text-gray-500'}`}
                >
                  {points >= reward.cost ? `BUY FOR ${reward.cost} ★` : `NEED ${reward.cost - points} MORE`}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/" className="brutal-btn bg-[#118AB2] text-white">
          Upload More Material To Earn Points
        </Link>
      </div>
    </div>
  );
}
