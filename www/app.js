/* FM DYNASTY MANAGER 26 - COMPLETE ENGINE & BUILT-IN DATABASE EDITOR */
const STORAGE_KEY = "FM26_DYNASTY_SAVE_V1";
const DB_SLOTS_KEY = "FM26_DYNASTY_SLOTS_V1";
const CUSTOM_DB_KEY = "FM26_CUSTOM_DBS_V1";

const FAKE_NAMES = {
  England: { first: ["Harry", "Jude", "Bukayo", "Cole", "Declan", "Phil", "Ollie", "Kobbie", "Trent", "Marc"], last: ["Walker", "Bellingham", "Palmer", "Rice", "Foden", "Watkins", "Saka", "Mainoo", "Guehi", "Gordon"] },
  Spain: { first: ["Lamine", "Pedri", "Rodri", "Gavi", "Nico", "Dani", "Alvaro", "Unai", "Pau", "Mikel"], last: ["Yamal", "Gonzalez", "Hernandez", "Williams", "Olmo", "Morata", "Simon", "Cubarsi", "Merino", "Ruiz"] },
  Algeria: { first: ["Riyad", "Ismael", "Amine", "Ramy", "Yacine", "Houssem", "Said", "Baghdad", "Aissa", "Youcef"], last: ["Mahrez", "Bennacer", "Gouiri", "Bensebaini", "Brahimi", "Aouar", "Benrahma", "Bounedjah", "Mandi", "Atal"] },
  Brazil: { first: ["Vinicius", "Rodrygo", "Endrick", "Bruno", "Gabriel", "Lucas", "Raphinha", "Gleison", "Ederson", "Marquinhos"], last: ["Junior", "Goes", "Guimaraes", "Magalhaes", "Paqueta", "Dias", "Bremer", "Moraes", "Silva", "Savinho"] },
  France: { first: ["Kylian", "Antoine", "William", "Aurelien", "Eduardo", "Ousmane", "Mike", "Theo", "Warren", "Bradley"], last: ["Mbappe", "Griezmann", "Saliba", "Tchouameni", "Camavinga", "Dembele", "Maignan", "Hernandez", "Zaire", "Barcola"] }
};

let undoStack = [];
let redoStack = [];
let state = null;
let currentSection = "menu";
let currentSubTab = "home";
let selectedPlayerId = null;
let selectedTeamId = null;
let selectedBenchSwapId = null;
let liveMatchTimer = null;
let liveMatchState = null;

function uid(prefix = "id") {
  return prefix + "_" + Math.random().toString(36).substring(2, 9);
}

function rInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* STRICTLY 2D FLAT VECTOR CREST GENERATOR - NO SHADOWS, NO 3D */
function render2DCrestSVG(team, size = 34) {
  if (team && team.customLogoData) {
    return `<img src="${team.customLogoData}" style="width:${size}px;height:${size}px;object-fit:contain;box-shadow:none;filter:none;" />`;
  }
  const c1 = (team && team.primaryColor) || "#10b981";
  const c2 = (team && team.secondaryColor) || "#1e293b";
  const short = (team && team.shortName) ? team.shortName.substring(0, 3).toUpperCase() : "FC";
  const pattern = (team && team.kitPattern) || "stripes";
  let inner = "";
  if (pattern === "stripes") {
    inner = `<rect x="28" y="12" width="14" height="76" fill="${c2}"/><rect x="58" y="12" width="14" height="76" fill="${c2}"/>`;
  } else if (pattern === "sash") {
    inner = `<polygon points="20,15 35,15 80,85 65,85" fill="${c2}"/>`;
  } else {
    inner = `<rect x="12" y="42" width="76" height="18" fill="${c2}"/>`;
  }
  return `<svg class="crest-2d" width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12,10 88,10 88,60 50,92 12,60" fill="${c1}" stroke="#f8fafc" stroke-width="4"/>
    ${inner}
    <circle cx="50" cy="48" r="18" fill="#080c14" stroke="#f8fafc" stroke-width="3"/>
    <text x="50" y="53" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="800" font-family="sans-serif">${short}</text>
  </svg>`;
}

function calcPlayerOverall(attr, pos) {
  if (!attr) return 65;
  if (pos === "GK") {
    return Math.round((attr.gk * 3 + attr.def * 1.5 + attr.pas + attr.phy * 1.5) / 7);
  }
  if (pos === "DEF") {
    return Math.round((attr.def * 3 + attr.phy * 2 + attr.pac + attr.pas) / 7);
  }
  if (pos === "MID") {
    return Math.round((attr.pas * 2.5 + attr.dri * 2 + attr.sho + attr.def + attr.pac * 0.5) / 7);
  }
  return Math.round((attr.sho * 3 + attr.pac * 2 + attr.dri * 1.5 + attr.phy * 0.5) / 7);
}

function calcMarketValue(ovr, age, pot) {
  const base = Math.pow(Math.max(1, ovr - 45), 2.35) * 950;
  const ageFactor = age <= 23 ? 1.35 : age <= 28 ? 1.1 : age <= 32 ? 0.75 : 0.4;
  const potBonus = Math.max(0, pot - ovr) * 180000;
  return Math.round((base * ageFactor + potBonus) / 10000) * 10000;
}

function generatePlayer(teamId, pos, country, tierBoost = 0) {
  const natPool = FAKE_NAMES[country] || FAKE_NAMES.England;
  const first = pick(natPool.first);
  const last = pick(natPool.last);
  const age = rInt(17, 34);
  const base = rInt(56, 78) + tierBoost;
  const attr = {
    pac: Math.min(99, Math.max(35, base + (pos === "FWD" ? rInt(2, 12) : rInt(-6, 8)))),
    sho: Math.min(99, Math.max(30, base + (pos === "FWD" ? rInt(4, 14) : pos === "GK" ? -25 : rInt(-8, 8)))),
    pas: Math.min(99, Math.max(35, base + (pos === "MID" ? rInt(4, 13) : rInt(-5, 8)))),
    dri: Math.min(99, Math.max(35, base + (pos === "MID" || pos === "FWD" ? rInt(3, 12) : rInt(-8, 6)))),
    def: Math.min(99, Math.max(30, base + (pos === "DEF" ? rInt(5, 14) : pos === "GK" ? -15 : rInt(-12, 5)))),
    phy: Math.min(99, Math.max(40, base + rInt(-4, 10))),
    gk: Math.min(99, Math.max(20, pos === "GK" ? base + rInt(6, 15) : rInt(15, 35)))
  };
  const ovr = calcPlayerOverall(attr, pos);
  const pot = Math.min(99, Math.max(ovr, ovr + (age < 24 ? rInt(4, 15) : rInt(0, 3))));
  const value = calcMarketValue(ovr, age, pot);
  return {
    id: uid("ply"),
    name: `${first} ${last}`,
    teamId,
    nationality: country,
    age,
    pos,
    foot: Math.random() > 0.25 ? "Right" : "Left",
    attr,
    ovr,
    pot,
    morale: rInt(72, 95),
    fitness: 100,
    injuredWeeks: 0,
    injuryHistory: [],
    wage: Math.max(1500, Math.round(value / 220)),
    contractYears: rInt(1, 5),
    value,
    traits: [pick(["Leader", "Playmaker", "Speedster", "Clinical", "Engine", "Acrobatic"])],
    transferListed: false,
    loanListed: false,
    photoData: null,
    stats: { apps: 0, goals: 0, assists: 0, cleanSheets: 0, avgRating: 6.8 }
  };
}

function generateRoundRobinFixtures(teamIds, leagueId) {
  const teams = [...teamIds];
  if (teams.length % 2 !== 0) teams.push("BYE");
  const n = teams.length;
  const rounds = n - 1;
  const fixtures = [];
  for (let r = 0; r < rounds * 2; r++) {
    const isSecondHalf = r >= rounds;
    for (let i = 0; i < n / 2; i++) {
      const t1 = teams[i];
      const t2 = teams[n - 1 - i];
      if (t1 !== "BYE" && t2 !== "BYE") {
        fixtures.push({
          id: uid("fix"),
          leagueId,
          week: r + 1,
          homeId: isSecondHalf ? t2 : t1,
          awayId: isSecondHalf ? t1 : t2,
          played: false,
          homeGoals: 0,
          awayGoals: 0,
          events: []
        });
      }
    }
    teams.splice(1, 0, teams.pop());
  }
  return fixtures;
}

function buildStarterDatabase() {
  const leagues = [
    { id: "lg_1", name: "Premier Division", country: "England", tier: 1, promoSpots: 0, relSpots: 2, prizeMoney: 35000000 },
    { id: "lg_2", name: "Championship Division", country: "England", tier: 2, promoSpots: 2, relSpots: 0, prizeMoney: 14000000 }
  ];

  const clubTemplates = [
    // League 1 (12 Teams)
    ["North London Red", "NLR", "#ef4444", "#ffffff", "stripes", "Emirates Arena", 60000, 55000000, 88],
    ["Manchester Sky", "MCI", "#38bdf8", "#0f172a", "sash", "Etihad Dome", 54000, 72000000, 92],
    ["Merseyside Athletic", "LIV", "#dc2626", "#facc15", "hoops", "Anfield Park", 61000, 52000000, 90],
    ["West London Blues", "CHE", "#2563eb", "#ffffff", "stripes", "Stamford Ground", 42000, 58000000, 86],
    ["Manchester Devils", "MUN", "#b91c1c", "#111827", "sash", "Trafford Stadium", 74000, 62000000, 87],
    ["Tyneside United", "NEW", "#1e293b", "#f8fafc", "stripes", "St James Arena", 52000, 48000000, 84],
    ["Midlands Villa", "AVL", "#7c2d12", "#38bdf8", "hoops", "Villa Fortress", 43000, 40000000, 83],
    ["North London Lily", "TOT", "#f8fafc", "#1e3a8a", "sash", "Hotspur Bowl", 62000, 46000000, 84],
    ["East London Irons", "WHU", "#7f1d1d", "#0284c7", "stripes", "Olympic Field", 60000, 32000000, 79],
    ["Sussex Seagulls", "BHA", "#0284c7", "#f8fafc", "stripes", "Amex Coast", 32000, 30000000, 78],
    ["Mersey Toffees", "EVE", "#1d4ed8", "#ffffff", "hoops", "Bramley Dock", 52000, 24000000, 76],
    ["Midlands Wolves", "WOL", "#f59e0b", "#111827", "sash", "Molineux Ground", 31000, 22000000, 75],
    // League 2 (12 Teams)
    ["Yorkshire Whites", "LEE", "#f8fafc", "#eab308", "sash", "Elland Road", 37000, 18000000, 74],
    ["South Coast Saints", "SOU", "#ef4444", "#111827", "stripes", "St Marys", 32000, 16000000, 73],
    ["East Midlands Foxes", "LEI", "#1d4ed8", "#facc15", "hoops", "King Power", 32000, 17000000, 74],
    ["Burnley Clarets", "BUR", "#7f1d1d", "#38bdf8", "sash", "Turf Moor", 22000, 14000000, 72],
    ["Steel City Blades", "SHU", "#dc2626", "#f8fafc", "stripes", "Bramall Lane", 32000, 13000000, 71],
    ["Wearside Black Cats", "SUN", "#ef4444", "#090d16", "stripes", "Stadium of Light", 48000, 13500000, 72],
    ["Norfolk Canaries", "NOR", "#eab308", "#16a34a", "hoops", "Carrow Park", 27000, 12000000, 70],
    ["Teesside Boro", "MID", "#dc2626", "#ffffff", "hoops", "Riverside", 34000, 11500000, 70],
    ["West Bromwich", "WBA", "#1e3a8a", "#ffffff", "stripes", "The Hawthorns", 26000, 11000000, 69],
    ["Coventry Sky", "COV", "#38bdf8", "#1e293b", "sash", " Coventry Arena", 32000, 10000000, 68],
    ["Ipswich Tractor", "IPS", "#2563eb", "#ffffff", "stripes", "Portman Road", 30000, 11000000, 69],
    ["Watford Hornets", "WAT", "#facc15", "#dc2626", "hoops", "Vicarage Road", 22000, 10500000, 68]
  ];

  const teams = [];
  const players = [];
  const positions = [
    "GK", "GK",
    "DEF", "DEF", "DEF", "DEF", "DEF", "DEF",
    "MID", "MID", "MID", "MID", "MID", "MID",
    "FWD", "FWD", "FWD", "FWD"
  ];

  clubTemplates.forEach((tpl, idx) => {
    const isLg1 = idx < 12;
    const lgId = isLg1 ? "lg_1" : "lg_2";
    const tId = `team_${idx + 1}`;
    const squadIds = [];
    positions.forEach((pos) => {
      const p = generatePlayer(tId, pos, pick(["England", "Spain", "Algeria", "Brazil", "France"]), isLg1 ? 6 : -2);
      players.push(p);
      squadIds.push(p.id);
    });
    teams.push({
      id: tId,
      name: tpl[0],
      shortName: tpl[1],
      leagueId: lgId,
      country: "England",
      primaryColor: tpl[2],
      secondaryColor: tpl[3],
      kitPattern: tpl[4],
      stadiumName: tpl[5],
      stadiumCapacity: tpl[6],
      budget: tpl[7],
      wageBudget: Math.round(tpl[7] * 0.03),
      reputation: tpl[8],
      rivals: idx % 2 === 0 ? `team_${idx + 2}` : `team_${idx}`,
      customLogoData: null,
      facilitiesLevel: isLg1 ? 4 : 2,
      youthLevel: isLg1 ? 4 : 2,
      lineup: squadIds.slice(0, 11),
      bench: squadIds.slice(11, 18),
      tactics: {
        formation: "4-3-3",
        mentality: "Attacking",
        pressing: "High",
        width: "Wide",
        tempo: "Fast",
        playmakerRole: "Advanced Playmaker",
        captainId: squadIds[2],
        fkTakerId: squadIds[8],
        penTakerId: squadIds[14],
        savedPresets: []
      },
      training: { focus: "Balanced", intensity: "Medium" },
      financesHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => rInt(-500000, 1800000)),
      sponsorIncome: isLg1 ? 18000000 : 6000000,
      stats: { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, form: [] }
    });
  });

  // Generate 25 Free Agents
  for (let i = 0; i < 25; i++) {
    players.push(generatePlayer("FREE", pick(["GK", "DEF", "MID", "FWD"]), pick(["England", "Spain", "Algeria", "Brazil", "France"]), 0));
  }

  const staff = [
    { id: "st_1", name: "Marco Conti", role: "Assistant Manager", rating: 82, wage: 14000, teamId: "team_1" },
    { id: "st_2", name: "Karim Belkacem", role: "Chief Scout", rating: 85, wage: 12000, teamId: "team_1" },
    { id: "st_3", name: "Dr. Elena Vance", role: "Head Physio", rating: 84, wage: 11000, teamId: "team_1" },
    { id: "st_4", name: "Lucas Silva", role: "Youth Director", rating: 80, wage: 10000, teamId: "FREE" },
    { id: "st_5", name: "David Sterling", role: "Tactical Coach", rating: 86, wage: 15000, teamId: "FREE" },
    { id: "st_6", name: "Tariq Mansouri", role: "Chief Scout", rating: 88, wage: 16000, teamId: "FREE" }
  ];

  const lg1Teams = teams.filter(t => t.leagueId === "lg_1").map(t => t.id);
  const lg2Teams = teams.filter(t => t.leagueId === "lg_2").map(t => t.id);
  const fixtures = [
    ...generateRoundRobinFixtures(lg1Teams, "lg_1"),
    ...generateRoundRobinFixtures(lg2Teams, "lg_2")
  ];

  // Knockout Cup Bracket (Round of 16 using top 16 teams)
  const cupMatches = [];
  for (let i = 0; i < 16; i += 2) {
    cupMatches.push({
      id: uid("cup"),
      round: "Round of 16",
      homeId: teams[i].id,
      awayId: teams[i + 1].id,
      played: false,
      homeGoals: 0,
      awayGoals: 0,
      winnerId: null
    });
  }

  return {
    meta: {
      dbName: "Default 2026 World Database",
      version: "1.0",
      currency: "€",
      maxSquadSize: 25,
      transferWindowOpen: true,
      ageMin: 15,
      ageMax: 42
    },
    manager: {
      name: "Alex Ferguson Jr.",
      nationality: "Algeria",
      clubId: "team_1",
      difficulty: "Normal",
      boardConfidence: 85,
      trophies: [],
      seasonHistory: []
    },
    season: 2026,
    week: 1,
    leagues,
    teams,
    players,
    staff,
    fixtures,
    cupMatches,
    shortlist: [],
    youthCandidates: [
      generatePlayer("YOUTH", "MID", "Algeria", -6),
      generatePlayer("YOUTH", "FWD", "England", -5),
      generatePlayer("YOUTH", "DEF", "France", -7)
    ],
    inbox: [
      { id: uid("msg"), week: 1, category: "Board", title: "Welcome to the Club!", body: "The Board expects a strong campaign. Review your squad, set your tactics, and prepare for Matchday 1.", read: false },
      { id: uid("msg"), week: 1, category: "Scouting", title: "Transfer Window Open", body: "Our scouts have identified top targets in the Transfer Market and Free Agency.", read: false }
    ],
    mediaLibrary: {},
    backups: []
  };
}

function saveState() {
  if (!state) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Storage full or restricted", e);
  }
}

function pushUndoSnapshot() {
  if (!state) return;
  undoStack.push(JSON.stringify(state));
  if (undoStack.length > 8) undoStack.shift();
  redoStack = [];
}

function getUserTeam() {
  return state.teams.find(t => t.id === state.manager.clubId) || state.teams[0];
}

function getTeamById(id) {
  return state.teams.find(t => t.id === id) || { name: "Free Agent", shortName: "FA", primaryColor: "#64748b", secondaryColor: "#1e293b" };
}

function getTeamPlayers(teamId) {
  return state.players.filter(p => p.teamId === teamId);
}

function formatMoney(n) {
  const cur = (state && state.meta && state.meta.currency) || "€";
  if (Math.abs(n) >= 1000000) return cur + (n / 1000000).toFixed(2) + "M";
  if (Math.abs(n) >= 1000) return cur + Math.round(n / 1000) + "K";
  return cur + n;
}

/* NAVIGATION & RENDERING */
const NAV_CONFIG = {
  menu: { label: "Menu", icon: "🏠", tabs: ["home", "new_game", "load_save", "settings"] },
  dashboard: { label: "Home", icon: "📊", tabs: ["overview", "inbox", "staff", "youth", "facilities", "board", "season_summary"] },
  squad: { label: "Squad", icon: "👕", tabs: ["list", "lineup", "tactics", "training", "profile"] },
  matches: { label: "Match", icon: "⚽", tabs: ["fixtures", "pre_match", "live_match", "post_match"] },
  competitions: { label: "League", icon: "🏆", tabs: ["table", "cups", "stats_awards"] },
  transfers: { label: "Market", icon: "💼", tabs: ["market", "scouting", "negotiations", "contracts", "finances"] },
  editor: { label: "Editor", icon: "🛠️", tabs: ["ed_home", "ed_teams", "ed_players", "ed_leagues", "ed_media", "ed_import_export", "ed_extras"] }
};

function setSection(sec, tab) {
  currentSection = sec;
  currentSubTab = tab || NAV_CONFIG[sec].tabs[0];
  renderApp();
}

function renderApp() {
  if (!state) {
    const saved = localStorage.getItem(STORAGE_KEY);
    state = saved ? JSON.parse(saved) : buildStarterDatabase();
  }
  const userTeam = getUserTeam();
  document.getElementById("hdr-club").innerHTML = `${render2DCrestSVG(userTeam, 22)} ${userTeam.name}`;
  document.getElementById("hdr-date").textContent = `Season ${state.season} • Week ${state.week} • ${formatMoney(userTeam.budget)} • Conf: ${state.manager.boardConfidence}%`;

  const hdrBtns = document.getElementById("hdr-btns");
  hdrBtns.innerHTML = `
    <button class="btn btn-sec" onclick="setSection('menu','home')">Menu</button>
    <button class="btn" onclick="advanceWeek()">Advance ▶</button>
  `;

  // Sub-tabs
  const subTabsEl = document.getElementById("sub-tabs");
  const tabs = NAV_CONFIG[currentSection].tabs;
  subTabsEl.innerHTML = tabs.map(t => {
    const nice = t.replace(/^ed_/, "").replace(/_/g, " ").toUpperCase();
    return `<div class="tab-chip ${t === currentSubTab ? 'active' : ''}" onclick="setSection('${currentSection}','${t}')">${nice}</div>`;
  }).join("");

  // Bottom Nav
  const bNav = document.getElementById("bottom-nav");
  bNav.innerHTML = Object.keys(NAV_CONFIG).map(k => {
    const item = NAV_CONFIG[k];
    return `<div class="nav-item ${k === currentSection ? 'active' : ''}" onclick="setSection('${k}')">
      <span class="nav-icon">${item.icon}</span>${item.label}
    </div>`;
  }).join("");

  // Main View Router
  const view = document.getElementById("app-view");
  view.innerHTML = renderCurrentTab();
}

function renderCurrentTab() {
  const userTeam = getUserTeam();
  switch (currentSubTab) {
    case "home": return renderMainMenu();
    case "new_game": return renderNewGameSetup();
    case "load_save": return renderSaveLoadSlots();
    case "settings": return renderSettings();
    case "overview": return renderDashboard(userTeam);
    case "inbox": return renderInbox();
    case "staff": return renderStaff(userTeam);
    case "youth": return renderYouthAcademy(userTeam);
    case "facilities": return renderFacilities(userTeam);
    case "board": return renderBoardObjectives(userTeam);
    case "season_summary": return renderSeasonSummary();
    case "list": return renderSquadList(userTeam);
    case "lineup": return renderLineupBench(userTeam);
    case "tactics": return renderTactics(userTeam);
    case "training": return renderTraining(userTeam);
    case "profile": return renderPlayerProfile();
    case "fixtures": return renderFixtures(userTeam);
    case "pre_match": return renderPreMatch(userTeam);
    case "live_match": return renderLiveMatch(userTeam);
    case "post_match": return renderPostMatch();
    case "table": return renderLeagueTable(userTeam);
    case "cups": return renderCups();
    case "stats_awards": return renderStatsAwards();
    case "market": return renderTransferMarket(userTeam);
    case "scouting": return renderScouting(userTeam);
    case "negotiations": return renderNegotiations(userTeam);
    case "contracts": return renderContracts(userTeam);
    case "finances": return renderFinances(userTeam);
    case "ed_home": return renderEditorHome();
    case "ed_teams": return renderEditorTeams();
    case "ed_players": return renderEditorPlayers();
    case "ed_leagues": return renderEditorLeaguesRules();
    case "ed_media": return renderEditorMedia();
    case "ed_import_export": return renderEditorImportExport();
    case "ed_extras": return renderEditorExtras();
    default: return renderDashboard(userTeam);
  }
}

/* 1. MAIN MENU, NEW GAME, SAVE/LOAD, SETTINGS */
function renderMainMenu() {
  return `
    <div class="card" style="text-align:center;padding:22px 14px;">
      <div style="font-size:24px;font-weight:900;color:var(--accent);">FM DYNASTY MANAGER 26</div>
      <div style="font-size:12px;color:var(--muted);margin:6px 0 16px;">Complete Offline Mobile Football Management & Built-In Database Studio</div>
      <button class="btn btn-block" onclick="setSection('dashboard','overview')">▶ Continue Career (${getUserTeam().name})</button>
      <button class="btn btn-blue btn-block" onclick="setSection('menu','new_game')">➕ New Career Setup</button>
      <button class="btn btn-sec btn-block" onclick="setSection('menu','load_save')">💾 Save / Load Slots</button>
      <button class="btn btn-warn btn-block" onclick="setSection('editor','ed_home')">🛠️ Built-In Database & Media Editor</button>
      <button class="btn btn-sec btn-block" onclick="setSection('menu','settings')">⚙️ System Settings</button>
    </div>
  `;
}

function renderNewGameSetup() {
  return `
    <div class="card">
      <div class="card-title">New Career Setup</div>
      <label>Manager Name</label>
      <input id="ng-name" value="${state.manager.name}" />
      <label>Nationality</label>
      <select id="ng-nat">
        ${Object.keys(FAKE_NAMES).map(n => `<option value="${n}" ${state.manager.nationality === n ? 'selected' : ''}>${n}</option>`).join("")}
      </select>
      <label>Select Club (${state.teams.length} Clubs Available)</label>
      <select id="ng-club">
        ${state.teams.map(t => `<option value="${t.id}" ${t.id === state.manager.clubId ? 'selected' : ''}>${t.name} (${t.leagueId === 'lg_1' ? 'Tier 1' : 'Tier 2'} - Budget: ${formatMoney(t.budget)})</option>`).join("")}
      </select>
      <label>Difficulty</label>
      <select id="ng-diff">
        <option value="Easy">Easy (Generous Board & High Budget)</option>
        <option value="Normal" selected>Normal (Balanced Simulation)</option>
        <option value="Hard">Hard (Strict Board & Tough AI)</option>
      </select>
      <button class="btn btn-block" onclick="startNewCareer()">Start Career</button>
    </div>
  `;
}

function startNewCareer() {
  const name = document.getElementById("ng-name").value || "Manager";
  const nat = document.getElementById("ng-nat").value;
  const clubId = document.getElementById("ng-club").value;
  const diff = document.getElementById("ng-diff").value;
  state = buildStarterDatabase();
  state.manager.name = name;
  state.manager.nationality = nat;
  state.manager.clubId = clubId;
  state.manager.difficulty = diff;
  saveState();
  setSection("dashboard", "overview");
}

function renderSaveLoadSlots() {
  const raw = localStorage.getItem(DB_SLOTS_KEY);
  const slots = raw ? JSON.parse(raw) : {};
  return `
    <div class="card">
      <div class="card-title">Save / Load Career Slots</div>
      ${[1, 2, 3].map(slot => {
        const info = slots["slot_" + slot];
        return `<div class="card" style="background:var(--card-alt);">
          <div class="row-between">
            <div>
              <div style="font-weight:700;">Slot ${slot}: ${info ? info.clubName : 'Empty Slot'}</div>
              <div style="font-size:11px;color:var(--muted);">${info ? `Season ${info.season} Wk ${info.week} • Saved ${info.date}` : 'No data saved'}</div>
            </div>
            <div style="display:flex;gap:5px;">
              <button class="btn" onclick="saveToSlot(${slot})">Save</button>
              ${info ? `<button class="btn btn-blue" onclick="loadFromSlot(${slot})">Load</button>` : ''}
            </div>
          </div>
        </div>`;
      }).join("")}
    </div>
  `;
}

function saveToSlot(slot) {
  const raw = localStorage.getItem(DB_SLOTS_KEY);
  const slots = raw ? JSON.parse(raw) : {};
  slots["slot_" + slot] = {
    clubName: getUserTeam().name,
    season: state.season,
    week: state.week,
    date: new Date().toLocaleTimeString(),
    data: state
  };
  localStorage.setItem(DB_SLOTS_KEY, JSON.stringify(slots));
  renderApp();
}

function loadFromSlot(slot) {
  const raw = localStorage.getItem(DB_SLOTS_KEY);
  const slots = raw ? JSON.parse(raw) : {};
  if (slots["slot_" + slot]) {
    state = slots["slot_" + slot].data;
    saveState();
    setSection("dashboard", "overview");
  }
}

function renderSettings() {
  return `
    <div class="card">
      <div class="card-title">System & Currency Settings</div>
      <label>Currency Symbol</label>
      <select onchange="state.meta.currency=this.value;saveState();renderApp();">
        ${["€", "£", "$"].map(c => `<option value="${c}" ${state.meta.currency === c ? 'selected' : ''}>${c}</option>`).join("")}
      </select>
      <button class="btn btn-danger btn-block" onclick="localStorage.clear();state=buildStarterDatabase();renderApp();">Reset All App Storage to Factory Default</button>
    </div>
  `;
}

/* 2. DASHBOARD, INBOX, STAFF, YOUTH, FACILITIES, BOARD */
function renderDashboard(team) {
  const nextFix = state.fixtures.find(f => !f.played && (f.homeId === team.id || f.awayId === team.id));
  const opp = nextFix ? getTeamById(nextFix.homeId === team.id ? nextFix.awayId : nextFix.homeId) : null;
  const injured = getTeamPlayers(team.id).filter(p => p.injuredWeeks > 0);

  return `
    <div class="card">
      <div class="card-title">Next Matchday (Week ${state.week})</div>
      ${nextFix ? `
        <div class="row-between" style="padding:8px 0;">
          <div style="text-align:center;flex:1;">
            ${render2DCrestSVG(team, 42)}
            <div style="font-weight:700;font-size:13px;margin-top:4px;">${team.name}</div>
          </div>
          <div style="font-weight:900;font-size:16px;color:var(--accent);">VS</div>
          <div style="text-align:center;flex:1;">
            ${render2DCrestSVG(opp, 42)}
            <div style="font-weight:700;font-size:13px;margin-top:4px;">${opp.name}</div>
          </div>
        </div>
        <button class="btn btn-block" onclick="setSection('matches','pre_match')">⚽ Go to Pre-Match & Play</button>
      ` : `<div>Season fixtures complete! Advance week to trigger end-of-season ceremony.</div>`}
    </div>

    <div class="grid-3" style="margin-bottom:10px;">
      <div class="stat-box">
        <div class="stat-val">${formatMoney(team.budget)}</div>
        <div class="stat-lbl">Transfer Budget</div>
      </div>
      <div class="stat-box">
        <div class="stat-val">${state.manager.boardConfidence}%</div>
        <div class="stat-lbl">Board Mood</div>
      </div>
      <div class="stat-box">
        <div class="stat-val">${team.stats.form.slice(-5).join("") || "-----"}</div>
        <div class="stat-lbl">Recent Form</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Club Snapshot & Tasks</div>
      <div style="font-size:12px;color:var(--muted);line-height:1.6;">
        • Injured Players: <strong style="color:var(--text);">${injured.length}</strong><br/>
        • Training Focus: <strong style="color:var(--text);">${team.training.focus} (${team.training.intensity})</strong><br/>
        • Unread Inbox Messages: <strong style="color:var(--accent);">${state.inbox.filter(m => !m.read).length}</strong>
      </div>
    </div>
  `;
}

function renderInbox() {
  return `
    <div class="card">
      <div class="card-title">Club Inbox (${state.inbox.length})</div>
      ${state.inbox.slice().reverse().map(m => `
        <div class="card" style="background:var(--card-alt);" onclick="m.read=true;saveState();">
          <div class="row-between">
            <span class="badge">${m.category} • Wk ${m.week}</span>
            <button class="btn btn-sec" style="padding:3px 8px;" onclick="setSection('transfers','market')">Action</button>
          </div>
          <div style="font-weight:700;margin:5px 0 3px;">${m.title}</div>
          <div style="font-size:12px;color:var(--muted);">${m.body}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderStaff(team) {
  const clubStaff = state.staff.filter(s => s.teamId === team.id);
  const freeStaff = state.staff.filter(s => s.teamId === "FREE");
  return `
    <div class="card">
      <div class="card-title">Current Club Staff</div>
      ${clubStaff.map(s => `
        <div class="row-between" style="padding:6px 0;border-bottom:1px solid #1e293b;">
          <div>
            <div style="font-weight:700;">${s.name} <span class="badge">${s.role}</span></div>
            <div style="font-size:11px;color:var(--muted);">Rating: ${s.rating} • Wage: ${formatMoney(s.wage)}/wk</div>
          </div>
          <button class="btn btn-danger" onclick="fireStaff('${s.id}')">Fire</button>
        </div>
      `).join("")}
    </div>
    <div class="card">
      <div class="card-title">Available Staff Market</div>
      ${freeStaff.map(s => `
        <div class="row-between" style="padding:6px 0;border-bottom:1px solid #1e293b;">
          <div>
            <div style="font-weight:700;">${s.name} <span class="badge">${s.role}</span></div>
            <div style="font-size:11px;color:var(--muted);">Rating: ${s.rating} • Wage: ${formatMoney(s.wage)}/wk</div>
          </div>
          <button class="btn" onclick="hireStaff('${s.id}')">Hire</button>
        </div>
      `).join("")}
    </div>
  `;
}

function hireStaff(id) {
  const s = state.staff.find(x => x.id === id);
  if (s) s.teamId = getUserTeam().id;
  saveState();
  renderApp();
}

function fireStaff(id) {
  const s = state.staff.find(x => x.id === id);
  if (s) s.teamId = "FREE";
  saveState();
  renderApp();
}

function renderYouthAcademy(team) {
  return `
    <div class="card">
      <div class="card-title">Youth Academy (Level ${team.youthLevel}/5)</div>
      ${state.youthCandidates.map(p => `
        <div class="row-between" style="padding:8px 0;border-bottom:1px solid #1e293b;">
          <div>
            <div style="font-weight:700;"><span class="pos-${p.pos}">${p.pos}</span> ${p.name} (Age ${p.age})</div>
            <div style="font-size:11px;color:var(--muted);">OVR: ${p.ovr} • Potential: ${p.pot} • ${p.nationality}</div>
          </div>
          <button class="btn" onclick="promoteYouth('${p.id}')">Promote</button>
        </div>
      `).join("")}
    </div>
  `;
}

function promoteYouth(id) {
  const idx = state.youthCandidates.findIndex(p => p.id === id);
  if (idx > -1) {
    const p = state.youthCandidates.splice(idx, 1)[0];
    p.teamId = getUserTeam().id;
    state.players.push(p);
    getUserTeam().bench.push(p.id);
    saveState();
    renderApp();
  }
}

function renderFacilities(team) {
  return `
    <div class="card">
      <div class="card-title">Stadium & Club Facilities</div>
      <div style="font-size:13px;margin-bottom:10px;">
        <strong>${team.stadiumName}</strong> • Capacity: ${team.stadiumCapacity.toLocaleString()} seats<br/>
        Training Facilities: Level ${team.facilitiesLevel}/5 • Youth Recruitment: Level ${team.youthLevel}/5
      </div>
      <button class="btn btn-block" onclick="upgradeFacility('stadium')">🏟️ Expand Stadium (+5,000 Seats - €4.5M)</button>
      <button class="btn btn-blue btn-block" onclick="upgradeFacility('training')">🏋️ Upgrade Training Center (€3.0M)</button>
      <button class="btn btn-sec btn-block" onclick="upgradeFacility('youth')">🌱 Upgrade Youth Academy (€2.5M)</button>
    </div>
  `;
}

function upgradeFacility(type) {
  const team = getUserTeam();
  if (type === "stadium" && team.budget >= 4500000) {
    team.budget -= 4500000;
    team.stadiumCapacity += 5000;
  } else if (type === "training" && team.budget >= 3000000 && team.facilitiesLevel < 5) {
    team.budget -= 3000000;
    team.facilitiesLevel++;
  } else if (type === "youth" && team.budget >= 2500000 && team.youthLevel < 5) {
    team.budget -= 2500000;
    team.youthLevel++;
  }
  saveState();
  renderApp();
}

function renderBoardObjectives(team) {
  return `
    <div class="card">
      <div class="card-title">Board Confidence & Job Market</div>
      <div style="margin-bottom:10px;">
        Board Confidence: <strong>${state.manager.boardConfidence}%</strong>
        <div class="progress-bar"><div class="progress-fill" style="width:${state.manager.boardConfidence}%"></div></div>
      </div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:12px;">
        • Primary Objective: Finish Top 4 in ${team.leagueId === 'lg_1' ? 'Premier Division' : 'Championship'}<br/>
        • Financial Objective: Keep positive transfer balance
      </div>
      <div class="card-title">Job Market (Apply to Switch Club)</div>
      ${state.teams.slice(0, 6).map(t => `
        <div class="row-between" style="padding:5px 0;border-bottom:1px solid #1e293b;">
          <div>${render2DCrestSVG(t, 20)} <strong>${t.name}</strong> (Rep: ${t.reputation})</div>
          <button class="btn btn-sec" onclick="state.manager.clubId='${t.id}';saveState();renderApp();">Take Job</button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderSeasonSummary() {
  return `
    <div class="card">
      <div class="card-title">Dynasty History & Trophy Cabinet</div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:8px;">Trophies Won: ${state.manager.trophies.length ? state.manager.trophies.join(", ") : "None yet — complete a season!"}</div>
      ${state.manager.seasonHistory.map(h => `
        <div class="card" style="background:var(--card-alt);">
          <strong>Season ${h.season}</strong> • Champion: ${h.champion} • Cup Winner: ${h.cupWinner}
        </div>
      `).join("")}
    </div>
  `;
}

/* 3. SQUAD, PLAYER PROFILE (RADAR CHART), LINEUP, TACTICS, TRAINING */
let squadPosFilter = "ALL";
let squadSortBy = "ovr";

function renderSquadList(team) {
  let list = getTeamPlayers(team.id);
  if (squadPosFilter !== "ALL") list = list.filter(p => p.pos === squadPosFilter);
  list.sort((a, b) => b[squadSortBy] - a[squadSortBy]);

  return `
    <div class="card">
      <div class="row-between" style="margin-bottom:8px;">
        <select style="margin:0;" onchange="squadPosFilter=this.value;renderApp();">
          <option value="ALL" ${squadPosFilter === 'ALL' ? 'selected' : ''}>All Positions</option>
          <option value="GK" ${squadPosFilter === 'GK' ? 'selected' : ''}>GK</option>
          <option value="DEF" ${squadPosFilter === 'DEF' ? 'selected' : ''}>DEF</option>
          <option value="MID" ${squadPosFilter === 'MID' ? 'selected' : ''}>MID</option>
          <option value="FWD" ${squadPosFilter === 'FWD' ? 'selected' : ''}>FWD</option>
        </select>
        <select style="margin:0;" onchange="squadSortBy=this.value;renderApp();">
          <option value="ovr" ${squadSortBy === 'ovr' ? 'selected' : ''}>Sort: OVR</option>
          <option value="value" ${squadSortBy === 'value' ? 'selected' : ''}>Sort: Value</option>
          <option value="age" ${squadSortBy === 'age' ? 'selected' : ''}>Sort: Age</option>
        </select>
      </div>
      <table>
        <thead><tr><th>Pos</th><th>Player</th><th>Age</th><th>OVR</th><th>Morale</th><th>Value</th></tr></thead>
        <tbody>
          ${list.map(p => `
            <tr onclick="selectedPlayerId='${p.id}';setSection('squad','profile');" style="cursor:pointer;">
              <td><span class="pos-${p.pos}">${p.pos}</span></td>
              <td><strong>${p.name}</strong> ${p.injuredWeeks > 0 ? '🚑' : ''} ${p.transferListed ? '🏷️' : ''}</td>
              <td>${p.age}</td>
              <td><span class="badge">${p.ovr}</span></td>
              <td>${p.morale}%</td>
              <td>${formatMoney(p.value)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderRadarSVG(attr) {
  const keys = ["pac", "sho", "pas", "dri", "def", "phy"];
  const labels = ["PAC", "SHO", "PAS", "DRI", "DEF", "PHY"];
  const cx = 90, cy = 90, r = 64;
  const pts = keys.map((k, i) => {
    const angle = (Math.PI * 2 * i) / keys.length - Math.PI / 2;
    const val = (attr[k] || 60) / 100;
    const x = cx + Math.cos(angle) * r * val;
    const y = cy + Math.sin(angle) * r * val;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const axisLines = labels.map((lbl, i) => {
    const angle = (Math.PI * 2 * i) / keys.length - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    const lx = cx + Math.cos(angle) * (r + 16);
    const ly = cy + Math.sin(angle) * (r + 16);
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#334155" stroke-width="1"/>
            <text x="${lx}" y="${ly + 3}" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="700">${lbl} ${attr[keys[i]]}</text>`;
  }).join("");

  return `<svg width="180" height="180" viewBox="0 0 180 180">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#1e293b" stroke-width="1"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.66}" fill="none" stroke="#1e293b" stroke-width="1"/>
    ${axisLines}
    <polygon points="${pts}" fill="rgba(16,185,129,0.35)" stroke="#10b981" stroke-width="2"/>
  </svg>`;
}

function renderPlayerProfile() {
  const p = state.players.find(x => x.id === selectedPlayerId) || getTeamPlayers(getUserTeam().id)[0];
  if (!p) return `<div class="card">No player selected.</div>`;
  return `
    <div class="card">
      <div class="row-between">
        <div>
          <div style="font-size:17px;font-weight:800;">${p.name} <span class="badge">${p.ovr} OVR / ${p.pot} POT</span></div>
          <div style="font-size:11px;color:var(--muted);">${p.pos} • ${p.nationality} • Age ${p.age} • ${p.foot} Foot</div>
        </div>
      </div>
      <div style="text-align:center;margin:8px 0;">
        ${renderRadarSVG(p.attr)}
      </div>
      <div class="grid-3" style="margin-bottom:10px;">
        <div class="stat-box"><div class="stat-val">${formatMoney(p.value)}</div><div class="stat-lbl">Market Value</div></div>
        <div class="stat-box"><div class="stat-val">${formatMoney(p.wage)}/wk</div><div class="stat-lbl">Wage (${p.contractYears}y)</div></div>
        <div class="stat-box"><div class="stat-val">${p.stats.goals}G / ${p.stats.assists}A</div><div class="stat-lbl">Season Stats</div></div>
      </div>
      <div class="grid-2">
        <button class="btn btn-sec" onclick="p_toggleTransfer('${p.id}')">${p.transferListed ? 'Remove from Transfer List' : '🏷️ Transfer List'}</button>
        <button class="btn btn-sec" onclick="p_toggleLoan('${p.id}')">${p.loanListed ? 'Remove from Loan List' : '📋 Loan List'}</button>
      </div>
    </div>
  `;
}

function p_toggleTransfer(id) {
  const p = state.players.find(x => x.id === id);
  if (p) p.transferListed = !p.transferListed;
  saveState();
  renderApp();
}

function p_toggleLoan(id) {
  const p = state.players.find(x => x.id === id);
  if (p) p.loanListed = !p.loanListed;
  saveState();
  renderApp();
}

function renderLineupBench(team) {
  const starters = team.lineup.map(id => state.players.find(p => p.id === id)).filter(Boolean);
  const subs = team.bench.map(id => state.players.find(p => p.id === id)).filter(Boolean);
  return `
    <div class="card">
      <div class="card-title">Starting XI (Tap 2 players to swap)</div>
      ${starters.map(p => `
        <div class="row-between" style="padding:6px;background:${selectedBenchSwapId === p.id ? '#064e3b' : 'transparent'};border-bottom:1px solid #1e293b;" onclick="swapLineupPlayer('${p.id}')">
          <div><span class="pos-${p.pos}">${p.pos}</span> <strong>${p.name}</strong></div>
          <div><span class="badge">OVR ${p.ovr}</span> Fit ${p.fitness}%</div>
        </div>
      `).join("")}
    </div>
    <div class="card">
      <div class="card-title">Substitutes Bench</div>
      ${subs.map(p => `
        <div class="row-between" style="padding:6px;background:${selectedBenchSwapId === p.id ? '#064e3b' : 'transparent'};border-bottom:1px solid #1e293b;" onclick="swapLineupPlayer('${p.id}')">
          <div><span class="pos-${p.pos}">${p.pos}</span> <strong>${p.name}</strong></div>
          <div><span class="badge">OVR ${p.ovr}</span> Fit ${p.fitness}%</div>
        </div>
      `).join("")}
    </div>
  `;
}

function swapLineupPlayer(id) {
  if (!selectedBenchSwapId) {
    selectedBenchSwapId = id;
    renderApp();
    return;
  }
  const team = getUserTeam();
  const all = [...team.lineup, ...team.bench];
  const i1 = all.indexOf(selectedBenchSwapId);
  const i2 = all.indexOf(id);
  if (i1 > -1 && i2 > -1) {
    const tmp = all[i1];
    all[i1] = all[i2];
    all[i2] = tmp;
    team.lineup = all.slice(0, 11);
    team.bench = all.slice(11);
  }
  selectedBenchSwapId = null;
  saveState();
  renderApp();
}

const FORMATION_COORDS = {
  "4-3-3": [[50,88], [18,70],[38,72],[62,72],[82,70], [28,48],[50,52],[72,48], [22,22],[50,18],[78,22]],
  "4-4-2": [[50,88], [18,70],[38,72],[62,72],[82,70], [18,46],[38,48],[62,48],[82,46], [35,20],[65,20]],
  "3-5-2": [[50,88], [26,72],[50,74],[74,72], [15,48],[33,50],[50,44],[67,50],[85,48], [35,20],[65,20]]
};

function renderTactics(team) {
  const tac = team.tactics;
  const coords = FORMATION_COORDS[tac.formation] || FORMATION_COORDS["4-3-3"];
  const starters = team.lineup.map(id => state.players.find(p => p.id === id)).filter(Boolean);

  return `
    <div class="card">
      <div class="card-title">Interactive Pitch & Formation (${tac.formation})</div>
      <div class="pitch">
        <div class="pitch-line-mid"></div>
        <div class="pitch-circle"></div>
        ${starters.slice(0, 11).map((p, idx) => {
          const [x, y] = coords[idx] || [50, 50];
          return `<div class="pitch-node" style="left:${x}%;top:${y}%;" onclick="selectedPlayerId='${p.id}';setSection('squad','profile')">
            <span>${p.ovr}</span>
            <span style="font-size:7px;color:var(--muted);">${p.name.split(' ').pop().substring(0, 5)}</span>
          </div>`;
        }).join("")}
      </div>
      <div class="grid-2">
        <div>
          <label>Formation</label>
          <select onchange="getUserTeam().tactics.formation=this.value;saveState();renderApp();">
            ${["4-3-3", "4-4-2", "3-5-2"].map(f => `<option value="${f}" ${tac.formation === f ? 'selected' : ''}>${f}</option>`).join("")}
          </select>
        </div>
        <div>
          <label>Mentality</label>
          <select onchange="getUserTeam().tactics.mentality=this.value;saveState();renderApp();">
            ${["Defensive", "Balanced", "Attacking", "All-Out Attack"].map(m => `<option value="${m}" ${tac.mentality === m ? 'selected' : ''}>${m}</option>`).join("")}
          </select>
        </div>
        <div>
          <label>Pressing</label>
          <select onchange="getUserTeam().tactics.pressing=this.value;saveState();renderApp();">
            ${["Low Block", "Mid Block", "High", "Gegenpress"].map(m => `<option value="${m}" ${tac.pressing === m ? 'selected' : ''}>${m}</option>`).join("")}
          </select>
        </div>
        <div>
          <label>Tempo & Width</label>
          <select onchange="getUserTeam().tactics.tempo=this.value;saveState();renderApp();">
            ${["Slow & Narrow", "Standard", "Fast", "Fast & Wide"].map(m => `<option value="${m}" ${tac.tempo === m ? 'selected' : ''}>${m}</option>`).join("")}
          </select>
        </div>
      </div>
      <button class="btn btn-sec btn-block" onclick="saveTacticPreset()">💾 Save Current Tactic Preset</button>
    </div>
  `;
}

function saveTacticPreset() {
  const t = getUserTeam().tactics;
  t.savedPresets.push({ name: `${t.formation} ${t.mentality}`, formation: t.formation, mentality: t.mentality });
  saveState();
  alert("Tactic preset saved!");
}

function renderTraining(team) {
  return `
    <div class="card">
      <div class="card-title">Team Training Schedule</div>
      <label>Weekly Focus</label>
      <select onchange="getUserTeam().training.focus=this.value;saveState();renderApp();">
        ${["Balanced", "Attacking & Shooting", "Defending & Tactical", "Speed & Fitness", "Youth Development"].map(f => `<option value="${f}" ${team.training.focus === f ? 'selected' : ''}>${f}</option>`).join("")}
      </select>
      <label>Training Intensity</label>
      <select onchange="getUserTeam().training.intensity=this.value;saveState();renderApp();">
        ${["Light (Recover Fitness)", "Medium", "Heavy (Faster Attribute Growth)"].map(i => `<option value="${i}" ${team.training.intensity === i ? 'selected' : ''}>${i}</option>`).join("")}
      </select>
    </div>
  `;
}

/* 4. MATCHES: FIXTURES, PRE-MATCH, LIVE MATCH ENGINE, POST-MATCH */
function renderFixtures(team) {
  const myFix = state.fixtures.filter(f => f.homeId === team.id || f.awayId === team.id);
  return `
    <div class="card">
      <div class="card-title">Club Fixtures & Results</div>
      <table>
        <thead><tr><th>Wk</th><th>Home</th><th>Score</th><th>Away</th></tr></thead>
        <tbody>
          ${myFix.map(f => {
            const h = getTeamById(f.homeId);
            const a = getTeamById(f.awayId);
            return `<tr>
              <td>${f.week}</td>
              <td><strong>${h.shortName}</strong></td>
              <td><span class="badge">${f.played ? `${f.homeGoals} - ${f.awayGoals}` : 'v'}</span></td>
              <td><strong>${a.shortName}</strong></td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderPreMatch(team) {
  const fix = state.fixtures.find(f => !f.played && (f.homeId === team.id || f.awayId === team.id));
  if (!fix) return `<div class="card">No upcoming league match this week.</div>`;
  const opp = getTeamById(fix.homeId === team.id ? fix.awayId : fix.homeId);
  return `
    <div class="card">
      <div class="card-title">Pre-Match Briefing • Week ${fix.week}</div>
      <div class="row-between" style="margin:12px 0;">
        <div style="text-align:center;flex:1;">${render2DCrestSVG(team, 48)}<div style="font-weight:700;">${team.name}</div></div>
        <div style="font-size:18px;font-weight:900;">VS</div>
        <div style="text-align:center;flex:1;">${render2DCrestSVG(opp, 48)}<div style="font-weight:700;">${opp.name}</div></div>
      </div>
      <label>Dressing Room Team Talk</label>
      <select id="pm-talk">
        <option value="passionate">Passionate: "Do it for the fans today!" (+Morale)</option>
        <option value="calm">Calm: "Play your natural passing game."</option>
        <option value="demanding">Demanding: "I expect nothing less than a win!"</option>
      </select>
      <button class="btn btn-block" onclick="startLiveMatch('${fix.id}')">📢 Kick Off Live Match</button>
    </div>
  `;
}

function startLiveMatch(fixId) {
  const fix = state.fixtures.find(f => f.id === fixId);
  if (!fix) return;
  const home = getTeamById(fix.homeId);
  const away = getTeamById(fix.awayId);
  liveMatchState = {
    fixId: fix.id,
    minute: 0,
    speed: 350,
    home,
    away,
    homeGoals: 0,
    awayGoals: 0,
    homeShots: 0,
    awayShots: 0,
    homePoss: 50,
    ballX: 50,
    ballY: 50,
    shout: "Balanced",
    commentary: ["1' The referee blows the whistle and we are underway!"],
    finished: false
  };
  setSection("matches", "live_match");
  runLiveMatchLoop();
}

function runLiveMatchLoop() {
  if (liveMatchTimer) clearInterval(liveMatchTimer);
  if (!liveMatchState || liveMatchState.finished) return;
  liveMatchTimer = setInterval(() => {
    if (!liveMatchState || liveMatchState.finished) {
      clearInterval(liveMatchTimer);
      return;
    }
    liveMatchState.minute += 2;
    liveMatchState.ballX = rInt(15, 85);
    liveMatchState.ballY = rInt(15, 85);

    const hStr = liveMatchState.home.reputation + 3 + (liveMatchState.shout === "Attack" ? 4 : 0);
    const aStr = liveMatchState.away.reputation;
    const roll = Math.random() * 100;

    if (roll < 16) {
      const isHomeAtk = Math.random() * (hStr + aStr) < hStr;
      const atkTeam = isHomeAtk ? liveMatchState.home : liveMatchState.away;
      const scorers = getTeamPlayers(atkTeam.id).filter(p => p.pos !== "GK");
      const player = pick(scorers) || { name: "Striker", stats: { goals: 0 } };
      if (isHomeAtk) liveMatchState.homeShots++; else liveMatchState.awayShots++;

      if (Math.random() < 0.32) {
        if (isHomeAtk) liveMatchState.homeGoals++; else liveMatchState.awayGoals++;
        player.stats.goals++;
        liveMatchState.ballX = 50;
        liveMatchState.ballY = isHomeAtk ? 8 : 92;
        liveMatchState.commentary.unshift(`⚽ ${liveMatchState.minute}' GOAL! ${player.name} scores a clinical finish for ${atkTeam.shortName}!`);
      } else {
        liveMatchState.commentary.unshift(`🧤 ${liveMatchState.minute}' Close! ${player.name} (${atkTeam.shortName}) forces a sharp save!`);
      }
    }

    if (liveMatchState.minute >= 90) {
      liveMatchState.finished = true;
      clearInterval(liveMatchTimer);
      liveMatchState.commentary.unshift(`🏁 90' FULL TIME: ${liveMatchState.home.name} ${liveMatchState.homeGoals} - ${liveMatchState.awayGoals} ${liveMatchState.away.name}`);
      finalizeLiveMatch();
    }
    if (currentSubTab === "live_match") renderApp();
  }, liveMatchState.speed);
}

function finalizeLiveMatch() {
  const fix = state.fixtures.find(f => f.id === liveMatchState.fixId);
  if (fix && !fix.played) {
    fix.played = true;
    fix.homeGoals = liveMatchState.homeGoals;
    fix.awayGoals = liveMatchState.awayGoals;
    applyMatchStatsToTable(fix);
    // Simulate remaining matches of this week
    state.fixtures.filter(f => f.week === state.week && !f.played).forEach(other => {
      other.played = true;
      other.homeGoals = rInt(0, 3);
      other.awayGoals = rInt(0, 3);
      applyMatchStatsToTable(other);
    });
    state.week++;
    saveState();
  }
}

function renderLiveMatch() {
  if (!liveMatchState) {
    return `<div class="card">No active live match. Start one from Pre-Match or Advance Week.</div>`;
  }
  return `
    <div class="card">
      <div class="row-between">
        <div>${render2DCrestSVG(liveMatchState.home, 28)} <strong>${liveMatchState.home.shortName}</strong></div>
        <div style="font-size:22px;font-weight:900;color:var(--accent);">${liveMatchState.homeGoals} - ${liveMatchState.awayGoals} <span class="badge">${liveMatchState.minute}'</span></div>
        <div><strong>${liveMatchState.away.shortName}</strong> ${render2DCrestSVG(liveMatchState.away, 28)}</div>
      </div>
      <div class="pitch" style="height:190px;margin-top:8px;">
        <div class="pitch-line-mid"></div>
        <div class="pitch-circle"></div>
        <div class="pitch-ball" style="left:${liveMatchState.ballX}%;top:${liveMatchState.ballY}%;"></div>
      </div>
      <div class="grid-3" style="margin-bottom:8px;">
        <button class="btn btn-sec" onclick="liveMatchState.shout='Attack'">📢 Demand Attack</button>
        <button class="btn btn-sec" onclick="liveMatchState.speed=120;runLiveMatchLoop();">⏩ 2x Speed</button>
        <button class="btn btn-blue" onclick="setSection('matches','post_match')">📋 Match Report</button>
      </div>
      <div style="max-height:150px;overflow-y:auto;font-size:12px;line-height:1.5;background:var(--card-alt);padding:8px;border-radius:8px;">
        ${liveMatchState.commentary.map(c => `<div style="margin-bottom:4px;">${c}</div>`).join("")}
      </div>
    </div>
  `;
}

function renderPostMatch() {
  if (!liveMatchState) return `<div class="card">Play a match first to view Post-Match Report & Press Conference.</div>`;
  return `
    <div class="card">
      <div class="card-title">Post-Match Report & Press Conference</div>
      <div style="font-size:18px;font-weight:800;text-align:center;margin:8px 0;">
        ${liveMatchState.home.name} ${liveMatchState.homeGoals} - ${liveMatchState.awayGoals} ${liveMatchState.away.name}
      </div>
      <div style="font-size:12px;color:var(--muted);text-align:center;margin-bottom:12px;">
        Shots: ${liveMatchState.homeShots} - ${liveMatchState.awayShots} • Possession: ${liveMatchState.homePoss}% - ${100 - liveMatchState.homePoss}%
      </div>
      <div class="card-title">Press Conference Question</div>
      <div style="font-size:12px;margin-bottom:8px;">"How do you assess your squad's tactical execution out there today?"</div>
      <button class="btn btn-block" onclick="state.manager.boardConfidence=Math.min(100,state.manager.boardConfidence+2);saveState();setSection('dashboard','overview');">"Proud of the players' discipline and work rate." (+Confidence)</button>
      <button class="btn btn-sec btn-block" onclick="setSection('dashboard','overview');">"We still have plenty to improve on the training pitch."</button>
    </div>
  `;
}

/* 5. COMPETITIONS: LEAGUE TABLE, CUPS, STATS & AWARDS */
function applyMatchStatsToTable(fix) {
  const h = getTeamById(fix.homeId);
  const a = getTeamById(fix.awayId);
  if (!h.stats || !a.stats) return;
  h.stats.p++; a.stats.p++;
  h.stats.gf += fix.homeGoals; h.stats.ga += fix.awayGoals;
  a.stats.gf += fix.awayGoals; a.stats.ga += fix.homeGoals;
  if (fix.homeGoals > fix.awayGoals) {
    h.stats.w++; h.stats.pts += 3; h.stats.form.push("W");
    a.stats.l++; a.stats.form.push("L");
  } else if (fix.homeGoals < fix.awayGoals) {
    a.stats.w++; a.stats.pts += 3; a.stats.form.push("W");
    h.stats.l++; h.stats.form.push("L");
  } else {
    h.stats.d++; a.stats.d++; h.stats.pts++; a.stats.pts++;
    h.stats.form.push("D"); a.stats.form.push("D");
  }
}

let selectedLeagueTab = "lg_1";
function renderLeagueTable() {
  const teams = state.teams.filter(t => t.leagueId === selectedLeagueTab).sort((a, b) => (b.stats.pts - a.stats.pts) || ((b.stats.gf - b.stats.ga) - (a.stats.gf - a.stats.ga)));
  return `
    <div class="card">
      <div class="row-between" style="margin-bottom:8px;">
        <div class="card-title" style="margin:0;">League Standings</div>
        <select style="width:auto;margin:0;" onchange="selectedLeagueTab=this.value;renderApp();">
          ${state.leagues.map(l => `<option value="${l.id}" ${l.id === selectedLeagueTab ? 'selected' : ''}>${l.name}</option>`).join("")}
        </select>
      </div>
      <table>
        <thead><tr><th>#</th><th>Club</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>PTS</th></tr></thead>
        <tbody>
          ${teams.map((t, i) => `
            <tr style="${t.id === state.manager.clubId ? 'background:#064e3b55;' : ''}">
              <td>${i + 1}</td>
              <td>${render2DCrestSVG(t, 18)} <strong>${t.name}</strong></td>
              <td>${t.stats.p}</td><td>${t.stats.w}</td><td>${t.stats.d}</td><td>${t.stats.l}</td>
              <td>${t.stats.gf - t.stats.ga}</td>
              <td><strong>${t.stats.pts}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderCups() {
  return `
    <div class="card">
      <div class="card-title">National Knockout Cup Bracket</div>
      <button class="btn btn-block" style="margin-bottom:10px;" onclick="simCupRound()">⚡ Simulate Cup Round</button>
      ${state.cupMatches.map(m => {
        const h = getTeamById(m.homeId);
        const a = getTeamById(m.awayId);
        return `<div class="row-between" style="padding:7px 0;border-bottom:1px solid #1e293b;">
          <span>${m.round}</span>
          <strong>${h.shortName} ${m.played ? `${m.homeGoals} - ${m.awayGoals}` : 'vs'} ${a.shortName}</strong>
          <span class="badge">${m.winnerId ? getTeamById(m.winnerId).shortName : 'Pending'}</span>
        </div>`;
      }).join("")}
    </div>
  `;
}

function simCupRound() {
  state.cupMatches.forEach(m => {
    if (!m.played) {
      m.played = true;
      m.homeGoals = rInt(0, 4);
      m.awayGoals = rInt(0, 4);
      if (m.homeGoals === m.awayGoals) m.homeGoals++;
      m.winnerId = m.homeGoals > m.awayGoals ? m.homeId : m.awayId;
    }
  });
  saveState();
  renderApp();
}

function renderStatsAwards() {
  const topScorers = [...state.players].sort((a, b) => b.stats.goals - a.stats.goals).slice(0, 10);
  return `
    <div class="card">
      <div class="card-title">Golden Boot & League Leaders</div>
      <table>
        <thead><tr><th>Player</th><th>Club</th><th>OVR</th><th>Goals</th></tr></thead>
        <tbody>
          ${topScorers.map(p => `
            <tr>
              <td><strong>${p.name}</strong></td>
              <td>${getTeamById(p.teamId).shortName}</td>
              <td>${p.ovr}</td>
              <td><span class="badge">${p.stats.goals}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

/* 6. TRANSFERS, SCOUTING, NEGOTIATIONS, CONTRACTS, FINANCES */
let marketSearch = "";
function renderTransferMarket(team) {
  const pool = state.players.filter(p => p.teamId !== team.id && p.name.toLowerCase().includes(marketSearch.toLowerCase())).sort((a, b) => b.ovr - a.ovr).slice(0, 25);
  return `
    <div class="card">
      <div class="card-title">Transfer Market & Free Agents (Budget: ${formatMoney(team.budget)})</div>
      <input placeholder="Search player name..." value="${marketSearch}" oninput="marketSearch=this.value;renderApp();" />
      <table>
        <thead><tr><th>Pos</th><th>Name</th><th>OVR</th><th>Value</th><th>Action</th></tr></thead>
        <tbody>
          ${pool.map(p => `
            <tr>
              <td><span class="pos-${p.pos}">${p.pos}</span></td>
              <td><strong>${p.name}</strong><div style="font-size:10px;color:var(--muted);">${getTeamById(p.teamId).name}</div></td>
              <td><span class="badge">${p.ovr}</span></td>
              <td>${formatMoney(p.value)}</td>
              <td>
                <button class="btn" style="padding:4px 8px;" onclick="buyPlayer('${p.id}')">Buy</button>
                <button class="btn btn-sec" style="padding:4px 6px;" onclick="shortlistPlayer('${p.id}')">★</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function buyPlayer(id) {
  const team = getUserTeam();
  const p = state.players.find(x => x.id === id);
  if (!p) return;
  const fee = p.teamId === "FREE" ? 0 : p.value;
  if (team.budget < fee) {
    alert("Insufficient transfer budget!");
    return;
  }
  team.budget -= fee;
  p.teamId = team.id;
  team.bench.push(p.id);
  state.inbox.push({
    id: uid("msg"),
    week: state.week,
    category: "Transfer",
    title: `Signed ${p.name}!`,
    body: `${p.name} (OVR ${p.ovr}) has joined ${team.name} for ${formatMoney(fee)}.`,
    read: false
  });
  saveState();
  renderApp();
}

function shortlistPlayer(id) {
  if (!state.shortlist.includes(id)) state.shortlist.push(id);
  saveState();
  alert("Added to Scouting Shortlist!");
}

function renderScouting() {
  const list = state.shortlist.map(id => state.players.find(p => p.id === id)).filter(Boolean);
  return `
    <div class="card">
      <div class="card-title">Scouting Network & Shortlist (${list.length})</div>
      <button class="btn btn-block" style="margin-bottom:10px;" onclick="discoverWonderkid()">🔍 Send Chief Scout to Find Wonderkid (€250K)</button>
      ${list.map(p => `
        <div class="row-between" style="padding:6px 0;border-bottom:1px solid #1e293b;">
          <div><strong>${p.name}</strong> (${p.pos} • OVR ${p.ovr} / POT ${p.pot})</div>
          <button class="btn" onclick="buyPlayer('${p.id}')">Sign (${formatMoney(p.value)})</button>
        </div>
      `).join("")}
    </div>
  `;
}

function discoverWonderkid() {
  const team = getUserTeam();
  if (team.budget < 250000) return;
  team.budget -= 250000;
  const wk = generatePlayer("FREE", pick(["MID", "FWD", "DEF"]), pick(["Brazil", "Algeria", "Spain", "France"]), 8);
  wk.age = 17;
  wk.pot = 94;
  state.players.push(wk);
  state.shortlist.push(wk.id);
  saveState();
  renderApp();
}

function renderNegotiations(team) {
  const listed = getTeamPlayers(team.id).filter(p => p.transferListed);
  return `
    <div class="card">
      <div class="card-title">Active Transfer Negotiations & Outgoing Bids</div>
      ${listed.length === 0 ? `<div style="font-size:12px;color:var(--muted);">Transfer-list a player in your squad to receive AI club offers immediately.</div>` : ''}
      ${listed.map(p => `
        <div class="row-between" style="padding:8px 0;border-bottom:1px solid #1e293b;">
          <div><strong>${p.name}</strong> (AI Offer: ${formatMoney(Math.round(p.value * 0.95))})</div>
          <button class="btn" onclick="sellPlayer('${p.id}')">Accept Offer</button>
        </div>
      `).join("")}
    </div>
  `;
}

function sellPlayer(id) {
  const team = getUserTeam();
  const p = state.players.find(x => x.id === id);
  if (!p) return;
  const fee = Math.round(p.value * 0.95);
  team.budget += fee;
  p.teamId = "team_2";
  p.transferListed = false;
  team.lineup = team.lineup.filter(x => x !== id);
  team.bench = team.bench.filter(x => x !== id);
  saveState();
  renderApp();
}

function renderContracts(team) {
  const squad = getTeamPlayers(team.id);
  return `
    <div class="card">
      <div class="card-title">Squad Contracts & Renewals</div>
      ${squad.map(p => `
        <div class="row-between" style="padding:6px 0;border-bottom:1px solid #1e293b;">
          <div>
            <strong>${p.name}</strong> (${p.contractYears} yrs left)
            <div style="font-size:11px;color:var(--muted);">Wage: ${formatMoney(p.wage)}/wk</div>
          </div>
          <button class="btn btn-sec" onclick="renewContract('${p.id}')">+3 Yrs</button>
        </div>
      `).join("")}
    </div>
  `;
}

function renewContract(id) {
  const p = state.players.find(x => x.id === id);
  if (p) {
    p.contractYears += 3;
    p.wage = Math.round(p.wage * 1.15);
    p.morale = Math.min(99, p.morale + 8);
  }
  saveState();
  renderApp();
}

function renderFinances(team) {
  const totalWages = getTeamPlayers(team.id).reduce((s, p) => s + p.wage, 0);
  return `
    <div class="card">
      <div class="card-title">Club Finances & 12-Month Projection</div>
      <div class="grid-2" style="margin-bottom:10px;">
        <div class="stat-box"><div class="stat-val">${formatMoney(team.budget)}</div><div class="stat-lbl">Transfer Balance</div></div>
        <div class="stat-box"><div class="stat-val">${formatMoney(totalWages)}/wk</div><div class="stat-lbl">Weekly Payroll</div></div>
      </div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:8px;">Annual Kit & Main Sponsor Income: <strong style="color:var(--accent);">${formatMoney(team.sponsorIncome)}</strong></div>
      <div class="card-title">12-Month Net Cashflow Chart</div>
      <div style="display:flex;align-items:flex-end;gap:5px;height:100px;padding:10px;background:#090e1a;border-radius:8px;">
        ${team.financesHistory.map((v, i) => {
          const h = Math.min(85, Math.max(15, Math.round((v + 1000000) / 35000)));
          return `<div style="flex:1;background:${v >= 0 ? 'var(--accent)' : 'var(--danger)'};height:${h}px;border-radius:4px;" title="M${i + 1}"></div>`;
        }).join("")}
      </div>
    </div>
  `;
}

/* SEASON LOOP: ADVANCE WEEK */
function advanceWeek() {
  const team = getUserTeam();
  const myFix = state.fixtures.find(f => f.week === state.week && !f.played && (f.homeId === team.id || f.awayId === team.id));

  // Sim all week matches
  state.fixtures.filter(f => f.week === state.week && !f.played).forEach(f => {
    f.played = true;
    const h = getTeamById(f.homeId);
    const a = getTeamById(f.awayId);
    f.homeGoals = Math.max(0, Math.round((h.reputation - a.reputation) / 15) + rInt(0, 3));
    f.awayGoals = Math.max(0, rInt(0, 3));
    applyMatchStatsToTable(f);
  });

  // Training & injury recovery
  state.players.forEach(p => {
    if (p.injuredWeeks > 0) p.injuredWeeks--;
    if (p.teamId === team.id && team.training.intensity.includes("Heavy") && Math.random() < 0.15) {
      p.ovr = Math.min(99, p.ovr + 1);
    }
  });

  if (myFix) {
    const h = getTeamById(myFix.homeId);
    const a = getTeamById(myFix.awayId);
    state.inbox.push({
      id: uid("msg"),
      week: state.week,
      category: "Match",
      title: `Result: ${h.shortName} ${myFix.homeGoals} - ${myFix.awayGoals} ${a.shortName}`,
      body: `Matchday ${state.week} completed.`,
      read: false
    });
  }

  state.week++;
  // Check Season End (after week 22)
  if (state.week > 22) {
    runEndOfSeason();
  }
  saveState();
  renderApp();
}

function runEndOfSeason() {
  const lg1 = state.teams.filter(t => t.leagueId === "lg_1").sort((a, b) => b.stats.pts - a.stats.pts);
  const lg2 = state.teams.filter(t => t.leagueId === "lg_2").sort((a, b) => b.stats.pts - a.stats.pts);
  const champ = lg1[0];
  if (champ.id === state.manager.clubId) {
    state.manager.trophies.push(`Season ${state.season} Champion`);
  }
  state.manager.seasonHistory.push({
    season: state.season,
    champion: champ.name,
    cupWinner: lg1[1].name
  });

  // Promotion & Relegation (bottom 2 of lg_1 swap with top 2 of lg_2)
  if (lg1.length >= 2 && lg2.length >= 2) {
    lg1[lg1.length - 1].leagueId = "lg_2";
    lg1[lg1.length - 2].leagueId = "lg_2";
    lg2[0].leagueId = "lg_1";
    lg2[1].leagueId = "lg_1";
  }

  // Reset stats & generate new season
  state.season++;
  state.week = 1;
  state.teams.forEach(t => {
    t.stats = { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, form: [] };
    t.budget += t.sponsorIncome;
  });
  const lg1Ids = state.teams.filter(t => t.leagueId === "lg_1").map(t => t.id);
  const lg2Ids = state.teams.filter(t => t.leagueId === "lg_2").map(t => t.id);
  state.fixtures = [
    ...generateRoundRobinFixtures(lg1Ids, "lg_1"),
    ...generateRoundRobinFixtures(lg2Ids, "lg_2")
  ];
}

/* =========================================================================
   7. BUILT-IN EDITOR / DATABASE MODULE
   ========================================================================= */
function renderEditorHome() {
  const report = validateDatabase();
  return `
    <div class="card">
      <div class="card-title">Built-In Database Studio</div>
      <label>Active Database Name</label>
      <input value="${state.meta.dbName}" onchange="pushUndoSnapshot();state.meta.dbName=this.value;saveState();" />
      <div class="grid-2" style="margin-bottom:8px;">
        <button class="btn" onclick="createNewBlankDatabase()">➕ New Blank DB</button>
        <button class="btn btn-blue" onclick="createBackupVersion()">📦 Save DB Backup</button>
        <button class="btn btn-sec" onclick="undoEditor()">↩️ Undo (${undoStack.length})</button>
        <button class="btn btn-sec" onclick="redoEditor()">↪️ Redo (${redoStack.length})</button>
      </div>
      <div class="card-title">Database Validation Report</div>
      <div style="font-size:12px;line-height:1.6;color:var(--muted);">
        • Total Clubs: <strong>${state.teams.length}</strong> | Total Players: <strong>${state.players.length}</strong><br/>
        • Duplicate IDs: <strong style="color:${report.duplicateIds ? 'var(--danger)' : 'var(--accent)'};">${report.duplicateIds}</strong><br/>
        • Clubs Without Goalkeeper: <strong style="color:${report.teamsNoGK.length ? 'var(--warn)' : 'var(--accent)'};">${report.teamsNoGK.length}</strong><br/>
        • Invalid Ratings (Out of 1–99): <strong>${report.invalidRatings}</strong>
      </div>
    </div>
  `;
}

function validateDatabase() {
  const seen = new Set();
  let duplicateIds = 0;
  let invalidRatings = 0;
  state.players.forEach(p => {
    if (seen.has(p.id)) duplicateIds++;
    seen.add(p.id);
    if (p.ovr < 1 || p.ovr > 99) invalidRatings++;
  });
  const teamsNoGK = state.teams.filter(t => !state.players.some(p => p.teamId === t.id && p.pos === "GK"));
  return { duplicateIds, invalidRatings, teamsNoGK };
}

function createNewBlankDatabase() {
  pushUndoSnapshot();
  state = buildStarterDatabase();
  state.meta.dbName = "Custom Database " + new Date().toLocaleDateString();
  saveState();
  renderApp();
}

function createBackupVersion() {
  state.backups = state.backups || [];
  state.backups.push({ date: new Date().toLocaleTimeString(), teams: state.teams.length, players: state.players.length });
  saveState();
  alert("Database version backup saved!");
  renderApp();
}

function undoEditor() {
  if (!undoStack.length) return;
  redoStack.push(JSON.stringify(state));
  state = JSON.parse(undoStack.pop());
  saveState();
  renderApp();
}

function redoEditor() {
  if (!redoStack.length) return;
  undoStack.push(JSON.stringify(state));
  state = JSON.parse(redoStack.pop());
  saveState();
  renderApp();
}

/* TEAMS EDITOR (WITH 2D FLAT CREST PREVIEW - NO SHADOWS) */
function renderEditorTeams() {
  const t = state.teams.find(x => x.id === selectedTeamId) || state.teams[0];
  selectedTeamId = t.id;
  return `
    <div class="card">
      <div class="row-between">
        <div class="card-title">Teams & 2D Kit/Crest Editor</div>
        <button class="btn" onclick="editorAddTeam()">+ Add Club</button>
      </div>
      <select onchange="selectedTeamId=this.value;renderApp();">
        ${state.teams.map(tm => `<option value="${tm.id}" ${tm.id === t.id ? 'selected' : ''}>${tm.name} (${tm.shortName})</option>`).join("")}
      </select>
      <div style="text-align:center;padding:10px;background:var(--card-alt);border-radius:10px;margin-bottom:10px;">
        ${render2DCrestSVG(t, 64)}
        <div style="font-size:11px;color:var(--muted);margin-top:4px;">2D Flat Vector Crest Preview (No Shadows)</div>
      </div>
      <div class="grid-2">
        <div><label>Club Name</label><input value="${t.name}" onchange="pushUndoSnapshot();getTeamById('${t.id}').name=this.value;saveState();renderApp();" /></div>
        <div><label>Short Name (3 chars)</label><input maxlength="3" value="${t.shortName}" onchange="pushUndoSnapshot();getTeamById('${t.id}').shortName=this.value.toUpperCase();saveState();renderApp();" /></div>
        <div><label>Primary Color</label><input type="color" value="${t.primaryColor}" onchange="pushUndoSnapshot();getTeamById('${t.id}').primaryColor=this.value;saveState();renderApp();" /></div>
        <div><label>Secondary Color</label><input type="color" value="${t.secondaryColor}" onchange="pushUndoSnapshot();getTeamById('${t.id}').secondaryColor=this.value;saveState();renderApp();" /></div>
        <div><label>Kit Pattern</label>
          <select onchange="pushUndoSnapshot();getTeamById('${t.id}').kitPattern=this.value;saveState();renderApp();">
            ${["stripes", "sash", "hoops"].map(kp => `<option value="${kp}" ${t.kitPattern === kp ? 'selected' : ''}>${kp}</option>`).join("")}
          </select>
        </div>
        <div><label>Transfer Budget</label><input type="number" value="${t.budget}" onchange="pushUndoSnapshot();getTeamById('${t.id}').budget=Number(this.value);saveState();renderApp();" /></div>
        <div><label>Stadium Name</label><input value="${t.stadiumName}" onchange="pushUndoSnapshot();getTeamById('${t.id}').stadiumName=this.value;saveState();" /></div>
        <div><label>Reputation (1-99)</label><input type="number" value="${t.reputation}" onchange="pushUndoSnapshot();getTeamById('${t.id}').reputation=Number(this.value);saveState();" /></div>
      </div>
      <button class="btn btn-sec btn-block" onclick="pickGalleryImageForTeam('${t.id}')">🖼️ Pick Custom 2D Logo from Phone Gallery</button>
      <button class="btn btn-danger btn-block" onclick="editorDeleteTeam('${t.id}')">🗑️ Delete Club</button>
    </div>
  `;
}

function editorAddTeam() {
  pushUndoSnapshot();
  const id = uid("team");
  state.teams.push({
    id,
    name: "New Custom FC",
    shortName: "NCF",
    leagueId: "lg_1",
    country: "England",
    primaryColor: "#10b981",
    secondaryColor: "#0f172a",
    kitPattern: "stripes",
    stadiumName: "Custom Park",
    stadiumCapacity: 25000,
    budget: 20000000,
    wageBudget: 400000,
    reputation: 75,
    rivals: "",
    customLogoData: null,
    facilitiesLevel: 3,
    youthLevel: 3,
    lineup: [],
    bench: [],
    tactics: { formation: "4-3-3", mentality: "Balanced", pressing: "High", width: "Wide", tempo: "Fast", savedPresets: [] },
    training: { focus: "Balanced", intensity: "Medium" },
    financesHistory: [100000, 200000, 150000, 300000, 250000, 400000, 100000, 200000, 300000, 250000, 100000, 300000],
    sponsorIncome: 8000000,
    stats: { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, form: [] }
  });
  selectedTeamId = id;
  saveState();
  renderApp();
}

function editorDeleteTeam(id) {
  if (state.teams.length <= 2) return;
  pushUndoSnapshot();
  state.teams = state.teams.filter(t => t.id !== id);
  selectedTeamId = state.teams[0].id;
  saveState();
  renderApp();
}

/* PLAYERS EDITOR WITH LIVE CARD PREVIEW & AUTO OVERALL/VALUE */
let edPlayerSearch = "";
function renderEditorPlayers() {
  const filtered = state.players.filter(p => p.name.toLowerCase().includes(edPlayerSearch.toLowerCase()));
  const p = state.players.find(x => x.id === selectedPlayerId) || filtered[0] || state.players[0];
  selectedPlayerId = p.id;

  return `
    <div class="card">
      <div class="row-between">
        <div class="card-title">Players Editor (${state.players.length})</div>
        <div style="display:flex;gap:4px;">
          <button class="btn" onclick="editorAddPlayer()">+ New</button>
          <button class="btn btn-blue" onclick="editorDuplicatePlayer('${p.id}')">Clone</button>
        </div>
      </div>
      <input placeholder="Filter players..." value="${edPlayerSearch}" oninput="edPlayerSearch=this.value;renderApp();" />
      <select onchange="selectedPlayerId=this.value;renderApp();">
        ${filtered.slice(0, 80).map(pl => `<option value="${pl.id}" ${pl.id === p.id ? 'selected' : ''}>${pl.name} (${pl.pos} - OVR ${pl.ovr})</option>`).join("")}
      </select>

      <!-- Live Player Card Preview -->
      <div class="card" style="background:linear-gradient(135deg,#064e3b,#0f172a);border:2px solid var(--accent);">
        <div class="row-between">
          <div>
            <div style="font-size:22px;font-weight:900;color:var(--accent);">${p.ovr} <span style="font-size:13px;color:#fff;">${p.pos}</span></div>
            <div style="font-weight:800;font-size:15px;">${p.name}</div>
            <div style="font-size:11px;color:var(--muted);">${p.nationality} • ${getTeamById(p.teamId).name} • ${formatMoney(p.value)}</div>
          </div>
          <div style="font-size:11px;text-align:right;">
            PAC ${p.attr.pac} | DRI ${p.attr.dri}<br/>
            SHO ${p.attr.sho} | DEF ${p.attr.def}<br/>
            PAS ${p.attr.pas} | PHY ${p.attr.phy}
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div><label>Name</label><input value="${p.name}" onchange="updatePlayerField('${p.id}','name',this.value)" /></div>
        <div><label>Position</label>
          <select onchange="updatePlayerField('${p.id}','pos',this.value)">
            ${["GK", "DEF", "MID", "FWD"].map(pos => `<option value="${pos}" ${p.pos === pos ? 'selected' : ''}>${pos}</option>`).join("")}
          </select>
        </div>
        <div><label>Age</label><input type="number" value="${p.age}" onchange="updatePlayerField('${p.id}','age',Number(this.value))" /></div>
        <div><label>Potential (1-99)</label><input type="number" value="${p.pot}" onchange="updatePlayerField('${p.id}','pot',Number(this.value))" /></div>
        <div><label>Pace (${p.attr.pac})</label><input type="number" value="${p.attr.pac}" onchange="updatePlayerAttr('${p.id}','pac',Number(this.value))" /></div>
        <div><label>Shooting (${p.attr.sho})</label><input type="number" value="${p.attr.sho}" onchange="updatePlayerAttr('${p.id}','sho',Number(this.value))" /></div>
        <div><label>Passing (${p.attr.pas})</label><input type="number" value="${p.attr.pas}" onchange="updatePlayerAttr('${p.id}','pas',Number(this.value))" /></div>
        <div><label>Dribbling (${p.attr.dri})</label><input type="number" value="${p.attr.dri}" onchange="updatePlayerAttr('${p.id}','dri',Number(this.value))" /></div>
        <div><label>Defending (${p.attr.def})</label><input type="number" value="${p.attr.def}" onchange="updatePlayerAttr('${p.id}','def',Number(this.value))" /></div>
        <div><label>Physical (${p.attr.phy})</label><input type="number" value="${p.attr.phy}" onchange="updatePlayerAttr('${p.id}','phy',Number(this.value))" /></div>
      </div>
      <button class="btn btn-danger btn-block" onclick="editorDeletePlayer('${p.id}')">🗑️ Delete Player</button>
    </div>
  `;
}

function updatePlayerField(id, field, val) {
  pushUndoSnapshot();
  const p = state.players.find(x => x.id === id);
  if (!p) return;
  p[field] = val;
  p.ovr = calcPlayerOverall(p.attr, p.pos);
  p.value = calcMarketValue(p.ovr, p.age, p.pot);
  saveState();
  renderApp();
}

function updatePlayerAttr(id, attrKey, val) {
  pushUndoSnapshot();
  const p = state.players.find(x => x.id === id);
  if (!p) return;
  p.attr[attrKey] = Math.min(99, Math.max(1, val));
  p.ovr = calcPlayerOverall(p.attr, p.pos);
  p.value = calcMarketValue(p.ovr, p.age, p.pot);
  saveState();
  renderApp();
}

function editorAddPlayer() {
  pushUndoSnapshot();
  const p = generatePlayer(getUserTeam().id, "FWD", "Algeria", 5);
  state.players.unshift(p);
  selectedPlayerId = p.id;
  saveState();
  renderApp();
}

function editorDuplicatePlayer(id) {
  pushUndoSnapshot();
  const orig = state.players.find(x => x.id === id);
  if (!orig) return;
  const copy = JSON.parse(JSON.stringify(orig));
  copy.id = uid("ply");
  copy.name = orig.name + " II";
  state.players.unshift(copy);
  selectedPlayerId = copy.id;
  saveState();
  renderApp();
}

function editorDeletePlayer(id) {
  pushUndoSnapshot();
  state.players = state.players.filter(p => p.id !== id);
  selectedPlayerId = state.players[0] ? state.players[0].id : null;
  saveState();
  renderApp();
}

/* LEAGUES, RULES & FIXTURES GENERATOR */
function renderEditorLeaguesRules() {
  return `
    <div class="card">
      <div class="card-title">Leagues, Rules & Schedule Generator</div>
      ${state.leagues.map(l => `
        <div class="card" style="background:var(--card-alt);">
          <label>League Name</label>
          <input value="${l.name}" onchange="l.name=this.value;saveState();" />
          <div class="grid-2">
            <div><label>Promo Spots</label><input type="number" value="${l.promoSpots}" onchange="l.promoSpots=Number(this.value);saveState();" /></div>
            <div><label>Relegation Spots</label><input type="number" value="${l.relSpots}" onchange="l.relSpots=Number(this.value);saveState();" /></div>
          </div>
        </div>
      `).join("")}
      <button class="btn btn-block" onclick="regenerateAllSchedules()">🔄 Auto-Generate Round-Robin Schedules</button>
    </div>
  `;
}

function regenerateAllSchedules() {
  const lg1Ids = state.teams.filter(t => t.leagueId === "lg_1").map(t => t.id);
  const lg2Ids = state.teams.filter(t => t.leagueId === "lg_2").map(t => t.id);
  state.fixtures = [
    ...generateRoundRobinFixtures(lg1Ids, "lg_1"),
    ...generateRoundRobinFixtures(lg2Ids, "lg_2")
  ];
  saveState();
  alert("New round-robin schedules generated for all leagues!");
}

/* MEDIA MANAGER (GALLERY PICKER + AUTO-MATCH BY FILENAME) */
function renderEditorMedia() {
  return `
    <div class="card">
      <div class="card-title">Media Manager (Phone Gallery & Auto-Match)</div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:10px;">
        Pick images from your phone gallery for club logos, player faces, kits, trophies, or stadiums. If a filename matches a Club Short Name (e.g., <code>NLR.png</code>) or ID, it auto-assigns!
      </div>
      <button class="btn btn-block" onclick="triggerMediaUpload()">📱 Pick Image(s) from Phone Gallery</button>
    </div>
  `;
}

function pickGalleryImageForTeam(teamId) {
  const inp = document.getElementById("hidden-file-input");
  inp.accept = "image/*";
  inp.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const t = getTeamById(teamId);
      if (t) t.customLogoData = reader.result;
      saveState();
      renderApp();
    };
    reader.readAsDataURL(file);
  };
  inp.click();
}

function triggerMediaUpload() {
  const inp = document.getElementById("hidden-file-input");
  inp.accept = "image/*";
  inp.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const baseName = file.name.split(".")[0].toUpperCase();
    const reader = new FileReader();
    reader.onload = () => {
      const matchedTeam = state.teams.find(t => t.shortName.toUpperCase() === baseName || t.id.toUpperCase() === baseName);
      if (matchedTeam) {
        matchedTeam.customLogoData = reader.result;
        alert(`Auto-matched logo to ${matchedTeam.name}!`);
      } else {
        getUserTeam().customLogoData = reader.result;
        alert(`Assigned uploaded image to ${getUserTeam().name}!`);
      }
      saveState();
      renderApp();
    };
    reader.readAsDataURL(file);
  };
  inp.click();
}

/* IMPORT / EXPORT WIZARD (JSON & CSV) */
function renderEditorImportExport() {
  return `
    <div class="card">
      <div class="card-title">Import / Export Database Wizard</div>
      <button class="btn btn-block" onclick="exportDatabaseJSON()">⬇️ Export Full Database (.JSON)</button>
      <button class="btn btn-blue btn-block" onclick="exportPlayersCSV()">⬇️ Export Players Spreadsheet (.CSV)</button>
      <button class="btn btn-sec btn-block" onclick="importDatabaseFile()">⬆️ Import JSON / CSV Database File</button>
    </div>
  `;
}

function exportDatabaseJSON() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "fm26_database.json";
  a.click();
}

function exportPlayersCSV() {
  const rows = ["id,name,pos,age,nationality,ovr,pot,value,teamId"];
  state.players.forEach(p => {
    rows.push(`${p.id},"${p.name}",${p.pos},${p.age},${p.nationality},${p.ovr},${p.pot},${p.value},${p.teamId}`);
  });
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "fm26_players.csv";
  a.click();
}

function importDatabaseFile() {
  const inp = document.getElementById("hidden-file-input");
  inp.accept = ".json,.csv";
  inp.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        if (file.name.endsWith(".json")) {
          state = JSON.parse(reader.result);
          saveState();
          renderApp();
          alert("Full JSON Database imported!");
        } else {
          const lines = reader.result.split("\n").slice(1);
          lines.forEach(line => {
            const cols = line.split(",");
            if (cols.length >= 6) {
              state.players.push(generatePlayer(getUserTeam().id, cols[2] || "MID", cols[4] || "England", 4));
            }
          });
          saveState();
          renderApp();
          alert("CSV Players imported!");
        }
      } catch (err) {
        alert("Invalid file format.");
      }
    };
    reader.readAsText(file);
  };
  inp.click();
}

/* EXTRAS: BULK RATING SCALING & RANDOM GENERATOR */
function renderEditorExtras() {
  return `
    <div class="card">
      <div class="card-title">Bulk Tools & Random Generators</div>
      <button class="btn btn-block" onclick="bulkScaleRatings(5)">⚡ Bulk Scale All Players +5 OVR</button>
      <button class="btn btn-sec btn-block" onclick="bulkScaleRatings(-5)">📉 Bulk Scale All Players -5 OVR</button>
      <button class="btn btn-blue btn-block" onclick="generateBatchRandomPlayers(20)">🎲 Generate 20 Random Free Agents</button>
    </div>
  `;
}

function bulkScaleRatings(delta) {
  pushUndoSnapshot();
  state.players.forEach(p => {
    Object.keys(p.attr).forEach(k => {
      p.attr[k] = Math.min(99, Math.max(1, p.attr[k] + delta));
    });
    p.ovr = calcPlayerOverall(p.attr, p.pos);
    p.pot = Math.min(99, Math.max(p.ovr, p.pot + delta));
    p.value = calcMarketValue(p.ovr, p.age, p.pot);
  });
  saveState();
  renderApp();
}

function generateBatchRandomPlayers(count) {
  pushUndoSnapshot();
  for (let i = 0; i < count; i++) {
    state.players.push(generatePlayer("FREE", pick(["GK", "DEF", "MID", "FWD"]), pick(Object.keys(FAKE_NAMES)), rInt(-3, 8)));
  }
  saveState();
  renderApp();
}

window.addEventListener("DOMContentLoaded", () => {
  renderApp();
});
