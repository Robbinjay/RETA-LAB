import nodemailer from 'nodemailer';

export interface OrderItem {
  id: number;
  title: string;
  price: string;
  priceNumber: number;
  quantity: number;
  category?: string;
  image?: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  country: string;
  institution?: string;
  notes?: string;
}

export interface OrderPayload {
  orderId: string;
  createdAt: string;
  customer: CustomerDetails;
  items: OrderItem[];
  shipping: {
    id: string;
    name: string;
    fee: number;
    estimatedDelivery?: string;
  };
  paymentMethod: 'bank_transfer' | 'crypto' | 'revolut';
  subtotal: number;
  shippingFee: number;
  total: number;
}

export interface SmtpConfig {
  host?: string;
  port?: number;
  user?: string;
  pass?: string;
}

/**
 * Sanitizes credentials (strips accidental quotes, spaces, newlines)
 */
function cleanCredential(val: string | undefined): string | undefined {
  if (!val) return undefined;
  return val.trim().replace(/^["']|["']$/g, '');
}

/**
 * List of known Zoho SMTP host configurations for auto-detection and fallback
 */
export const ZOHO_CONFIGS = [
  { host: 'smtppro.zoho.eu', port: 465, secure: true, label: 'Zoho Workplace EU (SSL 465)' },
  { host: 'smtppro.zoho.eu', port: 587, secure: false, label: 'Zoho Workplace EU (STARTTLS 587)' },
  { host: 'smtppro.zoho.com', port: 465, secure: true, label: 'Zoho Workplace Global (SSL 465)' },
  { host: 'smtppro.zoho.com', port: 587, secure: false, label: 'Zoho Workplace Global (STARTTLS 587)' },
  { host: 'smtp.zoho.eu', port: 465, secure: true, label: 'Zoho Personal EU (SSL 465)' },
  { host: 'smtp.zoho.eu', port: 587, secure: false, label: 'Zoho Personal EU (STARTTLS 587)' },
  { host: 'smtp.zoho.com', port: 465, secure: true, label: 'Zoho Personal Global (SSL 465)' },
  { host: 'smtp.zoho.com', port: 587, secure: false, label: 'Zoho Personal Global (STARTTLS 587)' },
];

/**
 * Creates a Nodemailer transporter for Zoho with resilient timeout & TLS configurations
 */
export function createTransporter(host: string, port: number, user: string, pass: string) {
  const isSecure = port === 465;

  return nodemailer.createTransport({
    host: host.trim(),
    port,
    secure: isSecure,
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3',
    },
    connectionTimeout: 12000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Returns a configured Zoho Nodemailer transporter from env or custom config
 */
export function getZohoTransporter(customConfig?: SmtpConfig) {
  const user = cleanCredential(customConfig?.user || process.env.ZOHO_EMAIL);
  const pass = cleanCredential(customConfig?.pass || process.env.ZOHO_PASSWORD);
  const host = cleanCredential(customConfig?.host || process.env.ZOHO_HOST) || 'smtppro.zoho.eu';
  const port = parseInt(cleanCredential(String(customConfig?.port || process.env.ZOHO_PORT || '465')) || '465', 10);

  if (!user || !pass) {
    return null;
  }

  return createTransporter(host, port, user, pass);
}

/**
 * Formats payment instructions according to the selected method
 */
export function getPaymentMethodInstructions(method: 'bank_transfer' | 'crypto' | 'revolut', orderId: string, total: number) {
  switch (method) {
    case 'bank_transfer':
      return {
        title: 'UK Faster Payments / Bank Transfer',
        details: [
          { label: 'Bank Name', value: 'Barclays Bank UK' },
          { label: 'Account Name', value: 'Retatrutide Research UK Ltd' },
          { label: 'Sort Code', value: '20-04-15' },
          { label: 'Account Number', value: '83920144' },
          { label: 'Payment Reference', value: orderId },
          { label: 'Total Payable', value: `£${total.toFixed(2)} GBP` },
        ],
        instructions: `Please transfer exactly £${total.toFixed(2)} GBP via online banking using your Order ID "${orderId}" as the payment reference. Orders are dispatched once transfer confirmation is verified.`,
      };
    case 'crypto':
      return {
        title: 'Cryptocurrency (Instant Confirmation)',
        details: [
          { label: 'Bitcoin (BTC)', value: 'bc1q9v8k7y6h4g3f2d1s0a9z8x7w6v5u4t3r2e1q0' },
          { label: 'USDT (TRC-20)', value: 'TX9rKbV8Q2jF5Nm4Pz7wX1L3sE6tY0uA8d' },
          { label: 'USDT / ETH (ERC-20)', value: '0x71C25b89A5b93d6b0e8549C46d79040D9e9f648F' },
          { label: 'Payment Reference', value: orderId },
          { label: 'Total Payable', value: `£${total.toFixed(2)} GBP (Equivalent)` },
        ],
        instructions: `Send the cryptocurrency equivalent of £${total.toFixed(2)} GBP to your chosen network address above. Please reply to this email or contact support with your TXID / transaction hash and reference "${orderId}".`,
      };
    case 'revolut':
      return {
        title: 'Revolut App / @Revtag',
        details: [
          { label: 'Revolut Revtag', value: '@retaresearch' },
          { label: 'Revolut Pay Link', value: 'revolut.me/retaresearch' },
          { label: 'Account Holder', value: 'Retatrutide Scientific Research' },
          { label: 'Payment Reference', value: orderId },
          { label: 'Total Payable', value: `£${total.toFixed(2)} GBP` },
        ],
        instructions: `Open your Revolut app, search for revtag @retaresearch or visit revolut.me/retaresearch, enter £${total.toFixed(2)} GBP, and enter "${orderId}" in the note/reference field.`,
      };
  }
}

/**
 * Generates HTML for the customer order confirmation email
 */
export function generateCustomerEmailHtml(order: OrderPayload): string {
  const payment = getPaymentMethodInstructions(order.paymentMethod, order.orderId, order.total);

  const itemsRows = order.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b; font-weight: 600;">
          ${item.title}
          <div style="font-size: 12px; color: #64748b; font-weight: normal;">Qty: ${item.quantity} × ${item.price}</div>
        </td>
        <td style="padding: 12px 8px; font-size: 14px; color: #0f172a; font-weight: 700; text-align: right;">
          £${(item.priceNumber * item.quantity).toFixed(2)}
        </td>
      </tr>
    `
    )
    .join('');

  const paymentDetailsRows = payment.details
    .map(
      (d) => `
      <tr>
        <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px;">${d.label}:</td>
        <td style="padding: 6px 0; font-size: 13px; color: #0f172a; font-weight: 700; font-family: monospace;">${d.value}</td>
      </tr>
    `
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation #${order.orderId}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155; line-height: 1.5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            
            <!-- Header Banner -->
            <tr>
              <td style="background-color: #0284c7; padding: 32px 24px; text-align: center;">
                <div style="display: inline-block; background-color: #ffffff; color: #0284c7; font-weight: 800; font-size: 20px; width: 40px; height: 40px; line-height: 40px; border-radius: 10px; margin-bottom: 12px;">R</div>
                <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Order Received</h1>
                <p style="margin: 6px 0 0 0; color: #e0f2fe; font-size: 14px;">Order Reference: #${order.orderId}</p>
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 32px 24px;">
                <p style="margin-top: 0; font-size: 15px; color: #1e293b;">
                  Dear <strong>${order.customer.firstName} ${order.customer.lastName}</strong>,
                </p>
                <p style="font-size: 14px; color: #475569; margin-bottom: 24px;">
                  Thank you for placing your laboratory research peptide order with Retatrutide Club UK. Your order has been registered and is awaiting payment settlement before express dispatch.
                </p>

                <!-- Payment Instructions Box -->
                <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
                  <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #0369a1; font-weight: 700;">
                    Payment Instructions (${payment.title})
                  </h3>
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                    ${paymentDetailsRows}
                  </table>
                  <p style="margin: 8px 0 0 0; font-size: 12px; color: #0284c7; background-color: #e0f2fe; padding: 10px 12px; border-radius: 8px; font-weight: 500;">
                    ${payment.instructions}
                  </p>
                </div>

                <!-- Order Summary Table -->
                <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #0f172a; font-weight: 700; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                  Items Ordered
                </h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                  ${itemsRows}
                  <tr>
                    <td style="padding: 10px 8px; font-size: 14px; color: #64748b; font-weight: 600;">Subtotal</td>
                    <td style="padding: 10px 8px; font-size: 14px; color: #0f172a; font-weight: 700; text-align: right;">£${order.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 8px; font-size: 14px; color: #64748b; font-weight: 600;">
                      Shipping (${order.shipping.name})
                    </td>
                    <td style="padding: 10px 8px; font-size: 14px; color: #0f172a; font-weight: 700; text-align: right;">£${order.shippingFee.toFixed(2)}</td>
                  </tr>
                  <tr style="border-top: 2px solid #0f172a;">
                    <td style="padding: 12px 8px; font-size: 16px; color: #0f172a; font-weight: 800;">Total Payable</td>
                    <td style="padding: 12px 8px; font-size: 18px; color: #0284c7; font-weight: 800; text-align: right;">£${order.total.toFixed(2)} GBP</td>
                  </tr>
                </table>

                <!-- Shipping Address -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 28px;">
                  <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 700;">
                    Dispatch Destination
                  </h4>
                  <div style="font-size: 14px; color: #1e293b; line-height: 1.6;">
                    <strong>${order.customer.firstName} ${order.customer.lastName}</strong><br>
                    ${order.customer.institution ? `<em>${order.customer.institution}</em><br>` : ''}
                    ${order.customer.addressLine1}<br>
                    ${order.customer.addressLine2 ? `${order.customer.addressLine2}<br>` : ''}
                    ${order.customer.city}, ${order.customer.postcode}<br>
                    ${order.customer.country}<br>
                    <strong>Phone:</strong> ${order.customer.phone}
                  </div>
                  ${order.customer.notes ? `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #cbd5e1; font-size: 12px; color: #64748b;"><strong>Notes:</strong> ${order.customer.notes}</div>` : ''}
                </div>

                <!-- Laboratory Disclaimer -->
                <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 12px; font-size: 11px; color: #92400e; line-height: 1.5;">
                  <strong>RESEARCH USE ONLY:</strong> All peptides supplied by Retatrutide Club UK are strictly intended for laboratory in vitro research and scientific evaluation. They are not intended or authorized for human consumption, clinical treatment, or veterinary use.
                </div>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f1f5f9; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
                <p style="margin: 0 0 4px 0; font-weight: 600; color: #334155;">Retatrutide Club UK — Research Peptides & Education</p>
                <p style="margin: 0;">For inquiries regarding your order, reply directly to this email or contact support.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

/**
 * Generates HTML for the admin new order alert email
 */
export function generateAdminEmailHtml(order: OrderPayload): string {
  const itemsList = order.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px; font-size: 13px; color: #1e293b;">${item.title}</td>
        <td style="padding: 10px; font-size: 13px; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; font-size: 13px; text-align: right;">${item.price}</td>
        <td style="padding: 10px; font-size: 13px; font-weight: bold; text-align: right;">£${(item.priceNumber * item.quantity).toFixed(2)}</td>
      </tr>
    `
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>🚨 New Order #${order.orderId}</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; padding: 24px; color: #1e293b;">
    <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 28px; border: 1px solid #cbd5e1;">
      
      <div style="background: #0f172a; color: #ffffff; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="margin: 0; font-size: 18px;">🚨 New Order Received: #${order.orderId}</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Placed at: ${order.createdAt}</p>
      </div>

      <div style="display: flex; gap: 16px; margin-bottom: 20px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; flex: 1;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #0284c7; text-transform: uppercase;">Customer Information</h3>
          <p style="margin: 0; font-size: 13px; line-height: 1.6;">
            <strong>Name:</strong> ${order.customer.firstName} ${order.customer.lastName}<br>
            <strong>Email:</strong> <a href="mailto:${order.customer.email}">${order.customer.email}</a><br>
            <strong>Phone:</strong> ${order.customer.phone}<br>
            ${order.customer.institution ? `<strong>Institution:</strong> ${order.customer.institution}<br>` : ''}
          </p>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; flex: 1;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #0284c7; text-transform: uppercase;">Shipping & Payment</h3>
          <p style="margin: 0; font-size: 13px; line-height: 1.6;">
            <strong>Method:</strong> ${order.shipping.name} (£${order.shippingFee.toFixed(2)})<br>
            <strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase().replace('_', ' ')}<br>
            <strong>Subtotal:</strong> £${order.subtotal.toFixed(2)}<br>
            <strong>Grand Total:</strong> <span style="font-size: 15px; font-weight: bold; color: #0284c7;">£${order.total.toFixed(2)} GBP</span>
          </p>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #334155;">Delivery Address</h3>
        <p style="margin: 0; font-size: 13px; line-height: 1.5;">
          ${order.customer.addressLine1}<br>
          ${order.customer.addressLine2 ? `${order.customer.addressLine2}<br>` : ''}
          ${order.customer.city}, ${order.customer.postcode}<br>
          ${order.customer.country}
        </p>
        ${order.customer.notes ? `<p style="margin: 8px 0 0 0; font-size: 12px; color: #64748b;"><strong>Order Notes:</strong> ${order.customer.notes}</p>` : ''}
      </div>

      <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #0f172a;">Items (${order.items.length})</h3>
      <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px;">
        <thead>
          <tr style="background: #f1f5f9; border-bottom: 1px solid #cbd5e1;">
            <th style="padding: 8px 10px; font-size: 12px; text-align: left;">Product</th>
            <th style="padding: 8px 10px; font-size: 12px; text-align: center;">Qty</th>
            <th style="padding: 8px 10px; font-size: 12px; text-align: right;">Unit Price</th>
            <th style="padding: 8px 10px; font-size: 12px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsList}
        </tbody>
      </table>

      <div style="text-align: right; padding-top: 8px; border-top: 2px solid #0f172a;">
        <span style="font-size: 14px; font-weight: 600;">Total Order Value: </span>
        <span style="font-size: 18px; font-weight: 800; color: #0284c7;">£${order.total.toFixed(2)} GBP</span>
      </div>

    </div>
  </body>
  </html>
  `;
}

/**
 * Translates low-level SMTP errors into clear human-actionable instructions
 */
export function interpretSmtpError(error: any): string {
  const msg = (error?.message || String(error)).toLowerCase();
  const code = error?.responseCode || error?.code || '';

  if (msg.includes('535') || msg.includes('authentication failed') || msg.includes('invalid credentials') || code === 535) {
    return 'Zoho Authentication Failed: Zoho requires an "Application-Specific Password" (App Password) instead of your regular Zoho account password. Visit https://accounts.zoho.eu/home#security/app_password (or accounts.zoho.com) to generate an App Password.';
  }
  if (msg.includes('553') || msg.includes('relaying disallowed') || msg.includes('sender address') || code === 553) {
    return 'Zoho Relaying Disallowed: The "From" email address must match the exact authenticated Zoho mailbox user or an authorized alias in your Zoho Mail control panel.';
  }
  if (msg.includes('etimedout') || msg.includes('timeout') || msg.includes('greeting timeout')) {
    return 'Connection Timeout: The connection to Zoho SMTP timed out. If using Port 465 (SSL), try Port 587 (STARTTLS) or check whether your account region is EU (smtppro.zoho.eu) or Global (smtppro.zoho.com).';
  }
  if (msg.includes('econnrefused')) {
    return 'Connection Refused: The SMTP host refused the connection on this port. Verify your ZOHO_HOST and ZOHO_PORT settings.';
  }
  return error?.message || 'Unknown SMTP error occurred.';
}

/**
 * Sends both Customer confirmation and Admin alert emails via Zoho Mail
 */
export async function sendOrderEmails(order: OrderPayload): Promise<{
  success: boolean;
  customerSent: boolean;
  adminSent: boolean;
  message: string;
  errors?: string[];
}> {
  const user = cleanCredential(process.env.ZOHO_EMAIL);
  const pass = cleanCredential(process.env.ZOHO_PASSWORD);

  if (!user || !pass) {
    console.log('[Zoho Email Mock] Simulating Zoho email dispatch for order:', order.orderId);
    return {
      success: true,
      customerSent: false,
      adminSent: false,
      message: 'ZOHO_EMAIL or ZOHO_PASSWORD environment variables are not detected. The order is recorded in simulation mode.',
    };
  }

  const transporter = getZohoTransporter();
  if (!transporter) {
    return {
      success: false,
      customerSent: false,
      adminSent: false,
      message: 'Failed to initialize Zoho Mail transporter.',
    };
  }

  // Sender email MUST match the authenticated user so Zoho relaying policy does not reject the mail
  const senderEmail = user;
  const adminEmail = cleanCredential(process.env.ADMIN_EMAIL) || user;

  let customerSent = false;
  let adminSent = false;
  const errors: string[] = [];

  // 1. Send Customer Confirmation Email
  try {
    const customerMailOptions = {
      from: `"Retatrutide Club UK" <${senderEmail}>`,
      to: order.customer.email,
      replyTo: senderEmail,
      subject: `Order Confirmation #${order.orderId} - Retatrutide Club UK`,
      html: generateCustomerEmailHtml(order),
    };

    await transporter.sendMail(customerMailOptions);
    customerSent = true;
    console.log(`[Zoho Mail] Customer confirmation email successfully sent to ${order.customer.email}`);
  } catch (customerError: any) {
    const detailed = interpretSmtpError(customerError);
    console.error('[Zoho Mail Error] Failed to send customer email:', customerError?.message);
    errors.push(`Customer email (${order.customer.email}): ${detailed}`);
  }

  // 2. Send Admin Notification Email
  try {
    const adminMailOptions = {
      from: `"Retatrutide Orders" <${senderEmail}>`,
      to: adminEmail,
      replyTo: order.customer.email,
      subject: `🚨 New Order #${order.orderId} (£${order.total.toFixed(2)}) - ${order.customer.firstName} ${order.customer.lastName}`,
      html: generateAdminEmailHtml(order),
    };

    await transporter.sendMail(adminMailOptions);
    adminSent = true;
    console.log(`[Zoho Mail] Admin notification email successfully sent to ${adminEmail}`);
  } catch (adminError: any) {
    const detailed = interpretSmtpError(adminError);
    console.error('[Zoho Mail Error] Failed to send admin email:', adminError?.message);
    errors.push(`Admin email (${adminEmail}): ${detailed}`);
  }

  const isSuccess = customerSent || adminSent;

  return {
    success: isSuccess,
    customerSent,
    adminSent,
    message: isSuccess
      ? customerSent && adminSent
        ? 'Order confirmation email dispatched via Zoho Mail to both customer and admin.'
        : 'Order processed; partial email dispatch recorded.'
      : errors.length > 0
      ? `Zoho Mail delivery failed: ${errors[0]}`
      : 'Order processed without email dispatch.',
    errors: errors.length > 0 ? errors : undefined,
  };
}
