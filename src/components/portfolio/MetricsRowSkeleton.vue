<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
import MetricCard from '@/components/portfolio/MetricCard.vue'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
    <MetricCard label="Patrimonio Neto Total" glowColor="via-primary/20">
      <Skeleton class="h-9 w-40 rounded-md mt-1 opacity-50" />
    </MetricCard>

    <MetricCard label="PyG No Realizado" glowColor="via-profit/20">
      <div class="flex flex-col gap-1.5 mt-1">
        <Skeleton class="h-9 w-32 rounded-md opacity-50" />
        <Skeleton class="h-3 w-12 rounded-md opacity-50" />
      </div>
    </MetricCard>

    <MetricCard label="PyG Realizado (Imponible)" glowColor="via-primary/20">
      <Skeleton class="h-9 w-32 rounded-md mt-1 opacity-50" />
    </MetricCard>
  </div>
</template>
