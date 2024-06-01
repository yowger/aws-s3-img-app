import s3Client from "@/config/aws/s3"

import { DeleteObjectCommand } from "@aws-sdk/client-s3"

import type { DeleteObjectCommandInput } from "@aws-sdk/client-s3"

type ObjectDataType = {
    bucketName: string
    fileName: string
} & Omit<DeleteObjectCommandInput, "Bucket" | "Key">
export async function deleteObject({
    bucketName,
    fileName,
    ...otherMetadata
}: ObjectDataType): Promise<void> {
    const deleteCommandInput: DeleteObjectCommandInput = {
        Bucket: bucketName,
        Key: fileName,
        ...otherMetadata,
    }

    try {
        await s3Client.send(new DeleteObjectCommand(deleteCommandInput))
    } catch (error) {
        console.error("Error deleting file:", error)
        throw error
    }
}
