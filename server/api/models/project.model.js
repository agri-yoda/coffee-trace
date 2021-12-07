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
    plantation: {
        description: {
            type: String,
            default: "Your description!"
        },
        area: {
            type: Number,
            default: 0
        },
        altitude: {
            type: Number,
            default: 0
        },
        rainfall: {
            type: Number,
            default: 0
        },
        region_and_bio: {
            type: String,
            default: "Your region and biodiversity!"
        },
        description_video: {
            type: String,
            default: 'default_vid'
        },
        csv: {
            type: String,
            default: 'default_csv'
        }
    },
    coffee: {
        csv: {
            type: String,
            default: 'default_csv'
        }
    },
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    invited_members: {
        type: Map,
        default: new Map(),
        of: String,
    },
    joined_members: {
        type: Map,
        default: new Map(),
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