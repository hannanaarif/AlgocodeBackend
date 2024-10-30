
import { Request,Response } from 'express';

import { CreateSubmissionDTO } from '../dtos/createSubmissionDTO';

export function addProblem(req:Request,res:Response){
    const submissionDTO= req.body as CreateSubmissionDTO;
    return res.status(200).json({
        success:true,
        message:'Successfully collected the submission',
        error:{},
        data:submissionDTO
    });
}