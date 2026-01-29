// src/components/ChatBot.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes, faExpand, faCompress, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import { computeNavigationSteps } from '../utils/siteGraph';

/**
 * Extracts an agent action tag from the bot response text.
 * Looks for [[AGENT:{...}]] at the end of the text.
 * Returns { cleanedText, agentAction } where agentAction is parsed JSON or null.
 */
function extractAgentAction(text) {
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

/**
 * Strips any partial or complete [[AGENT:...]] tags from streaming text
 * so users never see raw markup during streaming.
 */
function stripAgentTags(text) {
  let cleaned = text.replace(/\[\[AGENT:[\s\S]*?\]\]/g, '');
  cleaned = cleaned.replace(/\[\[AGENT:[\s\S]*$/, '');
  cleaned = cleaned.replace(/\[\[$/, '');
  return cleaned;
}

/**
 * ChatBot Component
 *
 * A context-aware chatbot with agent mode that offers to navigate users
 * through the portfolio with Yes/No confirmation before acting.
 */
const ChatBot = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm a LLM model configured to answer questions about Alessandro. Ask me anything." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentBotMessage, setCurrentBotMessage] = useState('');
  const [isAgentMode, setIsAgentMode] = useState(false);
  const [agentHighlightTarget, setAgentHighlightTarget] = useState(null);
  // Pending agent action waiting for user confirmation (Yes/No)
  const [pendingAgentAction, setPendingAgentAction] = useState(null);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, currentBotMessage, pendingAgentAction]);

  useEffect(() => {
    const handleResize = () => {
      if (chatContainerRef.current) {
        const vh = window.innerHeight * 0.01;
        chatContainerRef.current.style.setProperty('--vh', `${vh}px`);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clean up agent highlight on unmount
  useEffect(() => {
    return () => {
      if (agentHighlightTarget) {
        const el = document.querySelector(`[data-agent-target="${agentHighlightTarget}"]`);
        if (el) el.classList.remove('agent-highlight');
      }
    };
  }, [agentHighlightTarget]);

  /**
   * Executes a single navigation step produced by the site graph.
   */
  const executeStep = useCallback(async (step, wait) => {
    switch (step.action) {
      case 'navClick': {
        const navLink = document.querySelector(`[data-agent-target="${step.navTarget}"]`);
        if (navLink) {
          navLink.classList.add('agent-nav-highlight');
          await wait(900);
          navLink.classList.add('agent-nav-click');
          await wait(400);
        }
        navigate(step.route);
        await wait(1200);
        if (navLink) {
          navLink.classList.remove('agent-nav-highlight', 'agent-nav-click');
        }
        break;
      }

      case 'scroll': {
        await wait(500);
        const el = document.querySelector(`[data-agent-target="${step.target}"]`);
        if (el) {
          setAgentHighlightTarget(step.target);
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          await wait(800);
        }
        break;
      }

      case 'highlight': {
        const el = document.querySelector(`[data-agent-target="${step.target}"]`);
        if (el) {
          setAgentHighlightTarget(step.target);
          el.classList.add('agent-highlight');
          await wait(step.duration || 2000);
          el.classList.remove('agent-highlight');
          setAgentHighlightTarget(null);
        }
        break;
      }

      case 'clickDetail': {
        const btn = document.querySelector(`[data-agent-target="${step.target}"]`);
        if (btn) {
          await wait(300);
          btn.classList.add('agent-nav-highlight');
          await wait(700);
          btn.classList.add('agent-nav-click');
          await wait(400);
          btn.click();
          await wait(1200);
          btn.classList.remove('agent-nav-highlight', 'agent-nav-click');
        }
        break;
      }

      case 'directNav': {
        navigate(step.route);
        await wait(1200);
        break;
      }

      default:
        break;
    }
  }, [navigate]);

  /**
   * Executes the full agent mode visual sequence.
   * The site graph computes the steps — we just run them in order.
   */
  const executeAgentSequence = useCallback(async (action) => {
    if (!action) return;

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    setIsAgentMode(true);
    await wait(600); // let user see the green border

    try {
      const steps = computeNavigationSteps(
        location.pathname,
        action.nav || location.pathname,
        action.target || null
      );

      for (const step of steps) {
        await executeStep(step, wait);
      }
    } finally {
      setIsAgentMode(false);
    }
  }, [location.pathname, executeStep]);

  /**
   * User clicked "Yes" on the agent offer
   */
  const handleAgentConfirm = useCallback(() => {
    const action = pendingAgentAction;
    setPendingAgentAction(null);
    // Add a confirmation message from the user
    setMessages((prev) => [...prev, { sender: 'user', text: 'Yes, show me!' }]);
    if (action) {
      setTimeout(() => executeAgentSequence(action), 300);
    }
  }, [pendingAgentAction, executeAgentSequence]);

  /**
   * User clicked "No" on the agent offer
   */
  const handleAgentDecline = useCallback(() => {
    setPendingAgentAction(null);
    setMessages((prev) => [...prev, { sender: 'user', text: 'No thanks.' }]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Clear any pending agent action from previous exchange
    setPendingAgentAction(null);

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setCurrentBotMessage('');

    // Build conversation history for the backend (last 10 messages, mapped to role/content)
    const currentMessages = [...messages, userMsg];
    const history = currentMessages
      .slice(-10)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          currentPage: location.pathname,
          history,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buf = '';
      let full = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buf += decoder.decode(value, { stream: true });

        let parts = buf.split(/\r?\n/);
        buf = parts.pop();

        for (let line of parts) {
          line = line.trim();
          if (!line.startsWith('data:')) continue;

          const content = line.slice(5).trim();
          if (content === '[DONE]') break;

          try {
            const json = JSON.parse(content);
            const token =
              json.delta ??
              json.message?.content ??
              json.choices?.[0]?.delta?.content;

            if (token !== undefined) {
              full += token;
              setCurrentBotMessage(stripAgentTags(full));
            }
          } catch (err) {
            console.error('bad JSON', err, content);
          }
        }
      }

      if (full) {
        const { cleanedText, agentAction } = extractAgentAction(full);
        setMessages((prev) => [...prev, { sender: 'bot', text: cleanedText }]);

        // If there's an agent action, store it as pending — show Yes/No buttons
        if (agentAction) {
          setPendingAgentAction(agentAction);
        }
      }
    } catch (err) {
      console.error('sendMessage error:', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Oops! Something went wrong...' },
      ]);
    } finally {
      setIsLoading(false);
      setCurrentBotMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Markdown components with custom link handling
  const components = {
    p: ({ children }) => <p className="mb-4">{children}</p>,
    a: ({ href, children }) => {
      if (href && href.startsWith('/')) {
        return (
          <button
            onClick={() => navigate(href)}
            className="text-primary-400 hover:text-primary-300 underline cursor-pointer"
          >
            {children}
          </button>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">
          {children}
        </a>
      );
    },
  };

  const formatBotMessage = (text) => {
    return text.replace(/\n{2,}/g, '\n\n\n');
  };

  const getChatContainerClasses = () => {
    const baseClasses = `fixed shadow-lg overflow-hidden z-50 transition-all duration-500`;

    if (!isOpen) {
      return `${baseClasses} bg-gray-900 bottom-4 right-4 w-80 h-96 md:w-96 md:h-[32rem] rounded-lg opacity-0 invisible`;
    }
    if (isExpanded) {
      return `${baseClasses} bg-gray-800 bg-opacity-70 bottom-4 right-0 w-full md:w-1/2 h-96 md:h-[32rem] rounded-none md:rounded-l-lg opacity-100 visible`;
    }
    return `${baseClasses} bg-gray-900 bg-opacity-80 bottom-4 right-4 w-80 h-96 md:w-96 md:h-[32rem] rounded-lg opacity-100 visible`;
  };

  return (
    <>
      {/* Full-viewport agent mode border overlay */}
      {isAgentMode && (
        <div className="agent-mode-border fixed inset-0 z-[9999] pointer-events-none" />
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-300 z-50"
          aria-label="Open chat"
        >
          <FontAwesomeIcon icon={faComments} size="2x" />
        </button>
      )}
      <div
        ref={chatContainerRef}
        className={getChatContainerClasses()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`${isExpanded ? 'bg-transparent' : 'bg-gray-200 dark:bg-dark-500 bg-opacity-30'} text-dark-800 dark:text-white p-4 flex justify-between items-center transition-colors duration-300`}>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold">Chatbot</h2>
              {isAgentMode && (
                <span className="agent-mode-indicator inline-flex items-center bg-primary-900/60 text-primary-300 text-xs font-medium px-2 py-0.5 rounded-full">
                  <span className="agent-dot w-1.5 h-1.5 bg-primary-400 rounded-full mr-1.5"></span>
                  Agent Mode
                </span>
              )}
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleExpand}
                className="text-dark-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 mr-4 inline-block transition-transform duration-300 transform hover:scale-110"
                aria-label={isExpanded ? 'Collapse chat' : 'Expand chat'}
              >
                <FontAwesomeIcon icon={isExpanded ? faCompress : faExpand} size="lg" />
              </button>
              <button
                onClick={() => { setIsOpen(false); setIsExpanded(false); }}
                className="text-dark-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-transform duration-300 transform hover:scale-110"
                aria-label="Close chat"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className={`flex-1 overflow-y-auto p-4 ${isExpanded ? 'bg-transparent' : 'bg-gray-100 dark:bg-dark-800 bg-opacity-50'} scrollbar-thin scrollbar-thumb-primary-500 dark:scrollbar-thumb-dark-600 scrollbar-track-gray-200 dark:scrollbar-track-dark-800 transition-colors duration-300`}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`my-2 p-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-primary-500 bg-opacity-90 text-white ml-auto'
                    : 'bg-gray-300 dark:bg-dark-700 bg-opacity-90 text-dark-800 dark:text-white mr-auto'
                } max-w-[90%] md:max-w-[90%] break-words shadow-md transition-colors duration-300`}
              >
                {msg.sender === 'bot' ? (
                  <ReactMarkdown components={components}>
                    {formatBotMessage(msg.text)}
                  </ReactMarkdown>
                ) : (
                  <p>{msg.text}</p>
                )}
              </div>
            ))}

            {/* Streaming message */}
            {currentBotMessage && (
              <div className="my-2 p-2 rounded-lg bg-gray-300 dark:bg-dark-700 bg-opacity-70 text-dark-800 dark:text-white mr-auto max-w-[90%] md:max-w-[90%] break-words shadow-md transition-colors duration-300">
                <ReactMarkdown components={components}>
                  {formatBotMessage(currentBotMessage)}
                </ReactMarkdown>
              </div>
            )}

            {/* Loading indicator */}
            {isLoading && !currentBotMessage && (
              <div className="my-2 p-2 rounded-lg bg-gray-300 dark:bg-dark-700 bg-opacity-70 text-dark-800 dark:text-white mr-auto max-w-[90%] md:max-w-[90%] shadow-md transition-colors duration-300">
                <span className="animate-pulse">
                  Searching knowledge base...
                </span>
              </div>
            )}

            {/* Agent action Yes/No buttons */}
            {pendingAgentAction && !isLoading && (
              <div className="my-2 flex gap-2 mr-auto">
                <button
                  onClick={handleAgentConfirm}
                  className="px-4 py-1.5 rounded-lg text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  Yes, show me
                </button>
                <button
                  onClick={handleAgentDecline}
                  className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gray-300 dark:bg-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-dark-500 shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  No thanks
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className={`${isExpanded ? 'bg-transparent border-transparent' : 'bg-gray-100 dark:bg-dark-800 bg-opacity-70 border-gray-300 dark:border-dark-700 border-opacity-90'} p-4 border-t transition-colors duration-300`}>
            <div className="flex items-center">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="flex-grow p-2 border border-gray-300 dark:border-dark-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-white dark:bg-dark-700 text-dark-800 dark:text-white mr-2 bg-opacity-80 transition-colors duration-300"
                rows="1"
                style={{ minHeight: '2.5rem', maxHeight: '6rem' }}
              />
              <button
                onClick={sendMessage}
                className="bg-primary-500 text-white p-2 rounded-lg shadow-md hover:bg-primary-600 disabled:bg-primary-400 flex-shrink-0 transition-colors duration-300 bg-opacity-75"
                disabled={isLoading}
                aria-label="Send message"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
