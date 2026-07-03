# Tall Ships 2026 — Fleet Directory & Dock Guide

A Next.js web app for browsing the Tall Ships America 2026 fleet visiting New York City (July 4–7, 2026).

Live: [tallships-tour.vercel.app](https://tallships-tour.vercel.app)

## Features

- **All Ships** — sortable, filterable table with country flags and expandable detail rows
- **By Location** — cards grouped by neighborhood and pier, with area filter
- **By Date** — ships grouped by display date and dock, with area filter
- **Schedule** — full event timeline with date jump nav (Jul 3–8)
- **Map** — Leaflet + OpenStreetMap showing ship counts per pier as bubbles
- **Analytics** — Sail Area leaderboard and Fleet by Nation bar charts (toggle sub-tabs)
- **Live Tracker** — link-out to GlobalTerraMaps real-time tracker
- **Tickets** — link-out to free public viewing tickets on TicketTree
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
- [react-leaflet](https://react-leaflet.js.org/) + OpenStreetMap for the map view
- [flag-icons](https://github.com/lipis/flag-icons) for country flags
