import s3Client from "@/config/aws/s3"

import { createPutObjectCommand } from "./createPutObjectCommand"

import type { CreatePutObjectCommand } from "./createPutObjectCommand"
import type { GetObjectCommandOutput } from "@aws-sdk/client-s3"

export type ExecutePutObjectCommand = CreatePutObjectCommand
export async function executeGetObjectCommand({
    bucketName,
    key,
    body,
    contentType,
    ...otherMetadata
}: ExecutePutObjectCommand) {
    const putObjectCommand = await createPutObjectCommand({
        bucketName,
        key,
        body,
        contentType,
        ...otherMetadata,
    })

    try {
        return await s3Client.send(putObjectCommand)
    } catch (error) {
        console.error(`Error executing get command: ${error}`)
        throw error
    }
}
