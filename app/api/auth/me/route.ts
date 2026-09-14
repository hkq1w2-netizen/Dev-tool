import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, data: null, error: { code: "UNAUTHORIZED", message: "Not logged in" } });
  }
  return NextResponse.json({ success: true, data: session, error: null });
}
