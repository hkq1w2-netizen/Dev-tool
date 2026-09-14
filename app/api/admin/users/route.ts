import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { dbGetAllUsers } from "@/lib/db/store";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, data: [], error: { code: "FORBIDDEN", message: "Admin privileges required" } }, { status: 403 });
    }

    const users = await dbGetAllUsers();
    return NextResponse.json({ success: true, data: users, error: null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, data: [], error: { code: "SERVER_ERROR", message } });
  }
}
