'use client';

import React, { useMemo } from 'react';
import twemoji from '@twemoji/api';

interface EmojiProps {
  emoji: string;
  className?: string;
  size?: number | string;
}

export function Emoji({ emoji, className = '', size = 20 }: EmojiProps) {
  const parsedHtml = useMemo(() => {
    try {
      return twemoji.parse(emoji, {
        folder: 'svg',
        ext: '.svg',
        className: 'twemoji',
        attributes: () => ({
          width: typeof size === 'number' ? `${size}px` : size,
          height: typeof size === 'number' ? `${size}px` : size,
        }),
      });
    } catch {
      return emoji;
    }
  }, [emoji, size]);

  if (!parsedHtml) return null;

  return (
    <span
      className={`inline-flex items-center justify-center align-middle ${className}`}
      style={{ display: 'inline-flex', verticalAlign: 'middle' }}
      dangerouslySetInnerHTML={{ __html: parsedHtml }}
    />
  );
}
