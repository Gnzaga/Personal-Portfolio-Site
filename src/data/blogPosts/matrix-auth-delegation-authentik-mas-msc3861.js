export default {
    "slug": "matrix-auth-delegation-authentik-mas-msc3861",
    "date": "May 12, 2026",
    "title": "Delegating Matrix Auth to Authentik with MAS and MSC3861",
    "summary": "How I delegated auth for a self-hosted Matrix server to my existing identity provider using matrix-authentication-service, and the redirect loops, scope denials, and claims-mapping bugs it took to get there.",
    "paragraphs": [
      "I run most of my homelab behind a single identity provider, one login, MFA everywhere. So when I stood up a self-hosted Matrix chat server, I wasn't willing to accept another standalone password.",
      "The chat server had been running on Dendrite, a lighter Matrix homeserver. I migrated it to Synapse, mostly for broader client compatibility and a clearer path to native OIDC delegation.",
      "That native delegation path is a fairly new piece of the Matrix spec (MSC3861), working through a companion service called matrix-authentication-service, MAS for short: the homeserver delegates auth decisions to MAS instead of talking to an identity provider directly, and MAS federates out to Authentik, my OIDC provider.",
      "Getting a first version working meant registering a new OIDC application in Authentik, standing up MAS with its own database, and pointing the homeserver's config at MAS via MSC3861 instead of managing accounts locally.",
      "First snag: the native delegation flow assumes the client knows how to speak it. Element Web didn't yet support the MSC3861 native SSO redirect, so logins silently failed right at the handoff to MAS. I fell back to the older relying-party pattern rather than wait on a client upgrade, a reminder specs don't help until the client catches up.",
      "Next was an infinite redirect loop on login. Root cause was upstream of Matrix: my CDN was talking to my reverse proxy over plain HTTP (its \"flexible\" TLS mode), so the app only saw an insecure request and kept forcing a redirect to HTTPS, which the CDN re-terminated and handed back over HTTP again, forever. Fixed with one header telling the proxy the request had arrived over HTTPS.",
      "With login working, the client authenticated fine, then came back with a permissions error. MAS ships with a policy engine, a small WASM module written against Open Policy Agent, deciding which OAuth scopes a client can request. The default policy only allowed the bare minimum, and the homeserver's extra scope got flatly denied. Fix meant writing and compiling a custom policy to allow it.",
      "Scopes sorted, the next bug was in the claims. I'd assumed the userinfo response would include a display name like most OIDC providers give you, and built username generation off that. It only returns a bare username claim, so every login generated a mangled username until I rewrote the mapping template.",
      "Even after that stabilized, it broke once more in production, this time from drift instead of a new bug. A scaling or rollback event zeroed out the delegation service's replicas and stripped its config, taking down auth entirely. The real fix was moving the delegation config into version control so a dropped block shows up as a diff instead of a mystery outage.",
      "Every one of these bugs lived at a different hop: client, CDN, policy engine, claims mapping, deployment itself. Nothing about delegated auth is hard in theory. Getting every hop to agree in practice is what took the time."
    ],
    "tags": [
        { label: "Matrix", url: "/projects?filter=Matrix" },
        { label: "Synapse", url: "/projects?filter=Synapse" },
        { label: "OIDC", url: "/projects?filter=OIDC" },
        { label: "Authentik", url: "/projects?filter=Authentik" },
        { label: "Self-Hosting", url: "/projects?filter=Self-Hosting" },
        { label: "Homelab", url: "/projects?filter=Homelab" }
    ],
    "images": [],
    "links": []
};
