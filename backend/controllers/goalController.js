const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')
const { param } = require('../routes/goalRoutes')
/**
 * get Goals 
 * GET /api/goals
 */
const getGoals = asyncHandler(async(req, res) => {
    const goals = Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

/**
 * set Goal 
 * POST /api/goals
 */
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

/**
 * update Goals 
 * PUT /api/goals/:id
 */
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error ('Goal not found')
    }

    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure logged in user matches goal user (authorization)
    if(goal.user.toString() !== req.user.id) {
        req.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = Goal.findByIdAndUpdate(req.params.id, req.body, { new: true})

    res.status(200).json(updatedGoal)
})

/**
 * delete Goals 
 * DELETE /api/goals/:id
 */
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error ('Goal not found')
    }

    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure logged in user matches goal user (authorization)
    if(goal.user.toString() !== req.user.id) {
        req.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove() 
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}