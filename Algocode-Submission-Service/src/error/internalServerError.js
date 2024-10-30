const BaseError = require("./baseError");
const {StatusCodes}=require('http-status-codes')


class internalServerError extends BaseError{
    constructor(details){
      super('Internalserver',StatusCodes.INTERNAL_SERVER_ERROR,'internal Server Error:Please try again',details)
    }
}

module.exports=internalServerError;