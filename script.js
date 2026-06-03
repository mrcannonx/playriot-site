// PLAYRIOT — work index + motion
const APPS = [
  { slug:"expendy",     name:"Expendy",            cat:"Money",      url:"https://apps.apple.com/us/app/id6759892984",
    prob:"Track expenses by talking — not typing.",
    desc:"Tap the mic and say “twelve dollars at Starbucks” — Expendy’s AI categorizes it instantly, no typing. It’s also a full budget planner and subscription catcher, Siri-ready, with CSV export when you need the receipts." },
  { slug:"avanotes",    name:"AvaNotes",           cat:"Voice notes",url:"https://apps.apple.com/us/app/id6768893413",
    prob:"Just talk — Ava turns it into notes and to-dos.",
    desc:"Press the button and talk — Ava transcribes in 100+ languages, summarizes, and pulls every todo, meeting, and follow-up out of what you said. One tap sends them to Reminders, Calendar, or a draft email. No meeting bots, no screen recording." },
  { slug:"dealshield",  name:"DealShield",         cat:"Car buying", url:"https://apps.apple.com/us/app/id6764470469",
    prob:"Catches the hidden fees before you sign.",
    desc:"Point your camera at the dealer’s finance worksheet and the AI flags every junk add-on, markup, and packed-payment line. It scores any offer 0–100 against the real market and gives you the true out-the-door price — before you sign." },
  { slug:"nutrilish",   name:"NutriLish",          cat:"Nutrition",  url:"https://apps.apple.com/us/app/id6759699590",
    prob:"Snap a photo of your plate, get the calories.",
    desc:"Photograph any meal and AI names each item with calories and full macros — no manual logging. Scan barcodes for packaged foods, then watch your daily, weekly, and monthly trends on one dashboard." },
  { slug:"pinwell",     name:"Pinwell",            cat:"Health",     url:"https://apps.apple.com/us/app/id6773144612",
    prob:"Track every GLP-1, peptide, and TRT dose.",
    desc:"A real medication logbook for GLP-1, peptides, and TRT — semaglutide, tirzepatide, BPC-157, testosterone, and more. Pin a dose in three taps, see your level on a pharmacokinetic chart built from FDA-label half-life math, and rotate injection sites on a body diagram. No paywall, ever." },
  { slug:"musclefuel",  name:"MuscleFuel AI",      cat:"Fitness",    url:"https://apps.apple.com/us/app/id6759682169",
    prob:"Hit your daily protein without the math.",
    desc:"It sets your daily protein target from your weight, gender, and training, then makes hitting it effortless. Voice-log meals like “two eggs, chicken breast,” snap your plate for an AI estimate, and keep the streak alive — no spreadsheets." },
  { slug:"regretit",    name:"RegretIt",           cat:"Money",      url:"https://apps.apple.com/us/app/id6759505734",
    prob:"Logs your impulse buys. Then roasts you for them.",
    desc:"Log your worst impulse buys, rate the regret, and watch your Total Damage climb. Every purchase earns a unique AI-generated roast based on what you bought and how much you blew — financial accountability, with jokes." },
  { slug:"materialcalc",name:"Material Calc Pro",  cat:"Trades",     url:"https://apps.apple.com/us/app/id6760954453",
    prob:"Exact materials for every job — no guesswork.",
    desc:"Enter your dimensions and it tells you exactly how much to buy — tile, paint, concrete, drywall, decking, fencing, mulch, wallpaper — in seconds, waste buffer included. Measure twice, buy once, skip the second trip to the store." },
  { slug:"hvac",        name:"HVAC Pro Calculator",cat:"Trades",     url:"https://apps.apple.com/us/app/id6768459507",
    prob:"Field math for HVAC techs — BTU, duct, voltage.",
    desc:"BTU load sizing, Manual-D duct calc, NEC voltage drop, refrigerant P-T charts, superheat and subcooling — the field tools HVAC techs and electricians actually use. Every formula is cited (ASHRAE, NEC, SMACNA). No ads, no tracking." },
  { slug:"covershift",  name:"CoverShift",         cat:"Shift work", url:"https://apps.apple.com/us/app/id6769180864",
    prob:"Swap and cover shifts — without the group texts.",
    desc:"Post a shift you can’t cover and your manager and teammates are notified instantly — coworkers claim it from the open-shift board, the manager approves with one tap. Schedule, swap, pick up hours, request time off, and clock in, all in one place." },
  { slug:"crew",        name:"Crew: Night Out",    cat:"Social",     url:"https://apps.apple.com/us/app/id6766379479",
    prob:"Keeps the whole group together — and home safe.",
    desc:"Spin a fair, weighted wheel to settle the designated driver, the bar crawl, and who buys the round — in about ten seconds. A live dashboard keeps the crew together all night, and everyone wakes up to a recap. Get home safe." },
];

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

// chevron built with safe DOM (no innerHTML)
const SVG_NS = "http://www.w3.org/2000/svg";
const chevron = () => {
  const svg = document.createElementNS(SVG_NS, "svg");
  const attrs = { class:"chev", viewBox:"0 0 24 24", width:"22", height:"22", fill:"none",
    stroke:"currentColor", "stroke-width":"2.2", "stroke-linecap":"round", "stroke-linejoin":"round", "aria-hidden":"true" };
  for (const k in attrs) svg.setAttribute(k, attrs[k]);
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", "M6 9l6 6 6-6");
  svg.appendChild(path);
  return svg;
};

const list = document.getElementById("work-list");
if (list) {
  APPS.forEach((a, i) => {
    const li = el("li", "work-item");
    li.setAttribute("data-reveal", "");

    const row = el("div", "work-row");

    // main, clickable area → App Store (keeps the big tap target + the section's promise)
    const main = el("a", "work-main");
    main.href = a.url; main.target = "_blank"; main.rel = "noopener";
    main.setAttribute("aria-label", `${a.name} — ${a.prob} (opens App Store)`);
    main.appendChild(el("span", "num", String(i + 1).padStart(2, "0")));

    const ic = el("img", "ic");
    ic.src = `assets/icons/${a.slug}.png`; ic.alt = `${a.name} app icon`;
    ic.width = 64; ic.height = 64; ic.decoding = "async"; ic.loading = "lazy";
    main.appendChild(ic);

    const meta = el("span", "meta");
    meta.appendChild(el("span", "name", a.name));
    meta.appendChild(el("span", "prob", a.prob));
    main.appendChild(meta);

    main.appendChild(el("span", "cat", a.cat));
    row.appendChild(main);

    // separate toggle — a sibling of the link, so it never triggers navigation
    const pid = `desc-${a.slug}`;
    const btn = el("button", "work-toggle");
    btn.type = "button";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", pid);
    btn.setAttribute("aria-label", `More about ${a.name}`);
    btn.appendChild(chevron());
    row.appendChild(btn);

    li.appendChild(row);

    // collapsible description panel
    const desc = el("div", "work-desc");
    desc.id = pid;
    const din = el("div", "work-desc-in");
    const body = el("div", "work-desc-body");
    body.appendChild(el("p", null, a.desc));
    const store = el("a", "work-store");
    store.href = a.url; store.target = "_blank"; store.rel = "noopener";
    store.appendChild(document.createTextNode("View on the App Store "));
    const arr = el("span", null, "↗");
    arr.setAttribute("aria-hidden", "true");
    store.appendChild(arr);
    body.appendChild(store);
    din.appendChild(body);
    desc.appendChild(din);
    li.appendChild(desc);

    list.appendChild(li);
  });

  // expand / collapse (event delegation; the toggle is a sibling of the link, so no nav conflict)
  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".work-toggle");
    if (!btn) return;
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    if (panel) panel.classList.toggle("open", !open);
  });
}

// keep the live-app count in sync with the list above
const count = APPS.length;
document.querySelectorAll("[data-app-count]").forEach((n) => { n.textContent = String(count); });
const navCount = document.getElementById("nav-count");
if (navCount) navCount.textContent = `${count} live →`;

const yr = document.getElementById("yr");
if (yr) yr.textContent = new Date().getFullYear();

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));
