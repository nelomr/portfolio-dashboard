import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

// Use vi.hoisted so mocks are available when vi.mock factory runs
const { mockSetData, mockAddSeries, mockRemove, mockCreateChart } =
  vi.hoisted(() => {
    const mockFitContent = vi.fn()
    const mockSetData = vi.fn()
    // v5 API: addSeries(SeriesType, options) returns { setData }
    const mockAddSeries = vi.fn(() => ({ setData: mockSetData }))
    const mockRemove = vi.fn()
    const mockCreateChart = vi.fn(() => ({
      addSeries: mockAddSeries,
      timeScale: () => ({ fitContent: mockFitContent }),
      remove: mockRemove,
    }))
    return { mockSetData, mockAddSeries, mockRemove, mockCreateChart }
  })

vi.mock('lightweight-charts', () => ({
  createChart: mockCreateChart,
  ColorType: { Solid: 'solid' },
  // v5 exports AreaSeries as a class/constructor
  AreaSeries: class AreaSeries {},
}))

import PerformanceLineChart from '@/components/charts/PerformanceLineChart.vue'

const sampleData = [
  { time: '2025-01-01', value: 100 },
  { time: '2025-01-02', value: 120 },
  { time: '2025-01-03', value: 115 },
]

describe('PerformanceLineChart', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders a container div for the chart when data is provided', () => {
    const wrapper = mount(PerformanceLineChart, {
      props: { data: sampleData },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    })
    expect(wrapper.find('[data-testid="performance-chart"]').exists()).toBe(true)
  })

  it('instantiates createChart on mount', () => {
    mount(PerformanceLineChart, {
      props: { data: sampleData },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    })
    expect(mockCreateChart).toHaveBeenCalledOnce()
  })

  it('adds a series (v5 API) and sets data', () => {
    mount(PerformanceLineChart, {
      props: { data: sampleData },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    })
    expect(mockAddSeries).toHaveBeenCalledOnce()
    expect(mockSetData).toHaveBeenCalledWith(sampleData)
  })

  it('calls chart.remove on unmount', () => {
    const wrapper = mount(PerformanceLineChart, {
      props: { data: sampleData },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    })
    wrapper.unmount()
    expect(mockRemove).toHaveBeenCalledOnce()
  })

  it('does not render the container when data is empty (v-if guard)', () => {
    const wrapper = mount(PerformanceLineChart, {
      props: { data: [] },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    })
    expect(wrapper.find('[data-testid="performance-chart"]').exists()).toBe(false)
  })
})
