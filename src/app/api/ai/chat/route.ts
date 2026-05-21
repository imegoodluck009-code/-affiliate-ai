import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const systemMessage = messages.find((m: any) => m.role === "system")?.content ||
      "You are an expert product advisor. Help users find the best products, compare options, and make informed purchasing decisions. Be helpful, knowledgeable, and honest.";

    const userMessages = messages
      .filter((m: any) => m.role !== "system")
      .map((m: any) => `${m.role}: ${m.content}`)
      .join("\n");

    const prompt = `${systemMessage}\n\n${userMessages}\n\nAssistant:`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      max_tokens: 500,
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content || "";

    return NextResponse.json({
      message: text,
    });
  } catch (error: any) {
    console.error("AI Error:", error);
    // Return the actual error for debugging
    return NextResponse.json(
      { 
        error: "AI service temporarily unavailable",
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
}
