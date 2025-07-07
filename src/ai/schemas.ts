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


export const RiskAnalysisInputSchema = z.object({
  context: z.string().describe('User-provided context about geopolitical factors, supplier issues, etc.'),
});
export type RiskAnalysisInput = z.infer<typeof RiskAnalysisInputSchema>;

export const RiskAnalysisOutputSchema = z.object({
  summary: z.string().describe('A high-level summary of the risk assessment.'),
  risks: z.array(z.object({
    factor: z.string().describe('A specific risk factor identified.'),
    severity: z.enum(['Low', 'Medium', 'High']).describe('The assessed severity of the risk factor.'),
    description: z.string().describe('A brief description of the risk factor and its potential impact.')
  })).describe('A list of identified risks with their severity.'),
  mitigations: z.array(z.string()).describe('A list of suggested strategies to mitigate the identified risks.'),
});
export type RiskAnalysisOutput = z.infer<typeof RiskAnalysisOutputSchema>;
