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

/**
 * Returns a configured Zoho Nodemailer transporter
 */
export function getZohoTransporter() {
  const host = process.env.ZOHO_HOST || 'smtppro.zoho.eu';
  const port = parseInt(process.env.ZOHO_PORT || '465', 10);
  const user = process.env.ZOHO_EMAIL;
  const pass = process.env.ZOHO_PASSWORD;

  if (!user || !pass) {
    console.warn(
      '[Zoho Mail Warning] ZOHO_EMAIL or ZOHO_PASSWORD is not set in environment variables. Email delivery is operating in mock mode.'
    );
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
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
 * Sends both Customer confirmation and Admin alert emails via Zoho Mail
 */
export async function sendOrderEmails(order: OrderPayload): Promise<{
  success: boolean;
  customerSent: boolean;
  adminSent: boolean;
  message: string;
  errors?: string[];
}> {
  const transporter = getZohoTransporter();

  if (!transporter) {
    console.log('[Zoho Email Mock] Simulating Zoho email dispatch for order:', order.orderId);
    return {
      success: true,
      customerSent: false,
      adminSent: false,
      message: 'ZOHO_EMAIL and ZOHO_PASSWORD environment variables are not configured. Emails were logged in server mock mode.',
    };
  }

  const senderEmail = process.env.ZOHO_EMAIL || 'orders@retaclub.co.uk';
  const adminEmail = process.env.ADMIN_EMAIL || process.env.ZOHO_EMAIL || 'admin@retaclub.co.uk';

  let customerSent = false;
  let adminSent = false;
  const errors: string[] = [];

  try {
    // 1. Send Customer Confirmation Email
    const customerMailOptions = {
      from: `"Retatrutide Club UK" <${senderEmail}>`,
      to: order.customer.email,
      subject: `Order Confirmation #${order.orderId} - Retatrutide Club UK`,
      html: generateCustomerEmailHtml(order),
    };

    await transporter.sendMail(customerMailOptions);
    customerSent = true;
    console.log(`[Zoho Mail] Customer confirmation email successfully sent to ${order.customer.email}`);
  } catch (customerError: any) {
    const errorMsg = customerError?.message || String(customerError);
    console.error('[Zoho Mail Error] Failed to send customer email:', errorMsg);
    errors.push(`Customer email error: ${errorMsg}`);
  }

  try {
    // 2. Send Admin Notification Email
    const adminMailOptions = {
      from: `"Retatrutide Orders" <${senderEmail}>`,
      to: adminEmail,
      subject: `🚨 New Order #${order.orderId} (£${order.total.toFixed(2)}) - ${order.customer.firstName} ${order.customer.lastName}`,
      html: generateAdminEmailHtml(order),
    };

    await transporter.sendMail(adminMailOptions);
    adminSent = true;
    console.log(`[Zoho Mail] Admin notification email successfully sent to ${adminEmail}`);
  } catch (adminError: any) {
    const errorMsg = adminError?.message || String(adminError);
    console.error('[Zoho Mail Error] Failed to send admin email:', errorMsg);
    errors.push(`Admin email error: ${errorMsg}`);
  }

  return {
    success: customerSent && adminSent,
    customerSent,
    adminSent,
    message: customerSent && adminSent
      ? 'Order confirmation dispatched via Zoho Mail to customer and admin.'
      : errors.length > 0
      ? `Zoho Mail delivery encountered issues: ${errors.join('; ')}`
      : 'Order processed; partial email dispatch recorded.',
    errors: errors.length > 0 ? errors : undefined,
  };
}
