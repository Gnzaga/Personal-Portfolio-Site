export default {
    "slug": "debugging-postgres-crash-recovery-slow-nfs",
    "date": "June 3, 2026",
    "title": "How I Debug Infrastructure: Postgres Crash Recovery vs. Slow NFS",
    "summary": "A database crash loop that looked identical to a past incident turned out to have a totally different cause: synchronous NFS turning WAL replay into a race against the liveness probe.",
    "paragraphs": [
      "A self-hosted service I run went down. The database pod was stuck in a hard restart loop, up, crash, up, crash, every thirty seconds. I'd seen this symptom before, so I reached for the fix that worked last time.",
      "Wrong instinct. Last time it was a stale lock file from an unclean shutdown, a five-minute fix. This time the lock file wasn't the problem. Same symptom, different disease.",
      "The pod logs showed Postgres wasn't refusing to start, it was replaying its write-ahead log, doing normal crash recovery, and getting killed by the liveness probe partway through. The question became why recovery was taking longer than the probe would allow.",
      "Turned out the storage sat on an NFS-backed volume set up for synchronous writes, so every disk flush during WAL replay became a network round-trip needing acknowledgment. On local disk that's milliseconds, over synchronous NFS it stretched into minutes, well past what the probe would tolerate. Separately, some force-deleted pods had left stale NFS mounts on two worker nodes, blocking the volume until I restarted the kubelet there and the NFS server itself.",
      "Two problems wearing one crash loop: stale mounts blocking the volume, and synchronous NFS making recovery too slow for the probe. Fix only one and it keeps crash-looping for a different reason.",
      "Clearing the stale mounts let the pod schedule and start recovery. Extending the probe timeout bought some room but wasn't enough, the recovery checkpoint still couldn't finish before the probe gave up, so I forced a clean restart against the data files instead of waiting it out, accepting the small risk of losing whatever hadn't been durably committed. It worked immediately, Postgres came up clean within seconds and the dependent service reconnected about a minute later.",
      "The real fix isn't \"don't crash the database,\" it's tuning the liveness probe for the storage it's running on: a recovery grace period measured in minutes, not whatever assumes local disk. It's also got me questioning synchronous NFS for stateful workloads generally.",
      "Mostly a reminder that a crash loop is a symptom, not a diagnosis, even when it looks like something I'd already fixed. I should've read what the process was doing before assuming I knew."
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
