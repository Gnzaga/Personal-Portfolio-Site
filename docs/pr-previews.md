# PR preview environments

Every open PR into `master` gets its own live dev server in the homelab
cluster, in namespace `portfolio-pr-<N>`. A push to the PR branch shows up in
the browser within seconds (measured: ~4 s). No image build, no registry, no CI.

```
ArgoCD ApplicationSet (k8s/argocd-applicationset-previews.yaml)
   polls open PRs every 5 min ─▶ creates portfolio-pr-<N> from k8s/preview
                                 (deletes it when the PR closes)

pod: node:20-bookworm running k8s/preview/sync-and-serve.sh
   clone branch ─▶ npm install ─▶ CRA dev server :3006 + node --watch server.js
   every 3 s: git ls-remote ─▶ new commit? git reset --hard in place
              ─▶ webpack recompiles only what changed ─▶ browser hot-reloads
   package.json / lockfile changed ─▶ container restarts and reinstalls
```

## One-time setup

1. Merge this to `master` (the ApplicationSet reads `k8s/preview` from `master`).
2. `kubectl apply -f k8s/argocd-applicationset-previews.yaml`
3. Open a PR. It gets an environment within 5 minutes (first boot, which
   installs dependencies, takes another 1–3 min). Then every push is live in seconds.

## Reaching a preview

Previews are private. Find the LAN IP of a preview with

```
kubectl -n portfolio-pr-<N> get svc portfolio-dev
```

and open it on your LAN or over Tailscale (via your subnet router). If you run
the Tailscale Kubernetes operator, uncomment the annotation in
`k8s/preview/service.yaml` to get a MagicDNS name instead.

Watch what the pod is doing: `kubectl -n portfolio-pr-<N> logs deploy/portfolio-dev -f`
(look for `[sync] now at <sha>`).

## Notes

- This is the dev server, not the production build. Occasionally check a
  production build (`npm run build`) before merging.
- New PRs are picked up every 5 min. To pick them up faster, give the
  ApplicationSet a GitHub token and lower `requeueAfterSeconds` (see the
  comments in the file).
- PRs from forks also get an environment and would run their code in your
  cluster. If the repo ever takes outside PRs, add a `labels: [preview]`
  filter to the generator.
- The chat widget needs `openrouter-api-key`, which exists only in the prod
  namespace. Previews start without it.
- Each preview reserves ~768 MiB of RAM (the webpack dev server is memory hungry).
