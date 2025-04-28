import { connect } from "@/lib/db";
import User from "@/lib/modal/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server"

export const GET = () => {
    return new NextResponse('This is the lodge page')
    console.log('This is the lodge page')
}