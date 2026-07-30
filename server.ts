import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ 
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  }) : null;

  // AI Waste Scanner API
  app.post('/api/analyze-waste', async (req, res) => {
    if (!ai) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    try {
      const { image } = req.body; // base64 image
      if (!image) {
        return res.status(400).json({ error: 'No image provided' });
      }

      const prompt = `
        Analyze this image of waste. Identify the main item and categorize it for recycling.
        Return the result strictly in the following JSON format:
        {
          "item": "name of the item",
          "category": "one of: Organic, Plastic, Paper, Glass, Metal, E-Waste, Hazardous, General",
          "confidence": number between 0 and 100,
          "instructions": ["step 1", "step 2", "step 3"],
          "recyclable": boolean,
          "reusable": boolean,
          "environmentalImpact": "brief description of impact",
          "commonMistakes": ["mistake 1", "mistake 2"],
          "alternatives": ["alternative 1", "alternative 2"]
        }
      `;

      const result = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              {
                inlineData: {
                  data: image.split(',')[1],
                  mimeType: 'image/jpeg',
                },
              },
            ],
          },
        ],
      });

      const text = result.text;
      
      // Extract JSON from response (handling potential markdown blocks)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to parse AI response');
      }

      res.json(JSON.parse(jsonMatch[0]));
    } catch (error) {
      console.error('AI Analysis Error:', error);
      res.status(500).json({ error: 'Failed to analyze waste' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', api: !!ai });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EcoSort server running on http://localhost:${PORT}`);
  });
}

startServer();
