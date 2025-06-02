import { connect } from "@/lib/db";
import Lodge from "@/lib/modal/lodge";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connect();

        const requestData = await request.json();

        // Validate required fields
        if (!requestData.title || !requestData.location || !requestData.price) {
            return NextResponse.json(
                { error: 'Title, location, and price are required fields' },
                { status: 400 }
            );
        }

        // Create new lodge with auto-generated ID
        const lodgeData = {
            ...requestData,
            user: requestData.user || new Types.ObjectId(), // Provide default user ID if not provided
            rating: requestData.rating || 0,
            reviewCount: requestData.reviewCount || 0,
            images: requestData.images || [],
            amenities: requestData.amenities || [],
            unavailableAmenities: requestData.unavailableAmenities || [],
            bedrooms: requestData.bedrooms || 1,
            beds: requestData.beds || 1,
            bathrooms: requestData.bathrooms || 1,
            host: requestData.host || {
                name: "Unknown Host",
                avatar: "",
                isSuperhost: false,
                joinDate: new Date().toISOString(),
                responseRate: 0,
                hostingSince: new Date().toISOString(),
                reviewCount: 0,
                averageRating: 0
            },
            reviews: requestData.reviews || [],
            sleepingArrangement: requestData.sleepingArrangement || {
                bedrooms: [{ type: "Default bedroom", count: 1 }]
            },
            highlights: requestData.highlights || []
        };

        console.log('Creating lodge with data:', JSON.stringify(lodgeData, null, 2));

        // Try using insertOne directly to bypass Mongoose validation
        const db = await connect();
        if (!db.connection.db) {
            throw new Error('Database connection failed');
        }
        const collection = db.connection.db.collection('lodges');

        const result = await collection.insertOne(lodgeData);

        console.log('Insert result:', result);

        // Fetch the inserted document
        const insertedLodge = await collection.findOne({ _id: result.insertedId });

        console.log('Inserted lodge:', JSON.stringify(insertedLodge, null, 2));

        return NextResponse.json(insertedLodge, { status: 201 });

    } catch (error) {
        console.error('Error creating lodge:', error);
        return NextResponse.json(
            { error: 'Failed to create lodge' },
            { status: 500 }
        );
    }
}