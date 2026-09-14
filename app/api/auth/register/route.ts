import { NextResponse } from "next/server";
import { dbFindUserByEmail, dbCreateUser } from "@/lib/db/store";
import { hashPassword, signToken } from "@/lib/auth/jwt";
import { AUTH_COOKIE_NAME } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password || password.length < 6) {
      return NextResponse.json(
        { success: false, data: null, error: { code: "INVALID_INPUT", message: "Please provide name, valid email, and a password of at least 6 characters." } },
        { status: 400 }
      );
    }

    const existing = await dbFindUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, data: null, error: { code: "USER_EXISTS", message: "An account with this email already exists." } },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const userPayload = await dbCreateUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
    });

    const token = signToken(userPayload);

    const res = NextResponse.json({ success: true, data: userPayload, error: null });
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
