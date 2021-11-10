// Import Project Service
const { ProjectService } = require('../services')

// Send Error
const { SendError } = require('../../utils')

// Project Controllers
const ProjectControllers = {

    /**
     * Get Project Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getProject(req, res, next) {
        try {

            // Fetch the data from the params
            const { projectId } = req.params

            ProjectService.getProject(projectId)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Project details fetched successfully!',
                        project: data
                    })
                })
                .catch((error) => {
                    return SendError(res, error)
                })

        } catch (error) {
            return SendError(res, error)
        }
    },

    /**
     * Create Project Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async createProject(req, res, next) {
        try {

            // Fetch the data from the body
            const { project_name } = req.body

            ProjectService.createProject(project_name, req.user._id)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'New project created successfully!',
                        project: data
                    })
                })
                .catch((error) => {
                    return SendError(res, error)
                })

        } catch (error) {
            return SendError(res, error)
        }
    },

    /**
     * Get Top 20 Recent Project Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getRecentProjects(req, res, next) {
        try {

            ProjectService.getAllProjects(req.user._id)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Projects fetched successfully!',
                        projects: data
                    })
                })
                .catch((error) => {
                    return SendError(res, error)
                })

        } catch (error) {
            return SendError(res, error)
        }
    },

    /**
     * Get Next 5 Recent Project Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getNextRecentProjects(req, res, next) {
        try {

            // Fetch the data from the params
            const { lastProjectId } = req.params

            ProjectService.getNextProjects(lastProjectId, req.user._id)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Projects fetched successfully!',
                        projects: data
                    })
                })
                .catch((error) => {
                    return SendError(res, error)
                })

        } catch (error) {
            return SendError(res, error)
        }
    },

    /**
     * Update Project Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async updateProject(req, res, next) {
        try {

            // Fetch the data from the params
            const { projectId } = req.params

            // Fetch the data from the body
            const { project } = req.body

            ProjectService.updateProject(projectId, project, req.user._id)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Project updated successfully!',
                        project: data
                    })
                })
                .catch((error) => {
                    return SendError(res, error)
                })

        } catch (error) {
            return SendError(res, error)
        }
    }
}

// Export Controllers
module.exports = ProjectControllers