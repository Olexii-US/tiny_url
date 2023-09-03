const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
});

module.exports = redis;
