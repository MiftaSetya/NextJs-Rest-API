import { handlerGet, handlerPost } from "@/app/handlers/userHandler";
import { NextRequest } from "next/server";

export async function GET() {
    return await handlerGet();
}

export async function POST(req: NextRequest) {
    return await handlerPost(req);
}