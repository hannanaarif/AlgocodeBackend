const BaseError=require('../error/baseError');
const {StatusCodes}=require('http-status-codes');

function errorHandler(error,request,replay){
    if(error instanceof BaseError){
        return replay.status(error.statusCode).send({
            message:error.message,
            details:error.details,
            success:false
        })
    }
    else{
        replay.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message:error.message,
            details:"Something went wrong:Internal server Error",
            success:false,
        });
    }
}
module.exports=errorHandler;