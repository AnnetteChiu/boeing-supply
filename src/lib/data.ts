import type { Supplier, Component } from './types'

export const suppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'AeroStructures Inc.',
    tier: 1,
    location: 'Wichita, USA',
    riskLevel: 'Low',
    performance: 98,
    components: ['COMP-101', 'COMP-102'],
  },
  {
    id: 'SUP-002',
    name: 'JetEngine Masters',
    tier: 1,
    location: 'Derby, UK',
    riskLevel: 'Low',
    performance: 95,
    components: ['COMP-201', 'COMP-202'],
  },
  {
    id: 'SUP-003',
    name: 'Avionics Global',
    tier: 1,
    location: 'Toulouse, France',
    riskLevel: 'Medium',
    performance: 92,
    components: ['COMP-301'],
  },
  {
    id: 'SUP-004',
    name: 'Precision Parts Co.',
    tier: 2,
    location: 'Nagoya, Japan',
    riskLevel: 'Low',
    performance: 99,
    components: ['COMP-101-A', 'COMP-201-B'],
  },
  {
    id: 'SUP-005',
    name: 'Advanced Composites',
    tier: 2,
    location: 'Seattle, USA',
    riskLevel: 'High',
    performance: 85,
    components: ['COMP-102-C'],
  },
  {
    id: 'SUP-006',
    name: 'Hydraulics Specialists',
    tier: 2,
    location: 'Hamburg, Germany',
    riskLevel: 'Medium',
    performance: 93,
    components: ['COMP-401'],
  },
]

export const components: Component[] = [
  { id: 'COMP-101', name: 'Fuselage Section', leadTime: 90, inventory: 50, supplierId: 'SUP-001' },
  { id: 'COMP-102', name: 'Wing Assembly', leadTime: 120, inventory: 30, supplierId: 'SUP-001' },
  { id: 'COMP-201', name: 'Turbine Engine', leadTime: 180, inventory: 25, supplierId: 'SUP-002' },
  { id: 'COMP-202', name: 'Nacelle', leadTime: 100, inventory: 40, supplierId: 'SUP-002' },
  { id: 'COMP-301', name: 'Cockpit Display System', leadTime: 60, inventory: 150, supplierId: 'SUP-003' },
  { id: 'COMP-401', name: 'Landing Gear System', leadTime: 150, inventory: 35, supplierId: 'SUP-006' },
  { id: 'COMP-101-A', name: 'Titanium Fasteners', leadTime: 30, inventory: 10000, supplierId: 'SUP-004' },
  { id: 'COMP-201-B', name: 'Turbine Blades', leadTime: 75, inventory: 500, supplierId: 'SUP-004' },
  { id: 'COMP-102-C', name: 'Carbon Fiber Panels', leadTime: 45, inventory: 2000, supplierId: 'SUP-005' },
]

export const supplierConcentrationData = [
  { location: 'USA', value: 2, fill: 'var(--color-chart-1)' },
  { location: 'UK', value: 1, fill: 'var(--color-chart-2)' },
  { location: 'France', value: 1, fill: 'var(--color-chart-3)' },
  { location: 'Japan', value: 1, fill: 'var(--color-chart-4)' },
  { location: 'Germany', value: 1, fill: 'var(--color-chart-5)' },
]

export const defaultSupplyChainData = `{
  "suppliers": [
    {"id": "SUP-001", "name": "AeroStructures Inc.", "location": "USA", "tier": 1},
    {"id": "SUP-002", "name": "JetEngine Masters", "location": "UK", "tier": 1},
    {"id": "SUP-004", "name": "Precision Parts Co.", "location": "Japan", "tier": 2}
  ],
  "components": [
    {"id": "COMP-101", "name": "Fuselage Section", "supplier": "SUP-001"},
    {"id": "COMP-201", "name": "Turbine Engine", "supplier": "SUP-002"},
    {"id": "COMP-101-A", "name": "Titanium Fasteners", "supplier": "SUP-004"}
  ],
  "relationships": [
    {"from": "SUP-004", "to": "SUP-001", "type": "supplies"},
    {"from": "COMP-101-A", "to": "COMP-101", "type": "part of"}
  ]
}`

export const defaultMarketTrends = `1. Increased demand for fuel-efficient aircraft.
2. Fluctuations in raw material prices (e.g., aluminum, titanium).
3. Growing adoption of sustainable aviation fuels (SAF).`

export const defaultGeopoliticalFactors = `1. Trade tariffs between major economic blocs.
2. Political instability in key resource-rich regions.
3. Stricter international environmental regulations on aviation.`

export const defaultCostFactors = `1. Raw Material: Titanium prices have increased by 8% in the last quarter.
2. Labor Costs: Skilled labor wages in Wichita, USA have gone up by 3%.
3. Logistics: Shipping costs from Asia have increased by 15% due to port congestion.
4. Energy: Electricity costs for manufacturing plants are up 5%.`

export const defaultGeoFactors = `1. Key supplier 'AeroStructures Inc.' is based in Wichita, USA.
2. Shipping routes pass through the South China Sea.
3. A new manufacturing plant is being considered in either Poland or Vietnam.
4. Raw materials like cobalt are sourced from the Democratic Republic of Congo.`
