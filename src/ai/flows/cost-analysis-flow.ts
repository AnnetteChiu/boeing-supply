'use server';
/**
 * @fileOverview A supply chain cost analysis AI agent.
 *
 * Exports:
 * - analyzeCosts: A function that handles the cost analysis process.
 */

import {ai} from '@/ai/genkit';
import {
  type CostAnalysisInput,
  type CostAnalysisOutput,
  CostAnalysisInputSchema,
  CostAnalysisOutputSchema,
} from '@/ai/schemas';

export async function analyzeCosts(input: CostAnalysisInput): Promise<CostAnalysisOutput> {
  return costAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'costAnalysisPrompt',
  input: {schema: CostAnalysisInputSchema},
  output: {schema: CostAnalysisOutputSchema},
  prompt: `You are an expert supply chain cost analyst. Your task is to analyze the provided context and provide a detailed cost breakdown and optimization recommendations.

  Analyze the following information:
  {{{context}}}

  Your analysis should include a summary, a detailed cost breakdown (for items like materials, labor, shipping, etc.), and actionable recommendations for cost savings.
  `,
});

const costAnalysisFlow = ai.defineFlow(
  {
    name: 'costAnalysisFlow',
    inputSchema: CostAnalysisInputSchema,
    outputSchema: CostAnalysisOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
