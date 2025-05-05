import { connect } from "@/lib/db";
import Blog from "@/lib/modal/blogs";
import Lodge from "@/lib/modal/lodge";
import User from "@/lib/modal/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId');
        const lodgeId = searchParams.get('lodgeId');
        const searchKeywords = searchParams.get('keywords');

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid or missing userId' }), { status: 400 })
        };
        if (!lodgeId || !Types.ObjectId.isValid(lodgeId)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid or missing lodgeId' }), { status: 400 })
        };

        await connect();
        const user = await User.findById(userId)

        if (!user) {
            return new NextResponse(JSON.stringify(
                { message: 'user not found in the database' }),
                { status: 404 }
            );
        }

        const lodge = await Lodge.findById(lodgeId);

        if (!lodge) {
            return new NextResponse(JSON.stringify(
                { message: 'lodge not found' }),
                { status: 404 }
            );
        }

        const filter: any = {
            user: new Types.ObjectId(userId),
            lodge: new Types.ObjectId(lodgeId)
        }

        if (searchKeywords) {
            filter.$or = [
                {
                    title: { $regex: searchKeywords, $options: 'i' }
                },
                {
                    content: { $regex: searchKeywords, $options: 'i' }
                }
            ]
        }

        const blogs = await Blog.find(filter);
        return new NextResponse(JSON.stringify({ blogs }), { status: 200 })
    }
    catch (err: any) {
        return new NextResponse(
            JSON.stringify({ message: 'Error in fetching blogs', error: err.message }),
            { status: 500 }
        );
    }
}

export const POST = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId');
        const lodgeId = searchParams.get('lodgeId');
        const body = await request.json();

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid or missing userId' }), { status: 400 })
        };
        if (!lodgeId || !Types.ObjectId.isValid(lodgeId)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid or missing lodgeId' }), { status: 400 })
        };

        await connect();
        const user = await User.findById(userId)

        if (!user) {
            return new NextResponse(JSON.stringify(
                { message: 'user not found in the database' }),
                { status: 404 }
            );
        }

        const lodge = await Lodge.findById(lodgeId);

        if (!lodge) {
            return new NextResponse(JSON.stringify(
                { message: 'lodge not found' }),
                { status: 404 }
            );
        }
        const newBlog = new Blog(
            {
                ...body,
                user: new Types.ObjectId(userId),
                lodge: new Types.ObjectId(lodgeId)
            })

        await newBlog.save();
        return new NextResponse(JSON.stringify({ message: 'New Blog created' }), { status: 200 })
    }
    catch (err: any) {
        return new NextResponse('Error in creating lodge' + err.message, { status: 500 })
    }
}