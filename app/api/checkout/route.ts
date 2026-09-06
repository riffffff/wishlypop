import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createLemonSqueezyCheckout } from '@/lib/lemon-squeezy';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cardId, email } = body;

    if (!cardId || !email) {
      return NextResponse.json(
        { error: 'Card ID and customer email are required.' },
        { status: 400 }
      );
    }

    // Verify card exists
    const card = await prisma.card.findUnique({
      where: { cardId }
    });

    if (!card) {
      return NextResponse.json({ error: 'Card not found.' }, { status: 404 });
    }

    // Update customer email in card draft
    await prisma.card.update({
      where: { cardId },
      data: { customerEmail: email }
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const successUrl = `${appUrl}/success?id=${cardId}`;

    const { checkoutUrl, simulated } = await createLemonSqueezyCheckout({
      cardId,
      email,
      recipientName: card.recipientName,
      successUrl
    });

    return NextResponse.json({
      success: true,
      checkoutUrl,
      simulated
    });
  } catch (error: unknown) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to initiate checkout.' },
      { status: 500 }
    );
  }
}
