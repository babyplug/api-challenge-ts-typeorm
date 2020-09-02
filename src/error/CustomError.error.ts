import * as HttpStatus from "http-status-codes"

export interface CustomErrorOption {
    statusCode?: number
    message?: string
}

export class CustomError extends Error {
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR
    message: string = HttpStatus.getReasonPhrase(HttpStatus.INTERNAL_SERVER_ERROR)
    constructor(customOption?: CustomErrorOption) {
        super()
        if (customOption.statusCode) {
            this.statusCode = customOption.statusCode
        }
        if (customOption.message) {
            this.message = customOption.message
        }
    }
}