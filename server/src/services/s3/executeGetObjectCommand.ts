import s3Client from "@/config/aws/s3"

import { createGetObjectCommand } from "./createGetObjectCommand"

import type { CreateGetObjectCommand } from "./createGetObjectCommand"
import type { GetObjectCommandOutput } from "@aws-sdk/client-s3"

export type ExecuteGetObjectCommand = CreateGetObjectCommand
export async function executeGetObjectCommand({
    bucketName,
    key,
    ...otherMetadata
}: ExecuteGetObjectCommand): Promise<GetObjectCommandOutput> {
    const getObjectCommand = await createGetObjectCommand({
        bucketName,
        key,
        ...otherMetadata,
    })

    try {
        return await s3Client.send(getObjectCommand)
    } catch (error) {
        console.error(`Error executing get command: ${error}`)
        throw error
    }
}
