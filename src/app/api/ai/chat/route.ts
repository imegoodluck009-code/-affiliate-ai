import { NextRequest, NextResponse } from "next/server";
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

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

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile", {
        temperature: 0.7,
      }),
      prompt: prompt,
      maxOutputTokens: 500,
    });

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
