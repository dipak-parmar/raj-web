export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-6 font-inter text-sm text-textCustom/75 dark:text-lightMint/75 space-y-8 leading-relaxed">
      <h1 className="text-3xl md:text-5xl font-playfair font-bold text-primary dark:text-white mb-2">
        Privacy Policy
      </h1>
      <p className="text-xs font-poppins font-bold uppercase tracking-wider text-accent border-b border-black/5 dark:border-white/5 pb-4">
        Last Updated: July 2026
      </p>

      <section className="space-y-4">
        <h2 className="text-xl font-playfair font-bold text-textCustom dark:text-white">
          1. Data Collection Criterons
        </h2>
        <p>
          Raj Marketing collects basic user personal information exclusively to fulfill order processing. This includes your name, shipping address, mobile numbers, email, and browsing sessions. We secure this data via industry-standard SSL databases.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-playfair font-bold text-textCustom dark:text-white">
          2. Use of Information
        </h2>
        <p>
          We utilize details to complete transactions, deliver product notifications, process refunds, and prevent payment frauds. Your details are never traded, sold, or shared with external third-party advertisers.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-playfair font-bold text-textCustom dark:text-white">
          3. Payment Safety Syncs
        </h2>
        <p>
          All direct payment credentials (e.g. UPI details, card numbers) are processed through licensed merchant gateways such as Razorpay API. We do not store financial credentials on our local servers.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-playfair font-bold text-textCustom dark:text-white">
          4. Cookies Policy
        </h2>
        <p>
          We employ small session cookies to remember configurations inside your shopping bag, handle dark mode toggling, and track analytics using Google Analytics tools. You can disable cookies in your browser settings.
        </p>
      </section>
    </div>
  );
}
