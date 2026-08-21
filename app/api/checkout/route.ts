import { NextRequest, NextResponse } from 'next/server';
import { sendOrderEmails, OrderPayload } from '@/lib/email-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, shipping, paymentMethod, subtotal, shippingFee, total } = body;

    // 1. Validate Customer Information
    if (
      !customer ||
      !customer.firstName?.trim() ||
      !customer.lastName?.trim() ||
      !customer.email?.trim() ||
      !customer.phone?.trim() ||
      !customer.addressLine1?.trim() ||
      !customer.city?.trim() ||
      !customer.postcode?.trim() ||
      !customer.country?.trim()
    ) {
      return NextResponse.json(
        { error: 'Please fill in all required customer information and shipping address fields.' },
        { status: 400 }
      );
    }

    // 2. Validate Items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Your shopping basket is empty. Please add items to proceed.' },
        { status: 400 }
      );
    }

    // 3. Enforce Minimum Order Amount of £100 GBP
    const computedSubtotal = items.reduce(
      (acc: number, item: any) => acc + (Number(item.priceNumber) || 0) * (Number(item.quantity) || 1),
      0
    );

    if (computedSubtotal < 100) {
      const diff = (100 - computedSubtotal).toFixed(2);
      return NextResponse.json(
        {
          error: `Minimum order amount is £100.00 GBP. Please add £${diff} GBP more to your basket to proceed.`,
        },
        { status: 400 }
      );
    }

    // 4. Validate Shipping & Payment Method
    const validShippingFees: Record<string, number> = {
      normal: 15,
      express: 40,
      international: 25,
    };

    const shippingId = shipping?.id || 'normal';
    const verifiedShippingFee = validShippingFees[shippingId] ?? 15;
    const computedTotal = computedSubtotal + verifiedShippingFee;

    const validPaymentMethods = ['bank_transfer', 'crypto', 'revolut'];
    const selectedMethod = validPaymentMethods.includes(paymentMethod)
      ? paymentMethod
      : 'bank_transfer';

    // 5. Generate Order ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const orderId = `RC-UK-${dateStr}-${randomSuffix}`;

    const orderPayload: OrderPayload = {
      orderId,
      createdAt: new Date().toUTCString(),
      customer: {
        firstName: customer.firstName.trim(),
        lastName: customer.lastName.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
        addressLine1: customer.addressLine1.trim(),
        addressLine2: customer.addressLine2?.trim() || '',
        city: customer.city.trim(),
        postcode: customer.postcode.trim(),
        country: customer.country.trim(),
        institution: customer.institution?.trim() || '',
        notes: customer.notes?.trim() || '',
      },
      items: items.map((i: any) => ({
        id: i.id,
        title: i.title,
        price: i.price,
        priceNumber: Number(i.priceNumber) || 0,
        quantity: Number(i.quantity) || 1,
        category: i.category,
        image: i.image,
      })),
      shipping: {
        id: shippingId,
        name: shipping?.name || (shippingId === 'express' ? 'Express Shipping' : shippingId === 'international' ? 'International' : 'Normal Shipping'),
        fee: verifiedShippingFee,
        estimatedDelivery: shipping?.estimatedDelivery,
      },
      paymentMethod: selectedMethod,
      subtotal: computedSubtotal,
      shippingFee: verifiedShippingFee,
      total: computedTotal,
    };

    // 6. Send Zoho Emails to Customer and Admin
    const emailResult = await sendOrderEmails(orderPayload);

    return NextResponse.json({
      success: true,
      orderId,
      order: orderPayload,
      emailStatus: emailResult,
      message: 'Order created successfully. Confirmation email sent via Zoho Mail.',
    });
  } catch (error: any) {
    console.error('[Checkout API Error]', error);
    return NextResponse.json(
      { error: error?.message || 'An unexpected error occurred during checkout processing.' },
      { status: 500 }
    );
  }
}
