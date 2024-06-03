import jwt from "jsonwebtoken"

import env from "@/config/env"

import type { Response, Request } from "express"

/*
    This app is intended for S3, so I'm only doing the minimal authentication, expand depending on your requirements.
*/
const login = async (req: Request, res: Response) => {
    const { username, password } = req.body

    if (username !== env.USER_NAME || password !== env.PASSWORD) {
        return res.status(401).json({ error: "Invalid credentials" })
    }

    const refreshToken = jwt.sign({ username }, env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
    })
    const accessToken = jwt.sign({ username }, env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    })
    const cookieExpInMs = 24 * 60 * 60 * 1000 // 24 hours
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: cookieExpInMs,
    })

    return res.json({ accessToken })
}

export default login
