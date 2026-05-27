# portfolio-store Specification

## Purpose
TBD - created by archiving change hex-arch-zod-refactor. Update Purpose after archive.
## Requirements
### Requirement: Portfolio store consumes repository
The `portfolio-store` SHALL consume data exclusively through the injected `ICryptoPortfolioRepository` port, and MUST NOT import or use HTTP clients (like Axios) or API-specific DTOs directly.

#### Scenario: Loading portfolio
- **WHEN** the `loadPortfolio` action is dispatched
- **THEN** the store calls `repository.getPortfolioAssets()` to retrieve domain entities
- **AND** updates its internal state with the result

#### Scenario: No direct HTTP calls
- **WHEN** examining the store source code
- **THEN** there are no `axios.get` or `fetch` calls present

