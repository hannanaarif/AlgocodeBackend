
import SampleQueue from '../queues/SampleQueue';


export default async function(name:string, payload:Record<string,unknown>,priority:number){
    await SampleQueue.add(name,payload,{priority});
    console.log('Successfully added job to queue');
}