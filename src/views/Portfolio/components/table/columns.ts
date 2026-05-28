import { h } from 'vue'
import { ChevronDown, ChevronRight } from 'lucide-vue-next'
import { formatCurrency } from '@/composables/useFormatters'

import AssetCell from './cells/AssetCell.vue'
import PerformanceCell from './cells/PerformanceCell.vue'
import LocationsCell from './cells/LocationsCell.vue'

export const createColumns = (onExpand: (symbol: string) => void, isLoading: boolean) => [
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }: any) => {
      return h('button', {
        onClick: (e: Event) => {
          e.stopPropagation()
          row.toggleExpanded()
        },
        class: "p-2 hover:bg-muted/50 rounded-md transition-colors w-full h-full flex justify-center items-center group"
      }, [
        row.getIsExpanded() 
          ? h(ChevronDown, { class: "w-4 h-4 text-primary" })
          : h(ChevronRight, { class: "w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" })
      ])
    },
    size: 48,
  },
  {
    accessorKey: 'symbol',
    header: 'Activo',
    cell: ({ row }: any) => h(AssetCell, { 
      symbol: row.original.symbol, 
      onExpand 
    }),
    size: 200,
  },
  {
    id: 'balance',
    header: () => h('div', { class: "text-right" }, "Balance"),
    cell: ({ row }: any) => {
       const amount = row.original.amount || 0
       return h('div', { class: "text-right font-mono font-bold text-xs" }, amount.toFixed(4))
    }
  },
  {
    id: 'avg_cost',
    header: () => h('div', { class: "text-right" }, "Coste Medio"),
    cell: ({ row }: any) => {
       const cost = formatCurrency(row.original.avgPriceEur || row.original.costBasisEur || 0)
       return h('div', { class: "text-right font-mono text-muted-foreground text-xs tabular-nums" }, cost)
    }
  },
  {
    accessorKey: 'currentValueEur',
    header: () => h('div', { class: "text-right" }, "Valor de Mercado"),
    cell: ({ getValue }: any) => {
        const val = getValue() || 0
        return h('div', { class: "text-right font-mono font-black text-sm tracking-tighter tabular-nums" }, formatCurrency(val))
    },
  },
  {
    id: 'performance',
    header: () => h('div', { class: "text-right" }, "Rendimiento"),
    cell: ({ row }: any) => h(PerformanceCell, { row: row.original })
  },
  {
    id: 'locations',
    header: () => h('div', { class: "text-right" }, "Ubicaciones"),
    cell: ({ row }: any) => h(LocationsCell, { row: row.original, isLoading })
  }
]
