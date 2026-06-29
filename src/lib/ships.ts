export interface Ship {
  country: string
  name: string
  sqftSail: number | null
  lengthFt: number | null
  capacity: string | null
  location: string | null
  pier: string | null
  neighborhood: string | null
  dates: string[] // array of date strings e.g. ["Jul 5", "Jul 6", "Jul 7"]
}

// ── Full data with dates from the matrix ────────────────────────────────────
export const SHIPS: Ship[] = [
  // DUMBO — Pier 1
  { country: 'Portugal',           name: 'NRP Sagres',               sqftSail: 22000, lengthFt: 292, capacity: '191',     location: 'Brooklyn: Pier 1',                        pier: 'Pier 1',    neighborhood: 'Dumbo',        dates: ['Jul 6'] },
  { country: 'India',              name: 'INS Sudarshini',           sqftSail: 11140, lengthFt: 177, capacity: '75',      location: 'Brooklyn: Pier 1',                        pier: 'Pier 1',    neighborhood: 'Dumbo',        dates: ['Jul 5', 'Jul 6'] },

  // DUMBO — Pier 3
  { country: 'Germany',            name: 'Gorch Fock',               sqftSail: 21010, lengthFt: 266, capacity: '220–360', location: 'Brooklyn: Pier 3',                        pier: 'Pier 3',    neighborhood: 'Dumbo',        dates: ['Jul 6', 'Jul 7'] },

  // DUMBO — Pier 5
  { country: 'Romania',            name: 'Mircea',                   sqftSail: 18837, lengthFt: 269, capacity: '200–229', location: 'Brooklyn: Pier 5',                        pier: 'Pier 5',    neighborhood: 'Dumbo',        dates: ['Jul 6', 'Jul 7'] },

  // DOWNTOWN — Pier 17
  { country: 'United States',      name: 'USCGC Eagle',              sqftSail: 22000, lengthFt: 295, capacity: '208',     location: 'Manhattan: Pier 17',                      pier: 'Pier 17',   neighborhood: 'Downtown',     dates: ['Jul 5', 'Jul 6', 'Jul 7'] },
  { country: 'Netherlands',        name: 'Oosterschelde',            sqftSail: 9590,  lengthFt: 164, capacity: '8–24',    location: 'Manhattan: Pier 17',                      pier: 'Pier 17',   neighborhood: 'Downtown',     dates: ['Jul 5', 'Jul 6', 'Jul 7'] },

  // DOWNTOWN — Pier 15
  { country: 'United States',      name: 'Pride of Baltimore II',    sqftSail: 9018,  lengthFt: 157, capacity: '12',      location: 'Manhattan: Pier 15',                      pier: 'Pier 15',   neighborhood: 'Downtown',     dates: ['Jul 5', 'Jul 6', 'Jul 7'] },

  // MIDTOWN — Pier 90/91
  { country: 'France',             name: 'Belle Poule',              sqftSail: 4800,  lengthFt: 123, capacity: '20',      location: 'Manhattan: Pier 90/91',                   pier: 'Pier 90/91',neighborhood: 'Midtown',      dates: ['Jul 5', 'Jul 6', 'Jul 7'] },
  { country: 'United States',      name: 'Bowdoin',                  sqftSail: null,  lengthFt: null,capacity: null,      location: 'Manhattan: Pier 90/91',                   pier: 'Pier 90/91',neighborhood: 'Midtown',      dates: ['Jul 5', 'Jul 6', 'Jul 7'] },
  { country: 'Poland',             name: 'Dar Mlodziezy',            sqftSail: 32000, lengthFt: 354, capacity: '176',     location: 'Manhattan: Pier 90/91',                   pier: 'Pier 90/91',neighborhood: 'Midtown',      dates: ['Jul 5', 'Jul 6', 'Jul 7'] },
  { country: 'Ecuador',            name: 'BAE Guayas',               sqftSail: 15200, lengthFt: 257, capacity: '155',     location: 'Manhattan: Pier 90/91',                   pier: 'Pier 90/91',neighborhood: 'Midtown',      dates: ['Jul 5', 'Jul 6', 'Jul 7'] },
  { country: 'Spain',              name: 'Juan Sebastian de Elcano', sqftSail: 30900, lengthFt: 371, capacity: '390',     location: 'Manhattan: Pier 90/91',                   pier: 'Pier 90/91',neighborhood: 'Midtown',      dates: ['Jul 5', 'Jul 6', 'Jul 7'] },
  { country: 'Dominican Republic', name: 'Juan Bautista Cambiaso',   sqftSail: 11000, lengthFt: 177, capacity: '12–37',   location: 'Manhattan: Pier 90/91',                   pier: 'Pier 90/91',neighborhood: 'Midtown',      dates: ['Jul 5', 'Jul 6', 'Jul 7'] },
  { country: 'United States',      name: 'Lady Maryland',            sqftSail: null,  lengthFt: 104, capacity: null,      location: 'Manhattan: Pier 90/91',                   pier: 'Pier 90/91',neighborhood: 'Midtown',      dates: ['Jul 5', 'Jul 6', 'Jul 7'] },
  { country: 'Argentina',          name: 'ARA Libertad',             sqftSail: 28545, lengthFt: 340, capacity: '361',     location: 'Manhattan: Pier 90/91',                   pier: 'Pier 90/91',neighborhood: 'Midtown',      dates: ['Jul 5', 'Jul 6', 'Jul 7'] },
  { country: 'United States',      name: 'Lynx',                     sqftSail: 4600,  lengthFt: 122, capacity: null,      location: 'Manhattan: Pier 90/91',                   pier: 'Pier 90/91',neighborhood: 'Midtown',      dates: ['Jul 5', 'Jul 6', 'Jul 7'] },
  { country: 'United States',      name: 'Tabor Boy',                sqftSail: null,  lengthFt: 115, capacity: null,      location: 'Manhattan: Pier 90/91',                   pier: 'Pier 90/91',neighborhood: 'Midtown',      dates: ['Jul 5', 'Jul 6', 'Jul 7'] },
  { country: 'United States',      name: 'When & If',                sqftSail: null,  lengthFt: 63,  capacity: null,      location: 'Manhattan: Pier 90/91',                   pier: 'Pier 90/91',neighborhood: 'Midtown',      dates: ['Jul 5', 'Jul 6', 'Jul 7'] },

  // STATEN ISLAND — Stapleton Waterfront Park
  { country: 'Colombia',           name: 'ARC Gloria',               sqftSail: 15000, lengthFt: 212, capacity: '165',     location: 'Staten Island: Stapleton Waterfront Park', pier: 'Stapleton Waterfront Park', neighborhood: 'Staten Island', dates: ['Jul 5', 'Jul 6', 'Jul 7'] },
  { country: 'Peru',               name: 'BAP Union',                sqftSail: 36620, lengthFt: 378, capacity: '250',     location: 'Staten Island: Stapleton Waterfront Park', pier: 'Stapleton Waterfront Park', neighborhood: 'Staten Island', dates: ['Jul 5', 'Jul 6', 'Jul 7'] },

  // Ships with no date data yet
  { country: 'Chile',              name: 'Esmeralda',                sqftSail: 30892, lengthFt: 371, capacity: '390',     location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'Italy',              name: 'Amerigo Vespucci',         sqftSail: 30400, lengthFt: 329, capacity: '276–406', location: 'Manhattan: Pier 90/91', pier: 'Pier 90/91', neighborhood: 'Midtown', dates: [] },
  { country: 'United States',      name: 'Elissa',                   sqftSail: 10890, lengthFt: 141, capacity: '42',      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'Uruguay',            name: 'Capitan Miranda',          sqftSail: 9185,  lengthFt: 210, capacity: '75',      location: 'Manhattan: Pier 90/91', pier: 'Pier 90/91', neighborhood: 'Midtown', dates: [] },
  { country: 'United States',      name: 'Ernestina-Morissey',       sqftSail: 8323,  lengthFt: 156, capacity: '32',      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'Sweden',             name: 'HMS Gladan',               sqftSail: 7340,  lengthFt: 129, capacity: '28',      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'United States',      name: 'Angelique',                sqftSail: 5260,  lengthFt: 130, capacity: '34',      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'United States',      name: 'Denis Sullivan',           sqftSail: 4600,  lengthFt: 137, capacity: null,      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'Monaco',             name: 'Tuiga',                    sqftSail: 4433,  lengthFt: 93,  capacity: '4–16',    location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'United States',      name: 'American Eagle',           sqftSail: 4250,  lengthFt: 123, capacity: '32',      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'United States',      name: 'Harvey Gamage',            sqftSail: 4200,  lengthFt: 131, capacity: '35',      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'British Virgin Islands', name: 'Vela',                 sqftSail: 4000,  lengthFt: 112, capacity: '30',      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'United States',      name: 'Adirondack',               sqftSail: 1850,  lengthFt: 65,  capacity: null,      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'United States',      name: 'Liberty Clipper',          sqftSail: null,  lengthFt: 125, capacity: null,      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'United States',      name: 'Clearwater',               sqftSail: null,  lengthFt: 106, capacity: '55',      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'United States',      name: 'America 2.0',              sqftSail: null,  lengthFt: 105, capacity: null,      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'United States',      name: 'Pioneer',                  sqftSail: null,  lengthFt: 102, capacity: null,      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'United States',      name: 'Foggy',                    sqftSail: null,  lengthFt: 74,  capacity: null,      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'United States',      name: 'Ticonderoga',              sqftSail: null,  lengthFt: 72,  capacity: null,      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'United States',      name: 'Mayan',                    sqftSail: null,  lengthFt: 65,  capacity: null,      location: null, pier: null, neighborhood: null, dates: [] },
  { country: 'Germany',            name: 'Walross 4',                sqftSail: null,  lengthFt: 55,  capacity: null,      location: null, pier: null, neighborhood: null, dates: [] },
]

// Derived filters
export const LOCATIONS = [...new Set(SHIPS.map(s => s.location).filter(Boolean))].sort() as string[]
export const NEIGHBORHOODS = [...new Set(SHIPS.map(s => s.neighborhood).filter(Boolean))].sort() as string[]
export const ALL_DATES = [...new Set(SHIPS.flatMap(s => s.dates))].sort()
