# hexagonal-architecture Specification

## Purpose
TBD - created by archiving change hex-arch-zod-refactor. Update Purpose after archive.
## Requirements
### Requirement: Define abstract repository ports
The system SHALL define abstract interfaces for repositories (`ICryptoPortfolioRepository`) and HTTP clients (`IHttpClient`) inside the `domain` layer.

#### Scenario: Interface availability
- **WHEN** a developer attempts to implement a new data adapter
- **THEN** they MUST implement the `ICryptoPortfolioRepository` interface

### Requirement: Dependency Injection for adapters
The system SHALL resolve which adapter implementation to use at runtime via a Dependency Injection container in `main.ts`, based on environment variables (e.g., `VITE_USE_MOCK`).

#### Scenario: Production environment
- **WHEN** the application starts with `VITE_USE_MOCK=false`
- **THEN** the DI container provides `RestCryptoAdapter`

#### Scenario: Development environment
- **WHEN** the application starts with `VITE_USE_MOCK=true`
- **THEN** the DI container provides `MockCryptoAdapter`

