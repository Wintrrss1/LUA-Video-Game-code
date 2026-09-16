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
     Every name below is a formation verified to exist in CFB 27's playbooks
     (cross-checked against the public CFB 27 formation database). Madden-only
     sets (Gun Empty Trey, Gun Doubles Off, Gun Mid Close, Jumbo Heavy,
     Swinging Gate, Wishbone, Split Backs ...) are deliberately absent.
     [ name, personnel, family tags ] */
  var FORMATION_ROWS = [
    ["Gun Bunch", "11", ["gun", "bunch", "spread"]],
    ["Gun Bunch TE", "12", ["gun", "bunch", "te", "tight"]],
    ["Gun Bunch X Nasty", "11", ["gun", "bunch", "spread", "nasty"]],
    ["Gun Bunch Str Nasty", "11", ["gun", "bunch", "tight", "nasty"]],
    ["Gun Trips", "11", ["gun", "trips", "spread"]],
    ["Gun Trips TE", "11", ["gun", "trips", "te", "tight"]],
    ["Gun Trey Open", "11", ["gun", "trips", "spread"]],
    ["Gun Y Trips Wk", "11", ["gun", "trips", "spread"]],
    ["Gun Y Off Trips", "11", ["gun", "trips", "te", "tight"]],
    ["Gun Doubles Y Off", "11", ["gun", "doubles", "te", "tight"]],
    ["Gun Doubles Y Off Wk", "11", ["gun", "doubles", "te"]],
    ["Gun Deuce", "12", ["gun", "doubles", "te", "tight"]],
    ["Gun Spread Y Slot", "11", ["gun", "spread", "doubles"]],
    ["Gun Spread Y Slot Wk", "11", ["gun", "spread", "doubles"]],
    ["Gun Slot Left Wk", "11", ["gun", "spread", "doubles"]],
    ["Gun Empty Base", "10", ["gun", "empty", "spread"]],
    ["Gun Empty Quads", "10", ["gun", "empty", "spread"]],
    ["Gun Empty Y Flex", "10", ["gun", "empty", "spread"]],
    ["Gun Empty Bunch Open", "10", ["gun", "empty", "bunch"]],
    ["Gun Empty Y Off Trips", "10", ["gun", "empty", "trips"]],
    ["Gun Power I Tight", "21", ["gun", "heavy", "2back", "tight"]],
    ["Gun Flexbone Heavy", "21", ["gun", "option", "flex", "heavy"]],
    ["Gun Wide Full House", "20", ["gun", "option", "heavy", "2back"]],
    ["Pistol Ace", "11", ["pistol", "single"]],
    ["Pistol Ace Slot", "11", ["pistol", "single", "spread"]],
    ["Pistol Deuce", "12", ["pistol", "te", "tight"]],
    ["Pistol Trips", "11", ["pistol", "trips"]],
    ["Pistol Wing", "12", ["pistol", "tight", "te"]],
    ["Pistol Tight Y Off Flex", "12", ["pistol", "tight", "te"]],
    ["Singleback Ace", "11", ["single", "tight"]],
    ["Singleback Bunch Ace", "11", ["single", "bunch"]],
    ["Singleback Wing", "12", ["single", "te", "tight"]],
    ["Singleback Wing Pair", "12", ["single", "te"]],
    ["I Form Pro", "21", ["iform", "2back", "uc"]],
    ["I Form Tight", "22", ["iform", "heavy", "uc"]],
    ["Flexbone Normal", "20", ["uc", "option", "flex"]],
    ["Flexbone Tight", "20", ["uc", "option", "flex", "heavy"]],
    ["Flexbone Slot", "20", ["uc", "option", "flex"]],
    ["Flexbone Close", "20", ["uc", "option", "flex", "tight"]],
    ["Flexbone Trips", "20", ["uc", "option", "flex", "trips"]],
    ["Flexbone Heavy", "21", ["uc", "option", "heavy", "flex"]],
    ["Full House Pro", "20", ["uc", "option", "heavy", "2back"]],
    ["Wildcat U Off Trips", "11", ["wildcat", "gun", "trips"]],
    ["Goal Line Normal", "23", ["gl", "heavy", "uc"]]
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
      pool: ["Gun Empty Base", "Gun Empty Quads", "Gun Empty Y Flex", "Gun Empty Bunch Open", "Gun Bunch", "Gun Trey Open", "Gun Trips", "Gun Spread Y Slot", "Gun Slot Left Wk", "Singleback Ace"],
      dna: ["mesh", "verts", "quick", "choice", "screen"]
    },
    "Go Go": {
      pass: 0.56, tempo: 5, motion: 0.45,
      blurb: "Two-back shotgun and pistol sets with constant motion and tempo. Marries the run game to jet/orbit action.",
      pool: ["Gun Power I Tight", "Gun Spread Y Slot", "Pistol Trips", "Pistol Ace Slot", "Gun Trips TE", "Gun Bunch", "Gun Doubles Y Off", "Pistol Ace", "Gun Wide Full House", "Singleback Wing"],
      dna: ["motion", "zone", "rpo", "screen", "pa"]
    },
    "Multiple": {
      pass: 0.52, tempo: 3, motion: 0.35,
      blurb: "The widest menu in the game — under center, pistol and gun, every personnel grouping. Built to answer any front.",
      pool: ["Gun Bunch", "Gun Trips TE", "Gun Doubles Y Off", "Gun Y Off Trips", "Gun Bunch Str Nasty", "Gun Empty Base", "Pistol Ace", "Pistol Deuce", "Singleback Ace", "Singleback Wing Pair", "I Form Pro", "I Form Tight", "Gun Power I Tight", "Goal Line Normal"],
      dna: ["zone", "gap", "pa", "mesh", "verts", "quick", "screen"]
    },
    "Option": {
      pass: 0.24, tempo: 2, motion: 0.3,
      blurb: "Flexbone triple option. Make the edge defender wrong every snap, then hit the play-action shot off it.",
      pool: ["Flexbone Normal", "Flexbone Tight", "Flexbone Slot", "Flexbone Trips", "Flexbone Close", "Gun Flexbone Heavy", "Full House Pro", "I Form Tight", "Goal Line Normal"],
      dna: ["option", "gap", "pa", "shot"]
    },
    "Pistol": {
      pass: 0.5, tempo: 3, motion: 0.35,
      blurb: "Downhill pistol run game with a full play-action tree — same backfield picture on run and pass.",
      pool: ["Pistol Ace", "Pistol Trips", "Pistol Deuce", "Pistol Wing", "Pistol Tight Y Off Flex", "Pistol Ace Slot", "Gun Doubles Y Off", "Singleback Ace", "I Form Pro"],
      dna: ["zone", "gap", "pa", "rpo", "shot"]
    },
    "Power Spread": {
      pass: 0.45, tempo: 4, motion: 0.3,
      blurb: "Gap-scheme run game from spread sets — counter, power read, QB counter — with RPO tags on everything.",
      pool: ["Gun Power I Tight", "Gun Trips TE", "Gun Y Off Trips", "Gun Deuce", "Gun Bunch Str Nasty", "Gun Bunch TE", "Pistol Trips", "Wildcat U Off Trips", "Singleback Ace", "Goal Line Normal"],
      dna: ["gap", "rpo", "qb", "pa", "shot"]
    },
    "Pro Style": {
      pass: 0.53, tempo: 2, motion: 0.3,
      blurb: "NFL structure — 12 and 21 personnel, full protections, deep play-action shots off a real run game.",
      pool: ["I Form Pro", "I Form Tight", "Singleback Ace", "Singleback Wing Pair", "Singleback Wing", "Gun Doubles Y Off", "Gun Deuce", "Gun Bunch TE", "Gun Y Off Trips", "Pistol Wing", "Pistol Deuce", "Goal Line Normal"],
      dna: ["zone", "gap", "pa", "verts", "quick"]
    },
    "Run & Shoot": {
      pass: 0.7, tempo: 4, motion: 0.2,
      blurb: "Choice routes and option cuts — the receivers read the coverage with the quarterback. Empty and trips heavy.",
      pool: ["Gun Empty Base", "Gun Empty Y Flex", "Gun Empty Quads", "Gun Empty Bunch Open", "Gun Trey Open", "Gun Spread Y Slot", "Gun Slot Left Wk", "Gun Trips"],
      dna: ["choice", "quick", "verts", "screen", "mesh"]
    },
    "Spread": {
      pass: 0.58, tempo: 4, motion: 0.3,
      blurb: "Classic 11-personnel spread. Tempo, zone run game, and a quick passing menu that punishes soft coverage.",
      pool: ["Gun Trey Open", "Gun Spread Y Slot", "Gun Bunch", "Gun Trips TE", "Gun Trips", "Gun Doubles Y Off", "Gun Y Trips Wk", "Gun Empty Base", "Pistol Trips", "Singleback Ace"],
      dna: ["zone", "quick", "rpo", "mesh", "screen", "verts"]
    },
    "Spread Option": {
      pass: 0.42, tempo: 4, motion: 0.3,
      blurb: "QB run game as the engine — zone read, power read, RPO layers. Your quarterback is the extra ball carrier.",
      pool: ["Gun Trips TE", "Gun Power I Tight", "Gun Y Off Trips", "Pistol Trips", "Gun Flexbone Heavy", "Wildcat U Off Trips", "Gun Trey Open", "Flexbone Slot", "Singleback Ace", "Goal Line Normal"],
      dna: ["option", "rpo", "qb", "zone", "pa"]
    },
    "Veer & Shoot": {
      pass: 0.6, tempo: 5, motion: 0.2,
      blurb: "Extreme-width splits, veer run game, vertical shots. Snap it fast and make the safeties choose.",
      pool: ["Gun Spread Y Slot", "Gun Spread Y Slot Wk", "Gun Empty Y Flex", "Gun Empty Quads", "Gun Trey Open", "Gun Slot Left Wk", "Gun Trips", "Gun Bunch"],
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
    ["Alabama", "SEC", "Pro Style", "Gun Doubles Y Off|I Form Pro|Gun Bunch"],
    ["Arkansas", "SEC", "Power Spread", "Gun Power I Tight|Gun Empty Y Flex"],
    ["Auburn", "SEC", "Spread Option", "Gun Trips TE|Pistol Trips"],
    ["Florida", "SEC", "Multiple", "Gun Bunch Str Nasty|Singleback Ace|Gun Empty Y Off Trips"],
    ["Georgia", "SEC", "Pro Style", "I Form Pro|Singleback Wing Pair|Goal Line Normal|Gun Empty Y Flex"],
    ["Kentucky", "SEC", "Spread", "Gun Trey Open|Gun Spread Y Slot"],
    ["LSU", "SEC", "Multiple", "Gun Bunch Str Nasty|Gun Empty Base"],
    ["Mississippi State", "SEC", "Air Raid", "Gun Empty Base|Gun Bunch"],
    ["Missouri", "SEC", "Power Spread", "Gun Power I Tight|Gun Deuce"],
    ["Oklahoma", "SEC", "Multiple", "Gun Trips TE|Gun Doubles Y Off|Gun Empty Bunch Open"],
    ["Ole Miss", "SEC", "Veer & Shoot", "Gun Spread Y Slot Wk|Gun Empty Y Flex"],
    ["South Carolina", "SEC", "Spread Option", "Gun Power I Tight|Gun Y Off Trips|Gun Empty Bunch Open"],
    ["Tennessee", "SEC", "Veer & Shoot", "Gun Spread Y Slot Wk|Gun Trey Open|Gun Spread Y Slot|Gun Wide Full House"],
    ["Texas", "SEC", "Power Spread", "Gun Power I Tight|Gun Bunch"],
    ["Texas A&M", "SEC", "Multiple", "Gun Bunch Str Nasty|I Form Pro"],
    ["Vanderbilt", "SEC", "Spread Option", "Gun Trips TE|Gun Flexbone Heavy"],
    /* Big Ten (18) */
    ["Illinois", "Big Ten", "Pro Style", "Singleback Ace|I Form Pro|Gun Empty Quads"],
    ["Indiana", "Big Ten", "Spread", "Gun Trey Open|Gun Bunch"],
    ["Iowa", "Big Ten", "Pro Style", "I Form Pro|Singleback Wing Pair|Goal Line Normal"],
    ["Maryland", "Big Ten", "Spread", "Gun Spread Y Slot|Gun Trips TE"],
    ["Michigan", "Big Ten", "Pro Style", "I Form Pro|Gun Deuce|Goal Line Normal"],
    ["Michigan State", "Big Ten", "Multiple", "Gun Doubles Y Off|Singleback Wing Pair"],
    ["Minnesota", "Big Ten", "Pro Style", "I Form Pro|I Form Tight"],
    ["Nebraska", "Big Ten", "Multiple", "Gun Trips TE|Pistol Ace"],
    ["Northwestern", "Big Ten", "Pro Style", "Singleback Ace|Gun Doubles Y Off"],
    ["Ohio State", "Big Ten", "Multiple", "Gun Bunch|Gun Doubles Y Off|Gun Bunch Str Nasty|Singleback Ace"],
    ["Oregon", "Big Ten", "Spread", "Gun Trey Open|Gun Bunch Str Nasty|Pistol Trips|Gun Bunch"],
    ["Penn State", "Big Ten", "Multiple", "Gun Doubles Y Off|I Form Pro"],
    ["Purdue", "Big Ten", "Air Raid", "Gun Empty Base|Gun Spread Y Slot"],
    ["Rutgers", "Big Ten", "Power Spread", "Gun Power I Tight"],
    ["UCLA", "Big Ten", "Pistol", "Pistol Ace|Pistol Trips|Pistol Tight Y Off Flex"],
    ["USC", "Big Ten", "Pro Style", "Gun Doubles Y Off|Gun Bunch"],
    ["Washington", "Big Ten", "Multiple", "Gun Doubles Y Off"],
    ["Wisconsin", "Big Ten", "Pro Style", "I Form Pro|Singleback Wing Pair|Goal Line Normal|Gun Spread Y Slot"],
    /* Big 12 (16) */
    ["Arizona", "Big 12", "Spread", "Gun Trey Open|Gun Bunch"],
    ["Arizona State", "Big 12", "Power Spread", "Gun Power I Tight|Gun Deuce"],
    ["Baylor", "Big 12", "Veer & Shoot", "Gun Spread Y Slot Wk|Gun Spread Y Slot|Pistol Ace"],
    ["BYU", "Big 12", "Multiple", "Gun Doubles Y Off|Pistol Ace"],
    ["Cincinnati", "Big 12", "Spread Option", "Gun Trips TE|Gun Power I Tight"],
    ["Colorado", "Big 12", "Go Go", "Gun Power I Tight|Pistol Ace Slot|Gun Spread Y Slot|Pistol Trips"],
    ["Houston", "Big 12", "Air Raid", "Gun Empty Base|Gun Bunch|Gun Spread Y Slot"],
    ["Iowa State", "Big 12", "Multiple", "Gun Bunch Str Nasty|Singleback Ace|Gun Empty Bunch Open"],
    ["Kansas", "Big 12", "Power Spread", "Gun Power I Tight"],
    ["Kansas State", "Big 12", "Spread Option", "Gun Trips TE|Gun Y Off Trips|Gun Power I Tight"],
    ["Oklahoma State", "Big 12", "Air Raid", "Gun Spread Y Slot|Gun Empty Base"],
    ["TCU", "Big 12", "Veer & Shoot", "Gun Spread Y Slot Wk|Gun Trey Open"],
    ["Texas Tech", "Big 12", "Air Raid", "Gun Empty Base|Gun Spread Y Slot|Gun Bunch"],
    ["UCF", "Big 12", "Spread Option", "Gun Y Off Trips|Pistol Trips"],
    ["Utah", "Big 12", "Pro Style", "I Form Pro|Gun Doubles Y Off|Goal Line Normal"],
    ["West Virginia", "Big 12", "Spread Option", "Gun Power I Tight|Gun Y Off Trips|Gun Flexbone Heavy"],
    /* ACC (17) */
    ["Boston College", "ACC", "Pro Style", "I Form Pro|Singleback Wing Pair"],
    ["California", "ACC", "Spread", "Gun Spread Y Slot|Gun Trey Open|Gun Empty Quads|Gun Trips TE"],
    ["Clemson", "ACC", "Multiple", "Gun Bunch|Gun Doubles Y Off|Pistol Ace"],
    ["Duke", "ACC", "Spread", "Gun Trey Open|Gun Trips TE"],
    ["Florida State", "ACC", "Multiple", "Gun Bunch Str Nasty|I Form Pro"],
    ["Georgia Tech", "ACC", "Spread Option", "Gun Trips TE|Gun Flexbone Heavy|Full House Pro|Gun Empty Y Off Trips"],
    ["Louisville", "ACC", "Power Spread", "Gun Power I Tight"],
    ["Miami", "ACC", "Multiple", "Gun Bunch|Gun Doubles Y Off"],
    ["NC State", "ACC", "Spread", "Gun Spread Y Slot|Gun Bunch"],
    ["North Carolina", "ACC", "Pro Style", "Gun Doubles Y Off|I Form Pro"],
    ["Pittsburgh", "ACC", "Spread", "Gun Trey Open|Gun Bunch Str Nasty"],
    ["SMU", "ACC", "Veer & Shoot", "Gun Spread Y Slot Wk|Gun Empty Y Flex"],
    ["Stanford", "ACC", "Pro Style", "I Form Pro|Goal Line Normal|Singleback Wing Pair"],
    ["Syracuse", "ACC", "Air Raid", "Gun Empty Base|Gun Bunch"],
    ["Virginia", "ACC", "Spread", "Gun Trey Open|Gun Spread Y Slot"],
    ["Virginia Tech", "ACC", "Multiple", "Gun Doubles Y Off|Pistol Ace"],
    ["Wake Forest", "ACC", "Spread Option", "Gun Power I Tight|Pistol Trips"],
    /* Pac-12 (8) */
    ["Boise State", "Pac-12", "Spread Option", "Gun Trips TE|Singleback Ace|I Form Pro|Pistol Trips|Gun Bunch"],
    ["Colorado State", "Pac-12", "Air Raid", "Gun Empty Base|Gun Spread Y Slot"],
    ["Fresno State", "Pac-12", "Spread", "Gun Deuce|Gun Bunch|Gun Trey Open"],
    ["Oregon State", "Pac-12", "Pro Style", "I Form Pro|Singleback Wing Pair"],
    ["San Diego State", "Pac-12", "Pro Style", "I Form Pro|Gun Doubles Y Off|Pistol Ace"],
    ["Texas State", "Pac-12", "Veer & Shoot", "Gun Spread Y Slot Wk|Gun Trey Open"],
    ["Utah State", "Pac-12", "Spread", "Gun Spread Y Slot|Gun Trips TE"],
    ["Washington State", "Pac-12", "Air Raid", "Gun Bunch X Nasty|Pistol Trips|Gun Bunch|Gun Empty Bunch Open"],
    /* Mountain West (10) */
    ["Air Force", "Mountain West", "Option", "Flexbone Normal|Flexbone Slot|Flexbone Tight|Flexbone Close|Flexbone Trips|Full House Pro"],
    ["Hawai'i", "Mountain West", "Run & Shoot", "Gun Empty Base|Gun Empty Y Flex|Gun Spread Y Slot"],
    ["Nevada", "Mountain West", "Pistol", "Pistol Ace|Pistol Trips|Pistol Tight Y Off Flex"],
    ["New Mexico", "Mountain West", "Spread Option", "Gun Trips TE|Pistol Trips"],
    ["North Dakota State", "Mountain West", "Pro Style", "I Form Pro|Goal Line Normal|Singleback Wing Pair"],
    ["Northern Illinois", "Mountain West", "Power Spread", "Gun Power I Tight"],
    ["San José State", "Mountain West", "Air Raid", "Gun Empty Base|Gun Bunch"],
    ["UNLV", "Mountain West", "Spread Option", "Gun Trips TE|Gun Y Off Trips"],
    ["UTEP", "Mountain West", "Spread", "Gun Spread Y Slot|Gun Trey Open"],
    ["Wyoming", "Mountain West", "Pro Style", "I Form Pro|I Form Tight|Gun Y Trips Wk"],
    /* American (14) */
    ["Army", "American", "Option", "Flexbone Normal|Flexbone Tight|Flexbone Slot|Flexbone Heavy|Full House Pro"],
    ["Charlotte", "American", "Multiple", "Gun Bunch|Gun Bunch X Nasty|Gun Empty Bunch Open"],
    ["East Carolina", "American", "Air Raid", "Gun Empty Base|Gun Spread Y Slot"],
    ["FAU", "American", "Spread", "Gun Trey Open|Gun Bunch|Gun Empty Y Flex"],
    ["Memphis", "American", "Spread", "Gun Spread Y Slot|Gun Trips TE"],
    ["Navy", "American", "Option", "Flexbone Normal|Flexbone Slot|Flexbone Trips"],
    ["North Texas", "American", "Air Raid", "Gun Empty Base|Gun Spread Y Slot Wk"],
    ["Rice", "American", "Pro Style", "Singleback Ace|I Form Pro"],
    ["South Florida", "American", "Spread Option", "Gun Trips TE|Pistol Trips"],
    ["Temple", "American", "Spread", "Gun Spread Y Slot|Gun Trey Open"],
    ["Tulane", "American", "Power Spread", "Gun Power I Tight"],
    ["Tulsa", "American", "Spread", "Gun Trey Open|Gun Spread Y Slot"],
    ["UAB", "American", "Air Raid", "Gun Empty Base|Gun Bunch"],
    ["UTSA", "American", "Spread", "Gun Bunch|Gun Spread Y Slot"],
    /* Conference USA (11) */
    ["Delaware", "Conference USA", "Spread", "Gun Trey Open|Gun Spread Y Slot"],
    ["FIU", "Conference USA", "Spread", "Gun Spread Y Slot|Gun Trips TE"],
    ["Jacksonville State", "Conference USA", "Power Spread", "Gun Power I Tight"],
    ["Kennesaw State", "Conference USA", "Spread Option", "Gun Flexbone Heavy|Gun Trips TE"],
    ["Liberty", "Conference USA", "Spread Option", "Gun Y Off Trips|Gun Power I Tight|Pistol Trips"],
    ["Louisiana Tech", "Conference USA", "Spread", "Gun Spread Y Slot|Gun Bunch|Gun Empty Quads"],
    ["Middle Tennessee", "Conference USA", "Spread", "Gun Trey Open|Gun Spread Y Slot"],
    ["Missouri State", "Conference USA", "Air Raid", "Gun Empty Base|Gun Spread Y Slot"],
    ["New Mexico State", "Conference USA", "Spread", "Gun Spread Y Slot|Gun Trips TE"],
    ["Sam Houston", "Conference USA", "Power Spread", "Gun Power I Tight|Gun Deuce"],
    ["Western Kentucky", "Conference USA", "Air Raid", "Gun Empty Base|Gun Bunch"],
    /* MAC (13) */
    ["Akron", "MAC", "Spread", "Gun Spread Y Slot|Gun Trey Open"],
    ["Ball State", "MAC", "Spread", "Gun Trips TE|Gun Spread Y Slot|Gun Empty Y Off Trips"],
    ["Bowling Green", "MAC", "Spread", "Gun Trey Open|Gun Bunch"],
    ["Buffalo", "MAC", "Pro Style", "I Form Pro|Singleback Ace"],
    ["Central Michigan", "MAC", "Pro Style", "Singleback Ace|Gun Doubles Y Off"],
    ["Eastern Michigan", "MAC", "Spread", "Gun Spread Y Slot|Gun Trips TE|Pistol Ace"],
    ["Kent State", "MAC", "Spread Option", "Gun Trips TE|Gun Flexbone Heavy"],
    ["Massachusetts", "MAC", "Spread", "Gun Trey Open|Gun Spread Y Slot"],
    ["Miami (OH)", "MAC", "Pro Style", "I Form Pro|Singleback Wing Pair"],
    ["Ohio", "MAC", "Spread Option", "Gun Trips TE|Pistol Trips"],
    ["Sacramento State", "MAC", "Spread", "Gun Spread Y Slot|Gun Bunch"],
    ["Toledo", "MAC", "Spread", "Gun Trey Open|Gun Trips TE"],
    ["Western Michigan", "MAC", "Spread", "Gun Spread Y Slot|Gun Bunch"],
    /* Sun Belt (13) */
    ["Appalachian State", "Sun Belt", "Power Spread", "Gun Power I Tight"],
    ["Arkansas State", "Sun Belt", "Air Raid", "Gun Empty Base|Gun Spread Y Slot"],
    ["Coastal Carolina", "Sun Belt", "Spread Option", "Gun Trips TE|Gun Flexbone Heavy|Wildcat U Off Trips|Pistol Ace"],
    ["Georgia Southern", "Sun Belt", "Spread Option", "Gun Flexbone Heavy|Flexbone Slot|Full House Pro|Gun Trips TE|Gun Empty Base"],
    ["Georgia State", "Sun Belt", "Spread", "Gun Spread Y Slot|Gun Trips TE"],
    ["James Madison", "Sun Belt", "Power Spread", "Gun Power I Tight"],
    ["Louisiana", "Sun Belt", "Pro Style", "I Form Pro|Pistol Ace|Goal Line Normal|Gun Spread Y Slot"],
    ["Louisiana-Monroe", "Sun Belt", "Spread", "Gun Spread Y Slot|Gun Trey Open"],
    ["Marshall", "Sun Belt", "Spread Option", "Gun Trips TE|Pistol Trips"],
    ["Old Dominion", "Sun Belt", "Spread", "Gun Trey Open|Gun Spread Y Slot"],
    ["South Alabama", "Sun Belt", "Spread", "Gun Bunch|Gun Spread Y Slot"],
    ["Southern Miss", "Sun Belt", "Power Spread", "Gun Power I Tight|Gun Deuce"],
    ["Troy", "Sun Belt", "Spread", "Gun Spread Y Slot|Gun Trips TE"],
    /* Independents (2) */
    ["Notre Dame", "Independent", "Multiple", "Gun Trips TE|Gun Bunch|Gun Bunch TE|I Form Pro"],
    ["UConn", "Independent", "Pro Style", "I Form Pro|Singleback Ace|Gun Trips TE"]
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
