async function v1Plugin(fastify, options) {
    fastify.register(require('./test/testRoutes'), {prefix: '/test'});
    console.log("from submission v1Route");
    fastify.register(require('./submissionRoutes.js'), {prefix: '/submissions'});

}

module.exports = v1Plugin