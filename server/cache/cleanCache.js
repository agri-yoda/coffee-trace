const { clearHash } = require('./createCache')

module.exports = {

    async cleanCache(req, res, next) {

        // Pass the query
        await next()

        // Clean the hash
        clearHash(req.userId)
    }
}
