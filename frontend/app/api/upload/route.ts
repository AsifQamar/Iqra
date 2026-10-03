import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import pdfParse from "pdf-parse";

// Increase max duration to 60s for Vercel Hobby plan
export const maxDuration = 60;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
const MODEL_NAME = 'gemma-4-26b-a4b-it';

async function generateQuiz(text: string, numQuestions = 10) {
  try {
    const batchSize = 10;
    const numBatches = Math.ceil(numQuestions / batchSize);
    
    const promises = Array.from({ length: numBatches }).map(async (_, idx) => {
      const qCount = idx === numBatches - 1 ? (numQuestions % batchSize || batchSize) : batchSize;
      
      const prompt = `You are an expert educational assistant. Create a Kahoot-style multiple-choice quiz based on the following text.
Generate exactly ${qCount} challenging, high-level questions that test deep conceptual understanding rather than just rote memorization. Include plausible distractors.
Return ONLY a valid JSON array of objects. Each object should have:
- 'question' (string)
- 'options' (array of 4 strings)
- 'correctAnswer' (string matching one of the options)
- 'topic' (string, a brief 1-3 word topic to focus on if the user gets it wrong)
Do not include markdown blocks like \`\`\`json.
Text: ${text}`;
      
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
      });
      const result = response.text.trim();
      const cleanedResult = result.replace(/^```json/g, '').replace(/```$/g, '').trim();
      return JSON.parse(cleanedResult);
    });

    const results = await Promise.all(promises);
    return results.flat();
  } catch (error) {
    console.warn('Quiz API failed:', error);
    return [
      { question: "What is the main topic of the document?", options: ["Biology", "History", "Math", "Technology"], correctAnswer: "Technology", topic: "General" }
    ];
  }
}

async function generateFlashcards(text: string, numQuestions = 10) {
  try {
    const batchSize = 10;
    const numBatches = Math.ceil(numQuestions / batchSize);
    
    const promises = Array.from({ length: numBatches }).map(async (_, idx) => {
      const qCount = idx === numBatches - 1 ? (numQuestions % batchSize || batchSize) : batchSize;
      
      const prompt = `You are an expert educational assistant. Create exactly ${qCount} flashcards for active recall based on the following text.
Make the questions detailed and challenging, but the answer MUST be a single word, as it will be used in a speed typing game.
Return ONLY a valid JSON array of objects. Each object should have:
- 'front' (the question/hint string)
- 'back' (the one-word answer string).
Do not include markdown blocks like \`\`\`json.
Text: ${text}`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
      });
      const result = response.text.trim();
      const cleanedResult = result.replace(/^```json/g, '').replace(/```$/g, '').trim();
      return JSON.parse(cleanedResult);
    });

    const results = await Promise.all(promises);
    return results.flat();
  } catch (error) {
    console.warn('Flashcard API failed:', error);
    return [
      { front: "The central processing unit of a computer", back: "CPU" }
    ];
  }
}

async function generateNotes(text: string) {
  try {
    const prompt = `You are an educational assistant. Create structured revision notes from the following text.
Return ONLY a valid JSON array of objects representing sections. Each object should have 'title' (string) and 'content' (array of bullet point strings).
Do not include markdown blocks like \`\`\`json.
Text: ${text}`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    const result = response.text.trim();
    const cleanedResult = result.replace(/^```json/g, '').replace(/```$/g, '').trim();
    return JSON.parse(cleanedResult);
  } catch (error) {
    console.warn('Notes API failed:', error);
    return [
      { title: "Summary", content: ["This is a placeholder note.", "Make sure to review this section."] }
    ];
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const rawText = formData.get("text") as string | null;
    const numQuestions = parseInt((formData.get("numQuestions") as string) || "10", 10);

    let textContent = "";

    if (rawText) {
      textContent = rawText;
    } else if (file) {
      if (file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const pdfData = await pdfParse(buffer);
        textContent = pdfData.text;
      } else {
        textContent = await file.text();
      }
    }

    if (!textContent) {
      return NextResponse.json({ error: "No content provided" }, { status: 400 });
    }

    // Speed optimization for Vercel Serverless
    if (textContent.length > 8000) {
      textContent = textContent.substring(0, 8000);
    }

    console.log(`Processing content of length: ${textContent.length}, generating ${numQuestions} questions`);

    const [quiz, flashcards, notes] = await Promise.all([
      generateQuiz(textContent, numQuestions),
      generateFlashcards(textContent, numQuestions),
      generateNotes(textContent)
    ]);

    return NextResponse.json({
      success: true,
      data: { quiz, flashcards, notes }
    });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process" }, { status: 500 });
  }
}
