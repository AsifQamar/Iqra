require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const { generateQuiz, generateFlashcards, generateNotes } = require('./controllers/aiController');

const app = express();
app.use(cors());
app.use(express.json());

// Configure multer for file uploads (store in memory for easy AI processing)
const upload = multer({ storage: multer.memoryStorage() });

// Add routes
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    let textContent = '';
    const numQuestions = parseInt(req.body.numQuestions || '10', 10);
    
    // If text was pasted directly
    if (req.body.text) {
      textContent = req.body.text;
    } else if (req.file) {
      if (req.file.mimetype === 'application/pdf') {
        const pdfData = await pdf(req.file.buffer);
        textContent = pdfData.text;
      } else {
        textContent = req.file.buffer.toString('utf-8');
      }
    }

    if (!textContent) {
      return res.status(400).json({ error: 'No content provided' });
    }

    // Process with AI
    console.log(`Processing content of length: ${textContent.length}, generating ${numQuestions} questions`);
    
    const [quiz, flashcards, notes] = await Promise.all([
      generateQuiz(textContent, numQuestions),
      generateFlashcards(textContent, numQuestions),
      generateNotes(textContent)
    ]);

    res.json({
      success: true,
      data: {
        quiz,
        flashcards,
        notes
      }
    });

  } catch (error) {
    console.error('Error processing document:', error);
    res.status(500).json({ error: 'Failed to process document' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Iqra Backend running on port ${PORT}`);
});
