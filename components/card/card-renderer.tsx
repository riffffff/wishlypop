'use client';

import React from 'react';
import Image from 'next/image';
import { CardData } from '@/types/card';
import { WatermarkOverlay } from './watermark-overlay';
import { Sparkles, Heart, Cake, Gift, PartyPopper } from 'lucide-react';
import { Emoji } from '../ui/emoji';

interface CardRendererProps {
  card: CardData;
  showWatermark?: boolean;
  className?: string;
}

export function CardRenderer({ card, showWatermark = false, className = '' }: CardRendererProps) {
  const {
    templateId = 'minimalist-warm',
    recipientName = 'Best Friend',
    senderName,
    message,
    photoUrl,
    styling
  } = card;

  const fontClass = styling?.fontFamily || 'font-serif';
  const accentColor = styling?.accentColor || '#D97706';
  const textAlign = styling?.textAlign || 'center';

  return (
    <div 
      className={`relative w-full max-w-[440px] aspect-[4/5] sm:aspect-[3/4] mx-auto rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${className}`}
      style={{
        backgroundColor: styling?.backgroundColor || '#FFFBEB',
        color: styling?.textColor || '#1E293B',
      }}
    >
      {/* Template Variant Rendering */}
      {templateId === 'minimalist-warm' && (
        <MinimalistWarmLayout 
          recipientName={recipientName}
          senderName={senderName}
          message={message}
          photoUrl={photoUrl}
          accentColor={accentColor}
          fontClass={fontClass}
          textAlign={textAlign}
        />
      )}

      {templateId === 'festive-joy' && (
        <FestiveJoyLayout 
          recipientName={recipientName}
          senderName={senderName}
          message={message}
          photoUrl={photoUrl}
          accentColor={accentColor}
          fontClass={fontClass}
          textAlign={textAlign}
        />
      )}

      {templateId === 'photo-memory' && (
        <PhotoMemoryLayout 
          recipientName={recipientName}
          senderName={senderName}
          message={message}
          photoUrl={photoUrl}
          accentColor={accentColor}
          fontClass={fontClass}
          textAlign={textAlign}
        />
      )}

      {/* Watermark overlay if enabled */}
      {showWatermark && <WatermarkOverlay />}
    </div>
  );
}

// 1. Minimalist Warm Layout
function MinimalistWarmLayout({
  recipientName,
  senderName,
  message,
  photoUrl,
  accentColor,
  fontClass,
  textAlign
}: {
  recipientName: string;
  senderName?: string;
  message: string;
  photoUrl?: string | null;
  accentColor: string;
  fontClass: string;
  textAlign: string;
}) {
  return (
    <div className="relative h-full w-full p-6 sm:p-8 flex flex-col justify-between border-[6px] border-double" style={{ borderColor: `${accentColor}33` }}>
      {/* Decorative top ornaments */}
      <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest opacity-80" style={{ color: accentColor }}>
        <Sparkles className="w-4 h-4" />
        <span>Celebration of You</span>
        <Sparkles className="w-4 h-4" />
      </div>

      <div className="my-auto flex flex-col items-center gap-4">
        {/* Optional Photo */}
        {photoUrl && (
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1 shadow-md" style={{ background: `linear-gradient(135deg, ${accentColor}, #ffffff)` }}>
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
              <Image 
                src={photoUrl} 
                alt={recipientName} 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        )}

        <div className="text-center space-y-1">
          <p className="text-xs sm:text-sm font-medium tracking-wide uppercase opacity-75">
            Happy Birthday To
          </p>
          <h2 
            className={`text-2xl sm:text-4xl font-bold tracking-tight ${fontClass}`}
            style={{ color: accentColor }}
          >
            {recipientName || 'Someone Special'}
          </h2>
        </div>

        {/* Message body */}
        <div className={`w-full max-h-[160px] sm:max-h-[190px] overflow-y-auto px-2 py-1 leading-relaxed text-sm sm:text-base opacity-90 ${fontClass} text-${textAlign}`}>
          <p className="whitespace-pre-line italic">
            &ldquo;{message || 'Wishing you the happiest birthday filled with peace, laughter, and endless dreams fulfilled.'}&rdquo;
          </p>
        </div>
      </div>

      {/* Signature & Bottom Ornament */}
      <div className="pt-2 border-t flex items-center justify-between text-xs sm:text-sm opacity-75" style={{ borderColor: `${accentColor}30` }}>
        <span className="flex items-center gap-1">
          <Heart className="w-3.5 h-3.5 fill-current" style={{ color: accentColor }} />
          With deep love
        </span>
        {senderName && (
          <span className="font-semibold" style={{ color: accentColor }}>
            — {senderName}
          </span>
        )}
      </div>
    </div>
  );
}

// 2. Festive Joy Layout
function FestiveJoyLayout({
  recipientName,
  senderName,
  message,
  photoUrl,
  accentColor,
  fontClass,
  textAlign
}: {
  recipientName: string;
  senderName?: string;
  message: string;
  photoUrl?: string | null;
  accentColor: string;
  fontClass: string;
  textAlign: string;
}) {
  return (
    <div className="relative h-full w-full p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
      {/* Background festive floating badges */}
      <div className="absolute top-2 left-3 opacity-20 pointer-events-none">
        <PartyPopper className="w-16 h-16" style={{ color: accentColor }} />
      </div>
      <div className="absolute top-3 right-4 opacity-20 pointer-events-none">
        <Cake className="w-14 h-14" style={{ color: accentColor }} />
      </div>

      {/* Header Banner */}
      <div className="relative z-10 text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider text-white uppercase shadow-sm" style={{ backgroundColor: accentColor }}>
          <Gift className="w-3.5 h-3.5" />
          <span>It&apos;s Party Time!</span>
        </div>
        <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 ${fontClass}`}>
          HAPPY BIRTHDAY!
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: accentColor }}>
          ✨ {recipientName || 'Dear Friend'} ✨
        </h2>
      </div>

      {/* Central content & photo */}
      <div className="relative z-10 my-auto flex flex-col items-center gap-3">
        {photoUrl && (
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-lg border-4 border-white rotate-1">
            <Image 
              src={photoUrl} 
              alt={recipientName} 
              fill 
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className={`w-full max-h-[140px] sm:max-h-[170px] overflow-y-auto px-3 py-2 rounded-xl bg-white/70 backdrop-blur-xs border border-white shadow-xs text-${textAlign}`}>
          <p className={`text-xs sm:text-sm font-medium leading-relaxed ${fontClass}`}>
            {message || "Let's turn up the music and celebrate another wonderful trip around the sun! Cheers to you!"}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-xs sm:text-sm font-semibold tracking-wide">
        {senderName ? (
          <span className="inline-flex items-center gap-1" style={{ color: accentColor }}>
            <span>From: {senderName}</span>
            <Emoji emoji="🎉" size={16} />
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 opacity-70">
            <span>Best Wishes Always</span>
            <Emoji emoji="🎈" size={16} />
          </span>
        )}
      </div>
    </div>
  );
}

// 3. Photo Memory Box Layout
function PhotoMemoryLayout({
  recipientName,
  senderName,
  message,
  photoUrl,
  accentColor,
  fontClass,
  textAlign
}: {
  recipientName: string;
  senderName?: string;
  message: string;
  photoUrl?: string | null;
  accentColor: string;
  fontClass: string;
  textAlign: string;
}) {
  return (
    <div className="relative h-full w-full p-5 sm:p-7 flex flex-col justify-between bg-slate-100">
      {/* Faux Washi Tape at Top */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/80 backdrop-blur-xs rotate-2 shadow-xs border-dashed border-amber-300/60 z-20" />

      {/* Polaroid Container */}
      <div className="relative z-10 w-full bg-white rounded-lg p-3 pb-5 shadow-xl border border-slate-200 flex flex-col items-center">
        <div className="relative w-full aspect-square max-h-[210px] sm:max-h-[230px] rounded bg-slate-100 overflow-hidden shadow-inner flex items-center justify-center">
          {photoUrl ? (
            <Image 
              src={photoUrl} 
              alt={recipientName} 
              fill 
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
              <Cake className="w-10 h-10 mb-1 opacity-60 text-slate-400" />
              <span className="text-xs">Photo Memory Space</span>
            </div>
          )}
        </div>

        {/* Polaroid caption */}
        <div className="mt-3 text-center w-full px-1">
          <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${fontClass}`} style={{ color: accentColor }}>
            Happy Birthday, {recipientName}!
          </h3>
        </div>
      </div>

      {/* Handwritten Message Box below polaroid */}
      <div className="relative z-10 mt-3 p-3 rounded-lg bg-white/80 border border-slate-200 shadow-xs">
        <div className={`max-h-[110px] sm:max-h-[130px] overflow-y-auto text-${textAlign}`}>
          <p className={`text-xs sm:text-sm text-slate-700 leading-relaxed font-sans ${fontClass}`}>
            {message || "Remembering all the great moments and looking forward to many more adventures together."}
          </p>
        </div>
        {senderName && (
          <div className="mt-1 text-right text-xs font-semibold" style={{ color: accentColor }}>
            — {senderName}
          </div>
        )}
      </div>
    </div>
  );
}
