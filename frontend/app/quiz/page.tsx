"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  topic?: string;
}

export default function Quiz() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  
  const [timerMax, setTimerMax] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10);
  const [performance, setPerformance] = useState<any[]>([]);

  useEffect(() => {
    const dataStr = sessionStorage.getItem("iqra_data");
    const storedTimer = sessionStorage.getItem("iqra_timer");
    
    if (storedTimer) {
      setTimerMax(parseInt(storedTimer));
      setTimeLeft(parseInt(storedTimer));
    }
    
    if (!dataStr) {
      router.push("/");
      return;
    }
    try {
      const data = JSON.parse(dataStr);
      if (data.quiz && data.quiz.length > 0) {
        setQuestions(data.quiz);
      } else {
        router.push("/");
      }
    } catch (e) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (questions.length === 0 || showResult || selected) return;
    
    if (timeLeft <= 0) {
      handleOptionSelect("TIMEOUT_WRONG_ANSWER");
      return;
    }

    const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, showResult, selected, questions.length]);

  if (questions.length === 0) return <div className="text-center font-bold text-2xl uppercase mt-20">Loading Quiz...</div>;

  const currentQ = questions[currentIdx];

  const handleOptionSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    
    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) {
      setScore(s => s + 10);
      
      const currentPoints = parseInt(localStorage.getItem("iqra_points") || "0");
      localStorage.setItem("iqra_points", (currentPoints + 10).toString());
    }

    setPerformance(prev => [...prev, {
      question: currentQ.question,
      correctAnswer: currentQ.correctAnswer,
      userAnswer: option === "TIMEOUT_WRONG_ANSWER" ? "Timeout" : option,
      topic: currentQ.topic || "General Concept",
      isCorrect
    }]);

    setTimeout(() => {
      setSelected(null);
      setTimeLeft(timerMax);
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(c => c + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  if (showResult) {
    sessionStorage.setItem("iqra_performance", JSON.stringify(performance));
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center brutal-card bg-white">
        <h1 className="text-6xl font-black uppercase mb-6 text-[#7B2CBF]">Quiz Complete!</h1>
        <p className="text-3xl font-bold mb-8">You scored <span className="text-[#EF476F]">{score}</span> / {questions.length * 10}</p>
        
        <div className="flex justify-center gap-4">
          <Link href="/flashcards" className="brutal-btn bg-[#FFD166] text-black">
            Next: Flashcards →
          </Link>
          <Link href="/revision" className="brutal-btn bg-white text-black">
            View Notes & Review
          </Link>
        </div>
      </div>
    );
  }

  const optionColors = ["bg-[#EF476F]", "bg-[#118AB2]", "bg-[#FFD166]", "bg-[#06D6A0]"];

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-8 brutal-border bg-white p-4 brutal-shadow-sm">
        <div className="font-black text-xl uppercase">Question {currentIdx + 1}/{questions.length}</div>
        <div className={`font-black text-2xl uppercase px-4 py-1 ${timeLeft <= 5 ? 'bg-[#EF476F] text-white animate-pulse' : 'bg-[#FFD166] text-black'}`}>
          00:{timeLeft.toString().padStart(2, '0')}
        </div>
        <div className="font-black text-xl uppercase bg-[#1A1A1A] text-white px-4 py-1">Score: {score}</div>
      </div>

      <div className="brutal-card bg-white mb-8 min-h-40 flex items-center justify-center text-center relative">
        {currentQ.topic && (
          <div className="absolute -top-3 -left-3 bg-[#118AB2] text-white font-bold text-xs uppercase px-2 py-1 brutal-border transform rotate-2">
            TOPIC: {currentQ.topic}
          </div>
        )}
        <h2 className="text-3xl md:text-5xl font-heading uppercase leading-tight">
          {currentQ.question}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentQ.options.map((option, idx) => {
          let extraClass = optionColors[idx % 4];
          let opacity = "opacity-100";

          if (selected) {
            if (option === currentQ.correctAnswer) {
              extraClass = "bg-[#06D6A0]"; // green for correct
            } else if (option === selected) {
              extraClass = "bg-[#EF476F]"; // red for wrong
            } else {
              opacity = "opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionSelect(option)}
              disabled={!!selected}
              className={`brutal-card-interactive cursor-pointer ${extraClass} ${opacity} text-black min-h-32 flex items-center justify-center`}
            >
              <span className="text-xl font-heading uppercase text-center leading-tight">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
