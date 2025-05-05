import { connect } from "@/lib/db";
import Blog from "@/lib/modal/blogs";
import Lodge from "@/lib/modal/lodge";
import User from "@/lib/modal/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request, context: { params: any }) => {
    const blogId = context.params.blog;
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId');
        const lodgeId = searchParams.get('lodgeId');

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid or missing userId' }), { status: 400 })
        };
        if (!lodgeId || !Types.ObjectId.isValid(lodgeId)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid or missing lodgeId' }), { status: 400 })
        };
        if (!blogId || !Types.ObjectId.isValid(lodgeId)) {
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

        const blog = await Blog.findOne({
            _id: blogId,
            user: userId,
            lodge: lodgeId
        });

        if (!blog) {
            return new NextResponse(JSON.stringify(
                { message: 'blog not found' }),
                { status: 404 }
            );
        }
        return new NextResponse(JSON.stringify({ blog }), { status: 200 })
    }
    catch (err: any) {
        return new NextResponse('Error in fetching a blog ' + err.message, { status: 500 })
    }
}

export const POST = async (request: Request, context: { params: any }) => {
    const blogId = context.params.blog;
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId');
        const lodgeId = searchParams.get('lodgeId');
        const body = await request.json();
        const { title, content } = body

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid or missing userId' }), { status: 400 })
        };
        if (!lodgeId || !Types.ObjectId.isValid(lodgeId)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid or missing lodgeId' }), { status: 400 })
        };
        if (!blogId || !Types.ObjectId.isValid(lodgeId)) {
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

        const blog = await Blog.findOne({ _id: blogId, user: userId })

        if (!blog) {
            return new NextResponse(JSON.stringify(
                { message: 'blog not found' }),
                { status: 404 }
            );
        }

        const updateblog = await Blog.findByIdAndUpdate(
            blogId,
            { title, content },
            { new: true },
        );

        return new NextResponse(JSON.stringify({ updateblog }), { status: 200 })
    }
    catch (err: any) {
        return new NextResponse('Error in fetching a blog ' + err.message, { status: 500 })
    }
}

export const DELETE = async (request: Request, context: { params: any }) => {
    try {
        const blogId = context.params.blog;
        try {
            const { searchParams } = new URL(request.url)
            const userId = searchParams.get('userId');
            const lodgeId = searchParams.get('lodgeId');

            if (!userId || !Types.ObjectId.isValid(userId)) {
                return new NextResponse(JSON.stringify({ message: 'Invalid or missing userId' }), { status: 400 })
            };
            if (!lodgeId || !Types.ObjectId.isValid(lodgeId)) {
                return new NextResponse(JSON.stringify({ message: 'Invalid or missing lodgeId' }), { status: 400 })
            };
            if (!blogId || !Types.ObjectId.isValid(lodgeId)) {
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

            const blog = await Blog.findOne({
                _id: blogId,
                user: userId,
                lodge: lodgeId
            });

            if (!blog) {
                return new NextResponse(JSON.stringify(
                    { message: 'blog not found' }),
                    { status: 404 }
                );
            }
            await Blog.findByIdAndDelete(blogId)

            return new NextResponse(JSON.stringify({ message: 'Blog successfully deleted' }), { status: 200 })
        }
        catch (err: any) {
            return new NextResponse('Error in fetching a blog ' + err.message, { status: 500 })
        }
    } catch (err) {

    }
}