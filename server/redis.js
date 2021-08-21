// Redis Module
const redis = require('redis')

// connect to redis
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)

// Turn on the Events
client.on('connect', () => {
    process.stdout.write(`\n Redis Connection: tcp://${process.env.REDIS_HOST}/${process.env.REDIS_PORT} \n`)
})

client.on('error', (err) => {
    process.stdout.write(`\n Redis Connection Error: ${err} \n`)
})

// Export the Module
module.exports = {

    // get redis client
    getRedisClient(){
        return client
    },

    // clear hash
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey))
    }
}