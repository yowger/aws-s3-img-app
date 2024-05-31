import env from "@/config/env"

import PostModel from "@/models/Post"

import { getObjectSignedUrl } from "@/services/s3/getObjectSignedUrl"

import type { Response, Request } from "express"

const paginatedList = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query

    const pageNumber = parseInt(page as string, 10)
    const limitNumber = parseInt(limit as string, 10)
    const skip = (pageNumber - 1) * limitNumber

    const posts = await PostModel.find()
        .select("_id title image description createdAt")
        .skip(skip)
        .limit(limitNumber)
        .exec()
    for (let post of posts) {
        post.image = await getObjectSignedUrl({
            bucketName: env.AWS_BUCKET_NAME,
            key: post.image,
        })
    }
    const totalPosts = await PostModel.countDocuments().exec()
    const totalPages = Math.ceil(totalPosts / limitNumber)

    return res.status(200).json({
        posts,
        currentPage: pageNumber,
        totalPages,
        totalPosts,
    })
}

export default paginatedList