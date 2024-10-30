        import { Job } from 'bullmq';

import evaluationQueueProducer from '../producers/evaluationQueueProducer';
        import { IJob } from '../types/bullmqJobDefination';
import { ExecutionResponse } from '../types/CodeExecutorStrategy';
        import { SubmissionPayload } from '../types/submissionPayload';
        import createExecutor from '../utils/ExecutorFactory';


        export default class SubmissionJob implements IJob{
            name:string;
            payload:Record<string,SubmissionPayload>;
            constructor(payload:Record<string,SubmissionPayload>){
                this.payload=payload;
                this.name=this.constructor.name;
            }

            handle=async(job?:Job)=>{
                console.log('Handler was called');
                console.log(this.payload);
                if (job) {
                    const key = Object.keys(this.payload)[0];
                    const codeLanguage = this.payload[key].language;
                    const code = this.payload[key].code;
                    const inputTestCases = this.payload[key].inputCase;
                    const outputTestCases = this.payload[key].outputCase;
                    const strategy=createExecutor(codeLanguage);
                    if(strategy!==null){
                        console.log('going to execute the code');
                        const response:ExecutionResponse=await strategy.execute(code,inputTestCases,outputTestCases);
                        const userId=this.payload[key].userId;
                        const submissionId=this.payload[key].submissionId;
                        await evaluationQueueProducer({response,userId,submissionId});
                        if(response.status=='SUCCESS'){   
                            console.log('code executed successfully');
                            console.log(response);
                        }
                       else{
                            console.log('code executed went wrong');
                            console.log(response);

                        }
                    }

                }

            };

            failed=(job?: Job) => {
            console.log('failed job',job);
            };
        };