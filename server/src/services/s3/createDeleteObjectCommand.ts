import { DeleteObjectCommand } from "@aws-sdk/client-s3"

import type { DeleteObjectCommandInput } from "@aws-sdk/client-s3"

type CreateDeleteObjectCommand = {
    bucketName: string
    key: string
} & Omit<DeleteObjectCommandInput, "Bucket" | "Key">
export async function createDeleteObjectCommand({
    bucketName,
    key,
    ...otherMetadata
}: CreateDeleteObjectCommand) {
    const deleteCommandInput: DeleteObjectCommandInput = {
        Bucket: bucketName,
        Key: key,
        ...otherMetadata,
    }

    try {
        return new DeleteObjectCommand(deleteCommandInput)
    } catch (error) {
        console.error("Error creating delete object command:", error)
        throw error
    }
}
