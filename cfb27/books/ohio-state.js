/* ============================================================
   CFB 27 PLAY CALLER — IMPORTED PLAYBOOK: OHIO STATE
   The real book, not a model of one: 33 formations / 465 plays,
   exactly as the playbook lists them. Supplied by the user from
   the CFB.FAN playbook export (cfb.fan/playbooks/ohio-state-off/),
   September 2026.

   Play names are verbatim. Formation family tags and personnel
   groupings are derived from the formation name (the export does
   not carry personnel), and are used only to decide which pre-snap
   adjustments are legal — motion labels, HB/TE block, empty sets.
   ============================================================ */
(function (global) {
  "use strict";
  var BOOKS = global.CFB27_BOOKS || (global.CFB27_BOOKS = {});

  BOOKS["team:Ohio State"] = {
    id: "team:Ohio State",
    name: "Ohio State",
    source: "Imported from the CFB 27 playbook (CFB.FAN export), Sept 2026",
    formations: [
      { name: "Singleback Bunch", family: "Singleback", personnel: "11", fam: ["bunch", "single"],
        plays: ["CRACK TOSS", "DUO", "END AROUND LEAD", "HB SLAM", "HB SLASH FK END ARND", "INSIDE ZONE SPLIT", "PA BOOT", "PA BOOT SLIDE", "PA CROSS SWITCH", "PA END AROUND SIFT", "PA SPRINT HB FLAT", "PA SPRINT LEAK", "PITCH WR REVERSE", "SPACING SWITCH", "TE ANGLE"] },
      { name: "Singleback Bunch TE", family: "Singleback", personnel: "11", fam: ["bunch", "single", "te", "tight"],
        plays: ["CROSS DRAG", "HB MISDIRECTION LEAD", "INSIDE ZONE", "INSIDE ZONE SPLIT", "JET SWEEP", "PA BOOT SLIDE", "PA JET SWEEP", "SPACING", "STICK", "STRETCH ALERT BUBBLE", "VERTICALS", "ZONE FAKE JET"] },
      { name: "Singleback Deuce Close", family: "Singleback", personnel: "12", fam: ["single", "te", "tight"],
        plays: ["0 1 TRAP", "BENCH", "FLOOD TRAIL", "HB STRETCH", "INSIDE ZONE SPLIT", "MOTION POWER", "MOTION ZONE SPLIT", "MOTION ZONE TOSS", "MTN DUO", "MTN PA BOOT SCREEN", "PA BOOT CORNER POST", "PA BOOT SCISSORS", "PA BOOT SLIDE", "PA DRAG WHEEL", "PA SLIDE Y SCREEN", "PA STRETCH SHOT", "SPACING SWITCH", "ZONE SPLIT WK"] },
      { name: "Singleback U Off Close", family: "Singleback", personnel: "11", fam: ["single", "te", "tight"],
        plays: ["CURL FLATS", "HB DIVE", "INSIDE ZONE SPLIT", "MOTION ZONE TOSS", "PA DEEP READ", "PA Z SWIRL"] },
      { name: "Singleback Wing Slot", family: "Singleback", personnel: "11", fam: ["single", "spread", "te", "tight"],
        plays: ["BUBBLE SCREEN", "DAGGER", "FOUR VERTICALS", "HB DUO", "HB ZONE WK", "INSIDE ZONE SPLIT", "JET SWEEP", "MTN DUO WRAP", "MTN PA Z SLIDE", "MTN WIDE ZONE WK", "PA BOOT SLIDE", "PA BOOT TE LEAK", "PA JET SWEEP", "PA SAIL X POST", "ZONE FAKE JET"] },
      { name: "Singleback Wing X Off Close", family: "Singleback", personnel: "11", fam: ["single", "te", "tight"],
        plays: ["HB DUO", "JET HB DUO", "JET PA BOOT", "JET SPLIT ZONE", "JET SWEEP", "MTN PA BOOT SCREEN", "MTN PA Z SLIDE", "MTN WIDE ZONE WK", "PA BOOT RT", "PA JET SWEEP", "PA SPRINT HB FLAT", "PA SPRINT Y LEAK", "SPLIT ZONE WK", "WIDE ZONE", "ZONE FAKE JET"] },
      { name: "I Form Wing", family: "I Form", personnel: "21", fam: ["2back", "iform", "te", "tight", "uc"],
        plays: ["95 MIKE", "FB DIVE", "HB COUNTER WK", "HB POWER G", "HB POWER O", "HB STRETCH", "HB ZONE TOSS", "ISO", "PA POWER O", "PA SCISSORS", "PA X BURST CROSS", "X SLANT"] },
      { name: "I Form Y Off Close", family: "I Form", personnel: "21", fam: ["2back", "iform", "te", "tight", "uc"],
        plays: ["DBL MTN COUNTER F", "DBL MTN PA DOUBLE CROSS", "DBL MTN PA FLOOD", "DBL MTN PA SPRINT HB FLAT", "DBL MTN PA WR OPTIONS", "DBL MTN ZONE WK", "DBL OUTS", "HB ISO", "HB STRETCH", "HB ZONE TOSS", "MTN COUNTER SOLID", "MTN FLOOD", "MTN PA COUNTER", "PA PYLON SAIL", "PA X DEEP OUT"] },
      { name: "Strong Close", family: "Strong", personnel: "21", fam: ["2back", "tight", "uc"],
        plays: ["COUNTER WEAK", "END AROUND", "FL DRIVE", "HB DIVE", "HB OFF TACKLE", "HB SLASH FK END ARND", "INSIDE POST", "MESH POST", "PA DEEP", "PA POST DIG", "PA SCISSORS", "WR OUT"] },
      { name: "Strong Slot", family: "Strong", personnel: "21", fam: ["2back", "spread", "tight", "uc"],
        plays: ["CHINA SPECIAL", "COUNTER WEAK", "DAGGER", "DOUBLE SLANT", "HB DIVE", "HB DRAW", "HB POWER O", "HB SLIP SCREEN", "HB STRETCH", "HB TOSS", "INSIDE ZONE SPLIT", "INSIDE ZONE WK", "PA BOOT SLIDE", "PA COUNTER BOOT", "PA LEAD DRAW SHOT", "PA POST SHOT", "PA POWER O", "PA SPRINT HB FLAT"] },
      { name: "Split T Tight", family: "Split T", personnel: "21", fam: ["2back", "heavy", "te", "tight", "uc"],
        plays: ["DIY TOSS REVERSE", "FB DIVE", "FB DIVE WEAK", "FB TOSS", "FK FB TOSS ROLLOUT LT", "HB INSIDE", "HB LEAD", "PA BOOT", "TE CORNER"] },
      { name: "Gun 4WR Trips Strong", family: "Gun", personnel: "10", fam: ["gun", "spread", "trips"],
        plays: ["CURLS", "DOUBLE INS", "DOUBLE SLANTS", "DRIVE X-POST", "FOUR VERTICALS", "HB ANGLE", "HB BASE", "HB DRAW", "HB SLIP SCREEN", "INSIDE ZONE", "PA WR IN", "SCAT", "SEAM X-COMEBACK", "SLOT FADE SHOT", "SLOT OUT", "SMASH X-DIG", "STICK NOD", "STICK X-SLANT"] },
      { name: "Gun 5WR Flex Trey", family: "Gun", personnel: "10", fam: ["empty", "gun", "spread", "trips"],
        plays: ["CORNER", "CURL FLATS", "CURLS", "DRIVE", "EMPTY STICK", "FOUR VERTICALS", "HITCH CORNERS", "JAILBREAK SLOT SCREEN", "MIDDLE SLANT", "QB ZONE", "SHALLOW CROSS", "STICK N NOD", "STRONG FLOOD", "VERTICALS Y SHAKE", "WR COMEBACKS"] },
      { name: "Gun Bunch Open", family: "Gun", personnel: "11", fam: ["bunch", "gun"],
        plays: ["FLOOD", "HB DRAW", "HB SLIP SCREEN", "INSIDE ZONE", "LEVELS", "PA SLOTS OVER", "READ OPTION", "SPACING", "X SPOT"] },
      { name: "Gun Bunch Open TE", family: "Gun", personnel: "11", fam: ["bunch", "gun", "te", "tight"],
        plays: ["DIG RETURN", "FAKE SCREEN VERTICALS", "FLOOD", "HB DRAW", "HB SLIP SCREEN", "MTN MESH SPOT", "MTN RPO READ SNAG", "MTN SPRINT Z SPOT", "RPO ALERT BUBBLE", "RPO ALERT WR SCREEN", "Y TRAIL", "Z SPOT"] },
      { name: "Gun Bunch Spread", family: "Gun", personnel: "11", fam: ["bunch", "gun", "spread"],
        plays: ["BRANCH RETURN", "CHEAT FLOOD", "CHEAT HB SLIP SCREEN", "CHEAT SLOT CROSS", "CORNER DIVIDE", "CURL FLAT", "DRIVE Y CORNER", "HB SLIP SCREEN", "INSIDE ZONE", "JET PULL SHALLOW", "MTN SLOT HITCH", "MTN SLOT UNDER", "MTN SNAG UNDER", "OUTSIDE ZONE", "PA POST", "SPACING", "SPEED DIG", "Z SPOT"] },
      { name: "Gun Bunch X Nasty", family: "Gun", personnel: "11", fam: ["bunch", "gun", "nasty"],
        plays: ["COUNTER Y", "DEEP FLOOD", "DRIVE HB UNDER", "HB BASE", "INSIDE ZONE", "MESH CORNER", "MESH TRAFFIC", "MTN CROSS POST", "MTN RPO ZONE ALERT", "MTN Y CORNER UNDER", "POST WHEEL SHALLOW", "RETURN MESH SPOT", "RETURN SPOT", "RETURN WHIP TRAIL", "RZ PA X WHIP", "WHIP DOUBLE SPOT", "X CROSS", "Y CORNER PIVOT", "Y FLAT GOALLINE", "Z MESH GOALLINE", "Z SPOT GOALLINE"] },
      { name: "Gun Cluster", family: "Gun", personnel: "11", fam: ["bunch", "gun"],
        plays: ["CLUSTER BUNCH", "HB COUNTER", "HB MID DRAW", "HB SLIP SCREEN", "MESH", "MESH POST", "OUTSIDE ZONE", "PA READ", "SPACING", "VERTICALS", "Z SPOT", "Z SPOT SHAKE"] },
      { name: "Gun Doubles Y Off Nasty", family: "Gun", personnel: "11", fam: ["doubles", "gun", "nasty", "spread", "te", "tight"],
        plays: ["COUNTER Y", "CROSS Y TRAIL", "DOUBLE POST", "FORK H TRAFFIC", "HB SLIP SCREEN", "INSIDE ZONE", "MTN HB CROSS SCREEN", "MTN SLOT FADES", "MTN SMASH", "OUTSIDE ZONE", "PA Y CROSS", "RPO ZONE READ BUBBLE", "SNAG HB WHEEL", "TACKLE TRAP", "X DAGGER"] },
      { name: "Gun Empty Base Trio", family: "Gun", personnel: "10", fam: ["empty", "gun", "trips"],
        plays: ["ALL HITCH", "CURL COMBO", "DOUBLE IN", "DOUBLE SLANT STICK", "HOSS JUKE", "QB DRAW", "SHOCK SLOT OPTION", "SLANT FLAT", "STICK NOD"] },
      { name: "Gun Normal Y Off", family: "Gun", personnel: "11", fam: ["gun", "te", "tight"],
        plays: ["45 QUICK BASE", "CURL COMBO", "DBL DIG", "FOUR VERTICALS", "HB SCISSORS", "HB SLIP SCREEN", "INSIDE ZONE", "MTN FORK Z-CORNER", "MTN PA SWITCH Z-CROSS", "MTN SPLIT INSIDE ZONE", "PA QB CHOICE", "RPO PEEK SLANT", "SLANT FLAT", "STICK", "Y SHALLOW CROSS"] },
      { name: "Gun Split Close", family: "Gun", personnel: "11", fam: ["gun"],
        plays: ["DBL INS", "DOUBLE SWIRL", "HB CHOICE", "HB POWER O", "HB RAIL", "HB SLIP SCREEN", "HB WHEEL", "PIVOT DIG", "READ OPTION"] },
      { name: "Gun Spread Y-Slot Wk", family: "Gun", personnel: "11", fam: ["gun", "spread"],
        plays: ["CORNER STRIKE", "DOUBLE CROSS", "DOUBLE SLANTS", "HB BASE", "HB OFF TACKLE", "HB SCISSORS", "HB SLIP SCREEN", "INSIDE ZONE", "MTN ALL CURL", "MTN BUCK SWEEP", "MTN G DOWN", "MTN H OPTION", "MTN HB COUNTER", "MTN INSIDE ZONE SPLIT", "MTN PA CROSS", "MTN RPO ZONE PEEK", "MTN SWITCH SEAM", "PA READ", "SLOT OUTS", "SPOT Y CROSS", "VERT COMEBACKS"] },
      { name: "Gun Tight Doubles", family: "Gun", personnel: "12", fam: ["doubles", "gun", "spread", "te", "tight"],
        plays: ["BENCH", "CROSS WHEELS", "DBL STICK", "FLOOD DRIVE", "HB DRAW", "HB QUICK BASE", "HB SLIP SCREEN", "MTN BUNCH OPTION", "MTN CROSS HB SNEAK", "MTN FK CROSS", "PA DEEP CURLS", "PA WR CROSS", "SHOT FADE CROSS", "TIGHT CURL", "Z SPOT"] },
      { name: "Gun Tight Y Off", family: "Gun", personnel: "11", fam: ["gun", "te", "tight"],
        plays: ["CHEAT OUTSIDE ZONE", "CHEAT SLASH WHEEL CROSS", "CHEAT SPOT Y QUICK", "FLOOD DRIVE", "HB SCISSORS", "HB SLIP SCREEN", "INSIDE ZONE", "MESH SPOT", "MTN MESH SPOT", "MTN SLOT CHOICE", "MTN Y-CORNER", "PA GO SLOT CROSS", "PA JAILBREAK SCREEN", "PA SLOT CROSS", "READ OPTION", "RPO PEEK SLANT BUBBLE", "SWITCH WR DRAG", "TE CORNER"] },
      { name: "Gun Trips TE", family: "Gun", personnel: "11", fam: ["gun", "te", "tight", "trips"],
        plays: ["DEEP IN", "DRIVE POST", "HB ANGLE", "HB COUNTER", "HB SLIP SCREEN", "INSIDE ZONE", "MTN FK SCREEN WHEEL", "MTN HB SWING", "MTN LEVELS Y-CORNER", "PA BOOT SHOT", "RPO ALERT BUBBLE", "SHALLOW X DIG", "TEXAS", "VERTICALS", "WR SHORT POST"] },
      { name: "Gun Trips TE Flex", family: "Gun", personnel: "11", fam: ["gun", "spread", "te", "tight", "trips"],
        plays: ["DAGGER", "DOUBLE IN SAIL", "HB ANGLE", "HB DRAW", "HB SLIP SCREEN", "INSIDE ZONE", "LEVELS SAIL", "MTN FORK H CHOICE", "MTN HITCH N GO", "MTN Y POST", "PA CROSSERS", "RPO ZONE ALERT OMAHA", "SCAT", "STICK", "VERTICALS"] },
      { name: "Gun Trips X Nasty", family: "Gun", personnel: "11", fam: ["gun", "nasty", "trips"],
        plays: ["HB MID DRAW", "HB OFF TACKLE", "HI LO CROSS", "HI LO DIG", "INSIDE ZONE", "MTN HB SWING", "MTN SLOT FADES", "MTN SLOT STICK NOD", "MTN SPOT Y CORNER", "MTN STICK WHEEL", "MTN TRIPLE SLANTS", "PA X CROSS SHOT", "QUICK FORK ZIG", "QUICK SHORT POST", "QUICK UNDERS", "SLOT FADE H WHEEL", "VERTICALS X SHALLOW", "WR SMASH"] },
      { name: "Gun Wing Slot Offset", family: "Gun", personnel: "11", fam: ["gun", "spread", "te", "tight"],
        plays: ["0 1 TRAP", "FOUR VERTICALS", "HB PUNCH", "INSIDE ZONE", "JET PASS FK ZONE", "MESH SPOT", "OHIO SPACING", "PA DOUBLE POST", "PA JET SWEEP", "RPO ALERT BUBBLE", "SPOT OPTION", "ZONE FAKE JET"] },
      { name: "Gun Wing Trips Wk Nasty", family: "Gun", personnel: "11", fam: ["gun", "nasty", "te", "tight", "trips"],
        plays: ["ALL GO HB CHOICE", "HB BASE", "INSIDE ZONE SPLIT", "OUTSIDE ZONE", "PA CROSSERS", "RPO BUCK ALERT OUT", "SHALLOW CROSS SMASH", "SHUFFLE SHOCK HB CHOICE GO", "SHUFFLE SMASH Y SHAKE", "SHUFFLE WHEEL Y DRAG", "STICK", "STICK N NOD", "Y MTN BENCH INS", "Y MTN DRIVE", "Y MTN FLOOD"] },
      { name: "Gun Y Off Trips Wk", family: "Gun", personnel: "11", fam: ["gun", "te", "tight", "trips"],
        plays: ["COUNTER Y", "CURLS COMBO", "DIG CROSS", "FOUR VERTICALS", "HB DRAW", "HB SLIP SCREEN", "HI LO DIG", "INSIDE ZONE SPLIT", "OUTSIDE ZONE", "PA SLIDE", "QUICK FORK ZIG", "QUICK SHORT POST", "QUICK UNDERS", "SFT INSIDE ZONE", "SFT PA READ SLOT POST", "SFT SLOT CROSS", "SLOT 2 BUC", "SLOT FADE", "SLUGGO SEAM", "STICK", "Z UNDER"] },
      { name: "Goal Line Normal", family: "Goal Line", personnel: "23", fam: ["gl", "heavy", "uc"],
        plays: ["FB DIVE WEAK", "HB COUNTER WK", "HB DIVE", "HB SPLIT 0", "HB STING", "PA POWER O", "PA SPOT", "PA SPRINT HB FLAT", "PA WAGGLE", "POWER O", "QB SNEAK", "STRONG TOSS"] },
      { name: "Hail Mary", family: "Hail Mary", personnel: "10", fam: ["empty", "gun", "spread"],
        plays: ["GOAL POST", "HAIL MARY", "SHOT SAVE CLOCK"] }
    ]
  };
})(typeof window !== "undefined" ? window : globalThis);
