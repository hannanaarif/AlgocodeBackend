const testController = require("../../../../controllers/submissionController");

async function testRoute(fastify, options) {
    fastify.get('/ping', testController.pingRequest)
}

module.exports = testRoute;