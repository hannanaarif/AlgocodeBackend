const NotFound = require('../errors/notfound.error');
const BadRequest=require('../errors/badrequest.error');
const {Problem}=require('../models');
const { updateMany } = require('../models/problem.model');

class ProblemRepository{

async createProblem(problemData){
    try {
        console.log('inside addProblem Repo')
        const problem=await Problem.create({
            title:problemData.title,
            description:problemData.description,
            codeStubs:problemData.codeStubs,
            testcases:(problemData.testcases)?problemData.testcases:[],
        });
        return problem; 
        }
    catch (error) {
            throw error;
        }
    }

    async getAllProblems(){
          const problems=await Problem.find({});
          return problems; 
    }

    async getProblem(id){
        try {
        console.log("from repository get problem",id);
        const problem=await Problem.findById(id);
        if(!problem){
            throw new NotFound("problem",id);
        }
        console.log(problem);
        return problem;

        } catch (error) {
            throw error;
        }
        
    }

    async deleteProblem(problemid) {
         // Input validation
        //  if (!mongoose.Types.ObjectId.isValid(problemid || problemid.length !== 24)) {
        //     console.log('inside delete Problem mongoose');
        //     throw new BadRequest('problem ID', { message: 'The provided ID is not a valid ObjectId.' });
        // }
        const problem=await Problem.findByIdAndDelete(problemid);

        if(!problem){
            throw new NotFound("problem",problemid);
        }
        // if(problem){

        // }
        console.log(problem);
        return problem;
    }

    async updateProblem(problemid,updateData){

        const updateproblem=await Problem.findByIdAndUpdate(problemid,updateData,{new:true});
        // Check if the problem was found
        if (!updateproblem) {
            throw new NotFound('Problem', problemid);
        }
        console.log(updateproblem);
        // Return the updated problem
        return updateproblem;
    }

};
module.exports=ProblemRepository;