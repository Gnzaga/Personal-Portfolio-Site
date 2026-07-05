export default {
    "slug": "debugging-postgres-crash-recovery-slow-nfs",
    "date": "June 3, 2026",
    "title": "How I Debug Infrastructure: Postgres Crash Recovery vs. Slow NFS",
    "summary": "A database crash loop that looked identical to a past incident turned out to have a completely different root cause — synchronous NFS turning WAL replay into a race against the liveness probe.",
    "paragraphs": [
      "A self-hosted service I run went down, and the database pod behind it was stuck in a hard restart loop — up, crash, up, crash, every thirty seconds. I'd seen this exact symptom before on this same service, so my first move was to reach for the fix that had worked last time.",
      "That instinct was wrong. The earlier incident had been a stale lock file left behind by an unclean shutdown — a five-minute fix. This time the lock file wasn't the problem. Same symptom, different disease.",
      "Watching the pod logs directly showed Postgres wasn't refusing to start — it was actively replaying its write-ahead log, doing normal crash recovery, and getting killed by the liveness probe partway through, every single time. That reframed the question from \"why won't it start\" to \"why is crash recovery taking longer than my probe timeout allows.\"",
      "The database's storage lived on an NFS-backed volume configured for synchronous writes — every disk flush during WAL replay became a network round-trip that had to be acknowledged before the next step could proceed. On local disk that's milliseconds; over synchronous NFS, replaying a real backlog of WAL segments stretched into minutes, past the probe's patience. Separately, some previously force-deleted pods had left stale NFS mounts behind on two worker nodes, blocking the volume from mounting cleanly until I restarted the kubelet on those nodes and the NFS server itself.",
      "So there were two independent problems wearing the same crash loop as a costume: an infrastructure-level one (stale mounts blocking the volume) and a performance-level one (synchronous NFS making recovery too slow for the probe). Fixing only one would have left the pod crash-looping for a different reason.",
      "I cleared the stale mounts first, which let the pod schedule and start recovery at all. Extending the liveness probe timeout bought some room but wasn't enough on its own — the recovery checkpoint at the end of WAL replay still couldn't complete before the probe's patience ran out. At that point I made the call to force a clean restart of Postgres directly against the data files rather than continue waiting, accepting the small risk of losing whatever transactions hadn't been durably committed yet.",
      "That worked immediately — Postgres came up clean within seconds, and the dependent service reconnected within about a minute.",
      "The fix that actually prevents a repeat isn't just \"don't crash the database.\" It's tuning the liveness probe for the storage backend it's actually running on — a database on network storage needs a recovery grace period measured in minutes, not the default tuned for local disks — and it's prompted a longer look at whether synchronous NFS is the right choice for stateful workloads at all.",
      "The broader takeaway: a crash loop is a symptom, not a diagnosis, even when it looks exactly like an incident you've already solved. Reading what the process is actually doing when it dies — not just that it died — is what separates \"apply yesterday's fix\" from finding the actual root cause."
    ],
    "tags": [
        { label: "Homelab", url: "/projects?filter=Homelab" },
        { label: "PostgreSQL", url: "/projects?filter=PostgreSQL" },
        { label: "Kubernetes", url: "/projects?filter=Kubernetes" },
        { label: "Debugging", url: "/projects?filter=Debugging" },
        { label: "NFS", url: "/projects?filter=NFS" }
    ],
    "images": [],
    "links": []
};
