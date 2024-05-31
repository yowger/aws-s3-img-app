import s3Client from "@/config/aws/s3"

import { DeleteObjectCommand } from "@aws-sdk/client-s3"

import { type DeleteObjectCommandInput } from "@aws-sdk/client-s3"

type ObjectDataType = {
    bucketName: string
    fileName: string
} & Omit<DeleteObjectCommandInput, "Bucket" | "Key">
export async function deleteFile({
    bucketName,
    fileName,
    ...otherMetadata
}: ObjectDataType) {
    const deleteParams: DeleteObjectCommandInput = {
        Bucket: bucketName,
        Key: fileName,
        ...otherMetadata,
    }

    try {
        await s3Client.send(new DeleteObjectCommand(deleteParams))
    } catch (error) {
        console.error("Error deleting file:", error)
        throw error
    }
}
