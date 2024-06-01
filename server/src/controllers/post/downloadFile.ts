import { Readable } from "stream"

import env from "@/config/env"

import { executeGetObjectCommand } from "@/services/s3/executeGetObjectCommand"

import type { Response, Request } from "express"

const downloadFile = async (req: Request, res: Response) => {
    const { fileName } = req.params

    const data = await executeGetObjectCommand({
        bucketName: env.AWS_BUCKET_NAME,
        key: fileName,
    })

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`)
    res.setHeader(
        "Content-Type",
        data.ContentType || "application/octet-stream"
    )

    if (data.Body instanceof Readable) {
        data.Body.pipe(res)
    } else {
        res.status(500).send("Error downloading the file.")
    }
}

export default downloadFile
