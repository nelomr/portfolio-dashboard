<script setup lang="ts">
import { RefreshCw } from 'lucide-vue-next'

defineProps<{
  isFetching: boolean
  isRebuilding: boolean
}>()

const emit = defineEmits<{
  rebuild: []
}>()
</script>

<template>
  <header class="flex flex-col sm:flex-row justify-between items-start gap-4 shrink-0 mb-6 lg:mb-8">
    <div class="space-y-1">
      <h1
        class="text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-none bg-gradient-to-r from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent"
      >
        Portfolio <span class="opacity-40 font-thin italic">Analytics</span>
      </h1>
      <div class="flex items-center gap-2">
        <span
          class="w-2 h-2 rounded-full transition-colors duration-500"
          :class="
            isFetching
              ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)] animate-pulse'
              : 'bg-profit shadow-[0_0_10px_rgba(34,197,94,0.3)]'
          "
        />
        <p class="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] font-bold">
          Institutional FIFO Engine • FY 2026
          <span v-if="isFetching" class="text-amber-400 ml-2 animate-pulse">(Sincronizando...)</span>
        </p>
      </div>
    </div>

    <button
      @click="emit('rebuild')"
      :disabled="isRebuilding"
      class="inline-flex items-center gap-2 h-9 px-4 rounded-md border border-border/40 text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <RefreshCw class="w-3.5 h-3.5" :class="{ 'animate-spin': isRebuilding }" />
      {{ isRebuilding ? 'Sincronizando...' : 'Sincronizar Portfolio' }}
    </button>
  </header>
</template>
