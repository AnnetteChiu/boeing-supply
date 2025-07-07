'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { runRiskAssessment } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  defaultSupplyChainData,
  defaultMarketTrends,
  defaultGeopoliticalFactors,
} from '@/lib/data'
import { Loader2, FileText } from 'lucide-react'
import { Label } from '@/components/ui/label'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <FileText className="mr-2 h-4 w-4" />
      )}
      Generate Report
    </Button>
  )
}

export default function RiskAssessmentPage() {
  const initialState = {
    data: '',
    error: undefined,
  }
  const [state, dispatch] = useFormState(runRiskAssessment, initialState)

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          AI Risk Assessment Report
        </h1>
        <p className="text-muted-foreground">
          Evaluate supply chain resilience based on multiple factors.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <form action={dispatch} className="lg:col-span-1 flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="supplyChainData">Supply Chain Data (JSON)</Label>
            <Textarea
              id="supplyChainData"
              name="supplyChainData"
              rows={8}
              defaultValue={defaultSupplyChainData}
            />
             {state.error?.supplyChainData && (
              <p className="mt-1 text-sm text-destructive">{state.error.supplyChainData[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="marketTrends">Market Trends</Label>
            <Textarea
              id="marketTrends"
              name="marketTrends"
              rows={5}
              defaultValue={defaultMarketTrends}
            />
            {state.error?.marketTrends && (
              <p className="mt-1 text-sm text-destructive">{state.error.marketTrends[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="geopoliticalFactors">Geopolitical Factors</Label>
            <Textarea
              id="geopoliticalFactors"
              name="geopoliticalFactors"
              rows={5}
              defaultValue={defaultGeopoliticalFactors}
            />
            {state.error?.geopoliticalFactors && (
              <p className="mt-1 text-sm text-destructive">{state.error.geopoliticalFactors[0]}</p>
            )}
          </div>
          <SubmitButton />
        </form>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Generated Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              {state.data ? (
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: state.data.replace(/\n/g, '<br />') }}
                />
              ) : (
                <div className="flex h-full min-h-[400px] items-center justify-center rounded-md border border-dashed">
                  <p className="text-center text-muted-foreground">
                    Your comprehensive risk assessment report will appear here.
                  </p>
                </div>
              )}
              {typeof state.error === 'string' && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
