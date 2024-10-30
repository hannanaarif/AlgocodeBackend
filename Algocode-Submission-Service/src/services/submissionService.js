const { fetchProblemDetails } = require('../apis/problemadminApi');
const internalServerError = require('../error/InternalServerError');
const SubmissionProducer=require('../producers/submissionQueueProducer');
class SubmissionService {
    constructor(submissionRepository) {
        this.submissionRepository=submissionRepository;
    }

    async pingCheck() {
        return 'pong'
    }

    async addSubmission(submissionPayload){

        const problemId=submissionPayload.problemId;
        const userId=submissionPayload.userId;

        const problemAdminApiResponse=await fetchProblemDetails(problemId);
        if(!problemAdminApiResponse){
            throw new internalServerError('fail to create a submission');
        }
        // console.log(problemAdminApiResponse.data.codeStubs);

        const languageCodeStub=problemAdminApiResponse.data.codeStubs.find(codeStub=> codeStub.language.toLowerCase()===submissionPayload.language.toLowerCase());

        // console.log("languageCodeStub",languageCodeStub);

        submissionPayload.code=languageCodeStub.startSnippet + "\n\n" + submissionPayload.code + "\n\n" + languageCodeStub.endSnippet;

        const submission=await this.submissionRepository.createSubmission(submissionPayload);
        if(!submission){
            throw new internalServerError("failed to add submission, Try again later");
        }

        console.log("submission",submission);
        console.log("going to add to queue");
        const response=await SubmissionProducer({
            [submission._id]:{
            code:submission.code,
            language:submission.language,
            inputCase:problemAdminApiResponse.data.testcases[0].input,
            outputCase:problemAdminApiResponse.data.testcases[0].output,
            userId,
            submissionId:submission.id
        }});

        const testCases = problemAdminApiResponse.data.testcases;

        console.log("testcases",testCases);

        // if (!testCases || testCases.length === 0) {
        //           console.error("No test cases found");
        //        return { error: "No test cases available", submission };
        // }

        // try {
        //     const response = await SubmissionProducer({
        //         code: submission.code,
        //         language: submission.language,
        //         inputCase: problemAdminApiResponse.data.testCases[0].input,
        //         outputCase: problemAdminApiResponse.data.testCases[0].output
        //     });
        //     console.log("QueueResponse", response);
        //     return { queueResponse: response, submission };
        // } catch (error) {
        //     console.error("Error adding job to queue:", error);
        //     return { error, submission };
        // }
        return {queueResponse:response,submission};
    }
}

module.exports = SubmissionService;