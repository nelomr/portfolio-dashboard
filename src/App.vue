<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Dashboard Portfolio')
</script>

<template>
  <div class="min-h-screen flex flex-col bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30">
    <!-- Header -->
    <header class="sticky top-0 z-10 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 class="text-xl font-semibold tracking-tight text-white">{{ title }}</h1>
          </div>
          <nav class="hidden md:flex gap-6">
            <a href="#" class="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Overview</a>
            <a href="#" class="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Analytics</a>
            <a href="#" class="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Reports</a>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Metric Cards -->
        <div class="rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/[0.07]">
          <h3 class="text-sm font-medium text-zinc-400">Total Revenue</h3>
          <p class="mt-2 text-3xl font-semibold text-white">$45,231.89</p>
          <div class="mt-2 flex items-center text-sm text-emerald-400">
            <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +20.1% from last month
          </div>
        </div>
        
        <div class="rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/[0.07]">
          <h3 class="text-sm font-medium text-zinc-400">Active Users</h3>
          <p class="mt-2 text-3xl font-semibold text-white">+2,350</p>
          <div class="mt-2 flex items-center text-sm text-emerald-400">
            <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +180.1% from last month
          </div>
        </div>

        <div class="rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/[0.07]">
          <h3 class="text-sm font-medium text-zinc-400">Sales</h3>
          <p class="mt-2 text-3xl font-semibold text-white">+12,234</p>
          <div class="mt-2 flex items-center text-sm text-rose-400">
            <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
            -4.5% from last month
          </div>
        </div>
      </div>

      <!-- Chart Placeholder Area -->
      <div class="rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm h-[400px] flex items-center justify-center flex-col">
        <div class="w-16 h-16 mb-4 rounded-full bg-indigo-500/10 flex items-center justify-center">
          <svg class="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p class="text-zinc-400 text-center max-w-md">
          Lightweight Charts (TradingView) will be integrated here.<br/>
          Setup is complete with Pinia, Pinia Colada, and TailwindCSS 4.
        </p>
      </div>
    </main>
  </div>
</template>

<style>
/* Any custom styles here, but prefer Tailwind utilities in template */
</style>
