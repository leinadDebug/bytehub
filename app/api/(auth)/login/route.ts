import { connect } from "@/lib/db";
import User from "@/lib/modal/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return new NextResponse(
                JSON.stringify({ message: "Email and password are required" }),
                { status: 400 }
            );
        }

        await connect();

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid credentials" }),
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid Password" }),
                { status: 401 }
            );
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET || "",
            { expiresIn: "24h" }
        );

        const cookie = serialize('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours in seconds
            path: '/'
        });

        // Return user data and token
        return new NextResponse(
            JSON.stringify({
                message: "Login successful",
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username
                }
            }),
            {
                status: 200,
                headers: {
                    'Set-Cookie': cookie
                }
            }
        );

    } catch (error: any) {
        console.error("Login error:", error);
        return new NextResponse(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500 }
        );
    }
}