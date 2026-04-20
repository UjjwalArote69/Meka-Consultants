/**
 * MEKA Consultants — Blog / Insights data
 *
 * §VII of the ongoing dossier. Post titles mirror the live site
 * (mekaconsultants.com/blog-list); bodies are written in the firm's
 * consulting voice and grounded in its actual positioning — strategy
 * + execution under one partner, HR / payroll / compliance handling,
 * 24/7 client support, and manpower services (no machinery).
 *
 * Each post carries:
 *   id, num, title, excerpt, category, categoryLabel, date, readTime,
 *   author, featured, heroSubtitle, keyTakeaways, sections, tags.
 *
 * Sections are ordered and may include paragraphs, a list, and a
 * pull-quote. The BlogPost page renders them in sequence.
 */

export const categories = [
  { id: "all", label: "All Insights" },
  { id: "strategy", label: "Strategy" },
  { id: "operations", label: "Operations" },
  { id: "manpower", label: "Manpower" },
  { id: "business", label: "Business" },
  { id: "research", label: "Research" },
];

export const tags = [
  "Advisory",
  "Leadership",
  "Operations",
  "Governance",
  "Manpower",
  "Measurement",
  "Productivity",
  "Strategy",
];

export const posts = [
  // ────────────────────────────────────────────────────────────────
  // 01 · FEATURED
  // ────────────────────────────────────────────────────────────────
  {
    id: "creating-successful-strategies",
    num: "01",
    title: "Creating successful strategies for businesses",
    excerpt:
      "A good strategy tells you what you will and won't do — and why. This note sketches the three-part test we apply to any strategic plan before it lands on a board table: is it specific, is it sequenced, and is it owned by a named leader?",
    category: "strategy",
    categoryLabel: "Strategy",
    date: "April 08, 2026",
    readTime: "8 min read",
    author: "The Practice",
    featured: true,
    heroSubtitle:
      "Most strategies fail not at conception but at the handoff between boardroom and floor. A short argument for strategy documents that are specific, sequenced, and owned.",
    keyTakeaways: [
      "A strategy that cannot be summarised in a single page will not survive contact with the operating floor.",
      "Every strategic priority needs a named owner, a sequenced start date, and a measurable first checkpoint within 90 days.",
      "Strategy without execution is commentary; execution without strategy is motion. MEKA exists at the seam between the two.",
    ],
    sections: [
      {
        id: "what-strategy-is",
        heading: "What a strategy actually is",
        paragraphs: [
          "In the consulting rooms, we see two failure modes more often than any others. The first is the strategy that reads beautifully on a board deck and collapses the moment it encounters a roster, a payroll cycle, or a vendor contract. The second is the strategy that never leaves the executive floor at all — it lives in the CEO's head, gets paraphrased in all-hands meetings, and is quietly reinterpreted by every function to mean whatever they were already doing.",
          "A strategy is neither a deck nor a slogan. It is a small number of decisions about where the organisation will spend its scarce attention over the next one to three years, and — equally important — where it will refuse to. If a strategy cannot tell you what you are going to stop doing, it is not yet a strategy. It is a wish list.",
        ],
      },
      {
        id: "three-part-test",
        heading: "The three-part test",
        paragraphs: [
          "Before any strategic plan lands on a board table in one of our engagements, we run it through a three-part test. It is deliberately unsophisticated. Over two decades of working alongside founders, operators, and boards across India, we have found that the plans which pass this test are the plans which survive contact with reality.",
        ],
        list: [
          {
            label: "Specific",
            body: "Can every priority be described without hedging adverbs? 'Significantly improve margin' does not pass. 'Lift gross margin on the industrial segment from 22% to 27% by Q4' does. Specificity is the friend of accountability; vagueness is its escape hatch.",
          },
          {
            label: "Sequenced",
            body: "Which decision must happen first? Which can only follow once the first is in place? Strategies that treat all priorities as parallel usually end up with none of them completed. We insist on a critical path — a named first move, a named second, and an honest acknowledgement of what depends on what.",
          },
          {
            label: "Owned",
            body: "Every priority carries a single named owner — a person, not a committee. The owner is the individual who will walk into the next quarterly review with the number and either explain the progress or explain the miss. When ownership is diffuse, so is execution.",
          },
        ],
        listType: "definition",
      },
      {
        id: "handoff",
        heading: "The handoff problem",
        paragraphs: [
          "Most strategies fail neither at conception nor at execution in isolation, but at the seam between the two — the handoff. The strategy leaves the boardroom articulate; by the time it reaches the floor, it has been translated, diluted, and re-prioritised by three intermediate layers. Each layer acts in good faith. The cumulative effect is a strategy that no-one on the ground recognises.",
          "Our work with clients frequently begins here. We are not brought in to replace an existing strategy; we are brought in because an existing strategy is not translating into operating reality. The fix is rarely a new document. It is almost always a short set of structural changes to how the existing strategy is sequenced, owned, and measured — plus, in many cases, the right people deployed to close specific execution gaps.",
        ],
        pullQuote:
          "A strategy that cannot be translated into a Monday morning decision is a strategy the organisation has not yet agreed to.",
      },
      {
        id: "one-partner",
        heading: "Strategy and execution, under one partner",
        paragraphs: [
          "MEKA Consultants was built around a conviction that became harder to ignore as we watched our own clients split their advisory and deployment partners and then spend months trying to reconcile the two. The strategy firm writes the plan; a separate staffing firm supplies the people; a third firm handles HR, payroll, and compliance for those people. Each firm optimises for its own deliverable. The client becomes the integration layer.",
          "We handle the strategy, the operating model it implies, and — where the client wants it — the people required to execute it, including full HR, payroll, and statutory compliance. It is the same firm from the advisory conversation through to the deployed project team. Under one partner, the integration cost collapses. That is the point of the structure.",
        ],
      },
      {
        id: "closing",
        heading: "A closing note",
        paragraphs: [
          "If you are about to take a strategy to the board, we would gently suggest running it through the three-part test first. If each priority is specific, sequenced, and owned by a named leader — you are in good shape. If any of the three is missing, the strategy will not fail tomorrow. It will fail in the middle of the next quarter, quietly, in a dozen small misalignments, and the failure will be much harder to diagnose then than it is to prevent now.",
        ],
      },
    ],
    tags: ["Strategy", "Leadership", "Advisory", "Governance"],
  },

  // ────────────────────────────────────────────────────────────────
  // 02
  // ────────────────────────────────────────────────────────────────
  {
    id: "redefining-goals-faster",
    num: "02",
    title: "Discover a better way of redefining company goals faster",
    excerpt:
      "Most organizations revisit their goals annually, whether they need to or not. We argue for a different cadence — quarterly refreshes, with a structured diagnostic that asks only three questions.",
    category: "strategy",
    categoryLabel: "Strategy",
    date: "March 26, 2026",
    readTime: "6 min read",
    author: "The Practice",
    heroSubtitle:
      "The annual planning cycle is a relic of a slower commercial era. A short case for quarterly goal refreshes, built around a three-question diagnostic.",
    keyTakeaways: [
      "Annual goal-setting is a cadence inherited from a slower era. It rarely matches the speed at which modern markets actually move.",
      "A ninety-day horizon is short enough to force honesty and long enough to permit real work.",
      "Three questions — what has changed, what is no longer true, and what must move first — will surface most revisions a leadership team needs to make.",
    ],
    sections: [
      {
        id: "legacy-cadence",
        heading: "A cadence from a slower era",
        paragraphs: [
          "The annual planning cycle is one of the most durable rituals in corporate life. It is also, increasingly, one of the least useful. The cycle was designed for an era in which information arrived slowly, capital was allocated annually, and markets rewarded consistency over adaptation. Very little of that description applies to the operating environment our clients face today.",
          "We are not arguing that annual plans should be abandoned — boards and auditors still require them, and longer horizons are important for capital and hiring decisions. We are arguing that the annual plan should not be the primary forum for goal-setting. Goals are a faster-moving object than budgets. They need a faster-moving ritual.",
        ],
      },
      {
        id: "ninety-day-horizon",
        heading: "The case for ninety days",
        paragraphs: [
          "A ninety-day horizon has two properties that make it unusually useful. It is short enough that a team cannot hide behind it — ninety days is not enough time to run a long research project, launch a product line, or rebuild a function; it forces priorities to be honest. And it is long enough to permit real work — it is not a sprint, and it is not a fire drill.",
          "Every ninety days, the leadership teams we work with convene for what we call a goal refresh. It is not a re-forecast, not a strategy review, and not a town hall. It is a short, disciplined working session with a single output: an updated list of the three to five goals that will have the attention of the executive floor for the following quarter, each with a named owner and a checkpoint date.",
        ],
      },
      {
        id: "three-questions",
        heading: "The three questions",
        paragraphs: [
          "The diagnostic we use in these sessions is built around three questions. They are simple enough to ask in a conference room and demanding enough to surface most of the revisions a leadership team needs to make.",
        ],
        list: [
          {
            label: "What has changed outside the organisation?",
            body: "Not a trend report — a concrete list of shifts in customer behaviour, regulation, cost inputs, or competitive position that the current goal set does not yet account for.",
          },
          {
            label: "What is no longer true?",
            body: "Every strategy rests on assumptions. Which of them — about channel mix, about supply, about the availability of a particular kind of talent, about a regulatory posture — are we quietly continuing to rely on despite evidence that they no longer hold?",
          },
          {
            label: "What must move first?",
            body: "Of everything we would like to do next quarter, what has the highest claim on the organisation's scarce attention? And — the hardest version of the same question — what must we explicitly defer?",
          },
        ],
        listType: "definition",
        pullQuote:
          "A goal that survives every quarterly refresh untouched is either unusually well-chosen or is quietly being ignored. Both deserve investigation.",
      },
      {
        id: "governance",
        heading: "What this looks like in practice",
        paragraphs: [
          "A quarterly refresh does not replace the annual plan; it sits inside it. The annual plan sets the envelope — capital, headcount, major capacity decisions. The quarterly refresh decides how that envelope is spent in each ninety-day window. Goals carried forward untouched from the previous quarter should be flagged and examined, not presumed correct. Goals that no longer pass the three-question test are retired without ceremony.",
          "The meeting itself is short by design — two hours, no presentations, a pre-read circulated seventy-two hours in advance. The output is a one-page goal sheet for the quarter, signed by the chief executive and the named owners. We have run this rhythm with family-owned enterprises, venture-backed firms, and multinational subsidiaries, and the pattern is consistent: once a leadership team moves from annual to quarterly goal-setting, it very rarely goes back.",
        ],
      },
    ],
    tags: ["Strategy", "Governance", "Leadership", "Advisory"],
  },

  // ────────────────────────────────────────────────────────────────
  // 03
  // ────────────────────────────────────────────────────────────────
  {
    id: "five-signals-operating-model",
    num: "03",
    title: "Five signals of an operating model under strain",
    excerpt:
      "Before metrics crack, weaker signals tell the story. This note enumerates the five warning signs we watch for — from rising meeting load to decision latency to the disappearance of quiet work.",
    category: "operations",
    categoryLabel: "Operations",
    date: "March 18, 2026",
    readTime: "7 min read",
    author: "The Practice",
    heroSubtitle:
      "Operating models rarely fail suddenly. They deteriorate through a sequence of small, legible signals — all of which appear months before any KPI moves.",
    keyTakeaways: [
      "Operating models deteriorate gradually, and the earliest signals are rarely financial.",
      "Rising meeting load, slow decisions, and the disappearance of quiet work are the most reliable leading indicators.",
      "By the time the KPIs have moved, the underlying problem is usually several quarters old.",
    ],
    sections: [
      {
        id: "anatomy",
        heading: "The anatomy of a gradual failure",
        paragraphs: [
          "Operating models rarely fail at a single point in time. They deteriorate through a sequence of small, legible signals that are visible for months — sometimes quarters — before any financial KPI registers the damage. By the time the board sees the cracked metric, the underlying problem is usually old. The signals, if you know where to look, are not.",
          "We have learned to take these signals seriously because they are routinely volunteered by the organisation itself. Executives describe them in passing, operators complain about them in passing, and in many cases nobody has yet connected the complaints to a coherent diagnosis. The five we watch for most carefully are the following.",
        ],
      },
      {
        id: "signals",
        heading: "Five signals",
        paragraphs: [
          "These are not theoretical. They are the signals we have seen precede operating-model failure in mandates across industrial services, family-owned enterprises, and professional services firms.",
        ],
        list: [
          {
            label: "Meeting load is rising",
            body: "Meetings are multiplying to cover for coordination that the structure is no longer handling on its own. The calendar is the first place an operating model fails; the P&L is one of the last.",
          },
          {
            label: "Decision latency has crept up",
            body: "Decisions that used to take a week now take a month. The usual reason is not laziness — it is that the implicit decision rights have become unclear, and nobody wants to be the one who decided something it turns out they were not authorised to decide.",
          },
          {
            label: "Quiet work has disappeared",
            body: "Deep, uninterrupted work has quietly been crowded out by coordination overhead. The symptom is senior operators working late to do the analytical work that used to fit inside business hours.",
          },
          {
            label: "Escalations have become routine",
            body: "Issues that should be resolved two levels down are landing on the chief executive's desk. The structure is asking the top of the house to absorb risk that should be held closer to the ground.",
          },
          {
            label: "Exceptions have become the system",
            body: "The formal process is being worked around so consistently that the workarounds are now the real process. When the official system and the actual system diverge, the official system has become ceremonial.",
          },
        ],
        listType: "definition",
        pullQuote:
          "An operating model is not a chart on a wall. It is the set of implicit rules by which decisions actually get made. When those rules start being worked around, the chart is already out of date.",
      },
      {
        id: "response",
        heading: "What to do when you see them",
        paragraphs: [
          "The instinct when these signals appear is to reach for a reorganisation. In our experience, a full reorganisation is usually the wrong response. Reorganisations are expensive, disruptive, and frequently replace one set of unclear decision rights with another set of unclear decision rights.",
          "The cheaper and almost always more effective intervention is a structured diagnosis of where decision rights and coordination costs actually sit today, followed by targeted adjustments — a clearer forum for the two or three decisions that are currently getting stuck, a redesigned reporting line where the current one has become ambiguous, and, in many cases, the right additional capacity deployed at the point of strain so that the existing structure can function as designed. That last piece is frequently where our outsourced manpower practice enters the picture.",
        ],
      },
    ],
    tags: ["Operations", "Governance", "Leadership", "Advisory"],
  },

  // ────────────────────────────────────────────────────────────────
  // 04
  // ────────────────────────────────────────────────────────────────
  {
    id: "boost-performance",
    num: "04",
    title: "Boost your work performance with us",
    excerpt:
      "Performance rarely stalls for a single reason. In most engagements we find a compounding mix of unclear priorities, missing feedback loops, and the absence of a shared operating rhythm.",
    category: "business",
    categoryLabel: "Business",
    date: "March 04, 2026",
    readTime: "6 min read",
    author: "The Practice",
    heroSubtitle:
      "Stalled performance is almost never a motivation problem. It is a structural one — and structure responds to specific, boring interventions.",
    keyTakeaways: [
      "Performance stalls are usually a compounding of three or four small structural problems, not one big one.",
      "The most durable fixes are unglamorous: clear priorities, short feedback loops, and a shared operating rhythm.",
      "Speed returns to an organisation faster than leaders expect once the compounding is unwound.",
    ],
    sections: [
      {
        id: "compounding",
        heading: "The compounding problem",
        paragraphs: [
          "When a chief executive tells us that their organisation has slowed down, we assume one of two things is happening. Either the organisation has genuinely taken on more than it can handle — in which case the answer is to do less — or, far more commonly, the organisation is carrying a small compounding of structural frictions that individually are tolerable and collectively are not.",
          "The difference matters. A true overload responds to reduced scope. A structural compounding responds only to structural changes, and no amount of motivational language, offsite meetings, or quarterly targets will substitute for them.",
        ],
      },
      {
        id: "structural-frictions",
        heading: "Three structural frictions we see repeatedly",
        paragraphs: [
          "The frictions are usually mundane. That is the point — they are easy to miss precisely because each one, in isolation, seems too small to matter. Collectively, they determine how fast the organisation can move.",
        ],
        list: [
          {
            label: "Unclear priorities",
            body: "If every initiative is urgent, none of them are. Teams that cannot name the two or three things that matter most this quarter will default to whichever request arrived most recently. The organisation's velocity becomes a function of its inbox.",
          },
          {
            label: "Missing feedback loops",
            body: "Work that is done without a short feedback loop drifts. Feedback loops do not need to be elaborate — a weekly review, a simple dashboard, a named reviewer. They need only to be close enough to the work that drift is caught before it compounds.",
          },
          {
            label: "Absence of a shared operating rhythm",
            body: "An operating rhythm is the small set of meetings, reviews, and decision forums that the organisation runs on. When the rhythm is ad hoc, every question becomes a custom coordination effort. When the rhythm is predictable, the coordination cost collapses.",
          },
        ],
        listType: "definition",
        pullQuote:
          "Speed is not a cultural variable. It is a design variable. Organisations that move quickly have, almost without exception, designed themselves to move quickly.",
      },
      {
        id: "intervention",
        heading: "What intervention looks like",
        paragraphs: [
          "Our engagements in this space are deliberately short. A typical performance diagnostic runs four to six weeks and produces three things: a written assessment of where the frictions actually sit, a sequenced set of interventions prioritised by effort and impact, and — if the client wants it — the deployed capacity to make the changes stick. That last piece, the deployed capacity, is what distinguishes an engagement that produces a report from an engagement that produces a result.",
          "Because our firm handles both advisory and outsourced manpower supply under one roof, the transition from diagnosis to deployment does not require a new procurement cycle or a second vendor. The people who help you diagnose the problem are the people who help you close it. That structural fact is usually the difference between a diagnosis that changes the company and one that becomes shelfware.",
        ],
      },
    ],
    tags: ["Productivity", "Operations", "Leadership", "Advisory"],
  },

  // ────────────────────────────────────────────────────────────────
  // 05
  // ────────────────────────────────────────────────────────────────
  {
    id: "manpower-accountable-owner",
    num: "05",
    title: "Why outsourced manpower needs an accountable owner",
    excerpt:
      "Deploying external talent without naming an internal owner is the fastest way to waste capacity. A short argument for single-threaded accountability on every outsourced engagement.",
    category: "manpower",
    categoryLabel: "Manpower",
    date: "February 21, 2026",
    readTime: "5 min read",
    author: "The Practice",
    heroSubtitle:
      "An outsourced team without a named internal owner is not a team. It is a parallel organisation — and parallel organisations produce parallel results.",
    keyTakeaways: [
      "Every outsourced engagement needs a named internal owner before any deployment begins.",
      "Full HR, payroll, and compliance handling sits with the outsourcing partner — but accountability for outcomes sits with the client.",
      "The right owner is senior enough to make decisions and close enough to the work to notice when something is drifting.",
    ],
    sections: [
      {
        id: "parallel",
        heading: "Parallel teams produce parallel results",
        paragraphs: [
          "We supply outsourced manpower for a living — qualified professionals, technical staff, and project teams deployed across industries, with full HR, payroll, and statutory compliance handled by our firm. We will happily mobilise at short notice, we operate twenty-four hours a day for clients who need it, and we consider it our job to make the administrative burden of outsourcing invisible to the client organisation.",
          "None of that, however, substitutes for a named internal owner on the client side. In mandates where no such owner exists, even our strongest deployments tend to drift — not because the people are any less capable, but because they are operating in parallel to the client organisation rather than inside it. Parallel teams produce parallel results: technically correct, practically disconnected.",
        ],
      },
      {
        id: "what-the-owner-does",
        heading: "What an owner actually does",
        paragraphs: [
          "The internal owner is not a project manager, though they often have project management somewhere in their remit. Their real role is to be the single-threaded point of accountability that connects the deployed team to the decisions that govern the work.",
        ],
        list: [
          {
            label: "They set direction",
            body: "The owner translates strategic intent into specific instructions that the deployed team can act on. Without this translation, the team is forced to infer priority from whichever stakeholder is speaking loudest that week.",
          },
          {
            label: "They unblock",
            body: "When the deployed team hits an internal obstacle — access, approvals, a missing input — the owner resolves it. The best owners treat unblocking as a daily responsibility, not an exception.",
          },
          {
            label: "They judge the work",
            body: "Someone has to say whether the output is good. The owner is that person. Deferring this judgement to the outsourcing partner is a failure mode we have seen end more engagements than any single technical problem.",
          },
        ],
        listType: "definition",
        pullQuote:
          "We can handle the payroll, the statutory filings, and the mobilisation. We cannot handle the internal accountability — and the engagements that forget this are the engagements that drift.",
      },
      {
        id: "our-half",
        heading: "What we handle on our side",
        paragraphs: [
          "Our side of the line is deliberately comprehensive. Statutory compliance — provident fund, ESIC, professional tax, shop and establishment coverage where applicable — is handled in full. Payroll runs on a published cycle with transparent reconciliation. On-boarding, background verification, and on-going performance management for the deployed team are our responsibility, not the client's. Support is available twenty-four hours a day, seven days a week, for mobilisation and operational issues.",
          "We provide the people, the compliance, and the administrative spine. We do not provide machinery or equipment; our service is manpower only. And we do not provide internal accountability on the client's behalf, because that one is structurally theirs to hold. The clearest engagements we run are the ones in which both sides understand this division — and name their owner before the first deployment day.",
        ],
      },
    ],
    tags: ["Manpower", "Governance", "Operations", "Advisory"],
  },

  // ────────────────────────────────────────────────────────────────
  // 06
  // ────────────────────────────────────────────────────────────────
  {
    id: "measurement-frameworks-wallpaper",
    num: "06",
    title: "Measurement frameworks that don't become wallpaper",
    excerpt:
      "Most KPI dashboards are consulted once, then forgotten. Three design principles that keep measurement systems alive inside an organization — and the one that matters most is rarely discussed.",
    category: "research",
    categoryLabel: "Research",
    date: "February 09, 2026",
    readTime: "9 min read",
    author: "The Practice",
    heroSubtitle:
      "A measurement system that no-one looks at is not a measurement system. It is wallpaper — and wallpaper is more expensive than it appears.",
    keyTakeaways: [
      "The test of a measurement framework is not whether it is comprehensive. It is whether anyone uses it to make a decision.",
      "Frameworks fail when they measure everything; they succeed when they measure the five or six things that actually drive the business.",
      "The under-discussed design principle: every metric needs a named owner and a named consequence.",
    ],
    sections: [
      {
        id: "wallpaper",
        heading: "A brief taxonomy of wallpaper",
        paragraphs: [
          "Walk into enough boardrooms and you will begin to recognise a particular kind of document — the measurement framework that was built two years ago, praised at the time as unusually thorough, and has since been looked at roughly once a quarter by the team that built it. It is exhaustive. It is well-formatted. It is wallpaper.",
          "Wallpaper is not free. It consumes the analyst time to produce, the management time to review, and — most expensively — the credibility of future measurement work. An organisation that has watched its last three dashboards become wallpaper will be slow to trust the fourth.",
        ],
      },
      {
        id: "three-principles",
        heading: "Three design principles",
        paragraphs: [
          "We do not claim that these three principles are novel. Two of them are broadly understood and intermittently practised. The third is the one we find almost nobody applies, and it is the one that matters most.",
        ],
        list: [
          {
            label: "Fewer metrics, higher confidence",
            body: "A framework that tracks forty metrics produces forty conversations, most of which are about data quality. A framework that tracks six metrics produces six conversations, all of which are about the business. The ratio is not linear; it is steep.",
          },
          {
            label: "Leading, not just lagging",
            body: "Most dashboards are dominated by lagging indicators — revenue, margin, headcount utilisation — because those are the numbers that audit easily. A useful framework balances them with leading indicators: decision latency, quote-to-close time, on-boarding completion within the first thirty days. Leading indicators tell you where the lagging ones are about to go.",
          },
          {
            label: "Every metric has a named owner and a named consequence",
            body: "This is the principle we rarely see applied. A metric without an owner is a metric nobody watches; a metric without a consequence is a metric whose movement changes nothing. When the number goes the wrong way, who specifically is responsible for moving it, and what specifically will happen if it does not? If the answer to either question is 'nobody' or 'nothing', the metric is wallpaper.",
          },
        ],
        listType: "definition",
        pullQuote:
          "A dashboard that no-one is accountable to is a dashboard that no-one will be accountable for. The framework is a mirror of the governance that surrounds it.",
      },
      {
        id: "rituals",
        heading: "The rituals around the data",
        paragraphs: [
          "The most elegant measurement framework in the world will atrophy if it is not built into a decision ritual. The ritual does not have to be elaborate — a weekly operations review of forty minutes, a monthly leadership review of two hours, a quarterly board session. What matters is that the framework appears in rooms where decisions are made, not in rooms where they are reported.",
          "This is the piece that most firms get wrong. They build the framework, hand it to a dashboard team, and assume that usage will follow. It does not. Usage follows only when the framework is the agenda — when the first slide of the operating review is the framework, and the second slide is what the framework changes. Everything else is decoration.",
        ],
      },
    ],
    tags: ["Measurement", "Governance", "Operations", "Strategy"],
  },

  // ────────────────────────────────────────────────────────────────
  // 07
  // ────────────────────────────────────────────────────────────────
  {
    id: "functional-features-businesses",
    num: "07",
    title: "Functional new features that enhance businesses",
    excerpt:
      "Operational features — the small, repeating routines that shape how work flows — often outrank strategy for near-term impact. Five that consistently compound across our mandates.",
    category: "research",
    categoryLabel: "Research",
    date: "January 28, 2026",
    readTime: "6 min read",
    author: "The Practice",
    heroSubtitle:
      "Strategy sets the direction; operational features determine how far you actually travel. A short catalogue of the ones that compound.",
    keyTakeaways: [
      "Small, repeating operational routines often matter more than large strategic moves for near-term performance.",
      "The most consistently valuable features we see are the least glamorous: weekly reviews, on-boarding discipline, exit interviews.",
      "Features compound. A firm that adopts three of these will outperform one that adopts a single bold initiative, by a wide margin over eighteen months.",
    ],
    sections: [
      {
        id: "five-features",
        heading: "Five features that compound",
        paragraphs: [
          "We use the word feature deliberately. A feature is not a strategy, a policy, or a values statement. It is a small, repeating operational routine — something the organisation does on a predictable cadence, with a predictable owner, and a predictable output.",
          "Features are undervalued because they look trivial in isolation and are invisible until they are missing. The five below are the ones we have seen produce outsized impact across our client mandates over the past several years.",
        ],
        list: [
          {
            label: "A weekly operating review",
            body: "Forty minutes, same time every week, same attendees, same format. Four numbers on the first slide; a short list of decisions required on the second. Teams that adopt this rhythm consistently report faster decision-making within a quarter.",
          },
          {
            label: "A disciplined first-thirty-day on-boarding protocol",
            body: "New joiners — whether permanent or deployed through outsourcing — either integrate within thirty days or begin to drift. A written on-boarding protocol, with daily checkpoints for the first two weeks, is one of the highest-leverage investments a function can make.",
          },
          {
            label: "Exit interviews that are actually read",
            body: "Exit data is one of the most under-exploited assets in most organisations. Interviews conducted by someone other than the departing employee's manager, collated quarterly, and read by the executive team — in that order — will surface more operating insight than most employee surveys.",
          },
          {
            label: "A written one-page strategy refresh each quarter",
            body: "One page. Signed by the chief executive. Circulated to the top thirty. This small feature forces the clarity that longer documents do not, and the act of writing it reveals ambiguities that would otherwise remain comfortable.",
          },
          {
            label: "A disciplined quarterly vendor and partner review",
            body: "Outsourced relationships drift without a scheduled review. Ninety minutes per quarter, per partner, with a consistent agenda, prevents the drift from turning into a replacement cycle. It is our own discipline on the partner side, and we ask our clients to hold us to it.",
          },
        ],
        listType: "definition",
        pullQuote:
          "The features that compound look small in any single week. They are the entire difference between a firm that moves and a firm that describes itself as moving.",
      },
      {
        id: "closing",
        heading: "On the arithmetic of compounding",
        paragraphs: [
          "A strategy, however bold, is typically a single event. A feature, by definition, happens every week or every quarter. The arithmetic is straightforward: a feature that produces one percent of improvement per week produces roughly sixty percent over a year. A strategy that produces ten percent of improvement, once, is visibly beaten within months. This is not an argument against strategy. It is an argument for taking features as seriously as strategies — because in the space of a single eighteen-month planning window, the features will almost always do more of the work.",
        ],
      },
    ],
    tags: ["Operations", "Productivity", "Governance", "Research"],
  },

  // ────────────────────────────────────────────────────────────────
  // 08
  // ────────────────────────────────────────────────────────────────
  {
    id: "apps-productivity",
    num: "08",
    title: "Apps that can help you with productivity",
    excerpt:
      "Tooling doesn't make teams productive on its own, but the right configuration can remove enough friction to unlock an extra gear. A curated view of the stack that consistently delivers.",
    category: "business",
    categoryLabel: "Business",
    date: "January 14, 2026",
    readTime: "5 min read",
    author: "The Practice",
    heroSubtitle:
      "Tooling does not make a team productive. But the wrong tooling can reliably make a team unproductive — and the distinction matters.",
    keyTakeaways: [
      "Tools do not create productivity; they remove friction from teams that are already disposed to be productive.",
      "The most reliable pattern is a small, opinionated stack — one tool per job, rigorously adopted — rather than a comprehensive one.",
      "Tool audits every eighteen months prevent the slow accumulation of overlapping software subscriptions.",
    ],
    sections: [
      {
        id: "what-tools-do",
        heading: "What tools actually do",
        paragraphs: [
          "We are cautious about recommending specific products because the landscape changes, and because the right tool is almost always a function of the organisation's existing stack, budget, and operational maturity. What we will recommend, without caveat, is a clearer way to think about tooling decisions.",
          "Tools do not make teams productive. They remove friction from teams that are already disposed to be productive, and they fail to remove friction — or create new friction — when they are adopted without corresponding changes in how the team works. A team that adopts a project management tool without adopting the underlying discipline of project management has not become productive; it has only given its existing habits a new interface.",
        ],
      },
      {
        id: "stack-principles",
        heading: "Three principles for a working stack",
        paragraphs: [
          "Rather than naming products, we will describe the three properties that distinguish the stacks we have seen work from the ones we have seen sprawl.",
        ],
        list: [
          {
            label: "One tool per job, rigorously",
            body: "A single document tool, a single communication tool, a single project tracker, a single HR system. Overlap is the enemy. When two tools do the same job, information fragments across both and nobody can find anything.",
          },
          {
            label: "Opinionated over comprehensive",
            body: "A tool that makes strong default choices — and forces the team to adopt them — outperforms a tool that can be configured to do anything. Configurability is where productivity goes to die.",
          },
          {
            label: "Reviewed on a calendar",
            body: "Every eighteen months, every software subscription in the stack is reviewed. Tools that are paid for but not used are cancelled. Tools that are used by fewer than sixty percent of their intended audience are investigated. This single practice typically returns ten to fifteen percent of the software budget.",
          },
        ],
        listType: "definition",
        pullQuote:
          "The productive stack is the small one. A long tool inventory is almost always a symptom of a long accumulation of unexamined decisions.",
      },
    ],
    tags: ["Productivity", "Operations", "Research"],
  },

  // ────────────────────────────────────────────────────────────────
  // 09
  // ────────────────────────────────────────────────────────────────
  {
    id: "contributing-to-initiatives",
    num: "09",
    title: "How we think about contributing to global initiatives",
    excerpt:
      "A short note on why consulting firms should take clear positions on initiatives beyond their clients — and how we think about the trade-off between independence and engagement.",
    category: "operations",
    categoryLabel: "Operations",
    date: "December 18, 2025",
    readTime: "7 min read",
    author: "The Practice",
    heroSubtitle:
      "A consulting firm that will not take a public position on anything its clients might disagree with is, practically, a firm without positions.",
    keyTakeaways: [
      "Independence is not the same as silence. A firm that refuses to take positions is not independent — it is disengaged.",
      "We take positions publicly on issues where our work gives us unusual visibility and refrain where it does not.",
      "Global initiatives are worth engaging with when they intersect the operating realities our clients live inside.",
    ],
    sections: [
      {
        id: "independence",
        heading: "Independence is not silence",
        paragraphs: [
          "A common posture among professional services firms is to say nothing publicly about anything that any of their clients might disagree with. This is sometimes described as independence. We do not think that is accurate. A firm that refuses to take positions is not independent; it is disengaged. Independence is the capacity to take a position that happens to be correct, even when a client would prefer that you did not. That is a different discipline.",
          "We have taken this stance deliberately. There are issues — around the governance of outsourced labour, around the practice of statutory compliance, around the responsibilities of firms that deploy people on behalf of other firms — where our daily work gives us unusual visibility into what is actually happening on the ground, and where we consider it our responsibility to say what we see.",
        ],
      },
      {
        id: "what-we-engage-with",
        heading: "What we engage with — and what we do not",
        paragraphs: [
          "The test we apply is narrow. We engage publicly with initiatives that intersect the operating realities our clients live inside. We refrain on the initiatives that do not, regardless of how topical they may be. This is not neutrality; it is an attempt to reserve our public voice for the places where it is informed rather than the places where it is merely available.",
        ],
        list: [
          {
            label: "Labour and compliance",
            body: "Because we run full HR, payroll, and statutory compliance for deployed manpower, we see the ground-level effect of regulatory change across multiple industries, often before it registers in the press. On these issues we will take positions, and we will take them specifically — naming the provisions that work and the ones that need revision.",
          },
          {
            label: "Operating model governance",
            body: "Governance practices — board composition, decision rights, the way firms structure accountability for outsourced work — are an area in which our engagements give us direct evidence. We share that evidence publicly when it is relevant.",
          },
          {
            label: "Subjects outside our daily work",
            body: "We do not take public positions on matters where our view is not materially more informed than a general reader's. That restraint is, in our opinion, part of the same discipline as speaking up where we are informed.",
          },
        ],
        listType: "definition",
        pullQuote:
          "To be useful to clients over the long run, a firm has to be willing to be publicly wrong on the occasions when it turns out, in retrospect, to have been publicly right.",
      },
      {
        id: "closing",
        heading: "A closing note",
        paragraphs: [
          "This is a posture, not a policy. It will be revised as our understanding of our own work and the initiatives around it deepens. If you find this note in the archive three years from now and the posture has shifted, that is the intended behaviour. The commitment is to continue to say what we actually think, within the range where our work makes our view worth having.",
        ],
      },
    ],
    tags: ["Advisory", "Governance", "Leadership", "Manpower"],
  },
];

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────

export function getPostBySlug(slug) {
  return posts.find((p) => p.id === slug) || null;
}

export function getRelatedPosts(slug, limit = 3) {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const sameCategory = posts.filter(
    (p) => p.id !== slug && p.category === current.category
  );
  const others = posts.filter(
    (p) => p.id !== slug && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getAdjacentPosts(slug) {
  const idx = posts.findIndex((p) => p.id === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}
