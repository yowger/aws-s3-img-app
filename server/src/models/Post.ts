import { model, Schema } from "mongoose"

import type { Types } from "mongoose"

export interface Post {
    _id: Types.ObjectId
    title: string
    description: string
    image: string
    createdAt?: Date
    updatedAt?: Date
}

const schema = new Schema<Post>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now,
    },
    updatedAt: {
        type: Schema.Types.Date,
        default: Date.now,
    },
})

const PostModel = model<Post>("Post", schema)

export default PostModel
