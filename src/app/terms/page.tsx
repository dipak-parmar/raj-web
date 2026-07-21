export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-6 font-inter text-sm text-textCustom/75 dark:text-lightMint/75 space-y-8 leading-relaxed">
      <h1 className="text-3xl md:text-5xl font-playfair font-bold text-primary dark:text-white mb-2">
        Terms & Conditions
      </h1>
      <p className="text-xs font-poppins font-bold uppercase tracking-wider text-accent border-b border-black/5 dark:border-white/5 pb-4">
        Effective Date: July 2026
      </p>

      <section className="space-y-4">
        <h2 className="text-xl font-playfair font-bold text-textCustom dark:text-white">
          1. Scope of Agreement
        </h2>
        <p>
          By visiting, browsing or placing a product order on the Raj Marketing website, you confirm your legal compliance with our terms. If you do not agree to these terms, please discontinue using this portal.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-playfair font-bold text-textCustom dark:text-white">
          2. Product Curation Errors
        </h2>
        <p>
          We strive to list precise product illustrations, dimensions, descriptions and prices. In rare instances, typographic mistakes or pricing discrepancies may occur. Raj Marketing reserves the right to cancel orders placed under incorrect prices.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-playfair font-bold text-textCustom dark:text-white">
          3. Ownership of Content
        </h2>
        <p>
          All assets, cosmetic images, brand descriptions, and typography styling on this website are protected under copyright logs belonging to Raj Marketing. Unauthorized mirroring or replication is strictly prohibited.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-playfair font-bold text-textCustom dark:text-white">
          4. Legal Jurisdiction
        </h2>
        <p>
          Any disputes arising from site navigation or product distribution shall be governed, evaluated and settled in the courts of Delhi, India.
        </p>
      </section>
    </div>
  );
}
