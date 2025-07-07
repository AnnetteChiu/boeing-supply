'use server';
/**
 * @fileOverview A supply chain risk analysis AI agent.
 *
 * Exports:
 * - analyzeRisks: A function that handles the risk analysis process.
 */

import {ai} from '@/ai/genkit';
import {
  type RiskAnalysisInput,
  type RiskAnalysisOutput,
  RiskAnalysisInputSchema,
  RiskAnalysisOutputSchema,
} from '@/ai/schemas';

export async function analyzeRisks(input: RiskAnalysisInput): Promise<RiskAnalysisOutput> {
  return riskAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'riskAnalysisPrompt',
  input: {schema: RiskAnalysisInputSchema},
  output: {schema: RiskAnalysisOutputSchema},
  prompt: `You are an expert supply chain risk analyst. Your task is to analyze the provided context about potential disruptions and assess the risks.

  Analyze the following information:
  {{{context}}}

  Your analysis should identify key risk factors, assess their severity (Low, Medium, or High), provide a brief description of the impact, and suggest mitigation strategies.
  `,
});

const riskAnalysisFlow = ai.defineFlow(
  {
    name: 'riskAnalysisFlow',
    inputSchema: RiskAnalysisInputSchema,
    outputSchema: RiskAnalysisOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
