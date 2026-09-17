'use client';

import React, { useState } from 'react';
import { MESSAGE_BANK, MESSAGE_CATEGORIES } from '@/lib/message-bank';
import { MessageCategory, BankMessage } from '@/types/card';
import { X, BookOpen, Sparkles } from 'lucide-react';
import { Emoji } from '../ui/emoji';

interface MessageBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMessage: (text: string) => void;
}

export function MessageBankModal({ isOpen, onClose, onSelectMessage }: MessageBankModalProps) {
  const [activeCategory, setActiveCategory] = useState<MessageCategory>('friend');

  if (!isOpen) return null;

  const filteredMessages = MESSAGE_BANK.filter((m) => m.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-50/50 via-rose-50/30 to-amber-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Birthday Message Bank</h3>
              <p className="text-xs text-slate-500">Find personal message inspiration without writer&apos;s block</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 p-3 sm:px-6 border-b border-slate-100 bg-slate-50/70 overflow-x-auto no-scrollbar">
          {MESSAGE_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                <Emoji emoji={cat.emoji} size={16} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredMessages.map((msg: BankMessage) => (
            <div
              key={msg.id}
              className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-amber-400 hover:shadow-md transition-all group relative flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {msg.title}
                  </h4>
                  <span className="text-[11px] font-medium text-slate-400">
                    {msg.categoryTitle}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  &ldquo;{msg.text}&rdquo;
                </p>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    onSelectMessage(msg.text);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Use This Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>* You can still edit the wording after selecting a message</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
