import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

async function generateImages() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    console.log("Generating NUST image...");
    const nustResponse = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: "A high quality, professional, and modern photo of the National University of Sciences and Technology (NUST) Business School campus in Islamabad, Pakistan. Sunny day, clear sky, modern architecture.",
    });

    for (const part of nustResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        fs.writeFileSync(path.join(process.cwd(), "nust.png"), Buffer.from(base64Data, "base64"));
        console.log("NUST image saved to nust.png");
      }
    }
    
    console.log("Generating NUML image...");
    const numlResponse = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: "A high quality, professional, and modern photo of the National University of Modern Languages (NUML) campus in Islamabad, Pakistan. Sunny day, clear sky, modern architecture.",
    });

    for (const part of numlResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        fs.writeFileSync(path.join(process.cwd(), "numl.png"), Buffer.from(base64Data, "base64"));
        console.log("NUML image saved to numl.png");
      }
    }
  } catch(e) { console.error(e); }
}
generateImages();
