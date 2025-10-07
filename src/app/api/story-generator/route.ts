import { NextResponse } from 'next/server';

// This is a mock API route to simulate a Genkit flow.
export async function POST(request: Request) {
  try {
    // In a real app, you might get the story from the request body
    // const { story } = await request.json();

    const summary = "A brave knight saved a village from a mischievous dragon by teaching it to bake bread instead of breathing fire.";
    
    const events = [
      "The knight arrives at the village.",
      "The villagers are scared of a dragon.",
      "The knight confronts the dragon.",
      "The knight discovers the dragon is just lonely.",
      "The knight and dragon bake bread together.",
    ];

    // Scramble events for the game
    const scrambledEvents = [...events].sort(() => Math.random() - 0.5);

    // Adding a delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ summary, scrambledEvents, correctOrder: events });

  } catch (error) {
    console.error("Story Generator API Error:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
