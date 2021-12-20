// Mongoose Module
const mongoose = require('mongoose')

// Moment Module
const moment = require('moment')

// Import Schema
const { Schema } = mongoose

// Create Schema
const CoffeeSchema = new Schema({
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    coffee_avatar: {
        type: String,
        default: 'default_coffee.png'
    },
    coffee_botanical_variety: {
        type: String,
        default: 'Coffee Botanical Variety!'
    },
    coffee_category: {
        type: String,
        default: 'Coffee Category!'
    },
    coffee_cup_score: {
        type: Number,
        default: 0,
        min: [0, 'Must be at least 0, got {VALUE}'],
        max: [100, 'Must be less than or equal to 100, got {VALUE}']
    },
    coffee_created_date: {
        type: Date,
        default: moment().format()
    },
    coffee_description: {
        type: String,
        default: 'Coffee Description!',
        required: true
    },
    coffee_name: {
        type: String,
        default: 'New Coffee',
        required: true
    },
    coffee_preparation_method: {
        type: String,
        default: 'Coffee Preparation Method!'
    },
    coffee_sample_price: {
        type: Number,
        default: 0,
        min: [0, 'Must be at least 0, got {VALUE}']
    }
})

// Define Model
const Coffee = mongoose.model('Coffee', CoffeeSchema)

// Export Model
module.exports = Coffee
