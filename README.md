# Iqra

[Screenshot Placeholder 1]
[Screenshot Placeholder 2]

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
The application is structured as a full-stack monorepo:
* **Frontend:** Built with Next.js (App Router), utilizing React state and standard browser APIs (`localStorage` / `sessionStorage`) for zero-database authentication and session tracking. The UI is strictly governed by a custom Neo-Brutalist CSS framework built on top of Tailwind CSS.
* **Backend:** A lightweight Node.js Express server acts as an AI orchestration layer. It utilizes `multer` to handle raw PDF file uploads in memory, `pdf-parse` to extract plain text, and then aggressively chunks the material into concurrent execution loops using `Promise.all` to interact with the Google GenAI SDK (Gemma 4). This architecture ensures rapid generation of complex quizzes and flashcards without long blocking delays.

## How to Run Locally

### Prerequisites
* Node.js (v18+)
* A valid Google Gemini API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_google_ai_key_here
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
