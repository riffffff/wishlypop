'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface WatermarkOverlayProps {
  text?: string;
}

export function WatermarkOverlay({ text = 'WISHLY PREVIEW' }: WatermarkOverlayProps) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none select-none z-30 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-3 opacity-25 -rotate-12 mix-blend-multiply">
        <Sparkles className="w-8 h-8 text-slate-800" strokeWidth={1.5} />
        <p className="text-3xl sm:text-5xl font-black tracking-widest text-slate-900 whitespace-nowrap">
          {text}
        </p>
      </div>
    </div>
  );
}
