import crypto from 'crypto';

interface CreateCheckoutParams {
  cardId: string;
  email: string;
  recipientName: string;
  successUrl: string;
}

export function getLemonSqueezyConfig() {
  const mode = (
    process.env.LEMONSQUEEZY_MODE ||
    process.env.LEMON_SQUEEZY_MODE ||
    (process.env.NODE_ENV === 'production' ? 'live' : 'test')
  ).toLowerCase().trim();
  const isTestMode = mode === 'test';

  const apiKey = (process.env.LEMON_SQUEEZY_API_KEY || process.env.LEMONSQUEEZY_API_KEY || '').trim();
  const storeId = (process.env.LEMON_SQUEEZY_STORE_ID || process.env.LEMONSQUEEZY_STORE_ID || '').trim();
  const variantId = (process.env.LEMON_SQUEEZY_VARIANT_ID || process.env.LEMONSQUEEZY_VARIANT_ID || '').trim();
  const webhookSecret = (process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '').trim();

  return {
    mode,
    isTestMode,
    apiKey,
    storeId,
    variantId,
    webhookSecret,
  };
}

export async function createLemonSqueezyCheckout({
  cardId,
  email,
  recipientName,
  successUrl,
}: CreateCheckoutParams) {
  const { apiKey, storeId, variantId, isTestMode, mode } = getLemonSqueezyConfig();

  // Fallback to local simulation in test/development mode if credentials are not configured yet
  if (!apiKey || !storeId || !variantId) {
    console.warn(`[Lemon Squeezy] Credentials not fully set for mode '${mode}'. Using simulator.`);
    return {
      checkoutUrl: `/success?id=${cardId}&simulated=true&email=${encodeURIComponent(email)}`,
      simulated: true
    };
  }

  console.log(`[Lemon Squeezy Checkout] Creating checkout. Mode: ${mode} (test_mode: ${isTestMode}), Store: ${storeId}, Variant: ${variantId}`);

  const checkoutPayload = {
    data: {
      type: 'checkouts',
      attributes: {
        test_mode: isTestMode,
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
            id: String(storeId)
          }
        },
        variant: {
          data: {
            type: 'variants',
            id: String(variantId)
          }
        }
      }
    }
  };

  const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(checkoutPayload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(`[Lemon Squeezy Checkout Error] Status: ${response.status}`, JSON.stringify(errorData));
    throw new Error(`Lemon Squeezy error: ${JSON.stringify(errorData)} (Store: ${storeId}, Variant: ${variantId}, Mode: ${mode})`);
  }

  const result = await response.json();
  const checkoutUrl = result.data.attributes.url;

  return {
    checkoutUrl,
    simulated: false,
    testMode: isTestMode
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
