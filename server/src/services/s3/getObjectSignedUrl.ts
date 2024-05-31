import s3Client from "@/config/aws/s3"

import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { GetObjectCommand } from "@aws-sdk/client-s3"

import type { PutObjectCommandInput } from "@aws-sdk/client-s3"

type ObjectDataType = {
    bucketName: string
    key: string
} & Omit<PutObjectCommandInput, "Bucket" | "Key">
export async function getObjectSignedUrl({
    bucketName,
    key,
    ...otherMetadata
}: ObjectDataType) {
    const params: PutObjectCommandInput = {
        Bucket: bucketName,
        Key: key,
        ...otherMetadata,
    }

    try {
        const command = new GetObjectCommand(params)
        const expiresInSeconds = 60
        const url = await getSignedUrl(s3Client, command, {
            expiresIn: expiresInSeconds,
        })
        return url
    } catch (error) {
        console.error("Error generating signed URL:", error)
        return null
    }
}