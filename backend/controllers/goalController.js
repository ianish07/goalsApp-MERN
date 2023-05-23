const asyncHandler = require('express-async-handler')

/**
 * get Goals 
 * GET /api/goals
 */
const getGoals = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Get goals'})
})

/**
 * set Goal 
 * POST /api/goals
 */
const setGoal = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Set goals'})
})

/**
 * update Goals 
 * PUT /api/goals/:id
 */
const updateGoal = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}`})
})

/**
 * delete Goals 
 * DELETE /api/goals/:id
 */
const deleteGoal = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}