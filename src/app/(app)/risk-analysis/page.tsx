
'use client'

import * as React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { runRiskAnalysis } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Bot, ShieldAlert } from 'lucide-react'
import { defaultGeopoliticalFactors } from '@/lib/data'
import { useToast } from '@/hooks/use-toast'
import type { RiskAnalysisOutput } from '@/ai/schemas'

const initialState = {
  report: null,
  error: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Analyzing...' : 'Analyze Risks'}
    </Button>
  )
}

function RiskReport({ report }: { report: RiskAnalysisOutput }) {
  const getRiskVariant = (severity: 'Low' | 'Medium' | 'High') => {
    if (severity === 'High') return 'destructive'
    if (severity === 'Medium') return 'secondary'
    return 'outline'
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg">Summary</h3>
        <p className="text-sm text-foreground/80">{report.summary}</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Identified Risks</h3>
        <Card className="mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk Factor</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.risks.map((risk, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{risk.factor}</TableCell>
                  <TableCell>
                    <Badge variant={getRiskVariant(risk.severity)}>{risk.severity}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{risk.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Mitigation Strategies</h3>
        <ul className="list-disc list-inside mt-2 space-y-2 text-sm text-foreground/80">
          {report.mitigations.map((strat, index) => (
            <li key={index}>{strat}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function RiskAnalysisPage() {
  const [state, formAction] = useFormState(runRiskAnalysis, initialState)
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
        <h1 className="text-3xl font-bold tracking-tight">Risk Analysis</h1>
        <p className="text-muted-foreground">
          Assess supply chain risks using AI based on geopolitical and other factors.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Provide Context for Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="flex flex-col gap-4">
              <Textarea
                name="context"
                placeholder="Enter geopolitical events, supplier issues, etc..."
                rows={10}
                defaultValue={defaultGeopoliticalFactors}
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
              AI Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            {state?.report ? (
              <RiskReport report={state.report} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center text-muted-foreground">
                 <ShieldAlert className="h-12 w-12" />
                <p>Your AI-powered risk assessment will appear here. Provide context and run the analysis to see the report.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
