import express from "express"

import authController from "@/controllers/auth"

import asyncHandler from "@/middlewares/handler/asyncHandler"

const authRouter = express.Router()

authRouter.route("/login").post(asyncHandler(authController.login))
authRouter.route("/refresh").post(asyncHandler(authController.refreshToken))

export default authRouter
