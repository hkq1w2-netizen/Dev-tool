import { NextResponse } from "next/server";
import { dbFindUserByEmail } from "@/lib/db/store";
import { comparePassword, signToken } from "@/lib/auth/jwt";
import { AUTH_COOKIE_NAME } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, data: null, error: { code: "INVALID_INPUT", message: "Email and password are required." } },
        { status: 400 }
      );
    }

    const user = await dbFindUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { success: false, data: null, error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password." } },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, data: null, error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password." } },
        { status: 401 }
      );
    }

    const sessionPayload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      plan: user.plan,
      subscriptionStatus: user.subscriptionStatus,
      emailVerified: user.emailVerified,
    };

    const token = signToken(sessionPayload);

    const res = NextResponse.json({ success: true, data: sessionPayload, error: null });
    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, data: null, error: { code: "SERVER_ERROR", message } },
      { status: 500 }
    );
  }
}
