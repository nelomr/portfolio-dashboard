import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePortfolioStore } from '@/stores/portfolioStore'

describe('Portfolio Store (portfolio-state-management)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  it('Default Store State', () => {
    const store = usePortfolioStore()
    expect(store.summary).toBeNull()
    expect(store.lots).toEqual({})
    expect(store.tokenHistory).toEqual({})
    expect(store.isLoading).toBe(false)
    expect(store.isRebuilding).toBe(false)
  })

  it('Successful Summary Fetch', async () => {
    const store = usePortfolioStore()
    const fetchPromise = store.fetchSummary()
    
    // It should immediately set isLoading
    expect(store.isLoading).toBe(true)
    
    // Fast-forward 500ms
    await vi.advanceTimersByTimeAsync(500)
    await fetchPromise
    
    expect(store.summary).not.toBeNull()
    expect(store.summary?.metrics.total_equity_eur).toBeDefined()
    expect(store.isLoading).toBe(false)
  })

  it('Successful Token Details Fetch', async () => {
    const store = usePortfolioStore()
    const fetchPromise = store.fetchTokenDetails('BTC')
    
    await vi.advanceTimersByTimeAsync(300)
    await fetchPromise
    
    expect(store.lots['BTC']).toBeDefined()
    expect(Array.isArray(store.lots['BTC'])).toBe(true)
  })

  it('Successful Token History Fetch', async () => {
    const store = usePortfolioStore()
    const fetchPromise = store.fetchTokenHistory('BTC')
    
    await vi.advanceTimersByTimeAsync(300)
    await fetchPromise
    
    expect(store.tokenHistory['BTC']).toBeDefined()
  })

  it('Rebuild Triggered', async () => {
    const store = usePortfolioStore()
    // Mock the inner fetchSummary call to avoid actually waiting for it, 
    // or just run timers for the whole 1500ms + 500ms
    const rebuildPromise = store.triggerRebuild()
    
    expect(store.isRebuilding).toBe(true)
    
    // Fast-forward 1500ms for rebuild simulation + 500ms for fetchSummary
    await vi.advanceTimersByTimeAsync(2000)
    await rebuildPromise
    
    expect(store.isRebuilding).toBe(false)
    // Summary should be populated since fetchSummary was called
    expect(store.summary).not.toBeNull()
  })

  it('Compute Totals', async () => {
    const store = usePortfolioStore()
    
    // First fetch to populate data
    const fetchPromise = store.fetchSummary()
    await vi.advanceTimersByTimeAsync(500)
    await fetchPromise
    
    expect(store.getTotalHoldingsAmount).toBeGreaterThan(0)
    
    const sorted = store.getHoldingsSorted
    expect(sorted.length).toBeGreaterThan(0)
    if (sorted.length > 1) {
      expect(sorted[0].current_value_eur).toBeGreaterThanOrEqual(sorted[1].current_value_eur)
    }
    
    const pnlPercentage = store.getTotalPnlPercentage
    // Percentage should be a valid number
    expect(typeof pnlPercentage).toBe('number')
    expect(Number.isNaN(pnlPercentage)).toBe(false)
  })
})
