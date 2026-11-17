// La mappa dei luoghi di «Onde d'amore»: disegnata in SVG e collegata al lettore.
// I luoghi sono in luoghi.js; la mappa è uno spazio 600 × 960 con il nord in alto.
(function () {
  const places = window.LUOGHI || [];
  const brani = window.TREKI || [];
  const $ = (id) => document.getElementById(id);
  const box = $("mappaSvg");
  if (!box || !places.length) return;

  const NOVEL = "https://luisfader.github.io/litmir/#/onde-d-amore/";
  const W = 600, H = 960;
  const WALL = { cx: 320, cy: 500, rx: 150, ry: 132 };
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const f = (n) => Math.round(n * 10) / 10;
  const titleOf = (id) => (brani.find((b) => b.id === id) || {}).title || id;
  const placeOfTrack = (id) => places.find((p) => p.tracks.includes(id));

  // numeri casuali ma sempre uguali: la mappa non cambia a ogni visita
  let seed = 20261117;
  const rand = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  // curve di Bézier: [x0, y0, poi gruppi di 6 numeri] → attributo d e punti campione
  function curve(p) {
    let d = `M${p[0]} ${p[1]}`;
    const pts = [];
    for (let i = 2; i + 6 <= p.length; i += 6) {
      const x0 = p[i - 2], y0 = p[i - 1];
      const [x1, y1, x2, y2, x3, y3] = p.slice(i, i + 6);
      d += ` C${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`;
      for (let t = 0; t <= 1; t += 0.05) {
        const u = 1 - t;
        pts.push([u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
                  u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3]);
      }
    }
    return { d, pts };
  }

  const NORTH = curve([320, 368, 330, 340, 365, 300, 360, 270, 355, 240, 300, 225, 262, 205, 230, 188, 195, 165, 165, 140]);
  const NUVO = curve([406, 608, 440, 640, 525, 650, 522, 695, 520, 735, 470, 755, 455, 798]);
  const RAIL = curve([600, 772, 545, 784, 495, 792, 455, 798, 410, 805, 380, 822, 350, 838, 330, 849, 315, 852, 300, 852]);
  const RIVER = curve([0, 862, 40, 870, 75, 886, 100, 902, 125, 918, 150, 940, 162, 960]);
  const CANAL = curve([228, 372, 214, 420, 204, 465, 212, 500, 220, 540, 206, 590, 196, 640, 190, 668, 176, 690, 160, 705]);
  const STREETS = [
    [330, 505, 328, 460, 322, 410, 320, 368],
    [330, 505, 350, 545, 380, 580, 406, 608],
    [330, 505, 365, 490, 400, 470, 432, 452],
    [330, 505, 290, 505, 250, 500, 212, 500],
    [330, 505, 331, 540, 330, 570, 330, 598]
  ].map(curve);

  // dove non disegnare alberi: vicino ai luoghi, alle strade e ai nomi delle zone
  const REGIONS = [
    { t: "Il nord", x: 462, y: 120, box: [452, 94, 580, 128] },
    { t: "Verdegrado", x: 20, y: 392, box: [10, 366, 150, 400] },
    { t: "Sinea", x: 20, y: 772, box: [10, 748, 92, 780] }
  ];
  const lines = [NORTH, NUVO, RAIL, CANAL].flatMap((c) => c.pts);
  const inWalls = (x, y, m) => ((x - WALL.cx) / (WALL.rx + m)) ** 2 + ((y - WALL.cy) / (WALL.ry + m)) ** 2 < 1;
  const clear = (x, y) =>
    places.every((p) => Math.hypot(p.x - x, p.y - y) > 26) &&
    lines.every(([lx, ly]) => Math.hypot(lx - x, ly - y) > 10) &&
    REGIONS.every(({ box: [x0, y0, x1, y1] }) => x < x0 || x > x1 || y < y0 || y > y1 + 10);

  function forest(cx, cy, rx, ry, n, cls) {
    const trees = [];
    for (let tries = 0; trees.length < n && tries < n * 8; tries++) {
      const a = rand() * Math.PI * 2, r = Math.sqrt(rand());
      const x = cx + Math.cos(a) * r * rx, y = cy + Math.sin(a) * r * ry;
      if (x < 8 || x > W - 8 || y < 14 || y > H - 8) continue;
      if (cls !== "park" && inWalls(x, y, 14)) continue;
      if (!clear(x, y)) continue;
      trees.push([x, y, 0.75 + rand() * 0.6]);
    }
    return trees.sort((a, b) => a[1] - b[1]).map(([x, y, s]) =>
      `<path class="tree ${cls}" d="M${f(x)} ${f(y - 11 * s)}l${f(6.5 * s)} ${f(13 * s)}h${f(-13 * s)}z"/>`).join("");
  }

  function houses() {
    let out = "";
    for (let y = 378; y < 628; y += 11) {
      for (let x = 176; x < 466; x += 13) {
        const hx = x + rand() * 3, hy = y + rand() * 3;
        if (!inWalls(hx + 5, hy + 4, -16) || rand() < 0.36) continue;
        if (hx > 294 && hx < 366 && hy > 466 && hy < 524) continue;
        if (((hx + 5 - 262) / 50) ** 2 + ((hy + 4 - 584) / 34) ** 2 < 1) continue;
        const old = Math.hypot(hx - 258, hy - 428) < 50;
        out += `<rect class="house${old ? " old" : ""}" x="${f(hx)}" y="${f(hy)}" width="${old ? 8 : 10}" height="${old ? 7 : 8}" rx="1"/>`;
      }
    }
    return out;
  }

  function blocks() {
    let out = "";
    for (let y = 798; y < 952; y += 12) {
      for (let x = 12; x < 300; x += 15) {
        if (((x + 6 - 152) / 144) ** 2 + ((y + 5 - 875) / 80) ** 2 > 1 || rand() < 0.2) continue;
        out += `<rect class="block" x="${f(x + rand() * 2)}" y="${f(y + rand() * 2)}" width="${f(11 + rand() * 2)}" height="${f(8 + rand())}" rx="1"/>`;
      }
    }
    return out;
  }

  function towers() {
    let out = "";
    for (let a = -80; a <= 260; a += 20) {
      if (Math.abs(a - 55) < 12 || Math.abs(a - 230) < 12) continue;
      const r = (a * Math.PI) / 180;
      out += `<circle class="wtower" cx="${f(WALL.cx + WALL.rx * Math.cos(r))}" cy="${f(WALL.cy + WALL.ry * Math.sin(r))}" r="5.5"/>`;
    }
    return out;
  }

  const fields = [[300, 716, 64, 30, 10], [338, 768, 74, 32, -12], [430, 842, 84, 30, -8], [530, 852, 62, 40, 6], [470, 892, 92, 34, -4], [560, 742, 50, 30, 8]]
    .map(([x, y, w, h, r]) => {
      let s = `<g transform="rotate(${r} ${x + w / 2} ${y + h / 2})"><rect class="field" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/>`;
      for (let k = 1; k < 4; k++) s += `<line class="furrow" x1="${x + 4}" y1="${y + (h * k) / 4}" x2="${x + w - 4}" y2="${y + (h * k) / 4}"/>`;
      return s + "</g>";
    }).join("");

  const LABEL = { r: [21, 6, "start"], l: [-21, 6, "end"], t: [0, -22, "middle"], b: [0, 33, "middle"] };
  const labels = places.map((p) => {
    const [dx, dy, anchor] = LABEL[p.side] || LABEL.r;
    return `<text class="plabel" data-id="${p.id}" x="${p.x + dx}" y="${p.y + dy}" text-anchor="${anchor}">${esc(p.label)}</text>`;
  }).join("");
  const pins = places.map((p, i) => `
    <g class="pin" data-id="${p.id}" transform="translate(${p.x} ${p.y})" tabindex="0" role="button" aria-label="${i + 1}. ${esc(p.name)}">
      <circle class="hit" r="28"/><circle class="ring" r="15"/><circle class="ring r2" r="15"/>
      <circle class="dot" r="15"/><text class="num" y="4.5">${i + 1}</text>
    </g>`).join("");

  box.innerHTML = `
  <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Mappa dei luoghi del romanzo: Sinea, il viaggio, Verdegrado e il nord">
    <defs>
      <radialGradient id="mBg" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#16213a"/><stop offset="1" stop-color="#0b101c"/></radialGradient>
      <radialGradient id="gTeal"><stop offset="0" stop-color="#5fe3a1" stop-opacity=".55"/><stop offset="1" stop-color="#5fe3a1" stop-opacity="0"/></radialGradient>
      <radialGradient id="gPink"><stop offset="0" stop-color="#ff8fc8" stop-opacity=".6"/><stop offset="1" stop-color="#ff8fc8" stop-opacity="0"/></radialGradient>
      <radialGradient id="gGold"><stop offset="0" stop-color="#d9b56c" stop-opacity=".5"/><stop offset="1" stop-color="#d9b56c" stop-opacity="0"/></radialGradient>
      <filter id="mGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#mBg)"/>

    <!-- il nord: il vecchio campo, le colline basse, la fortezza nera -->
    <ellipse class="campo" cx="150" cy="112" rx="118" ry="62"/>
    <path class="hills" d="M30 206 q35 -26 70 0 q35 -26 70 0 q35 -26 70 0 q35 -26 70 0"/>
    <circle cx="147" cy="50" r="26" fill="url(#gPink)"/>
    <path class="nera" d="M95 128V92h10V80h12v12h18V66l12-8 12 8v26h18V80h12v12h10v36z"/>
    <circle class="spark" cx="147" cy="50" r="3"/>
    <ellipse class="fog f1" cx="120" cy="132" rx="80" ry="10"/>
    <ellipse class="fog f2" cx="200" cy="96" rx="60" ry="8"/>

    ${fields}
    <ellipse class="fog f2" cx="395" cy="790" rx="90" ry="12"/>
    <ellipse class="fog f1" cx="350" cy="852" rx="70" ry="10"/>

    <!-- i boschi -->
    ${forest(380, 262, 215, 92, 150, "dark")}
    ${forest(95, 300, 95, 60, 40, "dark")}
    ${forest(75, 525, 64, 125, 60, "")}
    ${forest(542, 510, 58, 135, 60, "")}
    ${forest(500, 690, 105, 78, 75, "")}
    ${forest(110, 705, 95, 42, 30, "")}
    <ellipse class="fog f1" cx="420" cy="300" rx="110" ry="12"/>

    <!-- strade e ferrovia -->
    <path class="road-bg" d="${NORTH.d}"/><path class="road" d="${NORTH.d}"/>
    <path class="road-bg" d="${NUVO.d}"/><path class="road" d="${NUVO.d}"/>
    <path class="rail-ties" d="${RAIL.d}"/><path class="rail" d="${RAIL.d}"/>

    <!-- Verdegrado -->
    ${houses()}
    ${STREETS.map((s) => `<path class="street" d="${s.d}"/>`).join("")}
    <rect class="piazza" x="300" y="470" width="60" height="50" rx="3"/>
    <ellipse class="parco" cx="262" cy="584" rx="44" ry="28"/>
    <path class="bastione" d="M226 596 q36 -26 72 0 M234 606 q28 -18 56 0"/>
    ${forest(262, 584, 38, 22, 9, "park")}
    <path class="canal-bg" d="${CANAL.d}"/><path class="canal" d="${CANAL.d}"/><path class="canal-hi" d="${CANAL.d}"/>
    <line class="bridge" x1="190" y1="500" x2="234" y2="500"/>
    <ellipse class="wall" cx="${WALL.cx}" cy="${WALL.cy}" rx="${WALL.rx}" ry="${WALL.ry}" filter="url(#mGlow)"/>
    <ellipse class="wall-in" cx="${WALL.cx}" cy="${WALL.cy}" rx="${WALL.rx - 7}" ry="${WALL.ry - 7}"/>
    ${towers()}
    <circle class="gate" cx="406" cy="608" r="5"/>
    <circle cx="330" cy="470" r="30" fill="url(#gPink)"/>
    <path class="tower" d="M325 494l1-24 4-13 4 13 1 24z"/>
    <circle cx="330" cy="598" r="30" fill="url(#gGold)"/>

    <!-- il viaggio -->
    <rect class="station" x="436" y="808" width="38" height="6" rx="1"/>
    <path class="footbridge" d="M466 808 q10 -18 20 0"/>

    <!-- Sinea -->
    ${blocks()}
    <path class="avenue" d="M18 822L292 902M118 802L236 950M28 908L284 832"/>
    <path class="river-bg" d="${RIVER.d}"/><path class="river" d="${RIVER.d}"/><path class="river-hi" d="${RIVER.d}"/>
    <line class="bridge wide" x1="87" y1="919.7" x2="113" y2="884.3"/>
    <rect class="station" x="292" y="846" width="16" height="10" rx="1"/>
    <circle cx="170" cy="784" r="38" fill="url(#gTeal)"/>
    <circle cx="170" cy="770" r="18" fill="url(#gPink)"/>
    <path class="tower love" d="M163 815l2-25 3-15 2-13 2 13 3 15 2 25z"/>
    <circle class="spark" cx="170" cy="764" r="2.5"/>

    <!-- nomi delle zone, bussola -->
    ${REGIONS.map((r) => `<text class="region" x="${r.x}" y="${r.y}">${r.t}</text>`).join("")}
    <g class="compass" transform="translate(556 58)"><circle r="16"/><path d="M0-13l4 13-4 13-4-13z"/><text y="-21">N</text></g>

    <g class="labels">${labels}</g>
    <g class="pins">${pins}</g>
  </svg>`;

  const svg = box.querySelector("svg");
  const card = $("luogoCard");
  const list = $("luoghiList");
  const nowBtn = $("mappaNow");
  const audio = $("audio");
  let sel = null, nowTrack = null;

  // capitoli: [12, 13, 15, "E"] → "12–13, 15, Epilogo"
  function chapters(ch) {
    const nums = ch.filter((c) => c !== "E").sort((a, b) => a - b), parts = [];
    for (let i = 0; i < nums.length; i++) {
      let j = i;
      while (j + 1 < nums.length && nums[j + 1] === nums[j] + 1) j++;
      parts.push(j > i ? `${nums[i]}–${nums[j]}` : `${nums[i]}`);
      i = j;
    }
    if (ch.includes("E")) parts.push("Epilogo");
    return parts.join(", ");
  }
  const chapWord = (ch) => (ch.length === 1 && ch[0] === "E" ? "" : ch.filter((c) => c !== "E").length > 1 ? "Capitoli " : "Capitolo ");

  list.innerHTML = places.map((p, i) => `
    <li data-id="${p.id}"><button type="button">
      <span class="n">${i + 1}</span><span class="nm">${esc(p.name)}</span>
      <span class="sub">${esc(p.area)} · ${esc(chWord(p.ch))}</span>
    </button></li>`).join("");
  function chWord(ch) { const w = chapWord(ch); return (w ? w.replace("Capitoli", "Cap.").replace("Capitolo", "Cap.") : "") + chapters(ch); }

  function renderCard() {
    const p = places.find((x) => x.id === sel);
    if (!p) {
      card.innerHTML = `
        <p class="eyebrow">${places.length} luoghi · nell'ordine del libro</p>
        <h3>Scegli un luogo</h3>
        <p>Tocca un punto sulla mappa o un nome nella lista: vedrai che cosa vi succede, in quali capitoli, e la musica che vi risuona.</p>
        <p class="legend"><span class="lg-item"><span class="lg dot"></span>un luogo del romanzo</span><span class="lg-item"><span class="lg wave"></span>qui sta suonando la musica</span></p>`;
      return;
    }
    const n = places.indexOf(p) + 1;
    const playing = audio && !audio.paused;
    const chips = p.tracks.map((id) => {
      const on = id === nowTrack;
      return `<button class="chip${on ? " on" : ""}" type="button" data-track="${id}">${on && playing ? "❚❚" : "▶"} ${esc(titleOf(id))}</button>`;
    }).join("");
    const links = p.ch.map((c) => `<a href="${NOVEL}${c === "E" ? "extra-1" : c}" target="_blank" rel="noopener">${c === "E" ? "Epilogo" : c}</a>`).join(" · ");
    card.innerHTML = `
      <p class="eyebrow">${n} · ${esc(p.area)} · ${esc(chapWord(p.ch) + chapters(p.ch))}</p>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.text)}</p>
      ${chips ? `<p class="luogo-label">Qui risuona</p><div class="luogo-brani">${chips}</div>` : ""}
      <p class="luogo-cap">Leggi nel romanzo: ${links}</p>`;
  }

  function mark() {
    const nowPlace = nowTrack && placeOfTrack(nowTrack);
    svg.querySelectorAll(".pin").forEach((g) => {
      g.classList.toggle("sel", g.dataset.id === sel);
      g.classList.toggle("now", !!nowPlace && g.dataset.id === nowPlace.id);
      g.setAttribute("aria-pressed", g.dataset.id === sel ? "true" : "false");
    });
    svg.querySelectorAll(".plabel").forEach((t) => t.classList.toggle("sel", t.dataset.id === sel));
    list.querySelectorAll("li").forEach((li) => {
      li.classList.toggle("sel", li.dataset.id === sel);
      li.classList.toggle("now", !!nowPlace && li.dataset.id === nowPlace.id);
    });
    const pin = svg.querySelector(`.pin[data-id="${sel}"]`);
    if (pin) pin.parentNode.appendChild(pin); // il luogo scelto sopra gli altri
  }

  function select(id, scroll) {
    sel = id;
    renderCard();
    mark();
    if (scroll) {
      const r = card.getBoundingClientRect();
      if (r.top < 0 || r.top > window.innerHeight - 140) card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  svg.addEventListener("click", (e) => {
    const g = e.target.closest(".pin");
    if (g) select(g.dataset.id, true);
  });
  svg.addEventListener("keydown", (e) => {
    const g = e.target.closest(".pin");
    if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); select(g.dataset.id, true); }
  });
  list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li) select(li.dataset.id, true);
  });
  card.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    if (b.dataset.track === nowTrack && audio && !audio.paused) audio.pause();
    else if (window.ondePlay) window.ondePlay(b.dataset.track);
  });

  // il lettore dice quale brano suona: la mappa accende il luogo
  function setNow(id) {
    nowTrack = id;
    const p = placeOfTrack(id);
    nowBtn.hidden = !p;
    if (p) nowBtn.innerHTML = `<span class="note">♪</span> Ora suona: <b>${esc(titleOf(id))}</b> · ${esc(p.name)}`;
    const link = $("sceneLuogo");
    if (link) {
      link.hidden = !p;
      if (p) { link.textContent = "◎ Sulla mappa: " + p.name; link.dataset.id = p.id; }
    }
    mark();
    renderCard();
  }
  document.addEventListener("onde:track", (e) => setNow(e.detail.id));
  if (audio) {
    audio.addEventListener("play", renderCard);
    audio.addEventListener("pause", renderCard);
  }
  nowBtn.addEventListener("click", () => {
    const p = nowTrack && placeOfTrack(nowTrack);
    if (p) select(p.id, true);
  });
  const link = $("sceneLuogo");
  if (link) link.addEventListener("click", (e) => {
    e.preventDefault();
    select(link.dataset.id, false);
    $("mappa").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  renderCard();
  mark();
})();
