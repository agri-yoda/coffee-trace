const SendError = (res, err, message, status) => {

    // Console the error
    process.stdout.write(`\n⛔️ Error:\n ${JSON.stringify(err)} \n \n`)

    // Return the error
    return res.status(status || 500).json({
        message: message || 'Internal server error!',
        err: err || new Error()
    })
}

// Export Module
module.exports = { SendError }