import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { dbGetStats } from "@/lib/db/store";
import { ALL_TOOLS } from "@/lib/tools/registry";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, data: null, error: { code: "FORBIDDEN", message: "Admin privileges required" } }, { status: 403 });
    }

    const stats = await dbGetStats();

    return NextResponse.json({
      success: true,
      data: {
        totalTools: ALL_TOOLS.length,
        ...stats,
      },
      error: null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, data: null, error: { code: "SERVER_ERROR", message } });
  }
}
