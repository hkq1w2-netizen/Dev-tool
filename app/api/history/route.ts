import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { dbGetHistory, dbCreateHistory } from "@/lib/db/store";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, data: [], error: null });
    }

    const history = await dbGetHistory(session.id);
    return NextResponse.json({ success: true, data: history, error: null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, data: [], error: { code: "SERVER_ERROR", message } });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, data: null, error: { code: "UNAUTHORIZED", message: "Not logged in" } });
    }

    const { toolSlug, action = "execute" } = await req.json();
    if (!toolSlug) {
      return NextResponse.json({ success: false, data: null, error: { code: "INVALID_INPUT", message: "toolSlug required" } });
    }

    const entry = await dbCreateHistory(session.id, toolSlug, action);
    return NextResponse.json({ success: true, data: entry, error: null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, data: null, error: { code: "SERVER_ERROR", message } });
  }
}
