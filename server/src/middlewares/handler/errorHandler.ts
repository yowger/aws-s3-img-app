import BaseError from "@/handler/baseError"

import { Error } from "mongoose"
import type {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction,
} from "express"

const errorHandler: ErrorRequestHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof Error.ValidationError) {
        console.log("Validation error: ", error)

        const message = Object.values(error.errors)
            .map((error) => error.message.replace(/`/g, ""))
            .join(", ")

        return res.status(400).json({ message })
    }

    if (error instanceof BaseError) {
        if (!error.isOperational) {
            console.log("Non operational base error: ", error)
        }

        return res.status(error.httpCode).json({
            message: error.message,
        })
    }

    console.log("Internal server error: ", error)

    return res.status(500).json({
        message: "Internal server error",
    })
}

export default errorHandler
