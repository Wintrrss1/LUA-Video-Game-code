/* ============================================================
   CFB 27 PLAY CALLER — GENERATION ENGINE
   Takes an offensive playbook + the opponent's defensive playbook
   and produces (a) a matchup brief, (b) a 15-play opening script,
   (c) a full down-and-distance call sheet.
   Deterministic: same matchup + same seed = same sheet.
   ============================================================ */
(function (global) {
  "use strict";

  var D = global.CFB27_DATA;
  var L = global.CFB27_PLAYS;

  /* ---------- seeded RNG (mulberry32) ---------- */
  function hashStr(s) {
    var h = 2166136261 >>> 0;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return h >>> 0;
  }
  function rngFrom(seedStr) {
    var a = hashStr(seedStr);
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  /* ---------- defensive DNA -> tag weights ---------- */
  function defWeights(def) {
    var shell = def.shell;
    return {
      man: def.man,
      zone: 1 - def.man,
      blitz: def.blitz,
      press: def.press,
      "light-box": def.box <= 5 ? 1 : (def.box === 6 ? 0.72 : 0.12),
      "heavy-box": def.box >= 7 ? 1 : (def.box === 6 ? 0.3 : 0.08),
      "1-high": shell === "1-high" ? 1 : (shell === "mixed" ? 0.45 : 0.05),
      "2-high": shell === "2-high" ? 1 : (shell === "mixed" ? 0.4 : 0.05),
      "3-high": shell === "3-high" ? 1 : 0.03,
      "six-db": def.dbs >= 6 ? 1 : 0.12,
      tite: def.tite ? 1 : 0.05,
      match: (def.flavor === "Press Quarters" || def.flavor === "Zone" || def.flavor === "Two-High Shell") ? 0.8 : 0.32
    };
  }

  var TAG_PHRASE = {
    man: "man beater",
    zone: "zone beater",
    blitz: "pressure beater",
    press: "press beater",
    "light-box": "box-count run",
    "heavy-box": "gets you outside a loaded box",
    "1-high": "attacks single-high",
    "2-high": "attacks the two-high shell",
    "3-high": "attacks three-high",
    "six-db": "runs at sub personnel",
    tite: "avoids the tite front",
    match: "beats match coverage"
  };

  /* ---------- concept -> style DNA family ---------- */
  function dnaOf(pl) {
    var n = pl.n;
    if (pl.t === "screen") return "screen";
    if (pl.t === "pa") return "pa";
    if (pl.t === "rpo") return "rpo";
    if (pl.t === "qb") return "qb";
    if (pl.t === "shot") return "verts";
    if (pl.t === "trick") return "shot";
    if (/Option|Veer|Midline|Rocket|Zone Read|Bash/.test(n)) return "option";
    if (pl.t === "run") return /Zone|Stretch|Duo|Dive/.test(n) ? "zone" : "gap";
    if (/Mesh|Cross|Drive|Follow|Trail/.test(n)) return "mesh";
    if (/Choice|Iso/.test(n)) return "choice";
    if (/Vert|Divide|Seam|Post|Dagger|Corner|Smash|Bang/.test(n)) return "verts";
    if (/Motion|Jet/.test(n)) return "motion";
    return "quick";
  }

  /* ---------- offense build-out ---------- */
  var UNIVERSAL_FORMS = ["Goal Line", "Jumbo Heavy", "Swinging Gate"];

  function buildOffense(off) {
    var style = D.OFF_STYLES[off.style];
    var names = [];
    off.signature.concat(style.pool, UNIVERSAL_FORMS).forEach(function (f) {
      if (D.FORMATIONS[f] && names.indexOf(f) === -1) names.push(f);
    });
    var sigSet = {};
    off.signature.forEach(function (f) { sigSet[f] = true; });
    return {
      pb: off,
      style: style,
      styleName: off.style,
      formations: names.map(function (f) {
        var o = D.FORMATIONS[f];
        return { name: o.name, personnel: o.personnel, fam: o.fam, signature: !!sigSet[f] };
      })
    };
  }

  /* ---------- call sheet layout ---------- */
  var SECTIONS = [
    { k: "1st10", t: "1st & 10", hint: "Stay on schedule — win the down, live on 2nd & 6 or better.",
      slots: ["run", "run", "rpo", "pass", "pa", "pass", "run"] },
    { k: "2sh", t: "2nd & Short (1-3)", hint: "Best down in football. Take a shot off run action.",
      slots: ["run", "pa", "rpo", "pass"] },
    { k: "2md", t: "2nd & Medium (4-7)", hint: "Stay balanced — they have to honor both.",
      slots: ["run", "pass", "pass", "rpo", "screen"] },
    { k: "2lg", t: "2nd & Long (8+)", hint: "Get half the distance back, do not take a sack.",
      slots: ["pass", "pass", "shot", "screen", "run"] },
    { k: "3sh", t: "3rd & Short (1-2)", hint: "Two runs, two passes. Never get it stuffed for a loss.",
      slots: ["run", "pass", "rpo", "run"] },
    { k: "3md", t: "3rd & Medium (3-6)", hint: "Route depths at the sticks plus one.",
      slots: ["pass", "pass", "pass", "screen", "run"] },
    { k: "3lg", t: "3rd & Long (7+)", hint: "Protect first, then attack. Take the field-position win if it is there.",
      slots: ["pass", "pass", "shot", "screen", "pass"] },
    { k: "4th", t: "4th Down / Must Have It", hint: "Your four most trusted calls. No reads that can be wrong.",
      slots: ["run", "pass", "pass", "run"] },
    { k: "rz20", t: "Red Zone (20-11)", hint: "Field shrinks — use motion and play action before they load up.",
      slots: ["run", "pass", "pa", "pass", "rpo"] },
    { k: "rz10", t: "Red Zone (10-4)", hint: "No deep safety help outside. Attack leverage, not depth.",
      slots: ["run", "pass", "pass", "rpo", "pass"] },
    { k: "gl", t: "Goal Line (3-in)", hint: "Heaviest personnel you own, plus one play-action answer.",
      slots: ["run", "run", "pass", "pass"] },
    { k: "backed", t: "Backed Up (own 1-10)", hint: "Ball security. Quick game, nothing behind the line.",
      slots: ["run", "pass", "screen", "pass"] },
    { k: "2min", t: "Two-Minute", hint: "Sideline, middle-sit, sideline. Know your clock before the snap.",
      slots: ["pass", "pass", "pass", "screen", "shot", "pass"] },
    { k: "4min", t: "Four-Minute / Kill Clock", hint: "Stay in bounds, stay on the ball, make them use timeouts.",
      slots: ["run", "run", "run", "pass"] },
    { k: "shot", t: "Shots / Explosives", hint: "One per quarter minimum. Call them off your best run look.",
      slots: ["shot", "shot", "pa", "shot", "pa"] },
    { k: "screen", t: "Screens", hint: "Your pressure answer and your tempo reset.",
      slots: ["screen", "screen", "screen", "screen"] },
    { k: "trick", t: "Trick / Specials", hint: "Once a game, off a look they have already seen twice.",
      slots: ["trick", "trick", "trick"] },
    { k: "2pt", t: "Two-Point Play", hint: "Decide it Monday, not on the field.",
      slots: ["pass", "run"] }
  ];

  var SLOT_TYPES = {
    run: ["run", "qb"],
    pass: ["quick", "mid", "pa", "shot"],
    rpo: ["rpo"],
    pa: ["pa"],
    shot: ["shot", "pa"],
    screen: ["screen"],
    trick: ["trick"],
    any: ["run", "qb", "rpo", "quick", "mid", "pa", "shot", "screen"]
  };

  /* sections where repeating a concept from elsewhere on the sheet is authentic
     (a real call sheet carries the same screen in the screen column) */
  var REPEAT_OK = { "4min": true, gl: true, "4th": true, "2pt": true, "2min": true,
    screen: true, shot: true, trick: true, backed: true };

  /* ---------- scoring ---------- */
  function scorePlay(pl, w, offense, rnd) {
    var sum = 0;
    pl.b.forEach(function (tag) { sum += (w[tag] === undefined ? 0.2 : w[tag]); });
    var fit = (sum / Math.max(1, pl.b.length)) * 3;
    var styleBonus = pl.st === "*" ? 0 : 0.7;
    var dna = dnaOf(pl);
    var dnaBonus = offense.style.dna.indexOf(dna) !== -1 ? 0.8 : 0;
    return fit + styleBonus + dnaBonus + rnd() * 0.9;
  }

  function topTags(pl, w) {
    return pl.b.slice().sort(function (a, b) {
      return (w[b] === undefined ? 0.2 : w[b]) - (w[a] === undefined ? 0.2 : w[a]);
    });
  }

  /* you cannot hand the ball off, run an RPO or fake a run out of an empty set */
  function formationLegal(pl, f) {
    if (f.fam.indexOf("empty") === -1) return true;
    if (pl.t === "run" || pl.t === "rpo" || pl.t === "pa") return false;
    if (pl.t === "qb") return /Draw/.test(pl.n);
    if (pl.t === "trick") return /Pass|Gate/.test(pl.n);
    return true;
  }

  function pickFormation(pl, offense, sit, rnd, usedForms) {
    var cands = offense.formations.filter(function (f) {
      return formationLegal(pl, f) && f.fam.some(function (x) { return pl.fam.indexOf(x) !== -1; });
    });
    if (!cands.length) return null;
    var glSit = sit === "gl" || sit === "2pt" || (sit === "4th" && pl.t === "run");
    var scored = cands.map(function (f) {
      var s = rnd();
      if (f.signature) s += 0.55;
      if (glSit && (f.fam.indexOf("gl") !== -1 || f.fam.indexOf("heavy") !== -1)) s += 1.1;
      if (!glSit && f.fam.indexOf("gl") !== -1) s -= 1.4;
      if (f.fam.indexOf("special") !== -1 && pl.t !== "trick") s -= 3;
      if (sit === "2min" && (f.fam.indexOf("empty") !== -1 || f.fam.indexOf("spread") !== -1)) s += 0.4;
      if ((usedForms[f.name] || 0) > 0) s -= 0.75 * usedForms[f.name];
      return { f: f, s: s };
    }).sort(function (a, b) { return b.s - a.s; });
    return scored[0].f;
  }

  function dressCall(pl, form, def, offense, rnd, sit) {
    var motion = "";
    var motionChance = offense.style.motion + (def.man > 0.55 ? 0.22 : 0) + (sit === "rz20" || sit === "rz10" ? 0.1 : 0);
    if (pl.t !== "trick" && rnd() < motionChance) {
      motion = L.MOTIONS[Math.floor(rnd() * L.MOTIONS.length)];
      if (form.fam.indexOf("empty") !== -1 && /Jet|Orbit/.test(motion)) motion = "Swap Release";
    }
    var prot = "";
    if (pl.t === "shot" || pl.t === "pa") {
      var deep = L.PROTECTIONS_DEEP.filter(function (x) {
        return form.fam.indexOf("empty") === -1 || !/RB|7-man/.test(x);
      });
      prot = def.blitz >= 0.4 && form.fam.indexOf("empty") === -1
        ? "Max Pro (7-man)"
        : deep[Math.floor(rnd() * deep.length)];
    } else if (pl.t === "quick" || pl.t === "mid") {
      var isEmpty = form.fam.indexOf("empty") !== -1;
      if (def.blitz >= 0.4) {
        prot = isEmpty ? "Empty 5-Man — Alert Hot" : "Half-Slide + RB Check";
      } else {
        var quick = L.PROTECTIONS_QUICK.filter(function (x) {
          return isEmpty ? true : x !== "Empty 5-Man";
        });
        prot = quick[Math.floor(rnd() * quick.length)];
      }
    } else if (pl.t === "screen") {
      prot = rnd() < 0.5 ? "Screen Rt" : "Screen Lt";
    } else if (pl.t === "rpo") {
      prot = "Run Read + Alert";
    } else if (pl.t === "trick") {
      prot = "Special — walk it through";
    } else {
      prot = rnd() < 0.5 ? "Zone Lt" : "Zone Rt";
      if (/Power|Counter|Trap|Dart|Wham|GT/.test(pl.n)) prot = rnd() < 0.5 ? "Pull Rt" : "Pull Lt";
      if (/Option|Veer|Midline|Read/.test(pl.n)) prot = "Option Rules";
      if (pl.n === "QB Sneak") prot = "Wedge";
    }
    var w = defWeights(def);
    var tags = topTags(pl, w).filter(function (t) { return (w[t] === undefined ? 0.2 : w[t]) >= 0.4; });
    var why;
    if (!tags.length) {
      why = pl.t === "run" || pl.t === "qb" ? "call-sheet staple" : "situational answer";
    } else {
      why = TAG_PHRASE[tags[0]] || "matchup call";
      if (tags[1] && TAG_PHRASE[tags[1]] && rnd() < 0.55) why += " / " + TAG_PHRASE[tags[1]];
    }
    return {
      play: pl.n,
      type: pl.t,
      formation: form.name,
      personnel: form.personnel,
      motion: motion,
      protection: prot,
      why: why,
      look: pl.look
    };
  }

  function buildSection(sec, offense, def, w, rnd, used, plays) {
    var usedForms = {};
    var calls = [];
    sec.slots.forEach(function (slot) {
      var allow = SLOT_TYPES[slot] || SLOT_TYPES.any;
      var tries = [
        { allow: allow, strict: true },
        { allow: SLOT_TYPES.any, strict: true },
        { allow: allow, strict: false },
        { allow: SLOT_TYPES.any, strict: false }
      ];
      for (var t = 0; t < tries.length; t++) {
        var tier = tries[t];
        var pool = plays.filter(function (pl) {
          if (pl.s.indexOf(sec.k) === -1) return false;
          if (tier.allow.indexOf(pl.t) === -1) return false;
          if (pl.st !== "*" && pl.st.indexOf(offense.styleName) === -1) return false;
          if (used[pl.n] && tier.strict && !REPEAT_OK[sec.k]) return false;
          if (calls.some(function (c) { return c.play === pl.n; })) return false;
          return offense.formations.some(function (f) {
            return formationLegal(pl, f) && f.fam.some(function (x) { return pl.fam.indexOf(x) !== -1; });
          });
        });
        if (!pool.length) continue;
        var best = pool.map(function (pl) {
          return { pl: pl, s: scorePlay(pl, w, offense, rnd) };
        }).sort(function (a, b) { return b.s - a.s; });
        /* pick from the top of the list with a little variety */
        var idx = Math.min(best.length - 1, Math.floor(rnd() * Math.min(3, best.length)));
        var chosen = best[idx].pl;
        var form = pickFormation(chosen, offense, sec.k, rnd, usedForms);
        if (!form) continue;
        usedForms[form.name] = (usedForms[form.name] || 0) + 1;
        used[chosen.n] = true;
        calls.push(dressCall(chosen, form, def, offense, rnd, sec.k));
        break;
      }
    });
    return { key: sec.k, title: sec.t, hint: sec.hint, calls: calls };
  }

  /* ---------- opening script ---------- */
  var SCRIPT_PLAN = [
    { slot: "run", sit: "open", intent: "Opener — establish the front", note: "Count the box and see how they fit the run." },
    { slot: "pass", sit: "open", intent: "Easy completion / coverage ID", prefer: /Stick|Snag|Slant|Spacing|Mesh|Choice|Spot/, note: "Use motion pre-snap: if a defender travels, it is man." },
    { slot: "rpo", sit: "open", intent: "Put the conflict player on tape", note: "Whatever the apex defender does here tells you the rest of the game." },
    { slot: "run", sit: "1st10", intent: "Complementary run — other direction", note: "Same look, opposite strength. Check their linebackers' flow." },
    { slot: "pass", sit: "2md", intent: "Second-down concept", note: "Route depths at the sticks. Get to 3rd & short or better." },
    { slot: "pa", sit: "2sh", intent: "First play-action off the run", note: "They have seen the run twice — now the picture lies." },
    { slot: "screen", sit: "screen", intent: "Pressure answer", note: "Call it on the down they most want to blitz." },
    { slot: "run", sit: "1st10", intent: "Perimeter run", prefer: /Sweep|Toss|Stretch|Outside|Speed Option|Rocket|Pin/,
      note: "Test edge discipline and the overhang's leverage." },
    { slot: "pass", sit: "3md", intent: "Third-down concept, called early", note: "Get a live look at their third-down coverage before you need it." },
    { slot: "rpo", sit: "1st10", intent: "Second RPO — off the first tell", note: "Take the answer their conflict player gave you on play 3." },
    { slot: "shot", sit: "shot", intent: "Shot play", note: "Best run look you own, biggest route behind it." },
    { slot: "run", sit: "2sh", intent: "Short-yardage rehearsal", note: "Prove the call before the game hangs on it." },
    { slot: "pass", sit: "rz20", intent: "Red-zone ready concept", note: "Same call you will use inside the 15 — run it in the open field first." },
    { slot: "run", sit: "4min", intent: "Heavy personnel run", prefer: /Power|Duo|Iso|Counter|Inside Zone|Dive|Midline/,
      note: "Make them get their big people on the field." },
    { slot: "trick", sit: "trick", intent: "Special — only if the look is right", note: "Off a formation they have already defended twice." }
  ];

  function buildScript(offense, def, w, rnd, used, plays) {
    var usedForms = {};
    return SCRIPT_PLAN.map(function (step, i) {
      var allow = SLOT_TYPES[step.slot] || SLOT_TYPES.any;
      var order = [
        { sit: step.sit, allow: allow },
        { sit: step.sit, allow: SLOT_TYPES.any },
        { sit: "1st10", allow: allow },
        { sit: "1st10", allow: SLOT_TYPES.any }
      ];
      for (var o = 0; o < order.length; o++) {
        var sit = order[o].sit, al = order[o].allow;
        var pool = plays.filter(function (pl) {
          if (pl.s.indexOf(sit) === -1) return false;
          if (al.indexOf(pl.t) === -1) return false;
          if (pl.st !== "*" && pl.st.indexOf(offense.styleName) === -1) return false;
          if (used[pl.n]) return false;
          return offense.formations.some(function (f) {
            return formationLegal(pl, f) && f.fam.some(function (x) { return pl.fam.indexOf(x) !== -1; });
          });
        });
        if (!pool.length) continue;
        var best = pool.map(function (pl) {
          var s = scorePlay(pl, w, offense, rnd);
          if (step.prefer && step.prefer.test(pl.n)) s += 2.2;
          return { pl: pl, s: s };
        }).sort(function (a, b) { return b.s - a.s; });
        var chosen = best[Math.min(best.length - 1, Math.floor(rnd() * Math.min(3, best.length)))].pl;
        var form = pickFormation(chosen, offense, sit, rnd, usedForms);
        if (!form) continue;
        usedForms[form.name] = (usedForms[form.name] || 0) + 1;
        used[chosen.n] = true;
        var call = dressCall(chosen, form, def, offense, rnd, sit);
        call.no = i + 1;
        call.intent = step.intent;
        call.note = step.note;
        return call;
      }
      return { no: i + 1, intent: step.intent, note: step.note, play: "(open slot — call it live)", formation: "-", personnel: "-", motion: "", protection: "", why: "", type: "any" };
    });
  }

  /* ---------- matchup brief ---------- */
  function attackPlan(def, offense) {
    var out = [];
    if (def.box <= 5) out.push("Five in the box — hand it off. Inside zone, duo and iso are numbers advantages before you read anything.");
    else if (def.box === 6) out.push("Six-man box: the run is live on any down. Make them add a defender before you stop running it.");
    else out.push("Seven-man box — do not run into it. Get width with pin & pull, toss crack and jet, then throw the perimeter RPO.");

    if (def.man >= 0.6) out.push("Man-coverage team. Mesh, spot, whip and post-wheel. Motion everything — if the defender travels, you have your answer.");
    else if (def.man <= 0.3) out.push("Zone team. Live in triangles (stick, snag, spacing) and throttle routes down in the windows; dagger and levels for chunks.");
    else out.push("Mixed coverage. Carry one man beater and one zone beater in every call and let the motion tell you which to throw.");

    if (def.blitz >= 0.4) out.push("High pressure rate. Max protect your shots, keep the back in to check-release, and have a screen or draw on every call sheet page.");
    else if (def.blitz <= 0.18) out.push("They rush four and drop seven. Take the completions underneath, use tempo, and make them tackle in space.");

    if (def.shell === "2-high") {
      out.push(def.box >= 7
        ? "Two-high shell over a seven-man box: dagger, post-dig and smash are the chunk plays. Throw to move them off the run fits — do not grind into the front."
        : "Two-high shell: dagger, post-dig and smash are your chunk plays — and the light box means the run game is free.");
    }
    if (def.shell === "1-high") out.push("Single-high: four verticals, divide and the deep over outnumber the middle-third safety. RPO glance is the free one.");
    if (def.shell === "3-high") out.push("Three-high safeties: nothing is open deep. Take the run game and the intermediate in-cuts, and be happy with 6 yards a snap.");

    if (def.press >= 0.6) out.push("Press corners. Switch releases, sluggo seam and slot fade; tunnel screens turn their aggression into your blocking.");
    if (def.tite) out.push("Tite front (0 and 4i): stop running A and B gap. Stretch it, pin & pull it, or wham the nose and run behind it.");
    if (def.dbs >= 6) out.push("Six defensive backs on the field. Put your heavy personnel in and run at the sub package.");

    var style = offense.style;
    out.push("Playbook fit: " + style.blurb);
    return out;
  }

  function expectFrom(def) {
    var out = [def.frontNote, def.flavorNote];
    out.push("Fronts you will see: " + def.formations.slice(0, 5).join(", ") + ".");
    return out;
  }

  /* ---------- public API ---------- */
  function generate(offId, defId, seedNum) {
    var off = D.OFFENSES.filter(function (o) { return o.id === offId; })[0];
    var def = D.DEFENSES.filter(function (d) { return d.id === defId; })[0];
    if (!off || !def) return null;
    var offense = buildOffense(off);
    var w = defWeights(def);
    var rnd = rngFrom(off.id + "|" + def.id + "|" + (seedNum || 0));
    var plays = L.PLAYS;
    var used = {};
    var script = buildScript(offense, def, w, rnd, used, plays);
    var sections = SECTIONS.map(function (sec) {
      return buildSection(sec, offense, def, w, rnd, used, plays);
    });
    var passRate = Math.round(offense.style.pass * 100);
    return {
      offense: {
        name: off.name, kind: off.kind, conference: off.conference, style: off.style,
        blurb: offense.style.blurb, tempo: offense.style.tempo, passRate: passRate,
        formations: offense.formations.map(function (f) { return f.name; }),
        signature: off.signature
      },
      defense: {
        name: def.name, front: def.front, flavor: def.flavor, box: def.box, dbs: def.dbs,
        man: Math.round(def.man * 100), blitz: Math.round(def.blitz * 100),
        press: Math.round(def.press * 100), shell: def.shell, tite: def.tite,
        formations: def.formations
      },
      attack: attackPlan(def, offense),
      expect: expectFrom(def),
      script: script,
      sections: sections,
      seed: seedNum || 0
    };
  }

  global.CFB27_ENGINE = { generate: generate, SECTIONS: SECTIONS };
})(typeof window !== "undefined" ? window : globalThis);
