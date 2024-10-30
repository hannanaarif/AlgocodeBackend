import { NextFunction,Request,Response } from 'express';
import { ZodSchema } from 'zod';



 
export const validate=<T>(schema:ZodSchema<T>)=>(req:Request,res:Response,next:NextFunction)=>{

    try {
        schema.parse({
            ...req.body
        });
        next();
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            missing:'Invalid request params received',
            data:{},
            Error:error
        });
        
    }
};

