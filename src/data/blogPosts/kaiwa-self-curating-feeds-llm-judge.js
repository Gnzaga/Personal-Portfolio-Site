export default {
    "slug": "kaiwa-self-curating-feeds-llm-judge",
    "date": "March 2026",
    "title": "Self-Curating RSS Feeds with LLM-as-a-Judge",
    "summary": "Every self-hosted RSS aggregator eventually turns into a graveyard of dead and noisy feeds someone has to manually prune. I got tired of being that someone, so I automated it.",
    "paragraphs": [
      "Every self-hosted RSS aggregator I've ever run eventually turns into a graveyard: feeds that silently die, feeds that turn into aggregator spam, feeds that were fine a year ago and aren't anymore. Someone has to notice and prune them. I got tired of being that someone, so I built a system that curates its own feed list.",
      "The core of it is a discovery agent that runs every four hours and finds new candidate feeds on its own, using web search rather than a hand-maintained list. It builds search queries from the regions and topics I care about, plus whatever stories are actively \"hot\" in the correlation engine at the time.",
      "Discovery works like this: search results get fetched with a headless browser, an LLM reads the page and extracts the actual RSS/Atom endpoint (most sites don't expose this obviously), and candidates get validated and deduplicated against what's already registered before being added — capped at a handful of new feeds per cycle so the system can't runaway-grow.",
      "New feeds don't go straight into production. They start in a trial state, and a weekly LLM-as-a-Judge pass scores every trial feed still active on four weighted criteria — relevance to what I actually track, internal consistency, writing fluency, and conciseness. Score high enough and a feed graduates to production automatically; score too low and it's blacklisted, no human review required either way.",
      "The part I think about the most is isolation: trial feeds are explicitly filtered out of the correlation engine before their articles ever reach signal processing. An unvetted source can influence nothing until it's proven itself.",
      "Production feeds aren't exempt from scrutiny either. A monthly audit checks error rates and consecutive failures on every source already in production, and repeat offenders get circuit-broken into a cooldown state.",
      "There's also a blind-spot detector that runs independently of all this: it tracks article volume per region against an expected baseline, and if a region's coverage quietly drops and stays down, it has an LLM generate an actual research directive describing what kind of source is likely missing.",
      "Cost control mattered here, so the whole thing runs on a two-tier LLM setup: a fast, cheap model handles the routine, high-volume work, while a stronger model is reserved for the harder reasoning task.",
      "The broader takeaway generalizes past RSS feeds: automating curation doesn't have to mean giving up quality control. The trick is isolating anything unvetted from anything that matters until it's earned trust, and building in a scoring threshold instead of a binary human gate.",
      "It's a small subsystem next to the rest of the platform, but it's the one that's made the most day-to-day difference: I genuinely don't think about feed hygiene anymore."
    ],
    "tags": [
        { label: "AI", url: "/projects?filter=AI" },
        { label: "Python", url: "/projects?filter=Python" },
        { label: "Kubernetes", url: "/projects?filter=Kubernetes" }
    ],
    "images": [],
    "links": []
};
