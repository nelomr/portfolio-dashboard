import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { usePortfolioData } from '@/views/Portfolio/composables/usePortfolioData'

describe('Portfolio Data Composable (portfolio-data-composable)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  it('Initializing Composable', () => {
    const { isFetching, isRebuilding, metrics, filteredHoldings } = usePortfolioData()
    
    expect(isFetching.value).toBe(false)
    expect(isRebuilding.value).toBe(false)
    expect(metrics.value).toBeNull()
    expect(filteredHoldings.value).toEqual([])
  })

  it('Generate Allocation Data', async () => {
    const store = usePortfolioStore()
    const { allocationData } = usePortfolioData()
    
    // Empty initially
    expect(allocationData.value).toEqual([])
    
    const fetchPromise = store.fetchSummary()
    await vi.advanceTimersByTimeAsync(500)
    await fetchPromise
    
    expect(allocationData.value.length).toBeGreaterThan(0)
    expect(allocationData.value[0]).toHaveProperty('label')
    expect(allocationData.value[0]).toHaveProperty('value')
    expect(allocationData.value[0]).toHaveProperty('color')
    
    // Check if valid hex color
    expect(allocationData.value[0].color).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('Generate Performance Data', async () => {
    const store = usePortfolioStore()
    const { performanceData } = usePortfolioData()
    
    // Empty initially
    expect(performanceData.value).toEqual([])
    
    const fetchPromise = store.fetchSummary()
    await vi.advanceTimersByTimeAsync(500)
    await fetchPromise
    
    // Should generate synthetic history of 7 days
    expect(performanceData.value.length).toBe(7)
    expect(performanceData.value[0]).toHaveProperty('time')
    expect(performanceData.value[0]).toHaveProperty('value')
    
    // Final value should exactly match current total_equity
    const lastPoint = performanceData.value[performanceData.value.length - 1]
    expect(lastPoint.value).toBe(store.summary?.metrics.total_equity_eur)
  })

  it('Triggering Rebuild', async () => {
    const store = usePortfolioStore()
    const { handleRebuild, isRebuilding } = usePortfolioData()
    
    // Spy on store action
    const triggerRebuildSpy = vi.spyOn(store, 'triggerRebuild')
    
    const rebuildPromise = handleRebuild()
    
    // State should reflect rebuilding
    expect(isRebuilding.value).toBe(true)
    expect(triggerRebuildSpy).toHaveBeenCalled()
    
    await vi.advanceTimersByTimeAsync(2000)
    await rebuildPromise
    
    expect(isRebuilding.value).toBe(false)
  })
})
