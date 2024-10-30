import {Request,Response} from 'express'; 

export const pingcheck=(req:Request,res:Response)=>{
      return res.status(200).json({
        message:'ping check ok',
     });
};


