"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Flashcard {
  front: string;
  back: string;
}

export default function Flashcards() {
  const router = useRouter();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [status, setStatus] = useState<"playing" | "correct" | "wrong" | "done">("playing");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dataStr = sessionStorage.getItem("iqra_data");
    if (!dataStr) {
      router.push("/");
      return;
    }
    try {
      const data = JSON.parse(dataStr);
      if (data.flashcards && data.flashcards.length > 0) {
        setCards(data.flashcards);
      } else {
        router.push("/");
      }
    } catch (e) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (status !== "playing") return;
    
    if (timeLeft <= 0) {
      setStatus("wrong");
      setTimeout(nextCard, 2000);
      return;
    }

    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, status]);

  useEffect(() => {
    if (status === "playing") {
      inputRef.current?.focus();
    }
  }, [status, currentIdx]);

  if (cards.length === 0) return <div className="text-center font-bold text-2xl mt-20">Loading...</div>;

  const currentCard = cards[currentIdx];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "playing") return;

    if (inputVal.trim().toLowerCase() === currentCard.back.toLowerCase()) {
      setStatus("correct");
      // Add store points
      const currentPoints = parseInt(localStorage.getItem("iqra_points") || "0");
      localStorage.setItem("iqra_points", (currentPoints + 20).toString());
      setTimeout(nextCard, 1000);
    } else {
      setStatus("wrong");
      setTimeout(nextCard, 2000);
    }
  };

  const nextCard = () => {
    if (currentIdx < cards.length - 1) {
      setCurrentIdx(c => c + 1);
      setInputVal("");
      setTimeLeft(10);
      setStatus("playing");
    } else {
      setStatus("done");
    }
  };

  if (status === "done") {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center brutal-card bg-white">
        <h1 className="text-6xl font-black uppercase mb-6 text-[#118AB2]">Speed Run Complete!</h1>
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/revision" className="brutal-btn bg-[#FFD166] text-black">
            Review Notes →
          </Link>
          <Link href="/store" className="brutal-btn bg-white text-black">
            Visit Store
          </Link>
        </div>
      </div>
    );
  }

  let cardBg = "bg-white";
  if (status === "correct") cardBg = "bg-[#06D6A0]";
  if (status === "wrong") cardBg = "bg-[#EF476F]";

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-8">
        <div className="brutal-border bg-white px-4 py-2 font-black uppercase">
          Card {currentIdx + 1}/{cards.length}
        </div>
        <div className={`brutal-border px-6 py-2 font-black text-3xl ${timeLeft <= 3 ? 'bg-[#EF476F] text-white' : 'bg-[#FFD166]'}`}>
          00:{timeLeft.toString().padStart(2, '0')}
        </div>
      </div>

      <div className={`brutal-card ${cardBg} h-64 flex flex-col items-center justify-center text-center transition-colors relative`}>
        {status === "wrong" && (
          <div className="absolute top-4 font-black uppercase tracking-widest text-white text-xl">
            Correct Answer: {currentCard.back}
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-black uppercase max-w-xl leading-tight">
          {currentCard.front}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex gap-4">
        <input 
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={status !== "playing"}
          className="brutal-input flex-1 text-2xl uppercase text-center"
          placeholder="TYPE ONE WORD ANSWER..."
        />
        <button 
          type="submit" 
          disabled={status !== "playing"}
          className="brutal-btn bg-[#1A1A1A] text-white disabled:opacity-50"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
