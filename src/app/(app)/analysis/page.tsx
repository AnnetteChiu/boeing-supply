'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { runAnalysis } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { defaultSupplyChainData } from '@/lib/data'
import { Loader2, Sparkles } from 'lucide-react'
import { Label } from '@/components/ui/label'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Analyze Supply Chain
    </Button>
  )
}

export default function AnalysisPage() {
  const initialState = {
    data: '',
    error: undefined,
  }
  const [state, dispatch] = useFormState(runAnalysis, initialState)

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          AI Supply Chain Analysis
        </h1>
        <p className="text-muted-foreground">
          Identify key relationships, dependencies, and potential
          vulnerabilities.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        <form action={dispatch} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="supplyChainData" className="mb-2 block">Supply Chain Data (JSON)</Label>
            <Textarea
              id="supplyChainData"
              name="supplyChainData"
              rows={20}
              placeholder="Enter your supply chain data in JSON format..."
              defaultValue={defaultSupplyChainData}
            />
            {state.error?.supplyChainData && (
              <p className="mt-1 text-sm text-destructive">{state.error.supplyChainData[0]}</p>
            )}
          </div>
          <SubmitButton />
        </form>

        <div className="flex flex-col gap-4">
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {state.data ? (
                 <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: state.data.replace(/\n/g, '<br />') }}
                />
              ) : (
                <div className="flex h-full min-h-[200px] items-center justify-center rounded-md border border-dashed">
                  <p className="text-muted-foreground">
                    Your analysis will appear here.
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
