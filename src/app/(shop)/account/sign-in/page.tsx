"use client";

import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ShoppingBag, ArrowRight } from "lucide-react";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

async function getCaptchaToken(action: string): Promise<string | undefined> {
  if (!SITE_KEY || typeof window === "undefined" || !(window as any).grecaptcha) return undefined;
  try {
    return await (window as any).grecaptcha.execute(SITE_KEY, { action });
  } catch {
    return undefined;
  }
}

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const captchaToken = await getCaptchaToken("login");
    const result = await signIn("credentials", {
      email,
      password,
      captchaToken,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/account");
      router.refresh();
    }
  }, [email, password, router]);

  return (
    <>
      {SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
          strategy="lazyOnload"
        />
      )}

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#f5f5f5]">
        <div className="w-full max-w-md">

          <div className="bg-white border border-[#eeeeee] shadow-sm overflow-hidden">

            {/* Header */}
            <div className="bg-[#1e3a5c] px-8 py-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 bg-[#fed700] rounded flex items-center justify-center font-black text-[#1e3a5c] text-sm">H</div>
                <span className="font-black text-white text-lg tracking-tight">HENKI<span className="text-[#fed700]">.</span></span>
              </div>
              <p className="text-gray-400 text-[13px]">Sign in to your account to continue</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-[12px] font-bold text-[#1e2022] uppercase tracking-wide mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c98a4]" />
                  <input
                    type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-11 pl-9 pr-4 border border-[#e6e6e6] text-[#1e2022] text-sm outline-none focus:border-[#1e3a5c] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[12px] font-bold text-[#1e2022] uppercase tracking-wide">Password</label>
                  <Link href="/account/forgot-password" className="text-[12px] text-[#1e3a5c] hover:text-[#fed700] transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c98a4]" />
                  <input
                    type={showPw ? "text" : "password"} required value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 pl-9 pr-10 border border-[#e6e6e6] text-[#1e2022] text-sm outline-none focus:border-[#1e3a5c] transition-colors"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c98a4] hover:text-[#1e2022] transition-colors">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full h-11 bg-[#fed700] hover:bg-[#d8b700] disabled:opacity-60 text-[#1e2022] font-black text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2">
                {loading ? "Signing in…" : <><span>Sign In</span><ArrowRight size={15} /></>}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#eeeeee]" /></div>
                <div className="relative flex justify-center text-[11px]">
                  <span className="bg-white px-3 text-[#8c98a4] uppercase tracking-wide">New to Henki?</span>
                </div>
              </div>

              <Link href="/account/register"
                className="w-full h-11 border-2 border-[#1e3a5c] text-[#1e3a5c] hover:bg-[#1e3a5c] hover:text-white font-bold text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2">
                <ShoppingBag size={15} /> Create an Account
              </Link>
            </form>
          </div>

          <p className="text-center text-[11px] text-[#8c98a4] mt-4">
            By signing in you agree to our{" "}
            <Link href="/terms" className="underline hover:text-[#1e3a5c]">Terms</Link>{" "}and{" "}
            <Link href="/privacy" className="underline hover:text-[#1e3a5c]">Privacy Policy</Link>.
            {SITE_KEY && <><br />Protected by reCAPTCHA.</>}
          </p>
        </div>
      </div>
    </>
  );
}
