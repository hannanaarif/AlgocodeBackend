const { Worker } =require('bullmq');
const redisConnection=require('../config/redisConfig');
const axios=require('axios');

function evaluationWorker(queueName){
    new Worker(queueName,
         async job => {
        if (job.name === 'EvaluationJob') {
          console.log("Inside evaluluator worker in submission");
          console.log(job.data);
          try{
            const response=await axios.post('http://localhost:3001/sendPayload',{
               userId:job.data.userId,
               payload:job.data
              });
              console.log(response.data);
          }
          catch(error){
            console.log(error.code);
          }
        }
    },{
        connection:redisConnection,
    });

}

module.exports=evaluationWorker;