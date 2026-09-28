// src/components/ShipPilotWidget.js
//
// Site-styled chat window backed by ShipPilot. All chat/navigation logic
// comes from @shippilot/react's useShipPilotChat hook; this file is only
// presentation (flat console panel) plus an open() hook: dispatching the
// `shippilot:open` window event (see CommandPalette.js) opens the window.

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useShipPilot, useShipPilotChat } from '@shippilot/react';
import { OPEN_AGENT_EVENT } from './CommandPalette';

const markdownComponents = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  a: ({ href, children }) => (
    <a href={href} className="text-signal underline underline-offset-2 hover:text-fg">{children}</a>
  ),
  ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-fg">{children}</strong>,
};

const ShipPilotWidget = () => {
  const { config, router, setAgentMode } = useShipPilot();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  const chat = useShipPilotChat({
    chatEndpoint: config.chatEndpoint,
    siteGraph: config.siteGraph,
    router,
    welcomeMessage: config.welcomeMessage,
    setAgentMode,
  });

  // External open() — the command palette's "Ask the site agent…" entry.
  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    window.addEventListener(OPEN_AGENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_AGENT_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages, chat.currentStreamedText, chat.pendingAgentAction]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void chat.sendMessage();
    }
  };

  const getChatContainerClasses = () => {
    const baseClasses = 'fixed z-50 overflow-hidden border bg-panel shadow-[0_16px_48px_rgba(0,0,0,0.55)] transition-[opacity,width,height] duration-150';
    if (chat.isAgentMode) {
      return `${baseClasses} bottom-10 right-4 h-9 flex items-center border-signal/60`;
    }
    if (!isOpen) {
      return `${baseClasses} bottom-10 right-4 w-0 h-0 opacity-0 invisible border-line`;
    }
    if (isExpanded) {
      return `${baseClasses} bottom-7 right-0 w-full md:w-1/2 h-[80vh] border-line-strong`;
    }
    return `${baseClasses} bottom-10 right-4 w-[calc(100vw-2rem)] sm:w-96 h-[520px] max-h-[calc(100vh-8rem)] border-line-strong`;
  };

  return (
    <>
      {chat.isAgentMode && (
        <div className="agent-mode-border fixed inset-0 z-[9999] pointer-events-none" />
      )}

      {!isOpen && !chat.isAgentMode && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-10 right-4 z-50 flex items-center gap-2 border border-line-strong bg-panel px-3 py-2 font-mono text-xs text-fg transition-colors duration-100 hover:border-signal hover:text-signal"
        >
          <span className="dot bg-signal" aria-hidden="true" />
          ask agent
        </button>
      )}

      <div className={getChatContainerClasses()}>
        {chat.isAgentMode ? (
          <div className="flex items-center gap-2 px-3 font-mono text-xs text-fg">
            <span className="dot agent-dot bg-signal" aria-hidden="true" />
            <span>{config.agentModeLabel || 'Navigating...'}</span>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="panel-header">
              <h2 className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                <span className="dot bg-signal" aria-hidden="true" />
                site agent
              </h2>
              <div className="flex items-center gap-3 normal-case tracking-normal">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label={isExpanded ? 'Collapse chat' : 'Expand chat'}
                  className="hover:text-fg"
                >
                  {isExpanded ? '[–]' : '[+]'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="hover:text-fg"
                >
                  [x]
                </button>
              </div>
            </div>

            {/* Messages */}
            <div role="log" className="custom-scrollbar flex-1 space-y-3 overflow-y-auto p-3 text-sm">
              {chat.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[88%] border px-3 py-2 ${
                    msg.sender === 'user'
                      ? 'border-signal/40 bg-signal/10 text-fg'
                      : 'border-line bg-ink text-fg/90'
                  }`}>
                    {msg.sender === 'bot' ? (
                      <ReactMarkdown components={markdownComponents}>{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}

              {chat.currentStreamedText && (
                <div className="flex justify-start">
                  <div className="max-w-[88%] border border-line bg-ink px-3 py-2 text-fg/90">
                    <ReactMarkdown components={markdownComponents}>{chat.currentStreamedText}</ReactMarkdown>
                  </div>
                </div>
              )}

              {chat.isLoading && !chat.currentStreamedText && (
                <div className="font-mono text-xs text-mute">
                  thinking<span className="agent-dot">_</span>
                </div>
              )}

              {chat.pendingAgentAction && !chat.isLoading && (
                <div className="flex gap-2">
                  <button
                    onClick={() => void chat.confirmNavigation()}
                    className="btn-signal"
                  >
                    Yes, show me!
                  </button>
                  <button
                    onClick={() => chat.declineNavigation()}
                    className="btn"
                  >
                    No thanks
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-line p-2">
              <div className="flex items-center gap-2 border border-line bg-ink px-2 focus-within:border-signal">
                <span className="font-mono text-signal" aria-hidden="true">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={chat.input}
                  onChange={(e) => chat.setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me anything..."
                  aria-label="Chat input"
                  className="h-9 flex-1 border-0 bg-transparent p-0 font-mono text-[13px] text-fg placeholder:text-mute focus:outline-none focus:ring-0"
                />
                {chat.isLoading ? (
                  <button
                    onClick={() => chat.stopStreaming()}
                    aria-label="Stop response"
                    className="font-mono text-[11px] text-warn hover:text-fg"
                  >
                    stop
                  </button>
                ) : (
                  <button
                    onClick={() => void chat.sendMessage()}
                    disabled={!chat.input.trim()}
                    aria-label="Send message"
                    className="font-mono text-[11px] text-signal hover:text-fg disabled:cursor-not-allowed disabled:text-mute"
                  >
                    send ↵
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShipPilotWidget;
