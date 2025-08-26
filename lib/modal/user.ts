import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        host: { type: Boolean, required: true },
        role: {
            type: String,
            enum: ["User", "Host", "Owner"],
            default: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = models.User || model('User', UserSchema);

export default User;