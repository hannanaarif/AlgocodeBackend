import Redis from 'ioredis'; // Assuming you are using the 'redis' library

import serverConfig from './serverConfig';

const redisConfig={
    port:serverConfig.REDIS_PORT,
    host:serverConfig.REDIS_HOST,
    maxRetriesPerRequest: null,
};


const redisConnection=new Redis(redisConfig);

export default redisConnection;
