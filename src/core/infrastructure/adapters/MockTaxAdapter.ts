/**
 * MockTaxAdapter — Offline fiscal adapter for development and testing.
 *
 * Implements ITaxRepository using hardcoded domain entities.
 * All mock data already follows the clean TaxTransactionEntity shape — no
 * Zod parsing is needed here since the data is synthetic and type-safe.
 *
 * @see openspec/changes/hex-arch-zod-refactor/specs/mock-adapters/spec.md
 * @see openspec/changes/hex-arch-zod-refactor/specs/fiscal-domain/spec.md
 */

import type { ITaxRepository } from '@/core/domain/repositories/ITaxRepository'
import type { TaxTransactionEntity, TaxReportEntity } from '@/core/domain/models/FiscalEntities'
import { TransactionIdSchema } from '@/core/domain/models/BrandedTypes'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// ---------------------------------------------------------------------------
// Mock transactions — covers all major transaction types for UI dev
// ---------------------------------------------------------------------------

const MOCK_TRANSACTIONS: TaxTransactionEntity[] = [
  {
    id: TransactionIdSchema.parse('tx-mock-001'),
    type: 'BUY',
    symbol: 'BTC',
    amount: 0.5,
    totalEur: 25_000,
    priceEur: 50_000,
    feeEur: 12.5,
    timestamp: new Date('2023-01-15T10:00:00Z'),
    exchange: 'Kraken',
  },
  {
    id: TransactionIdSchema.parse('tx-mock-002'),
    type: 'SELL',
    symbol: 'BTC',
    amount: 0.1,
    totalEur: 6_200,
    priceEur: 62_000,
    feeEur: 3.1,
    timestamp: new Date('2024-03-20T14:30:00Z'),
    exchange: 'Kraken',
  },
  {
    id: TransactionIdSchema.parse('tx-mock-003'),
    type: 'BUY',
    symbol: 'ETH',
    amount: 4.5,
    totalEur: 8_100,
    priceEur: 1_800,
    feeEur: 4.05,
    timestamp: new Date('2023-02-10T09:15:00Z'),
    exchange: 'Binance',
  },
  {
    id: TransactionIdSchema.parse('tx-mock-004'),
    type: 'DEPOSIT',
    symbol: 'SOL',
    amount: 50,
    totalEur: 0,
    priceEur: 0,
    feeEur: 0,
    timestamp: new Date('2023-06-05T16:00:00Z'),
    exchange: 'Phantom',
  },
  {
    id: TransactionIdSchema.parse('tx-mock-005'),
    type: 'AIRDROP',
    symbol: 'UNI',
    amount: 400,
    totalEur: 0,
    priceEur: 0,
    feeEur: 0,
    timestamp: new Date('2020-09-17T00:00:00Z'),
    exchange: 'Uniswap',
  },
]

// ---------------------------------------------------------------------------
// Mock tax report
// ---------------------------------------------------------------------------

const MOCK_REPORT_2024: TaxReportEntity = {
  year: 2024,
  method: 'FIFO',
  summary: {
    capitalGainsEur: 620,
    capitalLossesEur: 0,
    savingsBaseYieldsEur: 0,
    generalBaseAirdropsEur: 0,
    netPatrimonialResultEur: 620,
    estimatedIrpfEur: 124,
  },
  auditTrail: [],
}

// ---------------------------------------------------------------------------
// Adapter implementation
// ---------------------------------------------------------------------------

export class MockTaxAdapter implements ITaxRepository {
  async getTransactions(): Promise<TaxTransactionEntity[]> {
    await delay(350)
    return MOCK_TRANSACTIONS
  }

  async getInvalidTransactions(): Promise<TaxTransactionEntity[]> {
    await delay(200)
    return [] // No invalid transactions in mock
  }

  async getReport(year: number, _method: string): Promise<TaxReportEntity> {
    await delay(500)
    if (year === 2024) return MOCK_REPORT_2024
    // Return an empty report for other years
    return {
      year,
      method: _method,
      summary: {
        capitalGainsEur: 0,
        capitalLossesEur: 0,
        savingsBaseYieldsEur: 0,
        generalBaseAirdropsEur: 0,
        netPatrimonialResultEur: 0,
        estimatedIrpfEur: 0,
      },
      auditTrail: [],
    }
  }

  async deleteTransaction(_id: string): Promise<void> {
    await delay(100)
    // Stub — in a real mock you'd filter the local array
  }

  async updateTransaction(_id: string, _data: unknown): Promise<void> {
    await delay(150)
  }

  async validateTransaction(_payload: unknown): Promise<void> {
    await delay(150)
  }
}
