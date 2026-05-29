"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm]     = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Registration failed. Please try again.");
      return;
    }
    router.push("/account/sign-in?registered=1");
  }

  const field = (
    icon: React.ReactNode,
    label: string,
    key: keyof typeof form,
    type = "text",
    placeholder = ""
  ) => (
    <div>
      <label className="block text-[12px] font-bold text-[#1e2022] uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c98a4]">{icon}</span>
        <input
          type={type}
          required={key !== "phone"}
          value={form[key]}
          onChange={(e) => update(key, e.target.value)}
          placeholder={placeholder}
          className="w-full h-11 pl-9 pr-4 border border-[#e6e6e6] text-[#1e2022] text-sm outline-none focus:border-[#1e3a5c] transition-colors"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#f5f5f5]">
      <div className="w-full max-w-md">
        <div className="bg-white border border-[#eeeeee] shadow-sm overflow-hidden">

          {/* Header */}
          <div className="bg-[#1e3a5c] px-8 py-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-[#fed700] rounded flex items-center justify-center font-black text-[#1e3a5c] text-sm">
                H
              </div>
              <span className="font-black text-white text-lg tracking-tight">
                HENKI<span className="text-[#fed700]">.</span>
              </span>
            </div>
            <p className="text-gray-400 text-[13px]">Create your Henki Electronics account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-4">

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded">
                {error}
              </div>
            )}

            {field(<User size={15} />, "Full Name", "name", "text", "John Kamau")}
            {field(<Mail size={15} />, "Email Address", "email", "email", "you@example.com")}
            {field(<Phone size={15} />, "Phone (optional)", "phone", "tel", "+254 728 200 018")}

            {/* Password */}
            <div>
              <label className="block text-[12px] font-bold text-[#1e2022] uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c98a4]" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full h-11 pl-9 pr-10 border border-[#e6e6e6] text-[#1e2022] text-sm outline-none focus:border-[#1e3a5c] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c98a4] hover:text-[#1e2022] transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-[12px] font-bold text-[#1e2022] uppercase tracking-wide mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c98a4]" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={form.confirm}
                  onChange={(e) => update("confirm", e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full h-11 pl-9 pr-4 border border-[#e6e6e6] text-[#1e2022] text-sm outline-none focus:border-[#1e3a5c] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#fed700] hover:bg-[#d8b700] disabled:opacity-60 text-[#1e2022] font-black text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loading ? "Creating account…" : (
                <>Create Account <ArrowRight size={15} /></>
              )}
            </button>

            <p className="text-center text-sm text-[#8c98a4]">
              Already have an account?{" "}
              <Link href="/account/sign-in" className="text-[#1e3a5c] font-bold hover:text-[#fed700] transition-colors">
                Sign In
              </Link>
            </p>
          </form>
        </div>

        <p className="text-center text-[11px] text-[#8c98a4] mt-4">
          By registering you agree to our{" "}
          <Link href="/terms" className="underline hover:text-[#1e3a5c]">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="underline hover:text-[#1e3a5c]">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
