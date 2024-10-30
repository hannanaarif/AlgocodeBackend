const Redis=require('ioredis'); // Assuming you are using the 'redis' library
const serverConfig=require('./serverConfig');
const redisConfig={
    port:serverConfig.REDIS_PORT,
    host:serverConfig.REDIS_HOST,
    maxRetriesPerRequest: null,
};


const redisConnection=new Redis(redisConfig);
// Error handling
redisConnection.on('error', (err) => {
    console.error('Redis connection error:', err);
});

redisConnection.on('connect', () => {
    console.log('Connected to Redis server');
});

// Optionally log when the connection is ready
redisConnection.on('ready', () => {
    console.log('Redis connection is ready');
});

module.exports=redisConnection;