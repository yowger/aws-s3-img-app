import type { ResponseStatus } from "./types"

export default class BaseError extends Error {
    public readonly name: string
    public readonly httpCode: ResponseStatus
    public readonly isOperational: boolean

    constructor(
        name: string,
        httpCode: ResponseStatus,
        isOperational: boolean,
        description: string
    ) {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype)

        this.name = name
        this.httpCode = httpCode
        this.isOperational = isOperational

        Error.captureStackTrace(this)
    }
}
