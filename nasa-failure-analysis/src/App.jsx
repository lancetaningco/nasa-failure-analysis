import { useState, useMemo } from "react";

/* ── STYLES ─────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;600;700;800&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg:        #080810;
  --surface:   #0d1525;
  --surface2:  #131c30;
  --surface3:  #1a2540;
  --border:    #1f2e48;
  --border2:   #2a3e5e;
  --amber:     #f5a623;
  --amber-dim: rgba(245,166,35,0.10);
  --amber-mid: rgba(245,166,35,0.22);
  --red:       #e63946;
  --red-dim:   rgba(230,57,70,0.12);
  --blue:      #4a9eff;
  --blue-dim:  rgba(74,158,255,0.12);
  --green:     #2ecc71;
  --green-dim: rgba(46,204,113,0.12);
  --steel:     #8899aa;
  --text:      #ccd6e0;
  --text-dim:  #556677;
  --text-bright:#eef2f6;
  --display:   'Oxanium', sans-serif;
  --body:      'Inter', sans-serif;
  --mono:      'JetBrains Mono', monospace;
}
html, body { background: var(--bg); color: var(--text); font-family: var(--body); min-height: 100vh; }

.hdr {
  display: flex; align-items: center; gap: 18px;
  padding: 0 32px; height: 56px;
  border-bottom: 1px solid var(--border);
  background: rgba(8,8,16,0.96);
  backdrop-filter: blur(10px);
  position: sticky; top: 0; z-index: 200;
}
.hdr-worm { font-family: var(--display); font-size: 18px; font-weight: 800; letter-spacing: 4px; color: var(--text-bright); }
.hdr-worm span { color: var(--amber); }
.hdr-divider { width: 1px; height: 24px; background: var(--border2); }
.hdr-label { font-family: var(--mono); font-size: 10px; color: var(--text-dim); letter-spacing: 2px; }
.hdr-stat { margin-left: auto; font-family: var(--mono); font-size: 10px; color: var(--text-dim); letter-spacing: 1px; display: flex; align-items: center; gap: 16px; }
.live-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--amber); animation: blink 2.4s ease-in-out infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }

.hero {
  padding: 48px 32px 0;
  background: radial-gradient(ellipse 70% 60% at 50% -10%, rgba(74,158,255,0.07) 0%, transparent 70%);
}
.hero-eyebrow { font-family: var(--mono); font-size: 10px; letter-spacing: 3px; color: var(--text-dim); margin-bottom: 12px; }
.hero-h1 { font-family: var(--display); font-weight: 800; font-size: clamp(32px,4.5vw,60px); line-height: 1; letter-spacing: -0.5px; color: var(--text-bright); text-transform: uppercase; margin-bottom: 12px; }
.hero-h1 em { color: var(--amber); font-style: normal; }
.hero-sub { font-size: 14px; color: var(--steel); font-weight: 300; max-width: 580px; line-height: 1.7; }

.filters { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; padding: 24px 32px 20px; }
.filter-group { display: flex; gap: 6px; flex-wrap: wrap; }
.filter-label { font-family: var(--mono); font-size: 9px; letter-spacing: 2px; color: var(--text-dim); text-transform: uppercase; align-self: center; margin-right: 4px; }
.chip { font-family: var(--mono); font-size: 10px; letter-spacing: 1px; padding: 5px 12px; border-radius: 3px; border: 1px solid var(--border2); background: var(--surface); color: var(--steel); cursor: pointer; transition: all .18s; text-transform: uppercase; white-space: nowrap; }
.chip:hover { border-color: var(--amber); color: var(--text); }
.chip.active { border-color: var(--amber); background: var(--amber-dim); color: var(--amber); }
.chip.fatal.active  { border-color: var(--red);   background: var(--red-dim);   color: var(--red); }
.chip.partial.active{ border-color: var(--blue);  background: var(--blue-dim);  color: var(--blue); }
.chip.success.active{ border-color: var(--green); background: var(--green-dim); color: var(--green); }
.search-wrap { margin-left: auto; position: relative; }
.search-input { background: var(--surface); border: 1px solid var(--border2); border-radius: 3px; padding: 6px 12px 6px 32px; font-family: var(--mono); font-size: 11px; color: var(--text); width: 220px; outline: none; transition: border-color .18s; }
.search-input:focus { border-color: var(--amber); }
.search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--text-dim); font-size: 12px; pointer-events: none; }

.layout { display: grid; grid-template-columns: 1fr 380px; gap: 0; min-height: calc(100vh - 56px); }
@media(max-width:1024px){ .layout{ grid-template-columns: 1fr; } .sidebar{ display:none; } }

.tabs { display: flex; gap: 0; border-bottom: 1px solid var(--border); padding: 0 32px; }
.tab { font-family: var(--display); font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim); padding: 12px 20px; cursor: pointer; border: none; background: none; border-bottom: 2px solid transparent; transition: all .15s; white-space: nowrap; }
.tab:hover { color: var(--text); }
.tab.active { color: var(--amber); border-bottom-color: var(--amber); }

/* TIMELINE */
.timeline-wrap { padding: 32px; overflow-x: auto; }
.tl-programs { display: flex; flex-direction: column; gap: 28px; }
.tl-program-row { display: flex; align-items: center; gap: 0; }
.tl-program-label { width: 110px; flex-shrink: 0; font-family: var(--mono); font-size: 9px; letter-spacing: 2px; color: var(--text-dim); text-transform: uppercase; text-align: right; padding-right: 16px; }
.tl-track { flex: 1; position: relative; height: 32px; border-left: 1px solid var(--border2); }
.tl-axis { position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--border); }
.tl-dot { position: absolute; transform: translate(-50%, -50%); top: 50%; border-radius: 50%; cursor: pointer; transition: transform .15s, box-shadow .15s; border: 1.5px solid transparent; }
.tl-dot:hover { transform: translate(-50%, -50%) scale(1.5); z-index: 10; }
.tl-dot.selected { transform: translate(-50%, -50%) scale(1.6); z-index: 10; }
.tl-dot.fatal   { background: var(--red);   border-color: rgba(230,57,70,.5);   box-shadow: 0 0 8px rgba(230,57,70,.5); }
.tl-dot.partial { background: var(--amber); border-color: rgba(245,166,35,.5);  box-shadow: 0 0 8px rgba(245,166,35,.4); }
.tl-dot.success { background: var(--green); border-color: rgba(46,204,113,.5);  box-shadow: 0 0 6px rgba(46,204,113,.3); }
.tl-dot.selected.fatal   { box-shadow: 0 0 16px rgba(230,57,70,.8); }
.tl-dot.selected.partial { box-shadow: 0 0 16px rgba(245,166,35,.8); }
.tl-dot.selected.success { box-shadow: 0 0 16px rgba(46,204,113,.6); }
.tl-legend { display: flex; gap: 20px; padding: 16px 32px 0; flex-wrap: wrap; }
.tl-legend-item { display: flex; align-items: center; gap: 7px; font-family: var(--mono); font-size: 9px; color: var(--text-dim); letter-spacing: 1px; text-transform: uppercase; }
.tl-legend-dot { width: 8px; height: 8px; border-radius: 50%; }

/* DATABASE */
.db-wrap { padding: 24px 32px; }
.db-count { font-family: var(--mono); font-size: 10px; color: var(--text-dim); letter-spacing: 1px; margin-bottom: 16px; }
.incident-list { display: flex; flex-direction: column; gap: 8px; }
.inc-row { display: grid; grid-template-columns: 90px 1fr 110px 90px 90px; gap: 12px; align-items: center; padding: 14px 16px; border-radius: 4px; border: 1px solid var(--border); background: var(--surface); cursor: pointer; transition: border-color .15s, background .15s; }
.inc-row:hover { border-color: var(--border2); background: var(--surface2); }
.inc-row.selected { border-color: var(--amber); background: var(--amber-dim); }
.inc-date { font-family: var(--mono); font-size: 10px; color: var(--text-dim); }
.inc-name { font-family: var(--display); font-size: 14px; font-weight: 600; color: var(--text-bright); }
.inc-mission { font-family: var(--mono); font-size: 9px; color: var(--text-dim); margin-top: 2px; }
.inc-program { font-family: var(--mono); font-size: 9px; letter-spacing: 1px; color: var(--steel); }
.inc-outcome { font-family: var(--mono); font-size: 9px; letter-spacing: 1px; padding: 3px 8px; border-radius: 2px; text-align: center; text-transform: uppercase; }
.out-fatal   { background: var(--red-dim);   color: var(--red);   border: 1px solid rgba(230,57,70,.25); }
.out-partial { background: var(--amber-dim); color: var(--amber); border: 1px solid rgba(245,166,35,.25); }
.out-success { background: var(--green-dim); color: var(--green); border: 1px solid rgba(46,204,113,.2); }

/* PATTERNS */
.patterns-wrap { padding: 24px 32px; display: flex; flex-direction: column; gap: 24px; }
.section-head { font-family: var(--mono); font-size: 9px; letter-spacing: 3px; color: var(--text-dim); text-transform: uppercase; margin-bottom: 14px; display: flex; align-items: center; gap: 10px; }
.section-head::after { content:''; flex:1; height:1px; background:var(--border); }
.pattern-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
.pat-card { border: 1px solid var(--border); border-radius: 4px; background: var(--surface); padding: 18px 20px; }
.pat-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
.pat-card-title { font-family: var(--display); font-size: 14px; font-weight: 700; color: var(--text-bright); line-height: 1.2; }
.pat-count { font-family: var(--mono); font-size: 20px; font-weight: 500; color: var(--amber); }
.pat-count-label { font-family: var(--mono); font-size: 8px; color: var(--text-dim); letter-spacing: 1px; margin-top: 2px; text-align: right; }
.pat-desc { font-size: 12px; color: var(--text-dim); line-height: 1.6; margin-bottom: 10px; }
.pat-incidents { display: flex; flex-wrap: wrap; gap: 4px; }
.pat-tag { font-family: var(--mono); font-size: 8px; letter-spacing: .5px; padding: 2px 6px; border-radius: 2px; background: var(--surface2); border: 1px solid var(--border2); color: var(--steel); }
.bar-chart { display: flex; flex-direction: column; gap: 10px; }
.bar-row { display: flex; align-items: center; gap: 12px; }
.bar-label { font-family: var(--mono); font-size: 10px; color: var(--text-dim); width: 180px; text-align: right; flex-shrink: 0; letter-spacing: .5px; }
.bar-track { flex: 1; height: 18px; background: var(--surface2); border-radius: 2px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 2px; transition: width .6s ease; }
.bar-fill.fatal   { background: linear-gradient(90deg, var(--red), rgba(230,57,70,.6)); }
.bar-fill.partial { background: linear-gradient(90deg, var(--amber), rgba(245,166,35,.6)); }
.bar-fill.mixed   { background: linear-gradient(90deg, var(--blue), rgba(74,158,255,.6)); }
.bar-n { font-family: var(--mono); font-size: 10px; color: var(--text-dim); width: 28px; flex-shrink: 0; }

/* FAULT TREE */
.ft-wrap { padding: 24px 32px; }
.ft-selector { display: flex; gap: 10px; margin-bottom: 28px; flex-wrap: wrap; }
.ft-btn { font-family: var(--display); font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 8px 18px; border-radius: 3px; border: 1px solid var(--border2); background: var(--surface); color: var(--steel); cursor: pointer; transition: all .18s; }
.ft-btn:hover { border-color: var(--amber); color: var(--text); }
.ft-btn.active { border-color: var(--amber); background: var(--amber-dim); color: var(--amber); }
.ft-intro { font-family: var(--mono); font-size: 10px; color: var(--text-dim); letter-spacing: 1px; margin-bottom: 20px; line-height: 1.7; max-width: 700px; border-left: 2px solid var(--border2); padding-left: 14px; }
.ft-legend { display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
.ft-legend-item { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 9px; color: var(--text-dim); letter-spacing: 1px; text-transform: uppercase; }
.ft-svg-wrap { overflow-x: auto; background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 16px; }
.ft-metrics { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-top: 24px; }
.ft-metric { background: var(--surface); border: 1px solid var(--border); border-radius: 4px; padding: 16px 20px; }
.ft-metric-val { font-family: var(--mono); font-size: 22px; color: var(--amber); font-weight: 500; }
.ft-metric-label { font-family: var(--mono); font-size: 9px; color: var(--text-dim); letter-spacing: 1px; text-transform: uppercase; margin-top: 4px; }
.ft-metric-desc { font-size: 11px; color: var(--text-dim); margin-top: 6px; line-height: 1.5; }

/* SIDEBAR */
.sidebar { border-left: 1px solid var(--border); background: var(--surface); position: sticky; top: 56px; height: calc(100vh - 56px); overflow-y: auto; }
.sidebar-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 12px; font-family: var(--mono); font-size: 10px; color: var(--text-dim); letter-spacing: 1px; text-align: center; padding: 32px; }
.sidebar-empty-icon { font-size: 36px; opacity: .3; }
.detail { padding: 24px; }
.detail-outcome { font-family: var(--mono); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; display: inline-block; margin-bottom: 16px; }
.detail-name { font-family: var(--display); font-size: 26px; font-weight: 800; color: var(--text-bright); text-transform: uppercase; letter-spacing: .5px; line-height: 1; margin-bottom: 4px; }
.detail-mission { font-family: var(--mono); font-size: 10px; color: var(--text-dim); letter-spacing: 1px; margin-bottom: 20px; }
.detail-stats { display: flex; flex-direction: column; gap: 0; margin-bottom: 20px; border: 1px solid var(--border); border-radius: 4px; overflow: hidden; }
.detail-stat { display: flex; justify-content: space-between; align-items: baseline; padding: 9px 14px; border-bottom: 1px solid var(--border); gap: 8px; }
.detail-stat:last-child { border-bottom: none; }
.detail-stat-k { font-family: var(--mono); font-size: 9px; color: var(--text-dim); letter-spacing: 1px; text-transform: uppercase; flex-shrink: 0; }
.detail-stat-v { font-family: var(--mono); font-size: 11px; color: var(--text); text-align: right; }
.detail-section-label { font-family: var(--mono); font-size: 9px; letter-spacing: 2px; color: var(--text-dim); text-transform: uppercase; margin-bottom: 8px; margin-top: 18px; }
.detail-desc { font-size: 13px; color: var(--text); line-height: 1.65; }
.detail-causes { display: flex; flex-direction: column; gap: 6px; }
.detail-cause { display: flex; align-items: flex-start; gap: 10px; }
.cause-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
.cause-text { font-size: 12px; color: var(--text-dim); line-height: 1.5; }
.detail-patterns { display: flex; flex-wrap: wrap; gap: 5px; }
.detail-pat-tag { font-family: var(--mono); font-size: 9px; padding: 3px 8px; border-radius: 2px; border: 1px solid var(--border2); color: var(--amber); background: var(--amber-dim); letter-spacing: .5px; }
.detail-lesson { font-size: 12px; color: var(--text-dim); line-height: 1.6; font-style: italic; border-left: 2px solid var(--amber); padding-left: 12px; margin-top: 8px; }
.sidebar::-webkit-scrollbar { width: 4px; }
.sidebar::-webkit-scrollbar-track { background: var(--surface); }
.sidebar::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
`;

/* ── INCIDENT DATA ───────────────────────────────────────── */
const INCIDENTS = [
  { id:1, name:"Apollo 1", mission:"AS-204", program:"Apollo", year:1967, date:"Jan 27, 1967", phase:"Ground Test", outcome:"fatal", crew:3, crewLost:3, type:"Fire / Atmosphere", shortDesc:"Cabin fire during a plugs-out launch rehearsal at Pad 34 killed all three crew members. The hatch could not be opened against the pressurized pure-oxygen atmosphere.", causes:["Pure-oxygen cabin atmosphere at higher-than-sea-level pressure","Flammable materials used extensively in cabin","Inward-opening hatch could not be opened under pressure","Known wiring deficiencies not resolved before test","Schedule pressure from Space Race timeline"], patterns:["Normalization of Deviance","Schedule Pressure","Inadequate Abort/Escape","Known Hazard Unmitigated"], lesson:"Led to complete redesign of Apollo command module, replacement of pure-O₂ atmosphere with mixed O₂/N₂, and outward-opening hatch." },
  { id:2, name:"Apollo 13", mission:"AS-508", program:"Apollo", year:1970, date:"Apr 13, 1970", phase:"Translunar", outcome:"partial", crew:3, crewLost:0, type:"Oxygen Tank Rupture", shortDesc:"Oxygen tank 2 in the service module exploded 56 hours into flight, crippling power and life support. Crew returned safely using the lunar module as a lifeboat.", causes:["Damaged thermostat in O₂ tank from prior ground test","Tank fans activated, sparking insulation fire","Spacecraft design lacked redundancy for combined O₂/power failure","Ground engineers improvised CO₂ scrubber adaptation in real time"], patterns:["Design Redundancy Gap","Latent Manufacturing Defect"], lesson:"Celebrated as NASA's finest hour in crisis management. Drove extensive redesign of SM oxygen tanks and emergency procedures." },
  { id:3, name:"Challenger", mission:"STS-51-L", program:"Space Shuttle", year:1986, date:"Jan 28, 1986", phase:"Ascent", outcome:"fatal", crew:7, crewLost:7, type:"O-Ring Failure", shortDesc:"O-ring seal in the right SRB failed in cold temperatures, allowing hot combustion gases to breach the external tank. Vehicle broke apart 73 seconds after launch.", causes:["O-ring designed outside its temperature tolerance","Thiokol engineers' warnings overridden by management","Erosion on O-rings observed on prior flights, accepted as normal","No crew escape system during solid rocket burn phase"], patterns:["Normalization of Deviance","Suppression of Dissent","Schedule Pressure","Inadequate Abort/Escape","Management Override of Engineering"], lesson:"Rogers Commission report became foundational text on organizational safety culture. Program stood down 32 months; SRB joints fully redesigned." },
  { id:4, name:"Mars Observer", mission:"Mars Observer", program:"Mars Exploration", year:1993, date:"Aug 21, 1993", phase:"Mars Orbit Insertion", outcome:"partial", crew:0, crewLost:0, type:"Propulsion Failure", shortDesc:"$980M spacecraft lost contact three days before Mars orbit insertion. Likely cause: rupture of fuel pressurization line contaminated propellant system.", causes:["Fuel and oxidizer may have mixed in pressurization line","Heritage propulsion system not qualified for long cruise phase","Inability to isolate root cause due to loss of contact"], patterns:["Design Qualification Gap","Heritage Component Misapplication"], lesson:"Led to adoption of faster, better, cheaper smaller-mission philosophy — which itself contributed to subsequent failures." },
  { id:5, name:"Mars Climate Orbiter", mission:"MCO", program:"Mars Exploration", year:1999, date:"Sep 23, 1999", phase:"Mars Orbit Insertion", outcome:"partial", crew:0, crewLost:0, type:"Software / Units Error", shortDesc:"Spacecraft entered Martian atmosphere at too low an altitude and was destroyed. Root cause: one team used imperial units, another used metric — a mismatch never caught in integration testing.", causes:["Lockheed Martin used US customary units for thruster force","NASA JPL navigation software expected metric SI units","Interface control document ambiguity undetected","Insufficient end-to-end navigation testing before Mars approach"], patterns:["Interface Control Failure","Integration Testing Gap","Units/Standards Mismatch"], lesson:"Textbook systems engineering case study. NASA now mandates SI units across all programs." },
  { id:6, name:"Mars Polar Lander", mission:"MPL", program:"Mars Exploration", year:1999, date:"Dec 3, 1999", phase:"Entry/Descent/Landing", outcome:"partial", crew:0, crewLost:0, type:"Software Logic Error", shortDesc:"Contact lost during EDL. Most likely cause: spurious signals from landing leg deployment sensors triggered premature engine shutdown ~40m above the Martian surface.", causes:["Leg deployment generated false touchdown signal","Software failed to filter sensor noise during leg extension","Failure mode identified in testing but not reported to project","Reduced testing budgets under faster, better, cheaper mandate"], patterns:["Normalization of Deviance","Known Hazard Unmitigated","Integration Testing Gap"], lesson:"Back-to-back Mars losses in 1999 ended the faster, better, cheaper paradigm. NASA returned to more thorough V&V processes." },
  { id:7, name:"Columbia", mission:"STS-107", program:"Space Shuttle", year:2003, date:"Feb 1, 2003", phase:"Re-entry", outcome:"fatal", crew:7, crewLost:7, type:"TPS Breach", shortDesc:"Foam debris shed from the External Tank during launch struck and breached the Thermal Protection System on the left wing leading edge. Superheated plasma entered the wing during re-entry.", causes:["Foam shedding normalized across prior flights","Post-launch requests for wing damage imagery denied","No on-orbit repair capability existed","CAIB found same cultural failures as Challenger 17 years later"], patterns:["Normalization of Deviance","Suppression of Dissent","Schedule Pressure","Inadequate Abort/Escape","Management Override of Engineering"], lesson:"CAIB noted organizational failures were as much a cause as the foam. NASA implemented 15 of 29 recommendations including on-orbit inspection capability." },
  { id:8, name:"Genesis Sample Return", mission:"Genesis", program:"Discovery", year:2004, date:"Sep 8, 2004", phase:"Re-entry / Recovery", outcome:"partial", crew:0, crewLost:0, type:"Design Error", shortDesc:"Sample return capsule's drogue parachute failed to deploy; capsule impacted Utah desert at ~311 km/h. Root cause: gravity switch installed backwards.", causes:["Deceleration sensor installed with incorrect polarity","Part drawing did not clearly indicate correct orientation","Peer review process did not catch installation error","No backup deployment trigger"], patterns:["Design Documentation Gap","Integration Testing Gap","Known Hazard Unmitigated"], lesson:"Solar samples partially recovered. Led to improved inspection procedures for safety-critical installations." },
  { id:9, name:"DART", mission:"DART", program:"Planetary Defense", year:2022, date:"Sep 26, 2022", phase:"Impact", outcome:"success", crew:0, crewLost:0, type:"Intentional Impact", shortDesc:"First planetary defense test: spacecraft intentionally impacted asteroid Dimorphos at ~6.1 km/s, successfully altering its orbital period by 33 minutes.", causes:[], patterns:[], lesson:"Demonstrated kinetic impactor planetary defense is viable. HERA mission (ESA) will study the impact site further in 2026." },
];

/* ── FAULT TREE DATA ─────────────────────────────────────── */
const FAULT_TREES = {
  challenger: {
    name: "Challenger",
    color: "#e63946",
    rrp: "1.4×10⁻³",
    severity: "Catastrophic (Level I)",
    mitigationStatus: "Post-accident — SRB joint redesigned",
    intro: "Fault Tree Analysis (FTA) is a top-down deductive technique used in reliability engineering to identify combinations of faults that lead to a top-level failure event. AND gates require all inputs to occur simultaneously; OR gates require any one input. This tree traces the Challenger loss to its technical and organizational root causes.",
    metrics: [
      { val: "1/714", label: "Mission Risk (pre-accident estimate)", desc: "NASA's internal estimate of Shuttle loss-of-vehicle probability at the time" },
      { val: "73s", label: "Time to Failure", desc: "O-ring breach occurred at ignition; structural failure at T+73 seconds" },
      { val: "−11°C", label: "Launch Temperature", desc: "Well outside O-ring qualification range of 11.7°C–23.9°C" },
      { val: "0", label: "Escape Options", desc: "No crew escape system was operable during solid rocket burn phase" },
    ],
    // SVG tree nodes: {id, label, sublabel, type:'event'|'gate', gate:'AND'|'OR', x, y, parents:[]}
    nodes: [
      { id:"top",    label:"LOSS OF VEHICLE", sublabel:"STS-51-L Breakup", type:"event", severity:"top", x:400, y:30 },
      { id:"g1",     label:"AND", type:"gate", gate:"AND", x:400, y:110 },
      { id:"breach", label:"Hot Gas Breach", sublabel:"SRB joint failure", type:"event", severity:"critical", x:220, y:190 },
      { id:"struct", label:"Structural Failure", sublabel:"ET rupture → breakup", type:"event", severity:"critical", x:580, y:190 },
      { id:"g2",     label:"AND", type:"gate", gate:"AND", x:220, y:270 },
      { id:"oring",  label:"O-Ring Failure", sublabel:"Primary seal fails to seat", type:"event", severity:"critical", x:100, y:350 },
      { id:"g3",     label:"OR", type:"gate", gate:"OR", x:340, y:270 },
      { id:"cold",   label:"Low Temperature", sublabel:"−11°C launch day", type:"event", severity:"basic", x:200, y:430 },
      { id:"putty",  label:"Zinc Chromate Putty", sublabel:"Blown into seal gap", type:"event", severity:"basic", x:340, y:430 },
      { id:"design", label:"Joint Design", sublabel:"O-ring rotation under pressure", type:"event", severity:"basic", x:480, y:350 },
      { id:"org",    label:"OR", type:"gate", gate:"OR", x:580, y:270 },
      { id:"mgmt",   label:"Mgmt Override", sublabel:"Thiokol engineers overruled", type:"event", severity:"org", x:480, y:430 },
      { id:"norm",   label:"Normalized Risk", sublabel:"Prior erosion accepted", type:"event", severity:"org", x:620, y:430 },
      { id:"sched",  label:"Schedule Pressure", sublabel:"Launch delay pressure", type:"event", severity:"org", x:760, y:350 },
    ],
    edges: [
      ["top","g1"],["g1","breach"],["g1","struct"],
      ["breach","g2"],["g2","oring"],["g2","g3"],
      ["g3","cold"],["g3","putty"],["g3","design"],
      ["struct","org"],["org","mgmt"],["org","norm"],["org","sched"],
    ],
  },
  columbia: {
    name: "Columbia",
    color: "#f5a623",
    rrp: "1.2×10⁻²",
    severity: "Catastrophic (Level I)",
    mitigationStatus: "Post-accident — on-orbit inspection added, foam redesigned",
    intro: "Columbia's fault tree illustrates how a physical failure (foam strike) combined with organizational failures (denied imaging requests, normalized foam shedding) to produce a catastrophic outcome. The AND gate at the top shows both technical AND organizational failures were required — fixing either branch could have saved the crew.",
    metrics: [
      { val: "1/68", label: "Post-Challenger Risk Estimate", desc: "Revised Shuttle loss probability after Challenger improvements — still high" },
      { val: "~800m/s", label: "Impact Velocity", desc: "Relative velocity of foam strike against leading edge RCC panel" },
      { val: "16 days", label: "Time Crew Could Have Survived", desc: "Duration between damage and re-entry — window for rescue or repair" },
      { val: "0", label: "On-orbit Repair Options", desc: "No TPS repair materials or procedures existed at time of mission" },
    ],
    nodes: [
      { id:"top",    label:"LOSS OF VEHICLE", sublabel:"STS-107 Re-entry Breakup", type:"event", severity:"top", x:400, y:30 },
      { id:"g1",     label:"AND", type:"gate", gate:"AND", x:400, y:110 },
      { id:"tps",    label:"TPS Failure", sublabel:"Plasma ingestion left wing", type:"event", severity:"critical", x:220, y:190 },
      { id:"nofix",  label:"No Repair / Rescue", sublabel:"Crew had no options", type:"event", severity:"critical", x:580, y:190 },
      { id:"g2",     label:"AND", type:"gate", gate:"AND", x:220, y:270 },
      { id:"foam",   label:"Foam Strike", sublabel:"ET bipod ramp foam debris", type:"event", severity:"critical", x:100, y:350 },
      { id:"rcc",    label:"RCC Panel Breach", sublabel:"Leading edge compromised", type:"event", severity:"basic", x:240, y:430 },
      { id:"g3",     label:"OR", type:"gate", gate:"OR", x:580, y:270 },
      { id:"denied", label:"Imagery Denied", sublabel:"Requests not escalated", type:"event", severity:"org", x:460, y:350 },
      { id:"norepair",label:"No Repair Capability", sublabel:"Not developed pre-flight", type:"event", severity:"basic", x:620, y:430 },
      { id:"g4",     label:"OR", type:"gate", gate:"OR", x:220, y:510 },
      { id:"norm",   label:"Normalized Foam", sublabel:"Prior strikes accepted", type:"event", severity:"org", x:100, y:590 },
      { id:"design2",label:"Foam Attachment", sublabel:"Design deficiency", type:"event", severity:"basic", x:260, y:590 },
      { id:"culture",label:"Safety Culture", sublabel:"Dissent not heard", type:"event", severity:"org", x:760, y:350 },
    ],
    edges: [
      ["top","g1"],["g1","tps"],["g1","nofix"],
      ["tps","g2"],["g2","foam"],["g2","rcc"],
      ["foam","g4"],["g4","norm"],["g4","design2"],
      ["nofix","g3"],["g3","denied"],["g3","norepair"],["g3","culture"],
    ],
  },
  mco: {
    name: "Mars Climate Orbiter",
    color: "#4a9eff",
    rrp: "N/A",
    severity: "Mission Loss (unmanned)",
    mitigationStatus: "Post-accident — SI units mandated across all NASA programs",
    intro: "The MCO loss is a classic systems engineering failure: a units mismatch at a software interface boundary that was never caught by integration testing. The fault tree reveals how interface control failures combine with V&V gaps to produce mission loss — a pattern highly relevant to Test Engineer roles.",
    metrics: [
      { val: "4.45×", label: "Force Unit Mismatch", desc: "1 pound-force = 4.45 newtons — thruster commands off by this factor throughout cruise" },
      { val: "$327M", label: "Mission Cost Lost", desc: "Total mission cost including spacecraft and launch" },
      { val: "0", label: "ICD Reviews Caught Error", desc: "Interface control document reviews did not surface the unit discrepancy" },
      { val: "9 mo", label: "Duration of Navigation Error", desc: "Trajectory was drifting for the entire cruise phase without detection" },
    ],
    nodes: [
      { id:"top",    label:"MISSION LOSS", sublabel:"MCO atmospheric entry", type:"event", severity:"top", x:400, y:30 },
      { id:"g1",     label:"AND", type:"gate", gate:"AND", x:400, y:110 },
      { id:"traj",   label:"Wrong Trajectory", sublabel:"Entry angle too steep", type:"event", severity:"critical", x:220, y:190 },
      { id:"undetected", label:"Error Undetected", sublabel:"9 months of cruise", type:"event", severity:"critical", x:580, y:190 },
      { id:"g2",     label:"AND", type:"gate", gate:"AND", x:220, y:270 },
      { id:"units",  label:"Units Mismatch", sublabel:"lbf vs N at interface", type:"event", severity:"critical", x:100, y:350 },
      { id:"nav",    label:"Nav Error Accumulation", sublabel:"Wrong thruster data integrated", type:"event", severity:"basic", x:280, y:430 },
      { id:"g3",     label:"OR", type:"gate", gate:"OR", x:100, y:430 },
      { id:"icd",    label:"ICD Ambiguity", sublabel:"Units not specified in interface doc", type:"event", severity:"basic", x:0, y:510 },
      { id:"review", label:"No ICD Enforcement", sublabel:"Units review not required", type:"event", severity:"org", x:160, y:510 },
      { id:"g4",     label:"AND", type:"gate", gate:"AND", x:580, y:270 },
      { id:"notest", label:"No End-to-End Nav Test", sublabel:"Full-chain test not performed", type:"event", severity:"basic", x:460, y:350 },
      { id:"nocheck",label:"No Unit Validation", sublabel:"Telemetry values not sanity-checked", type:"event", severity:"basic", x:640, y:430 },
      { id:"budget", label:"Cost / Schedule Pressure", sublabel:"Faster better cheaper era", type:"event", severity:"org", x:760, y:350 },
    ],
    edges: [
      ["top","g1"],["g1","traj"],["g1","undetected"],
      ["traj","g2"],["g2","units"],["g2","nav"],
      ["units","g3"],["g3","icd"],["g3","review"],
      ["undetected","g4"],["g4","notest"],["g4","nocheck"],["g4","budget"],
    ],
  },
};

const PROGRAMS = ["All Programs","Apollo","Space Shuttle","Mars Exploration","Discovery","Planetary Defense"];
const OUTCOMES = ["All Outcomes","fatal","partial","success"];
const TL_YEAR_START = 1965, TL_YEAR_END = 2023, TL_SPAN = TL_YEAR_END - TL_YEAR_START;
const programMap = (p) => p === "Apollo" ? "Apollo" : p === "Space Shuttle" ? "Space Shuttle" : p === "Mars Exploration" ? "Mars Exploration" : "Other Programs";
const programGroups = ["Apollo","Space Shuttle","Mars Exploration","Other Programs"];
const outcomeClass = (o) => o === "fatal" ? "out-fatal" : o === "partial" ? "out-partial" : "out-success";

/* ── FAULT TREE SVG ──────────────────────────────────────── */
function FaultTreeSVG({ tree }) {
  const W = 900, H = 660;
  const nodeColor = (sev) => ({
    top: "#e63946", critical: "#f5a623", basic: "#4a9eff", org: "#9b59b6", default: "#8899aa"
  }[sev] || "#8899aa");

  const getNode = (id) => tree.nodes.find(n => n.id === id);

  return (
    <svg viewBox={`-40 0 ${W} ${H}`} width="100%" style={{minWidth:700, display:"block"}}>
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#2a3e5e" />
        </marker>
      </defs>

      {/* Edges */}
      {tree.edges.map(([from, to], i) => {
        const f = getNode(from), t = getNode(to);
        if (!f || !t) return null;
        const fy = f.type === "gate" ? f.y + 20 : f.y + 36;
        const ty = t.type === "gate" ? t.y : t.y;
        return (
          <line key={i}
            x1={f.x} y1={fy} x2={t.x} y2={ty}
            stroke="#1f2e48" strokeWidth="1.5"
            markerEnd="url(#arr)"
          />
        );
      })}

      {/* Nodes */}
      {tree.nodes.map(node => {
        if (node.type === "gate") {
          const isAnd = node.gate === "AND";
          return (
            <g key={node.id}>
              {isAnd ? (
                <path d={`M${node.x-22},${node.y} L${node.x+22},${node.y} Q${node.x+22},${node.y+40} ${node.x},${node.y+40} Q${node.x-22},${node.y+40} ${node.x-22},${node.y} Z`}
                  fill="#131c30" stroke="#2a3e5e" strokeWidth="1.5" />
              ) : (
                <path d={`M${node.x-22},${node.y} L${node.x+22},${node.y} Q${node.x+16},${node.y+20} ${node.x},${node.y+40} Q${node.x-16},${node.y+20} ${node.x-22},${node.y} Z`}
                  fill="#131c30" stroke="#2a3e5e" strokeWidth="1.5" />
              )}
              <text x={node.x} y={node.y+24} textAnchor="middle" fill="#8899aa" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="500">{node.gate}</text>
            </g>
          );
        }
        const col = nodeColor(node.severity);
        const isTop = node.severity === "top";
        return (
          <g key={node.id}>
            <rect x={node.x - 78} y={node.y} width={156} height={isTop ? 52 : 64} rx="3"
              fill="#0d1525" stroke={col} strokeWidth={isTop ? 2 : 1}
              style={{filter: isTop ? `drop-shadow(0 0 8px ${col}88)` : "none"}}
            />
            <text x={node.x} y={node.y + (isTop ? 20 : 18)} textAnchor="middle"
              fill={col} fontSize={isTop ? 11 : 10} fontFamily="Oxanium, sans-serif" fontWeight="700"
              letterSpacing="0.5">
              {node.label}
            </text>
            {node.sublabel && (
              <text x={node.x} y={node.y + (isTop ? 36 : 32)} textAnchor="middle"
                fill="#556677" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                {node.sublabel}
              </text>
            )}
            {!isTop && node.severity && (
              <text x={node.x} y={node.y + 52} textAnchor="middle"
                fill={col} fontSize="7" fontFamily="JetBrains Mono, monospace"
                opacity="0.7" letterSpacing="1">
                {node.severity.toUpperCase()}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ── PATTERNS DATA ───────────────────────────────────────── */
const PATTERNS_DATA = [
  { title:"Normalization of Deviance", desc:"Known anomalies observed on prior missions were accepted as tolerable rather than investigated as warning signs.", incidents:["Apollo 1","Challenger","Columbia","Mars Polar Lander"], count:4 },
  { title:"Schedule / Cost Pressure", desc:"External or internal pressure to maintain schedule or reduce costs contributed to decisions that bypassed safety margins.", incidents:["Apollo 1","Challenger","Columbia","Mars Observer","Mars Climate Orbiter","Mars Polar Lander"], count:6 },
  { title:"Management Override of Engineering", desc:"Technical experts raised concerns that were dismissed or overridden by managers.", incidents:["Challenger","Columbia"], count:2 },
  { title:"Integration Testing Gap", desc:"Failures that could have been caught by end-to-end system testing were not detected.", incidents:["Mars Climate Orbiter","Mars Polar Lander","Genesis Sample Return"], count:3 },
  { title:"Inadequate Abort / Escape", desc:"No viable abort, escape, or rescue mechanism existed at the point of failure.", incidents:["Apollo 1","Challenger","Columbia"], count:3 },
  { title:"Known Hazard Unmitigated", desc:"The physical failure mode was partially or fully known. Mitigation was incomplete or undermined.", incidents:["Apollo 1","Challenger","Columbia","Mars Polar Lander","Genesis Sample Return"], count:5 },
];

/* ── APP ─────────────────────────────────────────────────── */
export default function App() {
  const [activeTab, setActiveTab]       = useState("Timeline");
  const [selected, setSelected]         = useState(null);
  const [filterProgram, setFilterProgram] = useState("All Programs");
  const [filterOutcome, setFilterOutcome] = useState("All Outcomes");
  const [search, setSearch]             = useState("");
  const [activeFT, setActiveFT]         = useState("challenger");

  const filtered = useMemo(() => INCIDENTS.filter(inc => {
    if (filterProgram !== "All Programs" && inc.program !== filterProgram) return false;
    if (filterOutcome !== "All Outcomes" && inc.outcome !== filterOutcome) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!inc.name.toLowerCase().includes(q) && !inc.mission.toLowerCase().includes(q) &&
          !inc.type.toLowerCase().includes(q) && !inc.program.toLowerCase().includes(q)) return false;
    }
    return true;
  }), [filterProgram, filterOutcome, search]);

  const selectedInc = selected !== null ? INCIDENTS.find(i => i.id === selected) : null;
  const dotSize = (inc) => inc.outcome === "fatal" ? 14 : inc.outcome === "partial" ? 10 : 8;
  const dotPct  = (inc) => ((inc.year - TL_YEAR_START) / TL_SPAN * 100).toFixed(2) + "%";
  const yearMarks = [1967,1970,1975,1980,1986,1990,1995,1999,2003,2010,2022];
  const ft = FAULT_TREES[activeFT];

  return (
    <>
      <style>{CSS}</style>

      <header className="hdr">
        <div className="hdr-worm">N<span>A</span>SA</div>
        <div className="hdr-divider" />
        <div className="hdr-label">Failure Analysis Database</div>
        <div className="hdr-stat">
          <span>{INCIDENTS.length} incidents · {INCIDENTS.filter(i=>i.outcome==="fatal").length} fatal · {INCIDENTS.filter(i=>i.crewLost>0).reduce((a,i)=>a+i.crewLost,0)} lives lost</span>
          <div className="live-dot" />
          <span>1967–2022</span>
        </div>
      </header>

      <section className="hero">
        <div className="hero-eyebrow">// fmea · fta · root cause analysis · pattern recognition</div>
        <h1 className="hero-h1">Failure <em>Archive</em></h1>
        <p className="hero-sub">Structured analysis of NASA spacecraft incidents — mapping technical failures, organizational patterns, and fault trees across five decades of crewed and uncrewed spaceflight.</p>
      </section>

      <div className="filters">
        <span className="filter-label">Program</span>
        <div className="filter-group">
          {PROGRAMS.map(p => (
            <button key={p} className={`chip ${filterProgram===p?"active":""}`} onClick={()=>setFilterProgram(p)}>
              {p === "All Programs" ? "All" : p}
            </button>
          ))}
        </div>
        <span className="filter-label" style={{marginLeft:12}}>Outcome</span>
        <div className="filter-group">
          {OUTCOMES.map(o => (
            <button key={o} className={`chip ${o} ${filterOutcome===o?"active":""}`} onClick={()=>setFilterOutcome(o)}>
              {o === "All Outcomes" ? "All" : o}
            </button>
          ))}
        </div>
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input className="search-input" placeholder="SEARCH INCIDENTS..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
      </div>

      <div className="tabs">
        {["Timeline","Database","Patterns","Fault Trees"].map(t => (
          <button key={t} className={`tab ${activeTab===t?"active":""}`} onClick={()=>setActiveTab(t)}>{t}</button>
        ))}
      </div>

      <div className="layout">
        <div style={{overflowY:"auto"}}>

          {/* TIMELINE */}
          {activeTab === "Timeline" && (
            <div className="timeline-wrap">
              <div className="tl-legend">
                <div className="tl-legend-item"><div className="tl-legend-dot" style={{background:"var(--red)"}} />Fatal</div>
                <div className="tl-legend-item"><div className="tl-legend-dot" style={{background:"var(--amber)"}} />Partial / Loss</div>
                <div className="tl-legend-item"><div className="tl-legend-dot" style={{background:"var(--green)"}} />Success</div>
                <span style={{marginLeft:"auto",fontFamily:"var(--mono)",fontSize:9,color:"var(--text-dim)",letterSpacing:1}}>CLICK DOT FOR DETAIL →</span>
              </div>
              <div className="tl-programs" style={{marginTop:24,minWidth:600}}>
                {programGroups.map(group => {
                  const groupIncs = INCIDENTS.filter(i => programMap(i.program) === group);
                  if (!groupIncs.length) return null;
                  return (
                    <div key={group} className="tl-program-row">
                      <div className="tl-program-label">{group}</div>
                      <div className="tl-track">
                        <div className="tl-axis" />
                        {groupIncs.map(inc => (
                          <div key={inc.id} className={`tl-dot ${inc.outcome} ${selected===inc.id?"selected":""}`}
                            style={{left:dotPct(inc), width:dotSize(inc), height:dotSize(inc), opacity:filtered.some(f=>f.id===inc.id)?1:0.15}}
                            onClick={()=>setSelected(selected===inc.id?null:inc.id)}
                            title={`${inc.name} (${inc.year})`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{display:"flex",paddingLeft:110,marginTop:8,position:"relative",minWidth:600}}>
                {yearMarks.map(y => (
                  <div key={y} style={{position:"absolute",left:`calc(110px + ${((y-TL_YEAR_START)/TL_SPAN*100).toFixed(2)}%)`,transform:"translateX(-50%)",fontFamily:"var(--mono)",fontSize:8,color:"var(--text-dim)"}}>{y}</div>
                ))}
                <div style={{height:16}} />
              </div>
              <div style={{marginTop:40}}>
                <div className="section-head">Chronological Record</div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {filtered.sort((a,b)=>a.year-b.year).map(inc => (
                    <div key={inc.id} style={{display:"flex",gap:16,alignItems:"flex-start",padding:"14px 16px",borderRadius:4,border:`1px solid ${selected===inc.id?"var(--amber)":"var(--border)"}`,background:selected===inc.id?"var(--amber-dim)":"var(--surface)",cursor:"pointer",transition:"all .15s"}}
                      onClick={()=>setSelected(selected===inc.id?null:inc.id)}>
                      <div style={{fontFamily:"var(--mono)",fontSize:10,color:"var(--text-dim)",width:70,flexShrink:0,paddingTop:2}}>{inc.year}</div>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:"var(--display)",fontSize:15,fontWeight:700,color:"var(--text-bright)"}}>{inc.name}</div>
                        <div style={{fontFamily:"var(--mono)",fontSize:9,color:"var(--text-dim)",marginTop:2,letterSpacing:1}}>{inc.mission} · {inc.program} · {inc.phase}</div>
                        <div style={{fontSize:12,color:"var(--text-dim)",marginTop:6,lineHeight:1.5}}>{inc.shortDesc.slice(0,120)}…</div>
                      </div>
                      <span className={`inc-outcome ${outcomeClass(inc.outcome)}`} style={{flexShrink:0}}>{inc.outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DATABASE */}
          {activeTab === "Database" && (
            <div className="db-wrap">
              <div className="db-count">SHOWING {filtered.length} OF {INCIDENTS.length} INCIDENTS</div>
              <div className="incident-list">
                <div className="inc-row" style={{cursor:"default",background:"var(--surface2)",borderColor:"var(--border2)"}}>
                  <span style={{fontFamily:"var(--mono)",fontSize:9,color:"var(--text-dim)",letterSpacing:1}}>DATE</span>
                  <span style={{fontFamily:"var(--mono)",fontSize:9,color:"var(--text-dim)",letterSpacing:1}}>INCIDENT</span>
                  <span style={{fontFamily:"var(--mono)",fontSize:9,color:"var(--text-dim)",letterSpacing:1}}>PROGRAM</span>
                  <span style={{fontFamily:"var(--mono)",fontSize:9,color:"var(--text-dim)",letterSpacing:1}}>FAILURE TYPE</span>
                  <span style={{fontFamily:"var(--mono)",fontSize:9,color:"var(--text-dim)",letterSpacing:1}}>OUTCOME</span>
                </div>
                {filtered.map(inc => (
                  <div key={inc.id} className={`inc-row ${selected===inc.id?"selected":""}`} onClick={()=>setSelected(selected===inc.id?null:inc.id)}>
                    <div className="inc-date">{inc.date.slice(0,8)}</div>
                    <div><div className="inc-name">{inc.name}</div><div className="inc-mission">{inc.mission}</div></div>
                    <div className="inc-program">{inc.program}</div>
                    <div style={{fontFamily:"var(--mono)",fontSize:10,color:"var(--steel)"}}>{inc.type}</div>
                    <span className={`inc-outcome ${outcomeClass(inc.outcome)}`}>{inc.outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PATTERNS */}
          {activeTab === "Patterns" && (
            <div className="patterns-wrap">
              <div>
                <div className="section-head">Recurring Failure Patterns</div>
                <div className="pattern-cards">
                  {PATTERNS_DATA.map((p,i) => (
                    <div key={i} className="pat-card">
                      <div className="pat-card-top">
                        <div className="pat-card-title">{p.title}</div>
                        <div><div className="pat-count">{p.count}</div><div className="pat-count-label">incidents</div></div>
                      </div>
                      <div className="pat-desc">{p.desc}</div>
                      <div className="pat-incidents">{p.incidents.map(n=><span key={n} className="pat-tag">{n}</span>)}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-head">Frequency by Failure Category</div>
                <div className="bar-chart">
                  {[
                    {label:"Schedule / Cost Pressure", n:6, type:"fatal"},
                    {label:"Known Hazard Unmitigated", n:5, type:"partial"},
                    {label:"Normalization of Deviance", n:4, type:"fatal"},
                    {label:"Integration Testing Gap",  n:3, type:"partial"},
                    {label:"Inadequate Abort/Escape",  n:3, type:"fatal"},
                    {label:"Mgmt Override Engineering",n:2, type:"fatal"},
                    {label:"Interface Control Failure", n:1, type:"mixed"},
                  ].map(b => (
                    <div key={b.label} className="bar-row">
                      <div className="bar-label">{b.label}</div>
                      <div className="bar-track"><div className={`bar-fill ${b.type}`} style={{width:`${(b.n/6)*100}%`}} /></div>
                      <div className="bar-n">{b.n}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-head">Outcome Distribution by Program</div>
                <div className="bar-chart">
                  {["Apollo","Space Shuttle","Mars Exploration","Other Programs"].map(pg => {
                    const incs = INCIDENTS.filter(i=>programMap(i.program)===pg);
                    const fatal=incs.filter(i=>i.outcome==="fatal").length;
                    const partial=incs.filter(i=>i.outcome==="partial").length;
                    const success=incs.filter(i=>i.outcome==="success").length;
                    return (
                      <div key={pg} className="bar-row">
                        <div className="bar-label">{pg}</div>
                        <div className="bar-track" style={{display:"flex",gap:2,background:"transparent"}}>
                          {fatal>0&&<div style={{width:`${fatal/incs.length*100}%`,background:"var(--red)",borderRadius:2,opacity:.8}} />}
                          {partial>0&&<div style={{width:`${partial/incs.length*100}%`,background:"var(--amber)",borderRadius:2,opacity:.8}} />}
                          {success>0&&<div style={{width:`${success/incs.length*100}%`,background:"var(--green)",borderRadius:2,opacity:.8}} />}
                        </div>
                        <div className="bar-n" style={{color:"var(--text-dim)",fontSize:9}}>{incs.length}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* FAULT TREES */}
          {activeTab === "Fault Trees" && (
            <div className="ft-wrap">
              <div className="ft-selector">
                {Object.entries(FAULT_TREES).map(([key, tree]) => (
                  <button key={key} className={`ft-btn ${activeFT===key?"active":""}`} onClick={()=>setActiveFT(key)}>
                    {tree.name}
                  </button>
                ))}
              </div>

              <div className="ft-intro">{ft.intro}</div>

              <div className="ft-legend">
                {[
                  {color:"#e63946", label:"Top Event / Critical"},
                  {color:"#f5a623", label:"Intermediate / Technical Failure"},
                  {color:"#4a9eff", label:"Basic Event (root cause)"},
                  {color:"#9b59b6", label:"Organizational / Human Factor"},
                  {color:"#2a3e5e", label:"AND Gate — all inputs required"},
                ].map(l => (
                  <div key={l.label} className="ft-legend-item">
                    <div style={{width:10,height:10,borderRadius:2,background:l.color,flexShrink:0}} />
                    {l.label}
                  </div>
                ))}
              </div>

              <div className="ft-svg-wrap">
                <FaultTreeSVG tree={ft} />
              </div>

              <div className="ft-metrics">
                {ft.metrics.map((m,i) => (
                  <div key={i} className="ft-metric">
                    <div className="ft-metric-val">{m.val}</div>
                    <div className="ft-metric-label">{m.label}</div>
                    <div className="ft-metric-desc">{m.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{marginTop:24,padding:"16px 20px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:4}}>
                <div style={{fontFamily:"var(--mono)",fontSize:9,letterSpacing:2,color:"var(--text-dim)",textTransform:"uppercase",marginBottom:8}}>EE / Reliability Engineering Context</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
                  {[
                    {k:"Risk Priority Number", v: ft.rrp, desc:"From FMEA — probability × severity × detectability"},
                    {k:"Severity Classification", v: ft.severity, desc:"MIL-STD-882E system safety severity level"},
                    {k:"Mitigation Status", v: ft.mitigationStatus, desc:"Post-incident corrective action status"},
                    {k:"Analysis Method", v:"FTA + FMEA", desc:"Standard aerospace reliability engineering tools"},
                  ].map(s => (
                    <div key={s.k} style={{borderLeft:"2px solid var(--border2)",paddingLeft:12}}>
                      <div style={{fontFamily:"var(--mono)",fontSize:9,color:"var(--text-dim)",letterSpacing:1,textTransform:"uppercase",marginBottom:3}}>{s.k}</div>
                      <div style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--amber)",marginBottom:3}}>{s.v}</div>
                      <div style={{fontSize:11,color:"var(--text-dim)",lineHeight:1.5}}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="sidebar">
          {!selectedInc ? (
            <div className="sidebar-empty">
              <div className="sidebar-empty-icon">◎</div>
              <div>SELECT AN INCIDENT</div>
              <div style={{fontSize:9,marginTop:4,opacity:.6}}>Click any incident or timeline dot</div>
            </div>
          ) : (
            <div className="detail">
              <span className={`detail-outcome ${outcomeClass(selectedInc.outcome)}`}>{selectedInc.outcome.toUpperCase()}</span>
              <div className="detail-name">{selectedInc.name}</div>
              <div className="detail-mission">{selectedInc.mission} · {selectedInc.program}</div>
              <div className="detail-stats">
                {[
                  {k:"Date", v:selectedInc.date},
                  {k:"Phase", v:selectedInc.phase},
                  {k:"Failure Type", v:selectedInc.type},
                  {k:"Crew Aboard", v:selectedInc.crew > 0 ? selectedInc.crew : "Unmanned"},
                  selectedInc.crewLost > 0 && {k:"Crew Lost", v:selectedInc.crewLost, red:true},
                ].filter(Boolean).map(s => (
                  <div key={s.k} className="detail-stat">
                    <span className="detail-stat-k">{s.k}</span>
                    <span className="detail-stat-v" style={s.red?{color:"var(--red)"}:{}}>{s.v}</span>
                  </div>
                ))}
              </div>
              <div className="detail-section-label">What Happened</div>
              <div className="detail-desc">{selectedInc.shortDesc}</div>
              {selectedInc.causes.length > 0 && <>
                <div className="detail-section-label">Causal Factors</div>
                <div className="detail-causes">
                  {selectedInc.causes.map((c,i) => (
                    <div key={i} className="detail-cause">
                      <div className="cause-dot" style={{background:selectedInc.outcome==="fatal"?"var(--red)":"var(--amber)"}} />
                      <div className="cause-text">{c}</div>
                    </div>
                  ))}
                </div>
              </>}
              {selectedInc.patterns.length > 0 && <>
                <div className="detail-section-label">Failure Patterns</div>
                <div className="detail-patterns">
                  {selectedInc.patterns.map(p=><span key={p} className="detail-pat-tag">{p}</span>)}
                </div>
              </>}
              {selectedInc.lesson && <>
                <div className="detail-section-label">Legacy / Lesson</div>
                <div className="detail-lesson">{selectedInc.lesson}</div>
              </>}
              {FAULT_TREES[selectedInc.name.toLowerCase().replace(/ /g,"")] || Object.values(FAULT_TREES).find(f=>f.name===selectedInc.name) ? (
                <button onClick={()=>{setActiveTab("Fault Trees"); const key = Object.keys(FAULT_TREES).find(k=>FAULT_TREES[k].name===selectedInc.name); if(key) setActiveFT(key);}}
                  style={{marginTop:16,width:"100%",padding:"10px",background:"var(--amber-dim)",border:"1px solid var(--amber-mid)",borderRadius:3,color:"var(--amber)",fontFamily:"var(--mono)",fontSize:10,letterSpacing:2,cursor:"pointer",textTransform:"uppercase"}}>
                  View Fault Tree →
                </button>
              ) : null}
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
