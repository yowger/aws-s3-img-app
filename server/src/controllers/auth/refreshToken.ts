import jwt from "jsonwebtoken"

import env from "@/config/env"

import type { ProtectedRequest } from "@/types/appRequest"
import type { Response, Request } from "express"
import type { UserIdJwtPayload } from "@/types/jwt"

const refreshToken = async (req: ProtectedRequest, res: Response) => {
    const refreshToken = req.cookies.refresh_token

    if (!refreshToken) {
        return res.status(401).json({ error: "Unauthorized access." })
    }

    try {
        const decodedToken = <UserIdJwtPayload>(
            jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET)
        )

        req.userId = decodedToken.userId
        const newAccessToken = jwt.sign(
            { userId: "123" },
            env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1h",
            }
        )

        res.status(200).json({
            accessToken: newAccessToken,
        })
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token. Unauthorized access.",
        })
    }
}

export default refreshToken
