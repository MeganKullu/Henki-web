import { Package, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

// In production, fetch from DB using session user
const mockOrders = [
  {
    id: "1",
    orderNumber: "HNK-001234",
    date: "Jan 15, 2025",
    status: "Delivered",
    total: 38500,
    items: 2,
  },
  {
    id: "2",
    orderNumber: "HNK-001189",
    date: "Jan 08, 2025",
    status: "Shipped",
    total: 148000,
    items: 1,
  },
  {
    id: "3",
    orderNumber: "HNK-001102",
    date: "Dec 28, 2024",
    status: "Delivered",
    total: 14500,
    items: 3,
  },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
  Pending: "bg-gray-100 text-gray-700",
};

export default function OrdersPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/account"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-black text-[#333e48]">My Orders</h1>
      </div>

      {mockOrders.length === 0 ? (
        <div className="text-center py-16">
          <Package size={48} className="mx-auto text-gray-300 mb-3" />
          <h3 className="font-semibold text-gray-700 mb-1">No orders yet</h3>
          <p className="text-sm text-gray-500 mb-4">
            Start shopping to see your orders here
          </p>
          <Link href="/products" className="btn-primary">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[#fed700] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[#333e48]">
                      #{order.orderNumber}
                    </span>
                    <span
                      className={`badge text-xs ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.date} · {order.items} item{order.items > 1 ? "s" : ""}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#333e48]">
                    KSh {order.total.toLocaleString("en-KE")}
                  </div>
                  <button className="flex items-center gap-1 text-sm text-[#fed700] hover:text-[#d8b700] mt-1">
                    Details <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
