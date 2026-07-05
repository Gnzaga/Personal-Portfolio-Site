export default {
    "slug": "matrix-auth-delegation-authentik-mas-msc3861",
    "date": "May 12, 2026",
    "title": "Delegating Matrix Auth to Authentik with MAS and MSC3861",
    "summary": "How I delegated authentication for a self-hosted Matrix chat server to my existing identity provider using matrix-authentication-service — and the redirect loops, scope denials, and claims-mapping bugs it took to get there.",
    "paragraphs": [
      "I run most of my homelab behind a single identity provider — one login, one set of credentials, MFA everywhere. So when I stood up a self-hosted Matrix chat server, the one thing I wasn't willing to accept was yet another standalone password. This is the story of wiring Matrix into my existing single sign-on, and everything that broke along the way.",
      "The chat server itself had actually been running for a while on Dendrite, a lighter-weight Matrix homeserver implementation. I migrated it to Synapse, mainly for broader client compatibility and because Synapse had a clearer path to native OIDC delegation.",
      "That \"native OIDC delegation\" path is a relatively new piece of the Matrix spec (MSC3861), and it works through a companion service called matrix-authentication-service, or MAS. Instead of the homeserver talking to an identity provider directly, MAS sits in between: the homeserver delegates all authentication decisions to MAS, and MAS itself federates out to an upstream OIDC provider — in my case, Authentik.",
      "Getting the first version working meant registering a new OIDC application in Authentik, standing up MAS with its own database, and wiring the homeserver's config to point at MAS via MSC3861 instead of managing accounts locally.",
      "In practice, the native delegation flow assumes the client knows how to speak that flow. The Element Web client version I was running didn't yet support the MSC3861 native SSO redirect, so logins would silently fail at exactly the step where the client was supposed to hand off to MAS. Rather than wait on a client upgrade, I fell back to the traditional relying-party pattern — a good reminder that a \"better\" spec doesn't help if the client in the loop hasn't caught up yet.",
      "The next problem showed up as an infinite redirect loop on login. The root cause turned out to be upstream of anything Matrix-related: my CDN was connecting to my reverse proxy over plain HTTP (its \"flexible\" TLS mode), so the app behind the proxy only ever saw an insecure request and kept trying to force a redirect to HTTPS — which the CDN would then re-terminate and hand back over HTTP again, forever. The fix was a single header: forcing the reverse proxy to tell the app the original request had, in fact, arrived over HTTPS.",
      "Once login itself worked, the chat client would authenticate fine but come back with a permissions error. MAS ships with a policy engine — a small WebAssembly module written against Open Policy Agent — that decides which OAuth scopes a client is allowed to request. The default policy only allowed the bare minimum, but the chat homeserver was requesting an additional scope and getting flatly denied. The fix meant writing and compiling a custom policy that explicitly allowed it.",
      "Scopes granted, the next bug was in the claims themselves. I'd assumed the identity provider's userinfo response would include a display name the way most OIDC providers do, and mapped the chat server's username generation off of that. It turned out the delegation layer's userinfo endpoint only returns a bare username claim, so every new login was generating a mangled username until I rewrote the mapping template.",
      "Even after all of that was stable, the integration broke once more in production — this time from drift rather than a new bug. A scaling or rollback event had quietly zeroed out the delegation service's replicas and stripped the delegation config, causing a full authentication outage. The lasting fix wasn't just restoring service — it was moving all of the delegation configuration into version control so a dropped config block shows up as a diff instead of a mystery outage.",
      "The bigger lesson, past the specific bugs: delegated auth chains are only as strong as their weakest hop, and every hop — proxy, delegation service, identity provider, client — needs to agree on the same assumptions about scopes, claims, and even something as basic as which protocol the request arrived over."
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
