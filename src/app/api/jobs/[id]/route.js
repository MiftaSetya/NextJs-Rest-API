import { handlerDelete, handlerGetById, handlerPut } from "@/app/handlers/jobHandler"

export async function GET(req, { params }) {
    return await handlerGetById(params)
}

export async function PUT(req, { params }) {
    return await handlerPut(req, params)
}

export async function DELETE(req, { params }) {
    return await handlerDelete(params)
}