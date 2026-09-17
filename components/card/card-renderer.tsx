'use client';

import React from 'react';
import Image from 'next/image';
import { CardData } from '@/types/card';
import { WatermarkOverlay } from './watermark-overlay';
import { Heart, Cake, Image as ImageIcon } from 'lucide-react';

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
    <div
      className="relative h-full w-full p-6 sm:p-8 flex flex-col justify-between border"
      style={{
        borderColor: `${accentColor}45`,
        backgroundColor: '#FFF4C7'
      }}
    >
      <div className="absolute inset-3 border-2 pointer-events-none" style={{ borderColor: `${accentColor}45` }} />
      <div className="absolute top-0 left-0 w-3/5 h-3 rounded-br-full bg-[#FF6B8A] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2/5 h-3 rounded-tl-full bg-[#35B6A0] pointer-events-none" />
      <div className="absolute -top-16 -right-14 w-40 h-40 rounded-full border-[18px] border-[#FF6B8A80] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#35B6A080] pointer-events-none" />
      <div className="absolute top-20 left-5 w-2 h-16 rounded-full bg-[#FF6B8A] rotate-[28deg] pointer-events-none" />
      <div className="absolute bottom-24 right-5 w-3 h-3 rounded-full bg-[#7B61FF] pointer-events-none" />
      <div className="absolute top-8 left-8 w-7 h-7 rounded-full bg-[#FFD166] pointer-events-none" />
      <div className="absolute top-10 right-20 w-3 h-3 rounded-full bg-[#35B6A0] pointer-events-none" />
      <div className="absolute bottom-16 right-10 flex gap-1 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#FF6B8A]" />
        <span className="w-2 h-2 rounded-full bg-[#FFD166]" />
        <span className="w-2 h-2 rounded-full bg-[#7B61FF]" />
      </div>
      {/* Quiet editorial header */}
      <div className="relative z-10 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.24em] opacity-75" style={{ color: accentColor }}>
        <span className="h-px w-8" style={{ backgroundColor: `${accentColor}80` }} />
        <span>Best day ever</span>
        <span className="h-px w-8" style={{ backgroundColor: `${accentColor}80` }} />
      </div>

      <div className="relative z-10 my-auto flex flex-col items-center gap-4">
        {/* Optional Photo */}
        {photoUrl ? (
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1 shadow-md" style={{ backgroundColor: '#FF6B8A', border: '5px solid #FFD166' }}>
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#BFEDE2]">
              <Image
                src={photoUrl}
                alt={recipientName}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        ) : (
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-dashed flex flex-col items-center justify-center gap-1.5" style={{ borderColor: '#FF6B8A', color: '#A63D63', backgroundColor: '#BFEDE2' }}>
            <ImageIcon className="w-6 h-6 opacity-70" />
            <span className="text-[9px] uppercase tracking-widest opacity-70">Your photo</span>
          </div>
        )}

        <div className="text-center space-y-1">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#A63D63' }}>
            Today is all about
          </p>
          <h2 
            className={`text-2xl sm:text-4xl font-bold tracking-tight ${fontClass}`}
            style={{ color: accentColor }}
          >
            {recipientName || 'Someone Special'}
          </h2>
        </div>

        {/* Message body */}
        <div className={`w-full max-h-[160px] sm:max-h-[190px] overflow-y-auto px-4 py-3 rounded-2xl bg-white border-2 border-[#FFB5C5] shadow-sm leading-relaxed text-sm sm:text-base opacity-90 ${fontClass} text-${textAlign}`}>
          <p className="whitespace-pre-line italic">
            &ldquo;{message || 'Wishing you the happiest birthday filled with peace, laughter, and endless dreams fulfilled.'}&rdquo;
          </p>
        </div>
      </div>

      {/* Signature & Bottom Ornament */}
      <div className="relative z-10 pt-2 border-t flex items-center justify-between text-xs sm:text-sm opacity-75" style={{ borderColor: `${accentColor}30` }}>
        <span className="flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 fill-current" style={{ color: accentColor }} />
          With love
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
    <div
      className="relative h-full w-full p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
      style={{
        backgroundColor: '#FFD6E4'
      }}
    >
      <div className="absolute inset-3 rounded-[1.35rem] border pointer-events-none" style={{ borderColor: `${accentColor}35` }} />
      <div className="absolute -top-20 -left-16 w-48 h-48 rounded-full border-[28px] border-[#7B61FF55] pointer-events-none" />
      <div className="absolute top-8 right-7 flex gap-1.5 opacity-70 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#FFD166]" />
        <span className="w-2 h-3 rounded-full rotate-45 bg-[#00B8A9]" />
        <span className="w-2 h-2 rounded-full bg-[#7B61FF]" />
      </div>
      <div className="absolute top-24 left-6 flex flex-col gap-2 opacity-70 pointer-events-none">
        <span className="w-2 h-5 rounded-full rotate-[28deg] bg-[#FFD166]" />
        <span className="w-2 h-2 rounded-full bg-[#00B8A9]" />
      </div>
      <div className="absolute bottom-20 left-5 w-10 h-1 rotate-45 rounded-full bg-[#FFD166] opacity-95 pointer-events-none" />
      <div className="absolute bottom-[4.5rem] left-9 w-10 h-1 -rotate-45 rounded-full bg-[#FF4F81] opacity-95 pointer-events-none" />
      <div className="absolute bottom-8 right-7 w-7 h-7 rounded-full border-4 opacity-50 pointer-events-none" style={{ borderColor: `${accentColor}80` }} />
      {/* Header */}
      <div className="relative z-10 text-center space-y-1">
        <div className="inline-flex items-center px-3 py-1 border rounded-full text-[10px] font-bold tracking-[0.18em] uppercase shadow-sm" style={{ borderColor: `${accentColor}70`, color: accentColor, backgroundColor: `${accentColor}0B` }}>
          <span>A special day</span>
        </div>
        <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 ${fontClass}`}>
          Let&apos;s Celebrate!
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: accentColor }}>
          {recipientName || 'Dear Friend'}
        </h2>
      </div>

      {/* Central content & photo */}
      <div className="relative z-10 my-auto flex flex-col items-center gap-3">
        {photoUrl ? (
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-lg border-4 border-white rotate-1" style={{ boxShadow: `0 8px 24px ${accentColor}35, 0 0 0 5px ${accentColor}18` }}>
            <Image
              src={photoUrl}
              alt={recipientName}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 rotate-1" style={{ borderColor: `${accentColor}70`, color: accentColor, backgroundColor: `${accentColor}0B` }}>
            <ImageIcon className="w-7 h-7 opacity-75" />
            <span className="text-[10px] uppercase tracking-[0.16em] opacity-75">Add a photo</span>
          </div>
        )}

        <div className={`w-full max-h-[140px] sm:max-h-[170px] overflow-y-auto px-4 py-3 rounded-xl bg-white/85 backdrop-blur-xs border border-white shadow-md text-${textAlign}`}>
          <p className={`text-xs sm:text-sm leading-relaxed ${fontClass}`}>
            {message || "Let's turn up the music and celebrate another wonderful trip around the sun! Cheers to you!"}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-xs sm:text-sm font-semibold tracking-wide border-t pt-3" style={{ borderColor: `${accentColor}25` }}>
        {senderName ? (
          <span style={{ color: accentColor }}>
            From {senderName}
          </span>
        ) : (
          <span className="opacity-70">Best wishes always</span>
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
    <div
      className="relative h-full w-full p-5 sm:p-7 flex flex-col justify-between"
      style={{
        backgroundColor: '#DDF7EF'
      }}
    >
      <div className="absolute inset-3 border pointer-events-none" style={{ borderColor: `${accentColor}28` }} />
      <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full border-[16px] border-[#FF8FA370] pointer-events-none" />
      <div className="absolute top-16 right-4 w-2 h-20 rounded-full bg-[#35B6A0] rotate-[-32deg] pointer-events-none" />
      <div className="absolute bottom-16 left-4 w-3 h-3 rounded-full bg-[#7B61FF] pointer-events-none" />
      <div className="absolute top-12 left-5 w-10 h-2 rounded-full bg-[#FF6B6B] rotate-[-18deg] pointer-events-none" />
      <div className="absolute bottom-10 right-8 w-5 h-5 rounded-full bg-[#FFD166] pointer-events-none" />
      <div className="absolute top-5 left-5 text-[9px] uppercase tracking-[0.22em] font-semibold opacity-50" style={{ color: accentColor }}>
        Memory no. 01
      </div>
      {/* Editorial photo frame */}
      <div className="relative z-10 mt-4 w-full bg-white p-2 pb-4 shadow-lg border-4 border-[#FF8FA3] rotate-[-1deg] flex flex-col items-center">
        <div className="absolute -top-3 right-8 w-16 h-6 rotate-3 bg-[#FFD166] opacity-90" />
        <div className="absolute -bottom-2 left-8 w-10 h-2 rounded-full bg-[#7B61FF]" />
        <div className="relative w-full aspect-[4/3] max-h-[210px] sm:max-h-[230px] bg-[#BFEDE2] overflow-hidden flex items-center justify-center">
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
              <Cake className="w-8 h-8 mb-2 text-[#FF6B6B]" />
              <span className="text-[10px] uppercase tracking-widest text-[#456B6B]">Your photo goes here</span>
            </div>
          )}
        </div>

        {/* Polaroid caption */}
        <div className="mt-3 text-center w-full px-1">
          <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${fontClass}`} style={{ color: '#7B3F62' }}>
            Happy birthday, {recipientName}.
          </h3>
        </div>
      </div>

      {/* Message below the photo */}
      <div className="relative z-10 mt-4 px-2">
        <div className="mb-2 h-1 w-16 rounded-full bg-[#FF6B6B]" />
        <div className={`max-h-[110px] sm:max-h-[130px] overflow-y-auto px-3 py-2 rounded-xl bg-white/70 border border-white text-${textAlign}`}>
          <p className={`text-xs sm:text-sm text-slate-700 leading-relaxed font-sans ${fontClass}`}>
            {message || "Remembering all the great moments and looking forward to many more adventures together."}
          </p>
        </div>
        {senderName && (
          <div className="mt-2 text-right text-[10px] uppercase tracking-widest font-semibold" style={{ color: accentColor }}>
            — {senderName}
          </div>
        )}
      </div>
    </div>
  );
}
