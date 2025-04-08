// routes/user.js
const express = require('express')
const { loginUser, signupUser } = require('../Controller/userController')

const router = express.Router()

// Login route
router.post('/login', loginUser)

// Signup route
router.post('/signup', signupUser)

module.exports = router