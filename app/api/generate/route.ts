import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      prompt: prompt,
    });

    return Response.json({ content: text });
  } catch (error) {
    console.error('Groq error:', error);
    return Response.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
