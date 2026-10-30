/* ============================================================================
   FOOTBALL MANAGER 26 - COMPLETE WORLD DATABASE, MULTI-COMPETITION VIEWER,
   EXACT GRAPHICS UI, LIVE MATCH ENGINE & BUILT-IN EDITOR
   ============================================================================ */
const SAVE_KEY = "FM26_WORLD_SAVE_V2";
const SLOTS_KEY = "FM26_WORLD_SLOTS_V2";

/* REAL WORLD LEAGUES & EXACT REAL CLUB COUNTS ACROSS 8 NATIONS */
const WORLD_LEAGUE_DATA = [
  {
    id: "eng_1", name: "English Premier Division", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", tier: 1, promo: 0, rel: 3,
    clubs: [
      ["Manchester Blue", "MCI", "#38bdf8", "#ffffff", "stripes", "Etihad Arena", 53400, 120000000, 94, "The Citizens", 1880, 10, 1, 8],
      ["Liverpool Red", "LIV", "#dc2626", "#ffffff", "solid", "Anfield Ground", 61276, 95000000, 92, "The Reds", 1892, 19, 6, 8],
      ["Manchester Red", "MUN", "#ef4444", "#ffffff", "solid", "Red Arena", 74300, 105000000, 90, "The Reds", 1878, 20, 3, 12],
      ["Arsenal Red", "ARS", "#ef4444", "#f8fafc", "sleeves", "Emirates Stadium", 60704, 98000000, 91, "The Gunners", 1886, 13, 0, 14],
      ["Chelsea Blue", "CHE", "#1d4ed8", "#ffffff", "solid", "Stamford Bridge", 40341, 110000000, 88, "The Blues", 1905, 6, 2, 8],
      ["Tottenham Hotspur", "TOT", "#f8fafc", "#1e293b", "solid", "Hotspur Stadium", 62850, 82000000, 86, "Spurs", 1882, 2, 0, 8],
      ["Aston Claret", "AVL", "#7c2d12", "#38bdf8", "sleeves", "Villa Park", 42657, 72000000, 85, "The Villans", 1874, 7, 1, 7],
      ["Newcastle White & Black", "NEW", "#111827", "#f8fafc", "stripes", "St James' Park", 52305, 88000000, 86, "The Magpies", 1892, 4, 0, 6],
      ["West Ham Claret", "WHU", "#7f1d1d", "#38bdf8", "sleeves", "London Stadium", 62500, 58000000, 81, "The Hammers", 1895, 0, 0, 3],
      ["Brighton Seagulls", "BHA", "#0284c7", "#ffffff", "stripes", "Amex Stadium", 31876, 54000000, 81, "The Seagulls", 1901, 0, 0, 0],
      ["Crystal Palace", "CRY", "#1d4ed8", "#dc2626", "stripes", "Selhurst Park", 25486, 45000000, 78, "The Eagles", 1905, 0, 0, 0],
      ["Brentford Bees", "BRE", "#dc2626", "#ffffff", "stripes", "Gtech Stadium", 17250, 42000000, 78, "The Bees", 1889, 0, 0, 0],
      ["Fulham Whites", "FUL", "#f8fafc", "#111827", "solid", "Craven Cottage", 25700, 44000000, 78, "The Cottagers", 1879, 0, 0, 0],
      ["Wolverhampton Gold", "WOL", "#f59e0b", "#111827", "solid", "Molineux", 31750, 46000000, 78, "Wolves", 1877, 3, 0, 4],
      ["Everton Blue", "EVE", "#1e40af", "#ffffff", "solid", "Goodison Park", 39414, 38000000, 79, "The Toffees", 1878, 9, 0, 5],
      ["Bournemouth Cherries", "BOU", "#dc2626", "#111827", "stripes", "Vitality Stadium", 11307, 40000000, 77, "The Cherries", 1899, 0, 0, 0],
      ["Nottingham Forest", "NFO", "#dc2626", "#ffffff", "solid", "City Ground", 30445, 48000000, 79, "The Tricky Trees", 1865, 1, 2, 2],
      ["Leicester Blue", "LEI", "#1d4ed8", "#facc15", "solid", "King Power", 32261, 36000000, 77, "The Foxes", 1884, 1, 0, 1],
      ["Ipswich Town", "IPS", "#2563eb", "#ffffff", "solid", "Portman Road", 30014, 32000000, 75, "Tractor Boys", 1878, 1, 0, 1],
      ["Southampton Saints", "SOU", "#dc2626", "#ffffff", "stripes", "St Mary's", 32384, 34000000, 76, "The Saints", 1885, 0, 0, 1]
    ]
  },
  {
    id: "eng_2", name: "English Championship (24 Clubs)", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", tier: 2, promo: 3, rel: 3,
    clubs: [
      ["Leeds Whites", "LEE", "#f8fafc", "#facc15", "solid", "Elland Road", 37608, 30000000, 76, "The Whites", 1919, 3, 0, 1],
      ["Burnley Clarets", "BUR", "#7f1d1d", "#38bdf8", "sleeves", "Turf Moor", 21944, 26000000, 75, "The Clarets", 1882, 2, 0, 1],
      ["Sheffield Blades", "SHU", "#dc2626", "#ffffff", "stripes", "Bramall Lane", 32050, 24000000, 74, "The Blades", 1889, 1, 0, 4],
      ["Sunderland Black Cats", "SUN", "#dc2626", "#ffffff", "stripes", "Stadium of Light", 49000, 22000000, 74, "Black Cats", 1879, 6, 0, 2],
      ["West Bromwich", "WBA", "#1e3a8a", "#ffffff", "stripes", "The Hawthorns", 26850, 20000000, 73, "The Baggies", 1878, 1, 0, 5],
      ["Norwich Canaries", "NOR", "#facc15", "#16a34a", "solid", "Carrow Road", 27359, 21000000, 73, "The Canaries", 1902, 0, 0, 0],
      ["Middlesbrough Red", "MID", "#dc2626", "#ffffff", "hoops", "Riverside", 34742, 19000000, 73, "Boro", 1876, 0, 0, 0],
      ["Coventry Sky Blues", "COV", "#38bdf8", "#ffffff", "stripes", "CBS Arena", 32609, 18000000, 72, "Sky Blues", 1883, 0, 0, 1],
      ["Luton Hatters", "LUT", "#f97316", "#1e293b", "solid", "Kenilworth Road", 11800, 22000000, 73, "The Hatters", 1885, 0, 0, 0],
      ["Watford Hornets", "WAT", "#facc15", "#111827", "stripes", "Vicarage Road", 22200, 18000000, 72, "The Hornets", 1881, 0, 0, 0],
      ["Hull Tigers", "HUL", "#f59e0b", "#111827", "stripes", "MKM Stadium", 25586, 17000000, 71, "The Tigers", 1904, 0, 0, 0],
      ["Stoke Potters", "STK", "#dc2626", "#ffffff", "stripes", "bet365 Stadium", 30089, 17000000, 71, "The Potters", 1863, 0, 0, 0],
      ["Swansea Swans", "SWA", "#f8fafc", "#111827", "solid", "Swansea.com", 21088, 15000000, 70, "The Swans", 1912, 0, 0, 0],
      ["Blackburn Rovers", "ROV", "#2563eb", "#ffffff", "halves", "Ewood Park", 31367, 15000000, 71, "Rovers", 1875, 3, 0, 6],
      ["Bristol Robins", "BRC", "#dc2626", "#ffffff", "solid", "Ashton Gate", 27000, 15000000, 70, "The Robins", 1894, 0, 0, 0],
      ["Cardiff Bluebirds", "CAR", "#1d4ed8", "#ffffff", "solid", "Cardiff City", 33280, 15000000, 70, "Bluebirds", 1899, 0, 0, 1],
      ["Millwall Lions", "MIL", "#1e3a8a", "#ffffff", "solid", "The Den", 20146, 14000000, 69, "The Lions", 1885, 0, 0, 0],
      ["Preston North End", "PNE", "#f8fafc", "#1e3a8a", "solid", "Deepdale", 23404, 14000000, 69, "Lilywhites", 1880, 2, 0, 2],
      ["QPR Hoops", "QPR", "#2563eb", "#ffffff", "hoops", "Loftus Road", 18439, 14000000, 69, "The R's", 1882, 0, 0, 0],
      ["Sheffield Wednesday", "SHW", "#2563eb", "#ffffff", "stripes", "Hillsborough", 39732, 15000000, 70, "The Owls", 1867, 4, 0, 3],
      ["Plymouth Argyle", "PLY", "#15803d", "#ffffff", "solid", "Home Park", 17900, 12000000, 68, "The Pilgrims", 1886, 0, 0, 0],
      ["Derby Rams", "DER", "#f8fafc", "#111827", "solid", "Pride Park", 32956, 15000000, 70, "The Rams", 1884, 2, 0, 1],
      ["Portsmouth Pompey", "POR", "#1d4ed8", "#ffffff", "solid", "Fratton Park", 20899, 14000000, 69, "Pompey", 1898, 2, 0, 2],
      ["Oxford United", "OXF", "#facc15", "#1e3a8a", "solid", "Kassam Stadium", 12500, 11000000, 67, "The U's", 1893, 0, 0, 0]
    ]
  },
  {
    id: "esp_1", name: "Spanish La Liga (20 Clubs)", country: "Spain", flag: "🇪🇸", tier: 1, promo: 0, rel: 3,
    clubs: [
      ["Real Madrid", "RMA", "#f8fafc", "#facc15", "solid", "Santiago Bernabeu", 83186, 140000000, 96, "Los Blancos", 1902, 36, 15, 20],
      ["FC Barcelona", "BAR", "#1d4ed8", "#dc2626", "stripes", "Camp Nou", 99354, 110000000, 93, "Blaugrana", 1899, 27, 5, 31],
      ["Atletico Madrid", "ATM", "#dc2626", "#ffffff", "stripes", "Metropolitano", 70460, 88000000, 89, "Colchoneros", 1903, 11, 0, 10],
      ["Athletic Bilbao", "ATH", "#dc2626", "#ffffff", "stripes", "San Mames", 53289, 60000000, 84, "Los Leones", 1898, 8, 0, 24],
      ["Real Sociedad", "RSO", "#2563eb", "#ffffff", "stripes", "Anoeta", 39500, 58000000, 84, "Txuri-urdin", 1909, 2, 0, 3],
      ["Real Betis", "BET", "#16a34a", "#ffffff", "stripes", "Benito Villamarin", 60721, 50000000, 82, "Los Verdiblancos", 1907, 1, 0, 3],
      ["Villarreal Yellow", "VIL", "#facc15", "#1e3a8a", "solid", "La Ceramica", 23008, 52000000, 83, "Yellow Submarine", 1923, 0, 0, 0],
      ["Valencia Bats", "VAL", "#f8fafc", "#111827", "solid", "Mestalla", 49430, 40000000, 80, "Los Che", 1919, 6, 0, 8],
      ["Sevilla Nervion", "SEV", "#f8fafc", "#dc2626", "solid", "Ramon Sanchez", 43883, 45000000, 81, "Sevillistas", 1890, 1, 0, 5],
      ["Girona Red-White", "GIR", "#dc2626", "#ffffff", "stripes", "Montilivi", 14624, 48000000, 82, "Blanquivermells", 1930, 0, 0, 0],
      ["Celta Vigo", "CEL", "#38bdf8", "#ffffff", "solid", "Balaidos", 29000, 35000000, 78, "Os Celestes", 1923, 0, 0, 0],
      ["CA Osasuna", "OSA", "#dc2626", "#1e3a8a", "solid", "El Sadar", 23576, 32000000, 78, "Los Rojillos", 1920, 0, 0, 0],
      ["RCD Mallorca", "MLL", "#dc2626", "#111827", "solid", "Son Moix", 23142, 30000000, 77, "Los Bermellones", 1916, 0, 0, 1],
      ["Rayo Vallecano", "RAY", "#f8fafc", "#dc2626", "sash", "Vallecas", 14708, 28000000, 76, "Los Franjirrojos", 1924, 0, 0, 0],
      ["Getafe Blue", "GET", "#1d4ed8", "#ffffff", "solid", "Coliseum", 16500, 30000000, 77, "Azulones", 1983, 0, 0, 0],
      ["Deportivo Alaves", "ALA", "#2563eb", "#ffffff", "stripes", "Mendizorrotza", 19840, 26000000, 75, "Babazorros", 1921, 0, 0, 0],
      ["UD Las Palmas", "LPA", "#facc15", "#2563eb", "solid", "Gran Canaria", 32400, 26000000, 75, "Pio-Pio", 1949, 0, 0, 0],
      ["CD Leganes", "LEG", "#2563eb", "#ffffff", "stripes", "Butarque", 12454, 24000000, 74, "Pepineros", 1928, 0, 0, 0],
      ["RCD Espanyol", "ESP", "#2563eb", "#ffffff", "stripes", "RCDE Stadium", 40000, 28000000, 76, "Periquitos", 1900, 0, 0, 4],
      ["Real Valladolid", "VLD", "#7e22ce", "#ffffff", "stripes", "Jose Zorrilla", 27618, 25000000, 74, "Pucela", 1928, 0, 0, 0]
    ]
  },
  {
    id: "ita_1", name: "Italian Serie A (20 Clubs)", country: "Italy", flag: "🇮🇹", tier: 1, promo: 0, rel: 3,
    clubs: [
      ["Inter Milano", "INT", "#1d4ed8", "#111827", "stripes", "San Siro", 75817, 100000000, 92, "Nerazzurri", 1908, 20, 3, 9],
      ["AC Milan", "MIL", "#dc2626", "#111827", "stripes", "San Siro", 75817, 92000000, 90, "Rossoneri", 1899, 19, 7, 5],
      ["Juventus Torino", "JUV", "#111827", "#ffffff", "stripes", "Allianz Stadium", 41507, 96000000, 90, "Bianconeri", 1897, 36, 2, 15],
      ["Napoli Azure", "NAP", "#38bdf8", "#ffffff", "solid", "Diego Maradona", 54726, 84000000, 88, "Partenopei", 1926, 3, 0, 6],
      ["Atalanta Bergamo", "ATA", "#1d4ed8", "#111827", "stripes", "Gewiss Stadium", 24950, 70000000, 86, "La Dea", 1907, 0, 0, 1],
      ["AS Roma", "ROM", "#991b1b", "#f59e0b", "solid", "Stadio Olimpico", 70634, 68000000, 85, "Giallorossi", 1927, 3, 0, 9],
      ["SS Lazio", "LAZ", "#38bdf8", "#ffffff", "solid", "Stadio Olimpico", 70634, 62000000, 84, "Biancocelesti", 1900, 2, 0, 7],
      ["Fiorentina Viola", "FIO", "#7e22ce", "#ffffff", "solid", "Artemio Franchi", 43147, 55000000, 83, "La Viola", 1926, 2, 0, 6],
      ["Bologna Rossoblu", "BOL", "#991b1b", "#1e3a8a", "stripes", "Renato Dall'Ara", 36462, 50000000, 82, "Rossoblu", 1909, 7, 0, 2],
      ["Torino Granata", "TOR", "#7f1d1d", "#ffffff", "solid", "Olimpico Torino", 27958, 42000000, 79, "Il Toro", 1906, 7, 0, 5],
      ["Udinese Friuli", "UDI", "#111827", "#ffffff", "stripes", "Bluenergy", 25144, 35000000, 77, "Zebrette", 1896, 0, 0, 0],
      ["Genoa Grifone", "GEN", "#991b1b", "#1e3a8a", "halves", "Luigi Ferraris", 36599, 34000000, 77, "Il Grifone", 1893, 9, 0, 1],
      ["Hellas Verona", "VER", "#1e3a8a", "#facc15", "solid", "Marcantonio", 31045, 28000000, 75, "Gialloblu", 1903, 1, 0, 0],
      ["Como Lariani", "COM", "#2563eb", "#ffffff", "solid", "Giuseppe Sinigaglia", 13602, 45000000, 76, "I Lariani", 1907, 0, 0, 0],
      ["Empoli Azzurri", "EMP", "#2563eb", "#ffffff", "solid", "Carlo Castellani", 16284, 26000000, 74, "Azzurri", 1920, 0, 0, 0],
      ["Cagliari Sardinia", "CAG", "#991b1b", "#1e3a8a", "halves", "Unipol Domus", 16416, 28000000, 75, "Isolani", 1920, 1, 0, 0],
      ["Parma Ducali", "PAR", "#facc15", "#1e3a8a", "hoops", "Ennio Tardini", 22352, 32000000, 75, "I Crociati", 1913, 0, 0, 3],
      ["US Lecce", "LEC", "#facc15", "#dc2626", "stripes", "Via del Mare", 31533, 25000000, 74, "Salentini", 1908, 0, 0, 0],
      ["Venezia Lagunari", "VEN", "#f97316", "#15803d", "stripes", "Pier Luigi Penzo", 11150, 24000000, 73, "Arancioneroverdi", 1907, 0, 0, 1],
      ["AC Monza", "MON", "#dc2626", "#ffffff", "solid", "U-Power Stadium", 16917, 30000000, 75, "Brianzoli", 1912, 0, 0, 0]
    ]
  },
  {
    id: "ger_1", name: "German Bundesliga (18 Clubs)", country: "Germany", flag: "🇩🇪", tier: 1, promo: 0, rel: 2,
    clubs: [
      ["Bayern Munchen", "BAY", "#dc2626", "#ffffff", "solid", "Allianz Arena", 75024, 130000000, 94, "Der FCB", 1900, 33, 6, 20],
      ["Bayer Leverkusen", "LEV", "#dc2626", "#111827", "stripes", "BayArena", 30210, 95000000, 91, "Werkself", 1904, 1, 0, 2],
      ["Borussia Dortmund", "BVB", "#facc15", "#111827", "solid", "Signal Iduna Park", 81365, 92000000, 90, "Die Borussen", 1909, 8, 1, 5],
      ["RB Leipzig", "RBL", "#f8fafc", "#dc2626", "solid", "Red Bull Arena", 47069, 85000000, 87, "Die Roten Bullen", 2009, 0, 0, 2],
      ["VfB Stuttgart", "STU", "#f8fafc", "#dc2626", "hoops", "MHPArena", 60058, 62000000, 84, "Die Schwaben", 1893, 5, 0, 3],
      ["Eintracht Frankfurt", "SGE", "#dc2626", "#111827", "stripes", "Deutsche Bank Park", 58000, 58000000, 83, "Die Adler", 1899, 1, 0, 5],
      ["TSG Hoffenheim", "TSG", "#2563eb", "#ffffff", "solid", "PreZero Arena", 30150, 44000000, 79, "Kraichgauer", 1899, 0, 0, 0],
      ["SC Freiburg", "SCF", "#dc2626", "#111827", "stripes", "Europa-Park", 34700, 46000000, 80, "Breisgau", 1904, 0, 0, 0],
      ["Heidenheim Red", "HDH", "#dc2626", "#2563eb", "solid", "Voith-Arena", 15000, 30000000, 76, "FCH", 1846, 0, 0, 0],
      ["Werder Bremen", "SVW", "#16a34a", "#ffffff", "solid", "Weserstadion", 42100, 38000000, 78, "Die Werderaner", 1899, 4, 0, 6],
      ["VfL Wolfsburg", "WOB", "#22c55e", "#ffffff", "solid", "Volkswagen Arena", 30000, 52000000, 80, "Die Wolfe", 1945, 1, 0, 1],
      ["FC Augsburg", "FCA", "#f8fafc", "#16a34a", "solid", "WWK Arena", 30660, 34000000, 76, "Fuggerstadter", 1907, 0, 0, 0],
      ["Borussia M'gladbach", "BMG", "#f8fafc", "#111827", "solid", "Borussia-Park", 54042, 42000000, 79, "Die Fohlen", 1900, 5, 0, 3],
      ["Mainz Carnival", "M05", "#dc2626", "#ffffff", "solid", "Mewa Arena", 33305, 34000000, 77, "Nullfunfer", 1905, 0, 0, 0],
      ["Union Berlin", "FCU", "#dc2626", "#ffffff", "solid", "Alte Forsterei", 22012, 36000000, 77, "Die Eisernen", 1966, 0, 0, 0],
      ["VfL Bochum", "BOC", "#2563eb", "#ffffff", "solid", "Vonovia Ruhrstadion", 26000, 26000000, 74, "Die Unabsteigbaren", 1848, 0, 0, 0],
      ["FC St. Pauli", "STP", "#7c2d12", "#ffffff", "solid", "Millerntor", 29546, 25000000, 74, "Kiezkicker", 1910, 0, 0, 0],
      ["Holstein Kiel", "KIE", "#2563eb", "#dc2626", "solid", "Holstein-Stadion", 15034, 22000000, 72, "Die Storche", 1900, 1, 0, 0]
    ]
  },
  {
    id: "fra_1", name: "French Ligue 1 (18 Clubs)", country: "France", flag: "🇫🇷", tier: 1, promo: 0, rel: 2,
    clubs: [
      ["Paris SG", "PSG", "#1e3a8a", "#dc2626", "stripes", "Parc des Princes", 47929, 135000000, 93, "Les Parisiens", 1970, 12, 0, 15],
      ["AS Monaco", "ASM", "#dc2626", "#ffffff", "sash", "Stade Louis II", 16360, 75000000, 85, "Les Monegasques", 1924, 8, 0, 5],
      ["Olympique Marseille", "OMA", "#f8fafc", "#38bdf8", "solid", "Stade Velodrome", 67394, 72000000, 85, "Les Phoceens", 1899, 9, 1, 10],
      ["Lille Dogues", "LIL", "#dc2626", "#1e3a8a", "solid", "Pierre-Mauroy", 50186, 60000000, 83, "Les Dogues", 1944, 4, 0, 6],
      ["OGC Nice", "NIC", "#dc2626", "#111827", "stripes", "Allianz Riviera", 36178, 55000000, 82, "Les Aiglons", 1904, 4, 0, 3],
      ["Olympique Lyon", "OLY", "#f8fafc", "#1d4ed8", "hoops", "Groupama Stadium", 59186, 58000000, 83, "Les Gones", 1950, 7, 0, 5],
      ["RC Lens", "RCL", "#facc15", "#dc2626", "stripes", "Bollaert-Delelis", 38223, 48000000, 81, "Sang et Or", 1906, 1, 0, 0],
      ["Stade Rennais", "REN", "#dc2626", "#111827", "stripes", "Roazhon Park", 29778, 52000000, 81, "Les Rouge et Noir", 1901, 0, 0, 3],
      ["Stade Brestois", "BRE", "#dc2626", "#ffffff", "solid", "Francis-Le Ble", 15220, 38000000, 79, "Les Pirates", 1950, 0, 0, 0],
      ["Toulouse Violets", "TFC", "#7e22ce", "#ffffff", "solid", "Stadium de Toulouse", 33150, 34000000, 77, "Les Violets", 1970, 0, 0, 1],
      ["Stade de Reims", "REI", "#dc2626", "#ffffff", "sleeves", "Auguste-Delaune", 21029, 34000000, 77, "Les Rouges", 1931, 6, 0, 2],
      ["Montpellier Herault", "MHS", "#1e3a8a", "#f97316", "stripes", "Stade de la Mosson", 32900, 30000000, 76, "La Paillade", 1974, 1, 0, 2],
      ["RC Strasbourg", "STR", "#2563eb", "#ffffff", "solid", "La Meinau", 26109, 38000000, 77, "Le Racing", 1906, 1, 0, 3],
      ["FC Nantes", "NAN", "#facc15", "#16a34a", "stripes", "La Beaujoire", 35322, 30000000, 76, "Les Canaris", 1943, 8, 0, 4],
      ["Le Havre AC", "HAC", "#38bdf8", "#1e3a8a", "halves", "Stade Oceane", 25178, 24000000, 74, "Club Doyen", 1894, 0, 0, 1],
      ["AJ Auxerre", "AJA", "#f8fafc", "#2563eb", "solid", "Abbe-Deschamps", 18541, 24000000, 74, "AJA", 1905, 1, 0, 4],
      ["Angers SCO", "ANG", "#111827", "#ffffff", "stripes", "Raymond-Kopa", 18752, 22000000, 73, "Les Scoistes", 1919, 0, 0, 0],
      ["AS Saint-Etienne", "STE", "#16a34a", "#ffffff", "solid", "Geoffroy-Guichard", 41965, 28000000, 75, "Les Verts", 1919, 10, 0, 6]
    ]
  },
  {
    id: "alg_1", name: "Algerian Ligue 1 (16 Clubs)", country: "Algeria", flag: "🇩🇿", tier: 1, promo: 0, rel: 2,
    clubs: [
      ["MC Alger", "MCA", "#16a34a", "#dc2626", "stripes", "Stade Ali La Pointe", 40000, 18000000, 78, "Le Doyen", 1921, 8, 1, 8],
      ["CR Belouizdad", "CRB", "#dc2626", "#ffffff", "sash", "Stade 5 Juillet", 64000, 17500000, 78, "Chabab", 1962, 10, 0, 9],
      ["USM Alger", "USM", "#dc2626", "#111827", "stripes", "Stade Omar Hamadi", 17000, 16500000, 77, "El Ittihad", 1937, 8, 1, 8],
      ["JS Kabylie", "JSK", "#facc15", "#16a34a", "solid", "Hocine Ait Ahmed", 50766, 15500000, 77, "Les Canaris", 1946, 14, 2, 5],
      ["ES Setif", "ESS", "#111827", "#ffffff", "stripes", "Stade 8 Mai 1945", 25000, 14000000, 76, "L'Aigle Noir", 1958, 8, 2, 8],
      ["CS Constantine", "CSC", "#16a34a", "#111827", "stripes", "Chahid Hamlaoui", 22986, 14000000, 75, "Les Sanafir", 1898, 2, 0, 0],
      ["MC Oran", "MCO", "#dc2626", "#ffffff", "solid", "Miloud Hadefi (Oran)", 40143, 14500000, 75, "El Hamri", 1946, 4, 0, 4],
      ["Paradou AC", "PAC", "#facc15", "#2563eb", "solid", "Stade Dar El Beida", 8000, 12000000, 74, "L'Academie", 1994, 0, 0, 0],
      ["ASO Chlef", "ASO", "#dc2626", "#ffffff", "stripes", "Mohamed Boumezrag", 18000, 10500000, 73, "Ittihad Chlef", 1947, 1, 0, 2],
      ["JS Saoura", "JSS", "#facc15", "#16a34a", "stripes", "Stade 20 Aout 1955", 20000, 11000000, 73, "Les Aigles du Sud", 2008, 0, 0, 0],
      ["MC El Bayadh", "MCE", "#2563eb", "#ffffff", "solid", "Zakaria Medjdoub", 15000, 9000000, 71, "El Mouloudia", 1936, 0, 0, 0],
      ["USM Khenchela", "USMK", "#111827", "#ffffff", "stripes", "Hamam Ammar", 8000, 9500000, 71, "Ciskaoua", 1943, 0, 0, 0],
      ["NC Magra", "NCM", "#2563eb", "#ffffff", "solid", "Boucheligue Brothers", 8000, 8500000, 70, "Nedjm", 1998, 0, 0, 0],
      ["US Biskra", "USB", "#16a34a", "#ffffff", "stripes", "Stade 18 Fevrier", 24000, 9000000, 70, "El Khadra", 1934, 0, 0, 0],
      ["Olympique Akbou", "OA", "#2563eb", "#ffffff", "solid", "Stade Opow Bejaia", 18000, 9500000, 71, "Lions de la Soummam", 1936, 0, 0, 0],
      ["ES Mostaganem", "ESM", "#16a34a", "#ffffff", "solid", "Mohamed Bensaïd", 18000, 9500000, 71, "Espérance", 1940, 0, 0, 0]
    ]
  },
  {
    id: "bra_1", name: "Brazil Brasileirão Série A (20 Clubs)", country: "Brazil", flag: "🇧🇷", tier: 1, promo: 0, rel: 4,
    clubs: [
      ["Flamengo Rio", "FLA", "#dc2626", "#111827", "hoops", "Maracana", 78838, 65000000, 85, "Mengao", 1895, 8, 3, 4],
      ["Palmeiras Verdao", "PAL", "#16a34a", "#ffffff", "solid", "Allianz Parque", 43713, 62000000, 85, "Verdao", 1914, 12, 3, 4],
      ["Boca Juniors (Invite)", "BOC", "#1e3a8a", "#facc15", "hoops", "La Bombonera", 54000, 48000000, 83, "Xeneizes", 1905, 35, 6, 4],
      ["Botafogo Glorioso", "BOT", "#111827", "#ffffff", "stripes", "Nilton Santos", 44661, 52000000, 83, "Fogao", 1904, 2, 1, 0],
      ["Sao Paulo Tricolor", "SAO", "#f8fafc", "#dc2626", "hoops", "Morumbi", 66795, 45000000, 82, "Tricolor", 1930, 6, 3, 1],
      ["Atletico Mineiro", "CAM", "#111827", "#ffffff", "stripes", "Arena MRV", 46000, 46000000, 82, "Galo", 1908, 3, 1, 2],
      ["Corinthians Timao", "COR", "#f8fafc", "#111827", "solid", "Neo Quimica Arena", 49205, 48000000, 81, "Timao", 1910, 7, 1, 3],
      ["Fluminense Rio", "FLU", "#7f1d1d", "#16a34a", "stripes", "Maracana", 78838, 42000000, 81, "Fluzao", 1902, 4, 1, 1],
      ["Gremio Porto", "GRE", "#38bdf8", "#111827", "stripes", "Arena do Gremio", 55662, 40000000, 80, "Imortal", 1903, 2, 3, 5],
      ["Internacional Red", "INT", "#dc2626", "#ffffff", "solid", "Beira-Rio", 50128, 40000000, 80, "Colorado", 1909, 3, 2, 1],
      ["Cruzeiro Celeste", "CRU", "#2563eb", "#ffffff", "solid", "Mineirao", 61927, 38000000, 79, "Raposa", 1921, 4, 2, 6],
      ["Vasco da Gama", "VAS", "#111827", "#ffffff", "sash", "Sao Januario", 21880, 36000000, 79, "Gigante", 1898, 4, 1, 1],
      ["Bahia Tricolor", "BAH", "#2563eb", "#dc2626", "stripes", "Fonte Nova", 47907, 38000000, 78, "Esquadrao", 1931, 2, 0, 0],
      ["Fortaleza Leao", "FOR", "#2563eb", "#dc2626", "hoops", "Castelao", 63903, 32000000, 78, "Leao do Pici", 1918, 0, 0, 0],
      ["Athletico Paranaense", "CAP", "#dc2626", "#111827", "stripes", "Ligga Arena", 42372, 34000000, 78, "Furacao", 1924, 1, 0, 1],
      ["RB Bragantino", "RBB", "#f8fafc", "#dc2626", "solid", "Nabi Abi Chedid", 15010, 34000000, 77, "Massa Bruta", 1928, 0, 0, 0],
      ["Juventude Verde", "JUV", "#16a34a", "#ffffff", "stripes", "Alfredo Jaconi", 19924, 22000000, 74, "Papo", 1913, 0, 0, 1],
      ["Criciuma Tigre", "CRI", "#facc15", "#111827", "hoops", "Heriberto Hulse", 19225, 22000000, 74, "Tigre", 1947, 0, 0, 1],
      ["EC Vitoria", "VIT", "#dc2626", "#111827", "hoops", "Barradao", 30793, 22000000, 74, "Leao da Barra", 1899, 0, 0, 0],
      ["Cuiaba Dourado", "CUI", "#eab308", "#15803d", "solid", "Arena Pantanal", 44097, 22000000, 74, "Dourado", 2001, 0, 0, 0]
    ]
  }
];

/* FAMOUS REAL PLAYERS STARTER PACK (MATCHING SCREENSHOTS + WORLD STARS) */
const FAMOUS_PLAYERS_SEED = [
  // Manchester Red (Matching Screenshots)
  { name: "B. Fernandes", clubShort: "MUN", pos: "AMR", age: 29, ovr: 88, pot: 89, nat: "🇵🇹 Portugal", wage: 150000, value: 68000000, contract: 2028, form: "7.45" },
  { name: "C. Ronaldo", clubShort: "MUN", pos: "AML", age: 39, ovr: 89, pot: 89, nat: "🇵🇹 Portugal", wage: 200000, value: 45000000, contract: 2027, form: "8.10" },
  { name: "R. Lukaku", clubShort: "MUN", pos: "ST", age: 31, ovr: 85, pot: 85, nat: "🇧🇪 Belgium", wage: 140000, value: 42000000, contract: 2027, form: "6.90" },
  { name: "P. Pogba", clubShort: "MUN", pos: "MC", age: 31, ovr: 86, pot: 86, nat: "🇫🇷 France", wage: 130000, value: 48000000, contract: 2027, form: "7.12" },
  { name: "Casemiro", clubShort: "MUN", pos: "MC", age: 32, ovr: 84, pot: 84, nat: "🇧🇷 Brazil", wage: 110000, value: 32000000, contract: 2028, form: "6.85" },
  { name: "R. Varane", clubShort: "MUN", pos: "DC", age: 31, ovr: 85, pot: 85, nat: "🇫🇷 France", wage: 125000, value: 38000000, contract: 2027, form: "7.20" },
  { name: "D. Dalot", clubShort: "MUN", pos: "DR", age: 25, ovr: 81, pot: 85, nat: "🇵🇹 Portugal", wage: 95000, value: 40000000, contract: 2028, form: "6.95" },
  { name: "L. Shaw", clubShort: "MUN", pos: "DL", age: 28, ovr: 82, pot: 83, nat: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", wage: 100000, value: 35000000, contract: 2027, form: "7.05" },
  { name: "A. Onana", clubShort: "MUN", pos: "GK", age: 28, ovr: 83, pot: 85, nat: "🇨🇲 Cameroon", wage: 105000, value: 38000000, contract: 2028, form: "7.15" },
  { name: "K. Mainoo", clubShort: "MUN", pos: "MC", age: 19, ovr: 81, pot: 91, nat: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", wage: 65000, value: 55000000, contract: 2029, form: "7.30" },
  { name: "A. Garnacho", clubShort: "MUN", pos: "AML", age: 20, ovr: 82, pot: 90, nat: "🇦🇷 Argentina", wage: 75000, value: 60000000, contract: 2029, form: "7.28" },
  // Transfer Market Stars from Screenshot
  { name: "Saka", clubShort: "ARS", pos: "AMR", age: 22, ovr: 87, pot: 92, nat: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", wage: 200000, value: 85000000, contract: 2029, form: "7.85", status: "Listed" },
  { name: "Haaland", clubShort: "MCI", pos: "ST", age: 23, ovr: 91, pot: 95, nat: "🇳🇴 Norway", wage: 350000, value: 150000000, contract: 2029, form: "8.35", status: "Unhappy" },
  { name: "Leao", clubShort: "MIL", pos: "AML", age: 24, ovr: 86, pot: 90, nat: "🇵🇹 Portugal", wage: 180000, value: 75500000, contract: 2028, form: "7.60", status: "Listed" },
  { name: "Bellingham", clubShort: "RMA", pos: "MC", age: 20, ovr: 88, pot: 94, nat: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", wage: 220000, value: 110000000, contract: 2030, form: "8.15", status: "Observed" },
  { name: "Pedri", clubShort: "BAR", pos: "MC", age: 21, ovr: 85, pot: 92, nat: "🇪🇸 Spain", wage: 140000, value: 68000000, contract: 2029, form: "7.55", status: "Listed" },
  { name: "Gvardiol", clubShort: "MCI", pos: "DC", age: 22, ovr: 84, pot: 90, nat: "🇭🇷 Croatia", wage: 125000, value: 62000000, contract: 2029, form: "7.40", status: "-" },
  { name: "James", clubShort: "CHE", pos: "DR", age: 24, ovr: 83, pot: 87, nat: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", wage: 150000, value: 55000000, contract: 2028, form: "7.22", status: "Listed" },
  { name: "Davies", clubShort: "BAY", pos: "DL", age: 23, ovr: 84, pot: 89, nat: "🇨🇦 Canada", wage: 130000, value: 58000000, contract: 2027, form: "7.48", status: "Listed" },
  { name: "Maignan", clubShort: "MIL", pos: "GK", age: 28, ovr: 85, pot: 87, nat: "🇫🇷 France", wage: 110000, value: 45000000, contract: 2028, form: "7.50", status: "-" },
  { name: "K. Mbappe", clubShort: "RMA", pos: "ST", age: 25, ovr: 92, pot: 95, nat: "🇫🇷 France", wage: 340000, value: 160000000, contract: 2029, form: "8.40", status: "Observed" },
  { name: "L. Yamal", clubShort: "BAR", pos: "AMR", age: 17, ovr: 86, pot: 96, nat: "🇪🇸 Spain", wage: 120000, value: 120000000, contract: 2030, form: "8.05", status: "Observed" },
  { name: "M. Salah", clubShort: "LIV", pos: "AMR", age: 31, ovr: 89, pot: 89, nat: "🇪🇬 Egypt", wage: 260000, value: 65000000, contract: 2027, form: "7.95", status: "Listed" },
  { name: "R. Mahrez", clubShort: "MCA", pos: "AMR", age: 33, ovr: 85, pot: 85, nat: "🇩🇿 Algeria", wage: 95000, value: 28000000, contract: 2027, form: "7.90", status: "Listed" },
  { name: "I. Bennacer", clubShort: "MIL", pos: "MC", age: 26, ovr: 83, pot: 86, nat: "🇩🇿 Algeria", wage: 105000, value: 42000000, contract: 2028, form: "7.45", status: "Listed" },
  { name: "A. Gouiri", clubShort: "REN", pos: "ST", age: 24, ovr: 81, pot: 85, nat: "🇩🇿 Algeria", wage: 78000, value: 34000000, contract: 2028, form: "7.35", status: "Listed" }
];

const FIRST_NAMES = ["Lucas", "Mateo", "Leo", "Hugo", "Karim", "Riyad", "Amine", "Yacine", "Jude", "Cole", "Declan", "Marco", "Alessandro", "Florian", "Jamal", "Ousmane", "Warren", "Gabriel", "Endrick", "Julian"];
const LAST_NAMES = ["Silva", "Santos", "Fernandez", "Gomez", "Bennacer", "Brahimi", "Zorgane", "Amoura", "Palmer", "Watkins", "Barella", "Bastoni", "Wirtz", "Musiala", "Camavinga", "Saliba", "Martinelli", "Alvarez", "Romero", "Martinez"];

let state = null;
let navStack = [];
let currentTab = "dashboard"; // dashboard, inbox, squad, schedule, club, menu, editor
let currentSub = "overview";
let viewedCompetitionId = "eng_1"; // Lets user inspect ANY league or cup in the world!
let activeNegotiationPlayerId = null;
let activeContractPlayerId = null;
let selectedSwapPlayerId = null;
let marketFilterPos = "ALL";
let searchQuery = "";
let liveMatchObj = null;
let liveMatchInterval = null;

function uid(p = "id") {
  return p + "_" + Math.random().toString(36).substring(2, 9);
}
function rInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ============================================================================
   STRICTLY 2D FLAT VECTOR CRESTS & 2D FLAT KITS (NO SHADOWS, NO 3D)
   ============================================================================ */
function render2DCrest(club, size = 34) {
  if (!club) return "";
  if (club.customLogo) {
    return `<img class="flat-2d" src="${club.customLogo}" style="width:${size}px;height:${size}px;object-fit:contain;" />`;
  }
  const c1 = club.c1 || "#ef4444";
  const c2 = club.c2 || "#ffffff";
  const short = (club.short || "FC").substring(0, 3);
  return `<svg class="flat-2d" width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M12,10 L88,10 L88,56 C88,76 50,92 50,92 C50,92 12,76 12,56 Z" fill="${c1}" stroke="#e2e8f0" stroke-width="5"/>
    <path d="M26,16 L74,16 L74,54 C74,68 50,80 50,80 C50,80 26,68 26,54 Z" fill="none" stroke="${c2}" stroke-width="3"/>
    <circle cx="50" cy="48" r="18" fill="${c2}"/>
    <text x="50" y="53" text-anchor="middle" fill="${c1 === '#f8fafc' || c1 === '#facc15' ? '#0f172a' : c1}" font-size="13" font-weight="900" font-family="sans-serif">${short}</text>
  </svg>`;
}

function render2DKit(c1, c2, number = "", size = 36) {
  return `<svg class="flat-2d" width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,14 L10,32 L22,46 L30,38 L30,88 L70,88 L70,38 L78,46 L90,32 L70,14 L60,14 C56,22 44,22 40,14 Z" fill="${c1}" stroke="${c2}" stroke-width="4"/>
    ${number ? `<text x="50" y="60" text-anchor="middle" fill="${c2}" font-size="24" font-weight="900" font-family="sans-serif">${number}</text>` : `<circle cx="60" cy="36" r="5" fill="${c2}"/>`}
  </svg>`;
}

/* ============================================================================
   BUILD FULL WORLD DATABASE (156 REAL-SIZE CLUBS ACROSS 8 LEAGUES + CUPS)
   ============================================================================ */
function generatePlayerForClub(clubId, pos, rep, natFlag) {
  const fn = pick(FIRST_NAMES);
  const ln = pick(LAST_NAMES);
  const age = rInt(18, 34);
  const ovr = Math.min(93, Math.max(58, rep + rInt(-7, 5)));
  const pot = Math.min(96, Math.max(ovr, ovr + (age < 24 ? rInt(3, 11) : rInt(0, 2))));
  const value = Math.round(Math.pow(Math.max(1, ovr - 48), 2.38) * 1150 / 100000) * 100000;
  return {
    id: uid("p"),
    name: `${fn[0]}. ${ln}`,
    clubId,
    pos,
    age,
    ovr,
    pot,
    nat: natFlag || "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",
    wage: Math.max(5000, Math.round(value / 380)),
    value,
    contract: rInt(2026, 2030),
    form: (6.5 + Math.random() * 1.6).toFixed(2),
    fit: rInt(82, 100),
    morale: rInt(75, 98),
    status: Math.random() < 0.25 ? "Listed" : "-",
    goals: 0,
    assists: 0
  };
}

function generateLeagueFixtures(clubIds, compId) {
  const list = [...clubIds];
  if (list.length % 2 !== 0) list.push("BYE");
  const n = list.length;
  const totalRounds = (n - 1) * 2;
  const fixtures = [];
  const dates = ["12 OCT", "19 OCT", "26 OCT", "02 NOV", "09 NOV", "16 NOV", "23 NOV", "30 NOV", "07 DEC", "14 DEC"];
  for (let r = 0; r < totalRounds; r++) {
    const secondHalf = r >= (n - 1);
    for (let i = 0; i < n / 2; i++) {
      const h = secondHalf ? list[n - 1 - i] : list[i];
      const a = secondHalf ? list[i] : list[n - 1 - i];
      if (h !== "BYE" && a !== "BYE") {
        fixtures.push({
          id: uid("fx"),
          compId,
          week: r + 1,
          dateStr: dates[r % dates.length],
          homeId: h,
          awayId: a,
          played: false,
          hg: 0,
          ag: 0
        });
      }
    }
    list.splice(1, 0, list.pop());
  }
  return fixtures;
}

function createInitialWorldState() {
  const leagues = [];
  const clubs = [];
  const players = [];
  let fixtures = [];

  const rosterPositions = ["GK", "GK", "DR", "DL", "DC", "DC", "DC", "MC", "MC", "MC", "MC", "AMR", "AMR", "AML", "AML", "ST", "ST", "ST"];

  WORLD_LEAGUE_DATA.forEach(lg => {
    leagues.push({
      id: lg.id,
      name: lg.name,
      country: lg.country,
      flag: lg.flag,
      tier: lg.tier,
      promo: lg.promo,
      rel: lg.rel,
      type: "league"
    });

    const lgClubIds = [];
    lg.clubs.forEach((c) => {
      const clubId = `club_${c[1]}_${lg.id}`;
      lgClubIds.push(clubId);

      // Seed famous real players for this club first
      const seeded = FAMOUS_PLAYERS_SEED.filter(fp => fp.clubShort === c[1] && lg.id !== "eng_2");
      const clubPlayerIds = [];

      seeded.forEach(fp => {
        const pid = uid("p");
        players.push({
          id: pid,
          name: fp.name,
          clubId,
          pos: fp.pos,
          age: fp.age,
          ovr: fp.ovr,
          pot: fp.pot,
          nat: fp.nat,
          wage: fp.wage,
          value: fp.value,
          contract: fp.contract,
          form: fp.form,
          fit: rInt(86, 100),
          morale: rInt(80, 96),
          status: fp.status || "Listed",
          goals: rInt(1, 9),
          assists: rInt(0, 6)
        });
        clubPlayerIds.push(pid);
      });

      // Fill remaining squad up to 22 players
      rosterPositions.forEach(pos => {
        if (clubPlayerIds.length < 22) {
          const p = generatePlayerForClub(clubId, pos, c[8], `${lg.flag} ${lg.country}`);
          players.push(p);
          clubPlayerIds.push(p.id);
        }
      });

      clubs.push({
        id: clubId,
        name: c[0],
        short: c[1],
        leagueId: lg.id,
        country: lg.country,
        c1: c[2],
        c2: c[3],
        pattern: c[4],
        stadium: c[5],
        capacity: c[6],
        budget: c[7],
        rep: c[8],
        nickname: c[9],
        founded: c[10],
        trophiesLeague: c[11],
        trophiesCont: c[12],
        trophiesCup: c[13],
        youthStars: c[8] >= 88 ? 4 : 3,
        trainingStars: c[8] >= 88 ? 4 : 3,
        formation: "4-3-3",
        mentality: "Attacking",
        lineup: clubPlayerIds.slice(0, 11),
        bench: clubPlayerIds.slice(11),
        stats: { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, form: [] }
      });
    });

    fixtures.push(...generateLeagueFixtures(lgClubIds, lg.id));
  });

  // Add Continental & Domestic Cup Competitions so user can view all competitions
  const cups = [
    { id: "ucl_cup", name: "UEFA Champions Cup", country: "Europe", flag: "🇪🇺", type: "cup" },
    { id: "caf_cup", name: "CAF African Champions Cup", country: "Africa", flag: "🌍", type: "cup" },
    { id: "lib_cup", name: "Copa Libertadores", country: "South America", flag: "🌎", type: "cup" },
    { id: "fa_cup", name: "English Domestic Cup", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", type: "cup" }
  ];

  const defaultUserClub = clubs.find(c => c.short === "MUN") || clubs[0];

  const initialState = {
    meta: { currency: "£", dbName: "FM26 Official World Database (8 Leagues, 156 Clubs)" },
    userClubId: defaultUserClub.id,
    week: 1,
    season: 2026,
    boardConfidence: 84,
    leagues,
    cups,
    clubs,
    players,
    fixtures,
    inbox: [
      { id: uid("m"), week: 1, type: "Scout", title: "Inbox: Scout report on transfer targets available", body: "Chief Scout has compiled a list of top world targets including Saka, Haaland, Bellingham, Leao, and Mahrez.", unread: true },
      { id: uid("m"), week: 1, type: "News", title: "News: Chairman demands title challenge this season", body: "The Board expects high standards across Domestic League and Champions Cup fixtures.", unread: false }
    ]
  };

  // Pre-simulate 10 matchdays so League Tables, Form Badges & Stats look rich immediately like the screenshots!
  for (let w = 1; w <= 10; w++) {
    simulateWeekFixtures(initialState, w);
  }
  initialState.week = 11;
  return initialState;
}

function simulateWeekFixtures(st, wk) {
  st.fixtures.filter(f => f.week === wk && !f.played).forEach(f => {
    const h = st.clubs.find(c => c.id === f.homeId);
    const a = st.clubs.find(c => c.id === f.awayId);
    if (!h || !a) return;
    f.played = true;
    const diff = (h.rep + 3 - a.rep) / 14;
    f.hg = Math.max(0, Math.round(rInt(0, 3) + (diff > 0 ? diff : 0)));
    f.ag = Math.max(0, Math.round(rInt(0, 2) + (diff < 0 ? -diff : 0)));
    recordResultInStandings(h, a, f.hg, f.ag);
  });
}

function recordResultInStandings(h, a, hg, ag) {
  h.stats.p++; a.stats.p++;
  h.stats.gf += hg; h.stats.ga += ag;
  a.stats.gf += ag; a.stats.ga += hg;
  if (hg > ag) {
    h.stats.w++; h.stats.pts += 3; h.stats.form.push("W");
    a.stats.l++; a.stats.form.push("L");
  } else if (hg < ag) {
    a.stats.w++; a.stats.pts += 3; a.stats.form.push("W");
    h.stats.l++; h.stats.form.push("L");
  } else {
    h.stats.d++; a.stats.d++; h.stats.pts += 1; a.stats.pts += 1;
    h.stats.form.push("D"); a.stats.form.push("D");
  }
}

function saveGame() {
  if (!state) return;
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) {}
}

function getUserClub() {
  return state.clubs.find(c => c.id === state.userClubId) || state.clubs[0];
}
function getClub(id) {
  return state.clubs.find(c => c.id === id) || { name: "Free Agent", short: "FA", c1: "#475569", c2: "#ffffff" };
}
function getClubPlayers(clubId) {
  return state.players.filter(p => p.clubId === clubId);
}
function fmtMoney(val) {
  const sym = (state && state.meta && state.meta.currency) || "£";
  if (Math.abs(val) >= 1000000) return `${sym}${(val / 1000000).toFixed(1)}M`;
  if (Math.abs(val) >= 1000) return `${sym}${Math.round(val / 1000)}K`;
  return `${sym}${val}`;
}

/* ============================================================================
   NAVIGATION & ROUTER
   ============================================================================ */
function navigate(tab, sub) {
  navStack.push({ tab: currentTab, sub: currentSub });
  currentTab = tab;
  currentSub = sub || getDefaultSub(tab);
  render();
}

function goBackScreen() {
  if (navStack.length > 0) {
    const prev = navStack.pop();
    currentTab = prev.tab;
    currentSub = prev.sub;
    render();
  } else {
    currentTab = "menu";
    currentSub = "main_menu";
    render();
  }
}

function getDefaultSub(tab) {
  const map = {
    menu: "main_menu",
    dashboard: "overview",
    inbox: "inbox",
    squad: "management",
    schedule: "fixtures",
    club: "club_overview",
    editor: "ed_home"
  };
  return map[tab] || "overview";
}

function render() {
  if (!state) {
    const raw = localStorage.getItem(SAVE_KEY);
    state = raw ? JSON.parse(raw) : createInitialWorldState();
  }

  const headerEl = document.getElementById("app-header");
  const topTabsEl = document.getElementById("top-tabs");
  const bottomNavEl = document.getElementById("bottom-nav");
  const viewEl = document.getElementById("app-view");

  // Hide header/bottom-nav on full-screen Main Menu to match Screenshot 1
  if (currentTab === "menu" && currentSub === "main_menu") {
    headerEl.style.display = "none";
    topTabsEl.style.display = "none";
    bottomNavEl.style.display = "none";
    viewEl.style.paddingBottom = "16px";
    viewEl.innerHTML = renderMainMenuScreen();
    return;
  }

  headerEl.style.display = "flex";
  bottomNavEl.style.display = "flex";
  viewEl.style.paddingBottom = "86px";

  // Set Header Title & Top Tabs based on current screen
  const topTabsConfig = getTopTabsForCurrent();
  document.getElementById("hdr-title-text").textContent = topTabsConfig.title;
  if (topTabsConfig.tabs.length > 0) {
    topTabsEl.style.display = "flex";
    topTabsEl.innerHTML = topTabsConfig.tabs.map(t => `
      <div class="top-tab ${currentSub === t.id ? 'active' : ''}" onclick="currentSub='${t.id}';render();">${t.label}</div>
    `).join("");
  } else {
    topTabsEl.style.display = "none";
  }

  // Render 5-Tab Bottom Navigation Bar (Dashboard | Inbox | Squad | Schedule | Club)
  const bTabs = [
    { id: "dashboard", label: "Dashboard", icon: "⏱️" },
    { id: "inbox", label: "Inbox", icon: "✉️" },
    { id: "squad", label: "Squad", icon: "👥" },
    { id: "schedule", label: "Schedule", icon: "📅" },
    { id: "club", label: "Club", icon: "🛡️" }
  ];
  bottomNavEl.innerHTML = bTabs.map(b => `
    <div class="bnav-item ${currentTab === b.id ? 'active' : ''}" onclick="navigate('${b.id}')">
      <span class="bnav-icon">${b.icon}</span>
      <span>${b.label}</span>
    </div>
  `).join("");

  // Render Screen Body
  switch (currentSub) {
    case "new_game": viewEl.innerHTML = renderNewGameScreen(); break;
    case "load_game": viewEl.innerHTML = renderLoadGameScreen(); break;
    case "achievements": viewEl.innerHTML = renderAchievementsScreen(); break;
    case "overview": viewEl.innerHTML = renderDashboardScreen(); break;
    case "inbox": viewEl.innerHTML = renderInboxScreen(); break;
    case "management": viewEl.innerHTML = renderSquadManagementScreen(); break;
    case "roster": viewEl.innerHTML = renderSquadRosterScreen(); break;
    case "tactics": viewEl.innerHTML = renderTacticsScreen(); break;
    case "staff": viewEl.innerHTML = renderStaffTrainingScreen(); break;
    case "market": viewEl.innerHTML = renderTransferMarketScreen(); break;
    case "negotiations": viewEl.innerHTML = renderNegotiationsScreen(); break;
    case "contracts": viewEl.innerHTML = renderContractsScreen(); break;
    case "fixtures": viewEl.innerHTML = renderMatchesFixturesScreen(); break;
    case "results": viewEl.innerHTML = renderResultsScreen(); break;
    case "table": viewEl.innerHTML = renderLeagueTableScreen(); break;
    case "other_comps": viewEl.innerHTML = renderAllCompetitionsExplorer(); break;
    case "live_match": viewEl.innerHTML = renderLiveMatchScreen(); break;
    case "club_overview": viewEl.innerHTML = renderClubOverviewScreen(); break;
    case "ed_home": viewEl.innerHTML = renderEditorHomeScreen(); break;
    case "ed_clubs": viewEl.innerHTML = renderEditorClubsScreen(); break;
    case "ed_players": viewEl.innerHTML = renderEditorPlayersScreen(); break;
    default: viewEl.innerHTML = renderDashboardScreen();
  }
}

function getTopTabsForCurrent() {
  if (currentTab === "dashboard") return { title: "DASHBOARD", tabs: [] };
  if (currentTab === "inbox") {
    if (currentSub === "negotiations") return { title: "NEGOTIATIONS", tabs: [] };
    if (currentSub === "contracts") return { title: "CONTRACTS & RENEWALS", tabs: [] };
    return { title: "NEWS & INBOX", tabs: [
      { id: "inbox", label: "Inbox" },
      { id: "negotiations", label: "Negotiations" },
      { id: "contracts", label: "Contracts" }
    ]};
  }
  if (currentTab === "squad") {
    if (currentSub === "roster") return { title: "SQUAD ROSTER", tabs: [
      { id: "tactics", label: "Tactics" },
      { id: "management", label: "Squad" },
      { id: "roster", label: "Roster" },
      { id: "market", label: "Transfers" }
    ]};
    if (currentSub === "market") return { title: "TRANSFER MARKET", tabs: [
      { id: "tactics", label: "Tactics" },
      { id: "management", label: "Squad" },
      { id: "staff", label: "Staff" },
      { id: "market", label: "Transfers" }
    ]};
    return { title: "SQUAD MANAGEMENT", tabs: [
      { id: "tactics", label: "Tactics" },
      { id: "management", label: "Squad" },
      { id: "staff", label: "Staff" },
      { id: "market", label: "Transfers" }
    ]};
  }
  if (currentTab === "schedule") {
    const title = currentSub === "table" ? "LEAGUE TABLE" : currentSub === "other_comps" ? "WORLD COMPETITIONS" : "MATCHES & FIXTURES";
    return { title, tabs: [
      { id: "fixtures", label: "Schedule" },
      { id: "results", label: "Results" },
      { id: "table", label: "Table" },
      { id: "other_comps", label: "Competitions" }
    ]};
  }
  if (currentTab === "club") {
    return { title: "CLUB OVERVIEW", tabs: [
      { id: "club_overview", label: "Overview" },
      { id: "contracts", label: "Contracts" },
      { id: "ed_home", label: "Editor" }
    ]};
  }
  if (currentTab === "editor") {
    return { title: "DATABASE EDITOR", tabs: [
      { id: "ed_home", label: "DB Home" },
      { id: "ed_clubs", label: "Clubs (156)" },
      { id: "ed_players", label: "Players" }
    ]};
  }
  return { title: "FOOTBALL MANAGER", tabs: [] };
}

/* ============================================================================
   SCREEN 1: MAIN MENU (MATCHING UPLOADED IMAGE 1000158392_30f07c.jpg)
   ============================================================================ */
function renderMainMenuScreen() {
  return `
    <div style="min-height:94vh;display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:36px 12px 24px;text-align:center;">
      <!-- Metallic / Neon Cyan FOOTBALL MANAGER 2D Logo -->
      <div style="margin-top:20px;">
        <div style="display:inline-block;padding:12px 22px;border-radius:14px;background:rgba(10,18,34,0.92);border:2px solid #2dd4bf;">
          <div style="font-size:32px;font-weight:900;font-style:italic;letter-spacing:1.5px;background:linear-gradient(180deg,#67e8f9,#0284c7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
            FOOTBALL ⚽
          </div>
          <div style="font-size:30px;font-weight:900;font-style:italic;letter-spacing:2px;color:#f8fafc;margin-top:-6px;">
            MANAGER
          </div>
        </div>
        <div style="font-size:11px;color:var(--neon-cyan);margin-top:6px;font-weight:700;">2026 WORLD EDITION • 8 LEAGUES • 156 REAL-SIZE CLUBS</div>
      </div>

      <!-- 4 Neon Double-Border Buttons -->
      <div style="width:100%;max-width:360px;margin:20px 0;">
        <div class="menu-btn" onclick="navigate('dashboard','overview')">
          <span>Continue (${getUserClub().name})</span>
          <span style="color:#38bdf8;">▶</span>
        </div>
        <div class="menu-btn" onclick="navigate('menu','new_game')">
          <span>New Game</span>
          <span style="color:#38bdf8;">📢</span>
        </div>
        <div class="menu-btn green" onclick="navigate('menu','load_game')">
          <span>Load Game</span>
          <span style="color:#22c55e;">📁</span>
        </div>
        <div class="menu-btn teal" onclick="navigate('editor','ed_home')">
          <span>Editor</span>
          <span style="color:#2dd4bf;">⚙️</span>
        </div>
        <div class="menu-btn gold" onclick="navigate('menu','achievements')">
          <span>Achievement</span>
          <span style="color:#eab308;">🏆</span>
        </div>
      </div>

      <div style="font-size:11px;color:var(--text-muted);">Offline Mobile Port • All Competitions Unlocked</div>
    </div>
  `;
}

function renderNewGameScreen() {
  const selectedLg = state.leagues.find(l => l.id === viewedCompetitionId) || state.leagues[0];
  const clubsInLg = state.clubs.filter(c => c.leagueId === selectedLg.id);
  return `
    <div class="fm-card">
      <div class="fm-card-header">Select Nation & League (${state.leagues.length} Full Leagues)</div>
      <select onchange="viewedCompetitionId=this.value;render();">
        ${state.leagues.map(l => `<option value="${l.id}" ${l.id === selectedLg.id ? 'selected' : ''}>${l.flag} ${l.name} (${state.clubs.filter(c => c.leagueId === l.id).length} Clubs)</option>`).join("")}
      </select>
      <label style="font-size:12px;color:var(--text-muted);margin-bottom:4px;display:block;">Select Club to Manage</label>
      <select id="new-club-sel">
        ${clubsInLg.map(c => `<option value="${c.id}" ${c.id === state.userClubId ? 'selected' : ''}>${c.name} (Budget: ${fmtMoney(c.budget)} • Rep: ${c.rep})</option>`).join("")}
      </select>
      <div class="cta-btn" onclick="startNewClubCareer()"><span>START CAREER ⟫</span></div>
    </div>
  `;
}

function startNewClubCareer() {
  const cid = document.getElementById("new-club-sel").value;
  state.userClubId = cid;
  const club = getUserClub();
  viewedCompetitionId = club.leagueId;
  saveGame();
  navigate("dashboard", "overview");
}

function renderLoadGameScreen() {
  const raw = localStorage.getItem(SLOTS_KEY);
  const slots = raw ? JSON.parse(raw) : {};
  return `
    <div class="fm-card">
      <div class="fm-card-header">Save / Load Career Slots</div>
      ${[1, 2, 3].map(s => {
        const slot = slots["s" + s];
        return `<div class="fm-subbox row-between">
          <div>
            <div style="font-weight:800;">Slot ${s}: ${slot ? slot.clubName : 'Empty'}</div>
            <div style="font-size:11px;color:var(--text-muted);">${slot ? `Week ${slot.week} • ${slot.time}` : 'No save'}</div>
          </div>
          <div style="display:flex;gap:6px;">
            <button class="sm-btn" onclick="saveSlot(${s})">Save</button>
            ${slot ? `<button class="sm-btn sec" onclick="loadSlot(${s})">Load</button>` : ''}
          </div>
        </div>`;
      }).join("")}
    </div>
  `;
}

function saveSlot(s) {
  const raw = localStorage.getItem(SLOTS_KEY);
  const slots = raw ? JSON.parse(raw) : {};
  slots["s" + s] = { clubName: getUserClub().name, week: state.week, time: new Date().toLocaleTimeString(), data: state };
  localStorage.setItem(SLOTS_KEY, JSON.stringify(slots));
  render();
}

function loadSlot(s) {
  const raw = localStorage.getItem(SLOTS_KEY);
  const slots = raw ? JSON.parse(raw) : {};
  if (slots["s" + s]) {
    state = slots["s" + s].data;
    saveGame();
    navigate("dashboard", "overview");
  }
}

function renderAchievementsScreen() {
  const c = getUserClub();
  return `
    <div class="fm-card">
      <div class="fm-card-header">Manager Achievements & Hall of Fame</div>
      <div class="fm-subbox">🏆 <strong>Domestic Champion</strong> — Win any Top-Flight League (${c.trophiesLeague} Club Titles)</div>
      <div class="fm-subbox">🌍 <strong>Continental King</strong> — Win the Champions Cup (${c.trophiesCont} Club Titles)</div>
      <div class="fm-subbox">💰 <strong>Transfer Tycoon</strong> — Complete a £50M+ blockbuster signing</div>
      <div class="fm-subbox">🌐 <strong>Globe Trotter</strong> — Manage clubs across England, Spain, Italy, Germany, France, Algeria, or Brazil</div>
    </div>
  `;
}

/* ============================================================================
   SCREEN 2: DASHBOARD (MATCHING UPLOADED IMAGE 1000158361_30f07c.jpg)
   ============================================================================ */
function renderDashboardScreen() {
  const club = getUserClub();
  const lg = state.leagues.find(l => l.id === club.leagueId) || state.leagues[0];
  const nextFix = state.fixtures.find(f => !f.played && (f.homeId === club.id || f.awayId === club.id));
  const opp = nextFix ? getClub(nextFix.homeId === club.id ? nextFix.awayId : nextFix.homeId) : getClub(state.clubs[1].id);

  // Calculate current league position
  const standings = state.clubs.filter(c => c.leagueId === club.leagueId).sort((a, b) => (b.stats.pts - a.stats.pts) || ((b.stats.gf - b.stats.ga) - (a.stats.gf - a.stats.ga)));
  const posIdx = standings.findIndex(c => c.id === club.id) + 1;
  const ord = posIdx === 1 ? "1st" : posIdx === 2 ? "2nd" : posIdx === 3 ? "3rd" : `${posIdx}th`;

  return `
    <!-- NEXT MATCH CARD -->
    <div class="fm-card" style="text-align:center;">
      <div style="font-size:15px;font-weight:800;letter-spacing:0.8px;margin-bottom:10px;">NEXT MATCH</div>
      <div class="row-between" style="justify-content:space-around;margin-bottom:8px;">
        <div style="flex:1;text-align:center;">
          ${render2DCrest(club, 52)}
          <div style="font-weight:800;font-size:12px;margin-top:6px;text-transform:uppercase;">${club.name}</div>
        </div>
        <div style="font-size:22px;font-weight:900;font-style:italic;color:#cbd5e1;">VS</div>
        <div style="flex:1;text-align:center;">
          ${render2DCrest(opp, 52)}
          <div style="font-weight:800;font-size:12px;margin-top:6px;text-transform:uppercase;">${opp.name}</div>
        </div>
      </div>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">${lg.name} • Saturday, 15:00</div>
      <div class="cta-btn" style="width:72%;padding:10px;" onclick="launchLiveMatch()">
        <span>PLAY MATCH ⟫</span>
      </div>
    </div>

    <!-- NEWS & INBOX -->
    <div style="font-size:14px;font-weight:800;margin:6px 0 6px 4px;letter-spacing:0.6px;">NEWS & INBOX</div>
    <div class="fm-card" style="padding:8px;">
      ${state.inbox.slice(0, 2).map(m => `
        <div class="fm-subbox row-between" style="margin-bottom:6px;cursor:pointer;" onclick="navigate('inbox','inbox')">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:18px;">${m.type === 'Scout' ? '✉️' : '📰'}</span>
            <span style="font-size:12px;font-weight:600;">${m.title}</span>
          </div>
          ${m.unread ? `<span style="width:9px;height:9px;border-radius:50%;background:#38bdf8;flex-shrink:0;"></span>` : ''}
        </div>
      `).join("")}
    </div>

    <!-- CLUB STATUS -->
    <div style="font-size:14px;font-weight:800;margin:6px 0 6px 4px;letter-spacing:0.6px;">CLUB STATUS</div>
    <div class="fm-card">
      <div class="grid-2" style="text-align:center;">
        <div style="border-right:1px solid #334155;padding-right:6px;">
          <div style="font-size:11px;color:var(--text-muted);">FINANCES</div>
          <div style="font-size:24px;font-weight:900;color:#4ade80;margin:4px 0;">${fmtMoney(club.budget * 1.4)}</div>
          <div style="font-size:11px;color:var(--text-muted);">Transfer Budget: ${fmtMoney(club.budget)}</div>
        </div>
        <div style="padding-left:6px;cursor:pointer;" onclick="viewedCompetitionId='${club.leagueId}';navigate('schedule','table')">
          <div style="font-size:11px;color:var(--text-muted);">LEAGUE POSITION</div>
          <div style="font-size:24px;font-weight:900;color:#facc15;margin:4px 0;">${ord}</div>
          <div style="font-size:11px;color:var(--text-muted);">${lg.name}</div>
        </div>
      </div>
    </div>

    <!-- QUICK LINKS -->
    <div style="font-size:14px;font-weight:800;margin:6px 0 6px 4px;letter-spacing:0.6px;">QUICK LINKS</div>
    <div class="fm-card" style="padding:8px;">
      <div class="grid-4">
        <div class="fm-subbox" style="text-align:center;margin:0;cursor:pointer;" onclick="navigate('squad','tactics')">
          <div style="font-size:20px;color:var(--neon-cyan);">📋</div>
          <div style="font-size:9px;font-weight:800;margin-top:4px;">TACTICS</div>
        </div>
        <div class="fm-subbox" style="text-align:center;margin:0;cursor:pointer;" onclick="navigate('squad','market')">
          <div style="font-size:20px;color:var(--neon-cyan);">💷</div>
          <div style="font-size:9px;font-weight:800;margin-top:4px;">TRANSFERS</div>
        </div>
        <div class="fm-subbox" style="text-align:center;margin:0;cursor:pointer;" onclick="navigate('squad','staff')">
          <div style="font-size:20px;color:var(--neon-cyan);">📢</div>
          <div style="font-size:9px;font-weight:800;margin-top:4px;">TRAINING</div>
        </div>
        <div class="fm-subbox" style="text-align:center;margin:0;cursor:pointer;" onclick="navigate('schedule','other_comps')">
          <div style="font-size:20px;color:var(--neon-cyan);">🌍</div>
          <div style="font-size:9px;font-weight:800;margin-top:4px;">LEAGUES</div>
        </div>
      </div>
    </div>
  `;
}

/* ============================================================================
   SCREEN 3: SQUAD MANAGEMENT & 2D PITCH (MATCHING 1000158363_30f07c.jpg)
   ============================================================================ */
const PITCH_433 = [
  [50, 86, 1],
  [16, 63, 17], [38, 66, 11], [62, 66, 15], [84, 63, 13],
  [26, 40, 13], [50, 43, 6], [74, 40, 10],
  [20, 16, 26], [50, 12, 9], [80, 16, 16]
];

function renderSquadManagementScreen() {
  const club = getUserClub();
  const squad = getClubPlayers(club.id);
  const starters = squad.slice(0, 11);

  return `
    <div style="text-align:center;font-size:17px;font-weight:800;margin-bottom:6px;">${club.formation || '4-3-3'}</div>
    <div class="pitch-container">
      <div class="pitch-box-top"></div>
      <div class="pitch-mid"></div>
      <div class="pitch-circle"></div>
      <div class="pitch-box-bot"></div>
      ${starters.map((p, idx) => {
        const [x, y, num] = PITCH_433[idx] || [50, 50, idx + 1];
        const isGK = idx === 0;
        return `<div class="pitch-player" style="left:${x}%;top:${y}%;" onclick="openContractForPlayer('${p.id}')">
          ${render2DKit(isGK ? '#16a34a' : club.c1, club.c2, num, 34)}
          <div class="pitch-label">${p.name.substring(0, 6)} (${p.ovr})</div>
        </div>`;
      }).join("")}
    </div>

    <div class="fm-card">
      <div class="fm-card-header">
        <span>PLAYER ROSTER</span>
        <button class="sm-btn sec" onclick="currentSub='roster';render();">Full Roster View</button>
      </div>
      <table>
        <thead>
          <tr><th>POS</th><th>NAME</th><th>MORALE</th><th>FIT</th><th>OVR</th></tr>
        </thead>
        <tbody>
          ${squad.slice(0, 12).map(p => `
            <tr onclick="swapSquadOrder('${p.id}')" style="background:${selectedSwapPlayerId === p.id ? 'rgba(45,212,191,0.2)' : 'transparent'};cursor:pointer;">
              <td><span class="pos-tag pos-${p.pos}">${p.pos}</span></td>
              <td style="font-weight:700;font-size:13px;">${p.name}</td>
              <td style="font-size:16px;">${p.morale >= 85 ? '😊' : '😐'}</td>
              <td>
                <div class="fit-bar-bg">
                  <div class="fit-bar-fill" style="width:${p.fit}%;background:${p.fit > 82 ? '#22c55e' : '#eab308'};"></div>
                </div>
              </td>
              <td style="font-weight:900;font-size:14px;">${p.ovr}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div class="cta-btn" onclick="currentSub='roster';render();">
      <span>CONFIRM SQUAD ⟫</span>
    </div>
  `;
}

function swapSquadOrder(pid) {
  if (!selectedSwapPlayerId) {
    selectedSwapPlayerId = pid;
    render();
    return;
  }
  const i1 = state.players.findIndex(p => p.id === selectedSwapPlayerId);
  const i2 = state.players.findIndex(p => p.id === pid);
  if (i1 > -1 && i2 > -1) {
    const tmp = state.players[i1];
    state.players[i1] = state.players[i2];
    state.players[i2] = tmp;
  }
  selectedSwapPlayerId = null;
  saveGame();
  render();
}

/* ============================================================================
   SCREEN 4: SQUAD ROSTER (MATCHING UPLOADED IMAGE 1000158364_30f07c.jpg)
   ============================================================================ */
function renderSquadRosterScreen() {
  const club = getUserClub();
  const squad = getClubPlayers(club.id).filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return `
    <div class="row-between" style="margin-bottom:10px;">
      <input style="margin:0;flex:1;" placeholder="🔍 Search squad..." value="${searchQuery}" oninput="searchQuery=this.value;render();" />
      <div class="filter-pill" style="padding:8px 12px;">SQUAD SIZE: ${squad.length}/25</div>
    </div>

    <div class="fm-card">
      <div class="fm-card-header">PLAYER ROSTER</div>
      <table>
        <thead>
          <tr><th>POS</th><th>NAME</th><th>AGE</th><th>OVR</th><th>FORM</th><th>FIT</th><th>CONTRACT</th></tr>
        </thead>
        <tbody>
          ${squad.map(p => {
            const formNum = parseFloat(p.form || "7.10");
            const formBg = formNum >= 7.1 ? "#22c55e" : "#eab308";
            return `<tr onclick="openContractForPlayer('${p.id}')" style="cursor:pointer;">
              <td><span class="pos-tag pos-${p.pos}">${p.pos}</span></td>
              <td style="font-weight:700;">👤 ${p.name}</td>
              <td>${p.age}</td>
              <td style="font-weight:800;">${p.ovr}</td>
              <td><span class="rating-pill" style="background:${formBg};">${p.form}</span></td>
              <td>
                <div class="fit-bar-bg">
                  <div class="fit-bar-fill" style="width:${p.fit}%;background:${p.fit > 82 ? '#22c55e' : '#eab308'};"></div>
                </div>
              </td>
              <td style="font-weight:700;">${p.contract}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>

    <div class="cta-btn" onclick="currentSub='management';render();">
      <span>MANAGE TEAM ⟫</span>
    </div>
  `;
}

function renderTacticsScreen() {
  const club = getUserClub();
  return `
    <div class="fm-card">
      <div class="fm-card-header">Tactical Instructions & Formation</div>
      <label style="font-size:12px;color:var(--text-muted);">Formation</label>
      <select onchange="getUserClub().formation=this.value;saveGame();render();">
        ${["4-3-3", "4-2-3-1", "4-4-2", "3-5-2", "3-4-3"].map(f => `<option value="${f}" ${club.formation === f ? 'selected' : ''}>${f}</option>`).join("")}
      </select>
      <label style="font-size:12px;color:var(--text-muted);">Team Mentality</label>
      <select onchange="getUserClub().mentality=this.value;saveGame();render();">
        ${["Ultra Defensive", "Counter-Attack", "Balanced", "Attacking", "Gegenpress High Tempo"].map(m => `<option value="${m}" ${club.mentality === m ? 'selected' : ''}>${m}</option>`).join("")}
      </select>
      <div class="cta-btn" onclick="currentSub='management';render();"><span>VIEW PITCH LINEUP ⟫</span></div>
    </div>
  `;
}

function renderStaffTrainingScreen() {
  const club = getUserClub();
  return `
    <div class="fm-card">
      <div class="fm-card-header">Coaching Staff & Squad Training</div>
      <div class="fm-subbox">📢 <strong>Head Coach Focus:</strong> High-Intensity Tactical Pressing (+1 OVR progression)</div>
      <div class="fm-subbox">🧤 <strong>Goalkeeping Coach:</strong> Shot-Stopping & Distribution</div>
      <div class="fm-subbox">🏋️ <strong>Fitness Conditioning:</strong> Match Sharpness & Stamina Recovery</div>
      <div class="cta-btn" onclick="boostSquadTraining()"><span>RUN INTENSIVE TRAINING SESSION ⟫</span></div>
    </div>
  `;
}

function boostSquadTraining() {
  const club = getUserClub();
  getClubPlayers(club.id).forEach(p => {
    p.fit = 100;
    if (Math.random() < 0.25 && p.ovr < 96) p.ovr++;
  });
  saveGame();
  alert("Training session completed! Squad fitness restored and young players progressed.");
  render();
}

/* ============================================================================
   SCREEN 5: MATCHES & FIXTURES (MATCHING UPLOADED IMAGE 1000158369_30f07c.jpg)
   ============================================================================ */
function renderMatchesFixturesScreen() {
  const club = getUserClub();
  const myFixtures = state.fixtures.filter(f => f.homeId === club.id || f.awayId === club.id);
  const upcoming = myFixtures.find(f => !f.played) || myFixtures[0];
  const opp = upcoming ? getClub(upcoming.homeId === club.id ? upcoming.awayId : upcoming.homeId) : getClub(state.clubs[1].id);
  const windowFix = myFixtures.slice(Math.max(0, state.week - 3), state.week + 2);

  return `
    <!-- UPCOMING MATCH BANNER -->
    <div class="fm-card" style="text-align:center;">
      <div style="font-size:12px;color:var(--text-muted);letter-spacing:0.8px;margin-bottom:6px;">UPCOMING MATCH</div>
      <div class="row-between" style="justify-content:space-around;">
        <div style="display:flex;align-items:center;gap:8px;">
          ${render2DCrest(club, 38)}
          <div style="text-align:left;font-weight:800;font-size:13px;">${club.name.toUpperCase()}</div>
        </div>
        <div style="font-size:18px;font-weight:900;font-style:italic;color:var(--text-muted);">VS</div>
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="text-align:right;font-weight:800;font-size:13px;">${opp.name.toUpperCase()}</div>
          ${render2DCrest(opp, 38)}
        </div>
      </div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:6px;">Premier Division • Saturday, 15:00</div>
    </div>

    <!-- RECENT RESULTS & FIXTURES -->
    <div class="fm-card">
      <div class="fm-card-header">RECENT RESULTS & FIXTURES</div>
      ${windowFix.map((f, idx) => {
        const h = getClub(f.homeId);
        const a = getClub(f.awayId);
        const parts = (f.dateStr || "26 OCT").split(" ");
        const compLabel = idx === 1 ? "🏆 Champions Cup" : "🦁 Premier Division";
        return `<div class="fm-subbox" style="display:flex;align-items:center;gap:10px;border-color:rgba(45,212,191,0.45);">
          <div style="text-align:center;min-width:42px;border-right:1px solid #334155;padding-right:8px;">
            <div style="font-size:18px;font-weight:900;line-height:1;">${parts[0]}</div>
            <div style="font-size:10px;color:var(--text-muted);">${parts[1]}</div>
          </div>
          <div style="flex:1;">
            <div class="row-between" style="font-size:11px;color:var(--text-muted);margin-bottom:4px;">
              <span>${compLabel}</span>
              ${!f.played && idx === 2 ? `<span style="background:#10b981;color:#04131a;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;">UPCOMING</span>` : `<span style="font-size:10px;">16:00</span>`}
            </div>
            <div class="row-between" style="font-size:13px;font-weight:700;">
              <span>${render2DCrest(h, 20)} ${h.name}</span>
              <span style="font-size:15px;font-weight:900;color:${f.played ? '#f8fafc' : 'var(--neon-cyan)'};">
                ${f.played ? `${f.hg} - ${f.ag}` : 'vs'}
              </span>
              <span>${a.name} ${render2DCrest(a, 20)}</span>
            </div>
          </div>
        </div>`;
      }).join("")}
    </div>

    <div class="cta-btn" onclick="launchLiveMatch()">
      <span>SIMULATE / PLAY MATCH ⟫</span>
    </div>
  `;
}

function renderResultsScreen() {
  const lgFix = state.fixtures.filter(f => f.compId === viewedCompetitionId && f.played).slice(-15).reverse();
  return `
    <div class="fm-card">
      <div class="fm-card-header">Completed Match Results</div>
      <select onchange="viewedCompetitionId=this.value;render();">
        ${state.leagues.map(l => `<option value="${l.id}" ${l.id === viewedCompetitionId ? 'selected' : ''}>${l.flag} ${l.name}</option>`).join("")}
      </select>
      ${lgFix.map(f => {
        const h = getClub(f.homeId);
        const a = getClub(f.awayId);
        return `<div class="fm-subbox row-between">
          <span>Wk ${f.week}: <strong>${h.name}</strong></span>
          <span class="pos-tag pos-MID">${f.hg} - ${f.ag}</span>
          <span><strong>${a.name}</strong></span>
        </div>`;
      }).join("")}
    </div>
  `;
}

/* ============================================================================
   SCREEN 6: LEAGUE TABLE & OTHER COMPETITIONS EXPLORER (1000158370_30f07c.jpg)
   ============================================================================ */
function renderLeagueTableScreen() {
  const lg = state.leagues.find(l => l.id === viewedCompetitionId) || state.leagues[0];
  const standings = state.clubs.filter(c => c.leagueId === lg.id)
    .sort((a, b) => (b.stats.pts - a.stats.pts) || ((b.stats.gf - b.stats.ga) - (a.stats.gf - a.stats.ga)));

  return `
    <!-- COMPETITION SWITCHER: ALLOWS SEEING ANY LEAGUE IN THE WORLD -->
    <div class="row-between" style="margin-bottom:8px;">
      <select style="margin:0;font-weight:800;border-color:var(--neon-cyan);" onchange="viewedCompetitionId=this.value;render();">
        ${state.leagues.map(l => `<option value="${l.id}" ${l.id === lg.id ? 'selected' : ''}>${l.flag} ${l.name} (${state.clubs.filter(c => c.leagueId === l.id).length} Clubs)</option>`).join("")}
      </select>
      <button class="sm-btn" onclick="currentSub='other_comps';render();">All Cups</button>
    </div>

    <div class="fm-card" style="padding:8px;">
      <table>
        <thead>
          <tr><th>POS</th><th>CLUB</th><th>P</th><th>GD</th><th>PTS</th><th>FORM</th></tr>
        </thead>
        <tbody>
          ${standings.map((c, idx) => {
            const posNum = idx + 1;
            const posStr = posNum === 1 ? "1st" : posNum === 2 ? "2nd" : posNum === 3 ? "3rd" : `${posNum}th`;
            const gd = c.stats.gf - c.stats.ga;
            const gdStr = gd > 0 ? `+${gd}` : `${gd}`;
            const isUser = c.id === state.userClubId;
            const last5 = c.stats.form.slice(-5);
            return `<tr style="${isUser ? 'outline:2px solid #2dd4bf;background:rgba(45,212,191,0.14);' : ''}" onclick="inspectAnyClub('${c.id}')">
              <td style="font-weight:800;font-size:13px;">${posStr}</td>
              <td>
                <div style="display:flex;align-items:center;gap:6px;">
                  ${render2DCrest(c, 24)}
                  <span style="font-weight:700;font-size:12px;">${c.name}</span>
                </div>
              </td>
              <td>${c.stats.p}</td>
              <td>${gdStr}</td>
              <td style="font-weight:900;font-size:14px;">${c.stats.pts}</td>
              <td>
                ${last5.map(r => `<span class="form-dot form-${r}">${r}</span>`).join("")}
              </td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>

    <div class="cta-row">
      <div class="cta-btn" onclick="advanceWorldWeek()"><span>CONTINUE ⟫</span></div>
      <div class="cta-btn" onclick="navigate('squad','management')"><span>VIEW SQUAD ⟫</span></div>
    </div>
  `;
}

function inspectAnyClub(clubId) {
  const c = getClub(clubId);
  const topPlayers = getClubPlayers(clubId).sort((a, b) => b.ovr - a.ovr).slice(0, 5);
  alert(`${c.name} (${c.nickname})\nStadium: ${c.stadium} (${c.capacity.toLocaleString()})\nBudget: ${fmtMoney(c.budget)}\nTop Stars: ${topPlayers.map(p => `${p.name} (${p.ovr})`).join(", ")}`);
}

/* ABILITY TO SEE ALL OTHER COMPETITIONS (LEAGUES + CONTINENTAL CUPS) */
function renderAllCompetitionsExplorer() {
  const euroClubs = state.clubs.filter(c => ["eng_1", "esp_1", "ita_1", "ger_1", "fra_1"].includes(c.leagueId)).sort((a, b) => b.rep - a.rep).slice(0, 8);
  const cafClubs = state.clubs.filter(c => c.leagueId === "alg_1").slice(0, 4);
  const libClubs = state.clubs.filter(c => c.leagueId === "bra_1").slice(0, 4);

  return `
    <div class="fm-card">
      <div class="fm-card-header">🌍 World Leagues Directory (Tap to View Table)</div>
      <div class="grid-2">
        ${state.leagues.map(l => `
          <div class="fm-subbox" style="cursor:pointer;margin:0;" onclick="viewedCompetitionId='${l.id}';currentSub='table';render();">
            <div style="font-size:15px;font-weight:800;">${l.flag} ${l.country}</div>
            <div style="font-size:11px;color:var(--neon-cyan);">${l.name}</div>
            <div style="font-size:10px;color:var(--text-muted);">${state.clubs.filter(c => c.leagueId === l.id).length} Real-Size Clubs</div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="fm-card">
      <div class="fm-card-header">🏆 UEFA Champions Cup Quarter-Finals</div>
      ${[0, 2, 4, 6].map(i => `
        <div class="fm-subbox row-between">
          <span>${render2DCrest(euroClubs[i], 20)} <strong>${euroClubs[i].name}</strong></span>
          <span class="pos-tag pos-MID">${rInt(1, 3)} - ${rInt(0, 2)}</span>
          <span><strong>${euroClubs[i + 1].name}</strong> ${render2DCrest(euroClubs[i + 1], 20)}</span>
        </div>
      `).join("")}
    </div>

    <div class="fm-card">
      <div class="fm-card-header">🌍 CAF Champions Cup & Copa Libertadores</div>
      <div class="fm-subbox row-between">
        <span>🇩🇿 <strong>${cafClubs[0].name}</strong> vs <strong>${cafClubs[1].name}</strong></span>
        <span class="pos-tag pos-GK">CAF Semi-Final</span>
      </div>
      <div class="fm-subbox row-between">
        <span>🇧🇷 <strong>${libClubs[0].name}</strong> vs <strong>${libClubs[2].name}</strong></span>
        <span class="pos-tag pos-FWD">Libertadores Final</span>
      </div>
    </div>
  `;
}

/* ============================================================================
   SCREEN 7: TRANSFER MARKET (MATCHING UPLOADED IMAGE 1000158373_30f07c.jpg)
   ============================================================================ */
function renderTransferMarketScreen() {
  const club = getUserClub();
  let list = state.players.filter(p => p.clubId !== club.id && p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  if (marketFilterPos !== "ALL") list = list.filter(p => p.pos === marketFilterPos);
  list.sort((a, b) => b.ovr - a.ovr);

  return `
    <div class="row-between" style="margin-bottom:8px;">
      <input style="margin:0;flex:1;" placeholder="🔍 Search world players..." value="${searchQuery}" oninput="searchQuery=this.value;render();" />
      <div class="filter-pill">BUDGET: ${fmtMoney(club.budget)}</div>
    </div>

    <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;font-weight:700;">FILTER PILLS</div>
    <div class="pill-row">
      ${["ALL", "ST", "AMR", "AML", "MC", "DC", "DR", "DL", "GK"].map(pos => `
        <div class="filter-pill ${marketFilterPos === pos ? 'active' : ''}" onclick="marketFilterPos='${pos}';render();">${pos === 'ALL' ? 'POS ▾' : pos}</div>
      `).join("")}
    </div>

    <div class="fm-card" style="padding:8px;">
      <div class="fm-card-header">PLAYER ROSTER (TAP PLAYER TO NEGOTIATE)</div>
      <table>
        <thead>
          <tr><th>POS</th><th>NAME</th><th>AGE</th><th>OVR</th><th>VALUE</th><th>WAGE</th><th>STATUS</th></tr>
        </thead>
        <tbody>
          ${list.slice(0, 22).map(p => `
            <tr onclick="openNegotiationForPlayer('${p.id}')" style="cursor:pointer;">
              <td><span class="pos-tag pos-${p.pos}">${p.pos}</span></td>
              <td style="font-weight:700;">👤 ${p.name}</td>
              <td>${p.age}</td>
              <td style="font-weight:900;">${p.ovr}</td>
              <td>${fmtMoney(p.value)}</td>
              <td>${fmtMoney(p.wage)}</td>
              <td style="font-size:11px;color:${p.status === 'Unhappy' ? '#f87171' : '#cbd5e1'};">${p.status || 'Listed'}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div class="cta-btn" onclick="openNegotiationForPlayer('${list[0] ? list[0].id : ''}')">
      <span>ADVANCE TRANSFER ⟫</span>
    </div>
  `;
}

function openNegotiationForPlayer(pid) {
  if (!pid) return;
  activeNegotiationPlayerId = pid;
  navigate("inbox", "negotiations");
}

/* ============================================================================
   SCREEN 8: NEGOTIATIONS (MATCHING UPLOADED IMAGE 1000158375_30f07c.jpg)
   ============================================================================ */
let offerBidAmount = 68000000;
let offerSellOn = 15;

function renderNegotiationsScreen() {
  const p = state.players.find(x => x.id === activeNegotiationPlayerId) || state.players.find(x => x.name.includes("Fernandes")) || state.players[0];
  if (!offerBidAmount || Math.abs(offerBidAmount - p.value) > 40000000) offerBidAmount = p.value;

  return `
    <!-- Player Header with Gold OVR Shield -->
    <div class="fm-card">
      <div class="row-between">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:58px;height:58px;border-radius:50%;background:#1e293b;border:2px solid var(--neon-cyan);display:flex;align-items:center;justify-content:center;font-size:28px;">👤</div>
          <div>
            <div style="font-size:20px;font-weight:900;">${p.name.toUpperCase()}</div>
            <div style="font-size:13px;color:var(--text-muted);">${p.pos} / MC</div>
            <div style="font-size:13px;margin-top:2px;">${p.nat}</div>
          </div>
        </div>
        <div style="background:linear-gradient(180deg,#eab308,#a16207);padding:8px 12px;border-radius:10px;border:2px solid #fef08a;text-align:center;">
          <div style="font-size:10px;font-weight:800;color:#fff;">OVR</div>
          <div style="font-size:22px;font-weight:900;color:#fff;line-height:1;">${p.ovr}</div>
        </div>
      </div>
    </div>

    <div style="text-align:center;font-size:13px;font-weight:800;color:var(--text-muted);margin-bottom:8px;">TALKS WITH AGENT</div>

    <!-- AGENT FEEDBACK -->
    <div class="fm-card">
      <div class="fm-card-header">AGENT FEEDBACK</div>
      <div class="fm-subbox" style="border-color:var(--neon-cyan);">
        <div style="color:var(--neon-cyan);font-weight:800;font-size:12px;margin-bottom:4px;">AGENT: JORGE MENDES 💬</div>
        <div style="font-size:12px;line-height:1.45;">My client is interested, but we expect a competitive transfer fee and solid contract terms to reach an agreement.</div>
      </div>
    </div>

    <!-- TRANSFER FEE SLIDER -->
    <div class="fm-card" style="text-align:center;">
      <div class="fm-card-header">TRANSFER FEE</div>
      <div style="display:inline-block;padding:6px 18px;border-radius:8px;border:1.5px solid #4ade80;background:#091526;font-size:22px;font-weight:900;color:#4ade80;margin-bottom:8px;">
        ${fmtMoney(offerBidAmount)}
      </div>
      <input type="range" min="${Math.round(p.value * 0.7)}" max="${Math.round(p.value * 1.4)}" step="500000" value="${offerBidAmount}" oninput="offerBidAmount=Number(this.value);render();" />
      <div style="font-size:11px;color:var(--text-muted);">Range: ${fmtMoney(p.value * 0.85)} - ${fmtMoney(p.value * 1.25)}</div>
    </div>

    <!-- SELL-ON CLAUSE -->
    <div class="fm-card row-between">
      <span style="font-weight:800;font-size:14px;">SELL-ON CLAUSE</span>
      <div style="display:flex;align-items:center;gap:10px;">
        <button class="sm-btn" onclick="offerSellOn=Math.max(0,offerSellOn-5);render();">−</button>
        <span style="font-size:18px;font-weight:900;color:#4ade80;">${offerSellOn}%</span>
        <button class="sm-btn" onclick="offerSellOn=Math.min(50,offerSellOn+5);render();">+</button>
      </div>
    </div>

    <!-- CONTRACT DETAILS -->
    <div class="fm-card">
      <div class="fm-card-header">CONTRACT DETAILS</div>
      <div class="row-between" style="font-size:13px;font-weight:800;">
        <span>AGENT FEE: £3.5M</span>
        <span>SIGN-ON FEE: £5.0M</span>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom:10px;">
      <button class="sm-btn danger" style="padding:12px;font-size:13px;" onclick="navigate('squad','market')">✕ WALK AWAY</button>
      <button class="sm-btn" style="padding:12px;font-size:13px;background:#3b82f6;color:#fff;" onclick="offerBidAmount=p.value;render();">↻ COUNTER OFFER</button>
    </div>

    <div class="cta-btn" onclick="submitTransferOffer('${p.id}')">
      <span>SUBMIT OFFER ▶</span>
    </div>
  `;
}

function submitTransferOffer(pid) {
  const club = getUserClub();
  const p = state.players.find(x => x.id === pid);
  if (!p) return;
  if (club.budget < offerBidAmount) {
    alert("Your club transfer budget is lower than the proposed offer!");
    return;
  }
  club.budget -= offerBidAmount;
  p.clubId = club.id;
  p.status = "-";
  state.inbox.unshift({
    id: uid("m"),
    week: state.week,
    type: "Scout",
    title: `Transfer Completed: ${p.name} signs for ${club.name}!`,
    body: `Deal agreed with Agent Jorge Mendes for ${fmtMoney(offerBidAmount)}.`,
    unread: true
  });
  saveGame();
  alert(`Deal agreed! ${p.name} has joined ${club.name}!`);
  navigate("squad", "roster");
}

/* ============================================================================
   SCREEN 9: CONTRACTS & RENEWALS (MATCHING UPLOADED IMAGE 1000158376_30f07c.jpg)
   ============================================================================ */
function openContractForPlayer(pid) {
  activeContractPlayerId = pid;
  navigate("inbox", "contracts");
}

function renderContractsScreen() {
  const club = getUserClub();
  const squad = getClubPlayers(club.id);
  const p = squad.find(x => x.id === activeContractPlayerId) || squad[0];

  return `
    <div class="fm-card">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;">
        <div style="width:58px;height:58px;border-radius:50%;background:#1e293b;border:2px solid var(--neon-cyan);display:flex;align-items:center;justify-content:center;font-size:28px;">👤</div>
        <div>
          <div style="font-size:20px;font-weight:900;">${p.name.toUpperCase()}</div>
          <div style="font-size:13px;color:var(--text-muted);">${p.pos} / MC</div>
          <div style="font-size:13px;">${p.nat}</div>
        </div>
      </div>

      <div style="text-align:center;font-size:13px;font-weight:800;color:var(--text-muted);margin-bottom:8px;">PROPOSED TERMS</div>

      <div class="fm-subbox">
        <div style="font-size:11px;color:var(--text-muted);">💲 Weekly Wage</div>
        <div style="font-size:18px;font-weight:900;color:#4ade80;">£${p.wage.toLocaleString()}</div>
      </div>

      <div class="fm-subbox row-between">
        <div>
          <div style="font-size:11px;color:var(--text-muted);">📅 Contract Length</div>
          <div style="font-size:15px;font-weight:900;color:#4ade80;">4 Years (until 2030)</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-muted);">Contract Clause</div>
          <div style="font-size:15px;font-weight:900;color:#4ade80;">N/A</div>
        </div>
      </div>

      <div class="grid-2">
        <div class="fm-subbox" style="margin:0;">
          <div style="font-size:11px;color:var(--text-muted);">🔓 Release Clause</div>
          <div style="font-size:15px;font-weight:900;color:#4ade80;">£85,000,000</div>
        </div>
        <div class="fm-subbox" style="margin:0;">
          <div style="font-size:11px;color:var(--text-muted);">💰 Signing Bonus</div>
          <div style="font-size:15px;font-weight:900;color:#4ade80;">£1,500,000</div>
        </div>
      </div>
    </div>

    <div class="fm-card">
      <div class="fm-card-header">EXPIRING CONTRACTS</div>
      <table>
        <thead><tr><th>NAME</th><th>EXPIRY</th><th>WAGE</th><th>STATUS</th></tr></thead>
        <tbody>
          ${squad.slice(0, 5).map(pl => `
            <tr>
              <td style="font-weight:700;">${pl.name}</td>
              <td>June ${pl.contract}</td>
              <td>${fmtMoney(pl.wage)}</td>
              <td><button class="sm-btn" onclick="activeContractPlayerId='${pl.id}';render();">RENEW</button></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div class="cta-btn" onclick="confirmContractRenewal('${p.id}')">
      <span>CONFIRM RENEWAL ⟫</span>
    </div>
  `;
}

function confirmContractRenewal(pid) {
  const p = state.players.find(x => x.id === pid);
  if (p) {
    p.contract = 2030;
    p.morale = 99;
    saveGame();
    alert(`${p.name} has signed a new 4-year contract until 2030!`);
    render();
  }
}

/* ============================================================================
   SCREEN 10: CLUB OVERVIEW (MATCHING UPLOADED IMAGE 1000158378_30f07c.jpg)
   ============================================================================ */
function renderClubOverviewScreen() {
  const club = getUserClub();
  const stars = "★★★★☆";

  return `
    <!-- Club Header Card -->
    <div class="fm-card">
      <div style="display:flex;align-items:center;gap:12px;">
        ${render2DCrest(club, 56)}
        <div style="flex:1;">
          <div style="font-size:18px;font-weight:900;">'${club.name.toUpperCase()}'</div>
          <div class="grid-3" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-top:6px;font-size:11px;">
            <div><div style="color:var(--text-muted);font-size:9px;">NICKNAME</div><strong>${club.nickname}</strong></div>
            <div><div style="color:var(--text-muted);font-size:9px;">FOUNDED</div><strong>Est. ${club.founded}</strong></div>
            <div><div style="color:var(--text-muted);font-size:9px;">REPUTATION</div><strong style="color:var(--neon-cyan);">${stars}</strong></div>
          </div>
        </div>
      </div>
    </div>

    <!-- STADIUM & FACILITIES -->
    <div class="fm-card">
      <div class="fm-card-header">STADIUM & FACILITIES</div>
      <div class="grid-2">
        <div style="border-right:1px solid #334155;padding-right:8px;">
          <div style="font-size:11px;color:var(--text-muted);">STADIUM 🏟️</div>
          <div style="font-size:16px;font-weight:900;margin:4px 0;">${club.stadium.toUpperCase()}</div>
          <div style="font-size:12px;color:#cbd5e1;">Capacity: ${club.capacity.toLocaleString()}</div>
        </div>
        <div style="padding-left:6px;">
          <div style="font-size:11px;color:var(--text-muted);">FACILITIES</div>
          <div style="font-size:12px;font-weight:700;margin-top:2px;">Youth Academy</div>
          <div style="color:var(--neon-cyan);font-size:13px;">★★★★☆</div>
          <div style="font-size:12px;font-weight:700;margin-top:4px;">Training Ground</div>
          <div style="color:var(--neon-cyan);font-size:13px;">★★★★☆</div>
        </div>
      </div>
    </div>

    <!-- BOARD CONFIDENCE -->
    <div class="fm-card">
      <div class="row-between" style="margin-bottom:6px;">
        <span style="font-weight:800;font-size:14px;">BOARD CONFIDENCE</span>
        <span style="font-weight:900;font-size:16px;">${state.boardConfidence}%</span>
      </div>
      <div class="row-between">
        <div style="flex:1;height:14px;background:#09111e;border-radius:99px;border:1px solid #334155;overflow:hidden;">
          <div style="width:${state.boardConfidence}%;height:100%;background:linear-gradient(90deg,#38bdf8,#4ade80);"></div>
        </div>
        <div style="width:32px;height:32px;border-radius:50%;background:#22c55e;color:#051b11;font-weight:900;display:flex;align-items:center;justify-content:center;">A</div>
      </div>
      <div style="text-align:right;font-size:12px;color:#cbd5e1;margin-top:4px;">Very Secure</div>
    </div>

    <!-- KIT PREVIEW (2D FLAT) & TROPHY CABINET -->
    <div class="fm-card">
      <div class="grid-2">
        <div style="border-right:1px solid #334155;padding-right:8px;text-align:center;">
          <div class="fm-card-header">KIT PREVIEW</div>
          <div class="row-between" style="justify-content:space-around;margin-top:10px;">
            <div>
              ${render2DKit(club.c1, club.c2, "", 56)}
              <div style="font-size:11px;margin-top:4px;">Home</div>
            </div>
            <div>
              ${render2DKit("#f8fafc", "#111827", "", 56)}
              <div style="font-size:11px;margin-top:4px;">Away</div>
            </div>
          </div>
        </div>
        <div style="padding-left:6px;">
          <div class="fm-card-header">TROPHY CABINET</div>
          <div style="font-size:12px;line-height:2;">
            🏆 <strong>x${club.trophiesLeague}</strong> <span style="font-size:10px;color:var(--text-muted);">Domestic Leagues</span><br/>
            🏆 <strong>x${club.trophiesCont}</strong> <span style="font-size:10px;color:var(--text-muted);">Continental Cups</span><br/>
            🏆 <strong>x${club.trophiesCup}</strong> <span style="font-size:10px;color:var(--text-muted);">Domestic Cups</span>
          </div>
        </div>
      </div>
    </div>

    <div class="cta-btn" onclick="navigate('menu','new_game')">
      <span>SWITCH / MANAGE ANY CLUB ⟫</span>
    </div>
  `;
}

/* ============================================================================
   INBOX & LIVE MATCH ENGINE
   ============================================================================ */
function renderInboxScreen() {
  return `
    <div class="fm-card">
      <div class="fm-card-header">Club Communications & Scout Reports</div>
      ${state.inbox.map(m => `
        <div class="fm-subbox" onclick="m.unread=false;saveGame();render();">
          <div class="row-between">
            <span class="pos-tag pos-MID">${m.type} • Wk ${m.week}</span>
            <button class="sm-btn" onclick="navigate('squad','market')">Open Market</button>
          </div>
          <div style="font-weight:800;font-size:13px;margin:6px 0 3px;">${m.title}</div>
          <div style="font-size:12px;color:var(--text-muted);">${m.body}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function launchLiveMatch() {
  const club = getUserClub();
  const fix = state.fixtures.find(f => !f.played && (f.homeId === club.id || f.awayId === club.id));
  if (!fix) {
    advanceWorldWeek();
    return;
  }
  const h = getClub(fix.homeId);
  const a = getClub(fix.awayId);
  liveMatchObj = {
    fixId: fix.id,
    min: 0,
    h,
    a,
    hg: 0,
    ag: 0,
    ballX: 50,
    ballY: 50,
    logs: ["1' Kick-off! Under the floodlights, a massive clash begins!"]
  };
  currentTab = "schedule";
  currentSub = "live_match";
  render();

  if (liveMatchInterval) clearInterval(liveMatchInterval);
  liveMatchInterval = setInterval(() => {
    if (!liveMatchObj) return;
    liveMatchObj.min += 3;
    liveMatchObj.ballX = rInt(18, 82);
    liveMatchObj.ballY = rInt(18, 82);

    if (Math.random() < 0.24) {
      const homeScores = Math.random() * (liveMatchObj.h.rep + liveMatchObj.a.rep) < (liveMatchObj.h.rep + 3);
      const scoringClub = homeScores ? liveMatchObj.h : liveMatchObj.a;
      const scorer = pick(getClubPlayers(scoringClub.id).filter(p => p.pos !== "GK")) || { name: "Forward" };
      if (Math.random() < 0.36) {
        if (homeScores) liveMatchObj.hg++; else liveMatchObj.ag++;
        scorer.goals = (scorer.goals || 0) + 1;
        liveMatchObj.logs.unshift(`⚽ ${liveMatchObj.min}' GOAL! ${scorer.name} strikes into the top corner for ${scoringClub.name}!`);
      } else {
        liveMatchObj.logs.unshift(`🧤 ${liveMatchObj.min}' Great chance for ${scorer.name} (${scoringClub.short}), parried away!`);
      }
    }

    if (liveMatchObj.min >= 90) {
      clearInterval(liveMatchInterval);
      fix.played = true;
      fix.hg = liveMatchObj.hg;
      fix.ag = liveMatchObj.ag;
      recordResultInStandings(liveMatchObj.h, liveMatchObj.a, fix.hg, fix.ag);
      simulateWeekFixtures(state, state.week);
      state.week++;
      saveGame();
      liveMatchObj.logs.unshift(`🏁 90' FULL TIME: ${liveMatchObj.h.name} ${liveMatchObj.hg} - ${liveMatchObj.ag} ${liveMatchObj.a.name}`);
    }
    if (currentSub === "live_match") render();
  }, 240);
}

function renderLiveMatchScreen() {
  if (!liveMatchObj) return renderMatchesFixturesScreen();
  return `
    <div class="fm-card" style="text-align:center;">
      <div class="row-between">
        <div>${render2DCrest(liveMatchObj.h, 36)}<div style="font-weight:800;font-size:12px;">${liveMatchObj.h.name}</div></div>
        <div style="font-size:26px;font-weight:900;color:var(--neon-cyan);">${liveMatchObj.hg} - ${liveMatchObj.ag}<div style="font-size:12px;color:#facc15;">${liveMatchObj.min}'</div></div>
        <div>${render2DCrest(liveMatchObj.a, 36)}<div style="font-weight:800;font-size:12px;">${liveMatchObj.a.name}</div></div>
      </div>
      <div class="pitch-container" style="height:175px;margin-top:10px;">
        <div class="pitch-mid"></div>
        <div class="pitch-circle"></div>
        <div style="position:absolute;left:${liveMatchObj.ballX}%;top:${liveMatchObj.ballY}%;transform:translate(-50%,-50%);font-size:16px;">⚽</div>
      </div>
      <div style="max-height:160px;overflow-y:auto;text-align:left;font-size:12px;background:#08101d;padding:8px;border-radius:8px;">
        ${liveMatchObj.logs.map(l => `<div style="padding:3px 0;border-bottom:1px solid #1e293b;">${l}</div>`).join("")}
      </div>
    </div>
    <div class="cta-btn" onclick="viewedCompetitionId=getUserClub().leagueId;currentSub='table';render();">
      <span>VIEW UPDATED LEAGUE TABLE ⟫</span>
    </div>
  `;
}

function advanceWorldWeek() {
  simulateWeekFixtures(state, state.week);
  state.week++;
  saveGame();
  render();
}

/* ============================================================================
   BUILT-IN DATABASE EDITOR (CLUBS, PLAYERS, 2D LOGOS, IMPORT/EXPORT)
   ============================================================================ */
let edClubId = null;
let edPlayerId = null;

function renderEditorHomeScreen() {
  return `
    <div class="fm-card">
      <div class="fm-card-header">Built-In World Database Studio</div>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">
        • Active Leagues: <strong>${state.leagues.length} Real-Size Leagues</strong><br/>
        • Active Clubs: <strong>${state.clubs.length} Clubs</strong> (20 EPL, 24 Championship, 20 La Liga, 20 Serie A, 18 Bundesliga, 18 Ligue 1, 16 Algerian Ligue 1, 20 Brasileirão)<br/>
        • Total Players: <strong>${state.players.length} Players</strong>
      </div>
      <div class="grid-2">
        <button class="sm-btn" style="padding:10px;" onclick="currentSub='ed_clubs';render();">🛡️ Edit Clubs & 2D Logos</button>
        <button class="sm-btn" style="padding:10px;" onclick="currentSub='ed_players';render();">👟 Edit Players</button>
        <button class="sm-btn sec" style="padding:10px;" onclick="exportWorldJSON()">⬇️ Export JSON DB</button>
        <button class="sm-btn sec" style="padding:10px;" onclick="importWorldJSON()">⬆️ Import JSON DB</button>
      </div>
    </div>
  `;
}

function renderEditorClubsScreen() {
  const c = state.clubs.find(x => x.id === edClubId) || getUserClub();
  edClubId = c.id;
  return `
    <div class="fm-card">
      <div class="fm-card-header">Club & 2D Flat Crest Editor (No Shadows)</div>
      <select onchange="edClubId=this.value;render();">
        ${state.clubs.map(cl => `<option value="${cl.id}" ${cl.id === c.id ? 'selected' : ''}>${cl.name} (${cl.short})</option>`).join("")}
      </select>
      <div style="text-align:center;padding:10px;background:#091220;border-radius:10px;margin-bottom:10px;">
        ${render2DCrest(c, 64)}
        ${render2DKit(c.c1, c.c2, "10", 64)}
      </div>
      <div class="grid-2">
        <div><label style="font-size:11px;">Club Name</label><input value="${c.name}" onchange="c.name=this.value;saveGame();render();" /></div>
        <div><label style="font-size:11px;">Short (3 chars)</label><input maxlength="3" value="${c.short}" onchange="c.short=this.value.toUpperCase();saveGame();render();" /></div>
        <div><label style="font-size:11px;">Primary Color</label><input type="color" value="${c.c1}" onchange="c.c1=this.value;saveGame();render();" /></div>
        <div><label style="font-size:11px;">Secondary Color</label><input type="color" value="${c.c2}" onchange="c.c2=this.value;saveGame();render();" /></div>
        <div><label style="font-size:11px;">Transfer Budget</label><input type="number" value="${c.budget}" onchange="c.budget=Number(this.value);saveGame();render();" /></div>
        <div><label style="font-size:11px;">Reputation (1-99)</label><input type="number" value="${c.rep}" onchange="c.rep=Number(this.value);saveGame();render();" /></div>
      </div>
      <button class="sm-btn" style="width:100%;padding:10px;" onclick="uploadCustom2DLogo('${c.id}')">🖼️ Pick 2D Club Logo from Phone Gallery</button>
    </div>
  `;
}

function uploadCustom2DLogo(cid) {
  const inp = document.getElementById("hidden-file-picker");
  inp.accept = "image/*";
  inp.onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      const cl = getClub(cid);
      if (cl) cl.customLogo = r.result;
      saveGame();
      render();
    };
    r.readAsDataURL(f);
  };
  inp.click();
}

function renderEditorPlayersScreen() {
  const p = state.players.find(x => x.id === edPlayerId) || state.players[0];
  edPlayerId = p.id;
  return `
    <div class="fm-card">
      <div class="fm-card-header">Player Attributes & Bio Editor</div>
      <select onchange="edPlayerId=this.value;render();">
        ${state.players.slice(0, 120).map(pl => `<option value="${pl.id}" ${pl.id === p.id ? 'selected' : ''}>${pl.name} (${pl.pos} • OVR ${pl.ovr})</option>`).join("")}
      </select>
      <div class="grid-2">
        <div><label style="font-size:11px;">Player Name</label><input value="${p.name}" onchange="p.name=this.value;saveGame();render();" /></div>
        <div><label style="font-size:11px;">Position</label><input value="${p.pos}" onchange="p.pos=this.value.toUpperCase();saveGame();render();" /></div>
        <div><label style="font-size:11px;">Overall (1-99)</label><input type="number" value="${p.ovr}" onchange="p.ovr=Number(this.value);saveGame();render();" /></div>
        <div><label style="font-size:11px;">Market Value</label><input type="number" value="${p.value}" onchange="p.value=Number(this.value);saveGame();render();" /></div>
      </div>
    </div>
  `;
}

function exportWorldJSON() {
  const blob = new Blob([JSON.stringify(state)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "fm26_world_database.json";
  a.click();
}

function importWorldJSON() {
  const inp = document.getElementById("hidden-file-picker");
  inp.accept = ".json";
  inp.onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        state = JSON.parse(r.result);
        saveGame();
        render();
        alert("World database imported!");
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    r.readAsText(f);
  };
  inp.click();
}

window.addEventListener("DOMContentLoaded", () => {
  currentTab = "menu";
  currentSub = "main_menu";
  render();
});
