import express from "express"

import postController from "@/controllers/post"

import asyncHandler from "@/middlewares/handler/asyncHandler"
import singleMemoryUpload from "@/middlewares/upload/singleMemoryUpload"

const postRouter = express.Router()

postRouter
    .route("/")
    .post(singleMemoryUpload, asyncHandler(postController.create))
postRouter.route("/").get(asyncHandler(postController.read))
postRouter.route("/:postId").delete(asyncHandler(postController.remove))

export default postRouter
