import jwt from "jsonwebtoken"

declare interface UserIdJwtPayload extends jwt.JwtPayload {
    userId: string
}
