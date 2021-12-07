// Mongoose Module
const mongoose = require('mongoose')

// Cache MongoDB Connection
let cachedMongoConn = null

module.exports = {
    connectDatabase() {
        return new Promise((resolve, reject) => {

            // Get Global Promise
            mongoose.Promise = global.Promise

            // Set Options
            var __setOptions = mongoose.Query.prototype.setOptions;

            // Set the lean true by default
            mongoose.Query.prototype.setOptions = function(options, overwrite) {
              __setOptions.apply(this, arguments);
              if (this.options.lean == null) this.options.lean = true;
              return this;
            };

            // Init Connections
            mongoose.connection

                // Reject if an error occurred when trying to connect to MongoDB
                .on('error', error => {
                    process.stdout.write('\n Error: connection to DB failed \n')
                    reject(error)
                })

                // Exit Process if there is no longer a Database Connection
                .on('close', () => {
                    process.stdout.write('\n Error: Connection to DB lost \n')
                    process.exit(1)
                })

                // Connected to DB
                .once('open', () => {
                    // Display connection information
                    const infos = mongoose.connections

                    infos.map(info => process.stdout.write(`\n Database Connection: mongodb://${info.host}:${info.port}/${info.name} \n`))

                    // Return successful promise
                    resolve(cachedMongoConn)
                })

            // MongoDB Connection
            if (!cachedMongoConn) {
                cachedMongoConn = mongoose.connect(process.env.DB_URI, {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    connectTimeoutMS: 10000,
                    bufferCommands: false,
                    bufferMaxEntries: 0,
                })
            } else {
                process.stdout.write('\n MongoDB: using cached database instance \n')
                resolve(cachedMongoConn)
            }
        })
    }
}