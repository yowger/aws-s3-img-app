import jwt from "jsonwebtoken"

import type { Response, NextFunction } from "express"

import env from "@/config/env"

import type { ProtectedRequest } from "@/types/appRequest"
import type { UserIdJwtPayload } from "@/types/jwt"

const authenticate = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith("Bearer ")
        ) {
            return res.status(401).json({ message: "Unauthorized access." })
        }

        const token = req.headers.authorization.split(" ")[1]

        try {
            const decodedToken = <UserIdJwtPayload>(
                jwt.verify(token, env.ACCESS_TOKEN_SECRET)
            )

            req.userId = decodedToken.userId
        } catch (error) {
            return res.status(401).json({
                message: "Invalid or expired token. Unauthorized access.",
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

export default authenticate
