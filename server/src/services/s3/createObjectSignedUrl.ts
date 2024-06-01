import s3Client from "@/config/aws/s3"

import { createGetObjectCommand } from "./createGetObjectCommand"

import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import type { CreateGetObjectCommand } from "./createGetObjectCommand"

export type CreateObjectSignedUrl = {
    expiresInSeconds?: number
} & CreateGetObjectCommand
export async function createObjectSignedUrl({
    bucketName,
    key,
    expiresInSeconds = 60,
    ...otherMetadata
}: CreateObjectSignedUrl): Promise<string> {
    const getObjectCommand = await createGetObjectCommand({
        bucketName,
        key,
        ...otherMetadata,
    })

    try {
        return await getSignedUrl(s3Client, getObjectCommand, {
            expiresIn: expiresInSeconds,
        })
    } catch (error) {
        console.error(`Error creating signed url: ${error}`)
        return null
    }
}
