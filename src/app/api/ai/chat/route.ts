import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { messages } = await req.json();

    // Convert OpenAI messages format to Gemini format
    const systemMessage = messages.find((m: any) => m.role === "system")?.content || 
      "You are an expert product advisor. Help users find the best products, compare options, and make informed purchasing decisions. Be helpful, knowledgeable, and honest.";

    const userMessages = messages
      .filter((m: any) => m.role !== "system")
      .map((m: any) => m.content)
      .join("\n");

    const prompt = `${systemMessage}\n\nUser: ${userMessages}\n\nAssistant:`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      message: text,
    });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: "AI service temporarily unavailable" },
      { status: 500 }
    );
  }
}
