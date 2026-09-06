export type TemplateId = 'minimalist-warm' | 'festive-joy' | 'photo-memory';

export type FontFamily = 
  | 'font-sans'
  | 'font-serif'
  | 'font-playfair'
  | 'font-outfit'
  | 'font-caveat'
  | 'font-jakarta';

export type MessageCategory = 'friend' | 'partner' | 'parent' | 'coworker';

export interface CardStyling {
  fontFamily: FontFamily;
  accentColor: string; // Hex color code e.g. #F43F5E
  backgroundColor: string; // Background color code
  textColor: string;
  textAlign: 'left' | 'center' | 'right';
  envelopeColor?: string;
}

export interface CardData {
  id?: string;
  cardId: string; // Public unique slug (e.g. xyz123)
  templateId: TemplateId;
  recipientName: string;
  senderName?: string;
  message: string;
  photoUrl?: string | null;
  styling: CardStyling;
  isPaid: boolean;
  customerEmail?: string | null;
  lemonSqueezyOrderId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CardTemplateConfig {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  previewThumbnail: string;
  badge: string;
  defaultStyling: CardStyling;
  colorPalette: string[];
}

export interface BankMessage {
  id: string;
  category: MessageCategory;
  categoryTitle: string;
  title: string;
  text: string;
}
