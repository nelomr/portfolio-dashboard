<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  symbol: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 24
  },
  colored: {
    type: Boolean,
    default: false
  },
  class: {
    type: String,
    default: ''
  }
})

const iconSymbolUrl = computed(() => {
  const s = props.symbol?.toLowerCase() || 'generic'
  return new URL(`../../../assets/crypto/${s}.svg`, import.meta.url).href
})

const iconStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`
}))
</script>

<template>
  <div 
    :class="cn(
      'inline-flex items-center justify-center shrink-0 overflow-hidden rounded-full',
      !colored && 'text-foreground',
      props.class
    )"
    :style="iconStyle"
  >
    <img 
      :src="iconSymbolUrl" 
      :alt="symbol" 
      class="w-full h-full object-contain"
      :class="[!colored && 'grayscale brightness-0 dark:invert']"
      @error="$event.target.src = new URL(`../../../assets/crypto/generic.svg`, import.meta.url).href"
    />
  </div>
</template>

<style scoped>
div {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
