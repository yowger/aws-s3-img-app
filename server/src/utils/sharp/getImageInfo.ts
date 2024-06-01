import sharp from "sharp"

export type ImageInfo = {
    mimeType: string
    format: string
}
export default async function getImageInfo(
    imageBuffer: Buffer
): Promise<ImageInfo> {
    const metadata = await sharp(imageBuffer).metadata()
    const format = metadata.format

    const formatToMimeType: { [key: string]: string } = {
        jpeg: "image/jpeg",
        png: "image/png",
        webp: "image/webp",
    }

    const mimeType = formatToMimeType[format] || "application/octet-stream"

    return { mimeType, format }
}
