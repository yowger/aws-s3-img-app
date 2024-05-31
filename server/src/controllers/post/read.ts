import env from "@/config/env"

import PostModel from "@/models/Post"

import { getObjectSignedUrl } from "@/services/s3/getObjectSignedUrl"

import type { Response, Request } from "express"

const read = async (req: Request, res: Response) => {
    const { postId } = req.params

    const post = await PostModel.findById(postId)
        .select("_id title image description createdAt")
        .exec()

    if (!post) {
        return res.status(404).json({ message: "Post not found" })
    }

    post.image = await getObjectSignedUrl({
        bucketName: env.AWS_BUCKET_NAME,
        key: post.image,
    })

    return res.status(200).json(post)
}

export default read
