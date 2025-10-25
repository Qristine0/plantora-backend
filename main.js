import express from "express";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  console.log(req.body);
  const { message } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });
    res.json({ reply: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "დაფიქსირდა შეცდომა..." });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
