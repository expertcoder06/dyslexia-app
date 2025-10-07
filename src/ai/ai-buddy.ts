'use server';

/**
 * @fileOverview A personalized cheering AI agent.
 *
 * - generateCheeringMessage - A function that generates a personalized cheering message.
 * - CheeringMessageInput - The input type for the generateCheeringMessage function.
 * - CheeringMessageOutput - The return type for the generateCheeringMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheeringMessageInputSchema = z.object({
  emotion: z.string().describe('The current emotion of the user.'),
  userName: z.string().describe('The name of the user.'),
});
export type CheeringMessageInput = z.infer<typeof CheeringMessageInputSchema>;

const CheeringMessageOutputSchema = z.object({
  message: z.string().describe('A personalized cheering message for the user.'),
});
export type CheeringMessageOutput = z.infer<typeof CheeringMessageOutputSchema>;

export async function generateCheeringMessage(
  input: CheeringMessageInput
): Promise<CheeringMessageOutput> {
  return cheeringMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cheeringMessagePrompt',
  input: {schema: CheeringMessageInputSchema},
  output: {schema: CheeringMessageOutputSchema},
  prompt: `You are a friendly AI assistant designed to cheer up users who are feeling down.

  Generate a personalized cheering message for {{userName}} who is feeling {{emotion}}. The message should be encouraging and supportive.`,
});

const cheeringMessageFlow = ai.defineFlow(
  {
    name: 'cheeringMessageFlow',
    inputSchema: CheeringMessageInputSchema,
    outputSchema: CheeringMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
