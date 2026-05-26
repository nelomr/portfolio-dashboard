import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { ref } from 'vue'
import PortfolioView from '@/views/Portfolio/PortfolioView.vue'
import * as portfolioData from '@/views/Portfolio/composables/usePortfolioData'

// ── Lucide stubs ──────────────────────────────────────────────────────────────
vi.mock('lucide-vue-next', () => ({
  RefreshCw: { template: '<svg class="lucide-refresh"></svg>' },
  TrendingUp: { template: '<svg class="lucide-trending-up"></svg>' },
  TrendingDown: { template: '<svg class="lucide-trending-down"></svg>' },
  Wallet: { template: '<svg class="lucide-wallet"></svg>' },
}))

// ── Chart stubs ───────────────────────────────────────────────────────────────
vi.mock('@/components/charts/PerformanceLineChart.vue', () => ({
  default: {
    name: 'PerformanceLineChart',
    template: '<div data-testid="performance-chart-stub"></div>',
    props: ['data'],
  },
}))

vi.mock('@/components/charts/AssetAllocationChart.vue', () => ({
  default: {
    name: 'AssetAllocationChart',
    template: '<div data-testid="allocation-chart-stub"></div>',
    props: ['assets'],
  },
}))

// ── Fixtures ──────────────────────────────────────────────────────────────────
const mockMetrics = {
  total_equity_eur: 10000,
  total_unrealized_pnl_eur: 500,
  total_realized_pnl_eur: 100,
}

const mockAllocation = [
  { label: 'BTC', value: 6000, color: '#F7931A' },
  { label: 'ETH', value: 4000, color: '#627EEA' },
]

const mockPerformance = [
  { time: '2025-01-01', value: 9500 },
  { time: '2025-01-07', value: 10000 },
]

function mountView(overrides: Partial<ReturnType<typeof portfolioData.usePortfolioData>> = {}) {
  vi.spyOn(portfolioData, 'usePortfolioData').mockReturnValue({
    metrics: ref(mockMetrics),
    isFetching: ref(false),
    isRebuilding: ref(false),
    handleRebuild: vi.fn(),
    allocationData: ref(mockAllocation),
    performanceData: ref(mockPerformance),
    store: {} as any,
    filteredHoldings: ref([]),
    ...overrides,
  } as any)

  return mount(PortfolioView, {
    global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
  })
}

// ── Tests ─────────────────────────────────────────────────────────────────────
describe('PortfolioView', () => {
  it('renders the outer flex-col container', () => {
    const wrapper = mountView()
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('flex-col')
  })

  it('renders the header landmark', () => {
    const wrapper = mountView()
    expect(wrapper.find('header').exists()).toBe(true)
  })

  it('shows green status dot when not fetching', () => {
    const wrapper = mountView({ isFetching: ref(false) })
    // Status dot uses bg-profit class when idle
    const dot = wrapper.find('.bg-profit')
    expect(dot.exists()).toBe(true)
  })

  it('shows amber pulse when isFetching is true', () => {
    const wrapper = mountView({ isFetching: ref(true) })
    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
  })

  it('shows "(Sincronizando...)" text when fetching', () => {
    const wrapper = mountView({ isFetching: ref(true) })
    expect(wrapper.text()).toContain('Sincronizando...')
  })

  it('calls handleRebuild on button click', async () => {
    const mockRebuild = vi.fn()
    const wrapper = mountView({ handleRebuild: mockRebuild })
    await wrapper.find('button').trigger('click')
    expect(mockRebuild).toHaveBeenCalledOnce()
  })

  it('charts section appears before metrics (reference layout)', () => {
    const wrapper = mountView()
    const html = wrapper.html()
    const chartsIdx = html.indexOf('performance-chart-stub')
    const metricsIdx = html.indexOf('Patrimonio Neto Total')
    // Charts must appear before metrics row in the DOM
    expect(chartsIdx).toBeLessThan(metricsIdx)
  })

  it('renders PerformanceLineChart when performanceData is not empty', () => {
    const wrapper = mountView()
    expect(wrapper.find('[data-testid="performance-chart-stub"]').exists()).toBe(true)
  })

  it('renders AssetAllocationChart when allocationData is not empty', () => {
    const wrapper = mountView()
    expect(wrapper.find('[data-testid="allocation-chart-stub"]').exists()).toBe(true)
  })

  it('hides charts when data arrays are empty', () => {
    const wrapper = mountView({
      allocationData: ref([]),
      performanceData: ref([]),
    })
    expect(wrapper.find('[data-testid="performance-chart-stub"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="allocation-chart-stub"]').exists()).toBe(false)
  })

  it('renders the metrics grid (3 cols on md)', () => {
    const wrapper = mountView()
    expect(wrapper.find('.grid.md\\:grid-cols-3').exists()).toBe(true)
  })

  it('displays formatted equity value', () => {
    const wrapper = mountView()
    expect(wrapper.text()).toMatch(/10[.,]?000/)
  })
})
