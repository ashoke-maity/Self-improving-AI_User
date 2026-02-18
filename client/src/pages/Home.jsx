import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

function Home() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Nexus AI. How can I help you today?", sender: 'ai' }
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: "I'm a simulated AI response. I can help you with coding, writing, or just chatting! This is a demo interface.",
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };


  return (
    <div className="flex h-screen bg-gray-950 text-white font-sans overflow-hidden">
      {/* Sidebar with transition */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${!isSidebarOpen && 'md:!hidden'
          }`}
      >
        <Sidebar toggleSidebar={() => setIsSidebarOpen(false)} />
      </div>

      <main className="flex-1 flex flex-col relative bg-gray-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-gray-950 w-full">
        {/* Toggle Sidebar Button - Only visible when sidebar is closed */}
        {!isSidebarOpen && (
          <div className="absolute top-4 left-4 z-10">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-gray-400 hover:text-white bg-gray-900/50 hover:bg-gray-800 rounded-lg transition-all backdrop-blur-sm border border-gray-800 shadow-sm"
              title="Open sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        )}

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'ai' ? 'bg-gradient-to-tr from-indigo-500 to-purple-600' : 'bg-gray-700'}`}>
                  {msg.sender === 'ai' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold text-white">U</span>
                  )}
                </div>

                <div className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-5 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                    ? 'bg-blue-600/90 text-white rounded-tr-sm'
                    : 'bg-gray-800 text-gray-100 rounded-tl-sm border border-gray-700/50'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 h-10 px-4 bg-gray-800 rounded-2xl rounded-tl-sm border border-gray-700/50">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-900 border-t border-gray-800">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSend} className="relative flex flex-col gap-2 bg-gray-800 rounded-xl p-2 border border-gray-700 focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-purple-500 transition-all shadow-lg pb-10">
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  title="Attach file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                  </svg>
                </button>

                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  placeholder="Message Nexus AI..."
                  className="w-full bg-transparent text-white placeholder-gray-400 text-sm resize-none focus:outline-none py-2.5 max-h-32 min-h-[44px] overflow-y-auto"
                  rows={1}
                  style={{ height: 'auto', minHeight: '44px' }}
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className={`p-2 rounded-lg transition-all duration-200 ${input.trim()
                    ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-md shadow-purple-500/20'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                  </svg>
                </button>
              </div>

              <div className="absolute bottom-2 left-2">
                <button type="button" className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-700/50 text-xs text-gray-400 font-medium transition-colors">
                  <span>Model: GPT-4 Turbo</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
            </form>
            <div className="text-center mt-2 flex flex-col items-center gap-2">
              <span className="text-xs text-gray-500">Nexus AI can make mistakes. Consider checking important information.</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;