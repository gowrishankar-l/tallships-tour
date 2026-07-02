'use client'

import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './page.module.css'

const PIER_COORDS: Record<string, [number, number]> = {
  'Brooklyn: Pier 1':                           [40.7024, -73.9961],
  'Brooklyn: Pier 3':                           [40.6999, -73.9969],
  'Brooklyn: Pier 5':                           [40.6963, -73.9979],
  'Brooklyn: Brooklyn Marina':                  [40.6937, -73.9995],
  'Manhattan: Pier 15':                         [40.70450567747087, -74.00299758174279],
  'Manhattan: Pier 17':                         [40.70552414484049, -74.00152107516791],
  'Manhattan: Pier 86':                         [40.76479479385253, -73.99911377891699],
  'Manhattan: Pier 90/91':                      [40.76704542017191, -73.99736332804437],
  'Staten Island: Stapleton Waterfront Park':   [40.6278, -74.0742],
}

const AREA_COLORS: Record<string, string> = {
  'Manhattan':     '#1d4ed8',
  'Brooklyn':      '#15803d',
  'Staten Island': '#b45309',
}

const COUNTRY_ISO: Record<string, string> = {
  'Argentina': 'ar', 'British Virgin Islands': 'vg', 'Chile': 'cl',
  'Colombia': 'co', 'Dominican Republic': 'do', 'Ecuador': 'ec',
  'France': 'fr', 'Germany': 'de', 'India': 'in', 'Italy': 'it',
  'Monaco': 'mc', 'Netherlands': 'nl', 'Peru': 'pe', 'Poland': 'pl',
  'Portugal': 'pt', 'Romania': 'ro', 'Spain': 'es', 'Sweden': 'se',
  'United States': 'us', 'Uruguay': 'uy',
}

interface Props {
  ships: { location: string | null; name: string; country: string; sqftSail: number | null }[]
}

const DEFAULT_CENTER: [number, number] = [40.685, -74.02]
const DEFAULT_ZOOM = 11

function ResetZoomControl() {
  const map = useMap()
  return (
    <button
      onClick={() => map.setView(DEFAULT_CENTER, DEFAULT_ZOOM)}
      style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 1000,
        background: '#fff', border: '2px solid rgba(0,0,0,0.2)',
        borderRadius: 6, padding: '8px 20px', fontSize: 14, fontWeight: 700,
        cursor: 'pointer', fontFamily: 'Barlow, sans-serif', color: '#333',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      ⌂ Reset View
    </button>
  )
}

export default function MapView({ ships }: Props) {
  const byPier: Record<string, typeof ships> = {}
  ships.forEach(s => {
    if (s.location && PIER_COORDS[s.location]) {
      if (!byPier[s.location]) byPier[s.location] = []
      byPier[s.location].push(s)
    }
  })

  return (
    <div className={styles.mapWrap}>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <ResetZoomControl />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Object.entries(byPier).map(([location, pierShips]) => {
          const coords = PIER_COORDS[location]
          const city = location.split(':')[0]
          const color = AREA_COLORS[city] ?? '#64748b'
          const radius = Math.max(16, pierShips.length * 6)
          const pierName = location.split(': ')[1]

          return (
            <CircleMarker
              key={location}
              center={coords}
              radius={radius}
              pathOptions={{ fillColor: color, fillOpacity: 0.85, color: '#fff', weight: 2 }}
            >
              {/* Hover tooltip — ship list with flags */}
              <Tooltip direction="right" offset={[10, 0]} opacity={1} sticky className={styles.mapHoverTip}>
                <div style={{ fontFamily: 'Barlow, sans-serif', minWidth: 180 }}>
                  <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 6, borderBottom: `2px solid ${color}`, paddingBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                    <span>{pierName} · {city}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b', whiteSpace: 'nowrap' }}>{pierShips.length} ship{pierShips.length !== 1 ? 's' : ''}</span>
                  </div>
                  {pierShips.map(s => {
                    const iso = COUNTRY_ISO[s.country]
                    return (
                      <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '3px 0', fontSize: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {iso && <span className={`fi fi-${iso}`} style={{ fontSize: 13, flexShrink: 0 }} />}
                          <span>{s.name}</span>
                        </div>
                        {s.sqftSail != null && <span style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>{s.sqftSail.toLocaleString()} sq ft</span>}
                      </div>
                    )
                  })}
                </div>
              </Tooltip>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}
