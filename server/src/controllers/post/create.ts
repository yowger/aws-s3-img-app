import sharp from "sharp"

import env from "@/config/env"

import PostModel from "@/models/Post"

import { executeUploadImage } from "@/services/s3/executeUploadImage"

import generateRandomKey from "@/utils/generateRandomFileName"
import reduceImageQuality from "@/utils/sharp/reduceImageQuality"
import getImageInfo from "@/utils/sharp/getImageInfo"

import type { Response, Request } from "express"

const create = async (req: Request, res: Response) => {
    const { title, description, author } = req.body
    const file = req.file

    const imageBuffer = await reduceImageQuality(file.buffer)
    const { format, mimeType } = await getImageInfo(imageBuffer)

    const fileName = generateRandomKey(5, format)

    await executeUploadImage({
        bucketName: env.AWS_BUCKET_NAME,
        imageBuffer,
        fileName,
        mimeType: mimeType,
    }).catch((error) => {
        console.log("error uploading file", error)
        return res.status(500).json({ message: "Failed to upload image" })
    })

    const post = new PostModel({
        title,
        description,
        author,
        imageName: fileName,
    })

    await post.save()

    return res.status(201).json(post)
}

export default create
