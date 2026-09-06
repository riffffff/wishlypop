'use client';

import React from 'react';
import { CARD_TEMPLATES } from '@/lib/templates';
import { TemplateId } from '@/types/card';
import { Check, Sparkles } from 'lucide-react';

interface TemplateSelectorProps {
  selectedId: TemplateId;
  onSelect: (templateId: TemplateId) => void;
}

export function TemplateSelector({ selectedId, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Pilih Template Desain
        </label>
        <span className="text-xs text-slate-500">3 Pilihan Desain</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {CARD_TEMPLATES.map((tmpl) => {
          const isSelected = tmpl.id === selectedId;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelect(tmpl.id)}
              className={`relative flex flex-col items-start p-3 rounded-2xl text-left border-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70'
              }`}
            >
              {/* Badge */}
              <div className="w-full flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tmpl.badge}
                </span>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Color swatch mini preview */}
              <div className="flex items-center gap-1 mb-2">
                {tmpl.colorPalette.slice(0, 3).map((color, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                {tmpl.name}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                {tmpl.tagline}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
