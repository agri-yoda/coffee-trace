// Import Models
const { Project } = require('../models')

// Project Service
const ProjectService = {

    /**
     * Get Project By ID
     * @param {*} projectId 
     * @returns 
     */
    async getProject(projectId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the Project
                const project = await Project.findOne({
                    _id: projectId
                })
                    .populate('_owner', '_id first_name last_name email role')

                // Resolve the promise
                resolve(project)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * Create a new project
     * @param {*} project_name 
     * @returns 
     */
    async createProject(project_name) {
        return new Promise(async (resolve, reject) => {
            try {

                // Project Data
                const projectData = {
                    _owner: req.user._id,
                    project_name: project_name
                }

                // Create the project
                const project = await Project.create(projectData)

                // Resolve the promise
                resolve(project)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for fetching 20 recent projects for currently loggedIn user
     * @returns 
     */
    async getAllProjects() {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the Projects
                const projects = await Project.find({
                    _owner: res.user._id
                })
                    .limit(20)
                    .sort('-created_date')

                // Resolve the promise
                resolve(projects)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for fetching next 5 recent projects for currently loggedIn user
     * @returns 
     */
    async getNextProjects(lastProjectId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the Projects
                const projects = await Project.find({
                    _id: { $lte: lastProjectId },
                    _owner: res.user._id
                })
                    .limit(5)
                    .sort('-created_date')

                // Resolve the promise
                resolve(projects)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for updating a project details
     * @param {*} projectId 
     * @param {*} projectData 
     * @returns 
     */
    async updateProject(projectId, projectData) {
        return new Promise(async (resolve, reject) => {
            try {

                // Update the Project Data
                const project = await Project.findByIdAndUpdate({
                    _id: projectId
                }, {
                    $set: projectData
                }, {
                    new: true
                })

                // Resolve the promise
                resolve(project)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    }

}

// Export Service
module.exports = ProjectService