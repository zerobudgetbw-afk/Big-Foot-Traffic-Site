import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function generateCampaignBrief(
  brandName: string,
  industry: string,
  budget: string,
  goal: string
): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a senior marketing strategist at Big Foot Traffic — Botswana's first verified in-ride conversational marketing network. A potential client has submitted their details. Generate a personalised, compelling campaign brief recommendation in 4-6 paragraphs.

Client details:
- Brand: ${brandName}
- Industry: ${industry}
- Monthly Budget: ${budget} BWP
- Primary Goal: ${goal}

Write the brief as if you are personally presenting to this brand. Be specific to their industry. Reference Big Foot Traffic's verified conversation model, audio QA scoring, driver network across Gaborone, P7.50 per verified conversation cost, and 60,000+ monthly reach. Recommend the most suitable service tier from: In-Ride Ambassador (from P15,000/month), In-Car Radio (from P9,000/month), Flyer Distribution (from P8,000 bundle), In-Vehicle Video (from P12,000/month), or Full Agency Bundle (from P35,000/month).

Write in a confident, direct, Gary Vee-inspired tone. No bullet points — flowing paragraphs. End with a clear call to action to contact hello@bigfoottraffic.co.bw or visit bigfoottraffic.co.bw. Keep it under 300 words.`,
  });

  return response.text || "Failed to generate brief. Please try again.";
}
