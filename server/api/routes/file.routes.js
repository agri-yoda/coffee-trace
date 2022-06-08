// Express Module
const express = require('express')

// Authorization
const { Authorization } = require('../../utils')

// File Controllers
const { FileControllers } = require('../controllers')

// Router Module
const router = express.Router()

// Verify Access Token
router.use(Authorization.verifyAccessToken)

// Verify If the current user isLoggedIn 
router.use(Authorization.isLoggedIn)

// Route Definition
router.route('/')

        // Upload file
        .post(FileControllers.uploadFile)

router.route('/file-url')

        // Get File
        .post(FileControllers.getSignedFileUrl)

router.route('/signed-url')

        // To Upload
        .post(FileControllers.getSignedUploadUrl)


// Route Definition
router.route('/:folder_name')

        // Get Objects List
        .post(FileControllers.getObjectsByFolder)

// Export Router
module.exports = router