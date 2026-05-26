import { defineStore } from 'pinia'
import type { PortfolioData, HoldingItem, TaxLot, LotRecord } from '@/types/portfolio'
import mockPortfolio from '@/data/mockPortfolio'

export interface PortfolioState {
  summary: PortfolioData['summary'] | null
  lots: Record<string, TaxLot[]>
  tokenHistory: Record<string, Record<string, LotRecord>>
  isLoading: boolean
  isRebuilding: boolean
}

export const usePortfolioStore = defineStore('portfolio', {
  state: (): PortfolioState => ({
    summary: null,
    lots: {},
    tokenHistory: {},
    isLoading: false,
    isRebuilding: false,
  }),

  getters: {
    getTotalHoldingsAmount(state): number {
      if (!state.summary) return 0
      return state.summary.metrics.total_equity_eur
    },
    getHoldingsSorted(state): HoldingItem[] {
      if (!state.summary) return []
      return [...state.summary.holdings].sort((a, b) => b.current_value_eur - a.current_value_eur)
    },
    getTotalPnlPercentage(state): number {
      if (!state.summary) return 0
      const totalPnl = state.summary.metrics.total_unrealized_pnl_eur
      const totalEquity = state.summary.metrics.total_equity_eur
      const costBasis = totalEquity - totalPnl
      if (costBasis === 0) return 0
      return (totalPnl / costBasis) * 100
    }
  },

  actions: {
    async fetchSummary() {
      this.isLoading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        this.summary = mockPortfolio.summary
      } finally {
        this.isLoading = false
      }
    },

    async fetchTokenDetails(symbol: string) {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 300))
      
      if (mockPortfolio.lots[symbol]) {
        this.lots[symbol] = mockPortfolio.lots[symbol]
      } else {
        this.lots[symbol] = []
      }
    },

    async fetchTokenHistory(symbol: string) {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 300))
      
      if (mockPortfolio.history[symbol]) {
        this.tokenHistory[symbol] = mockPortfolio.history[symbol]
      } else {
        this.tokenHistory[symbol] = {}
      }
    },

    async triggerRebuild() {
      this.isRebuilding = true
      try {
        // Simulate a longer running task for resyncing the index
        await new Promise(resolve => setTimeout(resolve, 1500))
        // Re-fetch the summary after rebuild
        await this.fetchSummary()
      } finally {
        this.isRebuilding = false
      }
    }
  }
})
