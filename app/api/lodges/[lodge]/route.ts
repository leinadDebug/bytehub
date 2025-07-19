// app/api/lodges/[lodge]/route.ts
import { connect } from '@/lib/db';
import Lodge from '@/lib/modal/lodge';
import { Types } from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ lodge: string }> }) {
    try {
        const { lodge } = await params;

        if (!Types.ObjectId.isValid(lodge)) {
            console.log(lodge)
            return NextResponse.json(
                { message: 'Invalid lodge ID format' },
                { status: 400 }
            );
        }
        await connect();
        const foundlodge = await Lodge.findById({ _id: lodge }).lean();

        if (!foundlodge) {
            return NextResponse.json({ error: 'Lodge not found' }, { status: 404 });
        }

        return NextResponse.json(foundlodge);
        // return <LodgeDetailsClient lodge={{ ...lodge, _id: lodge._id.toString() }} />;
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch lodge' },
            { status: 500 }
        );
    }
}
