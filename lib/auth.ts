import { connect } from "@/lib/db";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import UserModal from "@/lib/modal/user";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(token, secret);

        await connect();
        const user = await UserModal.findById(payload.userId);

        if (!user) return null;
        return user;
    } catch (err) {
        console.error("Auth error:", err);
        return null;
    }
} 