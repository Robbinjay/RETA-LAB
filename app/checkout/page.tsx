'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart, SHIPPING_OPTIONS, ShippingOption } from '@/lib/cart-context';
import { AiCheckoutAssistant } from '@/components/shop/AiCheckoutAssistant';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Building2,
  Coins,
  Smartphone,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  Lock,
  Mail,
  Phone,
  User,
  MapPin,
  FileText,
  Printer,
  ShoppingBag,
  Info,
  Loader2,
  MessageCircle,
} from 'lucide-react';

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    meetsMinOrder,
    amountNeededForMin,
    minOrderAmount,
    clearCart,
    selectedShipping,
    setSelectedShipping,
  } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'crypto' | 'revolut'>('bank_transfer');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderComplete, setOrderComplete] = useState<any | null>(null);
  const [emailStatus, setEmailStatus] = useState<any | null>(null);

  const shippingFee = selectedShipping.fee;
  const grandTotal = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation checks
    if (!meetsMinOrder) {
      setErrorMessage(`Minimum order amount is £${minOrderAmount}.00 GBP. Please add £${amountNeededForMin.toFixed(2)} GBP more to your basket to proceed.`);
      return;
    }

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.addressLine1.trim() ||
      !formData.city.trim() ||
      !formData.postcode.trim() ||
      !formData.country.trim()
    ) {
      setErrorMessage('Please complete all required customer information and address fields marked with *');
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage('Please confirm agreement to the Research Use Only (RUO) laboratory terms.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items,
          shipping: selectedShipping,
          paymentMethod,
          subtotal,
          shippingFee,
          total: grandTotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process order. Please try again.');
      }

      // Order success
      setOrderComplete(data.order);
      setEmailStatus(data.emailStatus || null);
      clearCart();
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ORDER SUCCESS CONFIRMATION VIEW
  if (orderComplete) {
    return (
      <div className="bg-slate-900 text-slate-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
          
          {/* Header Badge */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Order Confirmed & Received
            </h1>
            <p className="text-sm text-slate-300">
              Order ID: <strong className="text-primary-400 font-mono text-base font-extrabold">{orderComplete.orderId}</strong>
            </p>
            
            {emailStatus?.customerSent ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <Mail className="w-3.5 h-3.5" />
                Confirmation email sent to <strong>{orderComplete.customer.email}</strong> via Zoho Mail
              </div>
            ) : (
              <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{emailStatus?.message || 'Order registered successfully.'}</span>
                </div>
                <Link
                  href="/email-diagnostics"
                  className="underline text-primary-400 hover:text-primary-300 font-bold ml-1"
                >
                  Zoho SMTP Diagnostics →
                </Link>
              </div>
            )}
          </div>

          {/* Payment Instructions Box */}
          <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-primary-500/50 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-primary-400 uppercase tracking-widest block">
                  Action Required
                </span>
                <h2 className="text-xl font-bold text-white">
                  Payment Instructions:{' '}
                  {orderComplete.paymentMethod === 'bank_transfer'
                    ? 'UK Bank Transfer'
                    : orderComplete.paymentMethod === 'crypto'
                    ? 'Cryptocurrency'
                    : 'Revolut App'}
                </h2>
              </div>
              <span className="text-2xl font-extrabold text-primary-400">
                £{orderComplete.total.toFixed(2)} GBP
              </span>
            </div>

            {orderComplete.paymentMethod === 'bank_transfer' && (
              <div className="space-y-4 text-xs sm:text-sm">
                <p className="text-slate-300">
                  Please transfer exactly <strong>£{orderComplete.total.toFixed(2)} GBP</strong> using UK Faster Payments or Online Banking with the details below:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Bank Name</span>
                    <strong className="text-white">Barclays Bank UK</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Account Name</span>
                    <strong className="text-white">Retatrutide Research UK Ltd</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Sort Code</span>
                    <strong className="text-primary-400 text-sm">20-04-15</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Account Number</span>
                    <strong className="text-primary-400 text-sm">83920144</strong>
                  </div>
                  <div className="sm:col-span-2 pt-2 border-t border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Reference (Required)</span>
                    <strong className="text-emerald-400 text-sm">{orderComplete.orderId}</strong>
                  </div>
                </div>
                <div className="p-3 bg-primary-500/10 border border-primary-500/20 rounded-xl text-xs text-slate-300">
                  ⚠️ <strong>Important:</strong> Always include your Order ID <strong>{orderComplete.orderId}</strong> in the bank payment reference so your order is dispatched immediately upon confirmation.
                </div>
              </div>
            )}

            {orderComplete.paymentMethod === 'crypto' && (
              <div className="space-y-4 text-xs sm:text-sm">
                <p className="text-slate-300">
                  Please transfer the equivalent of <strong>£{orderComplete.total.toFixed(2)} GBP</strong> to one of the following research deposit addresses:
                </p>
                <div className="space-y-3 font-mono text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-primary-400 block text-[10px] uppercase font-bold mb-0.5">Bitcoin (BTC Network)</span>
                    <span className="text-white break-all text-[11px]">bc1q9v8k7y6h4g3f2d1s0a9z8x7w6v5u4t3r2e1q0</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-primary-400 block text-[10px] uppercase font-bold mb-0.5">USDT (TRC-20 Network)</span>
                    <span className="text-white break-all text-[11px]">TX9rKbV8Q2jF5Nm4Pz7wX1L3sE6tY0uA8d</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-primary-400 block text-[10px] uppercase font-bold mb-0.5">USDT / ETH (ERC-20 Network)</span>
                    <span className="text-white break-all text-[11px]">0x71C25b89A5b93d6b0e8549C46d79040D9e9f648F</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  Once sent, reply to your confirmation email or notify support with your Transaction Hash (TXID) referencing <strong>{orderComplete.orderId}</strong>.
                </div>
              </div>
            )}

            {orderComplete.paymentMethod === 'revolut' && (
              <div className="space-y-4 text-xs sm:text-sm">
                <p className="text-slate-300">
                  Send <strong>£{orderComplete.total.toFixed(2)} GBP</strong> via your Revolut App directly to our business handle:
                </p>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Revolut @Revtag:</span>
                    <strong className="text-primary-400 text-sm">@retaresearch</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment Link:</span>
                    <strong className="text-white">revolut.me/retaresearch</strong>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800">
                    <span className="text-slate-400">Payment Reference:</span>
                    <strong className="text-emerald-400">{orderComplete.orderId}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary & Destination Details */}
          <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            {/* Items */}
            <div className="space-y-3">
              {orderComplete.items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center text-xs sm:text-sm py-2 border-b border-slate-800/60">
                  <div>
                    <span className="font-bold text-white">{item.title}</span>
                    <span className="text-slate-400 block text-xs">Quantity: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-slate-200">
                    £{(item.priceNumber * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Fees */}
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-white">£{orderComplete.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping ({orderComplete.shipping.name})</span>
                <span className="font-bold text-white">£{orderComplete.shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-primary-400">£{orderComplete.total.toFixed(2)} GBP</span>
              </div>
            </div>

            {/* Delivery address */}
            <div className="pt-4 border-t border-slate-800 text-xs text-slate-300">
              <h4 className="font-bold text-white uppercase tracking-wider mb-2">Delivery Address:</h4>
              <p className="leading-relaxed">
                {orderComplete.customer.firstName} {orderComplete.customer.lastName}<br />
                {orderComplete.customer.institution && <span>{orderComplete.customer.institution}<br /></span>}
                {orderComplete.customer.addressLine1}<br />
                {orderComplete.customer.addressLine2 && <span>{orderComplete.customer.addressLine2}<br /></span>}
                {orderComplete.customer.city}, {orderComplete.customer.postcode}<br />
                {orderComplete.customer.country}<br />
                Phone: {orderComplete.customer.phone}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Printer className="w-4 h-4" /> Print / Save Order PDF
            </button>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
            >
              Return to Peptide Shop
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // EMPTY BASKET VIEW
  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-[75vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Your Basket is Empty</h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Please add research peptides to your basket to proceed to the laboratory checkout.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Browse Peptide Catalogue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit Encrypted Secure Laboratory Checkout</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Laboratory Order Checkout
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete your research dispatch details, select shipping tier, and choose your payment method.
          </p>
        </div>

        {/* Minimum Order Warning Alert */}
        {!meetsMinOrder && (
          <div className="mb-8 p-5 bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-bold text-amber-900">
                  Minimum Order Requirement: £{minOrderAmount}.00 GBP
                </h2>
                <p className="text-xs text-amber-800 mt-0.5">
                  Your current subtotal is <strong>£{subtotal.toFixed(2)} GBP</strong>. Please add{' '}
                  <strong>£{amountNeededForMin.toFixed(2)} GBP</strong> more to satisfy the institutional minimum order policy.
                </p>
              </div>
            </div>
            <Link
              href="/shop"
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl whitespace-nowrap transition-all shadow-sm flex-shrink-0"
            >
              Add More Peptides
            </Link>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Grid: Form Left, Summary Right */}
        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Customer Info, Shipping & Payment (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* 1. CUSTOMER INFORMATION */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Customer & Laboratory Information</h2>
                    <p className="text-xs text-slate-400">Order verification and dispatch recipient</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g. Alexander"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Sterling"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address (Order Confirmation) *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. researcher@lab.co.uk"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Phone Number (Delivery Tracking) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +44 7700 900077"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Institution / Laboratory Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      placeholder="e.g. BioMetabolic Labs / Independent Facility"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Shipping & Delivery Address
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        required
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        placeholder="House / Unit number and Street Name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Apartment, Suite, Unit (Optional)
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                        placeholder="Suite 4B, Lab Wing, Floor 2"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Town / City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="London / Manchester"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Postcode / ZIP *
                        </label>
                        <input
                          type="text"
                          name="postcode"
                          required
                          value={formData.postcode}
                          onChange={handleInputChange}
                          placeholder="SW1A 1AA"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Country *
                        </label>
                        <select
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-medium"
                        >
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Ireland">Ireland</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Australia">Australia</option>
                          <option value="Other">Other / International</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Special Delivery Instructions / Research Reference (Optional)
                      </label>
                      <textarea
                        name="notes"
                        rows={2}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="e.g. Leave with reception, protocol reference #2026-A..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. SHIPPING FEE OPTIONS */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Select Shipping Tier</h2>
                    <p className="text-xs text-slate-400">All shipments are tracked with temperature-stable packaging</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {SHIPPING_OPTIONS.map((option) => {
                    const isSelected = selectedShipping.id === option.id;
                    return (
                      <label
                        key={option.id}
                        className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-primary-600 bg-primary-50/40 shadow-sm ring-1 ring-primary-600'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shippingOption"
                              checked={isSelected}
                              onChange={() => setSelectedShipping(option)}
                              className="text-primary-600 focus:ring-primary-500 w-4 h-4"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-900">
                                  {option.name}
                                </span>
                                <span className="text-[11px] font-semibold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-full">
                                  {option.estimatedDelivery}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {option.description}
                              </p>
                            </div>
                          </div>
                          <span className="font-extrabold text-base text-slate-900 whitespace-nowrap pl-4">
                            £{option.fee.toFixed(2)} GBP
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 3. PAYMENT OPTIONS */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Payment Option</h2>
                    <p className="text-xs text-slate-400">Choose your preferred settlement method</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'bank_transfer',
                      name: 'Bank Transfer',
                      subtitle: 'UK Faster Payments',
                      icon: Building2,
                    },
                    {
                      id: 'crypto',
                      name: 'Crypto Currency',
                      subtitle: 'BTC / USDT / ETH',
                      icon: Coins,
                    },
                    {
                      id: 'revolut',
                      name: 'Revolut App',
                      subtitle: '@Revtag Instant',
                      icon: Smartphone,
                    },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-primary-600 bg-primary-50/50 shadow-sm ring-1 ring-primary-600'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-primary-600' : 'text-slate-500'}`} />
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-primary-600 bg-primary-600' : 'border-slate-300'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{method.name}</div>
                          <div className="text-[11px] text-slate-500">{method.subtitle}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Method Details Preview */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Info className="w-4 h-4 text-primary-600" />
                    <span>How this payment method works:</span>
                  </div>
                  {paymentMethod === 'bank_transfer' && (
                    <p className="leading-relaxed">
                      You will receive the UK Barclays account details and sort code on the confirmation screen and via Zoho email. Orders are dispatched same-day once the transfer is confirmed.
                    </p>
                  )}
                  {paymentMethod === 'crypto' && (
                    <p className="leading-relaxed">
                      You will receive the direct Bitcoin (BTC), USDT (TRC-20), or Ethereum deposit address. Ideal for rapid settlement and international researchers.
                    </p>
                  )}
                  {paymentMethod === 'revolut' && (
                    <p className="leading-relaxed">
                      Send funds in seconds using Revolut Revtag (@retaresearch) or the payment link. Instant verification.
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Order Summary & Minimum Order Checkout (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Order Summary</h3>
                  <span className="text-xs text-slate-400 font-semibold">{items.length} items</span>
                </div>

                {/* Items preview list */}
                <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-slate-100 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 p-1 flex-shrink-0 flex items-center justify-center">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={32}
                            height={32}
                            className="object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-slate-900 truncate">{item.title}</div>
                          <div className="text-slate-400">Qty: {item.quantity} × {item.price}</div>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900 whitespace-nowrap">
                        £{(item.priceNumber * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Calculations */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">£{subtotal.toFixed(2)} GBP</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Shipping ({selectedShipping.name})</span>
                    <span className="font-bold text-slate-900">£{shippingFee.toFixed(2)} GBP</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-slate-200 text-slate-900">
                    <span className="text-sm font-extrabold">Total Payable</span>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-primary-600 block">
                        £{grandTotal.toFixed(2)}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        GBP Sterling
                      </span>
                    </div>
                  </div>
                </div>

                {/* RUO Compliance Checkbox */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 leading-relaxed">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 rounded text-primary-600 focus:ring-primary-500 w-4 h-4 border-slate-300"
                    />
                    <span>
                      I confirm that all materials ordered are strictly for <strong>in vitro laboratory research and scientific evaluation</strong> only, and not for human or clinical consumption.
                    </span>
                  </label>
                </div>

                {/* Complete Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !meetsMinOrder}
                  className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    meetsMinOrder && !isSubmitting
                      ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/25 hover:shadow-xl'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Order & Sending Zoho Notification...
                    </>
                  ) : !meetsMinOrder ? (
                    `Minimum £${minOrderAmount}.00 Order Required`
                  ) : (
                    `Place Research Order • £${grandTotal.toFixed(2)} GBP`
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const message = `Hello! I would like to place an order via WhatsApp.\n\nItems:\n${items.map(i => `- ${i.title} (Qty: ${i.quantity})`).join('\n')}\n\nShipping: ${selectedShipping.name}\nTotal: £${grandTotal.toFixed(2)} GBP\n\nMy Details:\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nAddress: ${formData.addressLine1}, ${formData.city}, ${formData.postcode}`;
                    window.open(`https://wa.me/447888391589?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="w-full py-3.5 px-6 rounded-xl border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> Fast Order via WhatsApp
                </button>

                {/* Reassurance Badges */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Customer & Admin receive instant Zoho email notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    <span>HPLC ≥98% Purity batch verified & CoA supplied</span>
                  </div>
                </div>

              </div>

              {/* AI Checkout & Laboratory Assistant */}
              <AiCheckoutAssistant
                embedded
                orderContext={{
                  subtotal,
                  shippingTier: selectedShipping.name,
                  shippingFee,
                  paymentMethod,
                  itemCount: items.length,
                }}
              />

            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
