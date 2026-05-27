# Tasks: Pinia Colada Migration

- [ ] Create `src/composables/queries/usePortfolioQueries.ts` implementing `usePortfolioSummaryQuery` and `useRebuildMutation` via `@pinia/colada`.
- [ ] Refactor `src/views/Portfolio/composables/usePortfolioData.ts` to consume the new query composable.
  - Map `isLoading` to `isFetching`.
  - Migrate getters (`getHoldingsSorted`) as `computed` properties over `data.value`.
- [ ] Delete `src/stores/portfolioStore.ts`.
- [ ] Update `PortfolioView.vue` (if any direct store dependency exists, though it should be handled by `usePortfolioData.ts`).
- [ ] Refactor test suites:
  - Fix `src/__tests__/usePortfolioData.test.ts` to test the new query flow.
  - Delete `src/__tests__/portfolioStore.test.ts`.
  - Fix any other tests relying on `portfolioStore.ts`.
- [ ] Verify application compiles and all tests pass (`pnpm test`).
