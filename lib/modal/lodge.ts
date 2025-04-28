import { Schema, model, models } from "mongoose";

const LodgeSchema = new Schema(
    {
        title: { type: 'string', required: true },
        user: { type: Schema.Types.ObjectId, ref: "User" }
    },
    {
        timestamps: true
    }
)

const Lodge = models.LodgeSchema || model('Lodge', LodgeSchema);

export default Lodge;