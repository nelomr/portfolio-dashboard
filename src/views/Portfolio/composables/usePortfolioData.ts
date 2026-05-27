import { computed } from 'vue'
import { usePortfolioSummaryQuery, useRebuildMutation } from '@/composables/queries/usePortfolioQueries'

export function usePortfolioData() {
  // Use Pinia Colada queries instead of the old store
  const { data: summary, isLoading: isFetching } = usePortfolioSummaryQuery()
  const { mutateAsync: rebuild, isLoading: isRebuilding } = useRebuildMutation()

  // Computed metrics
  const metrics = computed(() => summary.value?.metrics || null)
  
  // Sorted holdings
  const filteredHoldings = computed(() => {
    if (!summary.value) return []
    return [...summary.value.holdings].sort(
      (a, b) => b.currentValueEur - a.currentValueEur
    )
  })

  const handleRebuild = async () => {
    await rebuild()
  }

  return {
    isFetching,
    isRebuilding,
    metrics,
    filteredHoldings,
    handleRebuild
  }
}
