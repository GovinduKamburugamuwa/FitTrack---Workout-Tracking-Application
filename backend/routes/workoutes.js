// routes/workoutes.js
const express = require('express')
const {
  getWorkouts,
  getWorkout,
  creatWorkout,
  deleteWorkout,
  updateWorkout
} = require('../Controller/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Require auth for all workout routes
router.use(requireAuth)

// GET request
router.get('/', getWorkouts)

// GET single request
router.get('/:id', getWorkout)

// POST a request
router.post('/', creatWorkout)

// DELETE a single request
router.delete('/:id', deleteWorkout)

// UPDATE a single request
router.patch('/:id', updateWorkout)

module.exports = router