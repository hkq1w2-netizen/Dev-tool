import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

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

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, data: null, error: { code: "UNAUTHORIZED", message: "Not logged in" } }, { status: 401 });
    }

    // Secure Payment Architecture: Client cannot directly upgrade via plain POST
    return NextResponse.json(
      { 
        success: false, 
        data: null, 
        error: { 
          code: "PAYMENT_REQUIRED", 
          message: "Paid upgrades require valid checkout session via Stripe or Paddle webhooks." 
        } 
      },
      { status: 402 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, data: null, error: { code: "SERVER_ERROR", message } }, { status: 500 });
  }
}
