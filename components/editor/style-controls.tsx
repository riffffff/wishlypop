'use client';

import React from 'react';
import { CardStyling, FontFamily } from '@/types/card';
import { FONT_OPTIONS } from '@/lib/templates';
import { Palette, Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface StyleControlsProps {
  styling: CardStyling;
  availableColors: string[];
  onChange: (newStyling: CardStyling) => void;
}

export function StyleControls({ styling, availableColors, onChange }: StyleControlsProps) {
  const updateStyle = <K extends keyof CardStyling>(key: K, value: CardStyling[K]) => {
    onChange({
      ...styling,
      [key]: value
    });
  };

  return (
    <div className="space-y-4">
      {/* Font Family Selection */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          <Type className="w-4 h-4 text-amber-500" />
          Typography Font
        </label>
        <div className="grid grid-cols-3 gap-2">
          {FONT_OPTIONS.map((f) => {
            const isSelected = styling.fontFamily === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => updateStyle('fontFamily', f.id as FontFamily)}
                className={`py-2 px-2.5 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 text-amber-900 font-bold ring-2 ring-amber-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className={`text-sm mb-0.5 ${f.class}`}>Aa</div>
                <div className="truncate text-[11px]">{f.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color Palette */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-amber-500" />
          Theme Accent Color
        </label>
        <div className="flex items-center gap-3 flex-wrap">
          {availableColors.map((color) => {
            const isSelected = styling.accentColor.toLowerCase() === color.toLowerCase();
            return (
              <button
                key={color}
                type="button"
                onClick={() => updateStyle('accentColor', color)}
                className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? 'border-slate-800 scale-110 shadow-md ring-2 ring-amber-500/30'
                    : 'border-white hover:scale-105 shadow-xs'
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Color ${color}`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-white shadow-xs" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Text Alignment */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800">
          Text Alignment
        </label>
        <div className="flex items-center gap-2">
          {(['left', 'center', 'right'] as const).map((align) => {
            const isSelected = styling.textAlign === align;
            return (
              <button
                key={align}
                type="button"
                onClick={() => updateStyle('textAlign', align)}
                className={`flex-1 py-2 rounded-xl flex items-center justify-center border text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 text-amber-900 font-semibold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                }`}
              >
                {align === 'left' && <AlignLeft className="w-4 h-4" />}
                {align === 'center' && <AlignCenter className="w-4 h-4" />}
                {align === 'right' && <AlignRight className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
