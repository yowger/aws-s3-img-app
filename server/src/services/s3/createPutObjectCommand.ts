import { Readable } from "stream"

import { PutObjectCommand } from "@aws-sdk/client-s3"

import type { PutObjectCommandInput } from "@aws-sdk/client-s3"

export type CreatePutObjectCommand = {
    bucketName: string
    key: string
    body: string | Uint8Array | Buffer | Readable
    contentType: string
} & Omit<PutObjectCommandInput, "Bucket" | "Key" | "Body" | "ContentType">
export async function createPutObjectCommand({
    bucketName,
    key,
    body,
    contentType,
    ...otherMetadata
}: CreatePutObjectCommand): Promise<PutObjectCommand> {
    const getCommandInput: PutObjectCommandInput = {
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: contentType,
        ...otherMetadata,
    }

    try {
        return new PutObjectCommand(getCommandInput)
    } catch (error) {
        console.error(`Error creating get object command : ${error}`)
        throw error
    }
}
