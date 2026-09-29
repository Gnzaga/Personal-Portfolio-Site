# PR preview environments

Every open PR into `master` gets its own copy of the site in the homelab
cluster, in namespace `portfolio-pr-<N>`. It is torn down when the PR is
merged or closed.

```
PR push ─▶ GitHub Actions (.github/workflows/pr-preview-image.yml)
             builds ghcr.io/gnzaga/personal-portfolio-site:pr-<N>-<sha>
ArgoCD ApplicationSet (k8s/argocd-applicationset-previews.yaml)
             polls open PRs every 5 min ─▶ Application portfolio-pr-<N>
             renders k8s/overlays/preview from the PR's own commit
PR closed ─▶ Application + namespace deleted
```

## One-time setup

1. **GHCR pull credentials** – create a classic GitHub PAT with only
   `read:packages`, and add it to Vault at key `portfolio`:
   `ghcr_username=<github user>`, `ghcr_token=<PAT>`.
   (Skip this if you make the GHCR package public: Package settings →
   Change visibility.)
2. **ApplicationSet** –
   `kubectl apply -f k8s/argocd-applicationset-previews.yaml`
3. Open a PR. After the Actions build finishes (~3–5 min) the pod comes up.

## Reaching a preview

Previews are private. Find the LAN IP of a preview with

```
kubectl -n portfolio-pr-<N> get svc portfolio-website
```

and open it on your LAN or over Tailscale (via your subnet router). If you run
the Tailscale Kubernetes operator, uncomment the Service patch in
`k8s/overlays/preview/kustomization.yaml` to get a MagicDNS name instead.

## Notes

- PRs from forks are never built, so they never run in the cluster.
- The chat widget needs `openrouter-api-key`, which exists only in the prod
  namespace. Previews start without it.
- Preview images pile up in GHCR. Delete old `pr-*` versions from the
  package page now and then.
