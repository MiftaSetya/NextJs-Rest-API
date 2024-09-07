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

        if (job) {
            return NextResponse.json(job)
        } else {
            return NextResponse.json({ message: "Job not found" }, { status: 404 })
        }
    } catch (err) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function handlerPost(req = NextRequest) {
    try {
        const body = await req.json()
        const { nama } = body

        await prisma.job.create({
            data: { nama }
        })

        return NextResponse.json({ message: "Success create job" })
    } catch (err) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function handlerPut(req = NextRequest, params) {
    const id = parseInt(params.id)

    try {
        const existingJob = await prisma.job.findUnique({
            where: {
                id: id
            }
        })

        if (!existingJob) {
            return NextResponse.json({ message: 'Job Not Found' }, { status: 404 });
        }

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

        return NextResponse.json({ message: "Success edit job" })
    } catch (err) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function handlerDelete(params) {
    const id = parseInt(params.id)

    try {
        const existingJob = await prisma.job.findUnique({
            where: {
                id: id
            }
        })

        if (!existingJob) {
            return NextResponse.json({ message: 'Job Not Found' }, { status: 404 });
        }

        await prisma.job.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json({ message: "Success delete job" })
    } catch (err) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}