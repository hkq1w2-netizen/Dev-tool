import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { dbUpdateUserPlan } from "@/lib/db/store";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, data: null, error: { code: "UNAUTHORIZED", message: "Not logged in" } });
    }

    return NextResponse.json({
      success: true,
      data: {
        plan: session.plan,
        subscriptionStatus: session.subscriptionStatus,
      },
      error: null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, data: null, error: { code: "SERVER_ERROR", message } });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, data: null, error: { code: "UNAUTHORIZED", message: "Not logged in" } });
    }

    const { targetPlan = "pro" } = await req.json();

    await dbUpdateUserPlan(session.id, targetPlan);

    return NextResponse.json({
      success: true,
      data: { message: `Successfully upgraded account to ${targetPlan.toUpperCase()} plan!` },
      error: null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, data: null, error: { code: "SERVER_ERROR", message } });
  }
}
