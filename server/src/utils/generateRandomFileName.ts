export default function generateRandomKey(
    length: number = 5,
    extension: string = ""
): string {
    const timestamp = Date.now().toString()
    const randomString = Math.random()
        .toString(36)
        .substring(2, 2 + length)

    return `${timestamp}-${randomString}${extension ? "." + extension : ""}`
}
