import "module-alias/register"

import mongoose from "mongoose"

import app from "./app"

import type { Error as MongoError } from "mongoose"

mongoose.connect(process.env.DATABASE)
mongoose.connection.on("connected", () => {
    console.log("Mongoose default connection open")
})
mongoose.connection.on("error", (error: MongoError) => {
    console.log("Mongoose default connection error", error)
})
mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection disconnected")
})

process.on("SIGINT", () => {
    mongoose.connection.close().finally(() => {
        console.log(
            "Mongoose default connection disconnected through app termination"
        )
        process.exit(0)
    })
})

app.set("port", process.env.PORT || 8001)
const port = app.get("port")
const server = app
    .listen(port, () => {
        const address = server.address()
        if (typeof address !== "string") {
            console.log(`server running on port: ${address?.port}`)
        }
    })
    .on("error", (error: Error) => {
        console.log("Port error", error)
    })
