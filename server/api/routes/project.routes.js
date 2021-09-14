// Express Module
const express = require('express')

// Authorization
const { Authorization } = require('../../utils')

// Project Controllers
const { ProjectControllers } = require('../controllers')

// Router Module
const router = express.Router()

// Verify Access Token
router.use(Authorization.verifyAccessToken)

// Verify If the current user isLoggedIn 
router.use(Authorization.isLoggedIn)

// Create Project
router.post('/', ProjectControllers.createProject)

// Get Project
router.get('/:projectId', ProjectControllers.getProject)

// Update Project
router.post('/:projectId', ProjectControllers.updateProject)

// Get 20 recent projects
router.get('/', ProjectControllers.getRecentProjects)

// Get next recent projects
router.get('/next/:lastProjectId', ProjectControllers.getNextRecentProjects)

// Export Router
module.exports = router

