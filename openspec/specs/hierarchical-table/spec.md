## ADDED Requirements

### Requirement: Render 3-Level Table
The system SHALL display a dynamic data table with three levels of data: Holding Summary, Lots Breakdown, and Lot History.

#### Scenario: Display main holding rows
- **WHEN** the portfolio data is loaded
- **THEN** the table displays Level 1 rows representing each asset's aggregated balance, average cost, current value, performance, and locations.

#### Scenario: Expand to Lots Breakdown
- **WHEN** the user clicks the expander icon on a Level 1 row
- **THEN** the table fetches and displays the Level 2 rows (Open Tax Lots) directly beneath the main row, showing Date, Qty, Cost Unit, and Status.

#### Scenario: Expand to Lot History
- **WHEN** the user clicks the toggle icon on a Level 2 lot row
- **THEN** the table conditionally renders Level 3 rows (Event History) for that lot, displaying past disposal events, P&L, and tax status.

### Requirement: Virtualized Rendering
The system SHALL employ virtualization to render only visible rows in the DOM.

#### Scenario: Scrolling large portfolio
- **WHEN** the portfolio contains 1,000+ assets
- **THEN** the table limits the number of rendered DOM nodes to the visible viewport plus an overscan margin.

### Requirement: Visual Cues for Tax Status
The system SHALL display badges and tooltips to explain specific tax events (e.g., Tax-Loss Harvesting opportunities, non-taxable events).

#### Scenario: Identify non-taxable event
- **WHEN** an event is marked as `is_taxable=false`
- **THEN** the system displays a ShieldCheck icon and a tooltip explaining LIRPF Art. 33.1 rules.
