import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | Retatrutide Club',
  description: 'Shipping and delivery policies for Retatrutide Club.',
  alternates: {
    canonical: 'https://retaclub.co.uk/shipping-policy',
  }
};

export default function ShippingPolicyPage() {
  return (
    <article className="pb-24 pt-10 bg-white">
      <header className="bg-slate-50 py-16 mb-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Shipping Policy
          </h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
        <h2>Order Processing</h2>
        <p>
          All orders for research materials are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
        </p>

        <h2>Domestic Shipping Rates and Estimates</h2>
        <p>
          Shipping charges for your order will be calculated and displayed at checkout. We utilize secure, temperature-controlled shipping methods where applicable to ensure the stability of lyophilized peptides.
        </p>

        <h2>International Shipping</h2>
        <p>
          We offer international shipping to select countries. Please note that research peptides may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. Retatrutide Club is not responsible for these charges if they are applied and are your responsibility as the customer.
        </p>

        <h2>Tracking Your Order</h2>
        <p>
          When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
        </p>
      </div>
    </article>
  );
}
