import  { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Send, Bot, User, Wand2 } from 'lucide-react';
import { analyzeInteractionPrompt } from '../Redux/hcpSlice';

export const AIChatBot = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! Describe your interaction with the HCP, and I will extract the details for you.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await dispatch(analyzeInteractionPrompt(userMsg.text)).unwrap();
      
      let botResponse = "";
      if (response.status === 'incomplete') {
        botResponse = `I got some of that. I still need the following details:\n- ${response.missing_fields.join('\n- ')}\n\nCan you provide them?`;
      } else {
        botResponse = "Extraction successful! I have populated the Interaction Details form for you.";
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: "Sorry, there was an error analyzing your input. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2.5rem)] w-full p-2 md:p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-teal-600 rounded-xl text-white shadow-md">
          <Wand2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
          <p className="text-sm text-gray-500">Your smart healthcare CRM copilot</p>
        </div>
      </div>

      <div className="flex flex-col flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-6">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-4 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div 
                className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                  msg.sender === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-teal-600 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              
              <div 
                className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.sender === 'user' 
                    ? 'bg-teal-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white border border-gray-100 p-5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500/50 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI assistant anything..."
              disabled={loading}
              className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-gray-200 rounded-xl text-[15px] focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none transition-all disabled:opacity-60"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || loading}
              className="absolute right-3 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 transition-colors shadow-sm"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
