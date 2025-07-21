import { Schema, model, models, Document, Types } from "mongoose";

export interface INotification extends Document {
    user: Types.ObjectId;
    type: "NEW_BOOKING" | "NEW_MESSAGE" | "REVIEW_RECEIVED";
    message: string;
    read: boolean;
    link?: string;
}

const NotificationSchema = new Schema<INotification>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        type: {
            type: String,
            enum: ["NEW_BOOKING", "NEW_MESSAGE", "REVIEW_RECEIVED"],
            required: true,
        },
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
        link: { type: String },
    },
    {
        timestamps: true,
    }
);

const Notification = models.Notification || model<INotification>("Notification", NotificationSchema);

export default Notification; 