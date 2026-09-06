'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardData } from '@/types/card';
import { CardRenderer } from '@/components/card/card-renderer';
import { Sparkles, Heart, MailOpen, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import { Emoji } from '../ui/emoji';

interface EnvelopeCardProps {
  card: CardData;
}

export function EnvelopeCard({ card }: EnvelopeCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const envelopeColor = card.styling?.envelopeColor || '#D97706';
  const recipient = card.recipientName || 'Someone Special';

  const triggerReveal = () => {
    if (!isOpen) {
      setIsOpen(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const handleReset = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[85vh] p-4">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ============ CLOSED ENVELOPE VIEW ============ */
          <motion.div
            key="envelope-closed"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full flex flex-col items-center"
          >
            {/* Clickable Envelope Container */}
            <div
              onClick={triggerReveal}
              className="relative w-full max-w-[360px] aspect-[4/3] rounded-3xl shadow-2xl p-6 flex flex-col justify-between cursor-pointer group hover:scale-[1.03] transition-transform duration-300 select-none overflow-hidden"
              style={{
                backgroundColor: envelopeColor,
                boxShadow: `0 25px 50px -12px ${envelopeColor}66`
              }}
            >
              {/* Envelope Flap Fold Illusion */}
              <div 
                className="absolute top-0 left-0 right-0 h-1/2 bg-black/10 origin-top"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                }}
              />

              {/* Top status */}
              <div className="relative z-10 flex items-center justify-between text-white/90">
                <span className="text-[11px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Special Delivery
                </span>
                <span className="text-xl inline-flex items-center">
                  <Emoji emoji="💌" size={28} />
                </span>
              </div>

              {/* Envelope Center / Seal */}
              <div className="relative z-20 my-auto flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-4 border-amber-200">
                  <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
                </div>
                <div className="mt-4 text-center text-white">
                  <p className="text-xs uppercase tracking-widest opacity-85">A Birthday Wish For</p>
                  <h2 className="text-2xl font-black tracking-tight drop-shadow-md mt-0.5">
                    {recipient}
                  </h2>
                </div>
              </div>

              {/* Bottom CTA hint */}
              <div className="relative z-10 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-black/25 px-4 py-1.5 rounded-full backdrop-blur-xs group-hover:bg-black/40 transition-colors">
                  <MailOpen className="w-3.5 h-3.5" />
                  Sentuh untuk membuka kartu ✨
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4 animate-bounce">
              Ketuk amplop di atas untuk melihat ucapan spesialmu
            </p>
          </motion.div>
        ) : (
          /* ============ OPENED CARD VIEW ============ */
          <motion.div
            key="card-revealed"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
            className="w-full flex flex-col items-center space-y-5"
          >
            {/* The Unlocked Card (No Watermark) */}
            <div className="w-full flex justify-center">
              <CardRenderer 
                card={card} 
                showWatermark={false}
                className="shadow-2xl"
              />
            </div>

            {/* Micro Interaction: Replay envelope or Celebrate */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  try {
                    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
                  } catch {}
                }}
                className="px-4 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span className="inline-flex items-center gap-1">
                  <span>Rayakan Lagi</span>
                  <Emoji emoji="🎊" size={16} />
                </span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Tutup Amplop</span>
              </button>
            </div>

            {/* Subtle viral loop footer */}
            <div className="pt-6 border-t border-slate-200/60 w-full text-center space-y-2">
              <p className="text-xs text-slate-500">
                Tersentuh dengan kartu ini? Buat kartu ulang tahun untuk orang terdekatmu dalam 2 menit.
              </p>
              <Link
                href="/create"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline"
              >
                <span>Buat Kartu di Wishly &rarr;</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
