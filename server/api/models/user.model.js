// Mongoose Module
const mongoose = require('mongoose')

// Moment Module
const moment = require('moment')

// Import Schema
const { Schema } = mongoose

// Create Schema
const UserSchema = new Schema({
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        unique : true,
        dropDups: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        default: 'default_user.png'
    },
    role: {
        type: String,
        required: true,
        default: 'grower',
        enum: ['grower', 'miller', 'exporter', 'importer', 'roaster', 'retail-brand', 'others']
    },
    mobile_number: {
        type: String,
        default: ''
    },
    created_date: {
        type: Date,
        default: moment().format()
    }
})

// Define Model
const User = mongoose.model('User', UserSchema)

// Export Model
module.exports = User