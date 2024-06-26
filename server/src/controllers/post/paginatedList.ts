import env from "@/config/env"

import PostModel from "@/models/Post"

import { createObjectSignedUrl } from "@/services/s3/createObjectSignedUrl"

import type { Response, Request } from "express"

const paginatedList = async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        sort = "createdAt",
        order = "desc",
    } = req.query

    const pageNumber = parseInt(page as string, 10)
    const limitNumber = parseInt(limit as string, 10)
    const skip = (pageNumber - 1) * limitNumber
    const sortField = sort as string
    const sortOrder = order === "asc" ? 1 : -1

    const posts = await PostModel.find()
        .select("_id title imageName description createdAt")
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limitNumber)
        .lean()
        .exec()

    const postsWithSignedUrls = await Promise.all(
        posts.map(async (post) => {
            const signedImageUrl = await createObjectSignedUrl({
                bucketName: env.AWS_BUCKET_NAME,
                key: post.imageName,
            })

            return { ...post, signedImageUrl }
        })
    )

    const totalPosts = await PostModel.countDocuments().exec()
    const totalPages = Math.ceil(totalPosts / limitNumber)

    return res.status(200).json({
        posts: postsWithSignedUrls,
        currentPage: pageNumber,
        totalPages,
        totalPosts,
    })
}

export default paginatedList
