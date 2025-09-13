
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateDescription = async (productName: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key not configured. Please set the API_KEY environment variable. For now, here's a placeholder description for your product.";
  }
  
  try {
    const prompt = `Generate a compelling, short e-commerce product description for a product named "${productName}". The description should be one paragraph, between 20-40 words. Focus on modern, exciting features. Do not use markdown.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.8,
            topP: 0.9,
        }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating description with Gemini API:", error);
    return "Failed to generate AI description. Please write one manually.";
  }
};
