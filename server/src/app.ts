import cors from "cors"
import compression from "compression"
import cookieParser from "cookie-parser"

import express from "express"

import postRouter from "@/routes/post"
import authRouter from "@/routes/auth"

import corsOptions from "@/config/cors"

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

app.use("/api", authRouter)
app.use("/api/post", postRouter)
app.use((req, res, next) => {
    res.status(404).json({ message: "API URL not found" })
})

export default app
