export const SITE = {
  name: "HSD Technologies",
  tagline: "Building Digital Futures — One Solution at a Time.",
  email: "info@hsdtechnologies.com",
  handle: "@hsdtechnologies",
  url: "https://www.hsdtechnologies.com",
};

export const SERVICES = [
  {
    id: "web-development",
    num: "01",
    name: "Web Development",
    short: "Fast, modern, mobile-ready websites built to convert visitors into customers.",
    features: [
      "Custom website design & development",
      "E-commerce & payment integration",
      "Responsive & mobile-first builds",
      "SEO-friendly architecture",
      "CMS integration (WordPress, Webflow & more)",
    ],
  },
  {
    id: "website-maintenance",
    num: "02",
    name: "Website Maintenance",
    short: "Keep your digital presence secure, fast, and always up to date.",
    features: [
      "Regular updates & security patches",
      "Performance monitoring & optimization",
      "Content revisions & updates",
      "Uptime monitoring & support",
      "Backup & disaster recovery",
    ],
  },
  {
    id: "social-media",
    num: "03",
    name: "Social Media Management",
    short: "Data-driven social strategies that grow your audience and spark engagement.",
    features: [
      "Content creation & scheduling",
      "Platform management (Instagram, Facebook, LinkedIn, X)",
      "Community engagement & monitoring",
      "Monthly analytics & performance reports",
      "Paid social ad campaign management",
    ],
  },
  {
    id: "branding",
    num: "04",
    name: "Branding & Identity",
    short: "Compelling brand identities that communicate your unique value and build trust.",
    features: [
      "Logo design & brand guidelines",
      "Color palette & typography systems",
      "Business card & stationery design",
      "Brand strategy & positioning",
      "Marketing collateral & pitch deck design",
    ],
  },
] as const;

export type PlanId = "basic" | "standard" | "premium";

export const PLANS: {
  id: PlanId;
  name: string;
  motto: string;
  badge: string | null;
  blurb: string;
  highlights: string[];
}[] = [
  {
    id: "basic",
    name: "Basic",
    motto: "Get Started Online",
    badge: null,
    blurb:
      "Ideal for startups, personal brands, and small businesses taking their first steps online.",
    highlights: [
      "Website up to 5 pages",
      "Mobile responsive build",
      "Logo design (2 concepts)",
      "8 social posts / month · 1 platform",
      "Email support",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    motto: "Grow Your Business",
    badge: "★ POPULAR",
    blurb:
      "Perfect for growing businesses ready to scale their digital presence and brand.",
    highlights: [
      "Custom design, up to 10 pages",
      "Full brand guidelines",
      "16 posts / month · 2 platforms",
      "Monthly analytics & performance call",
      "24-hour support response",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    motto: "Full Digital Power",
    badge: "✦ BEST VALUE",
    blurb:
      "Full-suite digital partnership for businesses wanting end-to-end expertise and priority support.",
    highlights: [
      "Unlimited pages & revisions",
      "Complete brand identity system",
      "30 posts / month · up to 4 platforms",
      "Paid ad campaign management",
      "Dedicated account manager · 6-hour priority support",
    ],
  },
];

/** value: string = shown text, true = check, false = not included */
export const PLAN_MATRIX: {
  category: string;
  rows: { label?: string; values: [string | boolean, string | boolean, string | boolean] }[];
}[] = [
  {
    category: "Website Development",
    rows: [
      { values: ["Up to 5 pages", "Up to 10 pages", "Unlimited pages"] },
      { values: ["Mobile responsive", "Mobile responsive", "Mobile responsive"] },
      { values: ["Basic contact form", "Advanced contact forms", "Custom forms & logic"] },
      { values: ["1 revision round", "3 revision rounds", "Unlimited revisions"] },
      { values: ["Standard design template", "Custom design", "Premium custom design"] },
    ],
  },
  {
    category: "Website Maintenance",
    rows: [
      { values: ["Monthly security updates", "Weekly security updates", "Daily monitoring & updates"] },
      { values: ["Basic content updates (2/mo)", "Content updates (8/mo)", "Unlimited content updates"] },
      { values: ["48-hour support response", "24-hour support response", "Priority 6-hour response"] },
      { values: ["Monthly backup", "Weekly backup", "Daily backup & restore"] },
      { label: "Performance optimization", values: [false, true, true] },
    ],
  },
  {
    category: "Social Media Management",
    rows: [
      { values: ["1 platform", "2 platforms", "Up to 4 platforms"] },
      { values: ["8 posts/month", "16 posts/month", "30 posts/month"] },
      { values: ["Basic captions", "Engaging copywriting", "Strategic copywriting"] },
      { label: "Analytics reports", values: [false, "Monthly analytics report", "Weekly analytics report"] },
      { label: "Community management", values: [false, "Community management", "Full community management"] },
      { label: "Paid ad campaign management", values: [false, false, true] },
    ],
  },
  {
    category: "Branding & Identity",
    rows: [
      { values: ["Logo design (2 concepts)", "Logo design (4 concepts)", "Logo design (unlimited)"] },
      { values: ["Basic color palette", "Full brand guidelines", "Complete brand identity system"] },
      { label: "Stationery", values: [false, "Business card design", "Full stationery suite"] },
      { label: "Brand strategy & positioning", values: [false, false, true] },
      { label: "Marketing collateral & pitch deck", values: [false, false, true] },
    ],
  },
  {
    category: "Support & Extras",
    rows: [
      { values: ["Email support", "Email & chat support", "Dedicated account manager"] },
      { label: "Strategy calls", values: [false, "Monthly performance call", "Weekly strategy call"] },
      { label: "SEO optimization included", values: [false, false, true] },
      { label: "Google Analytics setup & training", values: [false, false, true] },
    ],
  },
];

export const PROCESS = [
  { num: "01", name: "Discover", desc: "We listen and understand your goals, audience, and vision." },
  { num: "02", name: "Strategize", desc: "We plan solutions tailored precisely to your needs." },
  { num: "03", name: "Build", desc: "Our team designs and develops with precision and creativity." },
  { num: "04", name: "Launch", desc: "We deploy, test, and ensure a smooth go-live." },
  { num: "05", name: "Grow", desc: "Ongoing support and optimization to keep you ahead." },
] as const;

export const ACADEMY_OFFERS = [
  { code: "HSD-101", name: "Web Development Bootcamps", desc: "Structured, cohort-based bootcamps that take you from zero to deployed." },
  { code: "HSD-102", name: "UI/UX & Graphic Design", desc: "Design courses covering interfaces, identity, and visual craft." },
  { code: "HSD-201", name: "Freelancing & Digital Business", desc: "Training on winning clients, pricing work, and building a digital business." },
  { code: "HSD-301", name: "Mentorship Programme", desc: "Direct mentorship from industry professionals who ship real work." },
  { code: "HSD-401", name: "Certificates & Portfolio", desc: "Industry-recognized certificates and hands-on portfolio support." },
] as const;

export const ACADEMY_VISION = [
  "Bridge the digital skills gap in Africa",
  "Create job-ready, industry-certified graduates",
  "Foster a thriving innovation community",
  "Expand access to remote work opportunities",
  "Launch cohort-based learning programs",
] as const;

/**
 * The team — 3 people for now.
 * Add real names (and optionally photo paths) here when ready;
 * the cards render `name` above the role when it's non-empty.
 */
export const TEAM = [
  {
    num: "01",
    name: "",
    role: "Founder & Creative Director",
    blurb: "Sets the vision, owns the brief, and keeps every pixel honest.",
    focus: ["Brand strategy", "Design direction", "Client success"],
  },
  {
    num: "02",
    name: "",
    role: "Lead Developer",
    blurb: "Turns bold designs into fast, resilient, SEO-friendly builds.",
    focus: ["Web development", "E-commerce", "Performance"],
  },
  {
    num: "03",
    name: "",
    role: "Social & Brand Manager",
    blurb: "Grows audiences, runs the calendar, and keeps communities talking.",
    focus: ["Content", "Community", "Analytics"],
  },
] as const;

/** One-page layout: all navigation targets are section anchors. */
export const NAV_LINKS = [
  { href: "#home", name: "Home", num: "01" },
  { href: "#about", name: "About", num: "02" },
  { href: "#services", name: "Services", num: "03" },
  { href: "#plans", name: "Plans", num: "04" },
  { href: "#process", name: "Process", num: "05" },
  { href: "#academy", name: "Academy", num: "06" },
  { href: "#team", name: "Team", num: "07" },
  { href: "#contact", name: "Contact", num: "08" },
] as const;

export const PAGE_NAMES: Record<string, string> = {
  "/": "Home",
};
