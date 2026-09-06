import { CardTemplateConfig } from '@/types/card';

export const CARD_TEMPLATES: CardTemplateConfig[] = [
  {
    id: 'minimalist-warm',
    name: 'Minimalist Warm',
    tagline: 'Elegan, tulus, & menenangkan',
    description: 'Sentuhan warna hangat pastel, tipografi anggun bernuansa intim dan penuh makna.',
    previewThumbnail: '/templates/minimalist.webp',
    badge: 'Paling Populer',
    defaultStyling: {
      fontFamily: 'font-serif',
      accentColor: '#D97706', // Amber 600
      backgroundColor: '#FEF3C7', // Amber 100
      textColor: '#78350F', // Amber 900
      textAlign: 'center',
      envelopeColor: '#F59E0B'
    },
    colorPalette: [
      '#D97706', // Warm Amber
      '#EA580C', // Terracotta Orange
      '#BE123C', // Rose Berry
      '#4D7C0F', // Olive Sage
      '#4338CA'  // Classic Indigo
    ]
  },
  {
    id: 'festive-joy',
    name: 'Festive Joy',
    tagline: 'Ceria, bersemangat, & penuh pesta',
    description: 'Desain cerah bertabur ilustrasi konfeti, pita, dan aura perayaan ulang tahun yang meriah.',
    previewThumbnail: '/templates/festive.webp',
    badge: 'Ceria & Meriah',
    defaultStyling: {
      fontFamily: 'font-outfit',
      accentColor: '#EC4899', // Pink 500
      backgroundColor: '#FDF2F8', // Pink 50
      textColor: '#831843', // Pink 950
      textAlign: 'center',
      envelopeColor: '#F43F5E'
    },
    colorPalette: [
      '#EC4899', // Hot Pink
      '#8B5CF6', // Purple Glow
      '#06B6D4', // Electric Cyan
      '#F59E0B', // Sunshine Gold
      '#10B981'  // Vibrant Mint
    ]
  },
  {
    id: 'photo-memory',
    name: 'Photo Memory Box',
    tagline: 'Nostalgia & framing foto polaroid',
    description: 'Menonjolkan foto kenangan terbaik bersama orang tersayang dalam bingkai vintage modern.',
    previewThumbnail: '/templates/memory.webp',
    badge: 'Fokus Foto',
    defaultStyling: {
      fontFamily: 'font-caveat',
      accentColor: '#6366F1', // Indigo 500
      backgroundColor: '#F8FAFC', // Slate 50
      textColor: '#1E293B', // Slate 800
      textAlign: 'center',
      envelopeColor: '#4F46E5'
    },
    colorPalette: [
      '#6366F1', // Royal Indigo
      '#059669', // Deep Emerald
      '#DB2777', // Magenta Berry
      '#D97706', // Vintage Ochre
      '#334155'  // Charcoal Slate
    ]
  }
];

export const FONT_OPTIONS = [
  { id: 'font-playfair', name: 'Playfair Display', class: 'font-serif tracking-normal', label: 'Elegan' },
  { id: 'font-outfit', name: 'Outfit', class: 'font-sans font-semibold tracking-wide', label: 'Modern' },
  { id: 'font-caveat', name: 'Handwritten', class: 'font-sans italic', label: 'Tulisan Tangan' },
  { id: 'font-serif', name: 'Classic Serif', class: 'font-serif', label: 'Klasik' },
  { id: 'font-sans', name: 'Clean Sans', class: 'font-sans', label: 'Bersih' },
  { id: 'font-jakarta', name: 'Jakarta Sans', class: 'font-sans font-medium', label: 'Kasual' },
];
