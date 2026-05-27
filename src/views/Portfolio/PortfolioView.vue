<script setup lang="ts">
import { usePortfolioData } from './composables/usePortfolioData'
import { useChartData } from './composables/useChartData'
import { usePortfolioMetrics } from '@/composables/usePortfolioMetrics'
import { formatCurrency } from '@/composables/useFormatters'

import PortfolioHeader from '@/components/portfolio/PortfolioHeader.vue'
import MetricsRow from '@/components/portfolio/MetricsRow.vue'
import ChartsRow from '@/components/portfolio/ChartsRow.vue'

// 1. Data Fetching & State
const {
  metrics,
  isFetching,
  isRebuilding,
  handleRebuild,
  filteredHoldings,
} = usePortfolioData()

// 2. Formatting & Calculations
const { pnlValue, roiFormatted, isBullish, realizedIsPositive, realizedPnlValue } =
  usePortfolioMetrics(metrics)

// 3. UI Chart Data Transformation
const { allocationData, performanceData } = useChartData(metrics, filteredHoldings)
</script>

<template>
  <div class="h-full flex flex-col overflow-hidden bg-transparent">
    <!-- Header -->
    <PortfolioHeader
      :isFetching="isFetching"
      :isRebuilding="isRebuilding"
      @rebuild="handleRebuild"
    />

    <!-- Content Grid -->
    <div class="flex-1 min-h-0 flex flex-col gap-6 lg:gap-8">
      <!-- 1. Charts first (reference layout) -->
      <ChartsRow
        :performanceData="performanceData"
        :allocationData="allocationData"
      />

      <!-- 2. Metrics row below charts -->
      <MetricsRow
        :totalEquity="formatCurrency(metrics?.totalEquityEur)"
        :unrealizedPnl="formatCurrency(pnlValue)"
        :realizedPnl="formatCurrency(realizedPnlValue)"
        :roiFormatted="roiFormatted"
        :isBullish="isBullish"
        :realizedIsPositive="realizedIsPositive"
      />

      <!-- 3. Holdings Table — Proposal 05 -->
      <!-- <HoldingsTable /> -->
    </div>
  </div>
</template>
