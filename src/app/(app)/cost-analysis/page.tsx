'use client'

import * as React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { runCostAnalysis } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Bot, DollarSign } from 'lucide-react'
import { defaultCostFactors } from '@/lib/data'
import { useToast } from '@/hooks/use-toast'
import type { CostAnalysisOutput } from '@/ai/schemas'

const initialState = {
  report: null,
  error: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Analyzing...' : 'Analyze Costs'}
    </Button>
  )
}

function CostReport({ report }: { report: CostAnalysisOutput }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg">Summary</h3>
        <p className="text-sm text-foreground/80">{report.summary}</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Cost Breakdown</h3>
        <Card className="mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Estimated Cost</TableHead>
                <TableHead className="hidden md:table-cell">Impact Factors</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.costBreakdown.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.item}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(item.cost)}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.impact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Optimization Recommendations</h3>
        <ul className="list-disc list-inside mt-2 space-y-2 text-sm text-foreground/80">
          {report.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function CostAnalysisPage() {
  const [state, formAction] = useFormState(runCostAnalysis, initialState)
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
        <h1 className="text-3xl font-bold tracking-tight">Cost Analysis</h1>
        <p className="text-muted-foreground">
          Use AI to analyze supply chain costs and identify savings opportunities.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Provide Cost Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="flex flex-col gap-4">
              <Textarea
                name="context"
                placeholder="Enter cost factors like material prices, labor rates, logistics, etc..."
                rows={10}
                defaultValue={defaultCostFactors}
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
              AI Cost Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            {state?.report ? (
              <CostReport report={state.report} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center text-muted-foreground">
                 <DollarSign className="h-12 w-12" />
                <p>Your AI-powered cost assessment will appear here. Provide context and run the analysis to see the report.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
