export default {
    "slug": "kaiwa-self-curating-feeds-llm-judge",
    "date": "March 2026",
    "title": "Self-Curating RSS Feeds with LLM-as-a-Judge",
    "summary": "Every self-hosted RSS aggregator eventually turns into a graveyard of dead and noisy feeds someone has to manually prune. I got tired of being that someone, so I automated it.",
    "paragraphs": [
      "Every self-hosted RSS aggregator I've run eventually turns into a graveyard, feeds that quietly die or turn into aggregator spam. Someone has to prune them. I got tired of being that someone, so I built a system that curates its own feed list.",
      "At the core is a discovery agent that runs every four hours and finds new candidate feeds on its own using web search, no hand-maintained list, building queries from the regions and topics I care about plus whatever's actively \"hot\" in the correlation engine. Search results get pulled with a headless browser, an LLM reads the page and pulls out the actual RSS/Atom endpoint, and candidates get validated and deduped against what's already registered, capped at a handful of new feeds per cycle so it can't grow unchecked.",
      "New feeds don't go straight into production, they sit in a trial state, and a weekly LLM-as-a-Judge pass scores every active trial feed on four weighted criteria: relevance, internal consistency, writing fluency, conciseness. Score high enough and it graduates automatically, too low and it's blacklisted, no human review either way.",
      "Isolation is the part that matters. Trial feeds are filtered out of the correlation engine entirely, so their articles never reach signal processing. An unvetted source can't influence anything until it's proven itself.",
      "Production feeds don't get a free pass either: a monthly audit checks error rates and consecutive failures on everything live and circuit-breaks repeat offenders into a cooldown. There's also a blind-spot detector, tracking article volume per region against a baseline. If a region's coverage drops and stays down, it has an LLM write a research directive describing what's probably missing.",
      "Cost mattered, so the whole thing runs two-tier: a cheap, fast model for routine high-volume work, a stronger one saved for harder reasoning.",
      "It's a small subsystem next to the rest of the platform, but it's made the biggest day-to-day difference of anything I've built. I genuinely don't think about feed hygiene anymore."
    ],
    "tags": [
        { label: "AI", url: "/projects?filter=AI" },
        { label: "Python", url: "/projects?filter=Python" },
        { label: "Kubernetes", url: "/projects?filter=Kubernetes" }
    ],
    "images": [],
    "links": []
};
