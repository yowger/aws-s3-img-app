import sharp from "sharp"

import PostModel from "@/models/Post"

import { uploadSingleImage } from "@/services/s3/uploadSingleImage"

import type { Response, Request } from "express"

const create = async (req: Request, res: Response) => {
    const { title, content, author } = req.body
    const file = req.file

    if (!title || !content || !author) {
        return res
            .status(400)
            .json({ message: "Title, content, and author are required" })
    }

    const fileBuffer = await sharp(file.buffer)
        .resize(400)
        .jpeg({ quality: 75 })
        .toBuffer()

    await uploadSingleImage({
        fileBuffer,
        // todo - change to randomize name or or shorten name + date later
        fileName: file.originalname,
        mimetype: file.mimetype,
    })

    const post = new PostModel({
        title,
        content,
        author,
        image: file.originalname,
    })

    await post.save()

    return res.status(201).json(post)
}

export default create
