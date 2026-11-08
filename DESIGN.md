---
name: Robustify
description: Code protection for the AI-reversing era, presented as a live specimen of one protected build.
colors:
  tamper-orange: "#ff5b1f"
  tamper-orange-hover: "#ff7442"
  tamper-orange-text: "#ff6a33"
  tamper-orange-light: "#e2480c"
  tamper-orange-light-hover: "#c93d07"
  tamper-orange-light-text: "#b03905"
  verified-lime: "#c4f03a"
  verified-lime-light: "#8fc31a"
  verified-lime-light-text: "#3b6e00"
  graphite-ground: "#141517"
  graphite-raised: "#1b1c1f"
  graphite-well: "#232428"
  graphite-hairline: "#2d2e33"
  graphite-hairline-strong: "#3e4046"
  graphite-fg: "#ecedee"
  graphite-fg-2: "#a9abb0"
  graphite-fg-3: "#85878d"
  instrument-ground: "#edf0f2"
  instrument-raised: "#ffffff"
  instrument-well: "#e2e6ea"
  instrument-hairline: "#cfd5dc"
  instrument-hairline-strong: "#b6bec8"
  instrument-fg: "#0d0f12"
  instrument-fg-2: "#47505c"
  instrument-fg-3: "#5d6672"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 4.9vw, 4.6rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.6vw, 3.9rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 112"
  lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.01em"
  button:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1
    fontVariation: "'wdth' 110"
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12.5px"
    fontWeight: 500
    lineHeight: 1.75
    letterSpacing: "0"
    fontFeature: "'tnum' 1"
rounded:
  none: "0px"
spacing:
  unit: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(88px, 12vw, 168px)"
  wrap: "1240px"
components:
  button-primary:
    backgroundColor: "rgba(255, 91, 31, 0.12)"
    textColor: "{colors.graphite-fg}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.tamper-orange}"
    textColor: "{colors.graphite-ground}"
  button-primary-key:
    backgroundColor: "{colors.tamper-orange}"
    textColor: "{colors.graphite-ground}"
    width: "52px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.graphite-fg}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "{colors.graphite-well}"
    textColor: "{colors.graphite-fg}"
  button-lg:
    height: "60px"
    padding: "0 30px"
  input:
    backgroundColor: "{colors.graphite-ground}"
    textColor: "{colors.graphite-fg}"
    typography: "{typography.body}"
    padding: "13px 14px"
  instrument-panel:
    backgroundColor: "{colors.graphite-raised}"
    textColor: "{colors.graphite-fg-2}"
    rounded: "{rounded.none}"
    padding: "14px 18px"
  threat-chip:
    backgroundColor: "transparent"
    textColor: "{colors.graphite-fg-2}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  tier-flag:
    backgroundColor: "{colors.tamper-orange}"
    textColor: "{colors.graphite-ground}"
    typography: "{typography.label}"
    padding: "6px 12px"
---

# Design System: Robustify

## Overview

**Creative North Star: "The Live Specimen"**

The page is a protected build on the bench, not a brochure about protection. Every surface reads as test equipment: a graphite (or instrument-white) ground, 1px hairline rules on a strict 8px lattice, square-cornered panels with mono readouts, and one tamper orange that means "act" or "alarm". The proof is shown working (a re-seeding 3D specimen, a heartbeat you can flatline, a layer stack that separates on scroll) rather than asserted in cards and stats.

Density is calm and measured: large, expanded, heavy Archivo headlines over plain Archivo prose capped near 60ch, with data confined to framed instruments. Color is near-absent; neutrals do the structural work so that orange and lime keep their meaning. Both themes are first-class and share every rule; the theme is set before first paint via `data-theme` on `<html>`, falling back to the OS preference.

Confirmed rejections: the navy-glow SaaS default with neon-cyan gradients and icon-card grids; glowing "neo" buttons; scrambling button labels; eyebrow or kicker labels above headings; a big-number stats band.

**Key Characteristics:**
- Neutral graphite dark ground, cool instrument-white light ground, both fully specified.
- One tamper orange for every action and alarm; verified lime only for live, verified or shipped status.
- Archivo with the width axis for all words; JetBrains Mono only for real data.
- Square corners, 1px hairlines, 8px lattice.
- Bracketed-frame buttons with a solid key cell and a fill wipe; no glow anywhere.
- Real depth only where it carries meaning: the WebGL specimen and the CSS 3D layer plates.

## Colors

A neutral instrument palette with exactly two signal colors, each bound to a single meaning.

### Primary
- **Tamper Orange** (dark `tamper-orange`, light `tamper-orange-light`): every action and every alarm. Primary button key cell, brackets and hover fill; focus outline; selection; caret; the active layer plate; the revoked stamp and flatlined heartbeat; invalid-field border; the featured tier ring and flag; the logo core; the emphasised half of the hero headline. A translucent soft tint (12% dark, 10% light) fills primary buttons, the cost callout, the gate node and the focused-input ring.
- **Tamper Orange Text** (dark `tamper-orange-text`, light `tamper-orange-light-text`): orange set as text under 18px (log errors, diff injections, field errors, in-progress status, active layer number). Hover state uses the matching `-hover` token.

### Secondary
- **Verified Lime** (dark `verified-lime`, light fill `verified-lime-light`, light text `verified-lime-light-text`): live heartbeat trace, the pinging live dot, "ok" log lines, the shipped roadmap marker. Nothing else.

### Neutral
- **Graphite Ground / Raised / Well** (`graphite-ground`, `graphite-raised`, `graphite-well`): page, alternating section bands and panels, hover and pressed wells in dark theme.
- **Instrument Ground / Raised / Well** (`instrument-ground`, `instrument-raised`, `instrument-well`): the same three roles in light theme; raised is pure white panels on cool off-white.
- **Hairline / Hairline Strong** (`graphite-hairline`, `graphite-hairline-strong`; light `instrument-hairline`, `instrument-hairline-strong`): every rule and panel border; strong for control outlines, plate edges and dashed tracks.
- **Foreground ramp** (`*-fg`, `*-fg-2`, `*-fg-3`): headings and emphasis; body and secondary copy, checkmarks and list icons; tertiary meta, placeholders, panel captions.

### Named Rules
**The One Signal Rule.** Orange is the only color that asks for a click or reports a failure. If an element is neither an action nor an alarm, it is not orange.

**The Lime Means Live Rule.** Lime marks only something live, verified or shipped. Never decoration, never bullets: checkmarks and list icons use `fg-2`.

**The Small Orange Rule.** Orange text under 18px uses the `-text` token, never the fill token, in both themes.

## Typography

**Display Font:** Archivo, width axis expanded (with system-ui)
**Body Font:** Archivo (with system-ui)
**Label/Mono Font:** JetBrains Mono, tabular numerals (with ui-monospace, Cascadia Mono)

**Character:** A single grotesque stretched wide and heavy for headlines reads as stamped equipment lettering; at normal width it carries prose plainly. Mono appears only where a machine would print.

### Hierarchy
- **Display** (800, clamp(2.6rem, 4.9vw, 4.6rem), 0.94, wdth 125, -0.04em): the hero headline; the closing contact headline runs larger (to 5.6rem) on the same settings.
- **Headline** (800, clamp(2.1rem, 4.6vw, 3.9rem), 1, wdth 125, -0.03em): section h2, balanced wrapping.
- **Title** (800, 1.15rem, 1.2, wdth 112, -0.01em): h3 in lists, nodes, roadmap.
- **Body** (400, 17px, 1.6): prose; lede at clamp(1.05rem, 1.4vw, 1.2rem) in `fg-2`, capped at 60ch.
- **Label** (600, 12px, 0.01em, sentence case): tags, table heads, tier names and flags, badges, roadmap status.
- **Data** (500, 12.5px, 1.75, tabular): hashes, seeds, build ids, timings, prices, code, logs.

### Named Rules
**The Real Data Rule.** JetBrains Mono is for values a machine produced: hashes, seeds, timings, prices, code, logs. Every label, including panel captions and status words, is Archivo.

**The No Kicker Rule.** No eyebrow or kicker label sits above a heading. A heading stands alone, followed by its lede.

## Layout

A centered 1240px wrap with fluid gutters (clamp(16px, 4vw, 48px)). Every spacing value is a multiple of the 8px unit; sections breathe at clamp(88px, 12vw, 168px) vertical padding, and alternating bands switch between ground and raised with hairlines at the seams. Content sits in asymmetric two-column grids (hero 5/12 copy to 7/12 specimen; copy against an instrument elsewhere) with column gaps of clamp(40px, 6vw, 96px), collapsing to one column at 960px. Lists are ruled rows (hairline above and below each item) rather than cards. Tabular sets (tiers, roadmap, quotes) are shared-border grids divided by 1px rules, stepping 4 to 2 to 1 columns. Below 720px a sticky bottom bar carries the primary action.

## Elevation & Depth

Flat by default: tonal bands and hairlines do the layering. One soft ambient shadow lifts only floating instruments (hero readouts, the diff panel, the heartbeat monitor, the contact form, the featured tier, the mobile sticky bar). Real three-dimensional depth is reserved for the mechanism itself: the WebGL build specimen and the CSS 3D layer plates, which separate in Z on scroll and lift the active plate. Translucent blurred backgrounds appear only on the sticky header, readouts and the sticky bar.

### Shadow Vocabulary
- **Instrument lift** (dark `box-shadow: 0 24px 60px -24px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.35)`; light `0 24px 50px -28px rgba(13,15,18,0.35), 0 2px 6px rgba(13,15,18,0.08)`): floating instrument panels only.

### Named Rules
**The No Glow Rule.** Nothing glows. No colored shadows, no neon halos on buttons or text. Emphasis comes from fills, brackets and rules.

## Shapes

Square corners throughout (0px). Borders are 1px hairlines; 2px is reserved for the button corner brackets, the featured-tier ring and the dashed packet track; 3px only for the revoked stamp. Dashed hairlines mark provisional or in-development things (the "In development" badge, plate inner frames). The one circle is the live status dot. The logo is a square containing a rotated square with an orange core, the system's geometry in miniature.

## Components

### Buttons
Bracketed frames, not glowing slabs.
- **Shape:** square (0px), height 52px; large 60px; compact contexts 38-44px with 7-8px bracket arms.
- **Primary:** tamper-orange soft tint field, four orange corner brackets (10px arms, 2px thick) set 4px outside the frame, Archivo 700 at wdth 110, and a solid orange key cell (square, full height) holding a right arrow.
- **Hover / Focus:** an orange fill wipes left to right across the field (clip-path, 0.5s exponential ease-out), the label flips to ground-ink, the brackets spread to 8px outside, the arrow nudges 3px. Active presses down 1px. Focus mirrors hover plus the global 2px orange outline.
- **Ghost:** a 1px strong-hairline outline that, on hover, dissolves into foreground-colored corner brackets while a well-tone fill wipes in. No key cell.

### Chips
- **Style:** threat chips are 1px strong-hairline boxes, `fg-2` text, 8px 12px padding. The "In development" badge uses a dashed hairline and a clock icon.
- **State:** static; no selected state.

### Cards / Containers
- **Corner Style:** square (0px).
- **Background:** raised tone on ground bands, ground tone on raised bands.
- **Shadow Strategy:** instrument lift only on floating instruments (see Elevation & Depth).
- **Border:** 1px hairline; internal divisions are 1px rules.
- **Internal Padding:** panel heads and feet 14px 18px; content 18-32px.

### Inputs / Fields
- **Style:** ground fill on a raised form, 1px strong hairline, Archivo 16px, 13px 14px padding; labels Archivo 600 14px above.
- **Focus:** border turns orange with a 3px orange soft-tint ring.
- **Error / Disabled:** invalid border orange, message below in orange-text 13px; disabled buttons at 50% opacity.

### Navigation
- **Style:** sticky 72px header on translucent ground with 14px blur; hairline appears at the bottom once scrolled. Brand wordmark Archivo 800 wdth 125. Links Archivo 500 15px in `fg-2`, hover to `fg` on a well fill. Square theme toggle (42px, hairline). Compact primary button at 42px.
- **Mobile:** links hide at 960px; header primary hides at 520px in favor of the sticky bottom bar.

### Instrument Panel (signature)
A framed readout: hairline border, raised fill, head row and foot row divided by rules, data in JetBrains Mono with values in `fg` and keys in `fg-2`. Used for the hero build readouts, the engine diff and the heartbeat monitor. Hex values in readouts may resolve through random hex glyphs when the build re-seeds; that motion is for data values only, never labels or buttons.

### Kill Switch
A square 64x32 track with a square thumb; on, the track takes the orange tint and the thumb slides to orange. Pulling it flatlines the canvas heartbeat (lime to orange), turns the monitor border orange, and drops in a rotated "revoked" stamp.

### Layer Plates
Five square translucent plates stacked in CSS 3D (rotateX 58deg, rotateZ -42deg) with dashed inner frames; scroll spreads them in Z; the active plate turns orange-tinted with an orange frame and lifts 30px.

## Do's and Don'ts

### Do:
- **Do** use tamper orange for every action and alarm, and the `-text` orange for any orange text under 18px.
- **Do** reserve verified lime for live, verified or shipped status; color checkmarks and list icons `fg-2`.
- **Do** set every word in Archivo and only machine-produced data (hashes, seeds, timings, prices, code, logs) in JetBrains Mono with tabular numerals.
- **Do** keep corners square, rules 1px, and spacing on the 8px lattice.
- **Do** build buttons as bracketed frames: tinted field, corner brackets, solid orange key cell with arrow, left-to-right fill wipe on hover; ghost resolves from hairline into brackets.
- **Do** specify both themes for every new token: graphite (`#141517` / `#1b1c1f`) and instrument-white (`#edf0f2` / `#fff`).
- **Do** use exponential ease-out (cubic-bezier(0.16, 1, 0.3, 1)) for motion, keep content visible by default, and show still states under reduced motion.

### Don't:
- **Don't** add glow, neon halos or colored shadows to buttons or anything else.
- **Don't** scramble or animate button labels.
- **Don't** put eyebrow or kicker labels above headings.
- **Don't** add a big-number stats band; proof lives in the proof strip, readouts and reviews.
- **Don't** use lime for decoration, bullets or checkmarks.
- **Don't** set labels, captions or status words in mono.
- **Don't** drift toward navy-glow SaaS: no neon-cyan gradients, no icon-card grids.
