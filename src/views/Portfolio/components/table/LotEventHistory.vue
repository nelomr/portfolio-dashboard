<template>
  <div class="border-l-2 border-primary/40 ml-12 bg-background/20">
    <Table>
       <TableHeader>
          <TableRow class="hover:bg-transparent">
             <TableHead class="h-7 text-[9px] text-muted-foreground/60 uppercase tracking-widest pl-4 font-black">Fecha Evento</TableHead>
             <TableHead class="h-7 text-[9px] text-muted-foreground/60 uppercase tracking-widest font-black">Concepto</TableHead>
             <TableHead class="h-7 text-[9px] text-muted-foreground/60 uppercase tracking-widest text-right font-black">Cant. Afectada</TableHead>
             <TableHead class="h-7 text-[9px] text-muted-foreground/60 uppercase tracking-widest text-right font-black">Precio Venta</TableHead>
             <TableHead class="h-7 text-[9px] text-muted-foreground/60 uppercase tracking-widest text-right font-black">PyG (€)</TableHead>
             <TableHead class="h-7 text-[9px] text-muted-foreground/60 uppercase tracking-widest text-right font-black">Notas</TableHead>
          </TableRow>
       </TableHeader>
       <TableBody>
          <TableRow
            v-for="event in events"
            :key="event.id || event.disposal_date"
            :class="cn('border-b border-border/5', !event.is_taxable ? 'opacity-60' : 'hover:bg-muted/5')"
          >
             <TableCell class="py-2 font-mono text-[10px] text-muted-foreground pl-4">{{ formatDate(event.disposal_date) }}</TableCell>
             <TableCell class="py-2">
                <Badge :variant="getEventBadge(event).variant as any" class="text-[8px] font-black uppercase tracking-widest border-none">
                   {{ getEventBadge(event).label }}
                </Badge>
             </TableCell>
             <TableCell class="py-2 text-right font-mono text-[10px] tabular-nums text-muted-foreground">
                -{{ (event.amount_from_lot || 0).toFixed(8) }}
             </TableCell>
             <TableCell class="py-2 text-right font-mono text-[10px] tabular-nums">{{ formatCurrency(event.sale_price_eur) }}</TableCell>
             <TableCell
                class="py-2 text-right font-mono text-[10px] tabular-nums font-bold"
                :class="event.gain_loss_eur >= 0 ? 'text-profit' : 'text-loss'"
             >{{ formatCurrency(event.gain_loss_eur) }}</TableCell>
             <TableCell class="py-2 text-right">
                <div v-if="!event.is_taxable" class="group/tooltip relative inline-flex items-center justify-end cursor-help">
                   <ShieldCheck class="w-3.5 h-3.5 text-muted-foreground/50" />
                   <div class="absolute right-0 bottom-full mb-2 w-52 p-2.5 bg-popover border border-border/30 rounded-lg shadow-xl text-[9px] text-popover-foreground opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity z-50 normal-case font-sans tracking-normal leading-relaxed text-left">
                      <span class="font-bold text-muted-foreground block mb-1">Evento No Imponible</span>
                      Este movimiento no genera plusvalía/minusvalía fiscal (LIRPF Art. 33.1).
                   </div>
                </div>
                <span v-else-if="event.notes" class="text-[9px] font-mono text-muted-foreground/50 uppercase">{{ event.notes }}</span>
             </TableCell>
          </TableRow>
       </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { formatCurrency, formatDate } from '@/composables/useFormatters'

defineProps({
  events: { type: Array as () => any[], required: true }
})

const getEventBadge = (event: any) => {
  if (event.flag === 'WALLET_ACTIVATION') return { variant: 'secondary', label: 'Activación' };
  if (!event.is_taxable) return { variant: 'secondary', label: 'Exento' };
  return event.gain_loss_eur >= 0
    ? { variant: 'profit', label: 'Ganancia' }
    : { variant: 'loss', label: 'Pérdida' };
};
</script>
