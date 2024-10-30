const fastify = require('fastify')({ logger: true }); // calling the fastify constructor
const app = require('./app');
const serverConfig = require('./config/serverConfig');
const PORT = serverConfig.PORT;
const connectToDB=require('./config/dbConfig');
const errorHandler = require('./utils/errorHandler');
const evaluationWorker = require('./workers/evaluationWorker');



fastify.register(app);
fastify.setErrorHandler(errorHandler);

fastify.listen({ port: PORT }, async(err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1)
    }
    await connectToDB();
    evaluationWorker("EvaluationQueue");
    console.log(`Server up at port ${PORT}`);
});