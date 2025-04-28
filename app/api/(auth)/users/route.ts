import { connect } from "@/lib/db";
import User from "@/lib/modal/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server"


const ObjectId = require('mongoose').Types.ObjectId;

export const GET = async () => {
    try {
        await connect();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (err: any) {
        return new NextResponse('Error in GET data, ' + err.message, { status: 500 });
    }
}

//ADDING A NEW USER
export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        await connect();
        const newUser = new User(body);
        await newUser.save();
        return new NextResponse(JSON.stringify({ message: 'new user is created', user: newUser }), { status: 200 })
    }
    catch (err: any) {
        return new NextResponse('Error in creating user ' + err.message, { status: 500 })
    }
}

//UPDATING USER INFO
export const PATCH = async (request: Request) => {
    try {
        const body = await request.json();
        const { userId, newUsername } = body;
        await connect();
        if (!userId || !newUsername) {
            return new NextResponse(JSON.stringify({ message: 'Id or Username not found' }), { status: 400 })
        }
        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: 'Id is invalid' }), { status: 400 })
        }

        const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { username: newUsername }, { new: true })
        if (!updatedUser) {
            return new NextResponse(JSON.stringify({ message: 'user not found in database' }), { status: 400 })
        }
        return new NextResponse(JSON.stringify({ message: 'user is updated..', user: updatedUser }), { status: 200 })
    } catch (err: any) {
        return new NextResponse('Error in updating... : ' + err.message, { status: 500 })
    }
}

//DELETING USER
export const DELETE = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId')
        if (!userId) {
            return new NextResponse(JSON.stringify({ message: 'Id not found' }), { status: 400 })
        };
        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: 'Id is invalid' }), { status: 400 })
        }
        await connect();
        const deleteUser = await User.findByIdAndDelete({ _id: userId })
        if (!deleteUser) {
            return new NextResponse(JSON.stringify({ message: 'user not found in database' }), { status: 400 })
        }
        return new NextResponse(JSON.stringify('user is deleted'), { status: 200 })
    }
    catch (err: any) {
        return new NextResponse('Error in deleting... :' + err.message, { status: 400 })
    }
}