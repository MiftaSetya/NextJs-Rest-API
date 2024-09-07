import prisma from "@/app/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

export async function handlerGet() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function handlerGetById({ params }: { params: { id: string } }) {
    const id = parseInt(params.id)

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (user) {
            return NextResponse.json(user)
        } else {
            return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
        }
    } catch (err) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function handlerPost(req: NextRequest) {
    try {
        const body = await req.json();
        const { nama } = body;

        await prisma.user.create({
            data: { nama }
        });
        return NextResponse.json({ message: "Success create user" }, { status: 201 });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function handlerPut(req: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id)

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!existingUser) {
            return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
        }

        const body = await req.json()
        const { nama } = body

        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                nama: nama
            }
        })

        return NextResponse.json({ messaage: "Success edit user" })
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function handlerDelete({ params }: { params: { id: string } }) {
    const id = parseInt(params.id)

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!existingUser) {
            return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
        }

        await prisma.user.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json({ message: "Success delete user" })
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}