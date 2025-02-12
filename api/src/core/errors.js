class BaseError extends Error {
    constructor (message) {
    super()
   
    Object.setPrototypeOf(this, new.target.prototype)
    this.message = message
    Error.captureStackTrace(this)

    }
}

class HttpError extends BaseError{
    constructor(code, message){
        super(message)
        this.code = code
    }
}

class NotFoundError extends HttpError {
    constructor(subject){
        super(404)
        this.message = `${subject} not found`
        
    }
}

class ValidationError extends HttpError {
    constructor(joiError){
        super(422)
        this.message = joiError.details.map(detail => detail.message)
    }
}

class TypeError extends HttpError {
    constructor(type){
        super(400)
        this.message = `invalid type ${type}`
    }
}

module.exports = {
    HttpError,
    NotFoundError,
    ValidationError,
    TypeError
}