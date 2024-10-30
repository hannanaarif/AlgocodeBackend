async function apiPlugin(fastify, options) {
    console.log("from api Routes");
    fastify.register(require('./v1/v1Routes'), {prefix: '/v1'});
}

module.exports = apiPlugin