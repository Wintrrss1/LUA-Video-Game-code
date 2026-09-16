# 🏈 CFB 27 Play Caller

Pick **your offensive playbook** and **your opponent's defensive playbook** from EA Sports
College Football 27, and get:

1. **A game plan** — how to attack that specific defensive playbook (box count, coverage shell,
   man/zone split, pressure rate, press tendency), and what it is going to show you.
2. **A 15-play opening script** — in order, Walsh-style, with the read and the intent of every call.
3. **A full down-and-distance call sheet** — 18 situational blocks, 80+ calls, each with formation,
   personnel, motion, protection and why it beats what they run.

Print it (or save it as a PDF) and you have a real laminated sheet for your dynasty games.

**Live app: https://wintrrss1.github.io/LUA-Video-Game-code/cfb27/**
In Safari or Chrome: open it, then **Share → Add to Home Screen**. It works fully offline after
the first load.

---

## What's included

| | Count |
|---|---|
| Team offensive playbooks | **138** (every CFB 27 team) |
| Scheme offensive playbooks | **11** — Air Raid, Go Go, Multiple, Option, Pistol, Power Spread, Pro Style, Run & Shoot, Spread, Spread Option, Veer & Shoot |
| Defensive playbooks | **31** — the 3-2-6, 3-3-5, 3-4, 4-2-5, 4-3 and Multiple families with every Man / Zone / Pressure / Shell / Tite / Three High / Press Quarters variant |
| Formations in the catalog | **44**, every one a real CFB 27 formation (Gun, Pistol, Singleback, I Form, Flexbone, Full House, Wildcat, Goal Line) |
| Play concepts | 108, each tagged with what it beats |
| Matchups | 149 × 31 = **4,619**, each generating a complete sheet |

### Call sheet sections
1st & 10 · 2nd & Short / Medium / Long · 3rd & Short / Medium / Long · 4th Down ·
Red Zone 20-11 · Red Zone 10-4 · Goal Line · Backed Up · Two-Minute · Four-Minute ·
Shots · Screens · Trick / Specials · Two-Point.

---

## How the generator works

Each defensive playbook is reduced to a profile — **box count, DB count, coverage shell
(1-high / 2-high / 3-high), man percentage, pressure rate, press rate, tite front** — and each
concept in the library is tagged with what it *beats* (`man`, `zone`, `blitz`, `press`,
`light-box`, `heavy-box`, `1-high`, `2-high`, `3-high`, `six-db`, `tite`, `match`).

For every slot on the sheet the engine scores candidate concepts by:

- **matchup fit** — how heavily the defense presents the tags this concept attacks,
- **playbook fit** — whether your style actually carries that concept (an Air Raid book does not
  get midline option; a flexbone book does not get four verticals out of empty),
- **formation legality** — you cannot hand off, run an RPO or fake a run out of an empty set,
- **variety** — no repeated concept, and formations rotate inside a section.

Then it dresses the call with a formation from *your* playbook's pool (signature sets weighted
first), a motion (more often against man), and a protection (max protect against heavy pressure,
five-man in empty, slide away from a 3-tech).

Everything is seeded: the same matchup always produces the same sheet, and **↻ Re-roll** advances
the seed for a fresh one.

---

## Data sourcing — no Madden content

Every formation in the catalog is a formation that exists in **CFB 27**, checked name-by-name
against the game's public formation database. Madden-only sets are deliberately excluded —
if you have seen these in a call-sheet tool before, they are Madden's, not CFB 27's:

> ~~Swinging Gate~~, ~~Gun Empty Trey~~, ~~Gun Doubles Off~~, ~~Gun Mid Close~~, ~~Gun Y-Off Nasty~~,
> ~~Singleback Ace Pair~~, ~~Jumbo Heavy~~, ~~Wishbone~~, ~~Split Backs~~, ~~Full House Wide~~,
> ~~Strong Close~~, ~~Weak Pro~~, ~~Pistol Diamond~~

CFB 27 names them differently, and those are the names used here: `Gun Empty Base`,
`Gun Empty Quads`, `Gun Empty Y Flex`, `Gun Empty Bunch Open`, `Gun Empty Y Off Trips`,
`Gun Doubles Y Off`, `Gun Deuce`, `Gun Bunch X Nasty`, `Gun Bunch Str Nasty`, `Gun Y Trips Wk`,
`Gun Y Off Trips`, `Gun Spread Y Slot`, `Gun Slot Left Wk`, `Gun Power I Tight`,
`Gun Wide Full House`, `Gun Flexbone Heavy`, `Pistol Ace Slot`, `Pistol Tight Y Off Flex`,
`Singleback Bunch Ace`, `Singleback Wing Pair`, `I Form Pro`, `I Form Tight`, `Flexbone Normal`,
`Flexbone Slot`, `Flexbone Trips`, `Flexbone Close`, `Flexbone Tight`, `Flexbone Heavy`,
`Full House Pro`, `Wildcat U Off Trips`, `Goal Line Normal` and the rest.

Also verified from the database, and baked in as team signature sets: Washington State's
**Gun Bunch X Nasty** (Air Raid), West Virginia's **Gun Power I Tight**, Tennessee's
**Gun Wide Full House**, Georgia / Arkansas / FAU's **Gun Empty Y Flex**, Florida / Georgia Tech /
Ball State's **Gun Empty Y Off Trips**, Cal / Illinois / Louisiana Tech's **Gun Empty Quads**,
Iowa State / Oklahoma / South Carolina's **Gun Empty Bunch Open**, Houston / Louisiana /
Wisconsin's **Gun Spread Y Slot**, Wyoming's **Gun Y Trips Wk**, Air Force's **Flexbone Close /
Tight / Trips + Full House Pro**, Army and Navy's **Flexbone Slot**, and Pistol Ace for Baylor,
Coastal Carolina, Eastern Michigan and San Diego State.

Play names follow the same rule. Where CFB 27's own label is known it is used — **Mesh**,
**Mesh Spot**, **Dagger**, **Stick**, **Stick Wheel**, **Post Wheel**, **Y Corner**, **All Go**,
**Strong Toss**, **Direct Snap**, **QB Power Swing**. The rest are plain coaching names for the
concept (Inside Zone, Counter Trey, Shallow Cross, Skinny Post, Post Dig), never Madden play art:
*Philly Special*, *Jailbreak Screen* and *Hoss Y Juke* are gone.

What is still **derived, not verified**: each team's playbook *style* tag (Air Raid / Spread /
Pro Style / …) where the database did not state it. Those reflect the program's real offensive
identity. If one does not match your copy of the game, it is a single line in
[`data.js`](./data.js) — or just pick the matching **scheme playbook** instead.

Found something that is not in your game? That is a data fix, not a code fix: delete the row in
`FORMATION_ROWS` or the concept in `plays.js` and everything else keeps working.

---

## Files

| File | What it is |
|---|---|
| `index.html` | App shell |
| `styles.css` | Screen theme + the print stylesheet that turns it into a laminated call sheet |
| `data.js` | Playbook universe — formations, the 11 styles, 138 teams, 31 defenses |
| `plays.js` | Concept library (108 plays, tagged) |
| `engine.js` | Matchup profile, scoring, script + sheet generation (seeded) |
| `app.js` | UI, export (copy / .txt / print), recents, PWA install |
| `sw.js`, `manifest.webmanifest`, `icon*` | Offline shell and install metadata |

No build step, no dependencies, no network calls — open `index.html` and it runs.
