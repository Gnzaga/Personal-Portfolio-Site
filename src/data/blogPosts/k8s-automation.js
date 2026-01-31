// src/data/blogPosts/k8s-automation.js
const project = {
    slug: "kubernetes-automation-pipeline",
    date: "January 30, 2026",
    title: "Building an Enterprise GitOps Pipeline on Talos Kubernetes",
    summary: "I implemented a fully automated CI/CD pipeline that handles everything from code commit to production deployment using Tekton and ArgoCD.",
    paragraphs: [
        `I implemented a fully automated CI/CD pipeline that handles everything from code commit to production deployment. By leveraging Tekton and ArgoCD, I created a "hands-off" workflow for my portfolio and other microservices.`,
        `One of the key challenges was ensuring environment parity. I developed a generic Tekton pipeline that dynamically tags images based on the git branch, pushing to 'dev' triggers a staging build, while 'master' handles production.`,
        `The stack is entirely self-hosted, including a private Harbor registry and HashiCorp Vault for secret management, ensuring complete data sovereignty and security.`
    ],
    tags: [
        { label: "Kubernetes", url: "/projects?filter=Kubernetes" },
        { label: "GitOps", url: "/projects" },
        { label: "Tekton", url: "/projects" }
    ],
    images: [
        // {
        //     url: "/res/projects/pipeline-diagram.png", 
        //     alt: "Tekton and ArgoCD Workflow Diagram"
        // }
    ],
    links: [
        {
            label: "View Pipeline Configs",
            url: "https://github.com/Gnzaga/homelab-tekton-pipelines"
        }
    ]
};

export default project;
