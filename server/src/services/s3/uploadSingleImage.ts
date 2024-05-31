import s3Client from "@/config/aws/s3"
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3"

type UploadFileType = {
    bucket: string
    fileBuffer: Uint8Array
    fileName: string
    mimeType: string
} & Omit<PutObjectCommandInput, "Bucket" | "Key" | "Body" | "ContentType">

export async function uploadSingleImage(
    uploadData: UploadFileType
): Promise<void> {
    const { bucket, fileBuffer, fileName, mimeType, ...otherMetadata } =
        uploadData

    const putObjectCommandInput: PutObjectCommandInput = {
        Bucket: bucket,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimeType,
        ...otherMetadata,
    }

    try {
        await s3Client.send(new PutObjectCommand(putObjectCommandInput))
        console.log(`File uploaded successfully to ${bucket}/${fileName}`)
    } catch (error) {
        console.error(`Error uploading file: ${error}`)
        throw error
    }
}
