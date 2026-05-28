# design-system Specification

## Purpose
TBD - created by archiving change design-system-integration. Update Purpose after archive.
## Requirements
### Requirement: Design System Single Source of Truth
The system SHALL establish a `DESIGN.md` file at the repository root as the definitive reference for the visual identity and design tokens of the application.

#### Scenario: AI Agent references the design system
- **WHEN** an AI agent or developer creates a new UI component
- **THEN** they MUST read `DESIGN.md` to determine the correct color tokens, typography scales, spacing, and structural patterns to apply.

#### Scenario: Enforcing the Alucard aesthetic
- **WHEN** styling a component representing financial data
- **THEN** the system MUST follow the rules laid out in the prose of `DESIGN.md`, such as using `font-mono` for numeric tables and specific semantic colors (`--color-profit`, `--color-loss`) for performance metrics.

### Requirement: YAML Token Definition
The `DESIGN.md` file SHALL include machine-readable design tokens defined in a YAML frontmatter block `---`, conforming to the `design.md` schema.

#### Scenario: Defining Core Palettes
- **WHEN** the `DESIGN.md` file is structured
- **THEN** it MUST contain a `colors:` block mapping the Tailwind CSS variables (e.g. `primary`, `profit`, `loss`) to their respective string representations, ensuring synchronization with `src/style.css`.

