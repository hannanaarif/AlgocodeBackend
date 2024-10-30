import express from 'express';

import { addProblem } from '../../controllers/submissionController';
import { createSubmissionZodSchema } from '../../dtos/createSubmissionDTO';
import { validate } from '../../validation/zodValidator';


const submissionRouter=express.Router();

console.log('Reached at submissionRoute');
submissionRouter.post('/',validate(createSubmissionZodSchema),addProblem);


export default submissionRouter;