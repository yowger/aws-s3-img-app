import env from "@/config/env"

import PostModel from "@/models/Post"

import { deleteFile } from "@/services/s3/deleteFile"

import type { Response, Request } from "express"

const remove = async (req: Request, res: Response) => {
    const { postId } = req.params

    const deletedPost = await PostModel.findByIdAndDelete(postId)

    if (!deletedPost) {
        return res.status(404).send("Post not found")
    }

    await deleteFile({
        bucketName: env.AWS_BUCKET_NAME,
        fileName: deletedPost.image,
    }).catch((error) => {
        console.log("error deleting file", error)
        return res.status(500).json({ message: "Failed to delete image" })
    })

    res.status(204).send("Post deleted successfully")
}

export default remove
