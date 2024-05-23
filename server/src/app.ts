import cors from "cors"
import compression from "compression"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import express from "express"

import corsOptions from "@/config/cors"

dotenv.config({ path: ".env" })

process.on("uncaughtException", (error) => {
    console.log("uncaughtException error: ", error)
})

const app = express()
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json({ limit: "5mb" }))
app.use(
    express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
)
app.use(compression())

export default app
