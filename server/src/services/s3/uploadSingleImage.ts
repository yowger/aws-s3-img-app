import s3Client from "@/config/aws/s3"
import { PutObjectCommand } from "@aws-sdk/client-s3"

import type { PutObjectCommandInput } from "@aws-sdk/client-s3"

type UploadFileType = {
    bucketName: string
    fileBuffer: Uint8Array
    fileName: string
    mimeType: string
} & Omit<PutObjectCommandInput, "Bucket" | "Key" | "Body" | "ContentType">
export async function uploadSingleImage({
    bucketName,
    fileBuffer,
    fileName,
    mimeType,
    ...otherMetadata
}: UploadFileType): Promise<void> {
    const uploadCommandInput: PutObjectCommandInput = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimeType,
        ...otherMetadata,
    }

    try {
        await s3Client.send(new PutObjectCommand(uploadCommandInput))
        console.log(`File uploaded successfully to ${bucketName}/${fileName}`)
    } catch (error) {
        console.error(`Error uploading file: ${error}`)
        throw error
    }
}
