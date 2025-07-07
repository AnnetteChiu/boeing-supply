/**
 * @fileOverview Defines the Zod schemas and TypeScript types for AI flows.
 */
import {z} from 'genkit';

export const PredictTrendsInputSchema = z.object({
  context: z.string().describe('User-provided context about the market or industry to analyze.'),
});
export type PredictTrendsInput = z.infer<typeof PredictTrendsInputSchema>;

export const PredictTrendsOutputSchema = z.object({
  prediction: z.string().describe('The AI-generated market trend analysis and prediction.'),
});
export type PredictTrendsOutput = z.infer<typeof PredictTrendsOutputSchema>;
