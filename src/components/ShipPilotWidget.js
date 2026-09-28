// src/components/ShipPilotWidget.js
//
// Site-styled chat window backed by ShipPilot. All chat/navigation logic
// comes from @shippilot/react's useShipPilotChat hook; the presentation
// follows the editorial paper theme (tokens in src/index.css).

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes, faExpand, faCompress, faPaperPlane, faStop } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import { useShipPilot, useShipPilotChat } from '@shippilot/react';

const markdownComponents = {
  p: ({ children }) => <p className="mb-2 text-sm last:mb-0">{children}</p>,
  a: ({ href, children }) => (
    <a href={href} className="link">{children}</a>
  ),
  ul: ({ children }) => <ul className="mb-2 ml-4 list-disc text-sm space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal text-sm space-y-1">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
};

const ShipPilotWidget = () => {
  const { config, router, setAgentMode } = useShipPilot();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const chat = useShipPilotChat({
    chatEndpoint: config.chatEndpoint,
    siteGraph: config.siteGraph,
    router,
    welcomeMessage: config.welcomeMessage,
    setAgentMode,
  });

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
    const baseClasses = 'fixed overflow-hidden z-50 transition-opacity duration-200 bg-paper text-ink border border-rule rounded-sm shadow-[0_16px_48px_-16px_rgb(0_0_0/0.3)]';
    if (chat.isAgentMode) {
      return `${baseClasses} bottom-6 right-6 w-64 h-12 flex items-center justify-center border-accent`;
    }
    if (!isOpen) {
      return `${baseClasses} bottom-4 right-4 w-0 h-0 opacity-0 invisible`;
    }
    if (isExpanded) {
      return `${baseClasses} bottom-0 right-0 w-full md:w-1/2 h-[80vh]`;
    }
    return `${baseClasses} bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 sm:w-96 h-[500px] max-h-[80vh]`;
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
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 bg-paper text-ink border border-ink/70 px-4 py-2 rounded-full font-mono text-sm shadow-[0_8px_24px_-12px_rgb(0_0_0/0.35)] hover:border-accent hover:text-accent transition-colors"
        >
          <FontAwesomeIcon icon={faComments} />
          <span>Ask the site</span>
        </button>
      )}

      <div className={getChatContainerClasses()}>
        {chat.isAgentMode ? (
          <div className="flex items-center space-x-3 px-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="agent-dot relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
            </span>
            <span className="font-mono text-sm">{config.agentModeLabel || 'Navigating...'}</span>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-3 flex justify-between items-center border-b border-rule">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <h2 className="font-display text-lg">Ask about Alex’s work</h2>
              </div>
              <div className="flex items-center space-x-3 text-muted">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label={isExpanded ? 'Collapse chat' : 'Expand chat'}
                  className="hover:text-ink transition-colors"
                >
                  <FontAwesomeIcon icon={isExpanded ? faCompress : faExpand} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="hover:text-ink transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div role="log" className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {chat.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-sm text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-accent text-paper'
                      : 'bg-surface text-ink'
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
                  <div className="max-w-[85%] px-3 py-2 rounded-sm bg-surface text-ink text-sm leading-relaxed">
                    <ReactMarkdown components={markdownComponents}>{chat.currentStreamedText}</ReactMarkdown>
                  </div>
                </div>
              )}

              {chat.isLoading && !chat.currentStreamedText && (
                <div className="flex justify-start">
                  <div className="bg-surface px-3 py-2 rounded-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}

              {chat.pendingAgentAction && !chat.isLoading && (
                <div className="flex gap-2">
                  <button
                    onClick={() => void chat.confirmNavigation()}
                    className="px-3 py-1.5 bg-accent hover:bg-accent/90 rounded-sm text-paper font-mono text-xs transition-colors"
                  >
                    Yes, show me!
                  </button>
                  <button
                    onClick={() => chat.declineNavigation()}
                    className="px-3 py-1.5 border border-rule hover:border-ink rounded-sm text-ink font-mono text-xs transition-colors"
                  >
                    No thanks
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-rule">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chat.input}
                  onChange={(e) => chat.setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me anything..."
                  aria-label="Chat input"
                  className="flex-1 min-w-0 bg-paper border border-rule rounded-sm px-3 py-2 text-ink text-sm focus:outline-none focus:ring-0 focus:border-accent transition-colors placeholder:text-muted"
                />
                {chat.isLoading ? (
                  <button
                    onClick={() => chat.stopStreaming()}
                    aria-label="Stop response"
                    className="p-2 border border-rule hover:border-ink text-ink rounded-sm transition-colors"
                  >
                    <FontAwesomeIcon icon={faStop} className="text-sm" />
                  </button>
                ) : (
                  <button
                    onClick={() => void chat.sendMessage()}
                    disabled={!chat.input.trim()}
                    aria-label="Send message"
                    className="p-2 bg-accent text-paper hover:bg-accent/90 rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
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
