'use server'

import { analyzeSupplyChainData } from '@/ai/flows/analyze-supply-chain'
import { generateRiskAssessment } from '@/ai/flows/generate-risk-assessment'
import { z } from 'zod'

const analysisSchema = z.object({
  supplyChainData: z.string().min(1, 'Supply chain data cannot be empty.'),
})

const riskAssessmentSchema = z.object({
  supplyChainData: z.string().min(1, 'Supply chain data cannot be empty.'),
  marketTrends: z.string().min(1, 'Market trends cannot be empty.'),
  geopoliticalFactors: z
    .string()
    .min(1, 'Geopolitical factors cannot be empty.'),
})

export async function runAnalysis(prevState: any, formData: FormData) {
  const validatedFields = analysisSchema.safeParse({
    supplyChainData: formData.get('supplyChainData'),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const result = await analyzeSupplyChainData(validatedFields.data)
    return { data: result.analysisResults }
  } catch (error) {
    console.error(error)
    return { error: 'Failed to run analysis. Please try again.' }
  }
}

export async function runRiskAssessment(prevState: any, formData: FormData) {
  const validatedFields = riskAssessmentSchema.safeParse({
    supplyChainData: formData.get('supplyChainData'),
    marketTrends: formData.get('marketTrends'),
    geopoliticalFactors: formData.get('geopoliticalFactors'),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const result = await generateRiskAssessment(validatedFields.data)
    return { data: result.report }
  } catch (error) {
    console.error(error)
    return { error: 'Failed to generate risk assessment. Please try again.' }
  }
}
