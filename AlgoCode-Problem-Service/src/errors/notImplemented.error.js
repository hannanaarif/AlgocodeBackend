
const {StatusCodes}=require('http-status-codes');
const BaseError = require('./base.error');

class NotImplemented extends BaseError{
    constructor(methodname){
        super('NotImplemented',StatusCodes.NOT_IMPLEMENTED,`${methodname} Not implemented`);
    }
}

module.exports=NotImplemented;