import { computed } from 'vue'
import type { Ref } from 'vue'
import type { PortfolioMetrics } from '@/types/portfolio'

/**
 * Derives presentation-level metrics from raw portfolio data.
 * Keeps PortfolioView free of computed-logic clutter.
 */
export function usePortfolioMetrics(metrics: Ref<PortfolioMetrics | null>) {
  const pnlValue = computed(() => metrics.value?.total_unrealized_pnl_eur ?? 0)

  const realizedPnlValue = computed(() => metrics.value?.total_realized_pnl_eur ?? 0)

  const roiPercentage = computed(() => {
    if (!metrics.value || metrics.value.total_equity_eur === 0) return 0
    const costBasis = metrics.value.total_equity_eur - pnlValue.value
    if (costBasis <= 0) return 0
    return (pnlValue.value / costBasis) * 100
  })

  /** Pre-formatted ROI string with sign, e.g. "+5.23%" */
  const roiFormatted = computed(() => {
    const val = roiPercentage.value
    const sign = val >= 0 ? '+' : ''
    return `${sign}${val.toFixed(2)}%`
  })

  const roiColorClass = computed(() => {
    if (pnlValue.value > 0) return 'text-profit'
    if (pnlValue.value < 0) return 'text-loss'
    return 'text-muted-foreground'
  })

  const isBullish = computed(() => pnlValue.value >= 0)

  const realizedIsPositive = computed(() => realizedPnlValue.value >= 0)

  return {
    pnlValue,
    realizedPnlValue,
    roiPercentage,
    roiFormatted,
    roiColorClass,
    isBullish,
    realizedIsPositive,
  }
}
