import prisma from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function handlerGet() {
    try {
        const jobs = await prisma.job.findMany()
        return NextResponse.json(jobs)
    } catch (err) {
        return NextResponse.json(err.message, { status: 500 })
    }
}

export async function handlerGetById(params) {
    const id = parseInt(params.id)
    try {
        const job = await prisma.job.findUnique({
            where: { id: id }
        })

        return NextResponse.json(job)
    } catch (err) {
        return NextResponse.json(err.message, { status: 500 })
    }
}

export async function handlerPost(req = NextRequest) {
    try {
        const body = await req.json()
        const { nama } = body

        const newJob = await prisma.job.create({
            data: { nama }
        })

        return NextResponse.json(newJob)
    } catch (err) {
        return NextResponse.json(err.message, { status: 500 })
    }
}

export async function handlerPut(req = NextRequest, params) {
    const id = parseInt(params.id)

    try {
        const body = await req.json()
        const { nama } = body

        await prisma.job.update({
            where: {
                id: id
            },
            data: {
                nama: nama
            }
        })

        return NextResponse.json({ message: "Update job successfully" })
    } catch (err) {
        return NextResponse.json(err.message, { status: 500 })
    }
}

export async function handlerDelete(params) {
    const id = parseInt(params.id)

    try {
        await prisma.job.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json({ message: "Delete job successfully" })
    } catch (err) {
        return NextResponse.json(err.message, { status: 500 })
    }
}