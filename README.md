# Iqra
<img width="1887" height="957" alt="image" src="https://github.com/user-attachments/assets/2570245a-c36e-42c0-8962-bbf21a40f942" />
<img width="1875" height="955" alt="image" src="https://github.com/user-attachments/assets/0661df4e-6993-4200-b6ce-000abe078272" />
<img width="1912" height="955" alt="image" src="https://github.com/user-attachments/assets/35e9c062-17c2-4129-9c35-c9d358f85bc0" />
<img width="1878" height="955" alt="image" src="https://github.com/user-attachments/assets/05eeb7e5-2801-4a3b-85b3-d9bd17aa8690" />
<img width="1875" height="955" alt="image" src="https://github.com/user-attachments/assets/ac0ec338-c120-4da5-8e5d-16640e833927" />


## The Problem
Students often experience study fatigue and burnout when trying to digest large amounts of complex information using traditional methods like reading textbooks or passive reviewing. Passive studying leads to poor retention, low motivation, and high anxiety before exams.

## The Solution
Iqra is an AI-powered gamification platform that cures study fatigue. By utilizing Gemma 4, it instantly digests study materials and transforms them into interactive Kahoot-style quizzes, timed flashcards, and structured revision notes. Users earn points through active recall and can claim digital rewards, building a highly engaging learning loop.

## Features
* AI Game Generation: Upload a PDF or paste text, and the AI automatically generates a complete study package.
* Interactive Quizzes: Timed, multiple-choice quizzes that test deep conceptual understanding rather than rote memorization.
* Speed Flashcards: Timed active recall flashcards designed for quick repetition and mastery.
* Performance Analytics: Comprehensive review page highlighting weak topics and comparing user answers with correct answers.
* Reward Store: Built-in gamification where users can redeem earned points for digital rewards.
* Neo-Brutalist Design: A clean, vibrant, and engaging user interface that keeps students stimulated.

## Tech Stack
* Frontend: Next.js App Router, React, Tailwind CSS, TypeScript
* Backend: Node.js, Express, Multer, PDF-Parse
* AI Integration: Google GenAI SDK (gemma-4-26b-a4b-it)

## Project Architecture
The application is structured as a full-stack Next.js (App Router) application optimized for Vercel:
* **Frontend:** Built with React, utilizing standard browser APIs (`localStorage` / `sessionStorage`) for zero-database authentication and session tracking. The UI is strictly governed by a custom Neo-Brutalist CSS framework built on top of Tailwind CSS.
* **Backend (Next.js API Routes):** The AI orchestration layer has been migrated natively into Next.js Serverless Functions (`/api/upload`) to allow for seamless 1-click deployment on Vercel. It utilizes `pdf-parse` to extract plain text directly in the route, and then aggressively chunks the material into concurrent execution loops using `Promise.all` to interact with the Google GenAI SDK (Gemma 4).

## How to Run Locally

### Prerequisites
* Node.js (v18+)
* A valid Google Gemini API Key

### Setup Instructions
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variable:
   ```env
   GEMINI_API_KEY=your_google_ai_key_here
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.


## License
This project is licensed under the MIT License. See the LICENSE file for details.
