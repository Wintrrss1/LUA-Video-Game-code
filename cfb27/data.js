/* ============================================================
   CFB 27 PLAY CALLER — DATA LAYER
   Playbook universe, formation catalog and concept library for
   EA Sports College Football 27.

   Sourcing notes (see README):
   - CFB 27 ships 138 playable FBS teams. OFFENSIVE playbooks are
     named after schools; DEFENSIVE playbooks are named by scheme
     (31 of them) and every school is assigned one.
   - The 11 offensive playbook STYLES in CFB 27 are: Air Raid,
     Go Go, Multiple, Option, Pistol, Power Spread, Pro Style,
     Run & Shoot, Spread, Spread Option, Veer & Shoot.
   - Per-team style tags reflect each program's real 2026 offensive
     identity and are editable: every field below is plain data.
   ============================================================ */
(function (global) {
  "use strict";

  /* ---------- FORMATION CATALOG ----------
     [ name, personnel, family tags ] */
  var FORMATION_ROWS = [
    ["Gun Bunch", "11", ["gun", "bunch", "spread"]],
    ["Gun Bunch X Nasty", "11", ["gun", "bunch", "spread", "nasty"]],
    ["Gun Bunch Wk", "11", ["gun", "bunch", "spread"]],
    ["Gun Cluster Wing", "11", ["gun", "bunch", "spread"]],
    ["Gun Trips TE", "11", ["gun", "trips", "spread", "te"]],
    ["Gun Trey Open", "11", ["gun", "trips", "spread"]],
    ["Gun Y-Trips Wk", "11", ["gun", "trips", "spread"]],
    ["Gun Wing Trips", "11", ["gun", "trips", "tight"]],
    ["Gun Doubles", "11", ["gun", "doubles", "spread"]],
    ["Gun Doubles Off", "11", ["gun", "doubles", "spread"]],
    ["Gun Tight Doubles", "11", ["gun", "doubles", "tight"]],
    ["Gun Y-Off Close", "11", ["gun", "tight", "te"]],
    ["Gun Y-Off Nasty", "11", ["gun", "tight", "te", "nasty"]],
    ["Gun Mid Close", "12", ["gun", "tight", "te"]],
    ["Gun Split Close", "11", ["gun", "tight", "2back"]],
    ["Gun Split Slot", "10", ["gun", "spread", "2back"]],
    ["Gun Spread Flex", "10", ["gun", "spread"]],
    ["Gun Empty Trey", "10", ["gun", "empty", "spread", "trips"]],
    ["Gun Empty Bunch", "10", ["gun", "empty", "bunch"]],
    ["Gun Empty Flex", "10", ["gun", "empty", "spread", "doubles"]],
    ["Gun Power I Tight", "21", ["gun", "heavy", "2back"]],
    ["Gun Heavy", "22", ["gun", "heavy", "tight"]],
    ["Gun Flexbone", "20", ["gun", "option", "flex"]],
    ["Gun Split Flexbone", "20", ["gun", "option", "flex"]],
    ["Gun Wildcat", "11", ["wildcat", "gun"]],
    ["Pistol Ace", "11", ["pistol", "single"]],
    ["Pistol Trips", "11", ["pistol", "trips"]],
    ["Pistol Bunch TE", "12", ["pistol", "bunch", "te"]],
    ["Pistol Y-Off Wing", "12", ["pistol", "tight", "te"]],
    ["Pistol Strong Slot", "21", ["pistol", "2back"]],
    ["Pistol Diamond", "20", ["pistol", "option", "heavy"]],
    ["Singleback Ace", "11", ["single", "tight"]],
    ["Singleback Ace Pair", "12", ["single", "te"]],
    ["Singleback Deuce", "12", ["single", "te"]],
    ["Singleback Doubles", "11", ["single", "doubles"]],
    ["Singleback Wing Trio", "11", ["single", "trips"]],
    ["Singleback Bunch", "11", ["single", "bunch"]],
    ["Singleback Tight Slots", "11", ["single", "tight"]],
    ["I-Form Pro", "21", ["iform", "2back", "uc"]],
    ["I-Form Close", "21", ["iform", "2back", "uc"]],
    ["I-Form Tight", "22", ["iform", "heavy", "uc"]],
    ["Strong Close", "21", ["uc", "2back", "tight"]],
    ["Weak Pro", "21", ["uc", "2back"]],
    ["Split Backs", "20", ["uc", "2back"]],
    ["Full House Wide", "20", ["uc", "option", "heavy"]],
    ["Flexbone", "20", ["uc", "option", "flex"]],
    ["Flexbone Diamond", "20", ["uc", "option", "flex"]],
    ["Wishbone", "30", ["uc", "option", "heavy"]],
    ["Jumbo Heavy", "22", ["gl", "heavy", "uc"]],
    ["Goal Line", "23", ["gl", "heavy", "uc"]],
    ["Swinging Gate", "10", ["special", "trick"]]
  ];

  var FORMATIONS = {};
  FORMATION_ROWS.forEach(function (r) {
    FORMATIONS[r[0]] = { name: r[0], personnel: r[1], fam: r[2] };
  });

  /* ---------- OFFENSIVE STYLES (the 11 CFB 27 playbook styles) ----------
     pass:  base pass rate (0-1) on neutral downs
     tempo: 1 = huddle / 5 = fastest no-huddle
     pool:  formation pool the style calls from
     dna:   concept families the style leans on  */
  var OFF_STYLES = {
    "Air Raid": {
      pass: 0.68, tempo: 4, motion: 0.25,
      blurb: "Four-verticals and mesh off wide splits. Spread you out, throw it 45+ times, run only when the box empties out.",
      pool: ["Gun Empty Trey", "Gun Empty Bunch", "Gun Bunch", "Gun Trey Open", "Gun Doubles", "Gun Y-Off Nasty", "Gun Spread Flex", "Gun Split Slot", "Gun Empty Flex", "Singleback Ace"],
      dna: ["mesh", "verts", "quick", "choice", "screen"]
    },
    "Go Go": {
      pass: 0.56, tempo: 5, motion: 0.45,
      blurb: "Two-back shotgun and pistol sets with constant motion and tempo. Marries the run game to jet/orbit action.",
      pool: ["Gun Split Close", "Gun Split Slot", "Pistol Trips", "Pistol Strong Slot", "Gun Trips TE", "Gun Bunch", "Gun Doubles", "Pistol Ace", "Gun Power I Tight", "Singleback Wing Trio"],
      dna: ["motion", "zone", "rpo", "screen", "pa"]
    },
    "Multiple": {
      pass: 0.52, tempo: 3, motion: 0.35,
      blurb: "The widest menu in the game — under center, pistol and gun, every personnel grouping. Built to answer any front.",
      pool: ["Gun Bunch", "Gun Trips TE", "Gun Doubles Off", "Gun Y-Off Close", "Gun Y-Off Nasty", "Gun Empty Trey", "Pistol Ace", "Pistol Bunch TE", "Singleback Ace", "Singleback Deuce", "I-Form Pro", "Strong Close", "Gun Power I Tight", "Jumbo Heavy"],
      dna: ["zone", "gap", "pa", "mesh", "verts", "quick", "screen"]
    },
    "Option": {
      pass: 0.24, tempo: 2, motion: 0.3,
      blurb: "Flexbone triple option. Make the edge defender wrong every snap, then hit the play-action shot off it.",
      pool: ["Flexbone", "Flexbone Diamond", "Wishbone", "Gun Flexbone", "Gun Split Flexbone", "Pistol Diamond", "Full House Wide", "I-Form Tight", "Goal Line"],
      dna: ["option", "gap", "pa", "shot"]
    },
    "Pistol": {
      pass: 0.5, tempo: 3, motion: 0.35,
      blurb: "Downhill pistol run game with a full play-action tree — same backfield picture on run and pass.",
      pool: ["Pistol Ace", "Pistol Trips", "Pistol Bunch TE", "Pistol Y-Off Wing", "Pistol Strong Slot", "Pistol Diamond", "Gun Y-Off Close", "Singleback Ace", "I-Form Pro"],
      dna: ["zone", "gap", "pa", "rpo", "shot"]
    },
    "Power Spread": {
      pass: 0.45, tempo: 4, motion: 0.3,
      blurb: "Gap-scheme run game from spread sets — counter, power read, QB counter — with RPO tags on everything.",
      pool: ["Gun Split Close", "Gun Power I Tight", "Gun Trips TE", "Gun Wing Trips", "Gun Tight Doubles", "Gun Y-Off Nasty", "Pistol Trips", "Gun Heavy", "Singleback Ace", "Jumbo Heavy"],
      dna: ["gap", "rpo", "qb", "pa", "shot"]
    },
    "Pro Style": {
      pass: 0.53, tempo: 2, motion: 0.3,
      blurb: "NFL structure — 12 and 21 personnel, full protections, deep play-action shots off a real run game.",
      pool: ["I-Form Pro", "I-Form Close", "Strong Close", "Weak Pro", "Singleback Ace", "Singleback Deuce", "Singleback Ace Pair", "Gun Y-Off Close", "Gun Doubles Off", "Gun Mid Close", "Pistol Y-Off Wing", "Jumbo Heavy", "Goal Line"],
      dna: ["zone", "gap", "pa", "verts", "quick"]
    },
    "Run & Shoot": {
      pass: 0.7, tempo: 4, motion: 0.2,
      blurb: "Choice routes and option cuts — the receivers read the coverage with the quarterback. Empty and trips heavy.",
      pool: ["Gun Empty Trey", "Gun Empty Flex", "Gun Trey Open", "Gun Doubles", "Gun Spread Flex", "Gun Split Slot", "Gun Empty Bunch", "Singleback Doubles"],
      dna: ["choice", "quick", "verts", "screen", "mesh"]
    },
    "Spread": {
      pass: 0.58, tempo: 4, motion: 0.3,
      blurb: "Classic 11-personnel spread. Tempo, zone run game, and a quick passing menu that punishes soft coverage.",
      pool: ["Gun Trey Open", "Gun Doubles", "Gun Bunch", "Gun Trips TE", "Gun Y-Off Nasty", "Gun Split Slot", "Gun Empty Trey", "Pistol Trips", "Singleback Ace", "Singleback Wing Trio"],
      dna: ["zone", "quick", "rpo", "mesh", "screen", "verts"]
    },
    "Spread Option": {
      pass: 0.42, tempo: 4, motion: 0.3,
      blurb: "QB run game as the engine — zone read, power read, RPO layers. Your quarterback is the extra ball carrier.",
      pool: ["Gun Trips TE", "Gun Split Close", "Gun Wing Trips", "Pistol Trips", "Pistol Diamond", "Gun Flexbone", "Gun Power I Tight", "Gun Trey Open", "Gun Wildcat", "Singleback Ace"],
      dna: ["option", "rpo", "qb", "zone", "pa"]
    },
    "Veer & Shoot": {
      pass: 0.6, tempo: 5, motion: 0.2,
      blurb: "Extreme-width splits, veer run game, vertical shots. Snap it fast and make the safeties choose.",
      pool: ["Gun Spread Flex", "Gun Empty Flex", "Gun Trey Open", "Gun Split Slot", "Gun Doubles", "Gun Trips TE", "Gun Bunch", "Gun Split Flexbone"],
      dna: ["verts", "option", "shot", "quick", "rpo"]
    }
  };

  /* ---------- DEFENSIVE PLAYBOOKS (all 31 in CFB 27) ----------
     Front families + the suffix that defines coverage/pressure DNA. */
  var DEF_FRONTS = {
    "3-2-6": {
      box: 5, dbs: 6, weight: "light",
      pool: ["Dollar 3-2-6", "Dollar 3-2-6 Mug", "Quarter 3-1-7", "Nickel 3-3-5 Odd", "Dime 4-1-6", "Nickel 2-4-5 Even"],
      note: "Six DBs, five in the box. Elite pass coverage, nothing in the run fits."
    },
    "3-3-5": {
      box: 6, dbs: 5, weight: "light",
      pool: ["3-3-5 Stack", "3-3-5 Odd", "3-3-5 Mint", "3-3-5 Cub", "Nickel 2-4-5 Even", "Dollar 3-2-6", "Dime 4-1-6", "Goal Line 5-3"],
      note: "Stacked, disguised, spill-and-kill. Light box invites downhill runs but the picture is muddy pre-snap."
    },
    "3-4": {
      box: 7, dbs: 4, weight: "heavy",
      pool: ["3-4 Odd", "3-4 Bear", "3-4 Solid", "3-4 Predator", "Nickel 3-3 Mint", "Nickel 2-4-5 Double Mug", "Nickel 4-2-5", "Dime 4-1-6", "Goal Line 5-3"],
      note: "Two-gapping front with four off-ball defenders. Strong run front, edge pressure from either side."
    },
    "4-2-5": {
      box: 6, dbs: 5, weight: "balanced",
      pool: ["Nickel 4-2-5", "Nickel 4-2-5 Odd", "Nickel Double A Gap", "Nickel Over G", "Nickel 2-4-5 Even", "Dime 4-1-6", "4-3 Over", "Goal Line 5-3"],
      note: "The modern base. Four down, two LBs, five DBs — built to live against spread offenses."
    },
    "4-3": {
      box: 7, dbs: 4, weight: "heavy",
      pool: ["4-3 Over", "4-3 Under", "4-3 Stack", "4-3 Odd", "4-3 Bear", "Nickel 4-2-5", "Nickel Double A Gap", "Dime 4-1-6", "Goal Line 5-3"],
      note: "Heavy box, seven-man fits. Hard to run into, slower to match empty and tempo."
    },
    "Multiple": {
      box: 6, dbs: 5, weight: "balanced",
      pool: ["4-3 Over", "3-4 Odd", "3-3-5 Stack", "Nickel 4-2-5", "Nickel Double A Gap", "Nickel 2-4-5 Double Mug", "Dollar 3-2-6", "Dime 4-1-6", "Goal Line 5-3"],
      note: "No tendency to steal. Changes front, shell and pressure by situation."
    }
  };

  /* suffix => coverage & pressure DNA */
  var DEF_FLAVORS = {
    "": { man: 0.4, blitz: 0.22, shell: "mixed", press: 0.35, label: "Base", note: "Balanced call sheet — even split of man and zone, situational pressure." },
    "Man": { man: 0.66, blitz: 0.26, shell: "1-high", press: 0.6, label: "Man", note: "Cover 1 and Cover 0 heavy with a post safety. Expect matched routes and tight windows." },
    "Man Pressure": { man: 0.72, blitz: 0.46, shell: "1-high", press: 0.7, label: "Man Pressure", note: "Blitz-first man coverage. Five and six rushers with man behind it — the most aggressive DNA in the game." },
    "Zone": { man: 0.18, blitz: 0.18, shell: "mixed", press: 0.2, label: "Zone", note: "Spot-drop and match zones. Rush four, keep everything in front, make you take the check-down." },
    "Zone Pressure": { man: 0.26, blitz: 0.45, shell: "1-high", press: 0.3, label: "Zone Pressure", note: "Fire zones — five rushers, three-under three-deep. Free rushers with zone behind them." },
    "Shell": { man: 0.22, blitz: 0.12, shell: "2-high", press: 0.2, label: "Two-High Shell", note: "Two-high shell, four-man rush, everything under the deep coverage. Bends but does not break." },
    "Three High": { man: 0.2, blitz: 0.15, shell: "3-high", press: 0.2, label: "Three-High", note: "Three-deep-safety looks. Almost no explosives allowed; badly outnumbered in the run fit." },
    "Tite": { man: 0.32, blitz: 0.26, shell: "mixed", press: 0.3, label: "Tite Front", note: "0 and 4i technique front to wall off inside runs and force everything to the perimeter." },
    "Multiple": { man: 0.5, blitz: 0.32, shell: "mixed", press: 0.45, label: "Multiple", note: "Truly mixed — man, zone, pressure and shell rotate snap to snap." },
    "Press Quarters": { man: 0.42, blitz: 0.16, shell: "2-high", press: 0.8, label: "Press Quarters", note: "Press-match quarters. Takes away the deep thirds and the quick game outside; soft underneath the seams." },
    "Man Press": { man: 0.68, blitz: 0.28, shell: "1-high", press: 0.85, label: "Man Press", note: "Press man at the line of scrimmage on every snap." }
  };

  /* The 31 defensive playbooks shipped in CFB 27 */
  var DEF_PLAYBOOK_NAMES = [
    "3-2-6",
    "3-3-5", "3-3-5 Man", "3-3-5 Man Pressure", "3-3-5 Shell", "3-3-5 Three High",
    "3-3-5 Tite", "3-3-5 Zone", "3-3-5 Zone Pressure",
    "3-4", "3-4 Man", "3-4 Man Pressure", "3-4 Multiple", "3-4 Shell", "3-4 Zone", "3-4 Zone Pressure",
    "4-2-5", "4-2-5 Man", "4-2-5 Man Pressure", "4-2-5 Shell", "4-2-5 Zone", "4-2-5 Zone Pressure",
    "4-3", "4-3 Man", "4-3 Man Pressure", "4-3 Multiple", "4-3 Press Quarters", "4-3 Shell",
    "4-3 Zone", "4-3 Zone Pressure",
    "Multiple"
  ];

  var DEFENSES = DEF_PLAYBOOK_NAMES.map(function (name) {
    var frontKey = ["3-2-6", "3-3-5", "3-4", "4-2-5", "4-3"].filter(function (f) {
      return name === f || name.indexOf(f + " ") === 0;
    })[0] || "Multiple";
    var suffix = name === frontKey ? "" : name.slice(frontKey.length + 1);
    if (frontKey === "Multiple" && name === "Multiple") suffix = "Multiple";
    var front = DEF_FRONTS[frontKey];
    var flavor = DEF_FLAVORS[suffix] || DEF_FLAVORS[""];
    return {
      id: name,
      name: name,
      front: frontKey,
      flavor: flavor.label,
      box: front.box + (suffix === "Tite" ? -0 : 0),
      dbs: front.dbs,
      weight: front.weight,
      man: flavor.man,
      blitz: flavor.blitz,
      shell: flavor.shell,
      press: flavor.press,
      formations: front.pool,
      frontNote: front.note,
      flavorNote: flavor.note,
      tite: suffix === "Tite"
    };
  });

  /* ---------- TEAM OFFENSIVE PLAYBOOKS (all 138 CFB 27 teams) ----------
     [ team, conference, style, "signature formations|separated" ] */
  var TEAM_ROWS = [
    /* SEC (16) */
    ["Alabama", "SEC", "Pro Style", "Gun Y-Off Close|I-Form Pro|Gun Doubles Off"],
    ["Arkansas", "SEC", "Power Spread", "Gun Split Close|Gun Power I Tight"],
    ["Auburn", "SEC", "Spread Option", "Gun Trips TE|Pistol Trips"],
    ["Florida", "SEC", "Multiple", "Gun Y-Off Nasty|Singleback Ace"],
    ["Georgia", "SEC", "Pro Style", "I-Form Pro|Singleback Deuce|Jumbo Heavy"],
    ["Kentucky", "SEC", "Spread", "Gun Trey Open|Gun Doubles"],
    ["LSU", "SEC", "Multiple", "Gun Bunch Wk|Gun Y-Off Nasty|Gun Empty Trey"],
    ["Mississippi State", "SEC", "Air Raid", "Gun Empty Trey|Gun Bunch"],
    ["Missouri", "SEC", "Power Spread", "Gun Split Close|Gun Tight Doubles"],
    ["Oklahoma", "SEC", "Multiple", "Gun Trips TE|Gun Y-Off Close"],
    ["Ole Miss", "SEC", "Veer & Shoot", "Gun Spread Flex|Gun Empty Flex"],
    ["South Carolina", "SEC", "Spread Option", "Gun Split Close|Gun Wing Trips"],
    ["Tennessee", "SEC", "Veer & Shoot", "Gun Spread Flex|Gun Trey Open|Gun Split Slot"],
    ["Texas", "SEC", "Power Spread", "Gun Split Close|Gun Power I Tight|Gun Bunch"],
    ["Texas A&M", "SEC", "Multiple", "Gun Y-Off Nasty|I-Form Pro"],
    ["Vanderbilt", "SEC", "Spread Option", "Gun Trips TE|Gun Flexbone"],
    /* Big Ten (18) */
    ["Illinois", "Big Ten", "Pro Style", "Singleback Ace|I-Form Close"],
    ["Indiana", "Big Ten", "Spread", "Gun Trey Open|Gun Bunch"],
    ["Iowa", "Big Ten", "Pro Style", "I-Form Pro|Singleback Ace Pair|Jumbo Heavy"],
    ["Maryland", "Big Ten", "Spread", "Gun Doubles|Gun Trips TE"],
    ["Michigan", "Big Ten", "Pro Style", "I-Form Close|Gun Mid Close|Jumbo Heavy"],
    ["Michigan State", "Big Ten", "Multiple", "Gun Y-Off Close|Singleback Deuce"],
    ["Minnesota", "Big Ten", "Pro Style", "I-Form Pro|Strong Close"],
    ["Nebraska", "Big Ten", "Multiple", "Gun Trips TE|Pistol Ace"],
    ["Northwestern", "Big Ten", "Pro Style", "Singleback Ace|Gun Y-Off Close"],
    ["Ohio State", "Big Ten", "Multiple", "Gun Bunch|Gun Doubles Off|Gun Y-Off Nasty|Singleback Ace"],
    ["Oregon", "Big Ten", "Spread", "Gun Trey Open|Gun Y-Off Nasty|Pistol Trips|Gun Bunch"],
    ["Penn State", "Big Ten", "Multiple", "Gun Y-Off Close|I-Form Pro"],
    ["Purdue", "Big Ten", "Air Raid", "Gun Empty Trey|Gun Doubles"],
    ["Rutgers", "Big Ten", "Power Spread", "Gun Power I Tight|Gun Split Close"],
    ["UCLA", "Big Ten", "Pistol", "Pistol Ace|Pistol Trips|Pistol Y-Off Wing"],
    ["USC", "Big Ten", "Pro Style", "Gun Doubles Off|Gun Y-Off Close|Gun Bunch"],
    ["Washington", "Big Ten", "Multiple", "Gun Doubles Off|Gun Y-Off Close"],
    ["Wisconsin", "Big Ten", "Pro Style", "I-Form Pro|Singleback Deuce|Jumbo Heavy"],
    /* Big 12 (16) */
    ["Arizona", "Big 12", "Spread", "Gun Trey Open|Gun Bunch"],
    ["Arizona State", "Big 12", "Power Spread", "Gun Split Close|Gun Tight Doubles"],
    ["Baylor", "Big 12", "Veer & Shoot", "Gun Spread Flex|Gun Split Slot"],
    ["BYU", "Big 12", "Multiple", "Gun Y-Off Close|Pistol Ace"],
    ["Cincinnati", "Big 12", "Spread Option", "Gun Trips TE|Gun Split Close"],
    ["Colorado", "Big 12", "Go Go", "Gun Split Close|Pistol Strong Slot|Gun Split Slot|Pistol Trips"],
    ["Houston", "Big 12", "Air Raid", "Gun Empty Trey|Gun Bunch"],
    ["Iowa State", "Big 12", "Multiple", "Gun Y-Off Nasty|Singleback Ace"],
    ["Kansas", "Big 12", "Power Spread", "Gun Split Close|Gun Power I Tight"],
    ["Kansas State", "Big 12", "Spread Option", "Gun Trips TE|Gun Wing Trips|Gun Power I Tight"],
    ["Oklahoma State", "Big 12", "Air Raid", "Gun Doubles|Gun Empty Trey"],
    ["TCU", "Big 12", "Veer & Shoot", "Gun Spread Flex|Gun Trey Open"],
    ["Texas Tech", "Big 12", "Air Raid", "Gun Empty Trey|Gun Doubles|Gun Bunch"],
    ["UCF", "Big 12", "Spread Option", "Gun Wing Trips|Pistol Trips"],
    ["Utah", "Big 12", "Pro Style", "I-Form Pro|Gun Y-Off Close|Jumbo Heavy"],
    ["West Virginia", "Big 12", "Spread Option", "Gun Power I Tight|Gun Wing Trips|Gun Flexbone"],
    /* ACC (17) */
    ["Boston College", "ACC", "Pro Style", "I-Form Pro|Singleback Deuce"],
    ["California", "ACC", "Spread", "Gun Doubles|Gun Trey Open"],
    ["Clemson", "ACC", "Multiple", "Gun Bunch|Gun Y-Off Close|Pistol Ace"],
    ["Duke", "ACC", "Spread", "Gun Trey Open|Gun Trips TE"],
    ["Florida State", "ACC", "Multiple", "Gun Y-Off Nasty|I-Form Pro"],
    ["Georgia Tech", "ACC", "Spread Option", "Gun Trips TE|Gun Flexbone|Pistol Diamond"],
    ["Louisville", "ACC", "Power Spread", "Gun Split Close|Gun Power I Tight"],
    ["Miami", "ACC", "Multiple", "Gun Bunch|Gun Doubles Off"],
    ["NC State", "ACC", "Spread", "Gun Doubles|Gun Bunch"],
    ["North Carolina", "ACC", "Pro Style", "Gun Y-Off Close|I-Form Pro"],
    ["Pittsburgh", "ACC", "Spread", "Gun Trey Open|Gun Y-Off Nasty"],
    ["SMU", "ACC", "Veer & Shoot", "Gun Spread Flex|Gun Empty Flex"],
    ["Stanford", "ACC", "Pro Style", "I-Form Close|Jumbo Heavy|Singleback Deuce"],
    ["Syracuse", "ACC", "Air Raid", "Gun Empty Trey|Gun Bunch"],
    ["Virginia", "ACC", "Spread", "Gun Trey Open|Gun Doubles"],
    ["Virginia Tech", "ACC", "Multiple", "Gun Y-Off Close|Pistol Ace"],
    ["Wake Forest", "ACC", "Spread Option", "Gun Split Close|Pistol Trips"],
    /* Pac-12 (8) */
    ["Boise State", "Pac-12", "Spread Option", "Gun Trips TE|Singleback Ace|I-Form Pro|Pistol Trips"],
    ["Colorado State", "Pac-12", "Air Raid", "Gun Empty Trey|Gun Doubles"],
    ["Fresno State", "Pac-12", "Spread", "Gun Tight Doubles|Gun Bunch|Gun Trey Open"],
    ["Oregon State", "Pac-12", "Pro Style", "I-Form Pro|Singleback Deuce"],
    ["San Diego State", "Pac-12", "Pro Style", "I-Form Pro|Gun Y-Off Close"],
    ["Texas State", "Pac-12", "Veer & Shoot", "Gun Spread Flex|Gun Trey Open"],
    ["Utah State", "Pac-12", "Spread", "Gun Doubles|Gun Trips TE"],
    ["Washington State", "Pac-12", "Multiple", "Gun Bunch X Nasty|Pistol Trips|Gun Bunch|Gun Empty Bunch"],
    /* Mountain West (10) */
    ["Air Force", "Mountain West", "Option", "Flexbone|Flexbone Diamond|Wishbone"],
    ["Hawai'i", "Mountain West", "Run & Shoot", "Gun Empty Trey|Gun Empty Flex|Gun Doubles"],
    ["Nevada", "Mountain West", "Pistol", "Pistol Ace|Pistol Trips|Pistol Y-Off Wing"],
    ["New Mexico", "Mountain West", "Spread Option", "Gun Trips TE|Pistol Trips"],
    ["North Dakota State", "Mountain West", "Pro Style", "I-Form Pro|Jumbo Heavy|Singleback Deuce"],
    ["Northern Illinois", "Mountain West", "Power Spread", "Gun Split Close|Gun Power I Tight"],
    ["San José State", "Mountain West", "Air Raid", "Gun Empty Trey|Gun Bunch"],
    ["UNLV", "Mountain West", "Spread Option", "Gun Trips TE|Gun Wing Trips"],
    ["UTEP", "Mountain West", "Spread", "Gun Doubles|Gun Trey Open"],
    ["Wyoming", "Mountain West", "Pro Style", "I-Form Pro|Strong Close"],
    /* American (14) */
    ["Army", "American", "Option", "Flexbone|Wishbone|Flexbone Diamond"],
    ["Charlotte", "American", "Multiple", "Gun Bunch|Gun Bunch X Nasty|Gun Empty Bunch"],
    ["East Carolina", "American", "Air Raid", "Gun Empty Trey|Gun Doubles"],
    ["FAU", "American", "Spread", "Gun Trey Open|Gun Bunch"],
    ["Memphis", "American", "Spread", "Gun Doubles|Gun Trips TE"],
    ["Navy", "American", "Option", "Flexbone|Flexbone Diamond|Gun Split Flexbone"],
    ["North Texas", "American", "Air Raid", "Gun Empty Trey|Gun Spread Flex"],
    ["Rice", "American", "Pro Style", "Singleback Ace|I-Form Pro"],
    ["South Florida", "American", "Spread Option", "Gun Trips TE|Pistol Trips"],
    ["Temple", "American", "Spread", "Gun Doubles|Gun Trey Open"],
    ["Tulane", "American", "Power Spread", "Gun Split Close|Gun Power I Tight"],
    ["Tulsa", "American", "Spread", "Gun Trey Open|Gun Doubles"],
    ["UAB", "American", "Air Raid", "Gun Empty Trey|Gun Bunch"],
    ["UTSA", "American", "Spread", "Gun Bunch|Gun Doubles"],
    /* Conference USA (11) */
    ["Delaware", "Conference USA", "Spread", "Gun Trey Open|Gun Doubles"],
    ["FIU", "Conference USA", "Spread", "Gun Doubles|Gun Trips TE"],
    ["Jacksonville State", "Conference USA", "Power Spread", "Gun Split Close|Gun Power I Tight"],
    ["Kennesaw State", "Conference USA", "Spread Option", "Gun Flexbone|Gun Trips TE"],
    ["Liberty", "Conference USA", "Spread Option", "Gun Wing Trips|Gun Power I Tight|Pistol Trips"],
    ["Louisiana Tech", "Conference USA", "Spread", "Gun Doubles|Gun Bunch"],
    ["Middle Tennessee", "Conference USA", "Spread", "Gun Trey Open|Gun Doubles"],
    ["Missouri State", "Conference USA", "Air Raid", "Gun Empty Trey|Gun Doubles"],
    ["New Mexico State", "Conference USA", "Spread", "Gun Doubles|Gun Trips TE"],
    ["Sam Houston", "Conference USA", "Power Spread", "Gun Split Close|Gun Tight Doubles"],
    ["Western Kentucky", "Conference USA", "Air Raid", "Gun Empty Trey|Gun Bunch"],
    /* MAC (13) */
    ["Akron", "MAC", "Spread", "Gun Doubles|Gun Trey Open"],
    ["Ball State", "MAC", "Spread", "Gun Trips TE|Gun Doubles"],
    ["Bowling Green", "MAC", "Spread", "Gun Trey Open|Gun Bunch"],
    ["Buffalo", "MAC", "Pro Style", "I-Form Pro|Singleback Ace"],
    ["Central Michigan", "MAC", "Pro Style", "Singleback Ace|Gun Y-Off Close"],
    ["Eastern Michigan", "MAC", "Spread", "Gun Doubles|Gun Trips TE"],
    ["Kent State", "MAC", "Spread Option", "Gun Trips TE|Gun Flexbone"],
    ["Massachusetts", "MAC", "Spread", "Gun Trey Open|Gun Doubles"],
    ["Miami (OH)", "MAC", "Pro Style", "I-Form Pro|Singleback Deuce"],
    ["Ohio", "MAC", "Spread Option", "Gun Trips TE|Pistol Trips"],
    ["Sacramento State", "MAC", "Spread", "Gun Doubles|Gun Bunch"],
    ["Toledo", "MAC", "Spread", "Gun Trey Open|Gun Trips TE"],
    ["Western Michigan", "MAC", "Spread", "Gun Doubles|Gun Bunch"],
    /* Sun Belt (13) */
    ["Appalachian State", "Sun Belt", "Power Spread", "Gun Power I Tight|Gun Split Close"],
    ["Arkansas State", "Sun Belt", "Air Raid", "Gun Empty Trey|Gun Doubles"],
    ["Coastal Carolina", "Sun Belt", "Spread Option", "Gun Trips TE|Gun Flexbone|Gun Wildcat"],
    ["Georgia Southern", "Sun Belt", "Spread Option", "Gun Flexbone|Gun Split Flexbone|Pistol Diamond|Gun Trips TE"],
    ["Georgia State", "Sun Belt", "Spread", "Gun Doubles|Gun Trips TE"],
    ["James Madison", "Sun Belt", "Power Spread", "Gun Split Close|Gun Power I Tight"],
    ["Louisiana", "Sun Belt", "Pro Style", "I-Form Pro|Pistol Ace|Jumbo Heavy"],
    ["Louisiana-Monroe", "Sun Belt", "Spread", "Gun Doubles|Gun Trey Open"],
    ["Marshall", "Sun Belt", "Spread Option", "Gun Trips TE|Pistol Trips"],
    ["Old Dominion", "Sun Belt", "Spread", "Gun Trey Open|Gun Doubles"],
    ["South Alabama", "Sun Belt", "Spread", "Gun Bunch|Gun Doubles"],
    ["Southern Miss", "Sun Belt", "Power Spread", "Gun Split Close|Gun Tight Doubles"],
    ["Troy", "Sun Belt", "Spread", "Gun Doubles|Gun Trips TE"],
    /* Independents (2) */
    ["Notre Dame", "Independent", "Multiple", "Gun Trips TE|Gun Bunch|Gun Cluster Wing|I-Form Pro"],
    ["UConn", "Independent", "Pro Style", "I-Form Pro|Singleback Ace"]
  ];

  var OFFENSES = [];
  TEAM_ROWS.forEach(function (r) {
    OFFENSES.push({
      id: "team:" + r[0],
      name: r[0],
      kind: "team",
      conference: r[1],
      style: r[2],
      signature: r[3] ? r[3].split("|") : []
    });
  });
  Object.keys(OFF_STYLES).forEach(function (s) {
    OFFENSES.push({
      id: "scheme:" + s,
      name: s,
      kind: "scheme",
      conference: "Scheme playbook",
      style: s,
      signature: []
    });
  });

  global.CFB27_DATA = {
    FORMATIONS: FORMATIONS,
    OFF_STYLES: OFF_STYLES,
    OFFENSES: OFFENSES,
    DEFENSES: DEFENSES,
    DEF_FRONTS: DEF_FRONTS,
    DEF_FLAVORS: DEF_FLAVORS
  };
})(typeof window !== "undefined" ? window : globalThis);
