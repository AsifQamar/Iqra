import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Archivo_Black, Space_Grotesk } from 'next/font/google';

const archivoBlack = Archivo_Black({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-archivo-black',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "Iqra - AI Gamified Learning",
  description: "Cure study fatigue with AI-powered interactive games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivoBlack.variable} ${spaceGrotesk.variable} antialiased min-h-screen flex flex-col font-sans`}>
        <header className="bg-[#FDFBF7] sticky top-0 z-50 border-b-[3px] border-[#1A1A1A]">
          <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-[#FFD166] w-8 h-8 flex items-center justify-center border-[3px] border-[#1A1A1A]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <span className="font-heading font-black text-2xl tracking-[0.2em] mt-1">IQRA</span>
            </Link>
            
            {/* Center Navigation */}
            <nav className="hidden lg:flex items-center gap-8 font-black text-sm tracking-[0.2em] text-[#1A1A1A] mt-1">
              <Link href="/" className="hover:opacity-70 transition-opacity">DASHBOARD</Link>
              <Link href="/quiz" className="hover:opacity-70 transition-opacity">QUIZ</Link>
              <Link href="/flashcards" className="hover:opacity-70 transition-opacity">FLASHCARDS</Link>
              <Link href="/revision" className="hover:opacity-70 transition-opacity">NOTES</Link>
            </nav>
            
            {/* Right Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/store" className="bg-white text-[#1A1A1A] border-[3px] border-[#1A1A1A] font-bold text-xs tracking-[0.1em] px-5 py-2 hover:bg-gray-50 uppercase shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-y-[2px] active:translate-x-[2px] transition-all">
                Rewards Store
              </Link>
              <Link href="/#upload-form" className="bg-[#FFD166] text-[#1A1A1A] border-[3px] border-[#1A1A1A] font-bold text-xs tracking-[0.1em] px-5 py-2 hover:bg-[#ffc640] uppercase shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-y-[2px] active:translate-x-[2px] transition-all flex items-center gap-2">
                Upload Material
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Sub-header ticker bar (from image 1) */}
          <div className="bg-[#1A1A1A] text-white text-[11px] font-black tracking-[0.25em] py-2 overflow-hidden flex whitespace-nowrap">
            <div className="flex items-center gap-8 mx-auto">
              <span className="flex items-center gap-3"><span className="text-[#FFD166]">◇</span> AI POWERED GENERATION</span>
              <span className="flex items-center gap-3"><span className="text-[#FFD166]">◇</span> INSTANT QUIZZES</span>
              <span className="flex items-center gap-3"><span className="text-[#FFD166]">◇</span> TIMED FLASHCARDS</span>
              <span className="flex items-center gap-3"><span className="text-[#FFD166]">◇</span> STRUCTURED REVISION NOTES</span>
              <span className="flex items-center gap-3"><span className="text-[#FFD166]">◇</span> ACTIVE RECALL MASTERY</span>
            </div>
          </div>
        </header>
        <main className="flex-1 w-full mx-auto relative z-10 overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
