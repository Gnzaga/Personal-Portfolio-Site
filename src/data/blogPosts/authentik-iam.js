// src/data/blogPosts/authentik-iam.js
const project = {
    slug: "unified-iam-authentik",
    date: "January 3, 2026",
    title: "One Login to Rule Them All: Unified IAM with Authentik",
    summary: "Managing passwords for 20+ self-hosted services is a security nightmare. I solved this by deploying Authentik as a central Identity Provider.",
    paragraphs: [
        `Managing passwords for 20+ self-hosted services is a security nightmare. I solved this by deploying Authentik as a central Identity Provider, creating a seamless SSO experience across my entire infrastructure.`,
        `The real power of this deployment lies in the Kubernetes integration. Using OIDC and custom RBAC bindings, my Authentik group memberships (like 'Admins' or 'Devs') automatically grant the corresponding permissions within the Kubernetes cluster itself.`,
        `From securing my AI models in OpenWebUI to protecting my private container images in Harbor, every request is now gated by a unified authentication flow that includes MFA and centralized audit logging.`
    ],
    tags: [
        { label: "Kubernetes", url: "/projects?filter=Kubernetes" },
        { label: "Security", url: "/projects" },
        { label: "OIDC", url: "/projects" }
    ],
    images: [
        // {
        //     url: "/res/projects/authentik-dashboard.png",
        //     alt: "Authentik Admin Dashboard showing integrated applications"
        // }
    ],
    links: [
        {
            label: "Authentik Project Home",
            url: "https://goauthentik.io/"
        }
    ]
};

export default project;
