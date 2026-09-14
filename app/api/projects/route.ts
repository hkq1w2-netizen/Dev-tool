import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { dbGetProjects, dbCreateProject } from "@/lib/db/store";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, data: [], error: { code: "UNAUTHORIZED", message: "Not logged in" } });
    }

    const projects = await dbGetProjects(session.id);
    return NextResponse.json({ success: true, data: projects, error: null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, data: [], error: { code: "SERVER_ERROR", message } });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, data: null, error: { code: "UNAUTHORIZED", message: "Please sign in to save projects." } });
    }

    const { toolSlug, name, input, output } = await req.json();
    if (!toolSlug || !name) {
      return NextResponse.json({ success: false, data: null, error: { code: "INVALID_INPUT", message: "toolSlug and name are required." } });
    }

    const project = await dbCreateProject(session.id, toolSlug, name, input || "", output || "");
    return NextResponse.json({ success: true, data: project, error: null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, data: null, error: { code: "SERVER_ERROR", message } });
  }
}
