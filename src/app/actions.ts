'use server'

import { predictTrends } from '@/ai/flows/predict-trends-flow';

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
