export interface Ship {
  country: string
  name: string
  sqftSail: number | null
  lengthFt: number | null
  capacity: string | null
  location: string | null
  pier: string | null
  neighborhood: string | null
  dates: string[]
}

import { SHIPS_DATA } from './ships-data'
export { SHIPS_DATA as SHIPS }

export const LOCATIONS = [...new Set(SHIPS_DATA.map(s => s.location).filter(Boolean))].sort() as string[]
export const NEIGHBORHOODS = [...new Set(SHIPS_DATA.map(s => s.neighborhood).filter(Boolean))].sort() as string[]
export const ALL_DATES = [...new Set(SHIPS_DATA.flatMap(s => s.dates))].sort()
