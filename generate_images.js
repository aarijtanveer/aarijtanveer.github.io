import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImage(prompt, filename) {
  try {
    console.log(`Generating image for: ${prompt}`);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        fs.writeFileSync(filename, Buffer.from(base64Data, 'base64'));
        console.log(`Saved ${filename}`);
        return;
      }
    }
    console.log(`No image data found for ${filename}`);
  } catch (error) {
    console.error(`Error generating ${filename}:`, error);
  }
}

async function main() {
  await generateImage("NUST Business School building, Islamabad, modern university architecture, high quality photography, daytime", "nust.jpg");
  await generateImage("NUML university building, National University of Modern Languages Islamabad, high quality photography, daytime", "numl.jpg");
}

main();
