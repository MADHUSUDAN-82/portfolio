import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Chat endpoint for the portfolio
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, context } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: `You are an AI assistant representing a professional whose portfolio this is. 
            Context about the person: ${JSON.stringify(context)}
            
            Answer the user's question based on this context. Be professional, concise, and friendly.
            User: ${message}` }]
          }
        ],
        config: {
          systemInstruction: "You are a professional portfolio assistant.",
          maxOutputTokens: 500,
        },
      });
      // const response = await ai.models.generateContent({
      //   model: "gemini-2.5-flash",
      //   contents: "Hello",
      // });

      // console.log(response.text);

      res.json({ text: response.text });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Failed to generate AI response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
