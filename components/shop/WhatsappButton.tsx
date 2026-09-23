'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsappButtonProps {
  phoneNumber: string;
  message?: string;
}

export function WhatsappButton({ phoneNumber, message = "Hello! I'm interested in placing an order." }: WhatsappButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white border border-slate-200 shadow-xl rounded-2xl p-4 mb-4 max-w-[240px] relative"
          >
            <button 
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 bg-slate-100 text-slate-500 rounded-full p-1 hover:bg-slate-200 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Need Assistance?</p>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                  Chat with our UK support team for instant order help.
                </p>
              </div>
            </div>
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white border border-slate-200 shadow-2xl rounded-3xl w-[320px] overflow-hidden mb-4"
          >
            {/* Widget Header */}
            <div className="bg-emerald-600 p-5 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/30 flex items-center justify-center border border-white/20">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-600 rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Reta Support UK</h3>
                    <p className="text-[10px] text-emerald-100 font-medium opacity-90 tracking-wide uppercase">
                      Support Team Online
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-emerald-50/90 leading-relaxed">
                Hi there! 👋 How can we help with your order or research inquiry today?
              </p>
            </div>

            {/* Widget Body */}
            <div className="p-6 bg-slate-50 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => window.open(`https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent("I'd like to place a new order for peptides.")}`, '_blank')}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-primary-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" /> Place an Order
                  </button>
                  <button
                    onClick={() => window.open(`https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent("Can you help me with payment instructions?")}`, '_blank')}
                    className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    Payment Support
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 opacity-50">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  Secure End-to-End Encryption
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 text-center bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold uppercase tracking-widest transition-colors"
            >
              Start Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-emerald-500 text-white'
        }`}
        aria-label="Contact via WhatsApp"
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-8 h-8 fill-current" />
        )}
      </motion.button>
    </div>
  );
}

const ShieldCheck = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2.5}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
    />
  </svg>
);
