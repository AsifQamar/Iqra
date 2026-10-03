"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NoteSection {
  title: string;
  content: string[];
}

export default function Revision() {
  const router = useRouter();
  const [notes, setNotes] = useState<NoteSection[]>([]);
  const [performance, setPerformance] = useState<any[]>([]);

  useEffect(() => {
    const dataStr = sessionStorage.getItem("iqra_data");
    const perfStr = sessionStorage.getItem("iqra_performance");
    
    if (perfStr) {
      setPerformance(JSON.parse(perfStr));
    }

    if (!dataStr) {
      router.push("/");
      return;
    }
    try {
      const data = JSON.parse(dataStr);
      if (data.notes && data.notes.length > 0) {
        setNotes(data.notes);
      } else {
        router.push("/");
      }
    } catch (e) {
      router.push("/");
    }
  }, [router]);

  if (notes.length === 0) return <div className="text-center font-bold text-2xl mt-20 uppercase font-heading">Loading...</div>;

  const wrongAnswers = performance.filter(p => !p.isCorrect);
  const correctCount = performance.length - wrongAnswers.length;
  
  // Aggregate weak topics
  const weakTopics = Array.from(new Set(wrongAnswers.map(w => w.topic)));

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-end mb-10">
        <h1 className="text-5xl md:text-6xl font-heading uppercase text-[#1A1A1A] tracking-tighter">
          Revision<br/>
          <span className="text-[#06D6A0]">Notes.</span>
        </h1>
        <Link href="/store" className="brutal-btn bg-[#FFD166] text-[#1A1A1A] h-fit">
          Go to Rewards Store →
        </Link>
      </div>
      
      {performance.length > 0 && (
        <div className="mb-12 bg-[#1A1A1A] text-white p-8 brutal-border brutal-shadow relative">
          <div className="absolute -top-4 -left-4 bg-[#FFD166] text-[#1A1A1A] px-4 py-2 font-black brutal-border text-lg uppercase transform -rotate-2">
            PERFORMANCE SUMMARY
          </div>
          <p className="text-xl font-heading uppercase mb-6 mt-2">
            You scored {correctCount * 10} out of {performance.length * 10}
          </p>
          
          {weakTopics.length > 0 && (
            <div className="mb-6">
              <span className="text-[#EF476F] font-bold text-sm uppercase tracking-widest block mb-2">⚠ Topics to Focus On:</span>
              <div className="flex flex-wrap gap-2">
                {weakTopics.map((topic, i) => (
                  <span key={i} className="bg-white text-black px-2 py-1 text-xs font-bold uppercase brutal-border">{topic}</span>
                ))}
              </div>
            </div>
          )}
          
          {wrongAnswers.length > 0 ? (
            <div className="space-y-4">
              <span className="text-[#06D6A0] font-bold text-sm uppercase tracking-widest block mb-2">Review Incorrect Answers:</span>
              {wrongAnswers.map((w, idx) => (
                <div key={idx} className="bg-[#2A2A2A] border-2 border-white p-4">
                  <p className="font-bold text-sm mb-2 opacity-80">Q: {w.question}</p>
                  <p className="text-[#EF476F] font-bold text-sm mb-1">Your Answer: {w.userAnswer}</p>
                  <p className="text-[#06D6A0] font-bold text-sm">Correct Answer: {w.correctAnswer}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[#06D6A0] font-heading text-2xl uppercase">PERFECT SCORE! 🏆</div>
          )}
        </div>
      )}

      <div className="space-y-8 mb-20">
        {notes.map((section, idx) => (
          <div key={idx} className="brutal-card bg-white relative pt-10">
            <div className="absolute -top-4 -left-4 bg-[#118AB2] text-white px-4 py-2 font-bold brutal-border text-xl uppercase transform -rotate-1">
              {section.title}
            </div>
            
            <ul className="space-y-4">
              {section.content.map((point, i) => (
                <li key={i} className="flex gap-4 items-start font-medium text-lg">
                  <div className="bg-[#EF476F] w-4 h-4 mt-1.5 flex-shrink-0 brutal-border transform rotate-45"></div>
                  <span className="font-sans leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
