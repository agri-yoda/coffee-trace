// Import Models
const {
    Project,
    User
} = require('../models')

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
                    .populate('_invited_members', '_id first_name last_name email role')
                    .populate('_joined_members', '_id first_name last_name email role')

                // Resolve the promise
                resolve(project)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    },

    /**
     * Create a new project
     * @param {*} project_name 
     * @returns 
     */
    async createProject(project_name, requestUserId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Project Data
                const projectData = {
                    _owner: requestUserId,
                    project_name: project_name
                }

                // Create the project
                const project = await Project.create(projectData)

                // Update User
                const userProject = {
                    _id: project._id,
                    current_user_invited: false
                }

                // Pushing the project into user's schema
                await User.findOneAndUpdate({
                    _id: requestUserId
                }, {
                    $push: {
                        projects: userProject
                    }
                }, {
                    upsert: true
                })

                // Resolve the promise
                resolve(project)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    },

    /**
     * This function is responsible for fetching 20 recent projects for currently loggedIn user
     * @returns 
     */
    async getAllProjects(requestUserId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Projects array
                let projects = []

                // Find the Projects
                projects = await Project.find({
                        _owner: requestUserId,
                        active: true,
                    })
                    .limit(20)
                    .sort('-created_date') || []

                // Resolve the promise
                resolve(projects)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    },

    /**
     * This function is responsible for fetching all archived projects for currently loggedIn user
     * @returns 
     */
    async getAllArchivedProjects(requestUserId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Projects array
                let projects = []

                // Find the Projects
                projects = await Project.find({
                        _owner: requestUserId,
                        active: false,
                    })
                    .sort('-created_date') || []

                // Resolve the promise
                resolve(projects)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    },

    /**
     * This function is responsible for fetching next 5 recent projects for currently loggedIn user
     * @returns 
     */
    async getNextProjects(lastProjectId, requestUserId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the Projects
                const projects = await Project.find({
                        _id: {
                            $lte: lastProjectId
                        },
                        active: true,
                        _owner: requestUserId
                    })
                    .limit(5)
                    .sort('-created_date')

                // Resolve the promise
                resolve(projects)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    },

    /**
     * Get Invited Users of Project
     * @param {*} projectId 
     * @returns 
     */
    async getInvitedUsers(projectId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the Project
                const project = await Project.findOne({
                        _id: projectId
                    })
                    .populate('_invited_members', '_id first_name last_name email role')

                // Resolve the promise
                resolve(project)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    },

    /**
     * Get Joined Users of Project
     * @param {*} projectId 
     * @returns 
     */
    async getJoinedUsers(projectId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the Project
                const project = await Project.findOne({
                        _id: projectId
                    })
                    .populate('_joined_members', '_id first_name last_name email role')

                // Resolve the promise
                resolve(project)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    },

    /**
     * This function is responsible for updating a project details
     * @param {*} projectId 
     * @param {*} projectData 
     * @returns 
     */
    async updateProject(projectId, projectData, requestUserId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Update the Project Data
                const project = await Project.findOneAndUpdate({
                    _id: projectId,
                    _owner: requestUserId
                }, {
                    $set: projectData
                }, {
                    upsert: true,
                    new: true,
                    returnNewDocument: true
                })

                // Resolve the promise
                resolve(project)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    },

    /**
     * This function is responsible for removing a project
     * @param {*} projectId 
     * @param {*} requestUserId 
     * @returns 
     */
    async removeProject(projectId, requestUserId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Pulling from the project into user's schema
                await User.updateMany({}, {
                    $pull: {
                        projects: {
                            _id: projectId
                        }
                    }
                }, {
                    multi: true
                })

                // Update the Project Data
                const project = await Project.findOneAndRemove({
                    _id: projectId,
                    _owner: requestUserId
                })

                // Resolve the promise
                resolve(project)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    }

}

// Export Service
module.exports = ProjectService