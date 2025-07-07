export type Supplier = {
  id: string
  name: string
  tier: 1 | 2 | 3
  location: string
  riskLevel: 'Low' | 'Medium' | 'High'
  performance: number // Percentage
  components: string[]
}

export type Component = {
  id: string
  name: string
  leadTime: number // in days
  inventory: number
  supplierId: string
}
