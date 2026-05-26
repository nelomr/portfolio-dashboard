import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '@/stores/portfolioStore'

// Helper to generate consistent colors based on string
function stringToColor(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777215)).toString(16)
  return '#' + '000000'.substring(0, 6 - color.length) + color
}

export function usePortfolioData() {
  const store = usePortfolioStore()
  
  // Auto-fetch data on mount if not already loaded
  onMounted(() => {
    if (!store.summary && !store.isLoading) {
      store.fetchSummary()
    }
  })
  
  // Destructure reactive state from store
  const { summary, isLoading: isFetching, isRebuilding } = storeToRefs(store)

  // Computed metrics
  const metrics = computed(() => summary.value?.metrics || null)
  
  // Sorted holdings (using the store getter)
  const filteredHoldings = computed(() => store.getHoldingsSorted)

  // Allocation Data for Donut Chart
  const allocationData = computed(() => {
    return filteredHoldings.value.map(holding => ({
      label: holding.symbol,
      value: holding.current_value_eur,
      color: stringToColor(holding.symbol)
    }))
  })

  // Performance Data for Line Chart
  // Synthetic data based on total_equity simulating last 7 days of performance
  const performanceData = computed(() => {
    if (!metrics.value) return []
    const currentEquity = metrics.value.total_equity_eur
    const baseEquity = currentEquity * 0.95 // Assume started 5% lower 7 days ago
    const history = []
    
    const now = new Date()
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      
      // Add some random walk for intermediate days, and use exactly currentEquity for today
      const progress = 1 - (i / 6) // 0 to 1
      const randomNoise = i === 0 ? 0 : (Math.random() - 0.5) * 0.02 * currentEquity // +/- 1% noise
      const value = baseEquity + ((currentEquity - baseEquity) * progress) + randomNoise
      
      history.push({
        time: d.toISOString().split('T')[0],
        value: Number(value.toFixed(2))
      })
    }
    return history
  })

  const handleRebuild = async () => {
    await store.triggerRebuild()
  }

  return {
    store,
    isFetching,
    isRebuilding,
    metrics,
    filteredHoldings,
    allocationData,
    performanceData,
    handleRebuild
  }
}
