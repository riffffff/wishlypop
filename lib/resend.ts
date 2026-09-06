interface SendCardEmailParams {
  toEmail: string;
  recipientName: string;
  cardUrl: string;
}

export async function sendCardDeliveryEmail({
  toEmail,
  recipientName,
  cardUrl
}: SendCardEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`\n==============================================`);
    console.log(`[SIMULATED EMAIL DELIVERY] To: ${toEmail}`);
    console.log(`Subject: Your Wishly Birthday Card for ${recipientName} is Ready! 🎂`);
    console.log(`Card Link: ${cardUrl}`);
    console.log(`==============================================\n`);
    return { success: true, simulated: true };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Wishly Cards <onboarding@resend.dev>',
        to: [toEmail],
        subject: `Your Birthday Card for ${recipientName} is Ready! 🎂`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background-color: #FFFDF9; border-radius: 16px; border: 1px solid #FED7AA;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #D97706; margin: 0; font-size: 24px;">Wishly 🎂</h1>
              <p style="color: #64748B; font-size: 14px; margin-top: 4px;">Your personal birthday card is live and ready to share!</p>
            </div>

            <div style="background-color: #FFFFFF; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0; margin-bottom: 24px;">
              <p style="font-size: 15px; color: #1E293B; line-height: 1.5; margin: 0 0 12px 0;">
                Hi there! Thank you for choosing Wishly. Your interactive digital birthday card for <strong>${recipientName}</strong> has been successfully unlocked.
              </p>
              <p style="font-size: 14px; color: #475569; line-height: 1.5; margin: 0;">
                Share this link with ${recipientName} via WhatsApp, Messenger, or email. When they open it, they will enjoy a personalized reveal celebration!
              </p>
            </div>

            <div style="text-align: center; margin-bottom: 24px;">
              <a href="${cardUrl}" style="display: inline-block; background-color: #D97706; color: #FFFFFF; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(217, 119, 6, 0.2);">
                Open & Share Birthday Card &rarr;
              </a>
            </div>

            <div style="text-align: center; border-top: 1px solid #E2E8F0; padding-top: 16px;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0;">
                Card URL: <a href="${cardUrl}" style="color: #D97706;">${cardUrl}</a>
              </p>
            </div>
          </div>
        `
      })
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Resend email error:', err);
      return { success: false, error: err };
    }

    const data = await res.json();
    return { success: true, id: data.id };
  } catch (error) {
    console.error('Failed to send email via Resend:', error);
    return { success: false, error };
  }
}
