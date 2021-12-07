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

// Get all archived projects
router.get('/archived', ProjectControllers.getAllArchivedProjects)

// Get next 5 recent projects
router.get('/next/:lastProjectId', ProjectControllers.getNextRecentProjects)

// Route Definition
router.route('/')

        // Create Project 
        .post(ProjectControllers.createProject)

        // Get 20 recent projects
        .get(ProjectControllers.getRecentProjects)

// Route definition
router.route('/:projectId')

        // Get Project
        .get(ProjectControllers.getProject)

        // Update Project
        .put(ProjectControllers.updateProject)

        // Remove Project
        .delete(ProjectControllers.removeProject)

// Export Router
module.exports = router

