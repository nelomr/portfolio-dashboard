# mock-adapters Specification

## Purpose
TBD - created by archiving change hex-arch-zod-refactor. Update Purpose after archive.
## Requirements
### Requirement: Offline development capability
The system SHALL provide a `MockCryptoAdapter` that implements `ICryptoPortfolioRepository` and returns realistic, hardcoded dummy data for offline UI development.

#### Scenario: Fetching portfolio offline
- **WHEN** the UI requests portfolio assets using the mock adapter
- **THEN** the system simulates network latency and returns a pre-defined array of `CryptoAssetEntity`

