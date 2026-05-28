<template>
  <section>
    <h3 class="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)] opacity-80"></span>
      Historial de Ventas y P&L Realizado
    </h3>
    <div class="overflow-x-auto rounded-lg border border-border/20 bg-muted/10 shadow-inner">
      <table class="w-full text-left text-sm">
        <thead class="bg-muted/30 text-muted-foreground border-b border-border/20 uppercase text-[10px] tracking-widest font-bold">
          <tr>
            <th class="px-4 py-3">Fecha de Venta</th>
            <th class="px-4 py-3 text-right">Cantidad Vendida</th>
            <th class="px-4 py-3 text-right">Precio de Venta</th>
            <th class="px-4 py-3 text-right">Ganancia / Pérdida</th>
            <th class="px-4 py-3 text-center">Tipo</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border/10">
          <tr v-for="disp in history" :key="disp.id" class="hover:bg-muted/20 transition-colors">
            <td class="px-4 py-3 text-muted-foreground">{{ formatDate(disp.disposal_date) }}</td>
            <td class="px-4 py-3 text-right font-mono text-foreground font-medium tabular-nums">{{ formatNumber(disp.amount_from_lot) }}</td>
            <td class="px-4 py-3 text-right font-mono text-muted-foreground tabular-nums">{{ formatCurrency(disp.sale_price_eur) }}</td>
            <td class="px-4 py-3 text-right font-mono font-bold tabular-nums" :class="disp.gain_loss_eur >= 0 ? 'text-profit' : 'text-loss'">
              <span v-if="disp.gain_loss_eur > 0">+</span>{{ formatCurrency(disp.gain_loss_eur) }}
            </td>
            <td class="px-4 py-3 text-center">
                <Badge variant="outline" class="text-[9px] bg-accent/10 text-accent border-accent/20 uppercase tracking-widest border-none">Vendido</Badge>
            </td>
          </tr>
          <tr v-if="history.length === 0">
            <td colspan="5" class="px-4 py-8 text-center text-muted-foreground/60 italic text-[10px] uppercase font-black tracking-widest">No hay historial de ventas.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { formatCurrency, formatNumber, formatDate } from '@/composables/useFormatters'
import { Badge } from '@/components/ui/badge'
import type { LotHistoryEvent } from '@/types/portfolio'

defineProps<{
  history: LotHistoryEvent[]
}>()
</script>
