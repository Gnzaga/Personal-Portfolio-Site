import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes, faExpand, faCompress, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! I\'m a LLM model configured to answer questions about Alessandro. Ask me anything.' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentBotMessage, setCurrentBotMessage] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, currentBotMessage]);

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

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    setCurrentBotMessage('');

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let fullBotMessage = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        let lines = buffer.split('\n');
        buffer = lines.pop(); // Keep the last incomplete line

        for (let line of lines) {
          line = line.trim();
          if (line.startsWith('data: ')) {
            const data = line.slice('data: '.length).trim();
            if (data === '[DONE]') {
              break;
            }
            try {
              const parsedData = JSON.parse(data);
              if (parsedData.message && parsedData.message.content) {
                fullBotMessage += parsedData.message.content;
                setCurrentBotMessage(fullBotMessage);
              }
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
          }
        }
      }

      // Add the final bot message to the messages state
      if (fullBotMessage) {
        const botMessage = { sender: 'bot', text: fullBotMessage };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
      setIsLoading(false);
      setCurrentBotMessage('');
    } catch (error) {
      console.error('Error while sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Oops! Something went wrong.' },
      ]);
      setIsLoading(false);
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

  // Custom components for ReactMarkdown
  const components = {
    p: ({ children }) => <p className="mb-4">{children}</p>,
  };

  // Function to add extra newlines between paragraphs
  const formatBotMessage = (text) => {
    return text.replace(/\n{2,}/g, '\n\n\n');
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 z-50"
        >
          <FontAwesomeIcon icon={faComments} size="2x" />
        </button>
      )}
      <div
        ref={chatContainerRef}
        className={`fixed inset-0 bg-gray-900 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } md:inset-auto md:bottom-4 md:right-4 md:w-96 md:h-[32rem] ${
          isExpanded ? 'md:w-3/4 md:h-3/4' : ''
        } overflow-hidden z-50`}
        style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
      >
        <div className="flex flex-col h-full">
          <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Chatbot</h2>
            <div>
              <button onClick={toggleExpand} className="text-white hover:text-gray-300 mr-4 hidden md:inline-block">
                <FontAwesomeIcon icon={isExpanded ? faCompress : faExpand} size="lg" />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300">
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`my-2 p-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white ml-auto'
                    : 'bg-gray-700 text-white mr-auto'
                } max-w-[85%] md:max-w-[75%] break-words`}
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
              <div className="my-2 p-2 rounded-lg bg-gray-700 text-white mr-auto max-w-[85%] md:max-w-[75%] break-words">
                <ReactMarkdown components={components}>
                  {formatBotMessage(currentBotMessage)}
                </ReactMarkdown>
              </div>
            )}
            {isLoading && !currentBotMessage && (
              <div className="my-2 p-2 rounded-lg bg-gray-700 text-white mr-auto max-w-[85%] md:max-w-[75%]">
                <span className="animate-pulse">...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex items-center">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-grow p-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none resize-none bg-gray-700 text-white mr-2"
                rows="1"
                style={{ minHeight: '2.5rem', maxHeight: '6rem' }}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-500 flex-shrink-0"
                disabled={isLoading}
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