import express from "express"

import postController from "@/controllers/post"

import authenticate from "@/middlewares/authenticate"
import asyncHandler from "@/middlewares/handler/asyncHandler"
import uploadMiddleware from "@/middlewares/upload/uploadMiddleware"

const postRouter = express.Router()

// add authentication to prevent random api request
// I'm using free version
postRouter
    .route("/")
    .post(authenticate, uploadMiddleware, asyncHandler(postController.create))
postRouter
    .route("/")
    .get(authenticate, asyncHandler(postController.paginatedList))
postRouter
    .route("/:postId")
    .get(authenticate, asyncHandler(postController.read))
postRouter
    .route("/:postId")
    .delete(authenticate, asyncHandler(postController.remove))
postRouter
    .route("/download/:fileName")
    .get(authenticate, asyncHandler(postController.downloadFile))

export default postRouter
