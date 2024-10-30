import { Job } from 'bullmq';

import { IJob } from '../types/bullmqJobDefination';


export default class SampleJob implements IJob{
    name: string;
    payload?: Record<string, unknown>;
    constructor(payload:Record<string,unknown>){
        this.payload=payload;
        this.name=this.constructor.name;
    }

    handle= (job?: Job):void=>{
       if(job){
        console.log('Handling job that coming from worker');
       }
    };

    failed=(job?: Job) => {
        console.log('failed',job);
    };
};