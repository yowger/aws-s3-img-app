import express from "express"

import postController from "@/controllers/post"

import asyncHandler from "@/middlewares/handler/asyncHandler"
import singleMemoryUpload from "@/middlewares/upload/singleMemoryUpload"
import uploadMiddleware from "@/middlewares/upload/uploadMiddlware"

const postRouter = express.Router()

postRouter
    .route("/")
    .post(uploadMiddleware, asyncHandler(postController.create))
postRouter.route("/").get(asyncHandler(postController.paginatedList))
postRouter.route("/:postId").get(asyncHandler(postController.read))
postRouter.route("/:postId").delete(asyncHandler(postController.remove))
postRouter
    .route("/download/:fileName")
    .get(asyncHandler(postController.downloadFile))

export default postRouter
