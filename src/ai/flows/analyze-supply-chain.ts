// This is an AI-powered agent for analyzing supply chain data to identify key relationships, dependencies, and potential vulnerabilities.
// It allows supply chain analysts to upload data, analyze it using AI, and identify potential risks to improve supply chain resilience.
// - analyzeSupplyChainData - A function that handles the supply chain data analysis process.
// - AnalyzeSupplyChainDataInput - The input type for the analyzeSupplyChainData function, which includes the supply chain data as a string.
// - AnalyzeSupplyChainDataOutput - The return type for the analyzeSupplyChainData function, which includes the analysis results as a string.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSupplyChainDataInputSchema = z.object({
  supplyChainData: z
    .string()
    .describe(
      'The supply chain data to analyze, preferably in a structured format like CSV or JSON, specifically focusing on TSMC and Boeing supply chains.'
    ),
});
export type AnalyzeSupplyChainDataInput = z.infer<typeof AnalyzeSupplyChainDataInputSchema>;

const AnalyzeSupplyChainDataOutputSchema = z.object({
  analysisResults: z
    .string()
    .describe('The analysis results, including identified relationships, dependencies, and vulnerabilities in the TSMC and Boeing supply chains.'),
});
export type AnalyzeSupplyChainDataOutput = z.infer<typeof AnalyzeSupplyChainDataOutputSchema>;

export async function analyzeSupplyChainData(
  input: AnalyzeSupplyChainDataInput
): Promise<AnalyzeSupplyChainDataOutput> {
  return analyzeSupplyChainDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSupplyChainDataPrompt',
  input: {schema: AnalyzeSupplyChainDataInputSchema},
  output: {schema: AnalyzeSupplyChainDataOutputSchema},
  prompt: `You are an expert supply chain analyst.

  Analyze the following TSMC and Boeing supply chain data to identify key relationships, dependencies, and potential vulnerabilities. Provide a detailed analysis of your findings, focusing on critical areas for both companies.

  Supply Chain Data:
  {{{supplyChainData}}}`,
});

const analyzeSupplyChainDataFlow = ai.defineFlow(
  {
    name: 'analyzeSupplyChainDataFlow',
    inputSchema: AnalyzeSupplyChainDataInputSchema,
    outputSchema: AnalyzeSupplyChainDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
