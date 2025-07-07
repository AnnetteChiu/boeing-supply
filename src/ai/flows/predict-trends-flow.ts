'use server';
/**
 * @fileOverview A market trend prediction AI agent.
 *
 * Exports:
 * - predictTrends: A function that handles the market trend prediction process.
 */

import {ai} from '@/ai/genkit';
import {
  type PredictTrendsInput,
  type PredictTrendsOutput,
  PredictTrendsInputSchema,
  PredictTrendsOutputSchema,
} from '@/ai/schemas';

export async function predictTrends(input: PredictTrendsInput): Promise<PredictTrendsOutput> {
  return predictTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictTrendsPrompt',
  input: {schema: PredictTrendsInputSchema},
  output: {schema: PredictTrendsOutputSchema},
  prompt: `You are an expert market analyst. Your task is to analyze the provided context and predict future market trends. 
  
  Provide a detailed analysis based on the following information:
  {{{context}}}
  
  Your prediction should be insightful, well-reasoned, and presented clearly.
  `,
});

const predictTrendsFlow = ai.defineFlow(
  {
    name: 'predictTrendsFlow',
    inputSchema: PredictTrendsInputSchema,
    outputSchema: PredictTrendsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
