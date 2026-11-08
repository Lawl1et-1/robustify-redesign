# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + React, static-exportable. Chosen by the user for this redesign of the marketing site; the live site's own source is not in this workspace.

## Users

Two audiences, weighted equally:

- **Indie .NET developers and ISVs** shipping commercial Windows software (WinForms, WPF, utilities, tools) who need to stop cracking, tampering, and reverse engineering, and who compare Robustify against other obfuscators on strength, compatibility, false antivirus flags, and price.
- **Defense and GRC teams** building ground-control stations, mission planners, and payload-control software for drones and unmanned systems, plus the procurement and anti-tamper reviewers who must sign off on it.

## Product Purpose

Robustify is build-time protection for .NET software. Every build is hardened against reverse engineering and tampering, and each protected executable checks in with a licensing server the developer controls. Success: a visitor understands the per-build randomization and the server kill switch, believes it holds up against AI-assisted reversing, and contacts Robustify to license it.

## Positioning

- Every build is randomized: 20+ protection configurations generated fresh per build, so tooling written against one release is worthless against the next.
- Server-enforced licensing: a signed heartbeat; revoke a build's registration and that executable stops working everywhere. The client fails closed.
- Every tier runs the same full protection pipeline; tiers differ only in capacity and support.
- Roadmap endgame (in development, label it so): application logic lives server-side and executes remotely behind an AI verification gate; the client becomes a shell.

## Operating Context

Developers evaluate it alongside their build/CI pipeline and against competitors (Themida is named in a review). Defense buyers evaluate against threat models: captured hardware, intercepted laptops, tampered field binaries, air-gapped deployment.

## Capabilities and Constraints

- Five defensive layers, in attacker order: randomized structure & misdirection; encrypted internals & obscured call paths; core protection layer unique per build; a second independent protection layer; runtime heartbeat, tamper detection, anti-debug.
- Tamper or debugger attach → process exits before a window opens.
- Bit-for-bit reproducible builds (audit trail). Single-file output. Build seeds on Professional and up.
- Offline activation tokens for air-gapped deployments: roadmap only.
- Online payments are NOT available yet; licensing is by direct contact. Licences renew annually; lapsed licences keep registered build hashes live for a 30-day grace period while new registrations pause.
- Pricing (per year): Indie $120 (5 products, 2 keys, email support); Professional $240 (5 products, 5 keys, build seeds, priority support; most popular); Business $960 (25 products, 15 keys, custom protection client & server-side, professional diagnostics & tailored testing, named support contact); Enterprise $3.6k+ (unlimited products and keys, dedicated support & onboarding).
- Add-ons: protection profile tuning $1,500/product; integration support $500/session; custom protection presets for Enterprise, quoted.
- Legal pages: Company, Terms, EULA, SLA, NDA.

## Brand Commitments

Name "Robustify", domain robustify.xyz. Tagline territory: "Code protection for the AI-reversing era." Copy may be tightened, but every fact, number, price, and review stays true to the live site.

## Evidence on Hand

- Stats: 20+ protection configurations per build; 5★ average across 20+ customer reviews; 100k+ users on protected builds; 20+ developers and ISVs.
- Six Product Hunt reviews (ZyRo777, Octavian of Octavian Tweaking Utility, Tokyo, Mr.BB, splashgg, Henry Burgers).
- No customer logos, case studies, benchmarks, or certifications exist: never invent them.

## Product Principles

1. Prove the mechanism (randomization, kill switch) rather than assert it.
2. Honesty about status: roadmap items and unavailable payments are labeled plainly.
3. One engine, no protection held back: never imply lower tiers are weaker.
4. Speak to the developer and the defense reviewer in the same plain, technical voice.

### From robustify.xyz/company (also real, usable)

- 55 automated regression tests green on every release candidate; 2 commercial products execution-tested end to end; 30+ defect classes closed, each pinned by a regression test.
- B2B client RisxnTweaks (seven-figure software business, 100,000+ users) ships its flagship installer through the engine.
- During hardening, AI-driven analysis was run against Robustify's own protected output as an adversarial oracle; every flank found was closed.
- Competition named on the company page: Dotfuscator (PreEmptive), .NET Reactor (Eziriz), ConfuserEx forks & renamers, in-house teams.
- Roadmap: shipped core engine; in progress another protection layer + zero-dependency single-file variant; planned hardware-level debugger resistance + self-serve licence portal.
- No public contact email exists on the site: the licence-request destination must be supplied by the owner.
