import s3Client from "@/config/aws/s3"

import { createPutObjectCommand } from "./createPutObjectCommand"

import type { CreatePutObjectCommand } from "./createPutObjectCommand"

type ExecuteUploadImage = {
    bucketName: string
    fileName: string
    imageBuffer: Buffer
    mimeType: string
} & Omit<CreatePutObjectCommand, "key" | "body" | "contentType">
export async function executeUploadImage({
    bucketName,
    imageBuffer,
    fileName,
    mimeType,
    ...otherMetadata
}: ExecuteUploadImage): Promise<void> {
    const uploadImageCommand = await createPutObjectCommand({
        bucketName,
        key: fileName,
        body: imageBuffer,
        contentType: mimeType,
        ...otherMetadata,
    })

    try {
        await s3Client.send(uploadImageCommand)
    } catch (error) {
        console.error(`Error uploading image: ${error}`)
        throw error
    }
}
