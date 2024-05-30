import s3Client from "@/config/aws/s3"

import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3"

// might change to class
interface UploadFileType {
    fileBuffer: Uint8Array
    fileName: string
    mimetype: string
}
export function uploadSingleImage({
    fileBuffer,
    fileName,
    mimetype,
}: UploadFileType) {
    const uploadParams: PutObjectCommandInput = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,
    }

    return s3Client.send(new PutObjectCommand(uploadParams))
}
