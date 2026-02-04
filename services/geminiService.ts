
import { GoogleGenAI, Type } from "@google/genai";
import { YearInsight } from "../types";

export const getDailyYearInsight = async (year: number, dateStr: string): Promise<YearInsight> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'FAKE_API_KEY_FOR_DEVELOPMENT' });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Today is ${dateStr}. Provide a short daily insight for someone tracking the progress of the year ${year}. Include a fun fact about the number ${year}, a motivational quote for the current stage of the year, and one significant historical event that happened on ${dateStr} in any year.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fact: { type: Type.STRING, description: "A fun fact about the current year as a number or its position in history." },
            motivation: { type: Type.STRING, description: "A short motivational sentence tailored to the current percentage of the year passed." },
            historicalEvent: { type: Type.STRING, description: "A significant historical event that occurred on this specific month and day." }
          },
          required: ["fact", "motivation", "historicalEvent"]
        }
      }
    });

    const text = response.text.trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching Gemini insight");
    return {
      fact: `${year} is a year of transformation and growth.`,
      motivation: "Small progress is still progress. Keep going.",
      historicalEvent: "On this day, countless individuals took steps toward their dreams."
    };
  }
};
