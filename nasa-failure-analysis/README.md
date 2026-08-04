# NASA Failure Analysis

An interactive spacecraft incident database and failure pattern analyzer covering NASA missions from Apollo 1 (1967) to DART (2022).

**Live demo:** https://YOUR_GITHUB_USERNAME.github.io/nasa-failure-analysis

## Features

- **Timeline** — incidents plotted across program rows, color-coded by outcome (fatal / partial / success)
- **Database** — filterable table with search across all incidents
- **Patterns** — recurring failure themes (Normalization of Deviance, Schedule Pressure, etc.) with frequency charts
- **Fault Trees** — interactive Fault Tree Analysis (FTA) diagrams for Challenger, Columbia, and Mars Climate Orbiter using standard AND/OR gate notation

## Engineering Context

This project applies reliability engineering techniques used in aerospace and defense:
- **Fault Tree Analysis (FTA)** — top-down deductive failure analysis (per IEC 61025)
- **FMEA framing** — severity classification per MIL-STD-882E
- **Root Cause Analysis** — causal chain mapping for each incident
- **V&V gap identification** — integration testing and interface control failures

## Tech Stack

React + Vite, deployed via GitHub Pages.

## Deploy

```bash
# 1. Clone and install
git clone https://github.com/YOUR_USERNAME/nasa-failure-analysis
cd nasa-failure-analysis
npm install

# 2. Update homepage in package.json with your GitHub username

# 3. Deploy to GitHub Pages
npm run deploy
```

## Data Sources

- CAIB Report (2003) — Columbia
- Rogers Commission Report (1986) — Challenger
- Apollo 204 Review Board Report (1967) — Apollo 1
- JPL Special Review Board (1999) — Mars Climate Orbiter
- NASA Technical Reports — all missions

## Roadmap

- [ ] Expand to global incidents (Soviet, ESA, ISRO, commercial)
- [ ] Add AI chat layer for natural language queries across incident data
- [ ] FMEA severity × probability risk matrix view
- [ ] Fault trees for Apollo 13 and Mars Polar Lander
