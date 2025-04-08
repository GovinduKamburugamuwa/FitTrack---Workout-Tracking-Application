// models/workoutModels.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  rep: {
    type: Number,
    required: true
  },
  loads: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Workout', workoutSchema)