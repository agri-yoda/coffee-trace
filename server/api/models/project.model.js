// Mongoose Module
const mongoose = require('mongoose')

// Moment Module
const moment = require('moment')

// Import Schema
const { Schema } = mongoose

// Create Schema
const ProjectSchema = new Schema({
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    project_name: {
        type: String,
        default: 'New Project',
        required: true
    },
    description: {
        type: String
    },
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    invited_members: {
        type: Map,
        of: String,
    },
    joined_members: {
        type: Map,
        of: String,
    },
    profile_picture: {
        type: String,
        default: 'default_project.png'
    },
    created_date: {
        type: Date,
        default: moment().format()
    }
})

// Define Model
const Project = mongoose.model('Project', ProjectSchema)

// Export Model
module.exports = Project