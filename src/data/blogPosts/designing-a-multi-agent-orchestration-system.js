export default {
    "slug": "designing-a-multi-agent-orchestration-system",
    "date": "May 2026",
    "title": "Designing a Multi-Agent Orchestration System",
    "summary": "How a coding agent framework plans multi-step engineering work as a task DAG, dispatches specialized subagents against it, and stays safe with human approval gates between phases.",
    "paragraphs": [
      "A single AI model working through one long conversation is a fine coding assistant for small, well-scoped tasks. It falls apart on anything bigger: a task that spans infrastructure, a database migration, and a frontend change all at once, where requirements need clarifying before any code should be written, and where a single wrong turn early on compounds silently through everything downstream. The interesting engineering problem isn't making the model smarter — it's designing the process around it.",
      "The system I built treats this like an engineering manager would treat a project: plan first, delegate the pieces, review before moving on, and stop at defined points to check in. That shows up as three linked ideas — an interview-driven planning phase, a dependency-graph representation of the approved work, and a dispatch layer that routes each piece of the graph to a specialist.",
      "Planning as an interview, not a prompt. Most agent failures I ran into didn't come from bad code — they came from the agent guessing at intent it was never actually given. So planning starts as a structured interview: one question at a time, starting broad and narrowing to specifics, with the agent proposing a recommended answer and its reasoning at each step. The interview doesn't end until every branch of the decision tree is explicitly resolved.",
      "That interview produces a small set of durable artifacts: a requirements spec, an architecture document, per-domain context files, and — the part that matters most for execution — a task DAG. Approval is a hard gate: every artifact has to exist and validate before anything is allowed to run.",
      "The DAG, and why numeric prefixes turned out to be enough. Task decomposition needed a dependency representation simple enough for an agent to both write correctly and reason about at dispatch time. The convention that worked: task directories get a numeric prefix, tasks sharing a prefix are safe to run in parallel, and a higher-numbered task depends on every lower-numbered one completing first.",
      "Dispatch modes: parallel, chained, and async. Each task in the DAG names the specialized agent that should execute it — infrastructure, database, API, frontend, containerization — and the dispatch layer supports a handful of modes to match how those tasks actually relate to each other.",
      "Gates: where the system chooses to stop and ask. The DAG has designated checkpoints — entry, exit, and per-phase gates — pausing the pipeline until a human says to continue. If a task fails outright, the response is bounded: retry once, adjust and retry once more, or escalate to a human with a diagnosis — never a silent retry loop.",
      "What accumulates, and what doesn't. Knowledge captured during execution was disappearing at the end of every session on the first pass. The fix was a two-tier capture model — agents log raw learnings while they work, and after the plan completes those notes get consolidated into a structured, domain-organized knowledge base that the next planning cycle reads from before it even starts interviewing.",
      "The overall lesson: the hard part of multi-agent systems isn't the agents. Every piece of this is in service of one goal — making a multi-step, multi-agent process legible enough that a human can trust it with real infrastructure work. The bottleneck was always process design, not model capability."
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
