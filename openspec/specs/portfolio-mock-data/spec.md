## ADDED Requirements

### Requirement: Mock file exports a PortfolioData fixture
The system SHALL provide a `src/data/mockPortfolio.ts` file that exports a default object typed as (or satisfying) `PortfolioData`. The object SHALL include at least two holdings (BTC and ETH), at least one FIFO tax lot per holding, and at least one lot history event.

#### Scenario: Mock imports and type-checks without errors
- **WHEN** `mockPortfolio` is imported in a Vitest test or Vue component
- **THEN** TypeScript compiles without type errors and the shape satisfies `PortfolioData`

#### Scenario: Mock satisfies PortfolioData at compile time
- **WHEN** the export is annotated with `satisfies PortfolioData`
- **THEN** any structural mismatch between the mock and the interface causes a compile-time error

---

### Requirement: Mock covers all three data hierarchy levels
The mock fixture SHALL cover Level 1 (global metrics + holdings), Level 2 (FIFO tax lots per symbol), and Level 3 (lot history events per lot).

#### Scenario: Global metrics are present and numeric
- **WHEN** `mockPortfolio.summary.metrics` is accessed
- **THEN** `total_equity_eur`, `total_realized_pnl_eur`, and `total_unrealized_pnl_eur` are all non-zero numbers

#### Scenario: Holdings array has at least two entries
- **WHEN** `mockPortfolio.summary.holdings` is accessed
- **THEN** the array length is ≥ 2 and each entry satisfies `HoldingItem`

#### Scenario: Lots are keyed by symbol
- **WHEN** `mockPortfolio.lots['BTC']` is accessed
- **THEN** it returns an array of at least one `TaxLot`

#### Scenario: History is keyed by symbol then lot ID
- **WHEN** `mockPortfolio.history['BTC']['lot_btc_1']` is accessed
- **THEN** it returns an object with a `status` field and a `history` array of `LotHistoryEvent`

---

### Requirement: Mock covers edge case fixtures via named exports
The system SHALL provide named exports for edge-case fixtures: a fully-consumed lot (`remaining_qty: 0`) and an event with `is_taxable: false`.

#### Scenario: Fully-consumed lot export
- **WHEN** the named export `mockFullyConsumedLot` is imported
- **THEN** its `remaining_qty` is `0` and `original_qty > 0`

#### Scenario: Non-taxable event export
- **WHEN** the named export `mockNonTaxableEvent` is imported
- **THEN** its `is_taxable` is `false`

---

### Requirement: Mock is injectable into Pinia store without transformation
The system SHALL ensure that `mockPortfolio` can be used to initialize a Pinia store's state directly (no mapping or transformation required).

#### Scenario: Store state initialised from mock
- **WHEN** a Pinia store's `state` function returns `mockPortfolio`
- **THEN** all store getters and components that reference state fields resolve without runtime errors

#### Scenario: Mock used in Vitest component test
- **WHEN** a Vitest test imports `mockPortfolio` and mounts a component that reads from the store
- **THEN** the component renders the mock values correctly and the test passes without network calls
