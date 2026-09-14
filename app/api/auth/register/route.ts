import { NextResponse } from "next/server";
import { dbFindUserByEmail, dbCreateUser } from "@/lib/db/store";
import { hashPassword, signToken } from "@/lib/auth/jwt";
import { AUTH_COOKIE_NAME } from "@/lib/auth/session";
import { RegisterSchema } from "@/lib/validation/schemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = RegisterSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          data: null, 
          error: { 
            code: "INVALID_INPUT", 
            message: parseResult.error.issues[0]?.message || "Invalid payload." 
          } 
        },
        { status: 400 }
      );
    }

    const { name, email, password } = parseResult.data;

    const existing = await dbFindUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, data: null, error: { code: "USER_EXISTS", message: "An account with this email already exists." } },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const userPayload = await dbCreateUser({
      name,
      email,
      passwordHash,
    });

    const token = signToken(userPayload);

    const res = NextResponse.json({ success: true, data: userPayload, error: null });
    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60,
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
