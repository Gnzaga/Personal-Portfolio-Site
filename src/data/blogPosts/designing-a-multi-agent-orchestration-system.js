export default {
    "slug": "designing-a-multi-agent-orchestration-system",
    "date": "May 2026",
    "title": "Designing a Multi-Agent Orchestration System",
    "summary": "How I got a coding agent to plan multi-step engineering work as a task DAG, dispatch specialized subagents against it, and stay safe with human approval gates in between.",
    "paragraphs": [
      "A single model working through one long conversation is fine for small, well-scoped coding tasks. It falls apart on anything bigger, something spanning infrastructure, a database migration, and a frontend change at once, where requirements need clarifying and one wrong turn early on wrecks everything downstream. The problem I cared about wasn't making the model smarter, it was designing the process around it.",
      "So I built the system the way an engineering manager runs a project: plan first, delegate the pieces, review before moving on, stop at defined points to check in. Three things working together, an interview-driven planning phase, a dependency graph for the approved work, and a dispatch layer routing each piece to a specialist agent.",
      "Most of the agent failures I hit early on weren't bad code, they were the agent guessing at intent nobody gave it. Planning starts as a structured interview now: one question at a time, broad to specific, the agent proposing its own recommended answer at each step, until every branch of the decision tree is resolved.",
      "Out of that comes a few durable artifacts: a requirements spec, architecture document, per-domain context files, and, the one that matters most, a task DAG. Approval is a hard gate, every artifact has to exist and validate before anything runs.",
      "Getting the DAG representation right took a few tries. What worked was almost embarrassingly simple: task directories get a numeric prefix, tasks sharing a prefix run in parallel, a higher-numbered task waits on every lower-numbered one finishing first.",
      "Each task names the specialized agent that should run it, infrastructure, database, API, frontend, containerization, and dispatch supports a few modes, parallel, chained, async, depending on how tasks relate. The DAG has checkpoints too, entry, exit, per-phase gates, pausing the pipeline until a human says continue. If a task fails outright the response is bounded: retry once, adjust and retry once more, then escalate with a diagnosis, never a silent retry loop.",
      "One thing I got wrong on the first pass: knowledge captured during execution just disappeared at session end. Fixed with a two-tier model, agents log raw learnings while working, and once the plan finishes those notes get consolidated into a knowledge base the next planning cycle reads before it starts interviewing.",
      "Looking back, almost none of this was about model capability. It was process design, making a multi-agent system I'd actually trust with real infrastructure work."
    ],
    "tags": [
        { label: "AI", url: "/projects?filter=AI" },
        { label: "LLM Agents", url: "/projects?filter=LLM Agents" },
        { label: "Software Architecture", url: "/projects?filter=Software Architecture" },
        { label: "Automation", url: "/projects?filter=Automation" }
    ],
    "images": [],
    "links": []
};
