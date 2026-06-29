# Tall Ships 2026 — Fleet Directory & Dock Guide

A Next.js web app for browsing the Tall Ships America 2026 fleet visiting New York City (July 5–7, 2026).

## Features

- **All Ships** — sortable, filterable table with expandable detail rows
- **By Location** — cards grouped by neighborhood and pier
- **By Date** — ships grouped by display date and dock

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating Ship Data

All fleet data lives in `src/lib/ships.ts`. Edit the `SHIPS` array to update dates, pier assignments, or add new vessels. Ships with unknown details use `null` for location fields and `[]` for dates.

## Tech Stack

- Next.js 15 (App Router)
- React 18
- TypeScript
- CSS Modules

