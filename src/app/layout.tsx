import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tall Ships 2026 — Fleet Directory',
  description: 'Where to see the tall ships, by location and date',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
