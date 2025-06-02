import { connect } from "@/lib/db";
import Lodge from "@/lib/modal/lodge";
import User from "@/lib/modal/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId');
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid or missing userId' }), { status: 400 })
        }
        await connect();
        const user = await User.findById(userId)
        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'user not found in the database' }), { status: 400 })
        }
        const Lodges = await Lodge.find({ user: new Types.ObjectId(userId) })
        return new NextResponse(JSON.stringify(Lodges), { status: 200 })
    }
    catch (err: any) {
        return new NextResponse('Error in fetching lodges', { status: 500 })
    }
}
export const POST = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify(
                { message: 'Invalid or missing userId' }),
                { status: 400 }
            )
        };

        await connect();

        const user = await User.findById(userId)

        if (!user) {
            return new NextResponse(JSON.stringify(
                { message: 'user not found in the database' }),
                { status: 404 })
        };

        const body = await request.json();
        const newLodge = new Lodge({ ...body, user: new Types.ObjectId(userId) });
        await newLodge.save();
        return new NextResponse(JSON.stringify({ message: 'Lodge added Successfully..', Lodge: newLodge }), { status: 200 })
    }
    catch (err) {
        return new NextResponse('Error in creating lodge', { status: 500 })
    }
}
