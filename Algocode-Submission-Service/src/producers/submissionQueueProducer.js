const submissionQueue=require('../queues/submissionQueue');

module.exports=async function(payload) {
    // await submissionQueue.add('SubmissionJob', payload);
    // console.log('Successfully added a new submission job');

    const job = await submissionQueue.add('SubmissionJob', payload);
    console.log('Successfully added a new submission job');
    return job; // Return the job object

}