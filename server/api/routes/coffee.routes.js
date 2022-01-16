// Express Module
const express = require('express')

// Authorization
const { Authorization } = require('../../utils')

// Coffee Controllers
const { CoffeeControllers } = require('../controllers')

// Router Module
const router = express.Router()

// Verify Access Token
router.use(Authorization.verifyAccessToken)

// Verify If the current user isLoggedIn 
router.use(Authorization.isLoggedIn)

// Route Definition
router.route('/')

        // Create Project 
        .post(CoffeeControllers.createCoffee)

// Route definition
router.route('/:coffeeId')

        // Get Project
        .get(CoffeeControllers.getCoffee)

        // Update Project
        .put(CoffeeControllers.updateCoffee)

        // Remove Project
        .delete(CoffeeControllers.removeCoffee)

// Export Router
module.exports = router