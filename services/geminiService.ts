
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTravelRecommendations(userQuery: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User is looking for a travel destination. Query: "${userQuery}". Recommend 3 specific areas in a country that would suit them.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reason: {
              type: Type.STRING,
              description: "A summary explaining why these destinations were chosen."
            },
            suggestedDestinations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 beautiful areas or cities."
            }
          },
          required: ["reason", "suggestedDestinations"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      reason: "We couldn't reach our AI guide, but here are some popular choices.",
      suggestedDestinations: ["Paris, France", "Bali, Indonesia", "Queenstown, New Zealand"]
    };
  }
}

export async function getDestinationWeather(location: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a realistic 7-day weather forecast for ${location} for the current time of year. Provide temperatures in Celsius.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.STRING, description: "Day of the week (e.g., Mon, Tue)" },
              high: { type: Type.NUMBER },
              low: { type: Type.NUMBER },
              condition: { type: Type.STRING, description: "e.g., Sunny, Rainy, Cloudy" },
              icon: { type: Type.STRING, description: "FontAwesome icon class name e.g., fa-sun, fa-cloud-rain" }
            },
            required: ["day", "high", "low", "condition", "icon"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Weather Gemini Error:", error);
    return null;
  }
}
