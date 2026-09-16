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
| Formations in the catalog | 51 (shotgun, pistol, singleback, under center, flexbone, heavy, goal line) |
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

## Data sourcing (read this before you argue with a tag)

CFB 27's structure is taken from public playbook databases and the game itself:

- **138 playable teams**; offensive playbooks are named after **schools**, while the **31
  defensive playbooks are named by scheme** and every school is assigned one of them.
- The **11 offensive playbook styles** listed above are the styles CFB 27 ships.

What is **derived, not scraped**: each team's style tag and signature formations. Those reflect
the program's real offensive identity (and, for the widely-documented meta playbooks —
Washington State's Gun Bunch X Nasty, West Virginia's Gun Power I Tight, Fresno State's Tight
Doubles, Colorado's Go Go, Ohio State / Oregon / USC / Texas / LSU — the formations creators
actually call). If a tag does not match what you see in your copy of the game, it is one line in
[`data.js`](./data.js) — or just pick the matching **scheme playbook** instead.

The concept library is football, not a play-name dump from the game's UI, so a few names are the
coaching name rather than EA's exact label (e.g. *Mesh Deep Over*, *Post-Dig (Mills)*, *Bang 8*).

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
