"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  Heart,
  Star,
  Sparkles,
  Award,
  Clock,
  ThumbsUp,
  UserCheck,
  Send,
  Droplet
} from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const router = useRouter();

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    const savedInquiries = localStorage.getItem("raj_all_inquiries");
    let allInquiries = [];
    if (savedInquiries) {
      try {
        allInquiries = JSON.parse(savedInquiries);
      } catch (err) {
        console.error(err);
      }
    }
    const newInquiry = {
      name: formData.name,
      email: formData.email,
      subject: `Homepage Inquiry (Phone: ${formData.phone})`,
      message: formData.message,
      id: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString()
    };
    allInquiries.unshift(newInquiry);
    localStorage.setItem("raj_all_inquiries", JSON.stringify(allInquiries));

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 4000);
  };



  const testimonials = [
    {
      name: "Sophia Loren",
      role: "Luxury Skincare Critic",
      text: "The Pearl Herbal Shampoo has transformed my hair. The organic ingredients and botanical extracts make it feel incredibly thick, strong, and glossy.",
      rating: 5
    },
    {
      name: "Dr. Ananya Ray",
      role: "Aesthetic Dermatologist",
      text: "Raj Marketing continues to impress me with their purity parameters. I recommend Sree Hari Seva Kesar Goti and their Day Cream for excellent daily skin repair and hydration.",
      rating: 5
    },
    {
      name: "Vikram Dev",
      role: "Vogue Beauty Editor",
      text: "The Raj Drops provide instant relief, and their Noni Toothpaste is a game-changer. Both formulations match the highest standards of professional labs.",
      rating: 5
    }
  ];

  return (
    <div className="flex flex-col w-full relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Visual */}
        <div className="absolute inset-0 bg-neutral-900 z-0">
          <img
            src="/images/hero/pexels-enginakyurt-4531546.jpg"
            alt="Raj Marketing premium organic cosmetics background"
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-102 hover:scale-105 duration-1000 transition-transform"
          />
          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-transparent to-primary/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 select-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-4"
          >
            <span className="text-xs uppercase tracking-[0.3em] font-poppins text-accent font-semibold block animate-pulse">
              🌿 Organic Botanical Alchemy
            </span>
            <h1 className="text-4xl md:text-7xl text-white font-playfair font-semibold tracking-wide leading-[1.1]">
              Pure Organic Luxury Cosmetics<br />
              <span className="italic block mt-2 text-lightMint font-normal text-3xl md:text-6xl font-playfair">
                Crafted For Timeless Beauty
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="text-base md:text-xl text-white/80 font-inter max-w-2xl mx-auto leading-relaxed"
          >
            Indulge in botanical skincare rituals crafted from clean organic ingredients and scientific innovation. Trusted since 2004.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => router.push("/products")}
              className="w-full sm:w-auto px-8 py-4 bg-accent font-poppins hover:bg-white text-primary font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/5 cursor-pointer"
            >
              Explore Collection
            </button>
            <button
              onClick={() => router.push("/about")}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white font-poppins hover:bg-white hover:text-primary font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Our Story
            </button>
          </motion.div>
        </div>

        {/* Scroll Motion Down */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center justify-center text-white/40 cursor-pointer pointer-events-none"
        >
          <span className="text-[10px] font-poppins font-semibold uppercase tracking-[0.2em] mb-2">
            Scroll down
          </span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section className="w-full py-24 md:py-32 bg-lightMint/60 dark:bg-black/10 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] font-poppins text-secondary dark:text-accent font-bold"
          >
            Since 2004
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-playfair font-black text-primary dark:text-lightMint tracking-wider"
          >
            RAJ MARKETING
          </motion.h2>
          
          <div className="w-12 h-[1px] bg-secondary/35 dark:bg-accent/30 mx-auto my-4" />
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-lg md:text-2xl text-textCustom/80 dark:text-lightMint/80 font-playfair leading-relaxed max-w-3xl mx-auto italic font-normal"
          >
            "Purity is not an specification, it is our heritage. Since 2004, Raj Marketing has pioneered the curation of botanical skincare and luxury organic cosmetics. We select and cold-press our active botanical components to ensure that every single vial nurtures your epidermis with maximum biotic vitality, absolute safety, and unmatched aesthetic brilliance."
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-6"
          >
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 text-xs font-poppins font-bold uppercase tracking-widest text-primary dark:text-accent hover:opacity-80 transition-opacity"
            >
              <span>Our Full Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Second Marquee: Promotions banner (black background, light green text) */}
      <div className="w-full bg-black py-2.5 text-accent font-poppins text-[10px] md:text-xs font-semibold uppercase tracking-widest overflow-hidden select-none border-y border-white/5 relative z-10 flex items-center">
        <style>{`
          @keyframes marquee-promo {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-promo {
            display: flex;
            width: max-content;
            animation: marquee-promo 25s linear infinite;
          }
        `}</style>
        <div className="animate-marquee-promo">
          <span className="px-4 whitespace-nowrap">
            🎉 B2B PROMO: SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY 10 OF THE SAME PRODUCT AND GET 1 FREE! &nbsp;&bull;&nbsp; BULK WHOLESALE OFFER &nbsp;&bull;&nbsp; SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY SAME PRODUCT 10 THEN 1 FREE! &nbsp;&bull;&nbsp; 🎉 B2B PROMO: SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY 10 OF THE SAME PRODUCT AND GET 1 FREE! &nbsp;&bull;&nbsp; BULK WHOLESALE OFFER &nbsp;&bull;&nbsp; SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY SAME PRODUCT 10 THEN 1 FREE! &nbsp;&bull;&nbsp; 🎉 B2B PROMO: SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY 10 OF THE SAME PRODUCT AND GET 1 FREE! &nbsp;&bull;&nbsp; BULK WHOLESALE OFFER &nbsp;&bull;&nbsp; SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY SAME PRODUCT 10 THEN 1 FREE! &nbsp;&bull;&nbsp; 🎉 B2B PROMO: SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY 10 OF THE SAME PRODUCT AND GET 1 FREE! &nbsp;&bull;&nbsp; BULK WHOLESALE OFFER &nbsp;&bull;&nbsp; SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY SAME PRODUCT 10 THEN 1 FREE! &nbsp;&bull;&nbsp;
          </span>
          <span className="px-4 whitespace-nowrap">
            🎉 B2B PROMO: SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY 10 OF THE SAME PRODUCT AND GET 1 FREE! &nbsp;&bull;&nbsp; BULK WHOLESALE OFFER &nbsp;&bull;&nbsp; SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY SAME PRODUCT 10 THEN 1 FREE! &nbsp;&bull;&nbsp; 🎉 B2B PROMO: SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY 10 OF THE SAME PRODUCT AND GET 1 FREE! &nbsp;&bull;&nbsp; BULK WHOLESALE OFFER &nbsp;&bull;&nbsp; SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY SAME PRODUCT 10 THEN 1 FREE! &nbsp;&bull;&nbsp; 🎉 B2B PROMO: SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY 10 OF THE SAME PRODUCT AND GET 1 FREE! &nbsp;&bull;&nbsp; BULK WHOLESALE OFFER &nbsp;&bull;&nbsp; SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY SAME PRODUCT 10 THEN 1 FREE! &nbsp;&bull;&nbsp; 🎉 B2B PROMO: SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY 10 OF THE SAME PRODUCT AND GET 1 FREE! &nbsp;&bull;&nbsp; BULK WHOLESALE OFFER &nbsp;&bull;&nbsp; SINCE 2004 &nbsp;&bull;&nbsp; BUY ANY SAME PRODUCT 10 THEN 1 FREE! &nbsp;&bull;&nbsp;
          </span>
        </div>
      </div>

      {/* 3. OUR PRODUCTS */}
      <section className="w-full py-24 md:py-32 max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-poppins text-accent font-semibold block mb-2">
              Our Collection
            </span>
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-primary dark:text-white">
              Organic Skincare Formulations
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-xs font-poppins font-bold uppercase tracking-widest text-primary dark:text-accent hover:opacity-80 border-b border-primary/20 dark:border-accent/20 pb-1"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="w-full py-24 md:py-32 bg-lightMint/30 dark:bg-black/20 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-poppins text-accent font-semibold">
              Quality Assurance
            </span>
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-primary dark:text-white">
              Why Discerning Clients Trust Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
            {/* Formulations list */}
            {[
              { title: "100% Organic Ingredients", desc: "Sourced directly from certified biodiversity reserves.", icon: Droplet },
              { title: "Premium Quality", desc: "Gold standard manufacturing in clinical glass laboratories.", icon: Award },
              { title: "Trusted Since 2004", desc: "Over three decades of loyalty and cosmetic expertise.", icon: Clock },
              { title: "Chemical Free", desc: "Free from parabens, phthalates, synthetic fillers and SLS.", icon: ShieldCheck },
              { title: "Dermatologically Tested", desc: "Hypoallergenic certifications across all skin types.", icon: UserCheck },
              { title: "Fast Delivery", desc: "Secure courier networks delivering within 6-7 days.", icon: Truck },
              { title: "Secure Payments", desc: "Fully encrypted checkout with diverse payment options.", icon: CheckCircle },
              { title: "Customer Satisfaction", desc: "Dedicated VIP support line for all purchases.", icon: ThumbsUp },
            ].map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 p-6 rounded-2xl flex flex-col items-start space-y-4 hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-3 bg-secondary/10 dark:bg-accent/10 rounded-xl text-primary dark:text-accent">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-playfair text-lg font-bold text-textCustom dark:text-white">
                      {item.title}
                    </h4>
                    <p className="font-inter text-xs text-textCustom/60 dark:text-lightMint/60 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. OUR SERVICES SECTION */}
      <section className="w-full py-24 md:py-32 max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-poppins text-accent font-semibold">
            B2B & B2C Channels
          </span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-primary dark:text-white">
            Our Premium Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Wholesale Supply",
              desc: "Providing bulk quantities of premium grade skincare bases, organic extracts, oils, and toners to global beauty brands and cosmetic firms.",
              badge: "Commercial"
            },
            {
              title: "Retail Distribution",
              desc: "Global distribution networks supplying authorized luxury spas, salons, and cosmetics retailers with our retail-ready packaged collections.",
              badge: "Retail"
            },
            {
              title: "Organic Cosmetics",
              desc: "Specialized design and batch creation of premium makeup, foundations, lip care, and floral distillates using pure botanicals.",
              badge: "Pure Bio"
            },
            {
              title: "Premium Beauty Products",
              desc: "Custom skincare formulation refinement, testing, and batch curation under controlled hypoallergenic lab parameters.",
              badge: "Formulation"
            },
            {
              title: "Bulk Orders",
              desc: "Fast manufacturing pipelines for large event gifting, custom vanity supplies, luxury corporate gift packagings, and customized hampers.",
              badge: "Customization"
            },
            {
              title: "Dedicated Support",
              desc: "VIP account managers ready to handle bulk ordering, pricing configurations, custom supply shipping, and quality assurances.",
              badge: "24/7 Service"
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white/40 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:shadow-xl hover:border-accent/20 transition-all duration-300"
            >
              <div>
                <span className="bg-primary/5 dark:bg-accent/15 text-primary dark:text-accent font-poppins text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md inline-block mb-4">
                  {service.badge}
                </span>
                <h3 className="font-playfair text-xl font-bold text-textCustom dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="font-inter text-xs text-textCustom/60 dark:text-lightMint/60 leading-relaxed">
                  {service.desc}
                </p>
              </div>
              
              <div className="pt-6 mt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-poppins font-semibold text-primary dark:text-accent cursor-pointer group-hover:underline">
                <Link href="/services">Learn More</Link>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CUSTOMER TESTIMONIALS SECTION */}
      <section className="w-full py-24 md:py-32 bg-lightMint/30 dark:bg-black/20 relative z-10 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-poppins text-accent font-semibold">
              Client Appreciations
            </span>
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-primary dark:text-white">
              Words From The Connoisseurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                {/* Visual quote indicator */}
                <span className="absolute -top-4 -right-2 text-9xl text-accent/15 select-none font-playfair font-extrabold pointer-events-none">
                  “
                </span>

                <div className="space-y-4 relative z-10">
                  {/* Stars */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="font-playfair text-base text-textCustom/90 dark:text-white leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-6 border-t border-black/5 dark:border-white/5 mt-6 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-poppins font-bold text-textCustom dark:text-white">
                      {t.name}
                    </h5>
                    <p className="font-inter text-textCustom/40 dark:text-lightMint/40 mt-0.5">
                      {t.role}
                    </p>
                  </div>
                  <span className="text-accent">✓ Verified Client</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* 8. CONTACT SECTION */}
      <section className="w-full py-24 md:py-32 bg-lightMint/30 dark:bg-black/20 border-t border-black/5 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-poppins text-accent font-semibold block">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-primary dark:text-white">
              Connect With Our Desk
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Information & Map */}
            <div className="lg:col-span-5 space-y-8 select-none">
              <div className="space-y-6 bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 p-8 rounded-3xl">
                <div>
                  <h4 className="font-playfair text-lg font-bold text-textCustom dark:text-white mb-2">
                    Email Support
                  </h4>
                  <a
                    href="mailto:dipakparmar2466@gmail.com"
                    className="font-inter text-sm text-primary dark:text-accent hover:underline font-semibold"
                  >
                    dipakparmar2466@gmail.com
                  </a>
                </div>
                <div>
                  <h4 className="font-playfair text-lg font-bold text-textCustom dark:text-white mb-2">
                    Phone & WhatsApp Desk
                  </h4>
                  <div className="font-inter text-sm text-textCustom/75 dark:text-lightMint/75 space-y-1.5">
                    <p>Sales Line: <a href="tel:+919924750849" className="hover:underline font-semibold">+91 99247 50849</a></p>
                    <p>Owner Desk: <a href="tel:+919510583980" className="hover:underline font-semibold">+91 95105 83980</a></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 p-8 md:p-10 rounded-3xl">
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4"
                  >
                    <span className="text-5xl">✨</span>
                    <h3 className="font-playfair text-2xl font-bold text-primary dark:text-accent">
                      Thank You For Reaching Out
                    </h3>
                    <p className="font-inter text-sm text-textCustom/60 dark:text-lightMint/60 max-w-md leading-relaxed">
                      Your query has been logged. A luxury skincare representative will contact you via email at <span className="font-bold">{formData.email}</span> shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name-input" className="text-xs font-poppins font-bold uppercase tracking-wider text-textCustom/70 dark:text-lightMint/70">
                          Your Full Name
                        </label>
                        <input
                          id="name-input"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Eleanor Vance"
                          className="w-full px-5 py-3 border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/25 text-sm rounded-xl focus:outline-none focus:border-primary dark:focus:border-accent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email-input" className="text-xs font-poppins font-bold uppercase tracking-wider text-textCustom/70 dark:text-lightMint/70">
                          Email Address
                        </label>
                        <input
                          id="email-input"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. eleanor@example.com"
                          className="w-full px-5 py-3 border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/25 text-sm rounded-xl focus:outline-none focus:border-primary dark:focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone-input" className="text-xs font-poppins font-bold uppercase tracking-wider text-textCustom/70 dark:text-lightMint/70">
                        Phone Call Sign
                      </label>
                      <input
                        id="phone-input"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 99999 88888"
                        className="w-full px-5 py-3 border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/25 text-sm rounded-xl focus:outline-none focus:border-primary dark:focus:border-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message-input" className="text-xs font-poppins font-bold uppercase tracking-wider text-textCustom/70 dark:text-lightMint/70">
                        Message Details
                      </label>
                      <textarea
                        id="message-input"
                        rows={5}
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="How can we help curate your skincare experience today?"
                        className="w-full px-5 py-3 border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/25 text-sm rounded-xl focus:outline-none focus:border-primary dark:focus:border-accent resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-primary dark:bg-accent text-white dark:text-primary font-poppins text-xs font-semibold uppercase tracking-widest rounded-xl transition-all duration-300 hover:opacity-90 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-primary/20 dark:shadow-accent/15"
                    >
                      <span>Transmit Message</span>
                      <Send className="w-4.5 h-4.5" />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
