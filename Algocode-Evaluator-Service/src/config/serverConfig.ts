// Import the dotenv library
import dotenv from 'dotenv';

// Load environment variables from a .env file into process.env
dotenv.config();

// Export the configuration as a default export
export default {
    PORT: process.env.PORT || 3003,
    REDIS_PORT:parseInt(process.env.REDIS_PORT||'6379', 10),
    REDIS_HOST:process.env.REDIS_HOST||'127.0.0.1'
};
