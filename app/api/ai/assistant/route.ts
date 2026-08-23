import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_INSTRUCTION = `You are the Retatrutide Club UK Laboratory & Checkout AI Assistant.
You assist scientific researchers, laboratory technicians, and institutional purchasers with inquiries regarding:
1. Checkout & Shipping Policies:
   - Normal Shipping: £15.00 GBP (2-4 business days tracked UK domestic)
   - Express Shipping: £40.00 GBP (Next business day morning courier priority)
   - International Shipping: £25.00 GBP (5-10 business days international air freight)
   - Minimum Order Policy: Strictly £100.00 GBP minimum order requirement.
2. Payment Methods:
   - UK Bank Transfer (Faster Payments): Barclays Bank UK, Account Name: Retatrutide Research UK Ltd, Sort Code: 20-04-15, Account: 83920144 (Use Order ID as payment reference)
   - Cryptocurrency: BTC, USDT (TRC-20), ETH/USDT (ERC-20). Instant processing upon TXID submission.
   - Revolut App: Send directly to @retaresearch or revolut.me/retaresearch with Order ID in reference.
3. Automated Email Notifications:
   - Order notifications are automatically delivered via Zoho Mail SMTP to both the customer and admin (orders@retaclub.co.uk & admin@retaclub.co.uk).
4. Laboratory Calculations & Storage:
   - Peptide reconstitution guidance (e.g. adding bacteriostatic water to lyophilized powder, concentration in mcg/mL).
   - Storage guidelines: Lyophilized powder stored at -20°C (or 2-8°C short-term); reconstituted solution stored at 2-8°C protected from light.
   - Strictly Research Use Only (RUO): Emphasize that all compounds are intended exclusively for in vitro laboratory research and scientific evaluation, not for human or clinical consumption.

Be polite, accurate, concise, scientifically sound, and helpful. Answer in clean Markdown format.`;

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful fallback response if API key is not configured
      return NextResponse.json({
        reply: `Thank you for your inquiry. Our automated support is available. 
- **Shipping Tiers**: Normal (£15), Express (£40), International (£25).
- **Payment Options**: UK Bank Transfer (Barclays), Cryptocurrency (BTC/USDT), and Revolut App (@retaresearch).
- **Minimum Order Requirement**: £100.00 GBP.
- **Email Delivery**: Automated confirmation emails are dispatched to both customer and admin via Zoho Mail.

For urgent laboratory inquiries, please contact orders@retaclub.co.uk.`,
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const userPrompt = context
      ? `User Question: ${message}\n\nCurrent Order/Basket Context:\n${JSON.stringify(context, null, 2)}`
      : message;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
      },
    });

    const reply = response.text || 'I could not generate a response at this moment. Please reach out to orders@retaclub.co.uk.';

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('[AI Assistant Route Error]', error);
    return NextResponse.json(
      {
        reply: 'Thank you for your question. Normal Shipping is £15, Express is £40, International is £25. Minimum order is £100 GBP. Payments accepted via Bank Transfer, Crypto, and Revolut App with Zoho email confirmations.',
      },
      { status: 200 }
    );
  }
}
