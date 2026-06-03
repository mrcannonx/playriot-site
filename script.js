// PLAYRIOT — work index + motion
const APPS = [
  { slug:"expendy",     name:"Expendy",            prob:"Track expenses by talking — not typing.",          cat:"Money",      url:"https://apps.apple.com/us/app/id6759892984" },
  { slug:"avanotes",    name:"AvaNotes",           prob:"Just talk — Ava turns it into notes and to-dos.",   cat:"Voice notes",url:"https://apps.apple.com/us/app/id6768893413" },
  { slug:"dealshield",  name:"DealShield",         prob:"Catches the hidden fees before you sign.",          cat:"Car buying", url:"https://apps.apple.com/us/app/id6764470469" },
  { slug:"nutrilish",   name:"NutriLish",          prob:"Snap a photo of your plate, get the calories.",     cat:"Nutrition",  url:"https://apps.apple.com/us/app/id6759699590" },
  { slug:"pinwell",     name:"Pinwell",            prob:"Track every GLP-1, peptide, and TRT dose.",         cat:"Health",     url:"https://apps.apple.com/us/app/id6773144612" },
  { slug:"musclefuel",  name:"MuscleFuel AI",      prob:"Hit your daily protein without the math.",          cat:"Fitness",    url:"https://apps.apple.com/us/app/id6759682169" },
  { slug:"regretit",    name:"RegretIt",           prob:"Logs your impulse buys. Then roasts you for them.", cat:"Money",      url:"https://apps.apple.com/us/app/id6759505734" },
  { slug:"materialcalc",name:"Material Calc Pro",  prob:"Exact materials for every job — no guesswork.",     cat:"Trades",     url:"https://apps.apple.com/us/app/id6760954453" },
  { slug:"hvac",        name:"HVAC Pro Calculator",prob:"Field math for HVAC techs — BTU, duct, voltage.",   cat:"Trades",     url:"https://apps.apple.com/us/app/id6768459507" },
  { slug:"covershift",  name:"CoverShift",         prob:"Swap and cover shifts — without the group texts.",  cat:"Shift work", url:"https://apps.apple.com/us/app/id6769180864" },
  { slug:"crew",        name:"Crew: Night Out",    prob:"Keeps the whole group together — and home safe.",   cat:"Social",     url:"https://apps.apple.com/us/app/id6766379479" },
];

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

const list = document.getElementById("work-list");
if (list) {
  APPS.forEach((a, i) => {
    const row = el("a", "work-row");
    row.href = a.url; row.target = "_blank"; row.rel = "noopener";
    row.setAttribute("data-reveal", "");
    row.setAttribute("aria-label", `${a.name} — ${a.prob} (opens App Store)`);

    row.appendChild(el("span", "num", String(i + 1).padStart(2, "0")));

    const ic = el("img", "ic");
    ic.src = `assets/icons/${a.slug}.png`; ic.alt = `${a.name} app icon`;
    ic.width = 64; ic.height = 64; ic.decoding = "async";
    row.appendChild(ic);

    const meta = el("span", "meta");
    meta.appendChild(el("span", "name", a.name));
    meta.appendChild(el("span", "prob", a.prob));
    row.appendChild(meta);

    row.appendChild(el("span", "cat", a.cat));

    const go = el("span", "go", "↗");
    go.setAttribute("aria-hidden", "true");
    row.appendChild(go);

    const li = document.createElement("li");
    li.appendChild(row);
    list.appendChild(li);
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
