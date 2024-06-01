import s3Client from "@/config/aws/s3"

import { createDeleteObjectCommand } from "./createDeleteObjectCommand"

import type { CreateGetObjectCommand } from "./createGetObjectCommand"
import type { DeleteObjectCommandOutput } from "@aws-sdk/client-s3"

export type ExecuteDeleteObjectCommand = CreateGetObjectCommand
export async function executeDeleteObjectCommand({
    bucketName,
    key,
    ...otherMetadata
}: ExecuteDeleteObjectCommand): Promise<DeleteObjectCommandOutput> {
    const deleteObjectCommand = await createDeleteObjectCommand({
        bucketName,
        key,
        ...otherMetadata,
    })
    
    try {
        return await s3Client.send(deleteObjectCommand)
    } catch (error) {
        console.error("Error executing delete command:", error)
        throw error
    }
}
