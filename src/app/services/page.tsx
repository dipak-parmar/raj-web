"use client";

import { motion } from "framer-motion";
import { Truck, Award, Database, Settings, HelpCircle, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();

  const services = [
    {
      title: "Wholesale & Raw Concentrates",
      desc: "We supply standard plant-based active extracts, raw seed oil bases, steam floral hydrosols, and green clay concentrates directly to beauty brands and cosmetic centers worldwide.",
      details: ["Certified biodynamic farming sourcing", "Custom lab certifications", "Eco-friendly bulk drums delivery", "Quality assurance batches"],
      icon: Database
    },
    {
      title: "Retail Distribution Curation",
      desc: "Allowing exclusive spas, vanity outlets, premium salons, and boutique skincare retailers to host the retail-ready Raj Marketing collection on their shelves.",
      details: ["Product testers & display setups", "Flexible wholesale pricing", "Quick domestic restocks", "Marketing brochure materials"],
      icon: Truck
    },
    {
      title: "Organic Formulations Lab",
      desc: "Our state-of-the-art laboratory is dedicated to customizing organic emulsions and refinement of herbal tones to deliver premium visual aesthetics.",
      details: ["Dermatologically verified processes", "Hypoallergenic certifications", "Botanical balancing adjustments", "Small cosmetic test batches"],
      icon: Settings
    },
    {
      title: "Bulk Corporate Curation",
      desc: "Packaging gorgeous customizable gift hampers and miniature skincare sets for luxury resorts, VIP client setups, events, and corporate celebrations.",
      details: ["Logo card inserts customization", "Elegant forest green packaging", "Scent options configurations", "Fast shipping arrangements"],
      icon: Users
    },
    {
      title: "Quality Assurance Audits",
      desc: "Our testing division verifies chemical compatibility, pH stability, scent preservation, and skin absorption rates to guarantee product safety.",
      details: ["Dermatological audit reports", "pH balance optimization", "Toxicology clearance logs", "Purity certificate releases"],
      icon: Award
    },
    {
      title: "Dedicated B2B Desk",
      desc: "A reliable B2B customer team prepared to handle custom order quotes, contract documentation, shipping logs, and wholesale client supports.",
      details: ["Quick email turnaround within 4hr", "Dedicated account handlers", "Custom logistical options", "Wholesale supply contracts"],
      icon: HelpCircle
    }
  ];

  return (
    <div className="pt-24 min-h-screen flex flex-col">
      {/* Banner */}
      <section className="relative h-[35vh] min-h-[250px] flex items-center justify-center bg-lightMint/80 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/pexels-enginakyurt-4531546.jpg"
            alt="Services background"
            className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-backgroundCustom via-backgroundCustom/50 to-transparent z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-primary space-y-2">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold">
            Premium Services & Supply
          </h1>
          <p className="text-xs font-inter text-secondary/70 select-none">
            Home / Services
          </p>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-20 max-w-7xl mx-auto px-6 w-full space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-primary dark:text-white">
            Skincare Solutions Built On Trust
          </h2>
          <p className="text-sm text-textCustom/60 dark:text-lightMint/60 leading-relaxed">
            Whether supplying organic bases to global brands, shipping customized hampers, or handling retail inventory, we emphasize purity at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((serv, index) => {
            const IconComp = serv.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:shadow-xl hover:border-accent/35 transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="p-3 bg-secondary/10 dark:bg-accent/10 rounded-xl text-primary dark:text-accent w-fit">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-playfair text-xl font-bold text-textCustom dark:text-white">
                      {serv.title}
                    </h3>
                    <p className="font-inter text-xs text-textCustom/65 dark:text-lightMint/65 leading-relaxed">
                      {serv.desc}
                    </p>
                  </div>
                  <ul className="space-y-2 text-xs font-inter text-textCustom/60 dark:text-lightMint/60 pl-1">
                    {serv.details.map((detail, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="text-accent">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-8 border-t border-black/5 dark:border-white/5">
                  <button
                    onClick={() => router.push("/contact")}
                    className="w-full py-2.5 bg-primary dark:bg-accent hover:opacity-90 text-white dark:text-primary font-poppins text-[10px] font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                  >
                    Inquire Desk
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
