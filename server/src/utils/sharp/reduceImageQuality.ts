import sharp from "sharp"

export default async function reduceImageQuality(
    inputBuffer: Buffer,
    quality?: number
): Promise<Buffer> {
    const metadata = await sharp(inputBuffer).metadata()
    let outputBuffer: Buffer

    type FormatHandlers = {
        [key: string]: (buffer: Buffer) => Promise<Buffer>
    }
    const formatHandlers: FormatHandlers = {
        jpeg: (buffer) =>
            sharp(buffer)
                .jpeg({ quality: quality || 80 })
                .toBuffer(),
        png: (buffer) =>
            sharp(buffer)
                .png({ quality: quality || 80 })
                .toBuffer(),
        webp: (buffer) =>
            sharp(buffer)
                .webp({ quality: quality || 85 })
                .toBuffer(),
    }

    const formatHandler =
        formatHandlers[metadata.format] || formatHandlers["jpeg"]

    return formatHandler(inputBuffer)
}
