# Robustify — marketing site UI redesign

A front-end redesign of the [robustify.xyz](https://robustify.xyz) landing page.

Live preview: https://robustify-redesign.vercel.app

## Scope and credit

**I designed and built the UI only.** This repository contains the visual design and front-end code for the marketing page: layout, typography, colour system, dark/light themes, animations, the 3D build specimen and the interactive demos.

**I did not build Robustify.** The product itself (the .NET protection engine, the licensing server, the heartbeat and kill-switch system), the Robustify name and brand, and every product fact, price, statistic and review on the page belong to Robustify and its owners. The copy is adapted from the live robustify.xyz site and its company page.

The interactive demos on the page (the build re-randomizer, the decompiler view and the heartbeat/kill-switch monitor) are illustrative simulations that run in the browser. They are not connected to the real Robustify engine or servers.

## What's in the UI

- 3D "protected build" specimen (three.js / React Three Fiber) that re-randomizes on every rebuild
- Simulated heartbeat monitor with a working revoke/restore kill switch, linked to the hero specimen
- CSS 3D layer stack that spreads apart on scroll
- Dark and light themes with no flash on load, respecting the system preference
- Reduced-motion support throughout
- Conversion and trust structure: social proof early, one primary action, highlighted recommended tier, honest status labels

## Stack

Next.js 15 (App Router), React 19, TypeScript, three.js with @react-three/fiber, lucide-react icons, plain CSS with design tokens. Fonts: Archivo and JetBrains Mono.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3123.

## Configuration

The licence request form needs a contact address. Set `contactEmail` in `lib/site.ts`; until then the form shows a "not connected" message on submit.

## Design system

`DESIGN.md` documents the palette, type, components and rules. `PRODUCT.md` records the product facts the page is allowed to state.
