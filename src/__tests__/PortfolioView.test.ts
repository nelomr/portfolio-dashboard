import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { ref } from 'vue'
import PortfolioView from '@/views/Portfolio/PortfolioView.vue'
import * as portfolioData from '@/views/Portfolio/composables/usePortfolioData'

// Mock the components that use lucide-vue-next to avoid rendering issues in happy-dom
vi.mock('lucide-vue-next', () => ({
  RefreshCw: { template: '<svg class="lucide-refresh"></svg>' },
  TrendingUp: { template: '<svg class="lucide-trending-up"></svg>' },
  TrendingDown: { template: '<svg class="lucide-trending-down"></svg>' },
  Wallet: { template: '<svg class="lucide-wallet"></svg>' }
}))

describe('PortfolioView', () => {
  it('renders view structure (flex-col) and responsive grid (grid-cols-1 md:grid-cols-3)', () => {
    vi.spyOn(portfolioData, 'usePortfolioData').mockReturnValue({
      metrics: ref({
        total_equity_eur: 10000,
        total_unrealized_pnl_eur: 500,
        unrealized_roi_pct: 0.05,
        total_realized_pnl_eur: 100
      }),
      isFetching: ref(false),
      handleRebuild: vi.fn()
    } as any)

    const wrapper = mount(PortfolioView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      }
    })

    // Main layout container check
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('flex-col')

    // Responsive grid check
    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('md:grid-cols-3')
  })

  it('displays the data fetching indicator (amber pulse) when isFetching is true', () => {
    vi.spyOn(portfolioData, 'usePortfolioData').mockReturnValue({
      metrics: ref(null),
      isFetching: ref(true),
      handleRebuild: vi.fn()
    } as any)

    const wrapper = mount(PortfolioView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      }
    })

    const pulseIndicator = wrapper.find('.animate-ping')
    expect(pulseIndicator.exists()).toBe(true)
  })

  it('hides the data fetching indicator when isFetching is false', () => {
    vi.spyOn(portfolioData, 'usePortfolioData').mockReturnValue({
      metrics: ref(null),
      isFetching: ref(false),
      handleRebuild: vi.fn()
    } as any)

    const wrapper = mount(PortfolioView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      }
    })

    const pulseIndicator = wrapper.find('.animate-ping')
    expect(pulseIndicator.exists()).toBe(false)
  })

  it('triggers refetch and shows spin animation on rebuild index action', async () => {
    const mockRebuild = vi.fn()
    // To show spin animation, isFetching must be true.
    // In actual implementation handleRebuild triggers something that sets isFetching true.
    // We'll mock the state where it's true after click, but the test is simpler if we just provide isFetching true.
    const isFetchingRef = ref(false)
    
    vi.spyOn(portfolioData, 'usePortfolioData').mockImplementation(() => ({
      metrics: ref(null),
      isFetching: isFetchingRef,
      handleRebuild: async () => {
        isFetchingRef.value = true
        mockRebuild()
      }
    } as any))

    const wrapper = mount(PortfolioView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      }
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(mockRebuild).toHaveBeenCalled()
    
    // Check if spin animation class is applied to icon when fetching
    const refreshIcon = wrapper.find('.lucide-refresh')
    expect(refreshIcon.classes()).toContain('animate-spin')
  })

  it('integrates metric values correctly', () => {
    vi.spyOn(portfolioData, 'usePortfolioData').mockReturnValue({
      metrics: ref({
        total_equity_eur: 50000,
        total_unrealized_pnl_eur: 2500,
        unrealized_roi_pct: 0.05,
        total_realized_pnl_eur: 1000
      }),
      isFetching: ref(false),
      handleRebuild: vi.fn()
    } as any)

    const wrapper = mount(PortfolioView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      }
    })

    const html = wrapper.html()
    // Extracting raw numeric strings removing formatting spaces/commas to be safe
    const cleanHtml = html.replace(/\s/g, '')
    
    // Test that the base numbers 50000 and 2500 are somewhere in the component
    expect(cleanHtml).toMatch(/50[.,]?000/)
    expect(cleanHtml).toMatch(/2[.,]?500/)
  })
})
