// src/utils/agentParsing.js

export function extractAgentAction(text) {
  const regex = /\[\[AGENT:([\s\S]*?)\]\]\s*$/;
  const match = text.match(regex);
  if (!match) return { cleanedText: text, agentAction: null };
  try {
    const agentAction = JSON.parse(match[1]);
    const cleanedText = text.slice(0, match.index).trimEnd();
    return { cleanedText, agentAction };
  } catch {
    return { cleanedText: text, agentAction: null };
  }
}

export function stripAgentTags(text) {
  let cleaned = text.replace(/\[\[AGENT:[\s\S]*?\]\]/g, '');
  cleaned = cleaned.replace(/\[\[AGENT:[\s\S]*$/, '');
  cleaned = cleaned.replace(/\[\[$/, '');
  return cleaned;
}
