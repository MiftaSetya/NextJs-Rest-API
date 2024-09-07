import { NextRequest } from "next/server";
import { handlerGet, handlerPost } from "../../handlers/jobHandler";

export async function GET() {
    return await handlerGet()
}

export async function POST(req = NextRequest) {
    return await handlerPost(req)
}