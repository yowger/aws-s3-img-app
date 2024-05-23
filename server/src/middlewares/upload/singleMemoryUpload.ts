import multer from "multer"

import type { Request } from "express"
import type { StorageEngine, FileFilterCallback } from "multer"

const storage: StorageEngine = multer.memoryStorage()

const imageFileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Invalid file type. Only image files are allowed."))
    }
}

const upload = multer({ storage, fileFilter: imageFileFilter })

const singleMemoryUpload = upload.single("image")

export default singleMemoryUpload
