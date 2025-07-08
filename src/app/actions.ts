'use server'

import { predictTrends } from '@/ai/flows/predict-trends-flow';
import { analyzeRisks } from '@/ai/flows/risk-analysis-flow';
import { analyzeCosts } from '@/ai/flows/cost-analysis-flow';
import type { RiskAnalysisOutput, CostAnalysisOutput } from '@/ai/schemas';

type PredictionState = {
  prediction: string | null;
  error: string | null;
};

export async function predictMarketTrends(
  prevState: PredictionState,
  formData: FormData
): Promise<PredictionState> {
  const context = formData.get('context') as string;

  if (!context) {
    return { prediction: null, error: 'Please provide some context for the analysis.' };
  }

  try {
    const result = await predictTrends({ context });
    return { prediction: result.prediction, error: null };
  } catch (e: any) {
    console.error(e);
    return { prediction: null, error: 'Failed to generate prediction. Please try again.' };
  }
}

type RiskAnalysisState = {
  report: RiskAnalysisOutput | null;
  error: string | null;
};

export async function runRiskAnalysis(
  prevState: RiskAnalysisState,
  formData: FormData
): Promise<RiskAnalysisState> {
  const context = formData.get('context') as string;

  if (!context) {
    return { report: null, error: 'Please provide some context for the analysis.' };
  }

  try {
    const result = await analyzeRisks({ context });
    return { report: result, error: null };
  } catch (e: any) {
    console.error(e);
    return { report: null, error: 'Failed to run risk analysis. Please try again.' };
  }
}

type CostAnalysisState = {
  report: CostAnalysisOutput | null;
  error: string | null;
};

export async function runCostAnalysis(
  prevState: CostAnalysisState,
  formData: FormData
): Promise<CostAnalysisState> {
  const context = formData.get('context') as string;

  if (!context) {
    return { report: null, error: 'Please provide some context for the analysis.' };
  }

  try {
    const result = await analyzeCosts({ context });
    return { report: result, error: null };
  } catch (e: any) {
    console.error(e);
    return { report: null, error: 'Failed to run cost analysis. Please try again.' };
  }
}
