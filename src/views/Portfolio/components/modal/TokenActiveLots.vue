<template>
  <section>
    <h3 class="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)] opacity-80"></span>
      Lotes FIFO Activos (Unidades sin vender)
    </h3>
    <div class="overflow-x-auto rounded-lg border border-border/20 bg-muted/10 shadow-inner">
      <table class="w-full text-left text-sm">
        <thead class="bg-muted/30 text-muted-foreground border-b border-border/20 uppercase text-[10px] tracking-widest font-bold">
          <tr>
            <th class="px-4 py-3">Fecha de Adquisición</th>
            <th class="px-4 py-3 text-right">Cantidad Restante</th>
            <th class="px-4 py-3 text-right">Precio de Compra</th>
            <th class="px-4 py-3 text-right">Coste Restante</th>
            <th class="px-4 py-3 text-center">Estado</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border/10">
          <tr v-for="lot in lots" :key="lot.id" class="hover:bg-muted/20 transition-colors">
            <td class="px-4 py-3 text-muted-foreground">{{ formatDate(lot.date) }}</td>
            <td class="px-4 py-3 text-right font-mono text-foreground font-medium tabular-nums">{{ formatNumber(lot.remaining_qty) }}</td>
            <td class="px-4 py-3 text-right font-mono text-muted-foreground tabular-nums">{{ formatCurrency(lot.unit_cost) }}</td>
            <td class="px-4 py-3 text-right font-mono text-foreground font-semibold tabular-nums">{{ formatCurrency(lot.total_cost) }}</td>
            <td class="px-4 py-3 text-center">
                <Badge variant="outline" class="text-[9px] bg-profit/10 text-profit border-profit/20 uppercase tracking-widest border-none">En Cartera</Badge>
            </td>
          </tr>
          <tr v-if="lots.length === 0">
            <td colspan="5" class="px-4 py-8 text-center text-muted-foreground/60 italic text-[10px] uppercase font-black tracking-widest">No hay lotes abiertos para este activo.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { formatCurrency, formatNumber, formatDate } from '@/composables/useFormatters'
import { Badge } from '@/components/ui/badge'
import type { TaxLot } from '@/types/portfolio'

defineProps<{
  lots: TaxLot[]
}>()
</script>
