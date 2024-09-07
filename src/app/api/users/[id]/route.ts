import { handlerDelete, handlerGetById, handlerPut } from "@/app/handlers/userHandler";
import { NextRequest } from "next/server";

type Params = {
    id: string
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    return await handlerGetById({ params })
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    return await handlerPut(req, { params })
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    return await handlerDelete({ params })
}