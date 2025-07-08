'use client'

import * as React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { runGeoAnalysis } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Bot, Globe } from 'lucide-react'
import { defaultGeoFactors } from '@/lib/data'
import { useToast } from '@/hooks/use-toast'
import type { GeoAnalysisOutput } from '@/ai/schemas'

const initialState = {
  report: null,
  error: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Analyzing...' : 'Analyze Geo Locations'}
    </Button>
  )
}

function GeoReport({ report }: { report: GeoAnalysisOutput }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg">Geopolitical Hotspots</h3>
        <Card className="mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Coordinates</TableHead>
                <TableHead className="hidden md:table-cell">Summary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.locations.map((loc, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{loc.name}</TableCell>
                  <TableCell className="font-mono text-xs">{loc.latitude.toFixed(2)}, {loc.longitude.toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-foreground/80">{loc.summary}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}

export default function GeoLocationsPage() {
  const [state, formAction] = useFormState(runGeoAnalysis, initialState)
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
        <h1 className="text-3xl font-bold tracking-tight">Geopolitical Analysis</h1>
        <p className="text-muted-foreground">
          Identify and analyze key geographic locations in your supply chain.
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
                placeholder="Enter locations, shipping routes, supplier countries, etc..."
                rows={10}
                defaultValue={defaultGeoFactors}
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
              AI Geopolitical Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            {state?.report ? (
              <GeoReport report={state.report} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center text-muted-foreground">
                 <Globe className="h-12 w-12" />
                <p>Your AI-powered geopolitical assessment will appear here. Provide context and run the analysis.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
