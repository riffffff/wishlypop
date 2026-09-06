import { NextRequest, NextResponse } from 'next/server';
import { prisma, formatCardRecord } from '@/lib/db';
import { nanoid } from 'nanoid';
import { CardStyling, TemplateId } from '@/types/card';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      templateId,
      recipientName,
      senderName,
      message,
      photoUrl,
      styling,
      existingCardId
    } = body;

    if (!recipientName || !message) {
      return NextResponse.json(
        { error: 'Recipient name and message are required.' },
        { status: 400 }
      );
    }

    // Generate readable random slug (7 chars, e.g. bday92x)
    const cardId = existingCardId || nanoid(8).toLowerCase().replace(/[^a-z0-9]/g, 'w');

    const cardRecord = await prisma.card.upsert({
      where: { cardId },
      update: {
        templateId: (templateId as TemplateId) || 'minimalist-warm',
        recipientName: recipientName.trim(),
        senderName: senderName?.trim() || null,
        message: message.trim(),
        photoUrl: photoUrl || null,
        styling: JSON.stringify(styling as CardStyling),
      },
      create: {
        cardId,
        templateId: (templateId as TemplateId) || 'minimalist-warm',
        recipientName: recipientName.trim(),
        senderName: senderName?.trim() || null,
        message: message.trim(),
        photoUrl: photoUrl || null,
        styling: JSON.stringify(styling as CardStyling),
        isPaid: false,
      }
    });

    return NextResponse.json({
      success: true,
      cardId: cardRecord.cardId,
      card: formatCardRecord(cardRecord)
    });
  } catch (error) {
    console.error('Error saving card:', error);
    return NextResponse.json(
      { error: 'Failed to save card draft.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cardId = searchParams.get('cardId');

    if (!cardId) {
      return NextResponse.json({ error: 'Card ID required.' }, { status: 400 });
    }

    const record = await prisma.card.findUnique({
      where: { cardId }
    });

    if (!record) {
      return NextResponse.json({ error: 'Card not found.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      card: formatCardRecord(record)
    });
  } catch (error) {
    console.error('Error retrieving card:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve card.' },
      { status: 500 }
    );
  }
}
