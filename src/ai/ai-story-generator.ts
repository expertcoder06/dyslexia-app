'use server';

/**
 * @fileOverview A story summarization and key event extraction AI agent.
 *
 * - generateStoryElements - A function that generates the story summary and key events.
 * - StoryElementsInput - The input type for the generateStoryElements function.
 * - StoryElementsOutput - The return type for the generateStoryElements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StoryElementsInputSchema = z.object({
  story: z.string().describe('The story content to summarize and extract key events from.'),
});
export type StoryElementsInput = z.infer<typeof StoryElementsInputSchema>;

const StoryElementsOutputSchema = z.object({
  summary: z.string().describe('A short summary of the story.'),
  keyEvents: z.array(z.string()).describe('A scrambled JSON array of 5 key events from the story.'),
});
export type StoryElementsOutput = z.infer<typeof StoryElementsOutputSchema>;

export async function generateStoryElements(input: StoryElementsInput): Promise<StoryElementsOutput> {
  return storyElementsFlow(input);
}

const storyElementsPrompt = ai.definePrompt({
  name: 'storyElementsPrompt',
  input: {schema: StoryElementsInputSchema},
  output: {schema: StoryElementsOutputSchema},
  prompt: `You are an AI assistant specialized in story analysis.
  Given a story, you will generate a short summary and extract 5 key events.
  The key events should be a JSON array of strings.

  Story:
  {{story}}`,
});

const storyElementsFlow = ai.defineFlow(
  {
    name: 'storyElementsFlow',
    inputSchema: StoryElementsInputSchema,
    outputSchema: StoryElementsOutputSchema,
  },
  async input => {
    const {output} = await storyElementsPrompt(input);
    return output!;
  }
);
