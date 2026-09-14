import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { dbGetProjects, dbCreateProject } from "@/lib/db/store";
import { ProjectSchema } from "@/lib/validation/schemas";
import { getToolBySlug } from "@/lib/tools/registry";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, data: [], error: { code: "UNAUTHORIZED", message: "Not logged in" } }, { status: 401 });
    }

    const projects = await dbGetProjects(session.id);
    return NextResponse.json({ success: true, data: projects, error: null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, data: [], error: { code: "SERVER_ERROR", message } }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, data: null, error: { code: "UNAUTHORIZED", message: "Please sign in to save projects." } }, { status: 401 });
    }

    const body = await req.json();
    const parseResult = ProjectSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          data: null, 
          error: { 
            code: "INVALID_INPUT", 
            message: parseResult.error.issues[0]?.message || "Invalid input payload." 
          } 
        },
        { status: 400 }
      );
    }

    const { toolSlug, name, input, output } = parseResult.data;

    // Tool slug validation
    const validTool = getToolBySlug(toolSlug);
    if (!validTool) {
      return NextResponse.json(
        { success: false, data: null, error: { code: "INVALID_TOOL", message: "Invalid tool requested." } },
        { status: 400 }
      );
    }

    const project = await dbCreateProject(session.id, toolSlug, name, input, output);
    return NextResponse.json({ success: true, data: project, error: null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, data: null, error: { code: "SERVER_ERROR", message } }, { status: 500 });
  }
}
