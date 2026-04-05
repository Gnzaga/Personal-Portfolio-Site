import { buildSystemPrompt, pageContextMap, validRoutes, systemMessage } from '../promptBuilder';

describe('buildSystemPrompt', () => {
  it('returns a string', () => {
    const result = buildSystemPrompt('/');
    expect(typeof result).toBe('string');
  });

  it('includes the current page path in the output', () => {
    const result = buildSystemPrompt('/about');
    expect(result).toContain('/about');
  });

  it('includes the page description for a known route from pageContextMap', () => {
    const result = buildSystemPrompt('/experience');
    expect(result).toContain(pageContextMap['/experience']);
  });

  it('includes the page description for the home route', () => {
    const result = buildSystemPrompt('/');
    expect(result).toContain(pageContextMap['/']);
  });

  it('includes the page description for a known blog route', () => {
    const result = buildSystemPrompt('/blog/teaching-ai-to-help-dad');
    expect(result).toContain(pageContextMap['/blog/teaching-ai-to-help-dad']);
  });

  it('uses fallback text for an unknown route', () => {
    const result = buildSystemPrompt('/nonexistent-page');
    expect(result).toContain('An unknown page at route "/nonexistent-page".');
  });

  it('includes the valid route list', () => {
    const result = buildSystemPrompt('/');
    for (const route of validRoutes) {
      expect(result).toContain(route);
    }
  });

  it('includes agent mode instructions with [[AGENT:...]] format', () => {
    const result = buildSystemPrompt('/');
    expect(result).toContain('[[AGENT:');
    expect(result).toContain('--- AGENT MODE ---');
  });

  it('includes the resume / systemMessage content', () => {
    const result = buildSystemPrompt('/');
    // The systemMessage is prepended to the prompt; check a distinctive excerpt
    expect(result).toContain('Alessandro Gonzaga');
    expect(result).toContain(systemMessage.trim().slice(0, 80));
  });

  it('includes the PAGE CONTEXT section header', () => {
    const result = buildSystemPrompt('/projects');
    expect(result).toContain('--- PAGE CONTEXT ---');
    expect(result).toContain('The user is currently viewing: /projects');
  });

  it('lists each valid route with a leading dash in the prompt', () => {
    const result = buildSystemPrompt('/');
    // Each valid route should appear as "- /route" in the Available Destinations list
    expect(result).toContain('- /');
    expect(result).toContain('- /about');
    expect(result).toContain('- /projects/homelab');
  });
});

describe('pageContextMap', () => {
  it('is an object', () => {
    expect(typeof pageContextMap).toBe('object');
    expect(pageContextMap).not.toBeNull();
  });

  it('has an entry for the home route', () => {
    expect(pageContextMap['/']).toBeDefined();
    expect(typeof pageContextMap['/']).toBe('string');
  });

  it('has entries for all main nav routes', () => {
    expect(pageContextMap['/about']).toBeDefined();
    expect(pageContextMap['/projects']).toBeDefined();
    expect(pageContextMap['/experience']).toBeDefined();
    expect(pageContextMap['/blog']).toBeDefined();
  });
});

describe('validRoutes', () => {
  it('is an array', () => {
    expect(Array.isArray(validRoutes)).toBe(true);
  });

  it('contains the home route', () => {
    expect(validRoutes).toContain('/');
  });

  it('contains main nav routes', () => {
    expect(validRoutes).toContain('/about');
    expect(validRoutes).toContain('/projects');
    expect(validRoutes).toContain('/experience');
    expect(validRoutes).toContain('/blog');
  });

  it('contains project and blog sub-routes', () => {
    expect(validRoutes).toContain('/projects/homelab');
    expect(validRoutes).toContain('/blog/teaching-ai-to-help-dad');
  });
});

describe('systemMessage', () => {
  it('is a string', () => {
    expect(typeof systemMessage).toBe('string');
  });

  it('mentions Alessandro Gonzaga', () => {
    expect(systemMessage).toContain('Alessandro Gonzaga');
  });

  it('contains resume content', () => {
    expect(systemMessage).toContain('Rutgers University');
    expect(systemMessage).toContain('Verizon');
  });
});
