"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ReceiptItem {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Receipt {
  orderId: string;
  name: string;
  mobile: string;
  address: string;
  amount: number;
  paymentMethod: string;
  deliveryCharge?: number;
  subtotal?: number;
  items?: ReceiptItem[];
}

export default function OrderSuccessPage() {
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("raj_latest_order");
    if (saved) {
      try {
        setReceipt(JSON.parse(saved));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  if (!receipt) {
    return (
      <div className="pt-32 text-center py-20 min-h-screen flex flex-col justify-center items-center">
        <span className="text-4xl">🍂</span>
        <h3 className="font-playfair text-xl font-bold mt-2">No Order Verified</h3>
        <button
          onClick={() => router.push("/products")}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-poppins text-xs uppercase"
        >
          Back to collection
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-6">
        
        <div className="bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 p-8 md:p-10 rounded-3xl space-y-8 shadow-xl text-center select-none">
          {/* Badge */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-primary dark:text-accent tracking-wide">
              Order Placed Successfully!
            </h1>
            <p className="font-inter text-sm font-semibold text-secondary dark:text-accent">
              Thank You! Your order is confirmed.
            </p>
            <p className="font-inter text-xs text-textCustom/60 dark:text-lightMint/60 max-w-sm leading-relaxed">
              Your organic luxury beauty formulations are locked in. A digital receipt and delivery log has been generated for your transaction details below.
            </p>
          </div>

          {/* Receipt Info */}
          <div className="bg-white/60 dark:bg-black/35 rounded-2xl p-6 text-left space-y-3.5 border border-black/[0.04]">
            <div className="flex justify-between text-xs font-inter text-textCustom/50 dark:text-lightMint/50 border-b border-black/5 dark:border-white/5 pb-2.5">
              <span>Order Number</span>
              <span className="font-poppins font-bold text-textCustom dark:text-white">{receipt.orderId}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-poppins font-bold text-textCustom/40 dark:text-lightMint/30 uppercase">Recipient</span>
              <p className="text-xs font-inter text-textCustom dark:text-white font-semibold">{receipt.name} ({receipt.mobile})</p>
            </div>

            <div className="space-y-1 border-b border-black/5 dark:border-white/5 pb-3">
              <span className="text-[10px] font-poppins font-bold text-textCustom/40 dark:text-lightMint/30 uppercase">Delivery Address</span>
              <p className="text-xs font-inter text-textCustom/75 dark:text-lightMint/75 leading-relaxed">{receipt.address}</p>
            </div>

            {/* Itemized Products */}
            {receipt.items && receipt.items.length > 0 && (
              <div className="space-y-2 border-b border-black/5 dark:border-white/5 pb-3">
                <span className="text-[10px] font-poppins font-bold text-textCustom/40 dark:text-lightMint/30 uppercase block">Items Ordered</span>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {receipt.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-inter">
                      <div className="text-textCustom dark:text-white font-medium flex items-center space-x-2">
                        <span className="truncate max-w-[180px]">{item.name}</span>
                        <span className="text-textCustom/50 dark:text-lightMint/40 text-[10px]">x{item.quantity}</span>
                      </div>
                      <span className="font-poppins text-textCustom/80 dark:text-lightMint/80 font-semibold text-right">₹{item.subtotal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {receipt.subtotal !== undefined && (
              <div className="flex justify-between text-xs font-inter text-textCustom/50 dark:text-lightMint/50 pt-1">
                <span>Subtotal</span>
                <span className="font-poppins text-textCustom dark:text-white font-semibold">₹{receipt.subtotal}</span>
              </div>
            )}

            {receipt.deliveryCharge !== undefined && (
              <div className="flex justify-between text-xs font-inter text-textCustom/50 dark:text-lightMint/50 pt-1">
                <span>Delivery Charge</span>
                <span className="font-poppins text-textCustom dark:text-white font-semibold">
                  {receipt.deliveryCharge === 0 ? "Free" : `₹${receipt.deliveryCharge}`}
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 border-t border-black/5 dark:border-white/5 pt-3 mt-1">
              <div className="space-y-0.5">
                <span className="text-[10px] font-poppins font-bold text-textCustom/40 dark:text-lightMint/30 uppercase">Payment Option</span>
                <p className="text-xs font-inter text-textCustom dark:text-white font-semibold">{receipt.paymentMethod}</p>
              </div>
              <div className="space-y-0.5 text-right">
                <span className="text-[10px] font-poppins font-bold text-textCustom/40 dark:text-lightMint/30 uppercase">Total Settled</span>
                <p className="text-sm font-poppins text-primary dark:text-accent font-bold">₹{receipt.amount}</p>
              </div>
            </div>
          </div>

          {/* CTA Link */}
          <Link
            href="/products"
            className="w-full py-4 bg-primary dark:bg-accent text-white dark:text-primary font-poppins text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity cursor-pointer shadow-md"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-[10px] font-inter text-textCustom/40 dark:text-lightMint/35">
            Typically ships within 24 hours. For cancellations or updates, email <a href="mailto:dipakparmar2466@gmail.com" className="underline hover:text-primary">dipakparmar2466@gmail.com</a>.
          </p>
        </div>

      </div>
    </div>
  );
}
