import { GoogleGenAI } from "@google/genai";

const IMAGEN_PROMPTS = {
  aiMarketing: "Dark cinematic digital art. A glowing AI brain made of golden light particles and neural network connections floating in dark space. Deep black background. Gold and amber light beams. Futuristic. Photorealistic. No text. No people. 16:9 ratio.",
  websiteDesign: "Dark cinematic digital art. A sleek modern website interface floating in dark space. Glowing purple and gold UI elements. Code lines streaming in the background like a matrix. Black background. Deep purple light. No text. No people. Photorealistic. 16:9 ratio.",
  branding: "Dark cinematic digital art. A brand identity system — logo mark, colour palettes, and typography floating in dark space. Orange and gold light. Geometric shapes and design elements glowing. Black background. No text. No people. Photorealistic. 16:9 ratio.",
  growth: "Dark cinematic digital art. Glowing data analytics dashboard with rising graphs and performance metrics floating in dark space. Teal and gold light beams. Deep black background. Charts, numbers, upward arrows made of light particles. No text. No people. Photorealistic. 16:9 ratio."
};

export const generateServiceImage = async (serviceKey: keyof typeof IMAGEN_PROMPTS) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: IMAGEN_PROMPTS[serviceKey],
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
};
