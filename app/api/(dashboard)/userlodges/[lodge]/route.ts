import { connect } from "@/lib/db"
import Lodge from "@/lib/modal/lodge"
import User from "@/lib/modal/user"
import { Types } from "mongoose"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, context: { params: Promise<{ lodge: string }> }) => {
    const { lodge } = await context.params;
    const lodgeId = lodge;
    try {
        const body = await request.json();
        const { title } = body;

        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify('Invalid or missing userId'), { status: 400 }
            )
        }
        if (!lodgeId || !Types.ObjectId.isValid(lodgeId)) {
            return new NextResponse(
                JSON.stringify('Invalid or missing lodgeId'), { status: 400 }
            )
        }

        await connect();

        const user = await User.findById(userId)

        if (!user) {
            return new NextResponse(JSON.stringify(
                'user not found in the database'),
                { status: 404 }
            );
        }

        const lodge = await Lodge.findOne(
            {
                _id: lodgeId,
                user: userId
            });

        if (!lodge) {
            return new NextResponse(JSON.stringify(
                'lodge not found'),
                { status: 404 }
            );
        }
        const updatedLodge = await Lodge.findByIdAndUpdate(
            lodgeId,
            { title },
            { new: true }
        )
        return new NextResponse(JSON.stringify({ message: 'lodge is updated', lodge: updatedLodge }), { status: 200 })
    }
    catch (err: any) {
        return new NextResponse('Error in Updating...' + err.message, {
            status: 500
        })
    }

}

// DELETE
export const DELETE = async (request: Request, context: { params: Promise<{ lodge: string }> }) => {
    const { lodge: lodgeId } = await context.params;
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify('Invalid or missing userId'), { status: 400 }
            )
        }
        if (!lodgeId || !Types.ObjectId.isValid(lodgeId)) {
            return new NextResponse(
                JSON.stringify('Invalid or missing lodgeId'), { status: 400 }
            )
        }
        await connect();

        const user = await User.findById(userId)

        if (!user) {
            return new NextResponse(JSON.stringify(
                'user not found in the database'),
                { status: 404 }
            );
        }

        const lodge = await Lodge.findOne(
            {
                _id: lodgeId,
                user: userId
            });

        if (!lodge) {
            return new NextResponse(JSON.stringify(
                'lodge not found'),
                { status: 404 }
            );
        }

        await Lodge.findOneAndDelete({ _id: lodgeId })
        return new NextResponse(JSON.stringify(
            { message: 'lodge deleted.' }),
            { status: 200 }
        );

    } catch (err) {
        return new NextResponse('Error in deleting', { status: 500 })

    }
}