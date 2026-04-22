import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Package,
  Heart,
  Settings,
  ChevronRight,
  Bell,
  Clock,
} from "lucide-react";
import SignOutButton from "./SignOutButton";

const menuItems = [
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
    color: "text-rose-500 bg-rose-50",
  },
  {
    icon: Clock,
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
    color: "text-amber-500 bg-amber-50",
  },
  {
    icon: Settings,
    label: "Profile Settings",
    sub: "Update your personal info",
    href: "/account/settings",
    color: "text-emerald-500 bg-emerald-50",
  },
];

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/account/sign-in");

  const user = session.user;
  const initial = (user.name || user.email || "U")[0].toUpperCase();
  const firstName = user.name?.split(" ")[0] ?? "Account";

  return (
    <div className="max-w-lg mx-auto px-4 py-6">

      {/* Profile card */}
      <div className="relative bg-[#1e3a5c] rounded-2xl p-5 text-white mb-5 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#fed700]/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-14 -left-8 w-36 h-36 bg-white/5 rounded-full pointer-events-none" />

        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 bg-[#fed700] rounded-full flex items-center justify-center text-[#1e3a5c] font-black text-2xl flex-shrink-0 select-none">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-black text-lg leading-tight truncate">
              {user.name ?? "My Account"}
            </div>
            <div className="text-blue-200 text-[13px] truncate mt-0.5">
              {user.email}
            </div>
            <div className="inline-flex items-center gap-1 mt-2 bg-[#fed700]/15 text-[#fed700] text-[11px] font-semibold px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#fed700] rounded-full" />
              Verified Customer
            </div>
          </div>
          <Link
            href="/account/settings"
            className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
          >
            <Settings size={18} className="text-blue-200" />
          </Link>
        </div>

        <div className="relative mt-4 pt-4 border-t border-white/10 grid grid-cols-3 text-center gap-2">
          <div>
            <div className="font-black text-lg text-white">0</div>
            <div className="text-[11px] text-blue-200">Orders</div>
          </div>
          <div>
            <div className="font-black text-lg text-white">0</div>
            <div className="text-[11px] text-blue-200">Saved</div>
          </div>
          <div>
            <div className="font-black text-lg text-white">0</div>
            <div className="text-[11px] text-blue-200">Reviews</div>
          </div>
        </div>
      </div>

      {/* Welcome line */}
      <p className="text-[13px] text-[#8c98a4] mb-3 px-1">
        Welcome back, <span className="font-semibold text-[#1e2022]">{firstName}</span>
      </p>

      {/* Menu items */}
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#eeeeee] hover:border-[#fed700] hover:shadow-sm transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
              <item.icon size={18} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[#1e2022] text-sm">{item.label}</div>
              <div className="text-xs text-[#8c98a4]">{item.sub}</div>
            </div>
            <ChevronRight
              size={16}
              className="text-[#c9d0d7] group-hover:text-[#fed700] transition-colors flex-shrink-0"
            />
          </Link>
        ))}

        <SignOutButton />
      </div>
    </div>
  );
}
