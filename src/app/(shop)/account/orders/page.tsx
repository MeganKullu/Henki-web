import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, ArrowLeft, ChevronRight, ShoppingBag } from "lucide-react";

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  PENDING:    { bg: "bg-gray-100",   text: "text-gray-600",  dot: "bg-gray-400"  },
  CONFIRMED:  { bg: "bg-blue-50",    text: "text-blue-600",  dot: "bg-blue-500"  },
  PROCESSING: { bg: "bg-yellow-50",  text: "text-yellow-700",dot: "bg-yellow-500"},
  SHIPPED:    { bg: "bg-indigo-50",  text: "text-indigo-600",dot: "bg-indigo-500"},
  DELIVERED:  { bg: "bg-green-50",   text: "text-green-700", dot: "bg-green-500" },
  CANCELLED:  { bg: "bg-red-50",     text: "text-red-600",   dot: "bg-red-500"   },
  REFUNDED:   { bg: "bg-orange-50",  text: "text-orange-600",dot: "bg-orange-500"},
};

function StatusBadge({ status }: { status: string }) {
  const s = statusStyles[status] ?? statusStyles.PENDING;
  const label = status.charAt(0) + status.slice(1).toLowerCase();
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {label}
    </span>
  );
}

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) redirect("/account/sign-in");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orders: any[] = await (prisma as any).order.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        take: 3,
        include: { product: { select: { images: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-lg mx-auto px-4 py-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/account" className="p-2 rounded-lg hover:bg-[#f5f5f5] transition-colors">
          <ArrowLeft size={18} className="text-[#555]" />
        </Link>
        <div>
          <h1 className="text-xl font-black text-[#1e2022]">My Orders</h1>
          {orders.length > 0 && (
            <p className="text-[12px] text-[#8c98a4]">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
          )}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-[#f5f5f5] rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} className="text-[#c9d0d7]" />
          </div>
          <h3 className="font-black text-[#1e2022] mb-1">No orders yet</h3>
          <p className="text-sm text-[#8c98a4] mb-6">
            Start shopping to see your orders here
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#fed700] hover:bg-[#d8b700] text-[#1e2022] font-black text-sm px-6 py-3 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {orders.map((order: any) => {
            const thumb = order.items[0]?.product?.images?.[0];
            const extraItems = order.items.length > 1 ? order.items.length - 1 : 0;
            const dateStr = new Date(order.createdAt).toLocaleDateString("en-KE", {
              day: "numeric", month: "short", year: "numeric",
            });

            return (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#eeeeee] hover:border-[#fed700] hover:shadow-sm transition-all group"
              >
                {/* Product thumb */}
                <div className="w-14 h-14 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0 relative">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Package size={24} className="absolute inset-0 m-auto text-[#c9d0d7]" />
                  )}
                  {extraItems > 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-[11px] font-bold">+{extraItems}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[#1e2022] text-sm">#{order.orderNumber}</span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="text-[12px] text-[#8c98a4]">
                    {dateStr} · {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </div>
                  <div className="font-black text-[#1e2022] text-sm mt-1">
                    KSh {order.total.toLocaleString("en-KE")}
                  </div>
                </div>

                <ChevronRight size={16} className="text-[#c9d0d7] group-hover:text-[#fed700] transition-colors flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
