## Context

The current Portfolio Dashboard fetches data directly from external APIs, tightly coupling our frontend components (Vue) and state management (Pinia) to the shape of the external data. This leads to fragility, where unexpected API changes or dirty data can crash the application or cause silent errors in critical financial calculations. 

The AMASE ecosystem prioritizes fiscal compliance and robustness. To support these requirements, we need to completely decouple the UI from the external world. We will achieve this by implementing Hexagonal Architecture (Ports and Adapters) paired with Zod schemas for defensive data parsing.

## Goals / Non-Goals

**Goals:**
- Completely decouple UI components and Pinia stores from external API structures (e.g., Axios).
- Implement Zod as an Anti-Corruption Layer to sanitize and validate all external responses before they enter the domain.
- Create domain-specific entities using Zod Branded Types to ensure type safety at compile time (e.g., differentiating `AssetId` from `TransactionId`).
- Provide an abstract Port (`ICryptoPortfolioRepository`) that adapters must implement.
- Implement a `RestCryptoAdapter` for production and a `MockCryptoAdapter` for parallel, offline development.
- Configure Dependency Injection (DI) in `main.ts` to seamlessly swap adapters based on environment variables.

**Non-Goals:**
- Changing the visual styling or layout of the UI (Tailwind/shadcn-vue).
- Changing the backend API endpoints or structure.
- Migrating away from Pinia to another state management library.

## Decisions

1. **Hexagonal Architecture:** 
   - *Rationale:* Centralizes the definition of domain models and repository contracts (`Ports`). The UI only depends on these contracts, making it immune to backend changes as long as the adapter successfully maps the data.
   - *Alternatives Considered:* Standard layered architecture (UI -> Service -> API). This would still leave the UI vulnerable to implicit data structure changes unless strict DTO mapping is enforced everywhere.

2. **Zod as Anti-Corruption Layer:**
   - *Rationale:* Zod provides runtime type checking and parsing. Using `.safeParse()` allows us to catch corrupt data gracefully rather than crashing the Vue runtime. `z.preprocess()` allows us to clean up things like formatted string numbers or UNIX timestamps natively.
   - *Alternatives Considered:* TypeScript interfaces (only provide compile-time safety). Manual validation functions (error-prone and tedious).

3. **Branded Types:**
   - *Rationale:* By using `z.brand<"AssetId">()`, we create nominal typing in TypeScript. A normal UUID string cannot be passed where an `AssetId` is expected. This prevents logic bugs when handling multiple IDs.

4. **Dependency Injection in `main.ts`:**
   - *Rationale:* Vue's native `provide/inject` mechanism is lightweight and perfectly suited for this. We define a `Symbol` as an InjectionKey, instantiate the correct adapter based on `import.meta.env.VITE_USE_MOCK`, and provide it globally.

5. **Global Error Handling for Zod Failures:**
   - *Rationale:* Instead of failing silently, when `safeParse` fails, the adapter will trigger a global error handler that displays a Toast notification. This alerts the user (and developers) that the external API has changed unexpectedly or sent corrupted data, without completely freezing the UI.
   - *Alternatives Considered:* Handling errors silently in the store (leads to confusing empty states and harder debugging).

## Risks / Trade-offs

- [Performance Overhead] → Zod parsing introduces a slight runtime overhead compared to trusting data blindly. Mitigation: The overhead is negligible for typical JSON payloads; the safety gained for financial data far outweighs it.
- [Learning Curve] → Developers must learn the pattern of creating DTO schemas instead of directly assigning API responses to state. Mitigation: Provide clear documentation and examples in the `mock-adapters` and `zod-validation` specs.

## Migration Plan

1. Define domain models and branded types.
2. Define the `ICryptoPortfolioRepository` port.
3. Build Zod DTO schemas for external asset data.
4. Implement `MockCryptoAdapter`.
5. Implement `RestCryptoAdapter` wrapping Axios.
6. Set up DI in `main.ts`.
7. Refactor Pinia stores to use the injected repository.
8. Update Vue components to reflect any domain model naming changes.
9. Implement global error mapping and toast notification dispatch for validation errors.
