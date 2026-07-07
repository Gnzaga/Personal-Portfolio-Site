// src/components/ShipPilotWidget.js
//
// Site-styled chat window backed by ShipPilot. All chat/navigation logic
// comes from @shippilot/react's useShipPilotChat hook; the presentation
// reuses the glassmorphism design from the original ChatBot component.

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes, faExpand, faCompress, faPaperPlane, faStop } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import { useShipPilot, useShipPilotChat } from '@shippilot/react';

const markdownComponents = {
  p: ({ children }) => <p className="mb-2 text-sm last:mb-0">{children}</p>,
  a: ({ href, children }) => (
    <a href={href} className="text-green-400 underline hover:text-green-300">{children}</a>
  ),
  ul: ({ children }) => <ul className="mb-2 ml-4 list-disc text-sm space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal text-sm space-y-1">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
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
    const baseClasses = 'fixed shadow-2xl overflow-hidden z-50 transition-all duration-500 backdrop-blur-xl border border-white/10';
    if (chat.isAgentMode) {
      return `${baseClasses} bg-black/40 bottom-8 right-8 w-64 h-16 rounded-full flex items-center justify-center border-green-500/50`;
    }
    if (!isOpen) {
      return `${baseClasses} bg-black/60 bottom-4 right-4 w-0 h-0 rounded-3xl opacity-0 invisible`;
    }
    if (isExpanded) {
      return `${baseClasses} bg-black/80 bottom-4 right-0 w-full md:w-1/2 h-[80vh] rounded-l-3xl border-l border-white/20`;
    }
    return `${baseClasses} bg-black/70 bottom-6 right-6 w-80 md:w-96 h-[500px] rounded-3xl`;
  };

  return (
    <>
      {chat.isAgentMode && (
        <div className="agent-mode-border fixed inset-0 z-[9999] pointer-events-none border-4 border-green-500/30 animate-pulse" />
      )}

      {!isOpen && !chat.isAgentMode && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-full shadow-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 z-50 group"
        >
          <FontAwesomeIcon icon={faComments} size="lg" className="group-hover:text-green-400 transition-colors" />
        </button>
      )}

      <div className={getChatContainerClasses()}>
        {chat.isAgentMode ? (
          <div className="flex items-center space-x-3 text-white px-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-medium tracking-wide text-sm">{config.agentModeLabel || 'Navigating...'}</span>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <h2 className="text-white font-bold text-sm tracking-wide">AI Assistant</h2>
              </div>
              <div className="flex items-center space-x-3 text-white/60">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label={isExpanded ? 'Collapse chat' : 'Expand chat'}
                  className="hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={isExpanded ? faCompress : faExpand} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div role="log" className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {chat.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user'
                      ? 'bg-green-600/80 text-white rounded-br-none'
                      : 'bg-white/10 text-white/90 rounded-bl-none border border-white/5'
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
                  <div className="max-w-[85%] p-3 rounded-2xl rounded-bl-none bg-white/10 text-white/90 border border-white/5 text-sm">
                    <ReactMarkdown components={markdownComponents}>{chat.currentStreamedText}</ReactMarkdown>
                  </div>
                </div>
              )}

              {chat.isLoading && !chat.currentStreamedText && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}

              {chat.pendingAgentAction && !chat.isLoading && (
                <div className="flex gap-2">
                  <button
                    onClick={() => void chat.confirmNavigation()}
                    className="px-4 py-2 bg-green-600/80 hover:bg-green-500 rounded-lg text-white text-xs font-medium transition-colors"
                  >
                    Yes, show me!
                  </button>
                  <button
                    onClick={() => chat.declineNavigation()}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-medium transition-colors"
                  >
                    No thanks
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chat.input}
                  onChange={(e) => chat.setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me anything..."
                  aria-label="Chat input"
                  className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-green-500/50 transition-colors placeholder:text-white/30"
                />
                {chat.isLoading ? (
                  <button
                    onClick={() => chat.stopStreaming()}
                    aria-label="Stop response"
                    className="p-2 bg-red-900/40 hover:bg-red-800/60 border border-red-500/30 text-white rounded-xl transition-all"
                  >
                    <FontAwesomeIcon icon={faStop} className="text-sm" />
                  </button>
                ) : (
                  <button
                    onClick={() => void chat.sendMessage()}
                    disabled={!chat.input.trim()}
                    aria-label="Send message"
                    className="p-2 bg-white/10 hover:bg-green-600/80 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
