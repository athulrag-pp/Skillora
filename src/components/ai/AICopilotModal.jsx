import React, { useState } from 'react';
import { useSkillora } from '../../context/SkilloraContext';
import { askManagementCopilot } from '../../services/aiEngine';
import { Bot, X, Send, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export const AICopilotModal = () => {
  const { isCopilotOpen, setIsCopilotOpen, leads, students, financeSummary, batches, navigateTo } = useSkillora();

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I am your **SKILLORA AI Business Copilot**. 

I analyze real-time data across your Sales CRM, Training Batches, Student Academic & Attendance Intelligence, and Finance Profitability.

How can I help your executive team today?`,
      actionText: "Show Executive Dashboard",
      actionPage: "dashboard"
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');

  if (!isCopilotOpen) return null;

  const quickQuestions = [
    "Which students need attention?",
    "Which batch is most profitable?",
    "Which leads should sales call today?",
    "Which invoices are at risk?"
  ];

  const handleSend = (textToSend) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    // Add user message
    const newMsgList = [...messages, { sender: 'user', text: q }];
    setMessages(newMsgList);
    setInputQuery('');

    // Generate AI Response using state
    setTimeout(() => {
      const response = askManagementCopilot(q, {
        leads,
        students,
        financeSummary,
        batches
      });

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: response.answer,
          actionText: response.suggestedAction,
          actionPage: response.actionPage
        }
      ]);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl glass-panel bg-gray-950 border border-indigo-500/40 rounded-2xl shadow-2xl flex flex-col h-[600px] overflow-hidden animate-in zoom-in duration-200">
        {/* Copilot Header */}
        <div className="p-4 bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-slate-900/80 border-b border-indigo-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center space-x-1.5">
                <span>SKILLORA AI Management Copilot</span>
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" />
              </h2>
              <p className="text-[11px] text-indigo-200">Real-time EduTech Business Intelligence Assistant</p>
            </div>
          </div>
          <button 
            onClick={() => setIsCopilotOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'glass-card border border-indigo-500/30 text-gray-200 rounded-bl-none shadow-lg'
                }`}
              >
                <div className="whitespace-pre-line">
                  {m.text}
                </div>

                {m.actionText && m.actionPage && (
                  <div className="mt-3 pt-2 border-t border-gray-700/50">
                    <button
                      onClick={() => {
                        navigateTo(m.actionPage);
                        setIsCopilotOpen(false);
                      }}
                      className="flex items-center space-x-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-bold px-3 py-1.5 rounded-lg border border-indigo-500/40 transition-all"
                    >
                      <span>{m.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-gray-900/60 border-t border-gray-800 flex items-center space-x-2 overflow-x-auto">
          <MessageSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-2.5 py-1 rounded-full border border-gray-700 whitespace-nowrap transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-gray-800 flex items-center space-x-2 bg-gray-950">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI Copilot (e.g., Which students need attention?)..."
            className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleSend()}
            className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl transition-colors shadow-lg shadow-indigo-500/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
