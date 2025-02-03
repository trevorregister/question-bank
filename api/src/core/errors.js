class BaseError extends Error {
    constructor (message) {
    super()
   
    Object.setPrototypeOf(this, new.target.prototype)
    this.message = message
    Error.captureStackTrace(this)

    }
}

export class HttpError extends BaseError{
    constructor(code, message){
        super(message)
        this.code = code
    }
}

export class NotFoundError extends HttpError {
    constructor(subject){
        super(404)
        this.message = `${subject} not found`
        
    }
}

export class ValidationError extends HttpError {
    constructor(code, joiError){
        super(code)
        this.message = joiError.details.map(detail => detail.message)
    }
}