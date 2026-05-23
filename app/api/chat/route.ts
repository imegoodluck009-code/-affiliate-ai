import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // Detect commands
    let systemPrompt = 'You are an AI assistant for an affiliate marketing platform. Help users with content generation, product recommendations, and marketing strategies.'
    let userMessage = message

    if (message.startsWith('/blog ')) {
      const topic = message.replace('/blog ', '')
      systemPrompt = `You are a professional blog writer for an affiliate marketing platform. Write a complete, engaging blog post about: ${topic}. Include: catchy title, introduction, main points with subheadings, and a conclusion with a call-to-action. Format with clear paragraphs.`
      userMessage = `Write a blog post about: ${topic}`
    } else if (message.startsWith('/product ')) {
      const productName = message.replace('/product ', '')
      systemPrompt = `You are a professional product copywriter. Create a compelling product description for: ${productName}. Include: product name, key features, benefits, target audience, and a persuasive description. Make it conversion-focused for affiliate marketing.`
      userMessage = `Create a product description for: ${productName}`
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 2048
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'AI request failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      reply: data.choices[0].message.content,
      type: message.startsWith('/blog') ? 'blog' : message.startsWith('/product') ? 'product' : 'general'
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    )
  }
}
