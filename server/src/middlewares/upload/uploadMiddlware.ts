import { MulterError } from "multer"

import singleMemoryUpload from "./singleMemoryUpload"

import type { Request, Response, NextFunction } from "express"

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    singleMemoryUpload(req, res, (error) => {
        if (error) {
            if (error instanceof MulterError) {
                console.log(error.message)
                return res.status(400).json({ error: error.message })
            } else if (error) {
                console.log(error.message)
                return res.status(400).json({ error: error.message })
            } else {
                console.log(error.message)
                return res.status(500).json({ error: "Internal server error" })
            }
        }

        next()
    })
}

export default uploadMiddleware
