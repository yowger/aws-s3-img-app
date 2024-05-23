import express from "express"

import postController from "@/controllers/post"

import asyncHandler from "@/middlewares/handler/asyncHandler"

const postRouter = express.Router()

postRouter.route("/").post(asyncHandler(postController.create))

export default postRouter
