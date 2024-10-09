import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! Ask me anything.' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentBotMessage, setCurrentBotMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, currentBotMessage]);

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
                setCurrentBotMessage((prev) => prev + parsedData.message.content); // Update UI with new chunk
              }
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
          }
        }
      }

      // Once streaming is done, move the bot message to the messages array
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: fullBotMessage }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Oops! Something went wrong.' },
      ]);
    }

    setIsLoading(false);
    setCurrentBotMessage('');
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

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faComments} size="2x" />
        </button>
      )}
      <div
        className={`fixed bottom-0 right-0 bg-gray-900 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? (isExpanded ? 'w-3/4 h-3/4' : 'w-96 h-[32rem]') : 'w-0 h-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Chatbot</h2>
            <div>
              <button onClick={toggleExpand} className="text-white hover:text-gray-300 mr-4">
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
                className={`my-2 p-2 rounded-xl ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white ml-auto text-right w-auto max-w-[70%]'
                    : 'bg-gray-700 text-white mr-auto text-left w-auto max-w-[70%]'
                } break-words`}
                style={{
                  borderRadius:
                    msg.sender === 'user'
                      ? '20px 20px 0 20px'
                      : '20px 20px 20px 0',
                }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {currentBotMessage && (
              <div
                className="my-2 p-2 rounded-xl bg-gray-700 text-white mr-auto w-auto max-w-[70%] break-words"
                style={{ borderRadius: '20px 20px 20px 0' }}
              >
                <ReactMarkdown>{currentBotMessage}</ReactMarkdown>
              </div>
            )}
            {isLoading && !currentBotMessage && (
              <div
                className="my-2 p-2 rounded-xl bg-gray-700 text-white mr-auto w-auto max-w-[70%] break-words"
                style={{ borderRadius: '20px 20px 20px 0' }}
              >
                <span className="animate-pulse">...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message... (Press Enter to send)"
              className="w-full p-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none resize-none bg-gray-700 text-white"
              rows="3"
            />
            <button
              onClick={sendMessage}
              className="mt-2 bg-blue-600 text-white p-2 rounded-lg shadow-md w-full hover:bg-blue-700 disabled:bg-blue-500"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
