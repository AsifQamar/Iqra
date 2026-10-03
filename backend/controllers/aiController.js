const { GoogleGenAI } = require('@google/genai');

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI();
const MODEL_NAME = 'gemma-4-26b-a4b-it';

async function generateQuiz(text, numQuestions = 10) {
  try {
    const prompt = `You are an expert educational assistant. Create a Kahoot-style multiple-choice quiz based on the following text.
Generate exactly ${numQuestions} challenging, high-level questions that test deep conceptual understanding rather than just rote memorization. Include plausible distractors.
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
    // Clean up potential markdown formatting
    const cleanedResult = result.replace(/^```json/g, '').replace(/```$/g, '').trim();
    return JSON.parse(cleanedResult);
  } catch (error) {
    console.warn('Quiz API failed (Using Fallback Data) - Error:', error.message || 'Invalid API Key');
    // Fallback data for demonstration if API fails or key is missing
    return [
      { question: "What is the main topic of the document?", options: ["Biology", "History", "Math", "Technology"], correctAnswer: "Technology" }
    ];
  }
}

async function generateFlashcards(text, numQuestions = 10) {
  try {
    const prompt = `You are an expert educational assistant. Create exactly ${numQuestions} flashcards for active recall based on the following text.
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
  } catch (error) {
    console.warn('Flashcard API failed (Using Fallback Data) - Error:', error.message || 'Invalid API Key');
    // Fallback data
    return [
      { front: "The central processing unit of a computer", back: "CPU" }
    ];
  }
}

async function generateNotes(text) {
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
    console.warn('Notes API failed (Using Fallback Data) - Error:', error.message || 'Invalid API Key');
    // Fallback data
    return [
      { title: "Summary", content: ["This is a placeholder note.", "Make sure to review this section."] }
    ];
  }
}

module.exports = {
  generateQuiz,
  generateFlashcards,
  generateNotes
};
