// server.js
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

// Require routes
const workoutRoutes = require('./routes/workoutes')
const userRoutes = require('./routes/user')

// Express app
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Routes
app.use('/api/workoutes', workoutRoutes)
app.use('/api/user', userRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connecting to db & Listening to port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log('error occur', err)
  })