// src/components/ChatBot.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes, faExpand, faCompress, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import { computeNavigationSteps } from '../utils/siteGraph';

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

function stripAgentTags(text) {
  let cleaned = text.replace(/\[\[AGENT:[\s\S]*?\]\]/g, '');
  cleaned = cleaned.replace(/\[\[AGENT:[\s\S]*$/, '');
  cleaned = cleaned.replace(/\[\[$/, '');
  return cleaned;
}

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
  const [pendingAgentAction, setPendingAgentAction] = useState(null);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, currentBotMessage, pendingAgentAction]);

  useEffect(() => {
    return () => {
      if (agentHighlightTarget) {
        const el = document.querySelector(`[data-agent-target="${agentHighlightTarget}"]`);
        if (el) el.classList.remove('agent-highlight');
      }
    };
  }, [agentHighlightTarget]);

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
        if (navLink) navLink.classList.remove('agent-nav-highlight', 'agent-nav-click');
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
      default: break;
    }
  }, [navigate]);

  const executeAgentSequence = useCallback(async (action) => {
    if (!action) return;
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    setIsAgentMode(true);
    await wait(600);
    try {
      const steps = computeNavigationSteps(location.pathname, action.nav || location.pathname, action.target || null);
      for (const step of steps) await executeStep(step, wait);
    } finally {
      setIsAgentMode(false);
    }
  }, [location.pathname, executeStep]);

  const handleAgentConfirm = useCallback(() => {
    const action = pendingAgentAction;
    setPendingAgentAction(null);
    setMessages((prev) => [...prev, { sender: 'user', text: 'Yes, show me!' }]);
    if (action) setTimeout(() => executeAgentSequence(action), 300);
  }, [pendingAgentAction, executeAgentSequence]);

  const handleAgentDecline = useCallback(() => {
    setPendingAgentAction(null);
    setMessages((prev) => [...prev, { sender: 'user', text: 'No thanks.' }]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setPendingAgentAction(null);
    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setCurrentBotMessage('');

    const currentMessages = [...messages, userMsg];
    const history = currentMessages.slice(-10).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text,
    }));

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, currentPage: location.pathname, history }),
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
            const token = json.delta ?? json.message?.content ?? json.choices?.[0]?.delta?.content;
            if (token !== undefined) {
              full += token;
              setCurrentBotMessage(stripAgentTags(full));
            }
          } catch (err) {}
        }
      }
      if (full) {
        const { cleanedText, agentAction } = extractAgentAction(full);
        setMessages((prev) => [...prev, { sender: 'bot', text: cleanedText }]);
        if (agentAction) setPendingAgentAction(agentAction);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Oops! Something went wrong...' }]);
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

  // Styles
  const getChatContainerClasses = () => {
    const baseClasses = `fixed shadow-2xl overflow-hidden z-50 transition-all duration-500 backdrop-blur-xl border border-white/10`;
    
        // Agent Mode: Minimal pill in the corner
    
        if (isAgentMode) {
    
          return `${baseClasses} bg-black/40 bottom-8 right-8 w-64 h-16 rounded-full flex items-center justify-center border-green-500/50`;
    
        }
    
    
    
        // Closed state
    
        if (!isOpen) {
    
          return `${baseClasses} bg-black/60 bottom-4 right-4 w-0 h-0 rounded-3xl opacity-0 invisible`;
    
        }
    
    
    
        // Expanded state
    
        if (isExpanded) {
    
          return `${baseClasses} bg-black/80 bottom-4 right-0 w-full md:w-1/2 h-[80vh] rounded-l-3xl border-l border-white/20`;
    
        }
    
    
    
        // Normal open state
    
        return `${baseClasses} bg-black/70 bottom-6 right-6 w-80 md:w-96 h-[500px] rounded-3xl`;
    
      };
    
    
    
      const components = {
    
        p: ({ children }) => <p className="mb-2 text-sm">{children}</p>,
    
        a: ({ href, children }) => (
    
          <a href={href} className="text-green-400 underline hover:text-green-300">{children}</a>
    
        ),
    
      };
    
    
    
      return (
    
        <>
    
          {isAgentMode && <div className="agent-mode-border fixed inset-0 z-[9999] pointer-events-none border-4 border-green-500/30 animate-pulse" />}
    
    
    
          {!isOpen && !isAgentMode && (
    
            <button
    
              onClick={() => setIsOpen(true)}
    
              className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-full shadow-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 z-50 group"
    
            >
    
              <FontAwesomeIcon icon={faComments} size="lg" className="group-hover:text-green-400 transition-colors" />
    
            </button>
    
          )}
    
    
    
          <div className={getChatContainerClasses()}>
    
            {isAgentMode ? (
    
              <div className="flex items-center space-x-3 text-white px-6">
    
                <span className="relative flex h-3 w-3">
    
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
    
                </span>
    
                <span className="font-medium tracking-wide text-sm">Agent Navigating...</span>
    
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
    
                    <button onClick={() => setIsExpanded(!isExpanded)} className="hover:text-white transition-colors">
    
                      <FontAwesomeIcon icon={isExpanded ? faCompress : faExpand} />
    
                    </button>
    
                    <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
    
                      <FontAwesomeIcon icon={faTimes} />
    
                    </button>
    
                  </div>
    
                </div>
    
    
    
                {/* Messages */}
    
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
    
                  {messages.map((msg, idx) => (
    
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
    
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
    
                        msg.sender === 'user' 
    
                          ? 'bg-green-600/80 text-white rounded-br-none' 
    
                          : 'bg-white/10 text-white/90 rounded-bl-none border border-white/5'
    
                      }`}>
    
                        {msg.sender === 'bot' ? (
    
                          <ReactMarkdown components={components}>{msg.text}</ReactMarkdown>
    
                        ) : (
    
                          msg.text
    
                        )}
    
                      </div>
    
                    </div>
    
                  ))}
    
                  {currentBotMessage && (
    
                    <div className="flex justify-start">
    
                      <div className="max-w-[85%] p-3 rounded-2xl rounded-bl-none bg-white/10 text-white/90 border border-white/5 text-sm">
    
                        <ReactMarkdown components={components}>{currentBotMessage}</ReactMarkdown>
    
                      </div>
    
                    </div>
    
                  )}
    
                  {isLoading && !currentBotMessage && (
    
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
    
                  {pendingAgentAction && !isLoading && (
    
                    <div className="flex gap-2">
    
                      <button onClick={handleAgentConfirm} className="px-4 py-2 bg-green-600/80 hover:bg-green-500 rounded-lg text-white text-xs font-medium transition-colors">
    
                        Yes, navigate
    
                      </button>
    
                      <button onClick={handleAgentDecline} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-medium transition-colors">
    
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
    
                      value={input}
    
                      onChange={(e) => setInput(e.target.value)}
    
                      onKeyDown={handleKeyPress}
    
                      placeholder="Ask me anything..."
    
                      className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-green-500/50 transition-colors placeholder:text-white/30"
    
                    />
    
                    <button 
    
                      onClick={sendMessage}
    
                      disabled={!input.trim() || isLoading}
    
                      className="p-2 bg-white/10 hover:bg-green-600/80 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    
                    >
    
                      <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
    
                    </button>
    
                  </div>
    
                </div>
    
              </div>
    
            )}
    
          </div>
    
        </>
    
      );
    
    };

export default ChatBot;