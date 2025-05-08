import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { connect } from '@/lib/db';
import User from '@/lib/modal/user';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return new NextResponse(
                JSON.stringify({ message: 'Not authenticated' }),
                { status: 401 }
            );
        }

        // Verify the token
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || ''
        );
        const { payload } = await jwtVerify(token, secret);

        await connect();
        const user = await User.findById(payload.userId);

        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: 'User not found' }),
                { status: 404 }
            );
        }

        return new NextResponse(
            JSON.stringify({
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username
                }
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in /api/auth/me:', error);
        return new NextResponse(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
} 