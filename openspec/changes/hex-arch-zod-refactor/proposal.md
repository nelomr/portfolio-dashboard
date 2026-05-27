## Why

The current Portfolio Dashboard suffers from tight coupling to external APIs, making it fragile and susceptible to runtime crashes when API structures change or send dirty data (e.g., strings instead of numbers, unexpected null values, different date formats). In the crypto/financial domain, data corruption or mapping errors can lead to disastrous UI presentation or tax calculations, which directly violates the core compliance requirement of the AMASE ecosystem.

By migrating to a Hexagonal Architecture (Ports and Adapters) paired with Zod for strict schema validation, we achieve total API agnosticism. This ensures the business logic and UI depend only on internal domain contracts, while any external data is treated as "toxic" until parsed and sanitized. This refactoring allows for resilient data handling, decoupled development (via Mock Adapters), and safe nominal typing (via Zod Branded Types).

## What Changes

- Implement Hexagonal Architecture by defining strict repository interfaces (Ports) in the domain layer.
- Introduce Zod schema validation as an Anti-Corruption Layer (DTOs) for all incoming API data.
- Refactor existing asset fetching logic to depend on abstract `ICryptoPortfolioRepository` instead of direct HTTP calls.
- Create a `RestCryptoAdapter` for production data fetching and safe parsing.
- Create a `MockCryptoAdapter` to enable parallel UI development without backend dependencies.
- Abstract the HTTP client into an `IHttpClient` interface.
- Implement Branded Types (e.g., `AssetId`, `TransactionId`) to prevent accidental ID swapping at compile time.
- Update Pinia stores to consume data exclusively via Dependency Injection (`main.ts`).
- Implement a global error handling mechanism (Toast notifications) for schema validation failures to ensure the user is notified if API structures unexpectedly change.
- **BREAKING**: Vue components and Pinia stores must no longer import `axios` directly or use network models; they will exclusively use domain models.

## Capabilities

### New Capabilities
- `hexagonal-architecture`: Establishes the core Port and Adapter interfaces (`IHttpClient`, `ICryptoPortfolioRepository`) and the dependency injection setup.
- `zod-validation`: Introduces Zod schemas for external API data validation (`ExternalAssetSchema`) and domain Branded Types.
- `mock-adapters`: Implements offline development capabilities using mock adapters.
- `global-error-handling`: Implements a centralized error notification system (e.g., Toasts) that triggers when Zod's `safeParse` encounters malformed external data.
- `fiscal-domain`: Expands the domain models, ports, and Zod schemas to cover tax transactions, tax reports, and lot histories based on the legacy system's requirements.

### Modified Capabilities
- `portfolio-store`: Refactoring the existing Pinia store to use injected repositories instead of direct API calls.
- `asset-ingestion`: Standardize how assets and movements are mapped from the API to domain entities.

## Impact

- **Code Affected**: All `src/core` structures, specifically `domain`, `infrastructure`, and `application` layers. `main.ts` will be updated for DI.
- **Dependencies**: Addition of `zod` for validation.
- **Resilience**: The UI will not crash if the API fails; it will gracefully handle `safeParse` errors.
- **Development**: Team can work on UI using mocks before backend endpoints are ready.

## Guidelines

- **Component Creation**: Any new UI component (e.g., the Toast notification component) MUST be built following the instructions and style defined in `[/Users/nelo/proyectos/dashboar-portfolio/.agent/skills/shadcn-vue/SKILL.md]`. Do not use plain Tailwind/Vanilla Vue components if a shadcn-vue equivalent can be generated.
- **Spec Consistency**: Before implementing any change, developers and agents MUST review existing specifications in `openspec/specs/` to ensure new changes do not conflict with or break previously established requirements and behaviors.
