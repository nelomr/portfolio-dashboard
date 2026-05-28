import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ExpandedLotsTable from '../table/ExpandedLotsTable.vue'

// Mock useVirtualizer to avoid complex DOM calculations in jsdom
vi.mock('@tanstack/vue-virtual', () => {
  return {
    useVirtualizer: () => ({
      value: {
        getVirtualItems: () => [
          { index: 0, start: 0, end: 64, size: 64, key: '0' },
          { index: 1, start: 64, end: 128, size: 64, key: '1' }
        ],
        getTotalSize: () => 128
      }
    })
  }
})

vi.mock('@/components/ui/skeleton/Skeleton.vue', () => ({ default: { template: '<div></div>' } }))
vi.mock('@/components/common/CryptoIcon', () => ({ CryptoIcon: { template: '<div></div>' } }))
vi.mock('@/composables/useFormatters', () => ({
  formatCurrency: (val: number) => `€${val.toFixed(2)}`,
  formatPercent: (val: number) => `${val.toFixed(2)}%`,
  formatDate: (val: number) => '01 Jan 2024'
}))
vi.mock('@/lib/utils', () => ({ cn: (...args: any[]) => args.join(' ') }))

describe('ExpandedLotsTable.vue', () => {
  const mockLots = [
    {
      id: 'lot1',
      date: 1672531200,
      original_qty: 1.0,
      remaining_qty: 1.0,
      unit_cost: 30000,
      total_cost: 30000
    },
    {
      id: 'lot2',
      date: 1675209600,
      original_qty: 0.5,
      remaining_qty: 0.5,
      unit_cost: 32000,
      total_cost: 16000
    }
  ]

  const mockTokenHistory = {
    lot1: {
      status: 'OPEN',
      history: [
        {
          disposal_date: 1680000000,
          is_taxable: true,
          amount_from_lot: 0.2,
          sale_price_eur: 8000,
          gain_loss_eur: 2000
        }
      ]
    }
  }

  let wrapper: any

  beforeEach(() => {
    wrapper = mount(ExpandedLotsTable, {
      props: {
        assetSymbol: 'BTC',
        assetAmount: 1.5,
        assetCurrentValueEur: 90000,
        lots: mockLots,
        tokenHistory: mockTokenHistory,
        isLoadingDetails: false
      }
    })
  })

  it('renders Level 2 holding summary rows correctly', () => {
    expect(wrapper.exists()).toBe(true)
    const rows = wrapper.findAll('tr')
    expect(rows.length).toBeGreaterThan(0)
  })

  it('handles Level 3 expansion state (expandedLots)', async () => {
    const vm = wrapper.vm as any

    expect(vm.expandedLots.has('lot1')).toBe(false)
    vm.toggleLotHistory('lot1')
    expect(vm.expandedLots.has('lot1')).toBe(true)
    vm.toggleLotHistory('lot1')
    expect(vm.expandedLots.has('lot1')).toBe(false)
  })

  it('correctly maps token history and status', () => {
    const vm = wrapper.vm as any
    const history = vm.getLotHistory('lot1')
    
    expect(history).toHaveLength(1)
    expect(history[0].gain_loss_eur).toBe(2000)
    
    const status = vm.getLotStatus('lot1')
    expect(status).toBe('OPEN')
  })
})
