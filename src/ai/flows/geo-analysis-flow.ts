'use server';
/**
 * @fileOverview A geopolitical location analysis AI agent.
 *
 * Exports:
 * - analyzeGeoLocations: A function that handles the geo-location analysis process.
 */

import {ai} from '@/ai/genkit';
import {
  type GeoAnalysisInput,
  type GeoAnalysisOutput,
  GeoAnalysisInputSchema,
  GeoAnalysisOutputSchema,
} from '@/ai/schemas';

export async function analyzeGeoLocations(input: GeoAnalysisInput): Promise<GeoAnalysisOutput> {
  return geoAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'geoAnalysisPrompt',
  input: {schema: GeoAnalysisInputSchema},
  output: {schema: GeoAnalysisOutputSchema},
  prompt: `You are an expert geopolitical analyst specializing in supply chain management. Your task is to analyze the provided context, identify key geographic locations, and provide a geopolitical summary for each.

  Analyze the following information:
  {{{context}}}

  For each location you identify, provide its name, its approximate latitude and longitude, and a summary of any relevant geopolitical factors, risks, or opportunities that could impact a supply chain operating in or through that area.
  `,
});

const geoAnalysisFlow = ai.defineFlow(
  {
    name: 'geoAnalysisFlow',
    inputSchema: GeoAnalysisInputSchema,
    outputSchema: GeoAnalysisOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
