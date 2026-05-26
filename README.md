# Portfolio Dashboard

[![Release](https://img.shields.io/github/v/release/nelomr/portfolio-dashboard?style=flat-square&logo=github&label=version)](https://github.com/nelomr/portfolio-dashboard/releases/latest)
[![CI](https://img.shields.io/github/actions/workflow/status/nelomr/portfolio-dashboard/ci.yml?branch=main&style=flat-square&logo=github-actions&label=CI)](https://github.com/nelomr/portfolio-dashboard/actions/workflows/ci.yml)
[![Changelog](https://img.shields.io/badge/changelog-CHANGELOG.md-blue?style=flat-square)](./CHANGELOG.md)

A professional and modern crypto portfolio dashboard.

## 🛠️ Stack

- **Framework**: Vue 3 (Composition API + `<script setup>`)
- **State Management**: [Pinia](https://pinia.vuejs.org/) + [Pinia Colada](https://pinia-colada.esm.dev/)
- **Styling**: TailwindCSS 4
- **Charts**: Lightweight Charts (TradingView)
- **Testing**: Vitest
- **Package Manager**: pnpm

## 📦 Architecture

This project emphasizes a clean, performant, and scalable architecture.

- **Pinia Colada** handles asynchronous state fetching efficiently, reducing manual `isLoading` or boilerplate.
- **TailwindCSS 4** provides utility-first styling with modern UI considerations.
- **Lightweight Charts** ensures high performance when rendering significant amounts of financial/analytical data.

## 🚀 Getting Started

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start the development server**:

   ```bash
   pnpm dev
   ```

3. **Run tests**:

   ```bash
   pnpm test
   ```

4. **Type check**:

   ```bash
   pnpm typecheck
   ```

## 🔖 Versioning

This project follows [Semantic Versioning](https://semver.org) (`MAJOR.MINOR.PATCH`) and uses [Conventional Commits](https://www.conventionalcommits.org) to automate releases.

| Commit type | Version bump | Example |
|-------------|-------------|---------|
| `feat: ...` | **minor** `0.x.0` | New feature added |
| `fix: ...` | **patch** `0.0.x` | Bug fix |
| `perf: ...` | **patch** `0.0.x` | Performance improvement |
| `refactor: ...` | **patch** `0.0.x` | Code refactor |
| `feat!: ...` or `BREAKING CHANGE:` | **major** `x.0.0` | Breaking change |
| `docs: / test: / chore:` | **patch** or none | Docs, tests, maintenance |

Every push to `main` triggers the CI pipeline. If releasable commits are detected, `semantic-release` automatically:
1. Bumps the version in `package.json`
2. Updates `CHANGELOG.md`
3. Creates a GitHub Release with generated notes
4. Tags the commit (`vX.Y.Z`)

See all releases → [GitHub Releases](https://github.com/nelomr/portfolio-dashboard/releases)
See full history → [CHANGELOG.md](./CHANGELOG.md)

## 📄 License

This project is open-source under the [MIT License](LICENSE).
