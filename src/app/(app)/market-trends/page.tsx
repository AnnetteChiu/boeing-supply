'use client'

import * as React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { predictMarketTrends } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot } from 'lucide-react'
import { defaultMarketTrends } from '@/lib/data'
import { useToast } from '@/hooks/use-toast'

const initialState = {
  prediction: null,
  error: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Analyzing...' : 'Predict Trends'}
    </Button>
  )
}

export default function MarketTrendsPage() {
  const [state, formAction] = useFormState(predictMarketTrends, initialState)
  const { toast } = useToast()

  React.useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      })
    }
  }, [state, toast])

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Market Trends & Predictions</h1>
        <p className="text-muted-foreground">
          Use AI to analyze market data and predict future trends.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Provide Market Context</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="flex flex-col gap-4">
              <Textarea
                name="context"
                placeholder="Enter current market trends, news, and other data..."
                rows={10}
                defaultValue={defaultMarketTrends}
                className="text-sm"
              />
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              AI Prediction
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            {state?.prediction ? (
              <div className="space-y-4 text-sm text-foreground whitespace-pre-wrap">
                {state.prediction}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center text-muted-foreground">
                 <Bot className="h-12 w-12" />
                <p>Your AI-powered market prediction will appear here once you provide context and run the analysis.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
