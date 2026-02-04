
import { GoogleGenAI, Type } from "@google/genai";
import { YearInsight } from "../types";

export const getDailyYearInsight = async (year: number, dateStr: string): Promise<YearInsight> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Today is ${dateStr}. Provide a daily update for a high-precision year tracker:
      1. AI Tool: Suggest one interesting AI tool for productivity and work optimization (name and 1-sentence description).
      2. Proverb: Provide an African proverb or wise saying, explicitly stating its origin (country, tribe, or author).
      3. History: State one major historical event that happened on ${dateStr} in history.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            aiTool: { type: Type.STRING, description: "Name and brief description of an AI productivity tool." },
            proverb: { type: Type.STRING, description: "An African proverb including its origin/country/author." },
            historicalEvent: { type: Type.STRING, description: "A major historical event for this calendar date." }
          },
          required: ["aiTool", "proverb", "historicalEvent"]
        }
      }
    });

    const text = response.text.trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching Gemini insight", error);
    return {
      aiTool: "Perplexity AI: A powerful answer engine that provides sourced information for research.",
      proverb: "If you want to go fast, go alone. If you want to go far, go together. (African Proverb)",
      historicalEvent: "On this day, significant events shaped the world we live in today."
    };
  }
};
