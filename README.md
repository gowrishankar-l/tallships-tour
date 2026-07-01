# Tall Ships 2026 — Fleet Directory & Dock Guide

A Next.js web app for browsing the Tall Ships America 2026 fleet visiting New York City (July 5–7, 2026).

Live: [tallships-tour.vercel.app](https://tallships-tour.vercel.app)

## Features

- **All Ships** — sortable, filterable table with country flags and expandable detail rows
- **By Location** — cards grouped by neighborhood and pier
- **By Date** — ships grouped by display date and dock
- **Stats banner** — fleet size, docked count, days, and nations at a glance

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating Ship Data

Edit `src/lib/tall_ships_itinerary.csv` — the last three columns (`5-Jul`, `6-Jul`, `7-Jul`) use `1` to indicate a ship is docked at that location on that date. Then run:

```bash
npm run parse
```

This regenerates `src/lib/ships-data.ts` from the CSV. The `dev` and `build` scripts run this automatically.

## Tech Stack

- Next.js 15 (App Router)
- React 18
- TypeScript
- CSS Modules
- [flag-icons](https://github.com/lipis/flag-icons) for country flags
