# Pinia Colada Migration Proposal

## Intent
Migrate the portfolio data fetching logic from a traditional manual Pinia store (`portfolioStore.ts`) to `@pinia/colada` (`useQuery` and `useMutation`). This aligns the codebase with the defined architecture in the README.

## Background
Currently, the application manages asynchronous state (loading, error, caching) manually inside `src/stores/portfolioStore.ts`. This leads to redundant boilerplate and sub-optimal caching strategies. The project already has `@pinia/colada` installed and registered in `main.ts`, but its features are not being utilized.

## Proposed Approach
1. **Deprecate Manual Async State**: Remove `isLoading`, `isRebuilding`, `error`, and manual caching logic from `portfolioStore.ts`.
2. **Implement useQuery**: Move the `fetchSummary` logic into a new dedicated query composable (e.g., `src/composables/queries/usePortfolioQuery.ts`) using `@pinia/colada`'s `useQuery`.
3. **Implement useMutation**: Replace `triggerRebuild` with a `useMutation` that automatically invalidates the portfolio query cache upon success.
4. **Refactor `usePortfolioData.ts`**: Update the view orchestrator composable to consume the new queries instead of the old store.
5. **Update Tests**: Refactor the unit tests to mock `useQuery`/`useMutation` or the query client.
