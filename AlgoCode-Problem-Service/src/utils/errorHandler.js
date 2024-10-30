const { StatusCodes } = require("http-status-codes");
const BaseError = require("../errors/base.error");

function errorHandler(err,req,res,next){

    if(err instanceof BaseError){
        return res.status(err.StatusCode).json({
            success:false,
            message:err.message,
            error:err.details,
            data:{}
        })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:'something went we dont know wrong',
        error:err,
        data:{}
    })

}

module.exports=errorHandler;