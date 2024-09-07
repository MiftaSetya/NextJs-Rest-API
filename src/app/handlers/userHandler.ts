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
        return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
    }
}

export async function handlerGetById({params}: {params: {id: string}}) {
    const id = parseInt(params.id)

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return NextResponse.json(user)
    } catch (err) {
        return NextResponse.json({ message: 'User Not Found' }, { status: 500 });
    }
}

export async function handlerPost(req: NextRequest) {
    try {
        const body = await req.json();
        const { nama } = body;

        const newUser = await prisma.user.create({
            data: { nama }
        });
        return NextResponse.json(newUser, { status: 201 });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
    }
}

export async function handlerPut(req: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id)

    try {
        const body = await req.json()
        const { nama } = body

        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                nama: nama
            }
        })
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ message: 'User Not Found' }, { status: 500 });
    }
}

export async function handlerDelete(req: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id)

    try {
        await prisma.user.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({message: "Delete user successfull"})
    } catch (error) {
        return NextResponse.json({ message: 'User Not Found' }, { status: 500 });
    }
}