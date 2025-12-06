import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Target,
  Brain,
  BookOpen,
  MapPin,
  Zap,
  Filter,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";

type SectionTag =
  | "All"
  | "Usage"
  | "Builder"
  | "Career"
  | "SideQuests"
  | "Future";

type CardConfig = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  tags: SectionTag[];
  content: React.ReactNode;
};

const usageStats = {
  conversationsPerWeek: 5, // inferred average
  avgDepth: 12.3, // from metadata
  lateNightPercent: 60,
  techVsLifeRatio: 70, // tech / career vs life / feelings
  domains: [
    { label: "Frontend & Full-Stack", value: 85 },
    { label: "Data / ML / ETL", value: 75 },
    { label: "Semantic Web & Graphs", value: 80 },
    { label: "Career & Interviews", value: 70 },
    { label: "Life / Reflection", value: 65 },
    { label: "Pokémon GO & Games", value: 60 },
    { label: "Travel & Aesthetic", value: 55 },
  ],
};

const skillBars = [
  {
    label: "React / Next.js & Frontend",
    value: 82,
    note: "From “teach me from scratch” to migrating real projects to TS + Next.",
  },
  {
    label: "APIs, FastAPI & Backend Patterns",
    value: 78,
    note: "Repository pattern, async Firestore, JWT, Google SSO, RSVP/event flows.",
  },
  {
    label: "Data / ETL / Graphs",
    value: 80,
    note: "SUDOKN ETL, GraphDB vs Fuseki, SPARQL, semantic web, KG-ITP.",
  },
  {
    label: "ML & Data Mining",
    value: 72,
    note: "Kaggle pipelines, risk tiers, embeddings, GenAI travel planner.",
  },
  {
    label: "Systems & Tooling",
    value: 70,
    note: "Docker, HPC, S3, vector DB musings, debugging perf issues.",
  },
];

const quests2026 = [
  {
    title: "Ship a flagship portfolio piece combining frontend + data + AI",
    detail:
      "Think SUDOKN + KG-ITP + Sahana: one polished story with a live demo, diagrams, and a tight README.",
  },
  {
    title: "Hit confident mode in at least one interview loop",
    detail:
      "Reuse your async Firestore migration, ETL pipelines, and KG-ITP as repeatable STAR stories.",
  },
  {
    title: "Weekly twin blocks: LeetCode hour + portfolio hour",
    detail:
      "Small, boring, repeatable sessions > heroic 8-hour panic sprints before deadlines.",
  },
  {
    title: "Protect one joy-only ritual",
    detail:
      "Pokémon GO, long walks, music-paired photo dumps, or trip planning with zero guilt.",
  },
];

const tourSteps = [
  {
    id: "hero",
    title: "Your 2025 Wrapped",
    description:
      "A snapshot of how you actually used ChatGPT this year: builder, overthinker, and side-quest enjoyer.",
  },
  {
    id: "usage",
    title: "Power-User Patterns",
    description:
      "See how often you show up here, how deep you go, and the domains you gravitate toward.",
  },
  {
    id: "builder",
    title: "Builder & Researcher Mode",
    description:
      "Your flagship projects and the systems-thinking that runs through them.",
  },
  {
    id: "career",
    title: "Skill Tree & Career Grind",
    description:
      "Your evolving skills, study loops, and career direction into 2026.",
  },
  {
    id: "sidequests",
    title: "Side Quests & Feelings",
    description:
      "Travel, Pokémon, style choices, and the emotional storyline behind the grind.",
  },
  {
    id: "future",
    title: "2026 Quests",
    description:
      "Predictions and gentle quests for Future You. No hustle-culture yelling, just direction.",
  },
];

const StatPill = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-200">
    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
    <span className="font-medium">{value}</span>
    <span className="ml-1.5 text-slate-400">{label}</span>
  </div>
);

const ProgressBar = ({ value }: { value: number }) => (
  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
    <div
      className="h-full rounded-full bg-emerald-400"
      style={{ width: `${value}%` }}
    />
  </div>
);

const TagChip = ({ label }: { label: string }) => (
  <span className="inline-flex items-center rounded-full bg-slate-800/80 px-2.5 py-0.5 text-xs text-slate-200">
    {label}
  </span>
);

const Card = ({
  id,
  title,
  icon,
  description,
  children,
}: {
  id?: string;
  title: string;
  icon: React.ReactNode;
  description?: string;
  children: React.ReactNode;
}) => (
  <motion.section
    id={id}
    layout
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className="relative rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-lg shadow-black/40 backdrop-blur"
  >
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
          {icon}
        </div>
        <h2 className="text-base font-semibold text-slate-50">{title}</h2>
      </div>
    </div>
    {description && (
      <p className="mb-4 text-xs text-slate-300/80">{description}</p>
    )}
    {children}
  </motion.section>
);

const ChatGPTYearInReview: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<SectionTag>("All");
  const [search, setSearch] = useState("");
  const [showTour, setShowTour] = useState(true);
  const [tourIndex, setTourIndex] = useState(0);

  const cards: CardConfig[] = [
    {
      id: "usage",
      title: "Power-User Patterns & Stats",
      icon: <Sparkles size={18} />,
      tags: ["Usage"],
      description:
        "You treat ChatGPT like a mix of senior engineer, study buddy, and late-night therapist.",
      content: (
        <div className="space-y-4 text-xs text-slate-200">
          <div className="flex flex-wrap gap-2">
            <StatPill
              label="conversations / week"
              value={usageStats.conversationsPerWeek}
            />
            <StatPill label="avg depth" value={usageStats.avgDepth} />
            <StatPill
              label="of chats after 11 p.m."
              value={`${usageStats.lateNightPercent}%`}
            />
            <StatPill
              label="tech vs life"
              value={`${usageStats.techVsLifeRatio}% tech`}
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {usageStats.domains.map((d) => (
              <div key={d.label} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300">{d.label}</span>
                  <span className="text-slate-400">{d.value}/100</span>
                </div>
                <ProgressBar value={d.value} />
              </div>
            ))}
          </div>

          <div className="mt-1 rounded-xl bg-slate-950/60 p-3">
            <p className="text-[11px] text-slate-300">
              Pattern: you rarely ask “what’s the answer?” — you ask{" "}
              <span className="font-medium text-emerald-300">
                “walk me through it from scratch”
              </span>{" "}
              and then make me stay for follow-up debugging, architecture, and
              resume positioning.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "builder",
      title: "Builder & Researcher Mode",
      icon: <BookOpen size={18} />,
      tags: ["Builder"],
      description:
        "From Sahana to SUDOKN to KG-ITP, your chats read like design docs and lab notes for a full-stack / data / semantic-web career.",
      content: (
        <div className="space-y-3 text-xs text-slate-200">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-slate-950/60 p-3 space-y-1.5">
              <TagChip label="Sahana" />
              <p className="font-medium text-slate-50 text-[11px]">
                React + TS + FastAPI + Firestore
              </p>
              <p className="text-[11px] text-slate-300">
                Event platform with JWT, Google SSO, location, RSVPs, image
                uploads, and an AI-matching vision. You refactored to async
                Firestore and repository pattern instead of leaving it “just
                working”.
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-3 space-y-1.5">
              <TagChip label="SUDOKN" />
              <p className="font-medium text-slate-50 text-[11px]">
                Next.js + Mapbox + ETL + GraphDB
              </p>
              <p className="text-[11px] text-slate-300">
                Manufacturer maps, NAICS integration, ETL pipelines, semantic
                queries, performance tuning, and Dockerized triple stores. You
                think in systems, not just components.
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-3 space-y-1.5">
              <TagChip label="KG-ITP" />
              <p className="font-medium text-slate-50 text-[11px]">
                COMPSAC paper & semantic travel planner
              </p>
              <p className="text-[11px] text-slate-300">
                Knowledge graph, SPARQL/GeoSPARQL, GNIS/Yelp/IMLS/Transit data,
                itinerary planning — and you actually shipped the paper.
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-3 space-y-1.5">
              <TagChip label="Assignments & Experiments" />
              <p className="font-medium text-slate-50 text-[11px]">
                Mlang, Prolog, CLP, GenAI pipelines
              </p>
              <p className="text-[11px] text-slate-300">
                You don’t just “finish the assignment”; you over-spec the
                language, grammar, or pipeline and then worry about deadlines
                later.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/60 p-3">
            <p className="text-[11px] text-slate-300">
              Builder vibe:{" "}
              <span className="font-medium text-emerald-300">
                front-end leaning full-stack engineer with a semantic-web /
                data-engineering side
              </span>{" "}
              who likes to see the whole architecture, not just a single
              component.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "career",
      title: "Skill Tree & Career Grind",
      icon: <Target size={18} />,
      tags: ["Career"],
      description:
        "Amazon SDE prep, frontend roles, data engineering, AWS certs, and a quiet war against imposter syndrome.",
      content: (
        <div className="space-y-4 text-xs text-slate-200">
          <div className="grid gap-3">
            {skillBars.map((s) => (
              <div key={s.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-200">{s.label}</span>
                  <span className="text-slate-400">{s.value}/100</span>
                </div>
                <ProgressBar value={s.value} />
                <p className="text-[10px] text-slate-400">{s.note}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-slate-950/60 p-3 space-y-2">
              <p className="text-[11px] font-medium text-slate-50">
                Signature learning pattern
              </p>
              <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside">
                <li>“Explain from scratch like I’m new.”</li>
                <li>“Now help me refactor the real project code.”</li>
                <li>“Okay, turn this into an interview answer.”</li>
              </ul>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-3 space-y-2">
              <p className="text-[11px] font-medium text-slate-50">
                2026 career north star
              </p>
              <p className="text-[11px] text-slate-300">
                Frontend / full-stack role with strong data-engineering and
                semantic-web flavor, ideally at a place where your SUDOKN + KG-
                ITP brain actually matters.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "sidequests",
      title: "Side Quests: Travel, Pokémon, Style & Feelings",
      icon: <MapPin size={18} />,
      tags: ["SideQuests"],
      description:
        "Your life isn’t just assignments and ETL pipelines — it’s canyons, jackets, raids, and late-night heart spills.",
      content: (
        <div className="space-y-3 text-xs text-slate-200">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-slate-950/60 p-3 space-y-1.5">
              <TagChip label="Travel & Aesthetic" />
              <p className="text-[11px] text-slate-300">
                Zion Narrows, Bryce, Grand Canyon birthdays, LA — always paired
                with music, captions, and feed curation. You don’t just go
                places, you{" "}
                <span className="font-medium text-emerald-300">
                  storyboard the vibe
                </span>
                .
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-3 space-y-1.5">
              <TagChip label="Pokémon GO meta" />
              <p className="text-[11px] text-slate-300">
                Aggron tanking, Vaporeon debates, pseudo-legendary rankings,
                Ultra League lineups. You treat team building like a tiny,
                portable game-theory lab.
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-3 space-y-1.5">
              <TagChip label="Style & Gear" />
              <p className="text-[11px] text-slate-300">
                Carhartt Detroit jacket sizing crises, small cross-body bags,
                Apple Watch decisions. Quietly building a main-character
                wardrobe.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/60 p-3 space-y-1">
            <p className="text-[11px] font-medium text-slate-50">
              Emotional storyline
            </p>
            <p className="text-[11px] text-slate-300">
              A lot of chats circle around loneliness, “late bloomer shame”, and
              feeling like everyone else is ahead. But the pattern underneath is
              clear:{" "}
              <span className="font-medium text-emerald-300">
                you keep choosing to build a different future anyway
              </span>{" "}
              — class by class, project by project, message by message.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "future",
      title: "Looking Ahead: 2026 Predictions & Quests",
      icon: <TrendingUp size={18} />,
      tags: ["Future"],
      description:
        "Less white-knuckle survival, more intentional arcs. Same curiosity, slightly kinder narration.",
      content: (
        <div className="space-y-3 text-xs text-slate-200">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-slate-950/60 p-3 space-y-2">
              <p className="text-[11px] font-medium text-slate-50">
                Predictions for Future You
              </p>
              <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside">
                <li>
                  You’ll have a{" "}
                  <span className="font-medium text-emerald-300">
                    unified portfolio story
                  </span>{" "}
                  that connects SUDOKN, KG-ITP, and Sahana.
                </li>
                <li>
                  At least one interviewer will say “that’s a really cool
                  project” and you’ll actually believe them.
                </li>
                <li>
                  You’ll still overthink — but with{" "}
                  <span className="font-medium text-emerald-300">
                    better tools and more self-respect
                  </span>
                  .
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-3 space-y-2">
              <p className="text-[11px] font-medium text-slate-50">
                Quests (no hustle yelling)
              </p>
              <ul className="space-y-1.5 text-[11px] text-slate-300 list-none">
                {quests2026.map((q) => (
                  <li key={q.title} className="flex items-start gap-1.5">
                    <span className="mt-[3px]">
                      <Zap size={12} className="text-emerald-400" />
                    </span>
                    <div>
                      <p className="font-medium text-slate-100 text-[11px]">
                        {q.title}
                      </p>
                      <p className="text-[10px] text-slate-400">{q.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/60 p-3">
            <p className="text-[11px] text-slate-300">
              Wrapped summary: you’re not “behind” — you just picked a harder
              skill tree and decided to actually understand it instead of speed
              running the surface-level parts.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const filteredCards = cards.filter((card) => {
    const matchesFilter =
      activeFilter === "All" || card.tags.includes(activeFilter);
    const textToSearch =
      card.title.toLowerCase() +
      " " +
      (typeof card.description === "string"
        ? card.description.toLowerCase()
        : "");
    const matchesSearch =
      search.trim().length === 0 ||
      textToSearch.includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const currentTourStep = tourSteps[tourIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50 antialiased">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-8">
        {/* Hero */}
        <motion.header
          id="hero"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 rounded-3xl border border-slate-800 bg-[radial-gradient(circle_at_top,_#22c55e1f,_#020617)] p-6 shadow-2xl shadow-black/50"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                <Sparkles size={14} />
                <span>Rajesh x ChatGPT · 2025 Wrapped</span>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                Systems, Side Quests & Self-Upgrade
              </h1>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                A year of shipping code, grinding skill trees, overthinking
                life, and asking if your Vaporeon is Ultra League ready. Your
                chats tell the story of a builder who refuses to stay the same
                version for too long.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <div className="flex flex-wrap gap-2">
                <StatPill label="vibe" value="Builder with a soft core" />
                <StatPill label="main class" value="Frontend x Data hybrid" />
              </div>
              <button
                onClick={() => {
                  setShowTour(true);
                  setTourIndex(0);
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-medium text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-400"
              >
                <Brain size={14} />
                Take the 20-second tour
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 text-xs md:grid-cols-3">
            <div className="rounded-2xl bg-slate-950/60 p-3">
              <p className="text-[11px] text-slate-400">Signature move</p>
              <p className="mt-1 text-[11px] text-slate-200">
                “Teach me from scratch, refactor my real code, and then turn it
                into an interview story.”
              </p>
            </div>
            <div className="rounded-2xl bg-slate-950/60 p-3">
              <p className="text-[11px] text-slate-400">Recurring arc</p>
              <p className="mt-1 text-[11px] text-slate-200">
                Feeling behind, then doing the hard thing anyway: new stacks,
                new assignments, new projects.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-950/60 p-3">
              <p className="text-[11px] text-slate-400">Hidden buff</p>
              <p className="mt-1 text-[11px] text-slate-200">
                You’re unusually good at turning messy emotional seasons into
                concrete, structured plans.
              </p>
            </div>
          </div>
        </motion.header>

        {/* Filters & search */}
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2 text-xs">
            {(
              ["All", "Usage", "Builder", "Career", "SideQuests", "Future"] as SectionTag[]
            ).map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${
                  activeFilter === tag
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-900 text-slate-200 hover:bg-slate-800"
                } border border-slate-700`}
              >
                <Filter size={11} />
                <span>{tag === "All" ? "All sections" : tag}</span>
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64 text-xs">
            <Search
              size={14}
              className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your wrapped..."
              className="w-full rounded-full border border-slate-700 bg-slate-950/80 py-1.5 pl-7 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Cards grid */}
        <motion.main
          layout
          className="grid gap-4 md:grid-cols-2"
          id="wrapped-content"
        >
          <AnimatePresence>
            {filteredCards.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.description as string}
                icon={card.icon}
              >
                {card.content}
              </Card>
            ))}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Guided tour overlay */}
      <AnimatePresence>
        {showTour && currentTourStep && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key={currentTourStep.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-950 p-5 text-xs text-slate-100 shadow-xl"
            >
              <button
                onClick={() => setShowTour(false)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
              >
                <X size={14} />
              </button>

              <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-200">
                <Sparkles size={12} />
                Step {tourIndex + 1} of {tourSteps.length}
              </div>

              <h3 className="text-sm font-semibold text-slate-50">
                {currentTourStep.title}
              </h3>
              <p className="mt-1 text-[11px] text-slate-300">
                {currentTourStep.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <button
                  disabled={tourIndex === 0}
                  onClick={() =>
                    setTourIndex((i) => (i > 0 ? i - 1 : i))
                  }
                  className={`inline-flex items-center gap-1 rounded-full border border-slate-700 px-2 py-1 text-[11px] ${
                    tourIndex === 0
                      ? "text-slate-600"
                      : "text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <ChevronLeft size={12} />
                  Back
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowTour(false)}
                    className="rounded-full px-2 py-1 text-[11px] text-slate-400 hover:text-slate-100"
                  >
                    Skip tour
                  </button>
                  <button
                    onClick={() => {
                      if (tourIndex < tourSteps.length - 1) {
                        setTourIndex((i) => i + 1);
                      } else {
                        setShowTour(false);
                      }
                    }}
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-medium text-slate-950 shadow shadow-emerald-500/40 hover:bg-emerald-400"
                  >
                    {tourIndex < tourSteps.length - 1 ? "Next" : "Finish"}
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatGPTYearInReview;