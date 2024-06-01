import env from "@/config/env"

import PostModel from "@/models/Post"

import { createObjectSignedUrl } from "@/services/s3/createObjectSignedUrl"

import type { Response, Request } from "express"

const read = async (req: Request, res: Response) => {
    const { postId } = req.params

    const post = await PostModel.findById(postId)
        .select("_id title imageName description createdAt")
        .lean()
        .exec()

    if (!post) {
        return res.status(404).json({ message: "Post not found" })
    }

    const signedImageUrl = await createObjectSignedUrl({
        bucketName: env.AWS_BUCKET_NAME,
        key: post.imageName,
    })

    const postWithSignedUrls = { ...post, signedImageUrl }

    return res.status(200).json(postWithSignedUrls)
}

export default read
