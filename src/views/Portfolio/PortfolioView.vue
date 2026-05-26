<script setup lang="ts">
import { computed } from "vue";
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-vue-next";
import { usePortfolioData } from "./composables/usePortfolioData";
import { formatCurrency, formatPercent } from "@/composables/useFormatters";

import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Badge from "@/components/ui/badge/Badge.vue";
import Button from "@/components/ui/button/Button.vue";

// Import portfolio data
const { metrics, isFetching, handleRebuild } = usePortfolioData();

// Computed properties for ROI percentage and styling
const pnlValue = computed(() => metrics.value?.total_unrealized_pnl_eur || 0);

const roiPercentage = computed(() => {
  if (!metrics.value || metrics.value.total_equity_eur === 0) return 0;
  const costBasis = metrics.value.total_equity_eur - pnlValue.value;
  if (costBasis <= 0) return 0;
  return (pnlValue.value / costBasis) * 100;
});

const roiColorClass = computed(() => {
  if (pnlValue.value > 0) return "text-green-600 dark:text-green-400";
  if (pnlValue.value < 0) return "text-red-600 dark:text-red-400";
  return "text-gray-500";
});

// Helper for referencing local SVG icons for assets/exchanges
// Task 2.5: Prepare layout to reference local SVGs
const getCryptoIconUrl = (symbol: string) => {
  // Try to return the local asset from assets/crypto folder
  return new URL(
    `../../assets/crypto/${symbol.toLowerCase()}.svg`,
    import.meta.url,
  ).href;
};
</script>

<template>
  <div class="flex flex-col h-full w-full p-6 space-y-6">
    <!-- Header Section -->
    <header
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div class="flex items-center space-x-4">
        <h1 class="font-black tracking-tighter uppercase text-3xl">
          Portfolio
        </h1>
        <Badge>Institutional FIFO Engine • FY 2026</Badge>

        <!-- Amber pulse indicator for fetching -->
        <span v-if="isFetching" class="relative flex h-3 w-3">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-3 w-3 bg-amber-500"
          ></span>
        </span>
      </div>

      <!-- Rebuild Index Action -->
      <Button @click="handleRebuild" :disabled="isFetching">
        <RefreshCw
          class="w-4 h-4 mr-2"
          :class="{ 'animate-spin': isFetching }"
        />
        Rebuild Portfolio
      </Button>
    </header>

    <!-- Metrics Row (3-Column Grid) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Total Net Equity Card -->
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-gray-500"
            >Total Net Equity</CardTitle
          >
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold font-mono">
            {{ formatCurrency(metrics?.total_equity_eur) }}
          </div>
        </CardContent>
      </Card>

      <!-- Unrealized P&L Card -->
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-gray-500"
            >Unrealized P&L</CardTitle
          >
        </CardHeader>
        <CardContent>
          <div class="flex items-center space-x-2">
            <div class="text-2xl font-bold font-mono">
              {{ formatCurrency(pnlValue) }}
            </div>
            <div
              class="flex items-center text-sm font-medium"
              :class="roiColorClass"
            >
              <TrendingUp v-if="pnlValue >= 0" class="w-4 h-4 mr-1" />
              <TrendingDown v-else class="w-4 h-4 mr-1" />
              <span>{{ formatPercent(roiPercentage) }}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Realized P&L (Taxable) Card -->
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-gray-500"
            >Realized P&L (Taxable)</CardTitle
          >
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold font-mono">
            {{ formatCurrency(metrics?.total_realized_pnl_eur) }}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
