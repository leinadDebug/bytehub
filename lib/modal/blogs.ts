import { model, models, Schema } from "mongoose";

const BlogSchema = new Schema(
    {
        title: { type: 'string', required: true },
        content: { type: 'string', required: true },
        user: { type: Schema.Types.ObjectId, ref: 'user' },
        lodge: { type: Schema.Types.ObjectId, ref: 'lodge' },
    },
    {
        timestamps: true
    }
)

const Blog = models.BlogSchema || model('Blog', BlogSchema);

export default Blog;