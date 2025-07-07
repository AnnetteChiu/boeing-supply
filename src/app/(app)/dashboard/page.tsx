import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  AlertCircle,
  Clock,
  Package,
  CheckCircle2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { components, supplierConcentrationData } from '@/lib/data'
import type { ChartConfig } from '@/components/ui/chart'

const chartConfig = {
  value: {
    label: 'Suppliers',
  },
  usa: {
    label: 'USA',
    color: 'hsl(var(--chart-1))',
  },
  uk: {
    label: 'UK',
    color: 'hsl(var(--chart-2))',
  },
  france: {
    label: 'France',
    color: 'hsl(var(--chart-3))',
  },
  japan: {
    label: 'Japan',
    color: 'hsl(var(--chart-4))',
  },
  germany: {
    label: 'Germany',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

export default function DashboardPage() {
  const criticalComponents = components.filter(
    (c) => c.leadTime > 100 || c.inventory < 40
  )
  const avgLeadTime = Math.round(components.reduce((acc, c) => acc + c.leadTime, 0) / components.length)
  const totalInventory = components.reduce((acc, c) => acc + c.inventory, 0)

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-accent" />
          <span>Supply Chain Status: Healthy</span>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Lead Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgLeadTime} days</div>
            <p className="text-xs text-muted-foreground">
              -5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inventory
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInventory.toLocaleString()} units</div>
            <p className="text-xs text-muted-foreground">
              +10% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Risks
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 High Risk</div>
            <p className="text-xs text-muted-foreground">
              Advanced Composites (Tier 2)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              On-Time Performance
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.5%</div>
            <p className="text-xs text-muted-foreground">
              Network average
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Supplier Concentration</CardTitle>
            <CardDescription>
              Number of suppliers by geographic location.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart
                accessibilityLayer
                data={supplierConcentrationData}
                margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="location"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="value" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Critical Components Watchlist</CardTitle>
            <CardDescription>
              Components with long lead times or low inventory.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>Lead Time</TableHead>
                  <TableHead>Inventory</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {criticalComponents.map((component) => (
                  <TableRow key={component.id}>
                    <TableCell className="font-medium">
                      {component.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          component.leadTime > 120
                            ? 'destructive'
                            : 'outline'
                        }
                      >
                        {component.leadTime} days
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          component.inventory < 30 ? 'destructive' : 'outline'
                        }
                      >
                        {component.inventory} units
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
