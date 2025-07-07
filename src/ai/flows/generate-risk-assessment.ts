'use server';

/**
 * @fileOverview A risk assessment report generator AI agent.
 *
 * - generateRiskAssessment - A function that handles the generation of risk assessment reports.
 * - GenerateRiskAssessmentInput - The input type for the generateRiskAssessment function.
 * - GenerateRiskAssessmentOutput - The return type for the generateRiskAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRiskAssessmentInputSchema = z.object({
  supplyChainData: z
    .string()
    .describe('Supply chain data in JSON format.'),
  marketTrends: z
    .string()
    .describe('Market trends data in JSON format.'),
  geopoliticalFactors: z
    .string()
    .describe('Geopolitical factors data in JSON format.'),
});
export type GenerateRiskAssessmentInput = z.infer<
  typeof GenerateRiskAssessmentInputSchema
>;

const GenerateRiskAssessmentOutputSchema = z.object({
  report: z
    .string()
    .describe('A comprehensive risk assessment report.'),
});
export type GenerateRiskAssessmentOutput = z.infer<
  typeof GenerateRiskAssessmentOutputSchema
>;

export async function generateRiskAssessment(
  input: GenerateRiskAssessmentInput
): Promise<GenerateRiskAssessmentOutput> {
  return generateRiskAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRiskAssessmentPrompt',
  input: {schema: GenerateRiskAssessmentInputSchema},
  output: {schema: GenerateRiskAssessmentOutputSchema},
  prompt: `You are an expert risk analyst specializing in supply chain risk assessment.

  You will use the provided supply chain data, market trends, and geopolitical factors to generate a comprehensive risk assessment report.

  Supply Chain Data: {{{supplyChainData}}}
  Market Trends: {{{marketTrends}}}
  Geopolitical Factors: {{{geopoliticalFactors}}}

  Based on this information, generate a detailed risk assessment report that includes:
  - Identification of potential risks and vulnerabilities in the supply chain.
  - Assessment of the impact and likelihood of each identified risk.
  - Recommendations for mitigating these risks and improving supply chain resilience.
  `,
});

const generateRiskAssessmentFlow = ai.defineFlow(
  {
    name: 'generateRiskAssessmentFlow',
    inputSchema: GenerateRiskAssessmentInputSchema,
    outputSchema: GenerateRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
