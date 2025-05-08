import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        const cookieStore = await cookies();
        cookieStore.set('auth_token', '', {
            expires: new Date(0),
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })
        return new NextResponse(
            JSON.stringify({ message: 'Logged out successfully' }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error('Error in /api/auth/logout:', error);
        return new NextResponse(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
}