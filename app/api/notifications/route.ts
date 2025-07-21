import { connect } from "@/lib/db";
import Notification from "@/lib/modal/notification";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connect();
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "You must be logged in to view notifications." },
                { status: 401 }
            );
        }

        const notifications = await Notification.find({ user: user._id })
            .sort({ createdAt: -1 })
            .limit(10);

        return NextResponse.json(notifications);
    } catch (error) {
        console.error("Failed to fetch notifications:", error);
        return NextResponse.json(
            { error: "Failed to fetch notifications." },
            { status: 500 }
        );
    }
} 