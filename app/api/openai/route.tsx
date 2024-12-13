import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Ensure API key is set in .env
});

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  try {
    // Call OpenAI API with streaming enabled
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // You can use 'gpt-4' if you have access
      messages: [{ role: 'user', content: message }],
      stream: true,
    });

    // Create a ReadableStream to send back to the client
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            controller.enqueue(new TextEncoder().encode(content)); // Send chunk to client
          }
          controller.close(); // End stream
        } catch (error) {
          console.error('Streaming Error:', error);
          controller.error(error); // Handle error in stream
        }
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    return NextResponse.json({ error: 'Error fetching OpenAI response' }, { status: 500 });
  }
}
