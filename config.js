const config = {
    mongoConnectionString: process.env.MONGO_URL || 'mongodb://localhost:27017/loginApp',
    redis: {
        port: process.env.REDIS_PORT || '6379',
        host: process.env.REDIS_HOST || 'localhost',
        auth: process.env.REDIS_AUTH,
    },
};
module.exports = config;