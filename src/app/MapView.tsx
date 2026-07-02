'use client'

import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './page.module.css'

const PIER_COORDS: Record<string, [number, number]> = {
  'Brooklyn: Pier 1':                           [40.7024, -73.9961],
  'Brooklyn: Pier 3':                           [40.6999, -73.9969],
  'Brooklyn: Pier 5':                           [40.6963, -73.9979],
  'Brooklyn: Brooklyn Marina':                  [40.6937, -73.9995],
  'Manhattan: Pier 15':                         [40.7057, -74.0034],
  'Manhattan: Pier 17':                         [40.7064, -74.0042],
  'Manhattan: Pier 86':                         [40.7649, -74.0005],
  'Manhattan: Pier 90/91':                      [40.7672, -74.0025],
  'Staten Island: Stapleton Waterfront Park':   [40.6278, -74.0742],
}

const AREA_COLORS: Record<string, string> = {
  'Manhattan':     '#1d4ed8',
  'Brooklyn':      '#15803d',
  'Staten Island': '#b45309',
}

interface Props {
  ships: { location: string | null; name: string; country: string }[]
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
        center={[40.72, -74.01]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Object.entries(byPier).map(([location, pierShips]) => {
          const coords = PIER_COORDS[location]
          const city = location.split(':')[0]
          const color = AREA_COLORS[city] ?? '#64748b'
          const radius = Math.max(16, pierShips.length * 6)

          return (
            <CircleMarker
              key={location}
              center={coords}
              radius={radius}
              pathOptions={{ fillColor: color, fillOpacity: 0.85, color: '#fff', weight: 2 }}
            >
              <Tooltip permanent direction="top" offset={[0, -radius]}>
                <div style={{ textAlign: 'center', fontFamily: 'Barlow Condensed, sans-serif' }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{pierShips.length} ships</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{location.split(': ')[1]}</div>
                </div>
              </Tooltip>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}
