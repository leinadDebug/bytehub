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

    // Create new lodge with Mongoose model for validation
    const lodge = new Lodge({
      ...requestData,
      user: requestData.user || new Types.ObjectId(),
      rating: requestData.rating || 0,
      reviewCount: requestData.reviewCount || 0,
      unavailableAmenities: requestData.unavailableAmenities || [],
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
        bedrooms: [{ type: "Default bedroom", count: requestData.bedrooms || 1 }]
      },
      highlights: requestData.highlights || []
    });

    // Save using Mongoose
    const savedLodge = await lodge.save();

    // Ensure proper serialization by converting to JSON and back
    const lodgeData = savedLodge.toJSON();

    // Add some debugging to ensure the data is properly formatted
    console.log('Created lodge data:', JSON.stringify(lodgeData, null, 2));

    return NextResponse.json(lodgeData, { status: 201 });

  } catch (error: any) {
    console.error('Error creating lodge:', error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to create lodge' },
      { status: 500 }
    );
  }
}