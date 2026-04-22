"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#eeeeee] hover:border-red-200 w-full text-left transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
        <LogOut size={18} className="text-red-500" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-red-500 text-sm">Sign Out</div>
        <div className="text-xs text-[#8c98a4]">Logout from your account</div>
      </div>
    </button>
  );
}
