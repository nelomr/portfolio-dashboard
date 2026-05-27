# asset-ingestion Specification

## Purpose
TBD - created by archiving change hex-arch-zod-refactor. Update Purpose after archive.
## Requirements
### Requirement: Asset data mapping
The system SHALL map incoming API asset data (e.g., from Kraken) to internal `CryptoAssetEntity` models exclusively within the infrastructure layer adapters, after Zod validation.

#### Scenario: Mapping an external asset
- **WHEN** `RestCryptoAdapter` receives a validated `ExternalAssetDTO`
- **THEN** it maps the DTO fields (e.g., `coin_symbol`, `balance_qty`) to the domain entity fields (`symbol`, `totalBalance`) before returning them to the caller

