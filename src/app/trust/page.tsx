"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Award, Sparkles, CheckCircle2, Lock } from "lucide-react";

export default function TrustPage() {
  const trustItems = [
    {
      title: "100% Certified Organic",
      desc: "Our items are verified by ecological regulatory panels to be harvested from 100% chemical-free soils and sustainable crops.",
      icon: Award
    },
    {
      title: "Dermatologically Safest",
      desc: "Every emulsion and scrub passes intensive clinical dermatologist inspections to ensure it is fully hypoallergenic.",
      icon: ShieldCheck
    },
    {
      title: "Cruelty Free & Vegan",
      desc: "We hold strong ethical codes: no animal tests, zero animal products, and only vegan active biological components.",
      icon: Heart
    },
    {
      title: "Clean Formulation Promises",
      desc: "No synthetic pigments, parabens, phthalates, mineral oils, SLS, or synthetic binding agents are allowed in our lab.",
      icon: CheckCircle2
    },
    {
      title: "Fresh Hand-Batch Curation",
      desc: "Skincare batches are carefully produced in controlled quantities to deliver ultimate biological freshness and efficacy.",
      icon: Sparkles
    },
    {
      title: "Secure Encrypted Shipments",
      desc: "Your data privacy and checkout values are guarded by SSL bank-grade standards from order placing to home delivery.",
      icon: Lock
    }
  ];

  return (
    <div className="pt-24 min-h-screen flex flex-col">
      {/* Banner */}
      <section className="relative h-[35vh] min-h-[250px] flex items-center justify-center bg-lightMint/80 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/pexels-enginakyurt-4531546.jpg"
            alt="Trust page background"
            className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-backgroundCustom via-backgroundCustom/50 to-transparent z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-primary space-y-2">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold">
            Trust & Quality Standards
          </h1>
          <p className="text-xs font-inter text-secondary/70 select-none">
            Home / Trust
          </p>
        </div>
      </section>

      {/* Main details */}
      <section className="py-20 max-w-6xl mx-auto px-6 w-full space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-playfair font-bold text-primary dark:text-white">
              Delivering Pristine Purity Since 2004
            </h2>
            <p className="font-inter text-sm text-textCustom/75 dark:text-lightMint/75 leading-relaxed">
              At Raj Marketing, trust is not simply a marketing guideline; it is our foundation. For over thirty-six years, we have worked directly with small organic botanical gardens to secure native seeds, wild ferns, and medicinal orchids.
            </p>
            <p className="font-inter text-sm text-textCustom/75 dark:text-lightMint/75 leading-relaxed">
              We understand that what you apply onto your skin directly transfers into your biology. That is why our formulation procedures reject corporate speed, focusing instead on small-scale thermal steam distillations and cold oil expressions that keep nutrients intact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-lightMint/50 dark:bg-accent/5 p-8 rounded-3xl space-y-6 border border-accent/20"
          >
            <h3 className="font-playfair text-xl font-bold text-primary dark:text-accent">
              Our Purity Guarantee
            </h3>
            <blockquote className="font-inter text-sm text-textCustom/80 dark:text-lightMint/80 italic leading-relaxed pl-4 border-l-2 border-primary dark:border-accent">
              "We guarantee that every product batch is dermatologically tested, organic ingredient certified, and formulated without a single molecule of toxic chemicals. If any vial falls short of your skin expectation, we offer a hassle-free premium exchange."
            </blockquote>
            <p className="font-poppins text-xs font-bold uppercase text-primary dark:text-lightMint">
              - RAJ MARKETING BOARD OF PURITY
            </p>
          </motion.div>
        </div>

        {/* Six details cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 p-7 rounded-2xl flex flex-col items-start space-y-4 hover:shadow-lg transition-shadow"
              >
                <div className="p-3 bg-secondary/10 dark:bg-accent/15 rounded-xl text-primary dark:text-accent">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-playfair text-lg font-bold text-textCustom dark:text-white">
                  {item.title}
                </h4>
                <p className="font-inter text-xs text-textCustom/60 dark:text-lightMint/60 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
