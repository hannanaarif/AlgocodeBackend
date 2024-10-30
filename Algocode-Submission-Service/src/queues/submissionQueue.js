const { Queue }=require('bullmq');

const redisConnection= ('../config/redisConfig');

module.exports = new Queue('SubmissionQueue',{connection:redisConnection});