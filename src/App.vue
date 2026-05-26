<script setup lang="ts">
import { ref } from 'vue'
import PortfolioView from '@/views/Portfolio/PortfolioView.vue'

const title = ref('Portfolio Dashboard')
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/30">
    <!-- Header -->
    <header class="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-lg">
              <svg class="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 class="text-xl font-semibold tracking-tight">{{ title }}</h1>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <PortfolioView />
    </main>
  </div>
</template>

<style>
/* Global app overrides if needed */
</style>
