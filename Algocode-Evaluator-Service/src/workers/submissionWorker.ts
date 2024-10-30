import { Job ,Worker} from 'bullmq';

import redisConnection from '../config/redisConfig';
import SubmissionJob from '../jobs/submissionJob';
import { SubmissionPayload } from '../types/submissionPayload';




export default function SubmissionWorker(queueName:string){
    new Worker(queueName,
         async (job:Job)=>{
            console.log('Job name is kicking for processing',job.name);
           if(job.name ==='SubmissionJob'){
              console.log('Job name',job.name);
              const submissionJobInstance=new SubmissionJob(job.data as Record<string,SubmissionPayload>);
              console.log('calling handler from worker');
              await submissionJobInstance.handle(job);
              return true;
           }
        },
        {connection:redisConnection}
     );
}