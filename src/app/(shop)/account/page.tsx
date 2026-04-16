"use client";

import Link from "next/link";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Bell,
} from "lucide-react";

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black text-[#333e48] mb-6">My Account</h1>

      {/* Profile card */}
      <div className="bg-[#333e48] rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#fed700]/10 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 bg-[#fed700] rounded-full flex items-center justify-center text-[#333e48] font-black text-2xl">
            J
          </div>
          <div>
            <div className="font-bold text-xl">John Kamau</div>
            <div className="text-gray-400 text-sm">john@example.com</div>
            <div className="text-gray-400 text-sm">+254 700 000 000</div>
          </div>
          <Link
            href="/account/settings"
            className="ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Settings size={20} className="text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Menu items */}
      <div className="space-y-2">
        {[
          {
            icon: Package,
            label: "My Orders",
            sub: "Track and manage your orders",
            href: "/account/orders",
            color: "text-blue-500 bg-blue-50",
          },
          {
            icon: Heart,
            label: "Saved Items",
            sub: "Your wishlist",
            href: "/account/saved",
            color: "text-red-500 bg-red-50",
          },
          {
            icon: ShoppingBag,
            label: "Recently Viewed",
            sub: "Products you browsed",
            href: "/account/history",
            color: "text-purple-500 bg-purple-50",
          },
          {
            icon: Bell,
            label: "Notifications",
            sub: "Deals and order updates",
            href: "/account/notifications",
            color: "text-yellow-500 bg-yellow-50",
          },
          {
            icon: User,
            label: "Profile Settings",
            sub: "Update your personal info",
            href: "/account/settings",
            color: "text-green-500 bg-green-50",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#fed700] hover:shadow-sm transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
              <item.icon size={20} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-sm">
                {item.label}
              </div>
              <div className="text-xs text-gray-500">{item.sub}</div>
            </div>
            <ChevronRight
              size={18}
              className="text-gray-400 group-hover:text-[#fed700] transition-colors"
            />
          </Link>
        ))}

        <button className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-red-200 w-full text-left transition-all group">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <LogOut size={20} className="text-red-500" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-red-600 text-sm">Sign Out</div>
            <div className="text-xs text-gray-500">Logout from your account</div>
          </div>
        </button>
      </div>
    </div>
  );
}
