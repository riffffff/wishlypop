import { CardTemplateConfig } from '@/types/card';

export const CARD_TEMPLATES: CardTemplateConfig[] = [
  {
    id: 'minimalist-warm',
    name: 'Sunlit Bloom',
    tagline: 'Playful, warm, & elegant',
    description: 'A bright stationery-inspired design with soft shapes and colorful details.',
    previewThumbnail: '/templates/minimalist.webp',
    badge: 'Most Popular',
    defaultStyling: {
      fontFamily: 'font-serif',
      accentColor: '#E85D75', // Coral pink
      backgroundColor: '#FFF4C7', // Butter yellow
      textColor: '#5B3040', // Berry charcoal
      textAlign: 'center',
      envelopeColor: '#E85D75'
    },
    colorPalette: [
      '#E85D75', // Coral pink
      '#FFD166', // Butter yellow
      '#35B6A0', // Aqua mint
      '#7B61FF', // Lilac violet
      '#FF8FA3'  // Soft hot pink
    ]
  },
  {
    id: 'festive-joy',
    name: 'Festive Joy',
    tagline: 'Modern, joyful, & refined',
    description: 'A polished celebration design with clean lines, soft contrast, and a confident sense of joy.',
    previewThumbnail: '/templates/festive.webp',
    badge: 'Bright & Festive',
    defaultStyling: {
      fontFamily: 'font-outfit',
      accentColor: '#FF4F81', // Hot pink
      backgroundColor: '#FFD6E4', // Rose pink
      textColor: '#4A3034', // Deep rose brown
      textAlign: 'center',
      envelopeColor: '#FF4F81'
    },
    colorPalette: [
      '#FF4F81', // Hot pink
      '#7B61FF', // Lilac violet
      '#00B8A9', // Bright teal
      '#FFD166', // Golden yellow
      '#FF8C42'  // Tangerine
    ]
  },
  {
    id: 'photo-memory',
    name: 'Color Memory',
    tagline: 'Bright memories, beautifully framed',
    description: 'A colorful scrapbook-inspired design that makes the photo and personal note stand out.',
    previewThumbnail: '/templates/memory.webp',
    badge: 'Photo Focus',
    defaultStyling: {
      fontFamily: 'font-playfair',
      accentColor: '#7B61FF', // Lilac violet
      backgroundColor: '#DDF7EF', // Mint paper
      textColor: '#383531', // Charcoal brown
      textAlign: 'center',
      envelopeColor: '#7B61FF'
    },
    colorPalette: [
      '#7B61FF', // Lilac violet
      '#35B6A0', // Aqua teal
      '#FF6B6B', // Coral
      '#FFD166', // Golden yellow
      '#FF8FA3'  // Pink
    ]
  }
];

export const FONT_OPTIONS = [
  { id: 'font-playfair', name: 'Playfair Display', class: 'font-serif tracking-normal', label: 'Elegant' },
  { id: 'font-outfit', name: 'Outfit', class: 'font-sans font-semibold tracking-wide', label: 'Modern' },
  { id: 'font-caveat', name: 'Handwritten', class: 'font-sans italic', label: 'Handwritten' },
  { id: 'font-serif', name: 'Classic Serif', class: 'font-serif', label: 'Classic' },
  { id: 'font-sans', name: 'Clean Sans', class: 'font-sans', label: 'Clean' },
  { id: 'font-jakarta', name: 'Jakarta Sans', class: 'font-sans font-medium', label: 'Casual' },
];
