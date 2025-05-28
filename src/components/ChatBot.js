// src/components/ChatBot.js

import React, { useState, useEffect, useRef } from 'react'; // Import React and hooks for component logic
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icon rendering
import { faComments, faTimes, faExpand, faCompress, faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown for rendering markdown content
//import checkAndLoadModel from './checkAndLoadModel'; // Import function to check and load the model

/**
 * ChatBot Component
 * 
 * @description A chatbot component that allows users to interact with an LLM-based backend to ask questions.
 * It includes features such as expandable/collapsible UI, markdown rendering, and a smooth scrolling experience.
 *
 * @returns {JSX.Element} The rendered ChatBot component.
 */
const ChatBot = () => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! I\'m a LLM model configured to answer questions about Alessandro. Ask me anything.' }]); // Initial messages state
  const [input, setInput] = useState(''); // State for user input
  const [isLoading, setIsLoading] = useState(false); // State for loading status
  const [isOpen, setIsOpen] = useState(false); // State to track if the chatbot is open
  const [isExpanded, setIsExpanded] = useState(false); // State to track if the chatbot is expanded
  const [currentBotMessage, setCurrentBotMessage] = useState(''); // State for current streaming message from the bot
  const messagesEndRef = useRef(null); // Ref to scroll to the bottom of the messages
  const chatContainerRef = useRef(null); // Ref to adjust chat container size dynamically
  const mainContentRef = useRef(null); // Ref to main content that needs to be shifted
  const navbarRef = useRef(null); // Ref to navbar that needs to be shifted

  // Scrolls to the bottom of the chat when new messages are added or streaming messages are updated
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, currentBotMessage]); // Trigger scroll effect when messages or current bot message change

  // Adjusts chat container height on window resize
  useEffect(() => {
    const handleResize = () => {
      if (chatContainerRef.current) {
        const vh = window.innerHeight * 0.01;
        chatContainerRef.current.style.setProperty('--vh', `${vh}px`);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Cleanup listener on component unmount
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setCurrentBotMessage('');

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const reader  = response.body.getReader();
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
              setCurrentBotMessage(full);
            }
          } catch (err) {
            console.error('bad JSON', err, content);
          }
        }
      }

      if (full) {
        setMessages(prev => [...prev, { sender: 'bot', text: full }]);
      }
    } catch (err) {
      console.error('sendMessage error:', err);
      setMessages(prev => [
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

  const components = {
    p: ({ children }) => <p className="mb-4">{children}</p>,
  };

  const formatBotMessage = (text) => {
    return text.replace(/\n{2,}/g, '\n\n\n');
  };

  const getChatContainerClasses = () => {
    const baseClasses = `fixed shadow-lg overflow-hidden z-50 transition-all duration-500`;

    if (!isOpen) {
      return `${baseClasses} bg-gray-900 bottom-4 right-4 opacity-0 invisible`;
    }
    if (isExpanded) {
      // Semi-transparent backdrop at 20% opacity when expanded
      return `${baseClasses} bg-gray-800 bg-opacity-70 bottom-4 right-0 w-full md:w-1/2 h-96 md:h-[32rem] rounded-none md:rounded-l-lg opacity-100 visible`;
    }
    // Apply 20% opacity for collapsed view
    return `${baseClasses} bg-gray-900 bg-opacity-80 bottom-4 right-4 w-80 h-96 md:w-96 md:h-[32rem] rounded-lg opacity-100 visible`;
  };

  return (
    <>
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
          <div className={`${isExpanded ? 'bg-transparent' : 'bg-gray-200 dark:bg-gray-500 bg-opacity-30'} text-dark-800 dark:text-white p-4 flex justify-between items-center transition-colors duration-300`}>  {/* Header */}
            <h2 className="text-xl font-bold">Chatbot</h2>
            <div className="flex items-center">
              <button 
                onClick={toggleExpand} 
                className="text-dark-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 mr-4 inline-block transition-transform duration-300 transform hover:scale-110"
                aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
              >
                <FontAwesomeIcon icon={isExpanded ? faCompress : faExpand} size="lg" />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-dark-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-transform duration-300 transform hover:scale-110"
                aria-label="Close chat"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>
          </div>
          <div className={`flex-1 overflow-y-auto p-4 ${isExpanded ? 'bg-transparent' : 'bg-gray-100 dark:bg-gray-800 bg-opacity-50'} scrollbar-thin scrollbar-thumb-primary-500 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800 transition-colors duration-300`}>  {/* Messages area */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`my-2 p-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-primary-500 bg-opacity-90 text-white ml-auto'
                    : 'bg-gray-300 dark:bg-gray-700 bg-opacity-90 text-dark-800 dark:text-white mr-auto'
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
            {currentBotMessage && (
              <div className="my-2 p-2 rounded-lg bg-gray-300 dark:bg-gray-700 bg-opacity-70 text-dark-800 dark:text-white mr-auto max-w-[90%] md:max-w-[90%] break-words shadow-md transition-colors duration-300">
                <ReactMarkdown components={components}>
                  {formatBotMessage(currentBotMessage)}
                </ReactMarkdown>
              </div>
            )}
            {isLoading && !currentBotMessage && (
              <div className="my-2 p-2 rounded-lg bg-gray-300 dark:bg-gray-700 bg-opacity-70 text-dark-800 dark:text-white mr-auto max-w-[90%] md:max-w-[90%] shadow-md transition-colors duration-300">
                <span className="animate-pulse">
                  Searching knowledge base...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={`${isExpanded ? 'bg-transparent border-transparent' : 'bg-gray-100 dark:bg-gray-800 bg-opacity-70 border-gray-300 dark:border-gray-700 border-opacity-90'} p-4 border-t transition-colors duration-300`}>  {/* Input area */}
            <div className="flex items-center">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-dark-800 dark:text-white mr-2 bg-opacity-80 transition-colors duration-300"
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

export default ChatBot; // Export the component for use in other parts of the app
