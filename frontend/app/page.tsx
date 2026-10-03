"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [numQuestions, setNumQuestions] = useState("10");
  const [timer, setTimer] = useState("10");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      } else {
        formData.append("text", text);
      }
      formData.append("numQuestions", numQuestions);

      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      
      if (result.success) {
        sessionStorage.setItem("iqra_data", JSON.stringify(result.data));
        sessionStorage.setItem("iqra_timer", timer);
        router.push("/quiz");
      } else {
        alert("Failed to process document");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to AI backend. Make sure the server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      {/* Hero Section matching exact layout of Image 1 */}
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-between relative mb-24">
        
        <div className="flex-1">
          <div className="flex gap-2 mb-6 text-xs font-bold font-sans tracking-widest uppercase">
            <div className="bg-[#1A1A1A] text-white px-3 py-1.5 brutal-border flex items-center gap-2">
              🏆 AI POWERED GENERATION
            </div>
            <div className="bg-white text-[#1A1A1A] px-3 py-1.5 brutal-border flex items-center gap-2">
              🧠 ACTIVE RECALL DRILL
            </div>
          </div>

          <h1 className="text-7xl md:text-[110px] font-heading uppercase leading-[0.85] tracking-tighter mb-8 text-[#1A1A1A]">
            ONE <br/>
            DOCUMENT.<br/>
            ZERO <span className="text-[#F77F00]">STUDY</span><br/>
            <span className="bg-[#FFD166] text-[#1A1A1A] px-4 py-2 brutal-border inline-block mt-4 brutal-shadow shadow-[8px_8px_0px_0px_#1A1A1A]">FATIGUE.</span>
          </h1>

          <p className="text-lg md:text-xl font-sans max-w-lg leading-relaxed mb-8 border-l-[3px] border-[#1A1A1A] pl-5">
            An interactive educational platform. You paste your raw notes or textbook chapters. 
            The AI digests it instantly. You conquer the material through speed games. 
            Neither of you finishes alone.
          </p>

          <div className="flex gap-4">
            <button 
              onClick={() => {
                document.getElementById("upload-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#FFD166] text-[#1A1A1A] border-[3px] border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all px-8 py-4 font-heading font-bold text-base uppercase tracking-widest flex items-center gap-2"
            >
              START LEARNING →
            </button>
            <button className="bg-white text-[#1A1A1A] border-[3px] border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all px-8 py-4 font-heading font-bold text-base uppercase tracking-widest flex items-center gap-2">
              <span className="text-xl">🏃‍♂️</span> PRACTICE SOLO
            </button>
          </div>
        </div>

        {/* Decorative graphic representing the app features */}
        <div className="hidden lg:block w-[400px] h-[300px] relative mt-12 bg-white brutal-border brutal-shadow-lg p-4">
          <div className="absolute -top-3 -left-3 bg-[#06D6A0] text-[#1A1A1A] font-bold text-[10px] px-2 py-1 brutal-border transform -rotate-2">
            AI PROCESSING LIVE
          </div>
          <div className="w-full h-full bg-[#1A1A1A] p-4 flex flex-col gap-2">
             <div className="h-6 w-1/2 bg-[#333] rounded-sm"></div>
             <div className="h-4 w-full bg-[#222] rounded-sm"></div>
             <div className="h-4 w-5/6 bg-[#222] rounded-sm"></div>
             
             <div className="flex-1 mt-4 border-2 border-dashed border-[#555] flex items-center justify-center">
                <span className="text-[#FFD166] font-mono text-sm">EXTRACTING KNOWLEDGE...</span>
             </div>
          </div>
          <div className="absolute -bottom-6 -right-6">
             <div className="bg-[#EF476F] brutal-border p-3 brutal-shadow transform rotate-6">
               <span className="font-heading text-white text-xl">GEMMA 4</span>
             </div>
          </div>
        </div>

      </div>

      <hr className="border-t-[3px] border-[#1A1A1A] my-16" />

      {/* Steps section matching Image 2 ("HOW A DRILL WORKS") */}
      <div id="upload-section" className="mb-24">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-5xl font-heading uppercase text-[#1A1A1A]">HOW IQRA WORKS</h2>
          <div className="bg-white brutal-border px-3 py-1 font-bold text-xs uppercase flex items-center gap-2">
            ⏱ ABOUT 2 MINUTES
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="brutal-card-interactive flex flex-col h-64 relative p-6 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="font-heading text-4xl text-transparent" style={{ WebkitTextStroke: "1px #1A1A1A" }}>01</span>
              <div className="bg-[#FFD166] brutal-border p-2"><span className="text-xl">📄</span></div>
            </div>
            <h3 className="font-heading text-lg mb-2">PASTE MATERIAL</h3>
            <p className="font-sans text-sm leading-relaxed">Provide your raw study notes, a textbook chapter, or any text block you need to memorize.</p>
          </div>
          
          {/* Step 2 */}
          <div className="brutal-card-interactive flex flex-col h-64 relative p-6 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="font-heading text-4xl text-transparent" style={{ WebkitTextStroke: "1px #1A1A1A" }}>02</span>
              <div className="bg-[#06D6A0] brutal-border p-2"><span className="text-xl">🤖</span></div>
            </div>
            <h3 className="font-heading text-lg mb-2">AI DIGESTION</h3>
            <p className="font-sans text-sm leading-relaxed">Gemma 4 processes the material instantly, extracting core concepts and framing questions.</p>
          </div>

          {/* Step 3 */}
          <div className="brutal-card-interactive flex flex-col h-64 relative p-6 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="font-heading text-4xl text-transparent" style={{ WebkitTextStroke: "1px #1A1A1A" }}>03</span>
              <div className="bg-[#EF476F] brutal-border p-2"><span className="text-xl">⚡</span></div>
            </div>
            <h3 className="font-heading text-lg mb-2">PLAY THE GAMES</h3>
            <p className="font-sans text-sm leading-relaxed">Engage in Kahoot-style quizzes and rapid-fire flashcards to lock the knowledge into memory.</p>
          </div>

          {/* Step 4 */}
          <div className="brutal-card-interactive flex flex-col h-64 relative p-6 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="font-heading text-4xl text-transparent" style={{ WebkitTextStroke: "1px #1A1A1A" }}>04</span>
              <div className="bg-[#118AB2] brutal-border p-2"><span className="text-xl">⭐</span></div>
            </div>
            <h3 className="font-heading text-lg mb-2">EARN REWARDS</h3>
            <p className="font-sans text-sm leading-relaxed">Score points for correct answers and unlock digital avatars and custom themes in the store.</p>
          </div>
        </div>
      </div>

      {/* Upload Form replacing the "2 ROLES / 7 STEPS / 8 MIN" banner structure */}
      <form id="upload-form" onSubmit={handleSubmit} className="mb-24 relative pt-12">
        <div className="flex flex-col md:flex-row w-full brutal-border brutal-shadow-lg overflow-hidden">
          
          <div className="bg-[#FFD166] border-b-[3px] md:border-b-0 md:border-r-[3px] border-[#1A1A1A] p-6 w-full md:w-1/3 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-2">
              <span className="font-heading text-5xl">1<span className="text-2xl"> INPUT</span></span>
              <span className="text-2xl opacity-60">📝</span>
            </div>
            <span className="font-bold text-xs uppercase tracking-widest mt-2">RAW TEXT OR NOTES</span>
          </div>

          <div className="bg-white p-6 w-full md:w-2/3 flex flex-col justify-center relative">
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block font-heading text-xs uppercase tracking-wide mb-1">Upload PDF</label>
                <input 
                  type="file" 
                  accept=".pdf,.txt"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFile(e.target.files[0]);
                      setText(""); // Clear text if file uploaded
                    }
                  }}
                  className="w-full text-sm font-mono file:mr-4 file:py-2 file:px-4 file:border-[3px] file:border-[#1A1A1A] file:text-sm file:font-bold file:bg-[#FFD166] file:text-black hover:file:bg-[#ffc640] file:shadow-[2px_2px_0px_0px_#1A1A1A] file:transition-all cursor-pointer"
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <label className="block font-heading text-xs uppercase tracking-wide mb-1">Questions</label>
                  <select value={numQuestions} onChange={e => setNumQuestions(e.target.value)} className="brutal-input py-2">
                    <option value="10">10 Qs</option>
                    <option value="20">20 Qs</option>
                    <option value="30">30 Qs</option>
                  </select>
                </div>
                <div>
                  <label className="block font-heading text-xs uppercase tracking-wide mb-1">Timer</label>
                  <select value={timer} onChange={e => setTimer(e.target.value)} className="brutal-input py-2">
                    <option value="10">10 Sec</option>
                    <option value="15">15 Sec</option>
                    <option value="30">30 Sec</option>
                    <option value="45">45 Sec</option>
                    <option value="60">60 Sec</option>
                  </select>
                </div>
              </div>
            </div>

            <label className="block font-heading text-lg uppercase tracking-wide mb-2 mt-2">
              OR Paste your material below <span className="text-[#EF476F] text-2xl leading-none relative top-1">*</span>
            </label>
            <textarea 
              className="brutal-input w-full h-32 resize-none text-base"
              placeholder="Paste your syllabus, textbook chapter, or notes here... The AI will handle the rest."
              value={text}
              disabled={!!file}
              onChange={(e) => setText(e.target.value)}
              required={!file}
            />
            <div className="flex justify-end mt-4">
              <button 
                type="submit" 
                disabled={loading || (!text.trim() && !file)}
                className="brutal-btn bg-[#06D6A0] text-[#1A1A1A] disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? "PROCESSING..." : "GENERATE GAMES →"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
