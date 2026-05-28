# 📊 Kryptofolio

> 🌍 **Read this in:** [English](README.md) | [Español](README.es.md)

![Kryptofolio Banner](docs/assets/banner.png)

> **Kryptofolio** is an open-source crypto portfolio tracker built with Vue 3 and Clean Architecture. Designed as a pure visualization platform utilizing a strict FIFO system for data presentation, and technically primed for seamless integration with AI Agents (Vercel AI SDK + Mastra).

[![Release](https://img.shields.io/github/v/release/nelomr/portfolio-dashboard?style=flat-square&logo=github&label=version)](https://github.com/nelomr/portfolio-dashboard/releases/latest)
[![CI](https://img.shields.io/github/actions/workflow/status/nelomr/portfolio-dashboard/ci.yml?branch=main&style=flat-square&logo=github-actions&label=CI)](https://github.com/nelomr/portfolio-dashboard/actions/workflows/ci.yml)
[![Changelog](https://img.shields.io/badge/changelog-CHANGELOG.md-blue?style=flat-square)](./CHANGELOG.md)

## ✨ Key Features

- **📊 FIFO-Based Data Presentation:** Accurate and reliable transaction and balance reporting using a First-In-First-Out (FIFO) methodology to structure the display logic.
- **🤖 AI Agent Ready:** The frontend data models are decoupled and specifically designed to be queried by a future AI Agent integration (using Vercel AI SDK and Mastra). You will be able to ask natural language questions about your portfolio in real-time.
- **🛡️ Privacy First:** Fully self-hosted. The backend utilizes a local SQLite database (`fiscal.db`), ensuring your keys and transaction history never leave your machine.
- **🏗️ Hexagonal Architecture:** Strict separation of concerns (Ports & Adapters). The UI layer is completely decoupled from data fetching, enabling high testability and robust runtime validation via Zod.

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API + `<script setup>`)
- **State Management**: [Pinia](https://pinia.vuejs.org/) + [Pinia Colada](https://pinia-colada.esm.dev/)
- **Styling**: TailwindCSS 4
- **Charts**: Lightweight Charts (TradingView)
- **Testing**: Vitest
- **Package Manager**: pnpm

## 🚀 Quick Start

### Environment Configuration

```bash
# For development
cp .env.example .env

# For production
cp .env.production.example .env.production
```

**Key Variables:**
- `VITE_USE_MOCK`: Set to `true` to use the local mock adapters. Set to `false` to use the real REST API adapters connecting to the backend.
- `VITE_API_BASE_URL`: The URL of the backend (e.g., `http://localhost:8000`).

### Local Development

Ensure you have [pnpm](https://pnpm.io/) installed.

```bash
# 1. Clone the repository
git clone https://github.com/nelomr/portfolio-dashboard.git
cd portfolio-dashboard

# 2. Install dependencies
pnpm install

# 3. Start the development server (with HMR)
pnpm dev
```

## 🏗️ Architecture: Hexagonal (Ports & Adapters)

This project strictly adheres to **Clean Architecture** to ensure the UI is completely decoupled from API contracts and external dependencies.

1. **Domain Layer (`src/core/domain/`)**: Framework agnostic. Defines Entities & Value Objects using TypeScript and `zod` for strict runtime validation. Contains Ports (repository interfaces).
2. **Infrastructure Layer (`src/core/infrastructure/`)**: Concrete Implementations (Adapters) of the Domain Ports. Handles real `fetch` calls and dependency injection depending on environment variables.
3. **Application & UI Layer (`src/composables/` & `src/views/`)**: Asynchronous data is managed declaratively via `@pinia/colada` (`useQuery`/`useMutation`). Views act purely as orchestrators.

## 🔖 Versioning

This project follows [Semantic Versioning](https://semver.org) (`MAJOR.MINOR.PATCH`) and uses [Conventional Commits](https://www.conventionalcommits.org) to automate releases.

| Commit type | Version bump | Example |
|-------------|-------------|---------|
| `feat: ...` | **minor** `0.x.0` | New feature added |
| `fix: ...` | **patch** `0.0.x` | Bug fix |
| `feat!: ...` or `BREAKING CHANGE:` | **major** `x.0.0` | Breaking change |
| `docs: / test: / chore: / perf: / refactor:` | **none** | Docs, tests, maintenance, performance, code refactoring |

> ⚠️ **Release Pacing Rule:** To avoid excessive version bumps for minor technical changes, **only `feat` (minor) and `fix` (patch) commits will trigger a new version release**. Commits of type `docs`, `refactor`, `test`, and `perf` will be tracked in git but will *not* force a version bump in `package.json` nor create a new GitHub release.

Every push to `main` triggers the CI pipeline. If releasable commits (`feat` or `fix`) are detected, `semantic-release` automatically:
1. Bumps the version in `package.json` and commits the file back to the repository.
2. Updates `CHANGELOG.md` (using the title "Kriptofolio").
3. Creates a GitHub Release with generated notes.
4. Tags the commit (`vX.Y.Z`).

See all releases → [GitHub Releases](https://github.com/nelomr/portfolio-dashboard/releases)
See full history → [CHANGELOG.md](./CHANGELOG.md)

## 📄 License

This project is open-source under the [MIT License](LICENSE).
