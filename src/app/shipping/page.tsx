export default function ShippingPolicyPage() {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-6 font-inter text-sm text-textCustom/75 dark:text-lightMint/75 space-y-8 leading-relaxed">
      <h1 className="text-3xl md:text-5xl font-playfair font-bold text-primary dark:text-white mb-2">
        Shipping Policy
      </h1>
      <p className="text-xs font-poppins font-bold uppercase tracking-wider text-accent border-b border-black/5 dark:border-white/5 pb-4">
        Updated: July 2026
      </p>

      <section className="space-y-4">
        <h2 className="text-xl font-playfair font-bold text-textCustom dark:text-white">
          1. Packaging Curation
        </h2>
        <p>
          To protect organic active complexes and preserve glass bottle integrity, all bottles are packed in biodegradable cotton pouches, cushioning moss boards, and seal tape box packages.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-playfair font-bold text-textCustom dark:text-white">
          2. Logistical Timelines
        </h2>
        <p>
          We dispatch orders within 24 hours of successful payment confirmation. All orders arrive in 6 to 7 business days, depending on your relative zone logistics.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-playfair font-bold text-textCustom dark:text-white">
          3. Costs Summary
        </h2>
        <p>
          We offer complimentary Free Shipping for all orders. For deliveries beyond a 40 km radius, additional shipping charges may apply.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-playfair font-bold text-textCustom dark:text-white">
          4. Tracking & Delivery Logging
        </h2>
        <p>
          Once your package is hand-off to the logistics carrier, an SMS and email notification containing your tracking code will be sent to your contact pointers.
        </p>
      </section>
    </div>
  );
}
