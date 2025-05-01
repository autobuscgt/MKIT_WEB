class ApiError extends Error{
    constructor(status,message){
        super()
        this.status = status
        this.message = message
    }
    static badRequest(message){
        return new ApiError(401,message)
    }
    static internal(message){
        return new ApiError(500,message)
    }
    static forbidden(message){
        return new ApiError(403,message)
    }
    static notFound(message = 'Not Found', errors = []) {
        return new ApiError(404, message, errors);
    }
}
module.exports = ApiError