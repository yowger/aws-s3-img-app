import type { Response, Request } from "express"

const logout = async (req: Request, res: Response) => {
    res.clearCookie("refresh_token")

    res.status(200).json({
        message: "Logout successful",
    })
}

export default logout
