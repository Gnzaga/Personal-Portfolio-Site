import { computeNavigationSteps } from '../siteGraph';

describe('computeNavigationSteps', () => {

  // ─────────────────────────────────────────────
  // 1. Same-page navigation
  // ─────────────────────────────────────────────
  describe('same-page navigation (fromRoute === toRoute)', () => {
    it('returns [] when already on the destination with no elementTarget', () => {
      expect(computeNavigationSteps('/projects', '/projects')).toEqual([]);
      expect(computeNavigationSteps('/', '/')).toEqual([]);
    });

    it('returns scroll + highlight when already on the destination with an elementTarget', () => {
      const steps = computeNavigationSteps('/about', '/about', 'skills-section');
      expect(steps).toEqual([
        { action: 'scroll', target: 'skills-section' },
        { action: 'highlight', target: 'skills-section', duration: 3000 },
      ]);
    });

    it('returns scroll + highlight for a detail page when already there', () => {
      const steps = computeNavigationSteps(
        '/projects/homelab',
        '/projects/homelab',
        'homelab-tech-stack',
      );
      expect(steps).toEqual([
        { action: 'scroll', target: 'homelab-tech-stack' },
        { action: 'highlight', target: 'homelab-tech-stack', duration: 3000 },
      ]);
    });
  });

  // ─────────────────────────────────────────────
  // 2. Top-level navigation
  // ─────────────────────────────────────────────
  describe('top-level navigation', () => {
    it('produces a navClick step with the correct navbar target', () => {
      const steps = computeNavigationSteps('/', '/about');
      expect(steps).toEqual([
        { action: 'navClick', navTarget: 'nav-about', route: '/about' },
      ]);
    });

    it('uses the correct navbar target for each top-level route', () => {
      const cases = [
        { to: '/',           navTarget: 'nav-home' },
        { to: '/projects',   navTarget: 'nav-projects' },
        { to: '/experience', navTarget: 'nav-experience' },
        { to: '/blog',       navTarget: 'nav-blog' },
      ];

      for (const { to, navTarget } of cases) {
        const steps = computeNavigationSteps('/about', to);
        expect(steps[0]).toEqual({ action: 'navClick', navTarget, route: to });
      }
    });

    it('appends scroll + highlight after navClick when elementTarget is given', () => {
      const steps = computeNavigationSteps('/', '/experience', 'timeline-2024');
      expect(steps).toEqual([
        { action: 'navClick', navTarget: 'nav-experience', route: '/experience' },
        { action: 'scroll', target: 'timeline-2024' },
        { action: 'highlight', target: 'timeline-2024', duration: 3000 },
      ]);
    });

    it('produces only navClick (no extra steps) when elementTarget is null', () => {
      const steps = computeNavigationSteps('/about', '/projects');
      expect(steps).toHaveLength(1);
      expect(steps[0].action).toBe('navClick');
    });
  });

  // ─────────────────────────────────────────────
  // 3. Detail page from a different parent
  // ─────────────────────────────────────────────
  describe('detail page navigation from a different parent', () => {
    it('navigates home → /projects/homelab via navClick + scroll + highlight + clickDetail', () => {
      const steps = computeNavigationSteps('/', '/projects/homelab');
      expect(steps).toEqual([
        { action: 'navClick',    navTarget: 'nav-projects', route: '/projects' },
        { action: 'scroll',      target: 'project-homelab' },
        { action: 'highlight',   target: 'project-homelab', duration: 1500 },
        { action: 'clickDetail', target: 'project-homelab-detail' },
      ]);
    });

    it('navigates /about → /projects/chat-gnzaga with correct targets', () => {
      const steps = computeNavigationSteps('/about', '/projects/chat-gnzaga');
      expect(steps).toEqual([
        { action: 'navClick',    navTarget: 'nav-projects', route: '/projects' },
        { action: 'scroll',      target: 'project-chat-gnzaga' },
        { action: 'highlight',   target: 'project-chat-gnzaga', duration: 1500 },
        { action: 'clickDetail', target: 'project-chat-gnzaga-detail' },
      ]);
    });

    it('navigates /projects → /blog/kubernetes-adventure (different parent)', () => {
      const steps = computeNavigationSteps('/projects', '/blog/kubernetes-adventure');
      expect(steps).toEqual([
        { action: 'navClick',    navTarget: 'nav-blog', route: '/blog' },
        { action: 'scroll',      target: 'blog-kubernetes-adventure' },
        { action: 'highlight',   target: 'blog-kubernetes-adventure', duration: 1500 },
        { action: 'clickDetail', target: 'blog-kubernetes-adventure-link' },
      ]);
    });

    it('produces exactly 4 steps for detail pages from a different parent', () => {
      const steps = computeNavigationSteps('/experience', '/projects/discord-bot');
      expect(steps).toHaveLength(4);
      expect(steps.map(s => s.action)).toEqual([
        'navClick', 'scroll', 'highlight', 'clickDetail',
      ]);
    });
  });

  // ─────────────────────────────────────────────
  // 4. Detail page from the same parent
  // ─────────────────────────────────────────────
  describe('detail page navigation from the same parent', () => {
    it('skips navClick and starts with scroll when already on the parent page', () => {
      const steps = computeNavigationSteps('/projects', '/projects/portfolio-project');
      expect(steps).toEqual([
        { action: 'scroll',      target: 'project-portfolio' },
        { action: 'highlight',   target: 'project-portfolio', duration: 1500 },
        { action: 'clickDetail', target: 'project-portfolio-detail' },
      ]);
    });

    it('skips navClick for a blog detail page when already on /blog', () => {
      const steps = computeNavigationSteps('/blog', '/blog/self-hosting-begins');
      expect(steps).toEqual([
        { action: 'scroll',      target: 'blog-self-hosting-begins' },
        { action: 'highlight',   target: 'blog-self-hosting-begins', duration: 1500 },
        { action: 'clickDetail', target: 'blog-self-hosting-begins-link' },
      ]);
    });

    it('produces exactly 3 steps (no navClick) when already on the parent', () => {
      const steps = computeNavigationSteps('/projects', '/projects/kubernetes-cluster');
      expect(steps).toHaveLength(3);
      expect(steps[0].action).toBe('scroll');
    });

    it('uses the correct card and detail targets', () => {
      const steps = computeNavigationSteps('/projects', '/projects/task-management');
      expect(steps[0]).toEqual({ action: 'scroll',    target: 'project-task-management' });
      expect(steps[1]).toEqual({ action: 'highlight', target: 'project-task-management', duration: 1500 });
      expect(steps[2]).toEqual({ action: 'clickDetail', target: 'project-task-management-detail' });
    });
  });

  // ─────────────────────────────────────────────
  // 5. Unknown / invalid routes
  // ─────────────────────────────────────────────
  describe('unknown route fallback', () => {
    it('returns a directNav step for an unrecognised route', () => {
      const steps = computeNavigationSteps('/', '/contact');
      expect(steps).toEqual([
        { action: 'directNav', route: '/contact' },
      ]);
    });

    it('appends scroll + highlight after directNav when elementTarget is given', () => {
      const steps = computeNavigationSteps('/', '/unknown-page', 'some-element');
      expect(steps).toEqual([
        { action: 'directNav', route: '/unknown-page' },
        { action: 'scroll',    target: 'some-element' },
        { action: 'highlight', target: 'some-element', duration: 3000 },
      ]);
    });

    it('returns [] for an empty string toRoute', () => {
      const steps = computeNavigationSteps('/', '');
      expect(steps).toEqual([]);
    });

    it('returns [] for a null toRoute', () => {
      const steps = computeNavigationSteps('/', null);
      expect(steps).toEqual([]);
    });

    it('returns only scroll + highlight for unknown same-route (empty string) with elementTarget', () => {
      // toRoute = '' is falsy, so directNav is skipped; elementTarget is appended
      const steps = computeNavigationSteps('/', '', 'hero-section');
      expect(steps).toEqual([
        { action: 'scroll',    target: 'hero-section' },
        { action: 'highlight', target: 'hero-section', duration: 3000 },
      ]);
    });
  });
});
