// src/utils/siteGraph.js
//
// Deterministic navigation graph for the portfolio site.
// The LLM only picks a destination — this module computes the
// exact sequence of visual steps to get there from any page.

/**
 * Every route the agent can navigate to.
 *
 * Top-level pages have a `navbar` key (the data-agent-target on their nav link).
 * Detail pages have:
 *   - parent:  the top-level page they live under
 *   - card:    data-agent-target of their card on the parent page
 *   - detail:  data-agent-target of the clickable link that opens the detail page
 */
const nodes = {
  // ── Top-level pages ──
  '/':           { navbar: 'nav-home' },
  '/about':      { navbar: 'nav-about' },
  '/projects':   { navbar: 'nav-projects' },
  '/experience': { navbar: 'nav-experience' },
  '/blog':       { navbar: 'nav-blog' },

  // ── Project detail pages ──
  '/projects/portfolio-project':  { parent: '/projects', card: 'project-portfolio',        detail: 'project-portfolio-detail' },
  '/projects/chat-gnzaga':        { parent: '/projects', card: 'project-chat-gnzaga',      detail: 'project-chat-gnzaga-detail' },
  '/projects/discord-bot':        { parent: '/projects', card: 'project-discord-bot',      detail: 'project-discord-bot-detail' },
  '/projects/PlaylistProject':    { parent: '/projects', card: 'project-playlist',         detail: 'project-playlist-detail' },
  '/projects/task-management':    { parent: '/projects', card: 'project-task-management',  detail: 'project-task-management-detail' },
  '/projects/homelab':            { parent: '/projects', card: 'project-homelab',           detail: 'project-homelab-detail' },
  '/projects/kubernetes-cluster': { parent: '/projects', card: 'project-kubernetes',        detail: 'project-kubernetes-detail' },

  // ── Blog detail pages ──
  '/blog/learning-networking':         { parent: '/blog', card: 'blog-learning-networking',         detail: 'blog-learning-networking-link' },
  '/blog/self-hosting-begins':         { parent: '/blog', card: 'blog-self-hosting-begins',         detail: 'blog-self-hosting-begins-link' },
  '/blog/custom-pc-proxmox-setup':     { parent: '/blog', card: 'blog-custom-pc-proxmox-setup',     detail: 'blog-custom-pc-proxmox-setup-link' },
  '/blog/learning-ai-at-home':         { parent: '/blog', card: 'blog-learning-ai-at-home',         detail: 'blog-learning-ai-at-home-link' },
  '/blog/teaching-ai-to-help-dad':     { parent: '/blog', card: 'blog-teaching-ai-to-help-dad',     detail: 'blog-teaching-ai-to-help-dad-link' },
  '/blog/first-work-trip-long-island': { parent: '/blog', card: 'blog-first-work-trip-long-island', detail: 'blog-first-work-trip-long-island-link' },
  '/blog/kubernetes-adventure':        { parent: '/blog', card: 'blog-kubernetes-adventure',        detail: 'blog-kubernetes-adventure-link' },
  '/blog/live-portfolio-announcement': { parent: '/blog', card: 'blog-live-portfolio-announcement', detail: 'blog-live-portfolio-announcement-link' },
  '/blog/starting-anti-spam-journey':  { parent: '/blog', card: 'blog-starting-anti-spam-journey',  detail: 'blog-starting-anti-spam-journey-link' },
  '/blog/building-vpn-mesh-network':   { parent: '/blog', card: 'blog-building-vpn-mesh-network',   detail: 'blog-building-vpn-mesh-network-link' },
};

/**
 * Step types returned by computeNavigationSteps:
 *
 *   { action: 'navClick',     navTarget, route }     — glow + click a navbar link, navigate to route
 *   { action: 'scroll',       target }               — smooth-scroll to element
 *   { action: 'highlight',    target, duration }      — add agent-highlight glow
 *   { action: 'clickDetail',  target }               — glow + click a detail/article button (actually navigates)
 */

/**
 * Computes the ordered list of visual navigation steps to get from
 * `fromRoute` to `toRoute`, optionally highlighting `elementTarget`
 * on the final page.
 *
 * @param {string} fromRoute      — current location.pathname
 * @param {string} toRoute        — destination route the LLM picked
 * @param {string|null} elementTarget — optional data-agent-target to highlight on arrival
 * @returns {Array} steps
 */
export function computeNavigationSteps(fromRoute, toRoute, elementTarget = null) {
  const steps = [];
  const dest = nodes[toRoute];

  // Unknown route — fall back to direct navigate
  if (!dest) {
    if (toRoute && toRoute !== fromRoute) {
      steps.push({ action: 'directNav', route: toRoute });
    }
    if (elementTarget) {
      steps.push({ action: 'scroll', target: elementTarget });
      steps.push({ action: 'highlight', target: elementTarget, duration: 3000 });
    }
    return steps;
  }

  const isDetail = !!dest.parent;
  const isAlreadyThere = fromRoute === toRoute;

  if (isAlreadyThere) {
    // Already on the destination page — just highlight the element if given
    if (elementTarget) {
      steps.push({ action: 'scroll', target: elementTarget });
      steps.push({ action: 'highlight', target: elementTarget, duration: 3000 });
    }
    return steps;
  }

  if (!isDetail) {
    // ── Destination is a top-level page ──
    steps.push({ action: 'navClick', navTarget: dest.navbar, route: toRoute });

    if (elementTarget) {
      steps.push({ action: 'scroll', target: elementTarget });
      steps.push({ action: 'highlight', target: elementTarget, duration: 3000 });
    }
  } else {
    // ── Destination is a detail page ──
    const parentNode = nodes[dest.parent];

    // Step 1: navigate to parent page via navbar (if not already there)
    if (fromRoute !== dest.parent) {
      steps.push({ action: 'navClick', navTarget: parentNode.navbar, route: dest.parent });
    }

    // Step 2: scroll to the card on the parent page
    steps.push({ action: 'scroll', target: dest.card });

    // Step 3: highlight the card briefly
    steps.push({ action: 'highlight', target: dest.card, duration: 1500 });

    // Step 4: "click" the detail button (navigates to the detail page)
    steps.push({ action: 'clickDetail', target: dest.detail });
  }

  return steps;
}

/** Export the raw nodes for anything that needs route metadata */
export { nodes as siteNodes };
