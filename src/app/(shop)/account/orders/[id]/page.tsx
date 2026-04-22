import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  RotateCcw,
  RefreshCw,
} from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; bg: string; Icon: typeof CheckCircle2 }> = {
  PENDING:    { label: "Pending",    color: "text-gray-600",   bg: "bg-gray-100",  Icon: Clock       },
  CONFIRMED:  { label: "Confirmed",  color: "text-blue-600",   bg: "bg-blue-50",   Icon: CheckCircle2},
  PROCESSING: { label: "Processing", color: "text-yellow-700", bg: "bg-yellow-50", Icon: RefreshCw   },
  SHIPPED:    { label: "Shipped",    color: "text-indigo-600", bg: "bg-indigo-50", Icon: Truck       },
  DELIVERED:  { label: "Delivered",  color: "text-green-700",  bg: "bg-green-50",  Icon: CheckCircle2},
  CANCELLED:  { label: "Cancelled",  color: "text-red-600",    bg: "bg-red-50",    Icon: XCircle     },
  REFUNDED:   { label: "Refunded",   color: "text-orange-600", bg: "bg-orange-50", Icon: RotateCcw   },
};

const STEPS = [
  { key: "CONFIRMED",  label: "Confirmed" },
  { key: "PROCESSING", label: "Processing" },
  { key: "SHIPPED",    label: "Shipped" },
  { key: "DELIVERED",  label: "Delivered" },
];

const stepIndex = (status: string) =>
  STEPS.findIndex((s) => s.key === status);

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) redirect("/account/sign-in");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const order: any = await (prisma as any).order.findFirst({
    where: { id, userId: session.user.id },
    include: {
      items: {
        include: {
          product: { select: { images: true, slug: true } },
        },
      },
    },
  });

  if (!order) notFound();

  const cfg = statusConfig[order.status] ?? statusConfig.PENDING;
  const { Icon: StatusIcon } = cfg;
  const currentStep = stepIndex(order.status);
  const isCancelled = order.status === "CANCELLED" || order.status === "REFUNDED";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addr: any = order.shippingAddress ?? {};
  const dateStr = new Date(order.createdAt).toLocaleDateString("en-KE", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="max-w-lg mx-auto px-4 py-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/account/orders" className="p-2 rounded-lg hover:bg-[#f5f5f5] transition-colors">
          <ArrowLeft size={18} className="text-[#555]" />
        </Link>
        <div>
          <h1 className="text-xl font-black text-[#1e2022]">Order #{order.orderNumber}</h1>
          <p className="text-[12px] text-[#8c98a4]">{dateStr}</p>
        </div>
      </div>

      {/* Status banner */}
      <div className={`flex items-center gap-3 p-4 rounded-xl mb-5 ${cfg.bg}`}>
        <StatusIcon size={22} className={cfg.color} />
        <div>
          <div className={`font-black text-sm ${cfg.color}`}>{cfg.label}</div>
          <div className="text-[12px] text-[#8c98a4]">
            {order.status === "DELIVERED" && "Your order has been delivered"}
            {order.status === "SHIPPED" && "Your order is on the way"}
            {order.status === "PROCESSING" && "We are preparing your order"}
            {order.status === "CONFIRMED" && "Your order has been confirmed"}
            {order.status === "PENDING" && "Waiting for payment confirmation"}
            {order.status === "CANCELLED" && "This order was cancelled"}
            {order.status === "REFUNDED" && "Refund has been initiated"}
          </div>
        </div>
      </div>

      {/* Progress tracker */}
      {!isCancelled && (
        <div className="bg-white border border-[#eeeeee] rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between relative">
            <div
              className="absolute top-3 left-0 right-0 h-0.5 bg-[#eeeeee] mx-8"
              style={{ zIndex: 0 }}
            />
            {STEPS.map((step, i) => {
              const done = i <= currentStep;
              return (
                <div key={step.key} className="flex flex-col items-center gap-1.5 relative z-10">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      done
                        ? "bg-[#fed700] border-[#fed700]"
                        : "bg-white border-[#eeeeee]"
                    }`}
                  >
                    {done && <span className="w-2 h-2 bg-[#1e2022] rounded-full" />}
                  </div>
                  <span className={`text-[10px] font-semibold ${done ? "text-[#1e2022]" : "text-[#c9d0d7]"}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Order items */}
      <div className="bg-white border border-[#eeeeee] rounded-xl mb-4 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#eeeeee]">
          <Package size={15} className="text-[#8c98a4]" />
          <span className="font-bold text-[#1e2022] text-sm">
            Items ({order.items.length})
          </span>
        </div>
        <div className="divide-y divide-[#eeeeee]">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {order.items.map((item: any) => {
            const thumb = item.product?.images?.[0];
            return (
              <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                <div className="w-14 h-14 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={20} className="text-[#c9d0d7]" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#1e2022] text-sm leading-snug line-clamp-2">
                    {item.name}
                  </div>
                  <div className="text-[12px] text-[#8c98a4] mt-0.5">
                    Qty: {item.quantity}
                  </div>
                </div>
                <div className="font-bold text-[#1e2022] text-sm flex-shrink-0">
                  KSh {(item.price * item.quantity).toLocaleString("en-KE")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price breakdown */}
      <div className="bg-white border border-[#eeeeee] rounded-xl mb-4 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#eeeeee]">
          <CreditCard size={15} className="text-[#8c98a4]" />
          <span className="font-bold text-[#1e2022] text-sm">Payment Summary</span>
        </div>
        <div className="px-4 py-3 space-y-2">
          <div className="flex justify-between text-sm text-[#555]">
            <span>Subtotal</span>
            <span>KSh {order.subtotal.toLocaleString("en-KE")}</span>
          </div>
          <div className="flex justify-between text-sm text-[#555]">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? <span className="text-green-600 font-semibold">Free</span> : `KSh ${order.shipping.toLocaleString("en-KE")}`}</span>
          </div>
          <div className="border-t border-[#eeeeee] pt-2 flex justify-between font-black text-[#1e2022]">
            <span>Total</span>
            <span>KSh {order.total.toLocaleString("en-KE")}</span>
          </div>
          <div className="flex justify-between text-[12px] text-[#8c98a4]">
            <span>Payment</span>
            <span className="capitalize">{order.paymentMethod}</span>
          </div>
          {order.mpesaRef && (
            <div className="flex justify-between text-[12px] text-[#8c98a4]">
              <span>M-Pesa Ref</span>
              <span className="font-mono">{order.mpesaRef}</span>
            </div>
          )}
        </div>
      </div>

      {/* Shipping address */}
      {addr?.name && (
        <div className="bg-white border border-[#eeeeee] rounded-xl mb-4 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#eeeeee]">
            <MapPin size={15} className="text-[#8c98a4]" />
            <span className="font-bold text-[#1e2022] text-sm">Delivery Address</span>
          </div>
          <div className="px-4 py-3 text-sm text-[#555] space-y-0.5">
            <div className="font-semibold text-[#1e2022]">{addr.name}</div>
            {addr.phone && <div>{addr.phone}</div>}
            {addr.line1 && <div>{addr.line1}</div>}
            {addr.line2 && <div>{addr.line2}</div>}
            {addr.city && <div>{addr.city}{addr.county ? `, ${addr.county}` : ""}</div>}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2">
        <Link
          href="/products"
          className="flex items-center justify-center w-full py-3 bg-[#fed700] hover:bg-[#d8b700] text-[#1e2022] font-black text-sm transition-colors rounded-xl"
        >
          Continue Shopping
        </Link>
        <Link
          href="/account/orders"
          className="flex items-center justify-center w-full py-3 border border-[#eeeeee] hover:border-[#1e3a5c] text-[#555] hover:text-[#1e3a5c] font-semibold text-sm transition-colors rounded-xl"
        >
          Back to Orders
        </Link>
      </div>
    </div>
  );
}
