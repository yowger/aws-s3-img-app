import multer from "multer"

import type { Request } from "express"
import type { StorageEngine, FileFilterCallback } from "multer"

const storage: StorageEngine = multer.memoryStorage()

const imageFileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

    if (!allowedTypes.includes(file.mimetype)) {
        cb(new Error("Invalid file type. Only jpeg, png and webp are allowed."))
    }

    cb(null, true)
}

const uploadSizeLimitInMb = 5 * 1024 * 1024 // 5mb

const upload = multer({
    storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: uploadSizeLimitInMb },
})

const singleMemoryUpload = upload.single("image")

export default singleMemoryUpload
