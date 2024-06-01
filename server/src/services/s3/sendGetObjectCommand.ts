import s3Client from "@/config/aws/s3"

import { createGetObjectCommand } from "./createGetObjectCommand"

import type { CreateGetObjectCommand } from "./createGetObjectCommand"
import type { GetObjectCommandOutput } from "@aws-sdk/client-s3"

export type createObjectSignedUrl = CreateGetObjectCommand
export async function sendGetObjectCommand({
    bucketName,
    key,
    ...otherMetadata
}: createObjectSignedUrl): Promise<GetObjectCommandOutput> {
    try {
        const command = await createGetObjectCommand({
            bucketName,
            key,
            ...otherMetadata,
        })

        return await s3Client.send(command)
    } catch (error) {
        console.error(`Error sending get object command: ${error}`)
        throw error
    }
}
