import express from 'express';

import { pingcheck } from '../../controllers/pingController';
import submissionRouter from './submissionRoutes';

const v1Router=express.Router();

console.log('v1Router');
v1Router.use('/submission',submissionRouter);

v1Router.get('/ping',pingcheck);

export default v1Router;