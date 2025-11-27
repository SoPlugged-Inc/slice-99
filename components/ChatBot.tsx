import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);

  // Initialize Chat Session
  useEffect(() => {
    if (isOpen && !chatSession) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chat = ai.chats.create({
          model: 'gemini-3-pro-preview',
          config: {
            systemInstruction: `You are a helpful, friendly, and professional assistant for Co-Create.
Co-Create is a service ("The Utility Layer for Creator Marketing") that helps small e-commerce businesses pool resources to afford influencer marketing.

Key details about Co-Create:
- Cost: $99 per slot (flat rate).
- What it is: Non-competing brands pool into one viral-style "Haul" video.
- The Offer: Get your product on TikTok. Guaranteed.
- Process: 1. Book a slot. 2. Ship product to Kitchener, ON. 3. Watch the video (you get the raw file + usage rights).
- Guarantee: Vetted creators with >3% engagement. You get a guaranteed post.
- Returns: No returns, products are gifts to creators.
- Contact: hello@joincocreate.ca for support.

Answer questions concisely. If asked about booking, direct them to click the "Claim a Slot" button.
Do not make up facts not in this prompt. If unsure, ask them to email hello@joincocreate.ca.
Tone: Efficient, trustworthy, "Linear-style" professional.`,
          },
        });
        setChatSession(chat);
        setMessages([{role: 'model', text: 'Hi there! I can help you with questions about how Co-Create works, shipping, or our guarantee.'}]);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    }
  }, [isOpen, chatSession]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatSession) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: result.text || "I'm sorry, I couldn't generate a response." }]);
    } catch (error) {
      console.error("Chat Error", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, something went wrong. Please try emailing us instead." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${isOpen ? 'bg-neutral-darkest text-white rotate-90' : 'bg-primary text-white'}`}
        aria-label="Toggle Support Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[90vw] max-w-sm h-[500px] bg-white rounded-xl shadow-2xl border border-neutral-lighter flex flex-col overflow-hidden animate-[slideUpFade_0.3s_ease-out]">
          {/* Header */}
          <div className="bg-neutral-darkest p-4 flex items-center gap-3 border-b border-neutral-darker">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
               <Sparkles size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Co-Create Assistant</h3>
              <p className="text-xs text-neutral-400">Powered by Gemini</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-lightest/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white border border-neutral-lighter text-neutral-darkest rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                  <div className="bg-white border border-neutral-lighter p-3 rounded-lg rounded-tl-none shadow-sm flex items-center gap-2">
                     <Loader2 size={16} className="animate-spin text-primary" />
                     <span className="text-xs text-neutral-dark">Thinking...</span>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-neutral-lighter">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about slots, shipping, etc..."
                className="w-full pl-4 pr-12 py-3 bg-neutral-lightest border border-neutral-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-neutral-darkest placeholder:text-neutral-light"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};