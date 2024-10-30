const {StatusCodes}=require('http-status-codes');
const BaseError = require('./base.error');

class NotFound extends BaseError{
    constructor(resourcename,resourceValue){
        super('NotFound',StatusCodes.NOT_FOUND,`The requested resource:${resourcename} with value ${resourceValue} not found`,{
            resourcename,
            resourceValue
        });
    }
}

module.exports=NotFound;