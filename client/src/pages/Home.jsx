import React, { useState, useRef, useEffect } from 'react'

function Home() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Reset height slightly to allow recalc
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        text: "I understand your message. This is a simulated response. Connect me to your AI API to get real responses!",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(e)
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`
    }
  }, [inputValue])

  const PromptForm = ({ centered = false }) => (
    <form onSubmit={handleSend} className="relative w-full">
      <div className={`relative group bg-[#2f2f2f] border border-white/5 rounded-[26px] p-2 focus-within:ring-1 focus-within:ring-white/10 focus-within:border-white/20 transition-all duration-300 ${centered ? 'shadow-2xl' : 'shadow-xl'}`}>

        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message AI..."
            className="w-full bg-transparent border-0 text-white placeholder-neutral-400 text-[15px] resize-none focus:ring-0 py-3 px-4 min-h-[44px] max-h-[200px]"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            rows="1"
            autoFocus={centered}
          />

          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className={`flex-none w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 mb-2 mr-2 ${inputValue.trim() || isLoading
                ? 'bg-white text-black hover:bg-neutral-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                : 'bg-[#444] text-[#888] cursor-not-allowed'
              }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={inputValue.trim() ? "translate-x-0.5" : ""}
              >
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <p className="text-[12px] text-neutral-500 mt-3 text-center font-medium tracking-wide">
        AI platform can make mistakes. Consider checking important information.
      </p>
    </form>
  )

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      {/* Header - Only show if active chat */}
      {messages.length > 0 && (
        <header className="flex-none bg-black/80 backdrop-blur-md border-b border-white/5 z-10">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-white to-gray-400 rounded-full flex items-center justify-center shadow-lg shadow-white/10">
                <span className="text-black font-bold text-sm">AI</span>
              </div>
              <div>
                <h1 className="text-base font-semibold text-white tracking-wide">AI Assistant</h1>
                <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Beta Preview</p>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar relative flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 w-full max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-white/20">
                <span className="text-black font-bold text-2xl">AI</span>
              </div>
              <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">AI Beta Preview</h1>
            </div>

            <div className="w-full">
              <PromptForm centered={true} />
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 pt-8 pb-32 w-full">
            <div className="space-y-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in group`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#333] to-[#111] border border-white/10 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm leading-relaxed text-[15px] ${message.sender === 'user'
                        ? 'bg-[#2a2a2a] text-white rounded-br-sm'
                        : 'bg-transparent text-gray-100'
                      }`}
                  >
                    <div className="whitespace-pre-wrap break-words font-light tracking-wide">
                      {message.text}
                    </div>
                    <div className={`text-[10px] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${message.sender === 'user' ? 'text-gray-400 text-right' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 justify-start animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#333] to-[#111] border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="bg-transparent text-white px-0 py-3">
                    <div className="flex space-x-1.5 items-center h-full">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </main>

      {/* Footer Prompt Area - Only show if active chat */}
      {messages.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-black pt-2 pb-6 z-20">
          <div className="max-w-3xl mx-auto px-4">
            <PromptForm centered={false} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
