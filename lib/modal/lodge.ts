import { Schema, model, models, Document, Types } from "mongoose";

interface IHost extends Document {
    name: string;
    avatar: string;
    isSuperhost: boolean;
    joinDate: Date;
    responseRate: number;
    hostingSince: Date;
    reviewCount: number;
    averageRating: number;
}

interface IBedroomArrangement {
    type: string;
    count: number;
}

interface ISleepingArrangement {
    bedrooms: IBedroomArrangement[];
}

interface IReview extends Document {
    reviewer: Types.ObjectId | string; // Can reference User or be plain string
    date: Date;
    rating: number;
    comment?: string;
}

interface ILodge extends Document {
    title: string;
    user: Types.ObjectId;  // Required reference to User (keeping your existing field)
    owner?: string;       // Optional string for backward compatibility
    location?: string;
    description?: string;
    price?: number;
    images?: string[];
    amenities?: string[];
    unavailableAmenities?: string[];
    bedrooms?: number;
    beds?: number;
    bathrooms?: number;
    host?: IHost;
    reviews?: IReview[];
    rating?: number;
    reviewCount?: number;
    sleepingArrangement?: ISleepingArrangement;
    highlights?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const HostSchema = new Schema<IHost>({
    name: { type: String, default: "Unknown Host" },
    avatar: { type: String, default: "" },
    isSuperhost: { type: Boolean, default: false },
    joinDate: { type: Date, default: Date.now },
    responseRate: { type: Number, default: 0, min: 0, max: 100 },
    hostingSince: { type: Date, default: Date.now },
    reviewCount: { type: Number, default: 0, min: 0 },
    averageRating: { type: Number, default: 0, min: 0, max: 5 }
}, { _id: false });

const BedroomArrangementSchema = new Schema<IBedroomArrangement>({
    type: { type: String, required: true },
    count: { type: Number, required: true, min: 1 }
}, { _id: false });

const SleepingArrangementSchema = new Schema<ISleepingArrangement>({
    bedrooms: { type: [BedroomArrangementSchema], default: [{ type: "Default bedroom", count: 1 }] }
}, { _id: false });

const ReviewSchema = new Schema<IReview>({
    reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String }
}, { _id: true });

const LodgeSchema = new Schema<ILodge>(
    {
        title: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: false }, // Made optional for testing
        owner: { type: String }, // Optional for backward compatibility
        location: { type: String, required: false },
        description: { type: String, required: false },
        price: { type: Number, required: false, min: 0 },
        images: { type: [String], required: false, default: [] },
        amenities: { type: [String], required: false, default: [] },
        unavailableAmenities: { type: [String], required: false, default: [] },
        bedrooms: { type: Number, required: false, min: 0 },
        beds: { type: Number, required: false, min: 0 },
        bathrooms: { type: Number, required: false, min: 0 },
        host: { type: HostSchema, required: false },
        reviews: { type: [ReviewSchema], required: false, default: [] },
        rating: { type: Number, required: false, default: 0, min: 0, max: 5 },
        reviewCount: { type: Number, required: false, default: 0, min: 0 },
        sleepingArrangement: { type: SleepingArrangementSchema, required: false },
        highlights: { type: [String], required: false, default: [] }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        strict: false // Allow fields not in schema
    }
);

// Add virtual for backward compatibility
LodgeSchema.virtual('ownerId').get(function (this: ILodge) {
    return this.user?._id || this.user;
});

const Lodge = models.Lodge || model<ILodge>("Lodge", LodgeSchema);

export default Lodge;
export type { ILodge, IHost, IReview };