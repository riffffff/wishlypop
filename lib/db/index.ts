import { PrismaClient } from '@prisma/client';
import { CardData, CardStyling, TemplateId } from '@/types/card';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Helper: Format Prisma Card record to CardData interface
export function formatCardRecord(record: {
  id: string;
  cardId: string;
  templateId: string;
  recipientName: string;
  senderName: string | null;
  message: string;
  photoUrl: string | null;
  styling: string;
  isPaid: boolean;
  customerEmail: string | null;
  lemonSqueezyOrderId: string | null;
  createdAt: Date;
  updatedAt: Date;
}): CardData {
  let parsedStyling: CardStyling;
  try {
    parsedStyling = JSON.parse(record.styling);
  } catch {
    parsedStyling = {
      fontFamily: 'font-serif',
      accentColor: '#D97706',
      backgroundColor: '#FEF3C7',
      textColor: '#78350F',
      textAlign: 'center'
    };
  }

  return {
    id: record.id,
    cardId: record.cardId,
    templateId: record.templateId as TemplateId,
    recipientName: record.recipientName,
    senderName: record.senderName ?? undefined,
    message: record.message,
    photoUrl: record.photoUrl,
    styling: parsedStyling,
    isPaid: record.isPaid,
    customerEmail: record.customerEmail,
    lemonSqueezyOrderId: record.lemonSqueezyOrderId,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
