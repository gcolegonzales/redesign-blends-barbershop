# Blends Barbershop — Website Redesign Concept

An unsolicited, single-page website concept for **Blends Barbershop** in Denham Springs, LA.
This is a pitch/portfolio piece — **not** the shop's official website.

## Why this exists

Blends Barbershop is a busy, highly-rated shop (**4.9 stars across 180+ Booksy reviews**, open
7 days a week) but has **no real website** — customers only find them through Booksy, Fresha, and
Facebook. That means:

- No branded home on the web; the business shows up only inside marketplace listings.
- Hours, services, location and the "book" action are scattered across third-party profiles.
- No place to show off their actual work or capture search traffic for "barber Denham Springs."

This concept gives them a fast, mobile-first, branded landing page that funnels straight to their
**real Booksy booking page** — no fake scheduler, just their existing booking flow.

## What's real here

- **Name, address, phone, hours** — pulled from their Booksy and Fresha profiles.
  - 2570 Florida Ave SW, Suite B, Denham Springs, LA 70726 · (225) 367-5072 · open 7 days.
- **Booking link** — the "Book" buttons link to the shop's **live Booksy profile**.
- **Photos** — real shop sign and haircut photos sourced from their Booksy listing, optimized for web.
- **Barbers** — Lester and Kevin are named from real client reviews.

### Marked for confirmation before any public use
- Exact per-service prices (`<!-- TODO -->` / `<!-- MENU-INCOMPLETE -->` in `index.html`) — Booksy
  shows per-barber pricing (points seen: $30 / $40 / $50 / $55+); shown as ranges here.
- Review quotes are **paraphrased/summarized** from public reviews, not verbatim named quotes.
- Full barber roster and staff headshots.

## Tech

Fully static, no build step, no framework. Just `index.html` + `styles.css` + `script.js` +
`assets/`. Responsive and mobile-first, accessible (semantic landmarks, alt text, focus states,
`prefers-reduced-motion`), with tasteful motion (sticky/shrinking header, scroll reveals, marquee).

Fonts load from a single Google Fonts `<link>`; everything else is self-contained.

## View it

Open `index.html` by double-clicking it, or serve the folder with any static server.

## Design direction

Classic heritage barbershop: barber-pole palette (navy + barber red + cream/bone), condensed
display type, subtle stripe motifs, crisp photography of real cuts.
