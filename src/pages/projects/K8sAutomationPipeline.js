import React from 'react';
import { faServer, faCogs, faShieldAlt, faCodeBranch, faRocket, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import Section from '../../components/ProjectSection';
import { CaseStudyHeader, CaseStudyFooter } from '../../components/CaseStudy';

const K8sAutomationPipeline = () => {
  return (
    <article className="w-full max-w-3xl">
      <CaseStudyHeader slug="k8s-automation" />

      <Section title="Overview" icon={faRocket}>
        <p className="mb-4">
          A robust, event-driven CI/CD infrastructure designed to orchestrate containerized deployments
          across multiple environments using a GitOps methodology. This engine powers the automated delivery
          of microservices directly to a bare-metal Kubernetes cluster.
        </p>
      </Section>

      <Section title="The Architecture" icon={faServer}>
        <ul className="list-disc list-inside space-y-3 marker:text-accent">
          <li><strong>Infrastructure:</strong> Bare-metal Kubernetes running <span className="text-accent">Talos Linux</span> for a secure, immutable OS footprint.</li>
          <li><strong>CI Engine:</strong> <span className="text-accent">Tekton Pipelines</span> for cloud-native automation and scalable task execution.</li>
          <li><strong>Artifact Management:</strong> <span className="text-accent">Harbor Registry</span> with integrated Trivy vulnerability scanning.</li>
          <li><strong>CD Controller:</strong> <span className="text-accent">ArgoCD</span> implementing GitOps by synchronizing cluster state with Kustomize manifests.</li>
          <li><strong>Build Tech:</strong> <span className="text-accent">Kaniko</span> for daemonless, rootless container builds within the cluster.</li>
          <li><strong>Secrets:</strong> <span className="text-accent">HashiCorp Vault</span> via External Secrets Operator for zero-trust credential injection.</li>
        </ul>
      </Section>

      <Section title="How it Works" icon={faCogs}>
        <div className="space-y-4">
          <div className="bg-surface p-4 rounded-sm border border-rule">
            <h4 className="text-accent font-semibold mb-2">1. Event Detection</h4>
            <p className="text-sm">GitHub webhooks notify a Tekton EventListener exposed via a LoadBalancer. The webhook secret is verified at ingress using a token pulled from HashiCorp Vault via the External Secrets Operator, ensuring only authenticated push events trigger the pipeline.</p>
          </div>
          <div className="bg-surface p-4 rounded-sm border border-rule">
            <h4 className="text-accent font-semibold mb-2">2. Logic Branching</h4>
            <p className="text-sm">CEL-based interceptors evaluate push events, routing to branch-specific triggers. Pushes to <span className="text-accent">master</span> map to the Production environment (3 replicas), while pushes to <span className="text-[#7A4F00] dark:text-amber-300">dev</span> map to the Staging environment (1 replica).</p>
          </div>
          <div className="bg-surface p-4 rounded-sm border border-rule">
            <h4 className="text-accent font-semibold mb-2">3. Secure Build & Push</h4>
            <p className="text-sm">Pipelines clone the repo and build via <span className="text-accent">Kaniko</span>, running rootless in-cluster with an NFS-backed workspace for build context. Each successful build produces a dual-tag push to Harbor: a mutable branch tag (e.g., <code className="text-accent bg-surface px-1 rounded">latest</code> or <code className="text-[#7A4F00] dark:text-amber-300 bg-surface px-1 rounded">dev</code>) for easy rollout targeting, and an immutable commit SHA tag for precise auditability and rollback.</p>
          </div>
          <div className="bg-surface p-4 rounded-sm border border-rule">
            <h4 className="text-accent font-semibold mb-2">4. GitOps Sync</h4>
            <p className="text-sm">ArgoCD detects the new artifact and synchronizes the deployment automatically across the cluster. Auto-sync is configured with <span className="text-accent">prune: true</span> and <span className="text-accent">selfHeal: true</span> policies, ensuring the live cluster always converges to the desired state defined in Git.</p>
          </div>
        </div>
      </Section>

      <Section title="Configured Pipelines" icon={faCodeBranch}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface p-4 rounded-sm border border-rule">
            <h4 className="text-accent font-semibold mb-1">Portfolio &rarr; master</h4>
            <p className="text-xs text-muted mb-2">Repo: <span className="text-ink">gnzaga/Personal-Portfolio-Site</span></p>
            <ul className="text-sm space-y-1">
              <li><span className="text-muted">Branch:</span> <span className="text-accent">master</span></li>
              <li><span className="text-muted">Image tag:</span> <code className="text-accent bg-surface px-1 rounded">latest</code> + commit SHA</li>
              <li><span className="text-muted">Deploys to:</span> <span className="text-ink">portfolio</span> namespace</li>
              <li><span className="text-muted">Replicas:</span> 3</li>
            </ul>
          </div>
          <div className="bg-surface p-4 rounded-sm border border-rule">
            <h4 className="text-accent font-semibold mb-1">Portfolio &rarr; dev</h4>
            <p className="text-xs text-muted mb-2">Repo: <span className="text-ink">gnzaga/Personal-Portfolio-Site</span></p>
            <ul className="text-sm space-y-1">
              <li><span className="text-muted">Branch:</span> <span className="text-[#7A4F00] dark:text-amber-300">dev</span></li>
              <li><span className="text-muted">Image tag:</span> <code className="text-[#7A4F00] dark:text-amber-300 bg-surface px-1 rounded">dev</code> + commit SHA</li>
              <li><span className="text-muted">Deploys to:</span> <span className="text-ink">portfolio-dev</span> namespace</li>
              <li><span className="text-muted">Replicas:</span> 1</li>
            </ul>
          </div>
          <div className="bg-surface p-4 rounded-sm border border-rule">
            <h4 className="text-accent font-semibold mb-1">What2Read &rarr; backend</h4>
            <p className="text-xs text-muted mb-2">Repo: <span className="text-ink">gnzaga/What2Read</span></p>
            <ul className="text-sm space-y-1">
              <li><span className="text-muted">Filter:</span> changes under <code className="text-ink bg-surface px-1 rounded">backend/</code> paths</li>
              <li><span className="text-muted">Image tag:</span> <code className="text-accent bg-surface px-1 rounded">latest</code> + commit SHA</li>
              <li><span className="text-muted">Service:</span> <span className="text-ink">backend</span></li>
            </ul>
          </div>
          <div className="bg-surface p-4 rounded-sm border border-rule">
            <h4 className="text-accent font-semibold mb-1">What2Read &rarr; frontend</h4>
            <p className="text-xs text-muted mb-2">Repo: <span className="text-ink">gnzaga/What2Read</span></p>
            <ul className="text-sm space-y-1">
              <li><span className="text-muted">Filter:</span> changes under <code className="text-ink bg-surface px-1 rounded">frontend/</code> paths</li>
              <li><span className="text-muted">Image tag:</span> <code className="text-accent bg-surface px-1 rounded">latest</code> + commit SHA</li>
              <li><span className="text-muted">Service:</span> <span className="text-ink">frontend</span></li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Live Deployments" icon={faLayerGroup}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface p-4 rounded-sm border border-rule">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-ink font-semibold">Portfolio Website</h4>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-accent/10 text-accent border border-accent/40">PROD</span>
            </div>
            <ul className="text-sm space-y-1">
              <li><span className="text-muted">Namespace:</span> <span className="text-ink">portfolio</span></li>
              <li><span className="text-muted">Replicas:</span> 3</li>
              <li><span className="text-muted">Tracked branch:</span> <span className="text-accent">master</span></li>
              <li><span className="text-muted">Image tag:</span> <code className="text-accent bg-surface px-1 rounded">latest</code></li>
              <li><span className="text-muted">Auto-sync:</span> <span className="text-accent">&#10003; prune + selfHeal</span></li>
            </ul>
          </div>
          <div className="bg-surface p-4 rounded-sm border border-rule">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-ink font-semibold">Portfolio Website</h4>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-[#7A4F00] dark:text-amber-300 border border-amber-500/30">DEV</span>
            </div>
            <ul className="text-sm space-y-1">
              <li><span className="text-muted">Namespace:</span> <span className="text-ink">portfolio-dev</span></li>
              <li><span className="text-muted">Replicas:</span> 1</li>
              <li><span className="text-muted">Tracked branch:</span> <span className="text-[#7A4F00] dark:text-amber-300">dev</span></li>
              <li><span className="text-muted">Image tag:</span> <code className="text-[#7A4F00] dark:text-amber-300 bg-surface px-1 rounded">dev</code></li>
              <li><span className="text-muted">Auto-sync:</span> <span className="text-accent">&#10003; prune + selfHeal</span></li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Security & Scalability" icon={faShieldAlt}>
        <ul className="list-disc list-inside space-y-2 marker:text-accent">
          <li><strong>Zero-Trust:</strong> Vault integration ensures no secrets are ever stored in plain text or within Git.</li>
          <li><strong>Immutability:</strong> Talos Linux minimizes attack vectors by removing SSH and shell access from the host OS.</li>
          <li><strong>Reusability:</strong> The pipeline is designed as a generic template, reused for multiple projects including this portfolio.</li>
        </ul>
      </Section>

      <CaseStudyFooter slug="k8s-automation" />
    </article>
  );
};

export default K8sAutomationPipeline;
