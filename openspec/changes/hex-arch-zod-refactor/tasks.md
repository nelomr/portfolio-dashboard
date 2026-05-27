## 1. Setup & Tooling

- [x] 1.1 Install `zod` at a specific version (e.g., `pnpm add zod@3.22.4`)
- [x] 1.2 Configure Vitest/Jest for TDD, ensuring tests can be written for the domain logic

## 2. Domain Layer & Branded Types (TDD)

- [x] 2.1 Write unit tests for Branded Types and domain entities validation
- [x] 2.2 Implement `AssetId`, `TransactionId`, and `LotId` branded types in `src/core/domain/models/`
- [x] 2.3 Define `ICryptoPortfolioRepository`, `ITaxRepository`, and `IHttpClient` interfaces
- [x] 2.4 Define strict domain entities for `TaxTransactionEntity`, `TaxReportEntity`, and `TaxLotEntity`

## 3. Infrastructure & Zod DTOs (TDD)

- [x] 3.1 Write unit tests for Zod parsing rules (e.g., parsing string to number, timestamp to Date)
- [x] 3.2 Implement `ExternalAssetSchema` and `ExternalPortfolioSummarySchema` in `dtos/`
- [x] 3.3 Implement `ExternalTaxTransactionSchema` and `ExternalTaxReportSchema` to sanitize complex legacy API payloads
- [x] 3.4 Ensure test coverage for malformed data paths (e.g., when `safeParse` fails)

## 4. Adapters Implementation (TDD)

- [x] 4.1 Write unit tests for `RestCryptoAdapter`, `RestTaxAdapter`, and their Mock equivalents mapping logic
- [x] 4.2 Implement `MockCryptoAdapter` and `MockTaxAdapter` returning hardcoded, valid data
- [x] 4.3 Implement `RestCryptoAdapter` and `RestTaxAdapter` utilizing `IHttpClient` and Zod's `safeParse`
- [x] 4.4 Implement centralized error dispatching (Toast notifications) in adapters when `safeParse` fails

## 5. Dependency Injection & State Refactoring

- [x] 5.1 Configure DI in `main.ts` using Vue's `provide` and `Symbol` injection keys
- [x] 5.2 Refactor `useCryptoStore` (Pinia) to remove direct Axios usage and use the injected repository
- [x] 5.3 Write/update unit tests for the Pinia store with a mocked repository

## 6. Verification

- [x] 6.1 Verify the UI loads correctly using the `MockCryptoAdapter` when `VITE_USE_MOCK=true`
- [x] 6.2 Ensure all unit tests pass with 100% coverage on data mappers and store actions
- [x] 6.3 Manually test the global error Toast by feeding corrupt data to `RestCryptoAdapter`

