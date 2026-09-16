/* ============================================================
   CFB 27 PLAY CALLER — UI
   ============================================================ */
(function () {
  "use strict";
  var D = window.CFB27_DATA, E = window.CFB27_ENGINE;
  var $ = function (id) { return document.getElementById(id); };
  var offSelect = $("offSelect"), defSelect = $("defSelect"), offFilter = $("offFilter");
  var current = null, seed = 0;

  /* ---------- populate pickers ---------- */
  var CONF_ORDER = ["Scheme playbook", "SEC", "Big Ten", "Big 12", "ACC", "Pac-12",
    "Mountain West", "American", "Conference USA", "MAC", "Sun Belt", "Independent"];

  function fillOffenses(term) {
    var t = (term || "").trim().toLowerCase();
    offSelect.innerHTML = "";
    var shown = 0;
    CONF_ORDER.forEach(function (conf) {
      var list = D.OFFENSES.filter(function (o) {
        if (o.conference !== conf) return false;
        if (!t) return true;
        return (o.name + " " + o.style + " " + o.conference).toLowerCase().indexOf(t) !== -1;
      });
      if (!list.length) return;
      var g = document.createElement("optgroup");
      g.label = conf === "Scheme playbook" ? "Scheme playbooks (generic)" : conf;
      list.forEach(function (o) {
        var op = document.createElement("option");
        op.value = o.id;
        op.textContent = o.kind === "team" ? o.name + " — " + o.style : o.name;
        g.appendChild(op);
        shown++;
      });
      offSelect.appendChild(g);
    });
    offSelect.size = 1;
    if (!shown) {
      var op = document.createElement("option");
      op.textContent = "No playbook matches “" + term + "”";
      op.disabled = true;
      offSelect.appendChild(op);
    }
    return shown;
  }

  function fillDefenses() {
    var fronts = ["3-2-6", "3-3-5", "3-4", "4-2-5", "4-3", "Multiple"];
    fronts.forEach(function (f) {
      var list = D.DEFENSES.filter(function (d) { return d.front === f; });
      if (!list.length) return;
      var g = document.createElement("optgroup");
      g.label = f === "Multiple" ? "Multiple" : f + " family";
      list.forEach(function (d) {
        var op = document.createElement("option");
        op.value = d.id;
        op.textContent = d.name;
        g.appendChild(op);
      });
      defSelect.appendChild(g);
    });
  }

  function describeOff() {
    var o = D.OFFENSES.filter(function (x) { return x.id === offSelect.value; })[0];
    if (!o) { $("offMeta").textContent = ""; return; }
    var st = D.OFF_STYLES[o.style];
    $("offMeta").textContent = (o.kind === "team" ? o.conference + " · " : "") + o.style +
      " · " + Math.round(st.pass * 100) + "% pass on neutral downs · tempo " + st.tempo + "/5 — " + st.blurb;
  }

  function describeDef() {
    var d = D.DEFENSES.filter(function (x) { return x.id === defSelect.value; })[0];
    if (!d) { $("defMeta").textContent = ""; return; }
    $("defMeta").textContent = d.box + "-man box · " + d.dbs + " DBs · " +
      Math.round(d.man * 100) + "% man · " + Math.round(d.blitz * 100) + "% pressure · " +
      d.shell + " shell — " + d.flavorNote;
  }

  /* ---------- rendering ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function pill(t) {
    var label = { run: "run", qb: "qb run", rpo: "rpo", quick: "quick", mid: "pass",
      shot: "shot", pa: "play action", screen: "screen", trick: "special" }[t] || t;
    return '<span class="pill t-' + t + '">' + label + "</span>";
  }
  function callCell(c) {
    var dress = [];
    if (c.motion) dress.push(c.motion);
    if (c.protection) dress.push(c.protection);
    return '<td class="call"><b>' + pill(c.type) + " " + esc(c.play) + "</b>" +
      '<div class="form">' + esc(c.formation) + "</div>" +
      (dress.length ? '<div class="dress">' + esc(dress.join(" · ")) + "</div>" : "") +
      (c.why ? '<div class="why">' + esc(c.why) + "</div>" : "") + "</td>";
  }

  function renderPlan(r) {
    var o = r.offense, d = r.defense;
    var stats = [
      [o.style, "your style"], [o.passRate + "%", "pass rate"], [o.tempo + "/5", "tempo"],
      [d.front, "their front"], [d.box + " / " + d.dbs, "box / DBs"], [d.shell, "shell"],
      [d.man + "%", "man coverage"], [d.blitz + "%", "pressure rate"], [d.press + "%", "press"]
    ];
    var html = '<div class="statGrid">' + stats.map(function (s) {
      return '<div class="stat"><b>' + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></div>";
    }).join("") + "</div>";

    html += '<div class="block"><div class="blockHead"><h3>How to attack it</h3>' +
      "<p>Generated from this defensive playbook's box count, shell, coverage split and pressure rate.</p></div>" +
      '<div style="padding:11px"><ul class="bullets">' +
      r.attack.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul></div></div>";

    html += '<div class="block"><div class="blockHead"><h3>What they will show you</h3></div>' +
      '<div style="padding:11px"><ul class="bullets warn">' +
      r.expect.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul></div></div>";

    html += '<div class="block"><div class="blockHead"><h3>Your formation package</h3>' +
      "<p>" + (o.signature.length ? "Signature sets first — those are the ones this playbook is built around." : "Drawn from the " + esc(o.style) + " formation pool.") + "</p></div>" +
      '<div style="padding:11px"><div class="tagList">' +
      o.formations.map(function (f) {
        var sig = o.signature.indexOf(f) !== -1;
        return '<span class="chip' + (sig ? " sig" : "") + '">' + esc(f) + "</span>";
      }).join("") + "</div></div></div>";
    $("view-plan").innerHTML = html;
  }

  function renderScript(r) {
    var rows = r.script.map(function (c) {
      return "<tr>" + '<td class="no">' + c.no + "</td>" + callCell(c) +
        '<td class="pers">' + esc(c.personnel) + "</td>" +
        '<td><div class="intent">' + esc(c.intent) + '</div><div class="look">' + esc(c.note) +
        (c.look ? " " + esc(c.look) : "") + "</div></td></tr>";
    }).join("");
    $("view-script").innerHTML = '<div class="block"><div class="blockHead"><h3>Opening script — first 15</h3>' +
      "<p>Called in order regardless of result, unless it is 3rd down or inside the 10. " +
      "The script is how you buy information: every play is chosen to force this defense to declare something.</p></div>" +
      "<table>" + rows + "</table></div>";
  }

  function renderSheet(r) {
    var html = r.sections.map(function (s) {
      var rows = s.calls.map(function (c, i) {
        return "<tr>" + '<td class="no">' + (i + 1) + "</td>" + callCell(c) +
          '<td class="pers">' + esc(c.personnel) + "</td></tr>";
      }).join("");
      return '<div class="block"><div class="blockHead"><h3>' + esc(s.title) + "</h3><p>" +
        esc(s.hint) + "</p></div><table>" + rows + "</table></div>";
    }).join("");
    $("view-sheet").innerHTML = '<div class="sheetGrid">' + html + "</div>";
  }

  /* ---------- plain-text export ---------- */
  function asText(r) {
    var L = [];
    var line = function (n) { L.push(new Array(n || 64).join("=")); };
    L.push("CFB 27 CALL SHEET — " + r.offense.name + " (" + r.offense.style + ")");
    L.push("vs " + r.defense.name + "  [" + r.defense.front + " front / " + r.defense.flavor + "]");
    L.push("Box " + r.defense.box + " · " + r.defense.dbs + " DBs · " + r.defense.shell +
      " shell · " + r.defense.man + "% man · " + r.defense.blitz + "% pressure · " + r.defense.press + "% press");
    L.push("Seed " + r.seed);
    line();
    L.push("HOW TO ATTACK IT");
    r.attack.forEach(function (a) { L.push("  - " + a); });
    L.push("");
    L.push("WHAT THEY WILL SHOW YOU");
    r.expect.forEach(function (a) { L.push("  - " + a); });
    line();
    L.push("OPENING SCRIPT — FIRST 15");
    r.script.forEach(function (c) {
      L.push("  " + (c.no < 10 ? " " : "") + c.no + ". " + c.formation + " [" + c.personnel + "]" +
        (c.motion ? " " + c.motion : "") + " — " + c.play +
        (c.protection ? " (" + c.protection + ")" : ""));
      L.push("      " + c.intent + " · " + c.note);
    });
    line();
    L.push("DOWN & DISTANCE CALL SHEET");
    r.sections.forEach(function (s) {
      L.push("");
      L.push("-- " + s.title.toUpperCase() + " --");
      L.push("   " + s.hint);
      s.calls.forEach(function (c, i) {
        L.push("   " + (i + 1) + ") " + c.formation + " [" + c.personnel + "]" +
          (c.motion ? " " + c.motion : "") + " — " + c.play +
          (c.protection ? " · " + c.protection : "") + (c.why ? " · " + c.why : ""));
      });
    });
    L.push("");
    L.push("Generated by CFB 27 Play Caller.");
    return L.join("\n");
  }

  /* ---------- recents ---------- */
  function loadRecents() {
    try { return JSON.parse(localStorage.getItem("cfb27.recents") || "[]"); } catch (e) { return []; }
  }
  function saveRecent(offId, defId) {
    var list = loadRecents().filter(function (x) { return x.o !== offId || x.d !== defId; });
    list.unshift({ o: offId, d: defId });
    try { localStorage.setItem("cfb27.recents", JSON.stringify(list.slice(0, 6))); } catch (e) {}
    renderRecents();
  }
  function renderRecents() {
    var wrap = $("recents");
    var list = loadRecents();
    wrap.innerHTML = "";
    if (!list.length) return;
    var lab = document.createElement("span");
    lab.className = "meta";
    lab.style.width = "100%";
    lab.textContent = "Recent matchups";
    wrap.appendChild(lab);
    list.forEach(function (x) {
      var off = D.OFFENSES.filter(function (o) { return o.id === x.o; })[0];
      var def = D.DEFENSES.filter(function (d) { return d.id === x.d; })[0];
      if (!off || !def) return;
      var b = document.createElement("button");
      b.className = "chip";
      b.textContent = off.name + " vs " + def.name;
      b.addEventListener("click", function () {
        offFilter.value = "";
        fillOffenses("");
        offSelect.value = x.o;
        defSelect.value = x.d;
        describeOff(); describeDef();
        seed = 0;
        generate();
      });
      wrap.appendChild(b);
    });
  }

  /* ---------- generate ---------- */
  function generate() {
    var r = E.generate(offSelect.value, defSelect.value, seed);
    if (!r) return;
    current = r;
    $("out").hidden = false;
    $("matchTitle").textContent = r.offense.name + "  vs  " + r.defense.name;
    $("matchSub").textContent = r.offense.style + " playbook against a " + r.defense.front +
      " front (" + r.defense.flavor + ") · " + r.defense.box + "-man box · " + r.defense.shell +
      " shell · sheet #" + (r.seed + 1);
    renderPlan(r); renderScript(r); renderSheet(r);
    saveRecent(offSelect.value, defSelect.value);
    $("out").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- wiring ---------- */
  fillOffenses("");
  fillDefenses();
  offSelect.value = "team:Ohio State";
  if (!offSelect.value) offSelect.selectedIndex = 0;
  defSelect.value = "4-2-5 Man Pressure";
  describeOff(); describeDef(); renderRecents();

  offFilter.addEventListener("input", function () {
    var keep = offSelect.value;
    fillOffenses(offFilter.value);
    if (keep) offSelect.value = keep;
    if (!offSelect.value) offSelect.selectedIndex = 0;
    describeOff();
  });
  offSelect.addEventListener("change", describeOff);
  defSelect.addEventListener("change", describeDef);
  $("genBtn").addEventListener("click", function () { seed = 0; generate(); });
  $("rerollBtn").addEventListener("click", function () {
    if (!current) { seed = 0; generate(); return; }
    seed = (seed + 1) % 999;
    generate();
  });

  Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (t) {
    t.addEventListener("click", function () {
      Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (x) { x.classList.remove("on"); });
      t.classList.add("on");
      ["plan", "script", "sheet"].forEach(function (v) {
        $("view-" + v).hidden = v !== t.dataset.view;
      });
    });
  });

  $("printBtn").addEventListener("click", function () { window.print(); });
  $("copyBtn").addEventListener("click", function () {
    if (!current) return;
    var txt = asText(current);
    var done = function () { flash($("copyBtn"), "Copied"); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, function () { fallbackCopy(txt, done); });
    } else { fallbackCopy(txt, done); }
  });
  function fallbackCopy(txt, done) {
    var ta = document.createElement("textarea");
    ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) {}
    document.body.removeChild(ta);
  }
  function flash(btn, msg) {
    var old = btn.textContent;
    btn.textContent = msg;
    setTimeout(function () { btn.textContent = old; }, 1400);
  }
  $("dlBtn").addEventListener("click", function () {
    if (!current) return;
    var name = (current.offense.name + " vs " + current.defense.name).replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    var blob = new Blob([asText(current)], { type: "text/plain" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cfb27-call-sheet-" + name + ".txt";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  });

  /* ---------- PWA ---------- */
  var deferred = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault(); deferred = e; $("installBtn").hidden = false;
  });
  $("installBtn").addEventListener("click", function () {
    if (!deferred) return;
    deferred.prompt(); deferred = null; $("installBtn").hidden = true;
  });
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
