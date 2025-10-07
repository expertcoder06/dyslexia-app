import { NextResponse } from 'next/server';

// This is a mock API route to simulate a Genkit flow.
export async function POST(request: Request) {
  try {
    const messages = [
      "It's okay to feel down sometimes. Every challenge is a chance to grow stronger!",
      "Remember how far you've come! You're doing an amazing job.",
      "A small step forward is still a step! Keep going!",
      "Believe in yourself! You have the power to overcome anything.",
      "Even on cloudy days, the sun is still shining above. You've got this!",
    ];
  
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
    // Adding a delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ message: randomMessage });

  } catch (error) {
    console.error("AI Buddy API Error:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
