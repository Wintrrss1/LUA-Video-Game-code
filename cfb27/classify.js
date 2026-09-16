/* ============================================================
   CFB 27 PLAY CALLER — PLAY CLASSIFIER
   Turns a real CFB 27 play name into the tags the engine needs.
   Rules are ordered most-specific first. Anything the rules cannot
   place confidently comes back with confidence "low" so it can be
   reviewed rather than silently mis-filed.
   ============================================================ */
(function (global) {
  "use strict";

  /* pre-snap motion/shift already built into the play call */
  var BUILT_IN_MOTION = /\b(MTN|DBL MTN|MOTION|JET|SHUFFLE|CHEAT|SFT|RETURN)\b/;

  /* strip the pre-snap prefixes so the concept underneath is readable */
  function core(name) {
    return name
      .replace(/\b(DBL MTN|MTN|MOTION|SHUFFLE|CHEAT|SFT|RETURN|DBL|FK|DIY)\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  var RUN = /\b(INSIDE ZONE|OUTSIDE ZONE|WIDE ZONE|SPLIT ZONE|ZONE SPLIT|ZONE WK|ZONE TOSS|ZONE FAKE|STRETCH|DUO|POWER O|POWER G|POWER\b|COUNTER|TRAP|ISO|DIVE|TOSS|SWEEP|OFF TACKLE|LEAD|SLAM|MISDIRECTION|G DOWN|BUCK|HB BASE|HB INSIDE|HB PUNCH|HB STING|SPLIT 0|END AROUND|DART|WHAM)\b/;
  var DRAW = /\bDRAW\b/;
  var OPTION = /\b(READ OPTION|QB ZONE|SPEED OPTION|MIDLINE|TRIPLE OPTION|OPTION READ)\b/;
  var QBRUN = /\b(QB SNEAK|QB ZONE|QB DRAW|QB POWER|QB KEEP)\b/;
  var SCREEN = /\bSCREEN\b|\bJAILBREAK\b|\bBUBBLE\b/;
  var RPO = /\bRPO\b|\bALERT\b|\bPEEK\b/;
  var PA = /(^|\s)PA(\s|$)/;
  var TRICK = /\b(REVERSE|END ARND|JET PASS|ROLLOUT LT|FAKE SCREEN|PITCH WR)\b/;

  var DEEP = /\b(SHOT|VERTICALS|ALL GO|SEAM|DIVIDE|SLUGGO|STRIKE|DEEP|FADE|FADES|WHEEL|POST|N GO|HITCH N GO|GOAL POST|HAIL MARY|CHOICE GO)\b/;
  var QUICK = /\b(STICK|SNAG|SPOT|SPACING|SLANT|SLANTS|HITCH|CURL|CURLS|FLAT|FLATS|DRAG|CHOICE|PIVOT|WHIP|QUICK|SCAT|ANGLE|OPTIONS|OPTION|SWING|RAIL|ZIG|JUKE|OUTS|OUT\b|TRAIL)\b/;
  var MID = /\b(MESH|CROSS|CROSSERS|DIG|DAGGER|INS|DEEP IN|DOUBLE IN|DBL IN|DBL INS|DOUBLE INS|LEVELS|FLOOD|SAIL|BENCH|COMEBACK|COMEBACKS|SMASH|CORNER|DRIVE|HI LO|TEXAS|UNDER|UNDERS|SHALLOW|TRAFFIC|SCISSORS|SWIRL|BURST|FORK|BRANCH|RETURN MESH)\b/;

  /* what each concept family attacks */
  function beatsFor(type, n) {
    var b = {};
    var add = function () {
      for (var i = 0; i < arguments.length; i++) b[arguments[i]] = true;
    };
    if (type === "run") {
      if (/\b(OUTSIDE ZONE|WIDE ZONE|STRETCH|TOSS|SWEEP|OFF TACKLE|END AROUND)\b/.test(n)) add("heavy-box", "tite", "1-high");
      else if (/\b(POWER|COUNTER|TRAP|G DOWN|BUCK|DART)\b/.test(n)) add("light-box", "blitz", "tite");
      else add("light-box", "2-high", "six-db");
      if (/\bSPLIT\b/.test(n)) add("blitz");
    } else if (type === "qb") {
      add("light-box", "six-db", "heavy-box");
    } else if (type === "rpo") {
      if (/\b(BUBBLE|OUT|SCREEN|WR SCREEN)\b/.test(n)) add("heavy-box", "blitz", "tite");
      else add("1-high", "man", "light-box");
    } else if (type === "screen") {
      add("blitz", "heavy-box", "press");
      if (/\bSLIP|MID|HB\b/.test(n)) add("zone");
    } else if (type === "pa") {
      add("1-high", "heavy-box", "man");
      if (/\b(BOOT|SPRINT|WAGGLE)\b/.test(n)) add("zone", "blitz");
    } else if (type === "trick") {
      add("1-high", "heavy-box", "zone");
    } else if (type === "shot") {
      add("1-high", "man", "press");
      if (/\b(DIVIDE|SEAM)\b/.test(n)) add("3-high");
    } else {
      /* pass concepts */
      if (/\b(MESH|SPOT|WHIP|PIVOT|DRIVE|SHALLOW|CROSS|TRAFFIC|FOLLOW|RETURN|SLANT|SLANTS)\b/.test(n)) add("man", "blitz", "press");
      if (/\b(STICK|SNAG|SPACING|CURL|CURLS|FLAT|FLATS|LEVELS|FLOOD|SAIL|HITCH|ALL HITCH|SPOT)\b/.test(n)) add("zone", "blitz");
      if (/\b(DAGGER|DIG|SMASH|CORNER|BENCH|COMEBACK|COMEBACKS|HI LO|OUT|OUTS)\b/.test(n)) add("2-high", "match", "zone");
      if (/\b(CHOICE|OPTION|OPTIONS|JUKE|ISO)\b/.test(n)) add("man", "press", "match");
      if (!Object.keys(b).length) add("zone", "man");
    }
    return Object.keys(b);
  }

  var SITS = {
    run:    ["open", "1st10", "2sh", "2md", "3sh", "4th", "rz20", "4min"],
    qb:     ["2sh", "3sh", "4th", "gl", "2pt", "1st10"],
    rpo:    ["open", "1st10", "2sh", "2md", "3sh", "rz20"],
    quick:  ["open", "2sh", "2md", "3sh", "3md", "2min", "rz20", "backed"],
    mid:    ["1st10", "2md", "2lg", "3md", "3lg", "rz20"],
    shot:   ["1st10", "2lg", "3lg", "shot", "2min"],
    pa:     ["open", "1st10", "2sh", "2md", "shot", "rz20"],
    screen: ["screen", "1st10", "2md", "2lg", "3md", "backed"],
    trick:  ["trick", "shot"]
  };

  function classify(name, ctx) {
    var n = name.toUpperCase();
    var c = core(n);
    var type = null, conf = "high";

    if (QBRUN.test(c)) type = "qb";
    else if (SCREEN.test(c) && !RPO.test(c)) type = "screen";
    else if (RPO.test(c)) type = "rpo";
    else if (TRICK.test(c)) type = "trick";
    else if (PA.test(c)) type = "pa";
    else if (OPTION.test(c)) type = "run";
    else if (DRAW.test(c)) type = "run";
    else if (RUN.test(c)) type = "run";
    else if (DEEP.test(c)) type = "shot";
    else if (MID.test(c)) type = "mid";
    else if (QUICK.test(c)) type = "quick";
    else { type = "mid"; conf = "low"; }

    /* a play-action screen is still a screen; a PA shot is still a shot */
    if (type === "pa" && DEEP.test(c) && /\bSHOT\b/.test(c)) type = "pa";

    var sits = SITS[type].slice();
    /* the play name itself flags red-zone and goal-line calls */
    if (/\bGOALLINE\b|\bGOAL LINE\b/.test(n)) sits = sits.concat(["gl", "rz10", "2pt"]);
    if (/\bRZ\b/.test(n)) sits = sits.concat(["rz10", "rz20", "2pt"]);
    if (/\bHAIL MARY\b|\bGOAL POST\b|\bSAVE CLOCK\b/.test(n)) sits = ["2min"];
    if (ctx && ctx.goalLine) sits = sits.concat(["gl", "rz10", "4th", "2pt"]);
    if (ctx && ctx.hailMary) sits = ["2min"];
    /* dedupe */
    sits = sits.filter(function (s, i) { return sits.indexOf(s) === i; });

    return {
      type: type,
      beats: beatsFor(type, c),
      sits: sits,
      motion: BUILT_IN_MOTION.test(n),
      confidence: conf
    };
  }

  global.CFB27_CLASSIFY = { classify: classify };
})(typeof window !== "undefined" ? window : globalThis);
