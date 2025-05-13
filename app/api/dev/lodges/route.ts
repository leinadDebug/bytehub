import { connect } from "@/lib/db";
import Lodge from "@/lib/modal/lodge"
import { NextRequest, NextResponse } from "next/server";

//Fetch all lodges
export const GET = async (req: Request) => {
    try {
        await connect();
        const lodgesData = await Lodge.find();
        if (!lodgesData || lodgesData.length === 0) {
            return new NextResponse(JSON.stringify({ message: 'No available Lodges' }), { status: 400 })
        }
        return new NextResponse(JSON.stringify(lodgesData))
    } catch (err) {
        return new NextResponse('Error in fetching lodges', { status: 500 })
    }
}

//Add a lodge
export const POST = async (req: Request) => {
    try {
        await connect();
        const data = req.json();
        if (!data) {
            return new NextResponse(JSON.stringify({ message: 'Data is missing' }), { status: 400 })
        }

    } catch (err) {

    }
}

