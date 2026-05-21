import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

export async function generateContent(prompt) {
  const { text } = await generateText({
    model: groq('llama-3.3-70b-versatile'),
    prompt: prompt,
  });
  return text;
}
