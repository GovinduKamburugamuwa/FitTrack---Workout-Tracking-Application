// controllers/workoutController.js
const Workout = require('../models/workoutModels')
const mongoose = require('mongoose')

// GET all Workouts for a specific user
const getWorkouts = async(req, res) => {
  const user_id = req.user._id
  
  const workouts = await Workout.find({ user_id }).sort({createdAt: -1})
  res.status(200).json(workouts)
}

// GET a single Workout
const getWorkout = async(req, res) => {
  const { id } = req.params
  const user_id = req.user._id
  
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such id exist"})
  }
  
  const workout = await Workout.findOne({ _id: id, user_id })
  
  if(!workout) {
    return res.status(404).json({error: 'No such Workout exist !!'})
  }
  
  res.status(200).json(workout)
}

// CREATE a Workout
const creatWorkout = async(req, res) => {
  const { title, rep, loads } = req.body
  const user_id = req.user._id
  
  try {
    const workout = await Workout.create({ title, rep, loads, user_id })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// DELETE a single Workout
const deleteWorkout = async(req, res) => {
  const { id } = req.params
  const user_id = req.user._id
  
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such id exist"})
  }
  
  const workout = await Workout.findOneAndDelete({ _id: id, user_id })
  
  if(!workout) {
    return res.status(404).json({error: 'No such Workout exist !!'})
  }
  
  res.status(200).json(workout)
}

// UPDATE a single Workout
const updateWorkout = async(req, res) => {
  const { id } = req.params
  const user_id = req.user._id
  
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such id exist"})
  }
  
  const workout = await Workout.findOneAndUpdate(
    { _id: id, user_id }, 
    { ...req.body }, 
    { new: true }
  )
  
  if(!workout) {
    return res.status(404).json({error: 'No such Workout exist !!'})
  }
  
  res.status(200).json(workout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  creatWorkout,
  deleteWorkout,
  updateWorkout
}