<script setup lang="ts">
import MetricCard from '@/components/portfolio/MetricCard.vue'

defineProps<{
  totalEquity: string
  unrealizedPnl: string
  realizedPnl: string
  roiFormatted: string
  isBullish: boolean
  realizedIsPositive: boolean
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
    <!-- Total Net Equity -->
    <MetricCard label="Patrimonio Neto Total" glowColor="via-primary/20">
      <div class="flex items-baseline gap-2">
        <p class="text-3xl lg:text-4xl font-mono font-black tracking-tighter tabular-nums group-hover:scale-[1.02] transition-transform origin-left">
          {{ totalEquity }}
        </p>
      </div>
    </MetricCard>

    <!-- Unrealized P&L -->
    <MetricCard label="PyG No Realizado" glowColor="via-profit/20">
      <div class="flex flex-col">
        <p
          class="text-3xl lg:text-4xl font-mono font-black tracking-tighter tabular-nums transition-all group-hover:translate-x-1"
          :class="isBullish ? 'text-profit' : 'text-loss'"
        >
          {{ unrealizedPnl }}
        </p>
        <span class="text-[10px] lg:text-xs font-bold opacity-60 font-mono tracking-tighter">
          {{ roiFormatted }}
        </span>
      </div>
    </MetricCard>

    <!-- Realized P&L -->
    <MetricCard label="PyG Realizado (Imponible)" glowColor="via-primary/20">
      <p
        class="text-3xl lg:text-4xl font-mono font-black tracking-tighter tabular-nums transition-all group-hover:translate-x-1"
        :class="realizedIsPositive ? 'text-profit' : 'text-loss'"
      >
        {{ realizedPnl }}
      </p>
    </MetricCard>
  </div>
</template>
