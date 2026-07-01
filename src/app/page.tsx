'use client'

import { useState, useMemo } from 'react'
import { SHIPS, LOCATIONS, ALL_DATES, Ship } from '@/lib/ships'
import styles from './page.module.css'

function fmtNum(n: number | null) {
  if (n == null) return '—'
  return n.toLocaleString()
}

function locationArea(loc: string) {
  if (loc.startsWith('Manhattan')) return 'Manhattan'
  if (loc.startsWith('Brooklyn')) return 'Brooklyn/Dumbo'
  if (loc.startsWith('Staten Island')) return 'Staten Island'
  return loc
}

const AREA_COLORS: Record<string, string> = {
  'Manhattan':       '#1d4ed8',
  'Brooklyn/Dumbo':  '#15803d',
  'Staten Island':   '#b45309',
}

const COUNTRY_ISO: Record<string, string> = {
  'Argentina':             'ar',
  'British Virgin Islands':'vg',
  'Chile':                 'cl',
  'Colombia':              'co',
  'Dominican Republic':    'do',
  'Ecuador':               'ec',
  'France':                'fr',
  'Germany':               'de',
  'India':                 'in',
  'Italy':                 'it',
  'Monaco':                'mc',
  'Netherlands':           'nl',
  'Peru':                  'pe',
  'Poland':                'pl',
  'Portugal':              'pt',
  'Romania':               'ro',
  'Spain':                 'es',
  'Sweden':                'se',
  'United States':         'us',
  'Uruguay':               'uy',
}

function Flag({ country }: { country: string }) {
  const iso = COUNTRY_ISO[country]
  if (!iso) return null
  return <span className={`fi fi-${iso} ${styles.flag}`} title={country} />
}

function DateChip({ date }: { date: string }) {
  return <span className={styles.dateChip}>{date}</span>
}

function ShipRow({ ship, rank }: { ship: Ship; rank: number }) {
  const [expanded, setExpanded] = useState(false)
  const area = ship.location ? locationArea(ship.location) : null
  const color = area ? AREA_COLORS[area] : null

  return (
    <>
      <tr className={styles.row} onClick={() => setExpanded(e => !e)}>
        <td className={styles.rank}>{rank}</td>
        <td>
          <div className={styles.shipName}><Flag country={ship.country} /> {ship.name}</div>
          <div className={styles.shipCountry}>{ship.country}</div>
        </td>
        <td className={styles.num}>{fmtNum(ship.sqftSail)}</td>
        <td className={styles.num}>{fmtNum(ship.lengthFt)}</td>
        <td className={styles.num}>{ship.capacity ?? '—'}</td>
        <td>
          {ship.neighborhood && ship.pier ? (
            <div>
              <div className={styles.neighborhood} style={{ color: color ?? '#64748b' }}>{ship.neighborhood}</div>
              <div className={styles.pier}>{ship.pier}</div>
            </div>
          ) : <span className={styles.tbd}>TBD</span>}
        </td>
        <td>
          {ship.dates.length > 0
            ? <div className={styles.dateChips}>{ship.dates.map(d => <DateChip key={d} date={d} />)}</div>
            : <span className={styles.tbd}>TBD</span>}
        </td>
        <td className={styles.chevron}>{expanded ? '▲' : '▼'}</td>
      </tr>
      {expanded && (
        <tr className={styles.expandRow}>
          <td colSpan={8}>
            <div className={styles.expandContent}>
              <div className={styles.expandGrid}>
                <div><span className={styles.elabel}>Country</span><span className={styles.eval}><Flag country={ship.country} /> {ship.country}</span></div>
                <div><span className={styles.elabel}>Sail Area</span><span className={styles.eval}>{fmtNum(ship.sqftSail)} sq ft</span></div>
                <div><span className={styles.elabel}>Length</span><span className={styles.eval}>{fmtNum(ship.lengthFt)} ft</span></div>
                <div><span className={styles.elabel}>Capacity</span><span className={styles.eval}>{ship.capacity ?? '—'}</span></div>
                <div><span className={styles.elabel}>Neighborhood</span><span className={styles.eval}>{ship.neighborhood ?? 'TBD'}</span></div>
                <div><span className={styles.elabel}>Pier / Dock</span><span className={styles.eval}>{ship.pier ?? 'TBD'}</span></div>
                <div style={{ gridColumn: '1/-1' }}>
                  <span className={styles.elabel}>On Display</span>
                  <div className={styles.dateChips} style={{ marginTop: 4 }}>
                    {ship.dates.length > 0
                      ? ship.dates.map(d => <DateChip key={d} date={d} />)
                      : <span className={styles.tbd}>Date TBD</span>}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

function LocationCard({ neighborhood, pier, ships }: { neighborhood: string; pier: string; ships: Ship[] }) {
  const color = AREA_COLORS[neighborhood] ?? '#64748b'
  const allDates = [...new Set(ships.flatMap(s => s.dates))].sort()
  return (
    <div className={styles.locCard}>
      <div className={styles.locHeader} style={{ borderLeftColor: color }}>
        <div>
          <div className={styles.locName}>{pier}</div>
          <div className={styles.locArea} style={{ color }}>{neighborhood}</div>
        </div>
        <span className={styles.locCount}>{ships.length} ship{ships.length !== 1 ? 's' : ''}</span>
      </div>
      {allDates.length > 0 && (
        <div className={styles.locDatesRow}>
          <span className={styles.locDatesLabel}>Open dates:</span>
          {allDates.map(d => <DateChip key={d} date={d} />)}
        </div>
      )}
      <div className={styles.locShips}>
        {ships.map(s => (
          <div key={s.name} className={styles.locShipRow}>
            <div>
              <div className={styles.locShipName}>{s.name}</div>
              <div className={styles.locShipCountry}><Flag country={s.country} /> {s.country}</div>
            </div>
            {s.dates.length > 0 && (
              <div className={styles.dateChips}>
                {s.dates.map(d => <DateChip key={d} date={d} />)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

type SortKey = 'sqftSail' | 'lengthFt' | 'name' | 'country'
type SortDir = 'asc' | 'desc'
type View = 'ships' | 'locations' | 'bydate'

export default function Page() {
  const [view, setView] = useState<View>('ships')
  const [filterLoc, setFilterLoc] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('sqftSail')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [search, setSearch] = useState('')

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const filtered = useMemo(() => {
    return SHIPS
      .filter(s => {
        if (filterLoc && s.location !== filterLoc) return false
        if (filterDate && !s.dates.includes(filterDate)) return false
        if (search) {
          const q = search.toLowerCase()
          return s.name.toLowerCase().includes(q) || s.country.toLowerCase().includes(q)
        }
        return true
      })
      .sort((a, b) => {
        let av: any = a[sortKey]
        let bv: any = b[sortKey]
        if (av == null) av = sortDir === 'asc' ? Infinity : -Infinity
        if (bv == null) bv = sortDir === 'asc' ? Infinity : -Infinity
        if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
        return sortDir === 'asc' ? av - bv : bv - av
      })
  }, [filterLoc, filterDate, search, sortKey, sortDir])

  // Group by neighborhood + pier for location view
  const byLocation = useMemo(() => {
    const map: Record<string, { neighborhood: string; pier: string; ships: Ship[] }> = {}
    SHIPS.filter(s => s.pier && s.neighborhood).forEach(s => {
      const key = `${s.neighborhood}__${s.pier}`
      if (!map[key]) map[key] = { neighborhood: s.neighborhood!, pier: s.pier!, ships: [] }
      map[key].ships.push(s)
    })
    return Object.values(map).sort((a, b) => a.neighborhood.localeCompare(b.neighborhood))
  }, [])

  // Group by date for date view
  const byDate = useMemo(() => {
    const map: Record<string, Ship[]> = {}
    SHIPS.forEach(s => {
      s.dates.forEach(d => {
        if (!map[d]) map[d] = []
        map[d].push(s)
      })
    })
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
  }, [])

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <span className={styles.sortIcon}>↕</span>
    return <span className={styles.sortIcon}>{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  const hasFilter = filterLoc || filterDate || search

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>⛵</span>
            <div>
              <h1 className={styles.title}>Tall Ships 2026</h1>
              <p className={styles.subtitle}>Fleet Directory &amp; Dock Guide — New York City</p>
              <p className={styles.eventDates}>July 5 – July 7, 2026</p>
            </div>
          </div>
          <div className={styles.credits}>
            <span className={styles.creditsName}>Gowrishankar Lakshminarayanan</span>
            <a href="https://sail4th.org" target="_blank" rel="noopener noreferrer" className={styles.creditsSource}>Data: sail4th.org</a>
            <span className={styles.creditsSource}>Last updated Jun 30, 2026</span>
          </div>
        </div>
      </header>

      <div className={styles.statsBanner}>
        <div className={styles.statsBannerInner}>
          <div className={styles.statItem}>
            {/* Tall ship / sail */}
            <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="2" x2="12" y2="20"/>
              <path d="M12 4 C12 4 5 8 5 14 L12 14 Z"/>
              <path d="M12 6 C12 6 18 9 18 14 L12 14 Z"/>
              <path d="M4 20 Q12 18 20 20"/>
            </svg>
            <span className={styles.statNum}>{SHIPS.length}</span>
            <span className={styles.statLabel}>Ships</span>
          </div>
          <div className={styles.statItem}>
            {/* Anchor */}
            <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="2"/>
              <line x1="12" y1="7" x2="12" y2="20"/>
              <path d="M6 11 L12 7 L18 11"/>
              <path d="M6 20 C6 20 6 17 12 17 C18 17 18 20 18 20"/>
            </svg>
            <span className={styles.statNum}>{SHIPS.filter(s=>s.pier).length}</span>
            <span className={styles.statLabel}>Docked</span>
          </div>
          <div className={styles.statItem}>
            {/* Compass / sun */}
            <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <line x1="12" y1="2" x2="12" y2="5"/>
              <line x1="12" y1="19" x2="12" y2="22"/>
              <line x1="2" y1="12" x2="5" y2="12"/>
              <line x1="19" y1="12" x2="22" y2="12"/>
              <line x1="4.93" y1="4.93" x2="7.05" y2="7.05"/>
              <line x1="16.95" y1="16.95" x2="19.07" y2="19.07"/>
              <line x1="4.93" y1="19.07" x2="7.05" y2="16.95"/>
              <line x1="16.95" y1="7.05" x2="19.07" y2="4.93"/>
            </svg>
            <span className={styles.statNum}>{ALL_DATES.length}</span>
            <span className={styles.statLabel}>Days</span>
          </div>
          <div className={styles.statItem}>
            {/* Flag / pennant */}
            <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="3" x2="5" y2="21"/>
              <path d="M5 4 L19 9 L5 14 Z"/>
            </svg>
            <span className={styles.statNum}>{[...new Set(SHIPS.map(s=>s.country))].length}</span>
            <span className={styles.statLabel}>Nations</span>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <div className={styles.tabsInner}>
          <button className={`${styles.tab} ${view==='ships'?styles.tabOn:''}`} onClick={()=>setView('ships')}>🚢 All Ships</button>
          <button className={`${styles.tab} ${view==='locations'?styles.tabOn:''}`} onClick={()=>setView('locations')}>📍 By Location</button>
          <button className={`${styles.tab} ${view==='bydate'?styles.tabOn:''}`} onClick={()=>setView('bydate')}>📅 By Date</button>
        </div>
      </div>

      <main className={styles.main}>

        {/* ── All Ships ── */}
        {view === 'ships' && (
          <>
            <div className={styles.filters}>
              <input className={styles.search} placeholder="🔍  Search ship or country…" value={search} onChange={e=>setSearch(e.target.value)} />
              <select className={styles.select} value={filterLoc} onChange={e=>setFilterLoc(e.target.value)}>
                <option value="">All locations</option>
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select className={styles.select} value={filterDate} onChange={e=>setFilterDate(e.target.value)}>
                <option value="">All dates</option>
                {ALL_DATES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {hasFilter && <button className={styles.clearBtn} onClick={()=>{setFilterLoc('');setFilterDate('');setSearch('')}}>Clear filters</button>}
              <span className={styles.resultCount}>
                <span className={styles.resultNum}>{filtered.length}</span>
                {' '}ships selected
              </span>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.thRank}>#</th>
                    <th className={`${styles.th} ${styles.thSort}`} onClick={()=>handleSort('name')}>Ship <SortIcon k="name" /></th>
                    <th className={`${styles.th} ${styles.thSort} ${styles.thNum}`} onClick={()=>handleSort('sqftSail')}>Sail (sq ft) <SortIcon k="sqftSail" /></th>
                    <th className={`${styles.th} ${styles.thSort} ${styles.thNum}`} onClick={()=>handleSort('lengthFt')}>Length <SortIcon k="lengthFt" /></th>
                    <th className={`${styles.th} ${styles.thNum}`}>Capacity</th>
                    <th className={styles.th}>Location</th>
                    <th className={styles.th}>On Display</th>
                    <th className={styles.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((ship, i) => <ShipRow key={ship.name} ship={ship} rank={i+1} />)}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── By Location ── */}
        {view === 'locations' && (
          <>
            <div className={styles.locGrid}>
              {byLocation.map(({ neighborhood, pier, ships }) => (
                <LocationCard key={pier} neighborhood={neighborhood} pier={pier} ships={ships} />
              ))}
            </div>
            {SHIPS.filter(s=>!s.pier).length > 0 && (
              <div className={styles.tbdSection}>
                <h3 className={styles.tbdTitle}>📋 Location TBD ({SHIPS.filter(s=>!s.pier).length} ships)</h3>
                <div className={styles.tbdList}>
                  {SHIPS.filter(s=>!s.pier).map(s => (
                    <div key={s.name} className={styles.tbdRow}>
                      <span className={styles.tbdName}>{s.name}</span>
                      <span className={styles.tbdCountry}>{s.country}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── By Date ── */}
        {view === 'bydate' && (
          <div className={styles.dateGrid}>
            {byDate.map(([date, ships]) => (
              <div key={date} className={styles.dateCard}>
                <div className={styles.dateCardHeader}>
                  <span className={styles.dateCardDate}>{date}</span>
                  <span className={styles.dateCardCount}>{ships.length} ships</span>
                </div>
                {/* Group by location within date */}
                {Object.entries(
                  ships.reduce<Record<string, Ship[]>>((acc, s) => {
                    const key = s.pier ?? 'TBD'
                    if (!acc[key]) acc[key] = []
                    acc[key].push(s)
                    return acc
                  }, {})
                ).map(([pier, pierShips]) => (
                  <div key={pier} className={styles.datePierGroup}>
                    <div className={styles.datePierName}>
                      <span style={{ color: AREA_COLORS[pierShips[0].neighborhood ?? ''] ?? '#64748b' }}>●</span> {pier}
                      {pierShips[0].neighborhood && <span className={styles.datePierNeighborhood}> · {pierShips[0].neighborhood}</span>}
                    </div>
                    {pierShips.map(s => (
                      <div key={s.name} className={styles.dateShipRow}>
                        <span className={styles.dateShipName}>{s.name}</span>
                        <span className={styles.dateShipCountry}>{s.country}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

      </main>

      {/* <footer className={styles.footer}>
        <p>Tall Ships America 2026 — New York City</p>
      </footer> */}
    </div>
  )
}
