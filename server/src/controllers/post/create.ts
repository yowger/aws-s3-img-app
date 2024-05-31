import sharp from "sharp"

import env from "@/config/env"

import PostModel from "@/models/Post"

import { uploadSingleImage } from "@/services/s3/uploadSingleImage"

import type { Response, Request } from "express"

const create = async (req: Request, res: Response) => {
    const { title, description, author } = req.body
    const file = req.file

    if (!title || !description || !author) {
        return res
            .status(400)
            .json({ message: "Title, content, and author are required" })
    }

    const fileBuffer = await sharp(file.buffer)
        .resize(400)
        .jpeg({ quality: 75 })
        .toBuffer()

    await uploadSingleImage({
        bucketName: env.AWS_BUCKET_NAME,
        fileBuffer,
        fileName: file.originalname,
        mimeType: file.mimetype,
    }).catch((error) => {
        console.log("error uploading file", error)
        return res.status(500).json({ message: "Failed to upload image" })
    })

    const post = new PostModel({
        title,
        description,
        author,
        image: file.originalname,
    })

    await post.save()

    return res.status(201).json(post)
}

export default create
