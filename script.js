// PLAYRIOT — work index + motion
const APPS = [
  { slug:"expendy",     name:"Expendy",            cat:"Money",      url:"https://apps.apple.com/us/app/id6759892984?pt=127481835&ct=playriot&mt=8",
    prob:"Track expenses by talking — not typing.",
    desc:"Tap the mic and say “twelve dollars at Starbucks” — Expendy’s AI categorizes it instantly, no typing. It’s also a full budget planner and subscription catcher, Siri-ready, with CSV export when you need the receipts." },
  { slug:"avanotes",    name:"AvaNotes",           cat:"Voice notes",url:"https://apps.apple.com/us/app/id6768893413?pt=127481835&ct=playriot&mt=8",
    prob:"Just talk — Ava turns it into notes and to-dos.",
    desc:"Press the button and talk — Ava transcribes in 100+ languages, summarizes, and pulls every todo, meeting, and follow-up out of what you said. One tap sends them to Reminders, Calendar, or a draft email. No meeting bots, no screen recording." },
  { slug:"dealshield",  name:"DealShield",         cat:"Car buying", url:"https://apps.apple.com/us/app/id6764470469?pt=127481835&ct=playriot&mt=8",
    prob:"Catches the hidden fees before you sign.",
    desc:"Point your camera at the dealer’s finance worksheet and the AI flags every junk add-on, markup, and packed-payment line. It scores any offer 0–100 against the real market and gives you the true out-the-door price — before you sign." },
  { slug:"nutrilish",   name:"NutriLish",          cat:"Nutrition",  url:"https://apps.apple.com/us/app/id6759699590?pt=127481835&ct=playriot&mt=8",
    prob:"Snap a photo of your plate, get the calories.",
    desc:"Photograph any meal and AI names each item with calories and full macros — no manual logging. Scan barcodes for packaged foods, then watch your daily, weekly, and monthly trends on one dashboard." },
  { slug:"pinwell",     name:"Pinwell",            cat:"Health",     url:"https://apps.apple.com/us/app/id6773144612?pt=127481835&ct=playriot&mt=8",
    prob:"Track every GLP-1, peptide, and TRT dose.",
    desc:"A real medication logbook for GLP-1, peptides, and TRT — semaglutide, tirzepatide, BPC-157, testosterone, and more. Pin a dose in three taps, see your level on a pharmacokinetic chart built from FDA-label half-life math, and rotate injection sites on a body diagram. No paywall, ever." },
  { slug:"musclefuel",  name:"MuscleFuel AI",      cat:"Fitness",    url:"https://apps.apple.com/us/app/id6759682169?pt=127481835&ct=playriot&mt=8",
    prob:"Hit your daily protein without the math.",
    desc:"It sets your daily protein target from your weight, gender, and training, then makes hitting it effortless. Voice-log meals like “two eggs, chicken breast,” snap your plate for an AI estimate, and keep the streak alive — no spreadsheets." },
  { slug:"regretit",    name:"RegretIt",           cat:"Money",      url:"https://apps.apple.com/us/app/id6759505734?pt=127481835&ct=playriot&mt=8",
    prob:"Logs your impulse buys. Then roasts you for them.",
    desc:"Log your worst impulse buys, rate the regret, and watch your Total Damage climb. Every purchase earns a unique AI-generated roast based on what you bought and how much you blew — financial accountability, with jokes." },
  { slug:"materialcalc",name:"Material Calc Pro",  cat:"Trades",     url:"https://apps.apple.com/us/app/id6760954453?pt=127481835&ct=playriot&mt=8",
    prob:"Exact materials for every job — no guesswork.",
    desc:"Enter your dimensions and it tells you exactly how much to buy — tile, paint, concrete, drywall, decking, fencing, mulch, wallpaper — in seconds, waste buffer included. Measure twice, buy once, skip the second trip to the store." },
  { slug:"hvac",        name:"HVAC Pro Calculator",cat:"Trades",     url:"https://apps.apple.com/us/app/id6768459507?pt=127481835&ct=playriot&mt=8",
    prob:"Field math for HVAC techs — BTU, duct, voltage.",
    desc:"BTU load sizing, Manual-D duct calc, NEC voltage drop, refrigerant P-T charts, superheat and subcooling — the field tools HVAC techs and electricians actually use. Every formula is cited (ASHRAE, NEC, SMACNA). No ads, no tracking." },
  { slug:"covershift",  name:"CoverShift",         cat:"Shift work", url:"https://apps.apple.com/us/app/id6769180864?pt=127481835&ct=playriot&mt=8",
    prob:"Swap and cover shifts — without the group texts.",
    desc:"Post a shift you can’t cover and your manager and teammates are notified instantly — coworkers claim it from the open-shift board, the manager approves with one tap. Schedule, swap, pick up hours, request time off, and clock in, all in one place." },
  { slug:"crew",        name:"Crew: Night Out",    cat:"Social",     url:"https://apps.apple.com/us/app/id6766379479?pt=127481835&ct=playriot&mt=8",
    prob:"Keeps the whole group together — and home safe.",
    desc:"Spin a fair, weighted wheel to settle the designated driver, the bar crawl, and who buys the round — in about ten seconds. A live dashboard keeps the crew together all night, and everyone wakes up to a recap. Get home safe." },
  { slug:"untilt",      name:"Untilt",             cat:"Quit betting",url:"https://apps.apple.com/us/app/id6779029514?pt=127481835&ct=playriot&mt=8",
    prob:"A comeback scoreboard for quitting sports betting.",
    desc:"Untilt is a broadcast-style scoreboard for the person who keeps deleting the sportsbook apps and reinstalling them by Sunday. Log a level day each night and watch the run build — your streak, your bank, your tilt risk on one screen. The KEPT ticker counts every dollar you don’t send them. No therapy-speak, no shame — just your comeback, called like a game." },
  { slug:"halfpuff",    name:"HalfPuff",           cat:"Quit vaping", url:"https://apps.apple.com/us/app/id6782655042?pt=127481835&ct=playriot&mt=8",
    prob:"Quit vaping by cutting down — one tap per puff.",
    desc:"HalfPuff helps you quit vaping gently, not cold turkey. Log every puff in one tap — widget, Control Center, Action Button, or Siri, without the app ever opening — and watch your daily count fall on a taper plan you control. When a craving hits, a 90-second breathing rescue rides it out." },
  { slug:"swipespace",  name:"SwipeSpace",         cat:"Photo cleanup",url:"https://apps.apple.com/us/app/id6786901829?pt=127481835&ct=playriot&mt=8",
    prob:"Clear your camera roll like a game — swipe to delete.",
    desc:"SwipeSpace turns the camera roll you’ve been dreading into a one-thumb game — swipe right to keep, left to delete, and watch the gigabytes come back. It scans on-device and stacks the worst offenders — screenshots, blurry shots, near-duplicates — into decks you can clear in a sitting. A live GB-freed score shows exactly how much space you won back." },
  { slug:"reelish",     name:"Reelish",            cat:"Recipes",     url:"https://apps.apple.com/us/app/id6784896244?pt=127481835&ct=playriot&mt=8",
    prob:"Turn cooking videos into recipes you actually keep.",
    desc:"Paste or share any TikTok, Reel, or YouTube cooking video and Reelish pulls the ingredients and steps into a clean, saved recipe — so you never lose the dish when the video disappears. It reads the captions and spoken steps and lays out a real ingredient list and numbered method. No pausing, scrubbing, or screenshotting." },
  { slug:"firstbuck",   name:"FirstBuck",          cat:"Side hustles",url:"https://apps.apple.com/us/app/id6788052728?pt=127481835&ct=playriot&mt=8",
    prob:"Turns viral side-hustle videos into honest 30-day plans.",
    desc:"Everyone’s got a first buck — FirstBuck helps you get yours. It turns viral side-hustle videos into real playbooks, with the creator’s claimed numbers checked against honest math and stamped CHECKS OUT, INFLATED, or somewhere between. Then it localizes the plan into 30 days for your city. No hype, no passive-income empire — just the real math before you spend a dollar." },
  { slug:"bloomstreak", name:"Bloomstreak",        cat:"75-day challenge",url:"https://apps.apple.com/us/app/id6783481600?pt=127481835&ct=playriot&mt=8",
    prob:"The 75-day challenge you finish — with friends.",
    desc:"Bloomstreak is a 75-day challenge tracker you actually finish, because you do it with a squad. Pick 75 Hard, 75 Soft, a Winter Arc reset, or build your own tasks, then check in every day — everyone sees each other’s check-ins and pulls a slipping teammate back. No fake check-ins, no streaks wiped behind your back." },
  { slug:"prova",       name:"Prova",              cat:"PMDD tracking",url:"https://apps.apple.com/us/app/id6791062783?pt=127481835&ct=playriot&mt=8",
    prob:"Turns your PMDD symptoms into clinician-ready proof.",
    desc:"Prova is a PMDD and cycle tracker that turns daily symptoms into proof. Rate mood, physical, and behavioral symptoms in about ten seconds, watch the luteal-phase pattern build across your cycle, and export a clinician-ready report for your doctor. Private and on-device — the record that changes the “it’s just stress” conversation." },
  { slug:"verbria",     name:"Verbria",            cat:"Vocabulary",  url:"https://apps.apple.com/us/app/id6776531183?pt=127481835&ct=playriot&mt=8",
    prob:"A vocabulary builder that scores how you say the word.",
    desc:"Verbria is the vocabulary app that makes you say each word out loud — and scores your pronunciation privately, on-device. Learn a beautiful word every day with real definitions and etymology, then lock it in with a quick quiz. Cicero, your witty word companion, keeps it from feeling like homework." },
  { slug:"rigly",       name:"Rigly",              cat:"RV upkeep",   url:"https://apps.apple.com/us/app/id6773945621?pt=127481835&ct=playriot&mt=8",
    prob:"The maintenance field journal for your RV.",
    desc:"Rigly is a curated maintenance schedule for Class A, B, and C motorhomes, travel trailers, 5th wheels, and truck campers — chassis and house systems in one offline app. Service intervals are hand-sourced from owner’s manuals and community consensus, not AI-generated. Trip Mode adds a pre-trip checklist and post-trip log so nothing gets forgotten in the driveway." },
  { slug:"weldset",     name:"WeldSet",            cat:"Trades",      url:"https://apps.apple.com/us/app/id6781484700?pt=127481835&ct=playriot&mt=8",
    prob:"Starting weld settings for any process and metal.",
    desc:"Pick your process — MIG, TIG, Stick, or Flux-core — your material, and your thickness, and WeldSet reads out a trustworthy starting point on a clean dial: amperage, wire-feed speed, voltage, gas, and polarity. It covers mild steel, stainless, aluminum, and chrome-moly. Get in the ballpark fast, then tune to your machine." },
  { slug:"lumiray",     name:"Lumiray",            cat:"Game",        url:"https://apps.apple.com/us/app/id6785299146?pt=127481835&ct=playriot&mt=8",
    prob:"A calm, glowing one-touch deep-sea dive.",
    desc:"Glide through a glowing deep-sea world as Mira, a bioluminescent manta — hold to rise, release to sink, and weave through the dark to light up the water around you. One touch is the whole game, and the deeper you fall, the brighter you glow. No timers, no pressure — just you, the current, and the light." },
  { slug:"ember",       name:"Ember",              cat:"Quit drinking",url:"https://apps.apple.com/us/app/id6790585544?pt=127481835&ct=playriot&mt=8",
    prob:"A companion for the 2am craving — not another day counter.",
    desc:"Your sober time is a single flame you tend. It breathes while you’re lit, dims to a coal when a craving hits, and relights the moment you get through it. Tap “I’m having an urge” any hour of the night and Ember sits with you — a short, grounded conversation plus one coping tool that fits the moment." },
  { slug:"northpup",    name:"Northpup",           cat:"New puppy",   url:"https://apps.apple.com/us/app/id6792331705?pt=127481835&ct=playriot&mt=8",
    prob:"The one right thing to do with your puppy today.",
    desc:"Bringing home a puppy is joyful and overwhelming at once. Northpup maps the whole first year — a daily plan keyed to your pup’s breed, size, and exact age, plus a potty and vaccine schedule that never slips. One tap logs every trip outside, and growth charts show they’re coming along on track." },
  { slug:"emerit",      name:"Emerit",             cat:"VA benefits", url:"https://apps.apple.com/us/app/id6795649491?pt=127481835&ct=playriot&mt=8",
    prob:"The VA pay you’re already owed and never knew to ask for.",
    desc:"Special Monthly Compensation is a separate pay system that sits on top of your combined rating, and most veterans have never heard of it. Emerit asks plain questions about your day, then shows which levels you look eligible for and what each one pays at the current rate. It works back pay out month by month if your effective date should have been earlier, and flags which of your ratings can no longer be cut — every answer tied to the federal rule it came from." },
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
