'use server';
/**
 * @fileOverview A market trend prediction AI agent.
 *
 * - predictTrends - A function that handles the market trend prediction process.
 * - PredictTrendsInput - The input type for the predictTrends function.
 * - PredictTrendsOutput - The return type for the predictTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const PredictTrendsInputSchema = z.object({
  context: z.string().describe('User-provided context about the market or industry to analyze.'),
});
export type PredictTrendsInput = z.infer<typeof PredictTrendsInputSchema>;

export const PredictTrendsOutputSchema = z.object({
  prediction: z.string().describe('The AI-generated market trend analysis and prediction.'),
});
export type PredictTrendsOutput = z.infer<typeof PredictTrendsOutputSchema>;

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
