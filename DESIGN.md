---
name: Alucard Design System
version: "1.0.0"
description: Visual identity and design system for the Alucard Crypto Portfolio Dashboard
colors:
  profit: "oklch(0.627 0.194 149.214)"
  loss: "oklch(0.637 0.237 25.331)"
  profit-legacy: "#10B981"
  loss-legacy: "#EF4444"
  background: "oklch(var(--background))"
  foreground: "oklch(var(--foreground))"
  card: "oklch(var(--card))"
  border: "oklch(var(--border))"
  muted: "oklch(var(--muted))"
typography:
  sans:
    fontFamily: "\"Inter\", \"Outfit\", ui-sans-serif, system-ui, sans-serif"
  mono:
    fontFamily: "\"JetBrains Mono\", monospace"
rounded:
  sm: "calc(var(--radius) - 4px)"
  md: "calc(var(--radius) - 2px)"
  lg: "var(--radius)"
  xl: "calc(var(--radius) + 4px)"
shadows:
  alucard-soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  alucard-card: "0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04)"
components:
  glass-card:
    backgroundColor: "bg-card/10"
    backdropFilter: "backdrop-blur-md"
    border: "border border-border/40"
    rounded: "{rounded.2xl}"
  profit-badge:
    backgroundColor: "bg-profit/10"
    textColor: "text-profit"
  loss-badge:
    backgroundColor: "bg-loss/10"
    textColor: "text-loss"
---

## Overview

Architectural Minimalism meets Financial Gravitas. The "Alucard" aesthetic evokes a premium, modern Bloomberg Terminal or high-end Fintech dashboard. It heavily relies on dark mode by default, glassmorphism for floating elements, and strict adherence to specific color semantics for financial outcomes.

This document serves as the **Single Source of Truth** for any agent or human developing UI components.

## Colors

The palette uses a high-contrast dark mode base with carefully tuned OKLCH semantic colors for financial data.

- **Backgrounds**: Use `bg-background` for the deepest layers. Use `bg-card` (often with `/10` opacity for glassmorphism) for elevated panels.
- **Borders**: Use `border-border/10` or `border-border/40` to create subtle separation without harsh lines.
- **Profit (`--color-profit`)**: A custom OKLCH emerald. MUST be used for positive PnL, gains, and "En Cartera" statuses. Do not hallucinate other greens like `#00FF00` or `text-green-500`.
- **Loss (`--color-loss`)**: A custom OKLCH rose. MUST be used for negative PnL, losses, and "Vendido" statuses. Do not use generic reds.

## Typography

Typography establishes trust and readability, especially when parsing numeric data.

- **Sans-serif (Inter/Outfit)**: Used for all standard text, headers, and labels.
- **Monospace (JetBrains Mono)**: **CRITICAL FOR FINANCIAL DATA.** Any number representing currency, quantities, prices, or percentages MUST use the `font-mono` utility to ensure tabular lining and vertical alignment across rows.
- **Tracking**: Use `tracking-widest` alongside `uppercase` and `text-[10px]` for micro-headers and badges to give a refined, technical look.

## Elevation & Depth

We avoid solid flat layers in favor of glassmorphism and subtle shadows.

- **Glassmorphism**: Combine `bg-card/10` (or `bg-background/95`) with `backdrop-blur-md` (or `xl`) to create translucent layers. This is mandatory for Modals, Table Headers, and Metric Cards.
- **Shadows**: Use `shadow-alucard-soft` for small interactive elements and `shadow-alucard-card` for larger structural panels.

## Components

### Cards and Panels
Any container holding data should look like a frosted glass pane over the main background.
Example classes: `bg-card/10 backdrop-blur-md border border-border/40 rounded-2xl`

### Skeletons (Delegated Pattern)
Do not use inline spinners for data tables or charts. Use the **Delegated Skeleton Pattern**: extract loading states into dedicated `*Skeleton.vue` components (e.g., `MetricsRowSkeleton.vue`) that visually mimic the final layout using the `Skeleton` component from Shadcn-Vue with lowered opacities (`opacity-20` to `opacity-50`).

### Badges
Financial status badges must use semantic coloring without harsh borders.
- Profit Badge: `bg-profit/10 text-profit border-none`
- Loss Badge: `bg-loss/10 text-loss border-none`
