import crypto from 'crypto';

interface CreateCheckoutParams {
  cardId: string;
  email: string;
  recipientName: string;
  successUrl: string;
}

export async function createLemonSqueezyCheckout({
  cardId,
  email,
  recipientName,
  successUrl,
}: CreateCheckoutParams) {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
  const variantId = process.env.LEMON_SQUEEZY_VARIANT_ID;

  // Fallback to local simulation in test/development mode if credentials are not configured yet
  if (!apiKey || !storeId || !variantId) {
    console.warn('Lemon Squeezy credentials not fully set. Using simulator mode for local testing.');
    return {
      checkoutUrl: `/success?id=${cardId}&simulated=true&email=${encodeURIComponent(email)}`,
      simulated: true
    };
  }

  const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            email,
            custom: {
              card_id: cardId,
              recipient_name: recipientName
            }
          },
          product_options: {
            redirect_url: successUrl,
          }
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: storeId.toString()
            }
          },
          variant: {
            data: {
              type: 'variants',
              id: variantId.toString()
            }
          }
        }
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Lemon Squeezy error: ${JSON.stringify(errorData)}`);
  }

  const result = await response.json();
  const checkoutUrl = result.data.attributes.url;

  return {
    checkoutUrl,
    simulated: false
  };
}

/**
 * Verify webhook HMAC signature from Lemon Squeezy header: x-signature
 */
export function verifyLemonSqueezySignature(rawBody: string, signature: string, secret: string): boolean {
  try {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');
    return crypto.timingSafeEqual(digest, signatureBuffer);
  } catch (err) {
    console.error('Signature verification error:', err);
    return false;
  }
}
