import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { rateLimit } from "@/lib/rateLimit";

// Verify reCAPTCHA token (non-blocking)
async function checkCaptcha(token: string | undefined): Promise<void> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return; // not configured — skip silently
  if (!token) {
    console.warn("[register] No captcha token provided");
    return;
  }
  try {
    const res  = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    });
    const data = await res.json();
    if (!data.success || data.score < 0.3) {
      console.warn(`[register] Low captcha score: ${data.score} (not blocking)`);
    }
  } catch (err) {
    console.warn("[register] Captcha verification failed:", err);
  }
}

function sanitize(str: string): string {
  return str.trim().slice(0, 255);
}

export async function POST(req: NextRequest) {
  // Rate limit: 3 registrations per hour per IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const rl = rateLimit(`register:${ip}`, 3, 60 * 60 * 1000);
  if (rl.limited) {
    return NextResponse.json(
      { error: "Too many registration attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  const body = await req.json();
  const { captchaToken } = body;

  await checkCaptcha(captchaToken);

  const name     = sanitize(body.name     || "");
  const email    = sanitize(body.email    || "").toLowerCase();
  const phone    = sanitize(body.phone    || "");
  const password =          body.password || "";

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (password.length < 6 || password.length > 128) {
    return NextResponse.json({ error: "Password must be 6–128 characters" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existing = await (prisma as any).user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  }

  const hashed = hashPassword(password);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma as any).user.create({
    data: { name, email, phone: phone || null, password: hashed },
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
