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

export const CostAnalysisInputSchema = z.object({
  context: z.string().describe('User-provided context about components, suppliers, and logistics for cost analysis.'),
});
export type CostAnalysisInput = z.infer<typeof CostAnalysisInputSchema>;

export const CostAnalysisOutputSchema = z.object({
  summary: z.string().describe('A high-level summary of the cost analysis.'),
  costBreakdown: z.array(z.object({
    item: z.string().describe('The specific cost item being analyzed (e.g., raw materials, labor, shipping).'),
    cost: z.number().describe('The estimated cost for the item in USD.'),
    impact: z.string().describe('A brief description of the factors influencing this cost.')
  })).describe('A detailed breakdown of various cost components.'),
  recommendations: z.array(z.string()).describe('A list of suggested strategies for cost optimization.'),
});
export type CostAnalysisOutput = z.infer<typeof CostAnalysisOutputSchema>;

export const GeoAnalysisInputSchema = z.object({
  context: z.string().describe('User-provided context about suppliers, routes, or regions for geopolitical analysis.'),
});
export type GeoAnalysisInput = z.infer<typeof GeoAnalysisInputSchema>;

export const GeoAnalysisOutputSchema = z.object({
  locations: z.array(z.object({
    name: z.string().describe('The name of the identified geographic location (e.g., country, city, region).'),
    latitude: z.number().describe('The latitude of the location.'),
    longitude: z.number().describe('The longitude of the location.'),
    summary: z.string().describe('A brief summary of the geopolitical significance or risks for the supply chain at this location.'),
  })).describe('A list of identified geographic locations with their analysis.'),
});
export type GeoAnalysisOutput = z.infer<typeof GeoAnalysisOutputSchema>;
