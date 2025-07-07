'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { suppliers } from '@/lib/data'
import type { Supplier } from '@/lib/types'
import { Search } from 'lucide-react'

export default function SuppliersPage() {
  const [search, setSearch] = React.useState('')
  const [riskFilter, setRiskFilter] = React.useState('all')
  const [tierFilter, setTierFilter] = React.useState('all')

  const filteredSuppliers = React.useMemo(() => {
    return suppliers.filter((supplier) => {
      const searchMatch = supplier.name
        .toLowerCase()
        .includes(search.toLowerCase())
      const riskMatch =
        riskFilter === 'all' || supplier.riskLevel.toLowerCase() === riskFilter
      const tierMatch =
        tierFilter === 'all' || supplier.tier.toString() === tierFilter
      return searchMatch && riskMatch && tierMatch
    })
  }, [search, riskFilter, tierFilter])

  const getRiskVariant = (risk: Supplier['riskLevel']) => {
    if (risk === 'High') return 'destructive'
    if (risk === 'Medium') return 'secondary'
    return 'outline'
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
        <p className="text-muted-foreground">
          Manage and monitor your supply chain partners.
        </p>
      </header>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Select value={tierFilter} onValueChange={setTierFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="1">Tier 1</SelectItem>
              <SelectItem value="2">Tier 2</SelectItem>
              <SelectItem value="3">Tier 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead className="text-right">Performance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">{supplier.name}</TableCell>
                <TableCell>{supplier.location}</TableCell>
                <TableCell>
                  <Badge variant="outline">Tier {supplier.tier}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getRiskVariant(supplier.riskLevel)}>
                    {supplier.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="w-10">{supplier.performance}%</span>
                    <Progress value={supplier.performance} className="w-24" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
             {filteredSuppliers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No suppliers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
