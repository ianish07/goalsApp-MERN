const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { model } = require('mongoose')
const { error } = require('console')

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) 
        {
            try {
                //Get token from header ; format 'Bearer {token}'
                //so spliting it into an array and extracting the token
                token = req.headers.authorization.split(' ')[1]

                //verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET)

                //get user from token, any route that uses this middleware can access req.user
                req.user = await User.findById(decoded.id).select('-password')

                next()
            } catch (error) {
                console.log(error)
                res.status(401)
                throw new Error('Not authorized')
            }
        }

        if(!token) {
            res.send(401)
            throw new Error('Not authorized, no token')
        }
})

module.exports = {protect}