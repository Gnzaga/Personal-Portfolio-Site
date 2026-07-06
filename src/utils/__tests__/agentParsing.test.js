// src/utils/__tests__/agentParsing.test.js

import { extractAgentAction, stripAgentTags } from '../agentParsing';

describe('extractAgentAction', () => {
  test('returns null agentAction and original text when no [[AGENT:]] tag', () => {
    const text = 'Here is some plain text with no agent tag.';
    const result = extractAgentAction(text);
    expect(result.agentAction).toBeNull();
    expect(result.cleanedText).toBe(text);
  });

  test('extracts nav action from valid [[AGENT:{"nav":"/projects"}]]', () => {
    const text = 'Check out my projects. [[AGENT:{"nav":"/projects"}]]';
    const result = extractAgentAction(text);
    expect(result.agentAction).toEqual({ nav: '/projects' });
    expect(result.cleanedText).toBe('Check out my projects.');
  });

  test('extracts nav and target from [[AGENT:{"nav":"/about","target":"skills"}]]', () => {
    const text = 'Let me show you my skills. [[AGENT:{"nav":"/about","target":"skills"}]]';
    const result = extractAgentAction(text);
    expect(result.agentAction).toEqual({ nav: '/about', target: 'skills' });
    expect(result.cleanedText).toBe('Let me show you my skills.');
  });

  test('strips the tag from cleanedText', () => {
    const text = 'Some response text. [[AGENT:{"nav":"/contact"}]]';
    const result = extractAgentAction(text);
    expect(result.cleanedText).not.toContain('[[AGENT:');
    expect(result.cleanedText).not.toContain(']]');
  });

  test('returns null agentAction for invalid JSON in tag', () => {
    const text = 'Text with bad JSON. [[AGENT:{not valid json}]]';
    const result = extractAgentAction(text);
    expect(result.agentAction).toBeNull();
    expect(result.cleanedText).toBe(text);
  });
});

describe('stripAgentTags', () => {
  test('removes complete [[AGENT:...]] tags', () => {
    const text = 'Hello world. [[AGENT:{"nav":"/home"}]] How are you?';
    const result = stripAgentTags(text);
    expect(result).toBe('Hello world.  How are you?');
    expect(result).not.toContain('[[AGENT:');
  });

  test('removes partial [[AGENT: at end of streaming text', () => {
    const text = 'Here is some text [[AGENT:{"nav":"/pro';
    const result = stripAgentTags(text);
    expect(result).toBe('Here is some text ');
    expect(result).not.toContain('[[AGENT:');
  });

  test('removes [[ at end of text', () => {
    const text = 'Some text [[';
    const result = stripAgentTags(text);
    expect(result).toBe('Some text ');
    expect(result).not.toContain('[[');
  });

  test('leaves text unchanged when no tags present', () => {
    const text = 'Plain text with no agent tags at all.';
    const result = stripAgentTags(text);
    expect(result).toBe(text);
  });
});
