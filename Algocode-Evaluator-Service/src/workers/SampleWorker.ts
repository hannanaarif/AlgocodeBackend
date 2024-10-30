import { Job ,Worker} from 'bullmq';

import redisConnection from '../config/redisConfig';
import SampleJob from '../jobs/SampleJob';


export default function SampleWorker(queueName:string){
    new Worker(queueName,async (job:Job)=>{
        console.log('job from worker',job.data);
        if(job.name==='Samplejob'){
            const samplejobInstance=new SampleJob(job.data as Record<string, unknown>);
            samplejobInstance.handle(job);
            return Promise.resolve();
        }
    },
    {connection:redisConnection}
  );
}
