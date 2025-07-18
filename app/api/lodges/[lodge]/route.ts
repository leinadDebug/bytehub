import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import Lodge from "@/lib/modal/lodge";

// GET a single lodge by _id
export async function GET(req: NextRequest, context: { params: { lodge: string } }) {
    await connect();
    const { lodge } = context.params;
    try {
        const lodgeData = await Lodge.findById(lodge).lean();
        if (!lodgeData) {
            return NextResponse.json({ error: "Lodge not found" }, { status: 404 });
        }
        return NextResponse.json(lodgeData);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch lodge" }, { status: 500 });
    }
}

// PATCH update a lodge by _id
export async function PATCH(req: NextRequest, context: { params: { lodge: string } }) {
    await connect();
    const { lodge } = context.params;
    try {
        const body = await req.json();
        const updatedLodge = await Lodge.findByIdAndUpdate(lodge, body, { new: true });
        if (!updatedLodge) {
            return NextResponse.json({ error: "Lodge not found" }, { status: 404 });
        }
        return NextResponse.json(updatedLodge);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update lodge" }, { status: 500 });
    }
}

// DELETE a lodge by _id
export async function DELETE(req: NextRequest, context: { params: { lodge: string } }) {
    await connect();
    const { lodge } = context.params;
    try {
        const deletedLodge = await Lodge.findByIdAndDelete(lodge);
        if (!deletedLodge) {
            return NextResponse.json({ error: "Lodge not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Lodge deleted." });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete lodge" }, { status: 500 });
    }
} 