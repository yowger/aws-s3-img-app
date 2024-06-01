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
    try {
        const command = await createGetObjectCommand({
            bucketName,
            key,
            ...otherMetadata,
        })
        return await getSignedUrl(s3Client, command, {
            expiresIn: expiresInSeconds,
        })
    } catch (error) {
        console.error(`Error creating signed url: ${error}`)
        throw error
    }
}
