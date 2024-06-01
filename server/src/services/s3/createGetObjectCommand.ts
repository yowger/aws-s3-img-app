import { GetObjectCommand } from "@aws-sdk/client-s3"

import type { GetObjectCommandInput } from "@aws-sdk/client-s3"

export type CreateGetObjectCommand = {
    bucketName: string
    key: string
} & Omit<GetObjectCommandInput, "Bucket" | "Key">
export async function createGetObjectCommand({
    bucketName,
    key,
    ...otherMetadata
}: CreateGetObjectCommand): Promise<GetObjectCommand> {
    const getCommandInput: GetObjectCommandInput = {
        Bucket: bucketName,
        Key: key,
        ...otherMetadata,
    }

    try {
        return new GetObjectCommand(getCommandInput)
    } catch (error) {
        console.error(`Error creating get object command : ${error}`)
        throw error
    }
}
