'use client';

import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Calculator,
  Truck,
  CreditCard,
  Mail,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface AiCheckoutAssistantProps {
  embedded?: boolean;
  orderContext?: {
    subtotal?: number;
    shippingTier?: string;
    shippingFee?: number;
    paymentMethod?: string;
    itemCount?: number;
  };
}

export function AiCheckoutAssistant({ embedded = false, orderContext }: AiCheckoutAssistantProps) {
  const [isOpen, setIsOpen] = useState(embedded);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: "Hello! I am your **AI Laboratory & Checkout Assistant**. How can I help you today with shipping tiers (£15 / £40 / £25), payments (Bank Transfer, Crypto, Revolut), minimum order (£100), or peptide reconstitution calculations?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    {
      label: 'Shipping Tiers (£15/£40/£25)',
      icon: Truck,
      prompt: 'Explain the 3 shipping tiers (Normal £15, Express £40, International £25) and their delivery speeds.',
    },
    {
      label: 'Payment Methods',
      icon: CreditCard,
      prompt: 'How do Bank Transfer, Crypto, and Revolut App payments work for orders?',
    },
    {
      label: 'Reconstitution Calc',
      icon: Calculator,
      prompt: 'How much bacteriostatic water should I add to a 5mg or 10mg research peptide vial for proper concentration?',
    },
    {
      label: 'Zoho Email Dispatch',
      icon: Mail,
      prompt: 'How do customer and admin Zoho Mail order notifications work after placing an order?',
    },
  ];

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const newMessages = [...messages, { role: 'user' as const, text: userText.trim() }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/app/api/ai/assistant' in window ? '/api/ai/assistant' : '/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText.trim(),
          context: orderContext,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: 'assistant', text: data.reply }]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            text: 'I am here to assist with shipping (£15 Normal, £40 Express, £25 International), payment settlement, and reconstitution calculations. Please try asking another question.',
          },
        ]);
      }
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          text: 'Orders require a minimum of £100 GBP. Normal Shipping is £15, Express is £40, International is £25. You will receive an instant Zoho email confirmation upon ordering.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div
      className={`rounded-2xl border transition-all ${
        embedded
          ? 'bg-slate-900 border-slate-800 text-slate-100 p-5 shadow-lg'
          : 'bg-white border-slate-200 text-slate-900 shadow-md overflow-hidden'
      }`}
    >
      {/* Header Toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary-500/20 text-primary-400 border border-primary-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                AI Checkout & Research Assistant
              </h3>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Gemini 3.7
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Instant help with shipping, payments, £100 minimum & reconstitution
            </p>
          </div>
        </div>
        <button
          type="button"
          className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-800 space-y-4">
          
          {/* Quick Prompt Pills */}
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => {
              const Icon = q.icon;
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleSendMessage(q.prompt)}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all disabled:opacity-50"
                >
                  <Icon className="w-3.5 h-3.5 text-primary-400" />
                  <span>{q.label}</span>
                </button>
              );
            })}
          </div>

          {/* Messages Container */}
          <div className="max-h-64 overflow-y-auto space-y-3 pr-1 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-primary-600 text-white rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs py-1">
                <Loader2 className="w-4 h-4 animate-spin text-primary-400" />
                <span>AI is formulating laboratory answer...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about shipping, BAC water ratios, payments..."
              disabled={loading}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
