// All copy and facts for the landing page. Facts mirror robustify.xyz and
// robustify.xyz/company; do not add claims that are not on those pages.

export const site = {
  name: "Robustify",
  domain: "robustify.xyz",
  // The live site publishes no contact address. Set this before shipping so
  // the licence form can open a pre-filled email.
  contactEmail: "",
  productHunt: "https://www.producthunt.com/products/robustify/reviews",
  legal: [
    { label: "Company", href: "https://robustify.xyz/company" },
    { label: "Terms", href: "https://robustify.xyz/tos" },
    { label: "EULA", href: "https://robustify.xyz/eula" },
    { label: "SLA", href: "https://robustify.xyz/sla" },
    { label: "NDA", href: "https://robustify.xyz/nda" },
  ],
};

export const nav = [
  { label: "Engine", href: "#engine" },
  { label: "Kill switch", href: "#killswitch" },
  { label: "Defense", href: "#defense" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
];


export type Capability = { group: string; title: string; body: string; icon: IconName };
export type IconName =
  | "shuffle"
  | "layers"
  | "lock"
  | "route"
  | "brain"
  | "pulse"
  | "noise";

export const capabilities: Capability[] = [
  {
    group: "Protection",
    title: "20+ configs, generated fresh every build",
    body: "Each build produces a unique set of protection internals that exist only in that release. No two builds look or behave the same under analysis.",
    icon: "shuffle",
  },
  {
    group: "Protection",
    title: "Layered, every time",
    body: "Sensitive code is protected by multiple independent mechanisms at once. Defeating one teaches an attacker nothing about the next.",
    icon: "layers",
  },
  {
    group: "Layering",
    title: "Encrypted internals",
    body: "Sensitive values are encrypted in multiple stages, keyed per build, so nothing meaningful sits in plaintext in the shipped binary.",
    icon: "lock",
  },
  {
    group: "Layering",
    title: "Obscured call paths",
    body: "Execution is routed through extra indirection, making it far harder to reconstruct how the program actually works.",
    icon: "route",
  },
  {
    group: "Anti-AI",
    title: "Anti-decompilation",
    body: "There's little usable source to feed a model, and protection details change often enough that solving one build teaches little about the next.",
    icon: "brain",
  },
  {
    group: "Runtime",
    title: "Tamper detection & anti-debug",
    body: "Tampering or a debugger attach is detected and the process exits immediately, before anything sensitive is exposed.",
    icon: "pulse",
  },
  {
    group: "Noise",
    title: "Misdirection, built in",
    body: "Extra structure and misleading signals are mixed into every build, making analysis slower and far less reliable.",
    icon: "noise",
  },
];

export const layers = [
  { name: "Outer layer", detail: "Randomized structure & misdirection" },
  { name: "Internals", detail: "Encrypted internals & obscured call paths" },
  { name: "Core", detail: "Core protection layer, unique per build" },
  { name: "Second core", detail: "A second, independent protection layer" },
  { name: "Runtime", detail: "Heartbeat, tamper detection, anti-debug" },
];

export const defense = [
  "Tampered control binaries exit before a window appears. Fail-closed is the correct default for control software.",
  "Per-build rotation: software recovered from one unit teaches nothing about the next fielded version.",
  "Bit-for-bit reproducible builds give procurement and anti-tamper review a full audit trail.",
];

export const reviews = [
  {
    quote:
      "I have huge codebases that break with other obfuscators. Robustify obfuscated my whole app without any problems. The owner and staff constantly help, and the pricing is fair.",
    name: "ZyRo777",
    role: "Product Hunt review",
  },
  {
    quote:
      "A game-changer for security and performance. Multiple anti-reverse-engineering techniques, seamless workflow integration. Essential for serious developers.",
    name: "Octavian",
    role: "Developer, Octavian Tweaking Utility",
  },
  {
    quote:
      "Protects a sizable WinForms app with no issues. One of the best obfuscation tools, at less than half the price of top-tier tools.",
    name: "Tokyo",
    role: "Product Hunt review",
  },
  {
    quote: "The obfuscation is very strong, makes reversing almost impossible. Easy to use, fast. Recommended.",
    name: "Mr.BB",
    role: "Product Hunt review",
  },
  {
    quote:
      "Quite robust! Unique protection measures that no other obfuscator has. One of my best purchases as an independent programmer protecting my software and IP.",
    name: "splashgg",
    role: "Product Hunt review",
  },
  {
    quote:
      "5/5 for obfuscation options. Support helped a lot with startup problems. And unlike Themida, it doesn't get apps flagged as viruses.",
    name: "Henry Burgers",
    role: "Product Hunt review",
  },
];

export const competitors = [
  {
    name: "Dotfuscator",
    maker: "PreEmptive",
    them: "Renaming and basic string encryption.",
    us: "Deeper per-build protection and fail-closed runtime enforcement, included rather than upsold.",
  },
  {
    name: ".NET Reactor",
    maker: "Eziriz",
    them: "Some structural protection.",
    us: "Layered, per-build protection and execution-verified output.",
  },
  {
    name: "ConfuserEx forks",
    maker: "Free renamers",
    them: "Stale. No answer to AI-assisted analysis, no runtime licensing, no maintenance.",
    us: "Maintained, AI-era protection with server-activated licensing.",
  },
  {
    name: "In-house",
    maker: "Your team",
    them: "The defect classes and verification ladder teams underestimate.",
    us: "30+ defect classes already root-caused and pinned. You buy the outcome.",
  },
];

export type Tier = {
  id: string;
  name: string;
  price: string;
  monthly?: string;
  products: string;
  keys: string;
  features: string[];
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "indie",
    name: "Indie",
    price: "$120",
    monthly: "$10",
    products: "5 products protected",
    keys: "2 activation keys",
    features: ["Full protection pipeline", "Email support"],
  },
  {
    id: "professional",
    name: "Professional",
    price: "$240",
    monthly: "$20",
    products: "5 products protected",
    keys: "5 activation keys",
    features: ["Full protection pipeline", "Build seeds", "Priority support"],
    featured: true,
  },
  {
    id: "business",
    name: "Business",
    price: "$960",
    monthly: "$80",
    products: "25 products protected",
    keys: "15 activation keys",
    features: [
      "Full protection pipeline",
      "Build seeds",
      "Custom protection, client & server-side",
      "Professional diagnostics & tailored testing",
      "Named support contact",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$3.6k+",
    products: "Unlimited products protected",
    keys: "Unlimited activation keys",
    features: [
      "Full protection pipeline",
      "Build seeds",
      "Custom protection, client & server-side",
      "Professional diagnostics & tailored testing",
      "Dedicated support & onboarding",
    ],
  },
];

export const addons = [
  { name: "Protection profile tuning", body: "Custom method selection and protection presets tuned to your codebase.", price: "$1,500 per product" },
  { name: "Integration support", body: "Hands-on help wiring the engine into your CI or build pipeline.", price: "$500 per session" },
  { name: "Custom protection presets", body: "Bespoke protection configurations generated for your Enterprise licence.", price: "Quoted individually" },
];

export const roadmap = [
  { status: "Shipped", title: "Core engine", body: "20+ per-build configurations, tamper detection, anti-debug, server-activated licensing, single-file packaging." },
  { status: "In progress", title: "Another layer, lighter binaries", body: "An additional independent protection layer, plus a zero-dependency single-file variant." },
  { status: "Planned", title: "Hardware-level resistance, self-serve", body: "Hardware-level debugger resistance and a self-serve licence purchase and activation portal." },
  { status: "Planned", title: "Offline activation", body: "Offline activation tokens for air-gapped deployments." },
];
