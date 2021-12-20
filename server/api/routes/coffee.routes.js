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

        // Create Coffee 
        .post(CoffeeControllers.createCoffee)

        // Get 20 recent Coffees
        // .get(CoffeeControllers.getRecentCoffees)

// Route definition
router.route('/:coffeeId')

        // Get Coffee
        .get(CoffeeControllers.getCoffee)

        // Update Coffee
        // .put(CoffeeControllers.updateCoffee)

        // Remove Coffee
        // .delete(CoffeeControllers.removeCoffee)

// Export Router
module.exports = router

