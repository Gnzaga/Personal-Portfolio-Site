export default {
    "slug": "homelab-architecture-modernization-five-phase-plan",
    "date": "July 8, 2026",
    "title": "Homelab Architecture Modernization: A Five-Phase Plan",
    "summary": "A full audit of my homelab Kubernetes platform turned up IP-pool drift, silently-failing SSO integrations, and a CNI that wasn't enforcing policies — here's the five-phase plan to fix it, including one fix I had to revert.",
    "paragraphs": [
      "Homelab infrastructure has a way of accreting decisions — a load balancer IP grabbed in a hurry, a storage class created for one workload that becomes the default for everything, an ingress pattern that seemed fine until there were three of them. Enough of that had piled up that I set aside time to do a full architecture audit and turn what I found into a formal, phased modernization plan.",
      "The audit covered three layers: how traffic gets from the public internet into the cluster, the local network topology, and the internal Kubernetes services themselves — ingress, storage, secrets, and the CNI. The result was a five-phase plan: ingress consolidation, storage-class cleanup, a CNI migration, network/DNS cleanup, and finally network segmentation.",
      "Phase 0 was immediate triage, done the same day as the audit. Five services were flat-out redundant or broken — an old RSS reader superseded by a replacement, a wiki tool stuck in a multi-thousand-restart crash loop, a database that only existed to serve decommissioned apps, and an orphaned Service with zero live endpoints. Deleting them freed up load-balancer IPs and let GitOps reconcile cleanly.",
      "The most interesting Phase 0 find was a load-balancer IP pool that had quietly desynced from its own source of truth. Fifteen services were running on IPs outside the range defined in the git-tracked config — meaning re-applying that config from git would have yanked IPs out from under a third of my running services.",
      "A second Phase 0 fix: several apps had SSO logins failing silently because their OIDC client secrets had never been written to the secrets store when the identity-provider side was configured. Backfilling the secrets and confirming each one synced cleared it up, and it's now a checklist item for onboarding any new SSO client.",
      "Stepping back, the audit surfaced structural problems Phase 0 couldn't touch: over fifty LoadBalancer-type services competing for a nearly exhausted IP range, three different ingress patterns in simultaneous use, about ten storage classes where four would do, and — the big one — a CNI that wasn't enforcing any of the network policies I'd already written. They'd been silently doing nothing.",
      "Phase 1 tackles ingress: deploy certificate automation with a proper wildcard certificate, evaluate a tunnel-based ingress path, and consolidate everything onto one ingress controller's native routing objects. Phase 2 is a storage audit collapsing ten ad-hoc storage classes down to four real tiers. Phase 3 is the CNI migration to one that actually enforces network policies.",
      "Phase 0 also included one attempt that didn't survive contact with reality: I tried to fix internal DNS so pods calling internal services by their public hostname would resolve straight to the internal address instead of round-tripping through the edge proxy — a classic hairpin-routing fix. It broke immediately: internal services present self-signed or cluster-issued certificates, not the publicly-trusted certificate my CDN terminates for external traffic, so anything doing certificate verification failed the moment it hit an internal IP directly.",
      "I reverted it the same day. The honest lesson is that I'd tried to skip a phase: split-horizon DNS is only safe once there's a proper wildcard certificate available internally too, which is a Phase 1 deliverable, not a Phase 0 one. Phase ordering in a plan like this usually isn't arbitrary.",
      "As of now, Phase 0 is complete and phases 1 through 5 are scoped but not yet started. The plan itself — with explicit dependencies between phases instead of a backlog of unrelated tickets — has already paid for itself once, by catching the DNS attempt before it turned into a longer outage."
    ],
    "tags": [
        { label: "Homelab", url: "/projects?filter=Homelab" },
        { label: "Kubernetes", url: "/projects?filter=Kubernetes" },
        { label: "Networking", url: "/projects?filter=Networking" },
        { label: "Infrastructure", url: "/projects?filter=Infrastructure" },
        { label: "Platform Engineering", url: "/projects?filter=Platform Engineering" }
    ],
    "images": [],
    "links": []
};
