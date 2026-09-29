#!/usr/bin/env bash
# Live dev environment for one branch. Clones $BRANCH, runs the CRA dev server
# (hot reload) plus server.js, and polls GitHub every $POLL_SECONDS. On a new
# commit it hard-resets the working tree in place, so webpack recompiles only
# what changed and the browser updates by itself.
set -euo pipefail

APP=/workspace/app
LOCK_STAMP=/workspace/.lock.sha

if [ ! -d "$APP/.git" ]; then
  git clone --quiet --depth 1 --branch "$BRANCH" "$REPO_URL" "$APP"
fi
cd "$APP"
git fetch --quiet --depth 1 origin "$BRANCH"
git reset --quiet --hard FETCH_HEAD

# node_modules lives on the pod's emptyDir, so a container restart only
# reinstalls when the dependency manifests changed. `npm install` (not `npm ci`),
# like deployment/docker/Dockerfile, because the committed lockfile can lag
# package.json; the lockfile is restored afterwards so git resets stay clean.
if ! sha1sum --status -c "$LOCK_STAMP" 2>/dev/null || [ ! -d node_modules ]; then
  sha1sum package.json package-lock.json > "$LOCK_STAMP.new"
  npm install --no-audit --no-fund
  git checkout -- package-lock.json
  mv "$LOCK_STAMP.new" "$LOCK_STAMP"
fi

PORT=3004 node --watch server.js &
PORT=3006 npx react-app-rewired start &

(
  while sleep "$POLL_SECONDS"; do
    remote=$(git ls-remote origin "refs/heads/$BRANCH" | cut -f1) || continue
    # Branch deleted (PR closing): keep serving until ArgoCD removes the pod.
    [ -n "$remote" ] || continue
    [ "$remote" != "$(git rev-parse HEAD)" ] || continue
    git fetch --quiet --depth 1 origin "$BRANCH" || continue
    git reset --quiet --hard FETCH_HEAD
    echo "[sync] now at $(git log -1 --format='%h %s')"
    if ! sha1sum --status -c "$LOCK_STAMP"; then
      echo "[sync] dependencies changed, restarting to reinstall"
      exit 1
    fi
  done
) &

# If the dev server, API server or sync loop dies, restart the container.
wait -n
exit 1
