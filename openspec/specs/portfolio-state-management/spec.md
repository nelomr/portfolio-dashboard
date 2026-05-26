## ADDED Requirements

### Requirement: Portfolio Store Initialization
The store MUST initialize with an empty state for summary, lots, tokenHistory, and loading set to false.

#### Scenario: Default Store State
- **WHEN** the portfolio store is initialized
- **THEN** it exposes empty state structures and the loading flag is false

### Requirement: Fetch Summary Data
The store MUST fetch and populate portfolio summary data, simulating an async network request.

#### Scenario: Successful Summary Fetch
- **WHEN** `fetchSummary()` is called
- **THEN** the store sets loading to true, waits 500ms, populates `summary` with mock data, and sets loading to false

### Requirement: Fetch Token Details
The store MUST fetch and populate lots for a specific token symbol.

#### Scenario: Successful Token Details Fetch
- **WHEN** `fetchTokenDetails(symbol)` is called
- **THEN** the store populates the `lots` dictionary for the specified symbol using mock data

### Requirement: Fetch Token History
The store MUST fetch and populate the event history for a specific token.

#### Scenario: Successful Token History Fetch
- **WHEN** `fetchTokenHistory(symbol)` is called
- **THEN** the store populates the `tokenHistory` dictionary for the specified symbol

### Requirement: Trigger Rebuild
The store MUST provide an action to simulate the re-synchronization of the FIFO index.

#### Scenario: Rebuild Triggered
- **WHEN** `triggerRebuild()` is called
- **THEN** the store executes the rebuild simulation logic

### Requirement: Computed Getters
The store MUST provide computed getters for total holdings, sorted holdings, and total ROI percentage.

#### Scenario: Compute Totals
- **WHEN** state contains valid holdings data
- **THEN** `getTotalHoldingsAmount`, `getHoldingsSorted` (descending), and `getTotalPnlPercentage` return correctly computed values
