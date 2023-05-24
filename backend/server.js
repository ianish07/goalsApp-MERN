const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5002


connectDB()
const app = express()

app.use(express.json)
app.use(express.urlencoded({extended: false}))

//route
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

//custom middleware to overwrite default express err
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on ${port}`))