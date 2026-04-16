"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/formatters";
import { trackBeginCheckout } from "@/lib/gtm";
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  Smartphone,
  Lock,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

const STEPS = [
  { id: 1, label: "Cart", icon: ShoppingBag },
  { id: 2, label: "Shipping", icon: MapPin },
  { id: 3, label: "Payment", icon: CreditCard },
  { id: 4, label: "Done", icon: CheckCircle },
];

interface ShippingData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState<ShippingData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Nairobi",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">(
    "mpesa"
  );
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const { items, subtotal, total, removeItem, updateQuantity, clearCart } =
    useCartStore();
  const sub = subtotal();
  const shippingCost = sub >= 10000 ? 0 : sub > 0 ? 350 : 0;
  const grandTotal = sub + shippingCost;

  function goToStep2() {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    trackBeginCheckout(
      items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      grandTotal
    );
    setStep(2);
  }

  function goToStep3(e: React.FormEvent) {
    e.preventDefault();
    if (!shipping.name || !shipping.email || !shipping.phone || !shipping.address) {
      toast.error("Please fill all required fields");
      return;
    }
    setStep(3);
  }

  async function placeOrder() {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
            price: i.price,
            name: i.name,
            image: i.image,
          })),
          customerName: shipping.name,
          customerEmail: shipping.email,
          customerPhone: shipping.phone,
          shippingAddress: {
            address: shipping.address,
            city: shipping.city,
            notes: shipping.notes,
          },
          paymentMethod,
          subtotal: sub,
          shipping: shippingCost,
          total: grandTotal,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");
      const data = await res.json();
      setOrderNumber(data.orderNumber);

      if (paymentMethod === "mpesa") {
        await fetch("/api/payments/mpesa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: shipping.phone,
            amount: grandTotal,
            orderId: data.id,
          }),
        });
        toast.success("M-Pesa STK Push sent to your phone!");
      }

      clearCart();
      setStep(4);
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black text-[#333e48] mb-6">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = step === s.id;
          const done = step > s.id;
          return (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    done
                      ? "bg-green-500 text-white"
                      : active
                        ? "bg-[#fed700] text-[#333e48]"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {done ? <CheckCircle size={18} /> : <Icon size={16} />}
                </div>
                <span
                  className={`text-xs mt-1 font-medium ${active ? "text-[#333e48]" : "text-gray-400"}`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${done ? "bg-green-500" : "bg-gray-200"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="md:col-span-2">
          {/* Step 1: Cart */}
          {step === 1 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-bold text-lg text-[#333e48] mb-4">
                Cart Summary
              </h2>
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <Link href="/products" className="btn-primary mt-4 inline-flex">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-3 py-3 border-b border-gray-50 last:border-0"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">{item.brand}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-1 border border-gray-200 rounded-lg text-xs">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-6 h-6 flex items-center justify-center hover:bg-gray-50"
                            >
                              −
                            </button>
                            <span className="w-6 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-bold text-[#333e48]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {items.length > 0 && (
                <button
                  onClick={goToStep2}
                  className="btn-primary w-full mt-5 justify-center"
                >
                  Proceed to Shipping
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
              >
                <ArrowLeft size={16} />
                Back to Cart
              </button>
              <h2 className="font-bold text-lg text-[#333e48] mb-4">
                Shipping Details
              </h2>
              <form onSubmit={goToStep3} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shipping.name}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, name: e.target.value }))
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#fed700] focus:ring-1 focus:ring-[#fed700]"
                      placeholder="John Kamau"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shipping.phone}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, phone: e.target.value }))
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#fed700] focus:ring-1 focus:ring-[#fed700]"
                      placeholder="0700 000 000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={shipping.email}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, email: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#fed700] focus:ring-1 focus:ring-[#fed700]"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, address: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#fed700] focus:ring-1 focus:ring-[#fed700]"
                    placeholder="Westlands, Nairobi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <select
                    value={shipping.city}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, city: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#fed700]"
                  >
                    {[
                      "Nairobi",
                      "Mombasa",
                      "Kisumu",
                      "Nakuru",
                      "Eldoret",
                      "Thika",
                      "Other",
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Notes (optional)
                  </label>
                  <textarea
                    value={shipping.notes}
                    onChange={(e) =>
                      setShipping((s) => ({ ...s, notes: e.target.value }))
                    }
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#fed700] resize-none"
                    placeholder="Any special delivery instructions..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  Continue to Payment
                  <ChevronRight size={18} />
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
              >
                <ArrowLeft size={16} />
                Back to Shipping
              </button>
              <h2 className="font-bold text-lg text-[#333e48] mb-4">
                Payment Method
              </h2>

              <div className="space-y-3 mb-6">
                {/* M-Pesa */}
                <label
                  className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === "mpesa" ? "border-[#fed700] bg-[#fff8ec]" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="mpesa"
                    checked={paymentMethod === "mpesa"}
                    onChange={() => setPaymentMethod("mpesa")}
                    className="accent-[#fed700]"
                  />
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Smartphone size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      M-Pesa
                    </div>
                    <div className="text-xs text-gray-500">
                      STK Push to your phone — instant
                    </div>
                  </div>
                  <span className="ml-auto badge badge-new text-xs">
                    Recommended
                  </span>
                </label>

                {/* Card */}
                <label
                  className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === "card" ? "border-[#fed700] bg-[#fff8ec]" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="accent-[#fed700]"
                  />
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <CreditCard size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      Card (Visa / Mastercard)
                    </div>
                    <div className="text-xs text-gray-500">
                      Via Pesapal — secure checkout
                    </div>
                  </div>
                </label>
              </div>

              {paymentMethod === "mpesa" && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 text-sm text-green-800">
                  <strong>How M-Pesa works:</strong> After clicking &quot;Place
                  Order&quot;, you will receive an STK push notification on{" "}
                  <strong>{shipping.phone}</strong>. Enter your M-Pesa PIN to
                  complete payment.
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <Lock size={14} />
                Your payment is secured by 256-bit SSL encryption
              </div>

              <button
                onClick={placeOrder}
                disabled={loading}
                className="btn-primary w-full justify-center"
              >
                {loading ? (
                  <span className="animate-spin w-5 h-5 border-2 border-[#333e48] border-t-transparent rounded-full" />
                ) : (
                  <>
                    Place Order — {formatPrice(grandTotal)}
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={36} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-black text-[#333e48] mb-2">
                Order Placed!
              </h2>
              <p className="text-gray-600 mb-1">Order Number:</p>
              <p className="text-xl font-bold text-[#fed700] mb-4">
                #{orderNumber}
              </p>
              <p className="text-sm text-gray-600 mb-6">
                {paymentMethod === "mpesa"
                  ? "Check your phone for the M-Pesa payment request. We'll confirm your order once payment is received."
                  : "You'll be redirected to complete payment. We'll send a confirmation email once done."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/account/orders" className="btn-primary">
                  View My Orders
                </Link>
                <Link href="/products" className="btn-outline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        {step < 4 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 h-fit sticky top-24">
            <h3 className="font-bold text-[#333e48] mb-4">Order Summary</h3>
            <ul className="space-y-2 mb-4">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 line-clamp-1 flex-1 mr-2">
                    {item.name} <span className="text-gray-400">×{item.quantity}</span>
                  </span>
                  <span className="font-medium flex-shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(sub)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? "text-green-600" : ""}>
                  {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base text-[#333e48] pt-1 border-t">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
