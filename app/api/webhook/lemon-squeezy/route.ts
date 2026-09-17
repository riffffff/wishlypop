import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyLemonSqueezySignature } from '@/lib/lemon-squeezy';
import { sendCardDeliveryEmail } from '@/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature');
    const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

    // Verify signature if secret is configured
    if (webhookSecret && signature) {
      const isValid = verifyLemonSqueezySignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload?.meta?.event_name;
    const customData = payload?.meta?.custom_data;
    const orderData = payload?.data;

    // We listen for order_created event
    if (eventName === 'order_created' || eventName === 'order_payment_success') {
      const cardId = customData?.card_id;
      const customerEmail = orderData?.attributes?.user_email || customData?.email;
      const orderId = orderData?.id ? String(orderData.id) : null;

      if (!cardId) {
        console.warn('Webhook received without card_id in custom_data');
        return NextResponse.json({ received: true, note: 'No card_id found' });
      }

      // Check existing card
      const existingCard = await prisma.card.findUnique({
        where: { cardId }
      });

      if (!existingCard) {
        return NextResponse.json({ error: 'Card not found' }, { status: 404 });
      }

      // Idempotency: skip if already paid
      if (existingCard.isPaid) {
        return NextResponse.json({ message: 'Order already processed (idempotent).' }, { status: 200 });
      }

      // Update card to paid
      await prisma.card.update({
        where: { cardId },
        data: {
          isPaid: true,
          customerEmail: customerEmail || existingCard.customerEmail,
          lemonSqueezyOrderId: orderId
        }
      });

      // Send delivery email
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const cardUrl = `${appUrl}/c/${cardId}`;

      const targetEmail = customerEmail || existingCard.customerEmail;
      if (targetEmail) {
        console.log(`[Webhook] Sending card delivery email to: ${targetEmail} for card: ${cardId}`);
        const emailResult = await sendCardDeliveryEmail({
          toEmail: targetEmail,
          recipientName: existingCard.recipientName,
          cardUrl
        });
        console.log(`[Webhook] Email delivery result for ${cardId}:`, emailResult);
      } else {
        console.warn(`[Webhook] Warning: No target email available for card ${cardId}`);
      }

      return NextResponse.json({ success: true, cardId, status: 'paid' }, { status: 200 });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return NextResponse.json(
      { error: 'Webhook processing internal error.' },
      { status: 500 }
    );
  }
}
