import dotenv from "dotenv"
import z from "zod"

dotenv.config()

const envSchema = z.object({
    DATABASE: z.string().trim().min(1),
    ALLOWED_ORIGINS: z.string().trim().min(1),
    AWS_BUCKET_NAME: z.string().trim().min(1),
    AWS_REGION: z.string().trim().min(1),
    AWS_ACCESS_KEY_ID: z.string().trim().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().trim().min(1),
})

const env = envSchema.parse(process.env)
export default env
