"use client";

import { motion } from "framer-motion";
import { Award, Heart, Shield, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen flex flex-col">
      {/* Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900 opacity-60 z-0">
          <img
            src="/images/hero/pexels-enginakyurt-4531546.jpg"
            alt="About us background"
            className="w-full h-full object-cover scale-102"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/40 z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-poppins text-accent font-bold">
            Since 2004
          </span>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold">
            Our Luxury Heritage
          </h1>
          <p className="text-xs md:text-sm font-inter text-lightMint/60 select-none">
            Home / About Us
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary dark:text-white">
              The Evolution of Pure Skincare
            </h2>
            <p className="font-inter text-sm text-textCustom/70 dark:text-lightMint/70 leading-relaxed">
              Established in 2004 under the vision of botanical excellence, Raj Marketing embarked on a singular pursuit: to bridge biological science with organic nature. Over the past three decades, we have evolved from a small herbal refinery into a premier national distributor of clinical-grade cosmetics.
            </p>
            <p className="font-inter text-sm text-textCustom/70 dark:text-lightMint/70 leading-relaxed">
              We reject cheap fillers, toxic parabens, and raw synthetic molecules. Every drop of serum or cream bearing the Raj Marketing name represents months of cold-extraction development, testing, and luxury quality control.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-black/5 dark:border-white/10"
          >
            <img
              src="/images/about/about-1.png"
              alt="Lab setup and formulation"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Founder Spotlights */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-white/30 dark:bg-white/5 border border-black/5 dark:border-white/5 p-8 md:p-12 rounded-3xl pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/5] border border-black/10 dark:border-white/10 shadow-lg"
          >
            <img
              src="/images/owner/owenr1.png"
              alt="Pravin Bhai, Founder of Raj Marketing"
              className="w-full h-full object-cover scale-[1.03] hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.25em] font-poppins text-accent font-bold">
              Visionary Leadership
            </span>
            <h3 className="text-3xl font-playfair font-bold text-primary dark:text-white leading-tight">
              Pravin Bhai
            </h3>
            <p className="font-poppins text-xs font-semibold text-primary dark:text-accent -mt-4 uppercase tracking-wider">
              Founder & Managing Owner, Raj Marketing
            </p>
            <p className="font-inter text-sm text-textCustom/75 dark:text-lightMint/75 leading-relaxed">
              Under the stewardship of our esteemed owner, Pravin Bhai, Raj Marketing has preserved its signature standards of botanical purity for over thirty-six years. Starting the refinery in 2004, Pravin Bhai sought to merge pure cold-pressed natural essences with rigorous clinical safety tests.
            </p>
            <p className="font-inter text-sm text-textCustom/75 dark:text-lightMint/75 leading-relaxed">
              His core philosophy remains simple: <em>"What you place on your body is just as vital as what you consume."</em> Driven by this responsibility, Pravin Bhai directly oversees our botanical farmer network and lab standards, ensuring our brand is synonymous with trust, premium quality, and chemical-free wellness.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-primary dark:text-white">
              Our Pillars of Excellence
            </h3>
            <p className="text-xs text-textCustom/50 dark:text-lightMint/50 max-w-md mx-auto">
              How we formulate, certify, and supply our premium cosmetics collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Ethical Curation",
                desc: "We harvest organic botanicals in partnership with small sustainable farms, utilizing solar-powered processes.",
                icon: Heart
              },
              {
                title: "Laboratory Grade",
                desc: "Every skincare formula is mixed in clean standard environments with zero contaminants and strict supervision.",
                icon: Shield
              },
              {
                title: "Certified Purity",
                desc: "Our products carry independent bio-certifications confirming they are free of sulfates and parabens.",
                icon: Award
              },
              {
                title: "Global Supply",
                desc: "A solid supply network shipping raw extract concentrates and final vanity bottles to over 15 countries.",
                icon: Globe
              }
            ].map((value, i) => {
              const IconComp = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 p-6 rounded-2xl text-center space-y-4"
                >
                  <div className="p-3.5 bg-secondary/10 dark:bg-accent/10 rounded-full text-primary dark:text-accent w-fit mx-auto">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-playfair text-lg font-bold text-textCustom dark:text-white">
                    {value.title}
                  </h4>
                  <p className="font-inter text-xs text-textCustom/60 dark:text-lightMint/60 leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
