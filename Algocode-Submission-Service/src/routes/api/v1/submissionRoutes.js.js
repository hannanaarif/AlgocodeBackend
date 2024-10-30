const { createSubmission } = require("../../../controllers/submissionController");

async function submissionRoutes(fastify,options){
    // fastify.get('/',createSubmission);
    console.log("cretaeSubmission");
    fastify.post('/',createSubmission);

}

module.exports=submissionRoutes;