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
router.put('/:projectId', ProjectControllers.updateProject)

// Remove Project
router.delete('/:projectId', ProjectControllers.removeProject)

// Get all archived projects
router.get('/archived', ProjectControllers.getAllArchivedProjects)

// Get 20 recent projects
router.get('/', ProjectControllers.getRecentProjects)

// Get next 5 recent projects
router.get('/next/:lastProjectId', ProjectControllers.getNextRecentProjects)

// Export Router
module.exports = router

