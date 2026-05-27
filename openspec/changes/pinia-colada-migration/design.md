# Design: Pinia Colada Migration

## Architecture Decisions

### 1. `usePortfolioQueries.ts` Composable
Instead of fetching inside Pinia stores, we will create `src/composables/queries/usePortfolioQueries.ts`.
This composable will:
- Inject `ICryptoPortfolioRepository` using Vue's `inject(PORTFOLIO_REPO_KEY)`.
- Export a `usePortfolioSummaryQuery()` function wrapping `@pinia/colada`'s `useQuery`.
- Export a `useRebuildMutation()` function wrapping `useMutation`.

### 2. Elimination of `portfolioStore.ts`
The manual store `portfolioStore.ts` becomes mostly obsolete for async data.
- **Alternative A**: Keep `portfolioStore.ts` to expose the getters (`getHoldingsSorted`, `getTotalPnlPercentage`) but have the store internally call `usePortfolioSummaryQuery()`.
- **Alternative B (Chosen)**: Remove `portfolioStore.ts` entirely. Move the sorting logic and PnL percentage calculations directly into the orchestrator `usePortfolioData.ts` (or `usePortfolioMetrics.ts`) as pure `computed` properties over the query `data.value`. This eliminates the middleman Pinia store completely, leaving the app truly stateless on the global level (relying on Colada's query cache).

### 3. File Structure
- `[NEW]` `src/composables/queries/usePortfolioQueries.ts`
- `[MODIFY]` `src/views/Portfolio/composables/usePortfolioData.ts` (Refactored to consume queries)
- `[DELETE]` `src/stores/portfolioStore.ts`
- `[MODIFY]` `src/__tests__/usePortfolioData.test.ts` (Refactored to test the query usage)

## Tradeoffs
Removing `portfolioStore.ts` requires updating tests that explicitly mocked it. However, since the app relies heavily on DI, testing `usePortfolioData.ts` will actually become simpler: we just provide a mock `ICryptoPortfolioRepository` and let Colada do the rest.
